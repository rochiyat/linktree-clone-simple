# NextAuth v5 Migration Notes

This project uses NextAuth.js v5 (beta) which has breaking changes from v4.

## Key Changes

### 1. Configuration Export

**Old (v4):**
```typescript
export const authOptions: NextAuthOptions = { ... }
```

**New (v5):**
```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({ ... })
```

### 2. API Route Handler

**Old (v4):**
```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

**New (v5):**
```typescript
import { handlers } from '@/lib/auth';
export const { GET, POST } = handlers;
```

### 3. Getting Session in API Routes

**Old (v4):**
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const session = await getServerSession(authOptions);
```

**New (v5):**
```typescript
import { auth } from '@/lib/auth';

const session = await auth();
```

### 4. Middleware

**Old (v4):**
```typescript
export { default } from 'next-auth/middleware';
```

**New (v5):**
```typescript
import { auth } from '@/lib/auth';

export default auth((req) => {
  // Custom logic
});
```

### 5. Client-side Usage

Client-side usage remains mostly the same:

```typescript
import { signIn, signOut, useSession } from 'next-auth/react';

// Login
await signIn('credentials', { email, password });

// Logout
await signOut();

// Get session
const { data: session } = useSession();
```

## Version Compatibility

- **Next.js**: 15.x ✅
- **NextAuth**: 5.0.0-beta.25 ✅
- **Prisma**: 5.22.0 ✅
- **@auth/prisma-adapter**: 2.7.4 ✅

## Common Issues

### Issue: "Failed to execute 'json' on 'Response'"

**Cause**: NextAuth v5 configuration mismatch

**Solution**: 
- Use `auth()` instead of `getServerSession()`
- Export handlers correctly from auth config
- Update middleware to use new auth function

### Issue: Session not persisting

**Cause**: JWT strategy configuration

**Solution**:
```typescript
session: {
  strategy: 'jwt',
}
```

### Issue: Credentials provider not working

**Cause**: Return value from authorize function

**Solution**:
```typescript
async authorize(credentials) {
  // Return null on failure (not throw error)
  if (!valid) return null;
  
  // Return user object on success
  return { id, email, name, username };
}
```

## Migration Checklist

- [x] Update NextAuth to v5
- [x] Update auth configuration
- [x] Update API route handlers
- [x] Update middleware
- [x] Update all API routes using auth
- [x] Test login flow
- [x] Test protected routes
- [x] Test session persistence

## Resources

- [NextAuth v5 Documentation](https://authjs.dev/)
- [Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Upgrade Guide](https://authjs.dev/guides/upgrade-to-v5)

## Notes

NextAuth v5 is still in beta but is stable enough for production use with Next.js 15. The main benefits:

- Better TypeScript support
- Improved performance
- Cleaner API
- Better Next.js 15 compatibility

---

**Last Updated**: November 21, 2024
