import { StyleSheet } from 'react-native';

import { HomeList } from '@/components/home-list';
import { ThemeDefinitionColors } from '@/theme/types';

export default function HomeScreen() {
  return <HomeList />;
}

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    logoContainer: {
      alignSelf: 'center',
      marginBottom: 40,
      height: 100,
      top: 20,
      width: 100,
    },
  });
};
