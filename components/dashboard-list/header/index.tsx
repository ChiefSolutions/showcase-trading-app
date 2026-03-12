import { FC, memo } from 'react';

import { StyleSheet, View } from 'react-native';

import { DashboardListHeaderProps } from '@/components/dashboard-list/dashboard.types';
import { Heading } from '@/components/kit';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

const DashboardListSectionHeaderComponent: FC<DashboardListHeaderProps> = ({
  style,
  copy,
  title,
}) => {
  const styles = useStyles(_styles);
  const headerStyles = style ? { ...styles.sectionHeading, ...style } : styles.sectionHeading;

  return (
    <View testID="list-header-container" style={headerStyles}>
      <Heading title={title ?? ''} copy={copy} />
    </View>
  );
};

export const DashboardListSectionHeader = memo(DashboardListSectionHeaderComponent);

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    sectionHeading: {
      backgroundColor: colors.background,
      paddingBottom: 20,
    },
  });
};
