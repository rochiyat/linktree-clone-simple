import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || '';

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  return sign(payload, JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
