
package com.compass;

import android.hardware.Sensor;    
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class CustomSensorModule extends ReactContextBaseJavaModule implements SensorEventListener {
    private static final String MODULE_NAME = "CustomSensorModule";
    private SensorManager sensorManager;
    private Sensor rotationVectorSensor;
    private final ReactApplicationContext reactContext;

    public CustomSensorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        sensorManager = (SensorManager) reactContext.getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager != null) {
            rotationVectorSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR);
        }
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void startSensor() {
        if (sensorManager != null && rotationVectorSensor != null) {
            sensorManager.registerListener(this, rotationVectorSensor, SensorManager.SENSOR_DELAY_GAME);
        }
    }

    @ReactMethod
    public void stopSensor() {
        if (sensorManager != null) {
            sensorManager.unregisterListener(this);
        }
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() == Sensor.TYPE_ROTATION_VECTOR) {

            float[] rotationMatrix = new float[9];
            SensorManager.getRotationMatrixFromVector(rotationMatrix, event.values);


            float[] orientation = new float[3];
            SensorManager.getOrientation(rotationMatrix, orientation);

            float azimuth = (float) Math.toDegrees(orientation[0]);
            if (azimuth < 0) {
                azimuth += 360;
            }


            WritableMap params = Arguments.createMap();
            params.putDouble("azimuth", azimuth);
            params.putDouble("pitch", Math.toDegrees(orientation[1]));
            params.putDouble("roll", Math.toDegrees(orientation[2]));


            sendEvent("CustomSensorUpdate", params);
        }
    }

    private void sendEvent(String eventName, WritableMap params) {
        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(eventName, params);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        
    }
}