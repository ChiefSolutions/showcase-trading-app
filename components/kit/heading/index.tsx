import { FC, memo } from 'react';

import { TEXT_TYPE } from '@/constants/text';

import { Text } from '../text';

interface HeadingProps {
  title: string;
  copy?: string;
}
const HeadingComponent: FC<HeadingProps> = ({ title, copy }) => {
  return (
    <>
      <Text type={TEXT_TYPE.heading}>{title}</Text>
      {!!copy && <Text type={TEXT_TYPE.copy}>{copy}</Text>}
    </>
  );
};

export const Heading = memo(HeadingComponent);
