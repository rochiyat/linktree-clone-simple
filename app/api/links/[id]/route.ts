import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// UPDATE link
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, url, description, icon, color, isActive, order } = body;

    // Verify link belongs to user
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink || existingLink.userId !== (session.user as any).id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const link = await prisma.link.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(url !== undefined && { url }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(color !== undefined && { color }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// DELETE link
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify link belongs to user
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink || existingLink.userId !== (session.user as any).id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Link deleted' });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
