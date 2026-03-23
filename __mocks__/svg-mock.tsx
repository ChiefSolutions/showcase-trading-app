// __mocks__/svgMock.tsx
import React from 'react';

import { View, ViewProps } from 'react-native';

// mock SVG as a React component
const SvgMock: React.FC<ViewProps> = (props) => <View {...props} />;

export default SvgMock;
