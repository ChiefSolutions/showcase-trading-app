import { FC, memo, useEffect } from 'react';

import { Heading } from '@/components/kit';

export interface CoinModalProps {
  id: string;
  name: string;
  close?: () => void;
}

const CoinModalComponent: FC<CoinModalProps> = ({ id, name }) => {
  useEffect(() => {}, [id]);
  return <Heading title={name} copy={''} />;
};

export const CoinModal = memo(CoinModalComponent);
