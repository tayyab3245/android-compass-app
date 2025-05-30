import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export interface LocationData {
  lat:  number | null;
  lon:  number | null;
  alt:  number | null;
  city: string | null;
}

export function useLocation() {
  const [loc, setLoc] = useState<LocationData>({
    lat: null,
    lon: null,
    alt: null,
    city: null,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const ok = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (ok !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        async ({ coords }) => {
          const { latitude, longitude, altitude } = coords;

          /* Reverse-geocode city + province via OpenStreetMap */
          let place: string | null = null;
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            const res = await fetch(url, { headers: { 'User-Agent': 'RN-Compass/1.0' } });
            const j   = await res.json();
            const a   = j.address ?? {};
            const city = a.city || a.town || a.village || a.municipality || a.hamlet;
            const prov = a.state || a.region || a.province;
            place = city && prov ? `${city}, ${prov}` : city || prov || null;
          } catch { /* network fail – ignore */ }

          setLoc({ lat: latitude, lon: longitude, alt: altitude ?? null, city: place });
        },
        () => setLoc((p) => ({ ...p, city: null })),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
      );
    })();
  }, []);

  return loc;
}
