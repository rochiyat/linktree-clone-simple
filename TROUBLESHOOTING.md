# Troubleshooting Guide

Common issues and their solutions.

## Hydration Errors

### Error: "A tree hydrated but some attributes didn't match"

**Symptoms:**
- Console shows hydration mismatch error
- Mentions `data-new-gr-c-s-check-loaded` or `data-gr-ext-installed`
- Application still works but shows warnings

**Cause:**
Browser extensions (especially Grammarly) modify the HTML before React loads, causing a mismatch between server-rendered and client-rendered HTML.

**Solutions:**

#### Option 1: Disable Browser Extensions (Temporary)
1. Open browser in incognito/private mode
2. Or disable extensions temporarily:
   - Chrome: `chrome://extensions`
   - Firefox: `about:addons`
   - Edge: `edge://extensions`

#### Option 2: Already Fixed in Code
The project already includes `suppressHydrationWarning` in the layout, which suppresses these warnings without affecting functionality.

#### Option 3: Disable Specific Extensions
Common culprits:
- Grammarly
- LastPass
- Honey
- Any extension that modifies page content

**Note:** These warnings don't affect functionality, they're just React being strict about HTML matching.

---

## Authentication Issues

### Can't Login / Session Not Persisting

**Symptoms:**
- Login appears successful but redirects back to login
- Session doesn't persist after refresh
- "Unauthorized" errors

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # Verify .env file exists and has:
   DATABASE_URL="mysql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   ```

2. **Regenerate NEXTAUTH_SECRET**
   ```bash
   openssl rand -base64 32
   ```
   Update `.env` with new secret and restart server.

3. **Clear Browser Data**
   - Clear cookies for localhost
   - Clear localStorage
   - Try incognito/private mode

4. **Check Database Connection**
   ```bash
   npm run db:test
   ```

5. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### "Invalid credentials" Error

**Symptoms:**
- Correct email/password shows error
- Can't login with demo account

**Solutions:**

1. **Verify Demo Account Exists**
   ```bash
   npm run db:studio
   # Check if demo@example.com exists in User table
   ```

2. **Re-seed Database**
   ```bash
   npm run db:seed
   ```

3. **Check Password Hash**
   - Passwords are hashed with bcrypt
   - Can't view plain passwords in database
   - Use demo account: demo@example.com / demo123456

4. **Create New Account**
   - Go to `/register`
   - Create fresh account
   - Try logging in

---

## Database Issues

### "Can't connect to database"

**Symptoms:**
- Database connection errors
- Prisma errors
- API routes fail

**Solutions:**

1. **Check MySQL is Running**
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

2. **Verify DATABASE_URL**
   ```env
   # Format:
   DATABASE_URL="mysql://user:password@host:port/database"
   
   # Example:
   DATABASE_URL="mysql://root:password@localhost:3306/linktree_db"
   ```

3. **Test Connection**
   ```bash
   npm run db:test
   ```

4. **Check Database Exists**
   ```sql
   SHOW DATABASES;
   USE linktree_db;
   SHOW TABLES;
   ```

5. **Recreate Database**
   ```bash
   npm run db:reset
   npm run db:push
   npm run db:seed
   ```

### Prisma Version Conflicts

**Symptoms:**
- "datasource property `url` is no longer supported"
- Prisma 7.x errors

**Solution:**
Project uses Prisma 5.22.0 for stability. If you accidentally upgraded:

```bash
npm uninstall prisma @prisma/client
npm install prisma@5.22.0 @prisma/client@5.22.0 -D
npm run db:generate
```

---

## Build & Development Issues

### Port Already in Use

**Symptoms:**
- "Port 3000 is in use"
- Server won't start

**Solutions:**

1. **Kill Process on Port**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```

2. **Use Different Port**
   ```bash
   npm run dev -- -p 3001
   ```

3. **Check for Other Processes**
   - Close other development servers
   - Check Docker containers
   - Restart computer if needed

### Module Not Found Errors

**Symptoms:**
- "Cannot find module"
- Import errors

**Solutions:**

1. **Reinstall Dependencies**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **Check Import Paths**
   - Use `@/` for absolute imports
   - Check file extensions (.ts, .tsx)
   - Verify file exists

### TypeScript Errors

**Symptoms:**
- Type errors in IDE
- Build fails with TS errors

**Solutions:**

1. **Restart TypeScript Server**
   - VS Code: Cmd/Ctrl + Shift + P → "Restart TS Server"

2. **Check tsconfig.json**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

3. **Install Type Definitions**
   ```bash
   npm install -D @types/node @types/react @types/react-dom
   ```

---

## UI/UX Issues

### Styles Not Loading

**Symptoms:**
- No styling
- Plain HTML
- Tailwind classes not working

**Solutions:**

1. **Check Tailwind Config**
   - Verify `tailwind.config.ts` exists
   - Check content paths

2. **Restart Dev Server**
   ```bash
   npm run dev
   ```

3. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Images Not Loading

**Symptoms:**
- Broken image icons
- Profile pictures don't show

**Solutions:**

1. **Check Image URL**
   - Must be publicly accessible
   - Must start with `https://`
   - Test URL in browser

2. **Verify Image Host**
   - Some hosts block hotlinking
   - Try different image host (Imgur, GitHub)

3. **Check Next.js Image Config**
   - Add domain to `next.config.js` if needed

### Components Not Rendering

**Symptoms:**
- Blank page
- Components missing
- Console errors

**Solutions:**

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check network tab for failed requests

2. **Verify Component Imports**
   ```typescript
   // Correct
   import { Button } from '@/components/ui/button';
   
   // Wrong
   import Button from '@/components/ui/button';
   ```

3. **Check Client/Server Components**
   - Add `'use client'` if using hooks
   - Remove if server component

---

## API Issues

### 401 Unauthorized Errors

**Symptoms:**
- API returns 401
- Can't access protected routes

**Solutions:**

1. **Check Authentication**
   - Verify you're logged in
   - Check session in browser DevTools

2. **Check Middleware**
   - Verify `middleware.ts` is configured
   - Check protected routes list

3. **Clear Cookies**
   - Delete all localhost cookies
   - Login again

### 500 Internal Server Error

**Symptoms:**
- API returns 500
- Server errors in console

**Solutions:**

1. **Check Server Logs**
   - Look at terminal running `npm run dev`
   - Check for error messages

2. **Verify Database Connection**
   ```bash
   npm run db:test
   ```

3. **Check API Route Code**
   - Look for syntax errors
   - Verify database queries
   - Check error handling

### CORS Errors

**Symptoms:**
- "CORS policy" errors
- Cross-origin requests blocked

**Solutions:**

1. **Check API Route**
   - Ensure using same domain
   - No need for CORS in same-origin

2. **Add CORS Headers** (if needed)
   ```typescript
   // In API route
   headers: {
     'Access-Control-Allow-Origin': '*',
   }
   ```

---

## Performance Issues

### Slow Page Load

**Solutions:**

1. **Check Database Queries**
   - Use Prisma Studio to inspect data
   - Optimize queries with indexes

2. **Clear Browser Cache**
   - Hard refresh
   - Clear all cache

3. **Check Network Tab**
   - Look for slow requests
   - Check bundle sizes

### High Memory Usage

**Solutions:**

1. **Restart Dev Server**
   ```bash
   npm run dev
   ```

2. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   ```

3. **Check for Memory Leaks**
   - Close unused browser tabs
   - Restart browser

---

## Deployment Issues

### Build Fails

**Solutions:**

1. **Check Build Locally**
   ```bash
   npm run build
   ```

2. **Fix TypeScript Errors**
   ```bash
   npm run lint
   ```

3. **Verify Environment Variables**
   - Check all required vars are set
   - No typos in variable names

### Database Connection in Production

**Solutions:**

1. **Check DATABASE_URL**
   - Must be production database
   - Must be accessible from deployment platform

2. **Run Migrations**
   ```bash
   npx prisma db push
   ```

3. **Check SSL/TLS**
   - Production databases often require SSL
   - Add `?sslmode=require` to DATABASE_URL

---

## Getting Help

If you're still stuck:

1. **Check Documentation**
   - [README.md](README.md)
   - [FAQ.md](FAQ.md)
   - [FEATURES.md](FEATURES.md)

2. **Search GitHub Issues**
   - Someone may have had same problem
   - Check closed issues too

3. **Open New Issue**
   - Provide error messages
   - Include steps to reproduce
   - Share relevant code snippets

4. **Contact Support**
   - GitHub: [@rochiyat](https://github.com/rochiyat)
   - Include system info (OS, Node version, etc.)

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:test          # Test connection
npm run db:studio        # Open Prisma Studio
npm run db:push          # Push schema changes
npm run db:seed          # Seed demo data
npm run db:reset         # Reset database

# Debugging
npm run lint             # Check for errors
npx prisma generate      # Regenerate Prisma Client
rm -rf .next             # Clear Next.js cache
rm -rf node_modules      # Remove dependencies
npm install              # Reinstall dependencies
```

---

**Last Updated**: November 21, 2024
