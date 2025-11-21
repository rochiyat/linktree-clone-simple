import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { generateToken } from '@/lib/jwt';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = generateToken({
      userId: (session.user as any).id,
      username: (session.user as any).username,
      email: session.user.email!,
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
