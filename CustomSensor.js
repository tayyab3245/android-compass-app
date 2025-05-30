import { NativeModules, NativeEventEmitter } from 'react-native';

const { CustomSensorModule } = NativeModules;

const sensorEmitter = new NativeEventEmitter(CustomSensorModule);

export const startSensor = () => {
  if (CustomSensorModule && CustomSensorModule.startSensor) {
    CustomSensorModule.startSensor();
  }
};

export const stopSensor = () => {
  if (CustomSensorModule && CustomSensorModule.stopSensor) {
    CustomSensorModule.stopSensor();
  }
};

export const addSensorListener = (callback) => {
  return sensorEmitter.addListener('CustomSensorUpdate', callback);
};

export default {
  startSensor,
  stopSensor,
  addSensorListener,
};
