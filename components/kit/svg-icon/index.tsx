import type { SVGProps } from 'react';

import { SVG_ICON_NAME_TEMPLATE } from '@/constants';

export type IconName = keyof typeof SVG_ICON_NAME_TEMPLATE;

interface SvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  name: IconName;
  testID?: string;
}

export function SvgIcon({ size = 35, color = 'black', name, ...rest }: SvgIconProps) {
  const Component = SVG_ICON_NAME_TEMPLATE[name];

  if (!Component) {
    console.warn(`SvgIcon: No icon found for name "${name}"`);
    return null;
  }

  return <Component width={size} height={size} fill={color} {...rest} />;
}
