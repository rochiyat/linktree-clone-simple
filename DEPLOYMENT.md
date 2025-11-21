# Deployment Guide

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)
- MySQL database (PlanetScale, Railway, or other)

### Step 1: Prepare Your Database

#### Option A: PlanetScale (Recommended)

1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database
3. Get your connection string
4. Update `DATABASE_URL` in your environment variables

#### Option B: Railway

1. Sign up at [railway.app](https://railway.app)
2. Create a new MySQL database
3. Copy the connection string
4. Update `DATABASE_URL`

#### Option C: Your Own MySQL Server

Make sure your MySQL server is accessible from the internet.

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:

```env
DATABASE_URL=your_mysql_connection_string
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

5. Click "Deploy"

### Step 4: Run Database Migrations

After deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migration
vercel env pull .env.local
npx prisma db push
```

Or use Vercel's build command:

Update `package.json`:
```json
{
  "scripts": {
    "build": "prisma generate && prisma db push && next build"
  }
}
```

### Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Register a new account
3. Create some links
4. Test your public profile

## Deploying to Other Platforms

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Railway

1. Create new project
2. Connect GitHub repository
3. Add MySQL database
4. Set environment variables
5. Deploy

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mysql://user:password@db:3306/linktree_db
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=linktree_db
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Run:
```bash
docker-compose up -d
```

## Environment Variables

### Required Variables

```env
# Database connection
DATABASE_URL="mysql://user:password@host:3306/database"

# NextAuth configuration
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

### Optional Variables

```env
# Node environment
NODE_ENV="production"

# Database connection pool
DATABASE_POOL_SIZE=10
```

## Post-Deployment Checklist

- [ ] Database is accessible
- [ ] Environment variables are set
- [ ] Migrations are run
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard is accessible
- [ ] Public profiles load
- [ ] Links are clickable
- [ ] SSL certificate is active
- [ ] Custom domain is configured (optional)

## Troubleshooting

### Database Connection Issues

1. Check if database is accessible from deployment platform
2. Verify connection string format
3. Check firewall rules
4. Ensure database exists

### Build Failures

1. Check build logs
2. Verify all dependencies are installed
3. Ensure Prisma is generating correctly
4. Check TypeScript errors

### Runtime Errors

1. Check application logs
2. Verify environment variables
3. Test database connection
4. Check API routes

## Performance Optimization

### Database

- Enable connection pooling
- Add database indexes
- Use read replicas for scaling

### Caching

- Enable Vercel Edge Caching
- Use Redis for session storage
- Implement API response caching

### CDN

- Use Vercel's built-in CDN
- Optimize images with Next.js Image
- Enable compression

## Monitoring

### Recommended Tools

- **Vercel Analytics** - Built-in analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Uptime Robot** - Uptime monitoring

### Setup Sentry

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Scaling

### Horizontal Scaling

- Use Vercel's automatic scaling
- Add read replicas for database
- Implement caching layer

### Vertical Scaling

- Upgrade database plan
- Increase connection pool size
- Optimize queries

## Security

### Production Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF tokens

### Recommended Headers

Add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## Backup Strategy

### Database Backups

- Enable automatic backups on your database provider
- Schedule daily backups
- Test restore procedures
- Store backups in multiple locations

### Code Backups

- Use Git for version control
- Push to GitHub regularly
- Tag releases
- Maintain changelog

## Custom Domain

### Vercel

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records
5. Wait for SSL certificate

### DNS Configuration

Add these records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [Next.js Deployment](https://nextjs.org/docs/deployment)
- Open an issue on GitHub
