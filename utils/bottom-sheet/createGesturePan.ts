import { Gesture, PanGesture } from 'react-native-gesture-handler';
import { Easing, SharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

type CreateGesturePan = (
  modalHeight: number,
  translateY: SharedValue<number>,
  onRequestClose: () => void,
) => PanGesture;

export const createGesturePan: CreateGesturePan = (modalHeight, translateY, onRequestClose) => {
  return Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      const dismissThreshold = modalHeight * 0.25;

      // Dismiss once condition is met
      if (event.translationY > dismissThreshold || event.velocityY > 500) {
        translateY.value = withTiming(modalHeight, { duration: 250 }, () => {
          if (onRequestClose) {
            scheduleOnRN(onRequestClose);
          }
        });

        return;
      }

      // Snap back smoothly without bouncing
      translateY.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.quad),
      });
    });
};
