import { FC, memo } from 'react';

import { TextInput } from 'react-native';

import { MarketSearchProps } from '@/components/markets/markets.types';

const MarketSearchComponent: FC<MarketSearchProps> = ({ onChange, value, placeholder }) => {
  return (
    <TextInput
      style={{ padding: 16, backgroundColor: '#1E1E1E', color: '#FFF', borderRadius: 32 }}
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      onBlur={(e) => {
        console.log('LOG:::', e.nativeEvent.target);
        // e.nativeEvent.target.blur();
      }}
    />
  );
};

export const MarketSearch = memo(MarketSearchComponent);
