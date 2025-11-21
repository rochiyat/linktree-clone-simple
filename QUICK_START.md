# Quick Start Guide

Get your Linktree clone up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` and add your database credentials:

```env
DATABASE_URL="mysql://root:password@localhost:3306/linktree_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
```

## 3. Create Database

Open MySQL and run:

```sql
CREATE DATABASE linktree_db;
```

## 4. Initialize Database

```bash
npm run db:generate
npm run db:push
```

## 5. Start Development Server

```bash
npm run dev
```

## 6. Create Your Account

1. Open http://localhost:3000/register
2. Fill in your details
3. Choose a unique username
4. Click "Create account"

## 7. Login & Add Links

1. Login at http://localhost:3000/login
2. Go to dashboard at http://localhost:3000/dashboard
3. Click "Add Link" to create your first link
4. Fill in the details and click "Create"

## 8. View Your Public Profile

Your profile is available at:
```
http://localhost:3000/your-username
```

## Useful Commands

```bash
# Start development server
npm run dev

# View database in browser
npm run db:studio

# Reset database
npm run db:reset

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Can't connect to database?

1. Make sure MySQL is running
2. Check your credentials in `.env`
3. Verify database exists: `SHOW DATABASES;`

### NextAuth error?

Make sure you have set `NEXTAUTH_SECRET` in `.env`

### Port 3000 already in use?

Run on different port:
```bash
npm run dev -- -p 3001
```

## Next Steps

- Customize your profile in the dashboard
- Add your social media links
- Share your profile URL
- Deploy to Vercel (see README.md)

Need help? Check [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions.
