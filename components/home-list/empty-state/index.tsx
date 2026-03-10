import { memo } from 'react';

import { StyleSheet, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Text } from '@/components/kit';
import { TEXT_TYPE } from '@/constants';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

export const HomeListEmptyStateComponent = ({ message }: { message: string }) => {
  const styles = useStyles(_styles);
  return (
    <View style={styles.emptyState}>
      <MaterialIcons color={styles.infoIcon.color} size={32} name={'info-outline'} />
      <Text type={TEXT_TYPE.subHeading} style={styles.text}>
        {message}
      </Text>
    </View>
  );
};

export const HomeListEmptyState = memo(HomeListEmptyStateComponent);

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    emptyState: {
      backgroundColor: colors.surface,
      padding: 16,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 8,
      marginBottom: 16,
    },
    infoIcon: {
      color: colors.ink,
    },
    text: {
      marginTop: 16,
    },
  });
};
