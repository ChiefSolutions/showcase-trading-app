import React, { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from '@/components/kit/icons/types';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

// const AnimatedPath = Animated.createAnimatedComponent(Path);

// Wrap the Svg Path to make it animatable
const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedLogo: React.FC<IconProps> = ({ width = 200, height = 200 }) => {
  const progress = useSharedValue(0);
  const styles = useStyles(_styles);

  useEffect(() => {
    // Infinite loop: 0 to 1 and back to 0 (reverse: true)
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1, // Infinite loops
      true, // Reverse direction each time
    );
  }, [progress]);

  // Animate Left Bar: Moves -10 units left and back
  const leftBarProps = useAnimatedProps(() => ({
    transform: [{ translateX: progress.value * -10 }],
  }));

  // Animate Right Bar: Moves +10 units right and back
  const rightBarProps = useAnimatedProps(() => ({
    transform: [{ translateX: progress.value * 10 }],
  }));

  return (
    <View style={styles.logoContainer}>
      <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
        <AnimatedPath
          animatedProps={leftBarProps}
          d="M25.55,60c2.61,0,4.73-2.12,4.73-4.73V5.5c0-.59-.35-1.13-.89-1.37-.55-.24-1.18-.14-1.62.26L9.78,20.85c-.98.9-1.54,2.18-1.53,3.52.02,1.33.6,2.6,1.6,3.48,1.66,1.47,4.08,1.58,5.87.28l5.1-3.71v30.85c0,2.61,2.13,4.73,4.73,4.73Z"
          fill={styles.path.color}
        />
        <AnimatedPath
          animatedProps={rightBarProps}
          d="M38.45,4c-2.61,0-4.73,2.12-4.73,4.73v49.77c0,.59.35,1.13.89,1.37.2.09.4.13.61.13.37,0,.73-.14,1.01-.39l17.99-16.46c.98-.9,1.54-2.18,1.53-3.52-.02-1.33-.6-2.6-1.6-3.48-1.66-1.46-4.07-1.58-5.87-.28l-5.1,3.71V8.73c0-2.61-2.13-4.73-4.73-4.73Z"
          fill={styles.path.color}
        />
      </Svg>
    </View>
  );
};

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    path: {
      color: colors.primary,
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 40,
      height: 100,
      top: 20,
      width: '100%',
    },
  });
};
