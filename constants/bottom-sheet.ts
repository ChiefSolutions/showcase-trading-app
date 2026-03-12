import { Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
export const MIN_HEIGHT = SCREEN_HEIGHT * 0.25;
export const MAX_HEIGHT = SCREEN_HEIGHT * 0.9;
