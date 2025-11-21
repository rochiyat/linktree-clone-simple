'use client';

import { useEffect } from 'react';

interface ViewCounterProps {
  username: string;
}

export function ViewCounter({ username }: ViewCounterProps) {
  useEffect(() => {
    // Increment view count
    const incrementView = async () => {
      try {
        await fetch(`/api/profile/${username}/views`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [username]);

  return null; // This component doesn't render anything
}
