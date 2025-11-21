<div align="center">

# 🌐 Linktree Clone Simple

### A modern, minimalist link-in-bio solution

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

[Demo](https://s.id/linktree-rochiyat) • [Quick Start](QUICK_START.md) • [Database Setup](DATABASE_SETUP.md) • [Report Bug](https://github.com/rochiyat/linktree-clone-simple/issues) • [Request Feature](https://github.com/rochiyat/linktree-clone-simple/issues)

</div>

---

## 📖 About The Project

A lightweight, customizable **Linktree alternative** built with modern web technologies. Perfect for creators, developers, and businesses who want to consolidate their online presence into a single, shareable link.

### Why This Project?

- 🎯 **Full Control** - Own your data and customize everything
- 🚀 **Lightning Fast** - Built on Next.js 14 with App Router
- 💰 **Free Forever** - No subscription fees or limitations
- 🎨 **Easy to Customize** - Simple codebase, easy to modify
- � **Mtobile First** - Optimized for all devices

---

## ✨ Features

- ⚡ **Next.js 14 App Router** - Latest React features with server components
- 🔐 **Authentication System** - Secure login and registration with NextAuth.js
- � **Admimn Dashboard** - Full CRUD operations for managing links
- �️ *R*MySQL Database** - Reliable data storage with Prisma ORM
- 🎨 **Tailwind CSS** - Utility-first styling with custom design system
- 🔗 **Unlimited Links** - Add as many links as you need
- 👤 **User Profiles** - Each user gets a unique public profile page
- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop
- �️  **Custom Branding** - Add your logo, avatar, and colors
- 🎭 **Icon Support** - Beautiful icons from Lucide Icons
- 🌙 **Theme Support** - Light/dark mode ready (via theme-provider)
- 🔄 **Real-time Updates** - Instant link activation/deactivation
- ♿ **Accessible** - Built with accessibility best practices
- 🛠️ **Easy Deployment** - One-click deploy to Vercel
- 📊 **SEO Optimized** - Meta tags and Open Graph support

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [NextAuth.js](https://next-auth.js.org/) | Authentication solution |
| [Prisma](https://www.prisma.io/) | Next-generation ORM |
| [MySQL](https://www.mysql.com/) | Relational database |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Shadcn/ui](https://ui.shadcn.com/) | Re-usable component library |
| [Lucide Icons](https://lucide.dev/) | Beautiful icon set |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |

---

## � Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js 18.17 or later
- MySQL 8.0 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rochiyat/linktree-clone-simple.git
   cd linktree-clone-simple
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Setup Database**
   
   Create a MySQL database:
   ```sql
   CREATE DATABASE linktree_db;
   ```

4. **Configure Environment Variables**
   
   Copy the example env file and update with your credentials:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database URL and generate a secret:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/linktree_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   ```
   
   Generate a secret with:
   ```bash
   openssl rand -base64 32
   ```

5. **Initialize Database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   - Register at `/register`
   - Login at `/login`
   - Access dashboard at `/dashboard`
   - View your public profile at `/your-username`

For detailed database setup instructions, see [DATABASE_SETUP.md](DATABASE_SETUP.md)

### Build for Production

```bash
npm run build
npm start
```

---

## ⚙️ Customization Guide

### 1. Register & Login

1. Go to `/register` and create your account
2. Choose a unique username (this will be your profile URL)
3. Login at `/login`

### 2. Manage Your Links (Dashboard)

Access your dashboard at `/dashboard`:

- **Add Links**: Click "Add Link" button
- **Edit Links**: Click the pencil icon on any link
- **Delete Links**: Click the trash icon
- **Toggle Visibility**: Use the switch to show/hide links
- **Reorder Links**: Links are displayed in the order they were created

### 3. Customize Your Profile

Update your profile information through the dashboard:
- Name
- Bio
- Avatar image
- Username (set during registration)

### 4. Share Your Profile

Your public profile is available at:
```
http://localhost:3000/your-username
```

Share this link on your social media!

### 5. Customize Styling

- **Global styles**: `app/globals.css`
- **Component styles**: `app/linktree.module.css`
- **Database schema**: `prisma/schema.prisma`

### 6. Add Your Logo/Favicon

Replace files in the `public/` directory:
- `favicon.svg` - Browser tab icon
- `placeholder-logo.png` - Your logo
- `placeholder-user.jpg` - Default avatar

---

## 📤 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rochiyat/linktree-clone-simple)

**Important**: Before deploying, you need:
1. A MySQL database (PlanetScale, Railway, or your own)
2. Environment variables configured
3. Database migrations run

**Quick Deploy Steps:**
1. Click the deploy button above
2. Connect your GitHub account
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
4. Deploy!
5. Run database migrations

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Other Platforms

This project can also be deployed to:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- Docker/VPS
- Any platform supporting Next.js

See [DEPLOYMENT.md](DEPLOYMENT.md) for platform-specific guides.

---

## 🗂️ Project Structure

```
linktree-clone-simple/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/        # NextAuth endpoints
│   │   ├── links/       # Link CRUD operations
│   │   ├── profile/     # Profile management
│   │   └── register/    # User registration
│   ├── dashboard/       # Admin dashboard
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── [username]/      # Dynamic public profile
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
├── components/
│   ├── ui/              # Shadcn/ui components
│   ├── providers.tsx    # Session & toast providers
│   └── theme-provider.tsx
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # Utility functions
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── .env.example         # Environment variables template
├── DATABASE_SETUP.md    # Database setup guide
└── package.json         # Dependencies
```

---

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get started in 5 minutes
- [Database Setup](DATABASE_SETUP.md) - Detailed database configuration
- [Features Documentation](FEATURES.md) - Complete feature list
- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [Deployment Guide](DEPLOYMENT.md) - Deploy to production
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Security Policy](SECURITY.md) - Security guidelines
- [Project Summary](PROJECT_SUMMARY.md) - Technical overview

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

This means you can:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

---

## 👤 Author

**Rochiyat**

Fullstack Engineer & Tech Writer

- 🌐 Website: [rochiyat.com](https://rochiyat.com)
- 💼 LinkedIn: [@rochiyat](https://linkedin.com/in/rochiyat)
- 📝 Medium: [@rochiyat](https://medium.com/@rochiyat)
- 🐙 GitHub: [@rochiyat](https://github.com/rochiyat)

---

## � Dokcumentation

- [Quick Start Guide](QUICK_START.md) - Get started in 5 minutes
- [Database Setup](DATABASE_SETUP.md) - Detailed database configuration
- [Features Documentation](FEATURES.md) - Complete feature list
- [Deployment Guide](DEPLOYMENT.md) - Deploy to production

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Links Management
- `GET /api/links` - Get all user links
- `POST /api/links` - Create new link
- `PATCH /api/links/[id]` - Update link
- `DELETE /api/links/[id]` - Delete link

### Profile
- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update profile

### Public
- `GET /api/user/[username]` - Get public user data

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://www.prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Vercel](https://vercel.com) for hosting
- All contributors who help improve this project

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/rochiyat/linktree-clone-simple?style=social)
![GitHub forks](https://img.shields.io/github/forks/rochiyat/linktree-clone-simple?style=social)
![GitHub issues](https://img.shields.io/github/issues/rochiyat/linktree-clone-simple)

---

<div align="center">

**If you find this project helpful, please give it a ⭐️!**

Made with ❤️ by [Rochiyat](https://github.com/rochiyat)

</div>