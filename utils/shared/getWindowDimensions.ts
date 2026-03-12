import { Dimensions, ScaledSize } from 'react-native';

export const getWindowDimensions = (): ScaledSize => {
  return Dimensions.get('window');
};
