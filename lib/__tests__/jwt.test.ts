// Simple test untuk JWT functions
// Uncomment jika ingin menjalankan test

/*
import { generateToken, verifyToken } from '../jwt';

describe('JWT Functions', () => {
  const mockPayload = {
    userId: '123',
    username: 'testuser',
    email: 'test@example.com',
  };

  test('generateToken should create a valid token', () => {
    const token = generateToken(mockPayload);
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
  });

  test('verifyToken should decode valid token', () => {
    const token = generateToken(mockPayload);
    const decoded = verifyToken(token);
    
    expect(decoded).toBeTruthy();
    expect(decoded?.userId).toBe(mockPayload.userId);
    expect(decoded?.username).toBe(mockPayload.username);
    expect(decoded?.email).toBe(mockPayload.email);
  });

  test('verifyToken should return null for invalid token', () => {
    const decoded = verifyToken('invalid-token');
    expect(decoded).toBeNull();
  });
});
*/
