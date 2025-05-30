import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { DIAL_SIZE } from '../styles/compassStyles';

interface Props {
  rollSV: any;
  pitchSV: any;
}


const FRAME_R  = 48;   
const BUBBLE_R = 28;   
const MAX_S    = FRAME_R - BUBBLE_R;   
const RAD        = Math.PI / 180; 
const MAX_ANGLE  = 30;            


// Clamp to keep the whole bubble inside the circular frame 
const LevelBubble: React.FC<Props> = ({ rollSV, pitchSV }) => {
  const bubbleStyle = useAnimatedStyle(() => {
    // raw offset 
    // use sin() so the bubble moves like a real vial
    let dx = -Math.sin(rollSV.value  * RAD) * MAX_S / Math.sin(MAX_ANGLE * RAD);
    let dy = -Math.sin(pitchSV.value * RAD) * MAX_S / Math.sin(MAX_ANGLE * RAD);


    //  circular clip 
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_S) {
      const k = MAX_S / dist;   // scale down so edge never crosses frame
      dx *= k;
      dy *= k;
    }


    return {
      transform: [
        { translateX: dx },
        { translateY: dy },
      ],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        left: (DIAL_SIZE - FRAME_R * 2) / 2,
        top:  (DIAL_SIZE - FRAME_R * 2) / 2,
        width:  FRAME_R * 2,
        height: FRAME_R * 2,
        borderRadius: FRAME_R,
        backgroundColor: 'rgba(255,255,255,0.06)',
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: FRAME_R - BUBBLE_R,
            top:  FRAME_R - BUBBLE_R,
            width:  BUBBLE_R * 2,
            height: BUBBLE_R * 2,
            borderRadius: BUBBLE_R,
            backgroundColor: 'rgba(255,255,255,0.10)',   //  soft white
          },
          bubbleStyle,
        ]}
      />
    </View>
  );
};

export default React.memo(LevelBubble);
