// src/components/CompassNeedle.tsx
import React from 'react';
import Svg, { G, Polygon, Circle } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  headingSV:     any;   
  center:        number;
  needleLength:  number;
}


const CompassNeedle: React.FC<Props> = ({ headingSV, center, needleLength }) => {
  
  const animatedProps = useAnimatedProps(() => ({
    rotation: headingSV.value,               
  }));

  const frontPoints = [
    `${center - 5},${center}`,
    `${center + 5},${center}`,
    `${center},${center - needleLength}`,
  ].join(' ');

  const rearPoints  = [
    `${center - 5},${center}`,
    `${center},${center + needleLength * 0.3}`,
    `${center + 5},${center}`,
  ].join(' ');

  return (
    <AnimatedG
      animatedProps={animatedProps}
      originX={center}
      originY={center}
    >
      <Polygon fill="red"  points={frontPoints} />
      <Polygon fill="gray" points={rearPoints} />
      <Circle
        cx={center}
        cy={center}
        r={6}
        fill="#ccc"
        stroke="#666"
        strokeWidth={1}
      />
    </AnimatedG>
  );
};

export default React.memo(CompassNeedle);
