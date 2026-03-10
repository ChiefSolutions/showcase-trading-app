import { PanResponder } from 'react-native';

import { PanResponderCallbacks } from 'react-native/Libraries/Interaction/PanResponder';

export const createBottomSheetPanResponder = (config: PanResponderCallbacks) => {
  return PanResponder.create(config);
};
