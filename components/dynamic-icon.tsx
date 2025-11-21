'use client';

import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { createElement } from 'react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Ensure name is valid
  if (!name || typeof name !== 'string') {
    return <LucideIcons.Link {...props} />;
  }

  // Get the icon component from lucide-react
  const IconComponent = (LucideIcons as Record<string, any>)[name];

  // If icon doesn't exist, return default Link icon
  if (!IconComponent || typeof IconComponent !== 'function') {
    console.warn(`Icon "${name}" not found in lucide-react, using fallback`);
    return <LucideIcons.Link {...props} />;
  }

  // Create element with the icon component
  return createElement(IconComponent, props);
}
