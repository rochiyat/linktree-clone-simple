# View Counter dengan Validasi Token

## Deskripsi
Sistem view counter telah diupdate untuk tidak menghitung views jika pengunjung adalah pemilik profil sendiri. Validasi dilakukan menggunakan JWT token yang disimpan di localStorage.

## Cara Kerja

### 1. Login & Token Generation
- Saat user login, sistem akan:
  1. Melakukan autentikasi melalui NextAuth
  2. Mengambil JWT token dari endpoint `/api/auth/token`
  3. Menyimpan token ke `localStorage` dengan key `token`

### 2. View Counter Logic
- Saat halaman profil `[username]` dibuka:
  1. Component `ViewCounter` akan mengambil token dari localStorage
  2. Mengirim request POST ke `/api/profile/[username]/views` dengan token di header Authorization
  3. Backend akan memvalidasi token:
     - Jika token valid dan username di token sama dengan username profil → **views TIDAK ditambahkan**
     - Jika token tidak ada atau username berbeda → **views ditambahkan**

### 3. Logout
- Saat user logout, token akan dihapus dari localStorage

## File yang Dimodifikasi

1. **lib/jwt.ts** (NEW)
   - Helper functions untuk generate dan verify JWT token
   - `generateToken()`: Membuat JWT token dengan payload userId, username, email
   - `verifyToken()`: Memvalidasi JWT token

2. **app/api/auth/token/route.ts** (NEW)
   - API endpoint untuk mendapatkan JWT token setelah login
   - Menggunakan session NextAuth untuk generate token

3. **components/view-counter.tsx**
   - Menambahkan pengambilan token dari localStorage
   - Mengirim token di header Authorization

4. **app/api/profile/[username]/views/route.ts**
   - Menambahkan validasi token
   - Cek apakah token milik pemilik profil
   - Skip increment views jika pemilik profil sendiri

5. **app/login/page.tsx**
   - Menambahkan fetch token setelah login berhasil
   - Menyimpan token ke localStorage

6. **app/dashboard/page.tsx**
   - Menambahkan penghapusan token saat logout

## Testing

### Test Case 1: Owner mengunjungi profil sendiri
1. Login sebagai user A
2. Buka profil user A (`/userA`)
3. **Expected**: Views tidak bertambah

### Test Case 2: User lain mengunjungi profil
1. Login sebagai user A
2. Buka profil user B (`/userB`)
3. **Expected**: Views bertambah

### Test Case 3: Guest (tidak login) mengunjungi profil
1. Tidak login (atau logout)
2. Buka profil user A (`/userA`)
3. **Expected**: Views bertambah

## Security Notes
- Token menggunakan JWT dengan secret dari `NEXTAUTH_SECRET`
- Token expire dalam 30 hari
- Token disimpan di localStorage (client-side)
- Validasi token dilakukan di server-side
