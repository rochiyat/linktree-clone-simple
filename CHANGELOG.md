# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-11-20

### Added
- 🔐 **Authentication System**
  - User registration with email and password
  - Secure login with NextAuth.js
  - JWT-based session management
  - Password hashing with bcrypt
  - Protected routes with middleware

- 📊 **Admin Dashboard**
  - Full CRUD operations for links
  - Create, read, update, and delete links
  - Toggle link visibility (active/inactive)
  - Real-time link management
  - User profile management

- 🗄️ **Database Integration**
  - MySQL database support
  - Prisma ORM integration
  - Database migrations
  - Relational data models
  - Connection pooling

- 👤 **User Profiles**
  - Dynamic public profile pages
  - Unique username-based URLs
  - Customizable profile information
  - Bio and avatar support
  - SEO-optimized meta tags

- 🎨 **Link Customization**
  - 6 color themes (Purple, Blue, Green, Red, Orange, Pink)
  - Custom descriptions
  - Icon support
  - Ordering system
  - Visibility controls

- 🔌 **API Endpoints**
  - `/api/register` - User registration
  - `/api/auth/*` - Authentication
  - `/api/links` - Link management
  - `/api/profile` - Profile management
  - `/api/user/[username]` - Public user data

- 📚 **Documentation**
  - Quick Start Guide
  - Database Setup Guide
  - Features Documentation
  - Deployment Guide
  - Contributing Guidelines

### Changed
- Migrated from static links to database-driven content
- Updated UI components for dashboard
- Enhanced security with authentication
- Improved project structure

### Security
- Added password hashing
- Implemented CSRF protection
- Added route protection
- Secured API endpoints

## [1.0.0] - 2024-11-01

### Added
- ⚡ Initial release with Next.js 14
- 🎨 Tailwind CSS styling
- 📱 Responsive design
- 🔗 Static link display
- 🖼️ Profile section
- 🎭 Lucide icons integration
- 🌈 Color customization
- 📦 Shadcn/ui components

### Features
- Static linktree page
- Customizable profile
- Social media links
- Color picker for links
- Mobile-first design

---

## Version History

- **v2.0.0** - Full-stack application with authentication and database
- **v1.0.0** - Initial static version

## Upgrade Guide

### From v1.0.0 to v2.0.0

This is a major update that requires database setup:

1. **Install new dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   - Install MySQL
   - Create database
   - Configure `.env`

3. **Run migrations**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Update your code**
   - Static links are now managed in dashboard
   - Profile information is stored in database
   - Authentication is required for editing

5. **Migrate your data**
   - Register a new account
   - Add your links through dashboard
   - Update profile information

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions.

## Breaking Changes

### v2.0.0

- **Static links removed**: Links are now managed through dashboard
- **Authentication required**: Must login to edit content
- **Database required**: MySQL database is now mandatory
- **Environment variables**: New variables required (see `.env.example`)
- **API structure**: New API endpoints for data management

## Future Releases

### Planned for v2.1.0
- [ ] Link analytics
- [ ] Click tracking
- [ ] Custom themes
- [ ] Link scheduling

### Planned for v3.0.0
- [ ] Social OAuth (Google, GitHub)
- [ ] Custom domains
- [ ] Team collaboration
- [ ] Advanced analytics

## Support

For questions about changes or upgrades:
- Check the documentation
- Open an issue on GitHub
- Join discussions

---

**Note**: This changelog is maintained manually. For a complete list of changes, see the [commit history](https://github.com/rochiyat/linktree-clone-simple/commits/main).
