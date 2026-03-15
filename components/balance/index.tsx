import { FC } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';

import { Heading, Text } from '@/components/kit';
import { TEXT_TYPE } from '@/constants';
import { staticColors, useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

export const Balance: FC = () => {
  const styles = useStyles(_styles);
  return (
    <>
      <Heading title={'Account Balance'} copy={'Some funds may be reserved for trades or pending withdrawals.'} />
      <View style={styles.balanceInfo}>
        <View style={styles.balance}>
          <Text testID="balance-amount" type={TEXT_TYPE.headingXL}>
            <Text type={TEXT_TYPE.subHeadingBold}>$</Text>
            53,450.00
          </Text>
          <View style={styles.balanceMoreInfo}>
            <View>
              <Text type={TEXT_TYPE.copyBold}>LAST 24H</Text>
              <Text type={TEXT_TYPE.copyBold}>$0.00</Text>
            </View>
            <View style={styles.rateOfReturn}>
              <Text type={TEXT_TYPE.copyBold}>RATE OF RETURN</Text>
              <Text type={TEXT_TYPE.copyBold}>0.0%</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Pressable testID="deposit-button" style={styles.pressablePrimary}>
              <Text type={TEXT_TYPE.copyBold} style={styles.depositButtonText}>
                DEPOSIT
              </Text>
            </Pressable>
            <Pressable testID="withdraw-button" style={styles.pressableSecondary}>
              <Text type={TEXT_TYPE.copyBold} style={styles.withdrawButtonText}>
                WITHDRAW
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

const _styles = (colors: ThemeDefinitionColors) => {
  return StyleSheet.create({
    content: {
      flexGrow: 1,
    },
    balanceInfo: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.onSurface,
      borderRadius: 16,
      marginTop: 20,
      padding: 16,
    },
    balance: {},
    balanceMoreInfo: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 16,
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    rateOfReturn: {
      marginLeft: 20,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 16,
      marginTop: 16,
    },
    pressablePrimary: {
      backgroundColor: '#6366F1', //colors.ink, #6366F1, #06B6D4
      borderRadius: 8,
      padding: 16,
      flexGrow: 1,
    },
    pressableSecondary: {
      backgroundColor: '#E5E7EB', //charcoalMinimal
      borderRadius: 8,
      padding: 16,
      flexGrow: 1,
    },
    depositButtonText: {
      color: staticColors.neutral100,
      textAlign: 'center',
    },
    withdrawButtonText: {
      textAlign: 'center',
      color: staticColors.ink,
    },
    watchlistContainer: {
      marginTop: 16,
    },
  });
};
