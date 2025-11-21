# Database Setup Guide

## Prerequisites

- MySQL 8.0 or higher installed
- Node.js 18.17 or higher

## Step 1: Create MySQL Database

Login to MySQL and create a new database:

```sql
CREATE DATABASE linktree_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Or create a user with permissions:

```sql
CREATE USER 'linktree_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON linktree_db.* TO 'linktree_user'@'localhost';
FLUSH PRIVILEGES;
```

## Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
DATABASE_URL="mysql://linktree_user:your_password@localhost:3306/linktree_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-key-here"
```

To generate a secure `NEXTAUTH_SECRET`, run:

```bash
openssl rand -base64 32
```

Or on Windows PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

## Step 3: Initialize Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

## Step 4: Run Database Migrations

Push the schema to your database:

```bash
npx prisma db push
```

Or create and run migrations:

```bash
npx prisma migrate dev --name init
```

**Note**: If you encounter errors with Prisma 7.x, the project uses Prisma 5.22.0 for stability. The dependencies are already configured correctly in `package.json`.

## Step 5: (Optional) Seed Database

Seed the database with demo data:

```bash
npm run db:seed
```

This will create:
- Demo user account (email: demo@example.com, password: demo123456)
- Sample links for the demo user

You can use Prisma Studio to view and manage your database:

```bash
npm run db:studio
```

This will open a web interface at `http://localhost:5555`

## Step 6: Test Database Connection

Verify your database is working:

```bash
npm run db:test
```

This will test the connection and show database statistics.

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Check if MySQL is running:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

2. Verify your credentials in `.env`

3. Check if the database exists:
   ```sql
   SHOW DATABASES;
   ```

### Migration Issues

If migrations fail:

1. Reset the database:
   ```bash
   npx prisma migrate reset
   ```

2. Or manually drop and recreate:
   ```sql
   DROP DATABASE linktree_db;
   CREATE DATABASE linktree_db;
   ```

## Database Schema

The application uses the following tables:

- **User**: Stores user accounts
- **Link**: Stores user links
- **Account**: OAuth accounts (for future social login)
- **Session**: User sessions
- **VerificationToken**: Email verification tokens

## Next Steps

After setting up the database:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Register a new account at `http://localhost:3000/register`

3. Login and access your dashboard at `http://localhost:3000/dashboard`

4. Your public profile will be available at `http://localhost:3000/your-username`
