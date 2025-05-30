// CompassView.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import HapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import useSunMoon from '../hooks/useSunMoon';
import { useCompass }  from '../hooks/useCompass';
import { useLocation } from '../hooks/useLocation';
import { styles, DIAL_SIZE } from '../styles/compassStyles';

import CompassTicks      from '../components/CompassTicks';
import CompassDirections from '../components/CompassDirections';
import LevelBubble       from '../components/LevelBubble';
import InfoPanel         from '../components/InfoPanel';

// Tuning knobs 
const SMOOTH_ALPHA   = 0.1;          // 0–1  (lower = smoother, higher = snappier)
const SPRING_CONF    = {              // physical “feel” of the dial
  mass:        0.7,
  stiffness:  80,
  damping:    12,
  overshootClamping: true,
};


export default function CompassView() {
  const { heading, headingSV, rollSV, pitchSV, loading } = useCompass();
  const loc = useLocation();

  const { sun, moon } = useSunMoon(loc.lat, loc.lon);

  // Smooth, wrap-aware heading 
  const smoothed = useSharedValue(0);

  useDerivedValue(() => {
    // keep sign flipped (dial rotates opposite to device) 
    const raw = -headingSV.value;

    // unwrap across the 360° seam so jumps never exceed ±180° 
    let delta = raw - smoothed.value;
    if (delta > 180)  delta -= 360;
    if (delta < -180) delta += 360;

    // exponential moving average 
    smoothed.value = smoothed.value + delta * (1 - SMOOTH_ALPHA);
  });

  // Spring-animated rotation 
  const rotDeg = useDerivedValue(() =>
    withSpring(smoothed.value, SPRING_CONF)
  );

  const dialStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotDeg.value}deg` }],
  }));


  // Haptics (throttled)
  const lastTrig = useSharedValue<number | null>(null);
  useEffect(() => {
    if (loading) return;
    const deg10 = Math.round(heading / 2) * 2;        
    if (deg10 !== lastTrig.value) {
      lastTrig.value = deg10;
      HapticFeedback.trigger('impactLight');
      if (deg10 % 90 === 0) HapticFeedback.trigger('impactHeavy');
    }
  }, [heading, loading]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f0" />
        <Text style={styles.loadingText}>Initializing sensor…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dialContainer}>
        <Animated.View style={[styles.dialWrapper, dialStyle]}>
          <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
            <Circle
              cx={DIAL_SIZE / 2}
              cy={DIAL_SIZE / 2}
              r={DIAL_SIZE / 2}
              fill="#000"
            />
              {/* draws a faint track orbit */}
              <Circle
                cx={DIAL_SIZE / 2}
                cy={DIAL_SIZE / 2}
                r={DIAL_SIZE / 2 - 110}
                fill="none"
                stroke="rgba(255,255,255,0.07)"  
                strokeWidth={1}
              />
            <CompassTicks />
            <CompassDirections heading={heading} />
                        {/* SUN & MOON */}
            {[
              { az: sun.azimuth, alt: sun.altitude, color: '#ffd200' },
              { az: moon.azimuth, alt: moon.altitude, color: '#ffffff' },
            ].map(({ az, alt, color }, i) => {
              const ORB_R = DIAL_SIZE / 2 - 110;
              const rad = (az * Math.PI) / 180;
              const x = DIAL_SIZE / 2 + ORB_R * Math.sin(rad);
              const y = DIAL_SIZE / 2 - ORB_R * Math.cos(rad);
              const opacity = Math.max(0.1, Math.min(1, (alt + 5) / 10));
              return (
                    <React.Fragment key={i}>
                  {/* background blocker */}
                  <Circle
                    cx={x}
                    cy={y}
                    r={6.5}
                    fill="#000"
                  />
                {/* actual orb */}
                <Circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={6}
                  fill={color}
                  stroke="#000"
                  strokeWidth={1}
                  opacity={opacity}
                />
                    </React.Fragment>
              );
            })}
          </Svg>
          <LevelBubble rollSV={rollSV} pitchSV={pitchSV} headingSV={headingSV} />

        </Animated.View>

        {/* fixed chrome */}
        <View style={styles.notch} />
        <View style={styles.crosshairVertical} />
        <View style={styles.crosshairHorizontal} />
      </View>

      <InfoPanel heading={heading} loc={loc} />
    </View>
  );
}
