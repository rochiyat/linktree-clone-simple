# Scripts

Utility scripts untuk development dan maintenance aplikasi Linktree Clone.

## 📋 Available Scripts

### Database Scripts

#### 🔍 Test Database Connection
Test koneksi database dan tampilkan statistik.

```bash
npm run db:test
```

**Fungsi:**
- Test koneksi ke database
- Menampilkan total users
- Menampilkan total links
- Verifikasi database berjalan dengan baik

**File:** `scripts/test-db.ts`

---

#### 🌱 Seed Database
Populate database dengan data demo untuk testing.

```bash
npm run db:seed
```

**Fungsi:**
- Membuat demo user dengan credentials:
  - Email: `demo@example.com`
  - Password: `demo123456`
  - Username: `demouser`
- Membuat 6 demo links (Website, GitHub, LinkedIn, Twitter, YouTube, Email)
- Profile views: 0 (default)

**File:** `prisma/seed.ts`

**Demo Profile:** `http://localhost:3000/demouser`

---

#### 🔄 Generate Prisma Client
Generate Prisma Client setelah perubahan schema.

```bash
npm run db:generate
```

**Kapan digunakan:**
- Setelah mengubah `prisma/schema.prisma`
- Setelah pull changes yang mengubah schema
- Saat error "Prisma Client not found"

---

#### 📤 Push Schema to Database
Push perubahan schema ke database tanpa migration.

```bash
npm run db:push
```

**Fungsi:**
- Sync schema dengan database
- Cocok untuk development
- Tidak membuat migration files

**⚠️ Warning:** Jangan gunakan di production!

---

#### 🗄️ Prisma Studio
Buka Prisma Studio untuk manage database via GUI.

```bash
npm run db:studio
```

**Fungsi:**
- Visual database editor
- CRUD operations via browser
- View relationships
- Akses di: `http://localhost:5555`

---

#### 🔀 Create Migration
Buat migration file untuk perubahan schema.

```bash
npm run db:migrate
```

**Fungsi:**
- Membuat migration file
- Apply migration ke database
- Generate Prisma Client
- Cocok untuk production workflow

---

#### 🔄 Reset Database
Reset database dan jalankan semua migrations dari awal.

```bash
npm run db:reset
```

**Fungsi:**
- Drop semua tables
- Jalankan ulang semua migrations
- Jalankan seed script (jika ada)

**⚠️ Warning:** Semua data akan hilang!

---

## 🚀 Development Scripts

### Start Development Server
```bash
npm run dev
```
Jalankan Next.js development server di `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Build aplikasi untuk production (includes Prisma generate)

### Start Production Server
```bash
npm run start
```
Jalankan production build

### Lint Code
```bash
npm run lint
```
Check code quality dengan ESLint

---

## 📝 Usage Examples

### Setup Database Pertama Kali
```bash
# 1. Generate Prisma Client
npm run db:generate

# 2. Push schema ke database
npm run db:push

# 3. Seed dengan data demo
npm run db:seed

# 4. Test koneksi
npm run db:test
```

### Development Workflow
```bash
# 1. Ubah schema di prisma/schema.prisma
# 2. Push perubahan
npm run db:push

# 3. Generate client
npm run db:generate

# 4. Test
npm run db:test
```

### Production Workflow
```bash
# 1. Ubah schema di prisma/schema.prisma
# 2. Buat migration
npm run db:migrate

# 3. Commit migration files
git add prisma/migrations
git commit -m "Add new migration"
```

---

## 🛠️ Adding New Scripts

1. Buat file `.ts` baru di folder `scripts/`
2. Tambahkan script ke `package.json` di section `scripts`
3. Dokumentasikan di README ini
4. Test script dengan `npx ts-node scripts/your-script.ts`

### Template Script Baru
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🚀 Starting script...');
    
    // Your code here
    
    console.log('✅ Script completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
```

---

## 📦 Requirements

- **Node.js** >= 18.x
- **TypeScript** >= 5.x
- **ts-node** (dev dependency)
- **Prisma Client** >= 5.x
- **MySQL** database

---

## 🔗 Related Files

- `package.json` - Script definitions
- `prisma/schema.prisma` - Database schema
- `prisma/seed.ts` - Seed data
- `.env` - Database connection string

---

## 🆘 Troubleshooting

### Error: "Prisma Client not found"
```bash
npm run db:generate
```

### Error: "Can't reach database server"
- Check `.env` file
- Pastikan MySQL server running
- Test dengan `npm run db:test`

### Error: "Migration failed"
```bash
# Reset dan coba lagi
npm run db:reset
```

### Permission Error saat Generate
- Stop development server
- Tutup semua terminal
- Jalankan `npm run db:generate` lagi
