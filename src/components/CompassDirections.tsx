import React from 'react';
import Svg, { Text as SvgText } from 'react-native-svg';
import { DIAL_SIZE } from '../styles/compassStyles';

interface Props {
  heading: number;
}

const CompassDirections: React.FC<Props> = ({ heading }) => {
  const center  = DIAL_SIZE / 2;
  const radius  = center - 85;          
  const lift    = 0;                   

  const dirs = [
    { label: 'N', a: 0   },
    { label: 'E', a: 90  },
    { label: 'S', a: 180 },
    { label: 'W', a: 270 },
  ];

  return (
    <>
      {dirs.map(({ label, a }) => {
        const rad = (a * Math.PI) / 180;
        const x   = center + radius * Math.sin(rad);
        const y   = center - radius * Math.cos(rad);

        const highlight =
          label === 'N' && (heading % 360 < 5 || heading % 360 > 355);

        return (
          <SvgText
            key={label}
            x={x}
            y={y}
            fill={highlight ? 'red' : '#fff'}
            fontSize="28"
            fontWeight="800"
            textAnchor="middle"
            alignmentBaseline="middle"
            rotation={a}              
            originX={x}               
            originY={y}     
            >
            {label}
          </SvgText>
        );
      })}
    </>
  );
};

export default React.memo(CompassDirections);
