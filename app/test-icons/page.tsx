'use client';

import { DynamicIcon } from '@/components/dynamic-icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestIconsPage() {
  const testIcons = [
    'Globe',
    'Github',
    'Linkedin',
    'Mail',
    'Twitter',
    'Instagram',
    'Youtube',
    'Facebook',
    'Briefcase',
    'FileText',
    'Calendar',
    'Phone',
    'Video',
    'Camera',
    'Mic',
    'Music',
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Icons Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {testIcons.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg"
                >
                  <DynamicIcon name={iconName} className="w-8 h-8" />
                  <span className="text-sm">{iconName}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 border rounded-lg bg-yellow-50">
              <h3 className="font-semibold mb-2">Test Invalid Icon:</h3>
              <div className="flex items-center gap-2">
                <DynamicIcon name="InvalidIconName" className="w-8 h-8" />
                <span className="text-sm">
                  InvalidIconName (should show Link icon)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
