//useCompass.ts

import { useEffect, useState } from 'react';
import CustomSensor from '../../CustomSensor';
import { useSharedValue } from 'react-native-reanimated';


const clamp45 = (v: number) => Math.max(-45, Math.min(45, v));

export function useCompass(updateInterval = 80) {
  const [heading, setHeading] = useState(0);
  const [roll,    setRoll]    = useState(0);
  const [pitch,   setPitch]   = useState(0);
  const [loading, setLoading] = useState(true);

  const headingSV = useSharedValue(0);   // dial
  const rollSV    = useSharedValue(0);   // bubble X
  const pitchSV   = useSharedValue(0);   // bubble Y

  useEffect(() => {
    CustomSensor.startSensor();
    let last = Date.now();

    const sub = CustomSensor.addSensorListener((d: any) => {
      // shared values (each sample)
      headingSV.value = d.azimuth;
      rollSV.value    = clamp45(d.roll  ?? 0);
      pitchSV.value   = clamp45(d.pitch ?? 0);

      // throttled React state
      const now = Date.now();
      if (now - last >= updateInterval) {
        last = now;
        setHeading(d.azimuth);
        setRoll(rollSV.value);
        setPitch(pitchSV.value);
      }
    });

    const warmUp = setTimeout(() => setLoading(false), 800);

    return () => {
      clearTimeout(warmUp);
      sub.remove();
      CustomSensor.stopSensor();
    };
  }, [updateInterval, headingSV, rollSV, pitchSV]);

  return { heading, roll, pitch, headingSV, rollSV, pitchSV, loading } as const;
}
