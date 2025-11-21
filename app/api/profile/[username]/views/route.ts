import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
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
