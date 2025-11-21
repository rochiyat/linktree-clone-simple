import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/jwt';

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Check if token belongs to the profile owner
    if (token) {
      const decoded = verifyToken(token);

      // If token is valid and belongs to the profile owner, don't increment views
      if (decoded && decoded.username === params.username) {
        return NextResponse.json({
          message: 'View not counted for profile owner',
          views: null,
        });
      }
    }

    // Increment view count for non-owners or users without valid token
    const user = await prisma.user.update({
      where: {
        username: params.username,
      },
      data: {
        profileViews: {
          increment: 1,
        },
      },
      select: {
        profileViews: true,
      },
    });

    return NextResponse.json({ views: user.profileViews });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}
