'use client';

import { icons } from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

// Helper function to convert to PascalCase
function toPascalCase(str: string): string {
  return str
    .split(/[-_\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Ensure name is valid
  if (!name || typeof name !== 'string') {
    const LucideLink = icons.Link;
    return <LucideLink {...props} />;
  }

  // Convert to PascalCase for case-insensitive matching
  const pascalName = toPascalCase(name);

  // Try to get the icon from lucide-react icons object
  let LucideIcon = icons[pascalName as keyof typeof icons];

  // If not found, try the original name
  if (!LucideIcon) {
    LucideIcon = icons[name as keyof typeof icons];
  }

  // If still not found, return default Link icon
  if (!LucideIcon) {
    console.warn(
      `Icon "${name}" (tried as "${pascalName}") not found in lucide-react, using fallback Link icon`
    );
    const LucideLink = icons.Link;
    return <LucideLink {...props} />;
  }

  // Render the icon
  return <LucideIcon {...props} />;
}
