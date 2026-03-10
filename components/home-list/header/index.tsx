import { FC, memo } from 'react';

import { StyleSheet, View } from 'react-native';

import { HomeListHeaderProps } from '@/components/home-list/home.types';
import { Heading } from '@/components/kit';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

const HomeListSectionHeaderComponent: FC<HomeListHeaderProps> = ({ style, copy, title }) => {
  const styles = useStyles(_styles);
  const headerStyles = style ? { ...styles.sectionHeading, ...style } : styles.sectionHeading;

  return (
    <View testID="home-list-header-container" style={headerStyles}>
      <Heading title={title ?? ''} copy={copy} />
    </View>
  );
};

export const HomeListSectionHeader = memo(HomeListSectionHeaderComponent);

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    sectionHeading: {
      backgroundColor: colors.background,
      paddingBottom: 20,
    },
  });
};
