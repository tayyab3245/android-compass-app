// CompassTicks.tsx
import React from 'react';
import { View } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';   
import { DIAL_SIZE, TICK_COUNT, styles } from '../styles/compassStyles';

const CompassTicks: React.FC = () => {
  const ticks: React.ReactNode[] = [];
  const step   = 360 / TICK_COUNT;
  const center = DIAL_SIZE / 2;
  const labelR = center - 60;             

  for (let i = 0; i < TICK_COUNT; i++) {
    const angle   = i * step;
    const isMajor = angle % 30 === 0;
    const len     = 30;
    const rad     = (angle * Math.PI) / 180;
    const x       = center + (center - len) * Math.sin(rad);
    const y       = center - (center - len) * Math.cos(rad);

 
    ticks.push(
      <View
        key={`t-${i}`}
        style={{
          position: 'absolute',
          left: x - 0.5,
          top:  y - len / 2,
          width: 1,
          height: len,
          backgroundColor: isMajor ? '#ffffff' : '#888888',
          transform: [{ rotate: `${angle}deg` }],
        }}
      />,
    );

    // degree label every 30° 
    if (isMajor) {
      const label = angle === 0 ? '360' : `${angle}`;
      const lx    = center + labelR * Math.sin(rad);
      const ly    = center - labelR * Math.cos(rad);

      ticks.push(
        <SvgText
          key={`n-${i}`}
          x={lx}
          y={ly}
          fill="#bbb"
          fontSize="12"
          textAnchor="middle"
          alignmentBaseline="middle"
          rotation={angle}      
          originX={lx}
          originY={ly}
        >
          {label}
        </SvgText>,
      );
    }
  }

  return <Svg width={DIAL_SIZE} height={DIAL_SIZE} style={styles.ticksContainer}>{ticks}</Svg>;
};

export default React.memo(CompassTicks);
