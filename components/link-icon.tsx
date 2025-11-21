'use client';

import { DynamicIcon } from './dynamic-icon';

interface LinkIconProps {
  iconName: string | null;
  className?: string;
}

export function LinkIcon({ iconName, className }: LinkIconProps) {
  return (
    <DynamicIcon name={iconName || 'ExternalLink'} className={className} />
  );
}
