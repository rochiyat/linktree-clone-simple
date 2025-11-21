# Frequently Asked Questions (FAQ)

## General Questions

### What is Linktree Clone Simple?

A full-stack, self-hosted alternative to Linktree built with Next.js 14, featuring user authentication, database integration, and a complete admin dashboard for managing your links.

### Is it free to use?

Yes! This is an open-source project under MIT License. You can use it for free, modify it, and even use it commercially.

### Do I need coding knowledge to use this?

Basic knowledge of web development is helpful for setup and customization. However, once deployed, the dashboard is user-friendly and requires no coding.

---

## Setup & Installation

### What do I need to run this project?

- Node.js 18.17 or later
- MySQL 8.0 or later
- A code editor (VS Code recommended)
- Basic command line knowledge

### Can I use PostgreSQL instead of MySQL?

Yes! Prisma supports multiple databases. Update your `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Then update your `DATABASE_URL` in `.env`.

### How do I generate NEXTAUTH_SECRET?

Run this command:

```bash
openssl rand -base64 32
```

Or on Windows PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### I'm getting "Can't connect to database" error

Check these:
1. MySQL is running
2. Database exists
3. Credentials in `.env` are correct
4. Database URL format is correct: `mysql://user:password@localhost:3306/database`

### How do I reset my database?

```bash
npm run db:reset
```

This will delete all data and recreate tables.

---

## Features & Usage

### Can I have multiple users?

Yes! Each user gets their own account, dashboard, and public profile page.

### How many links can I add?

Unlimited! There's no restriction on the number of links per user.

### Can I customize the colors?

Yes! Each link can have one of 6 colors: Purple, Blue, Green, Red, Orange, Pink. You can also modify the CSS for custom colors.

### How do I hide a link without deleting it?

Use the toggle switch next to each link in the dashboard to activate/deactivate it.

### Can I reorder my links?

Currently, links are ordered by creation date. Drag-and-drop reordering is planned for a future update.

### What icons are supported?

The project uses Lucide Icons. You can specify any Lucide icon name (e.g., "Globe", "Github", "Mail").

### Can I add images to links?

Not yet, but this feature is planned for a future update.

---

## Authentication & Security

### How secure is the authentication?

- Passwords are hashed using bcrypt (12 rounds)
- Sessions use JWT tokens
- CSRF protection enabled
- SQL injection prevention via Prisma

### Can I add social login (Google, GitHub)?

Not in the current version, but it's planned for v3.0. NextAuth.js supports it, so it can be added.

### How do I reset a forgotten password?

Password reset is not implemented yet. For now, you can reset it directly in the database or via Prisma Studio.

### Can I enable two-factor authentication?

Not currently, but it's on the roadmap for future versions.

---

## Deployment

### Where can I deploy this?

- Vercel (recommended)
- Netlify
- Railway
- Any platform supporting Next.js
- Your own VPS/server

### Do I need a paid hosting plan?

No! Vercel's free tier is sufficient for personal use. You'll need a database though (PlanetScale free tier works great).

### How much does it cost to run?

- Hosting: Free (Vercel free tier)
- Database: Free (PlanetScale free tier) or $5-10/month
- Domain: $10-15/year (optional)

### Can I use a custom domain?

Yes! Most hosting platforms support custom domains. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

### How do I update my deployed app?

Just push to your GitHub repository. If connected to Vercel, it will auto-deploy.

---

## Customization

### How do I change the default colors?

Edit `app/linktree.module.css` and modify the color classes.

### Can I add my own logo?

Yes! Replace `public/favicon.svg` and update the logo in your profile settings.

### How do I customize the landing page?

Edit `app/page.tsx` to customize the main landing page.

### Can I change the font?

Yes! The project uses Geist font. You can change it in `app/layout.tsx`.

### How do I add custom CSS?

Add your styles to `app/globals.css` or create new CSS modules.

---

## Database

### How do I backup my database?

Use your database provider's backup feature, or use mysqldump:

```bash
mysqldump -u user -p linktree_db > backup.sql
```

### How do I view my database?

Use Prisma Studio:

```bash
npm run db:studio
```

Opens at `http://localhost:5555`

### Can I migrate from another Linktree clone?

You'll need to manually import data. Export from your old system and import via Prisma Studio or SQL.

### How do I add new fields to the database?

1. Update `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Update your code to use the new fields

---

## Troubleshooting

### Build fails with TypeScript errors

Run:
```bash
npm run lint
```

Fix any errors shown, then rebuild.

### "Module not found" errors

Delete `node_modules` and reinstall:

```bash
rm -rf node_modules
npm install
```

### Links not showing on public profile

Check:
1. Links are marked as "active" in dashboard
2. User exists and username is correct
3. Database connection is working

### Dashboard shows "Unauthorized"

Your session may have expired. Try logging out and back in.

### Images not loading

Check:
1. Image URLs are valid
2. Images are accessible publicly
3. Next.js Image optimization is working

---

## Performance

### How many users can it handle?

Depends on your hosting and database. Vercel + PlanetScale can handle thousands of users.

### Is it fast?

Yes! Next.js provides excellent performance with:
- Server-side rendering
- Static generation
- Image optimization
- Code splitting

### How do I improve performance?

- Enable caching
- Use a CDN
- Optimize images
- Add database indexes
- Use connection pooling

---

## Contributing

### How can I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### I found a bug, what should I do?

Open an issue on GitHub with:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Can I request features?

Yes! Open a feature request on GitHub Issues.

---

## Licensing

### Can I use this commercially?

Yes! MIT License allows commercial use.

### Do I need to credit the original author?

Not required, but appreciated! You can keep the "Made from the oven 🔥" footer or add your own.

### Can I sell this as a service?

Yes, the MIT License allows this.

---

## Support

### Where can I get help?

1. Check this FAQ
2. Read the documentation
3. Search GitHub Issues
4. Open a new issue
5. Contact the maintainer

### Is there a Discord/Slack community?

Not yet, but if there's interest, we can create one!

### How do I report security issues?

See [SECURITY.md](SECURITY.md) for responsible disclosure.

---

## Roadmap

### What features are planned?

See [FEATURES.md](FEATURES.md) for the complete roadmap, including:
- Link analytics
- Social OAuth
- Custom themes
- QR codes
- And more!

### When will feature X be released?

No fixed timeline. Contributions are welcome to speed up development!

---

## Comparison

### How is this different from Linktree?

**Advantages:**
- Self-hosted (you own your data)
- No monthly fees
- Unlimited links
- Full customization
- Open source

**Disadvantages:**
- Requires technical setup
- No built-in analytics (yet)
- You manage hosting

### How is this different from other clones?

- Full authentication system
- Database-driven (not static)
- Admin dashboard
- Production-ready
- Well-documented

---

## Still have questions?

- Check the [documentation](README.md)
- Open an [issue](https://github.com/rochiyat/linktree-clone-simple/issues)
- Contact [@rochiyat](https://github.com/rochiyat)

---

**Last Updated**: November 20, 2024
