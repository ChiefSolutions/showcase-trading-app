import Apple from '@/components/kit/icons/svgs/apple.svg';
import Bitcoin from '@/components/kit/icons/svgs/bitcoin.svg';
import Ethereum from '@/components/kit/icons/svgs/ethereum.svg';
import EurUsd from '@/components/kit/icons/svgs/eur-usd.svg';
import Nvidia from '@/components/kit/icons/svgs/nvidia.svg';
import UsdJpy from '@/components/kit/icons/svgs/usd-jpy.svg';

export const SVG_ICON_NAME_TEMPLATE = {
  'EUR/USD': EurUsd,
  'USD/JPY': UsdJpy,
  'Apple Inc.': Apple,
  Bitcoin: Bitcoin,
  Ethereum: Ethereum,
  'NVIDIA Corporation': Nvidia,
} as const;
