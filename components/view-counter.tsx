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
        // Get token from localStorage
        const token = localStorage.getItem('token');

        await fetch(`/api/profile/${username}/views`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
      } catch (error) {
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [username]);

  return null; // This component doesn't render anything
}
