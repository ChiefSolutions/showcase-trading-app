import { FC, memo, useMemo } from 'react';

import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

import { TextProps, TextType } from '@/components/kit/text/types';
import { useStyles } from '@/theme';
import { ThemeDefinitionColors } from '@/theme/types';

export const TextComponent: FC<TextProps> = ({ style, type, children }) => {
  const styles = useStyles(_styles);
  const textStyles = useMemo(() => {
    if (style) {
      return [styles[type], style];
    }
    return styles[type];
  }, [style, styles, type]);

  return <RNText style={textStyles}>{children}</RNText>;
};

export const Text = memo(TextComponent);
const _styles = (colors: ThemeDefinitionColors): Record<TextType, TextStyle> => {
  return StyleSheet.create({
    heading: {
      color: colors.highEmphasis,
      fontSize: 20,
      fontWeight: 'bold',
    },
    headingXL: {
      color: colors.highEmphasis,
      fontSize: 40,
      fontWeight: 'bold',
    },
    subHeading: {
      color: colors.highEmphasis,
      fontSize: 16,
    },
    subHeadingBold: {
      color: colors.highEmphasis,
      fontSize: 16,
      fontWeight: 'bold',
    },
    copy: {
      color: colors.secondary,
      fontSize: 12,
    },
    copyBold: {
      color: colors.highEmphasis,
      fontSize: 12,
      fontWeight: 'bold',
    },
    copyLarge: {
      color: colors.secondary,
      fontSize: 14,
    },
  });
};
