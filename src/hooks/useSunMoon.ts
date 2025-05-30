// useSunMoon.ts
import { useState, useEffect } from 'react';
import SunCalc from 'suncalc';

export interface Celestial {
  azimuth: number;   // 0-360  (0 = north, CW)
  altitude: number;  // degrees above horizon
}

const EMPTY: Celestial = { azimuth: 0, altitude: -90 }; // start below horizon

export default function useSunMoon(lat: number, lon: number) {
  const [sun,  setSun ] = useState<Celestial>(EMPTY);
  const [moon, setMoon] = useState<Celestial>(EMPTY);

  useEffect(() => {
    // Wait for valid coordinates
    if (isNaN(lat) || isNaN(lon)) return;

    const tick = () => {
      const d = new Date();
      const sunP  = SunCalc.getPosition(d, lat, lon);
      const moonP = SunCalc.getMoonPosition(d, lat, lon);

      // SunCalc azimuth: 0 = south, CCW; convert to 0 = north, CW
      const toDegCW = (rad: number) => (180 + (rad * 180 / Math.PI)) % 360;

      setSun({
        azimuth:  toDegCW(sunP.azimuth),
        altitude: sunP.altitude * 180 / Math.PI,
      });
      setMoon({
        azimuth:  toDegCW(moonP.azimuth),
        altitude: moonP.altitude * 180 / Math.PI,
      });
    };

    tick();                          
    const id = setInterval(tick, 1000); // update every second
    return () => clearInterval(id);  // clean up on unmount
  }, [lat, lon]);

  return { sun, moon };
}
