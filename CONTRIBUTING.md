# Contributing to Linktree Clone Simple

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests if available
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18.17 or later
- MySQL 8.0 or later
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/linktree-clone-simple.git
   cd linktree-clone-simple
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your local database credentials

4. **Setup database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference when possible

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use meaningful variable and function names
- Add comments for complex logic

### Component Structure

```typescript
// Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Types/Interfaces
interface ComponentProps {
  title: string;
  onSubmit: () => void;
}

// Component
export function Component({ title, onSubmit }: ComponentProps) {
  // State
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleClick = () => {
    // Logic here
  };

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### API Routes

```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Logic here
    const data = await prisma.model.findMany();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### Database Changes

When making database changes:

1. Update `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Create a migration: `npm run db:migrate`
4. Test the migration
5. Document the changes

### Commit Messages

Use clear and meaningful commit messages:

- `feat: add user profile editing`
- `fix: resolve login redirect issue`
- `docs: update installation guide`
- `style: format code with prettier`
- `refactor: simplify link creation logic`
- `test: add tests for authentication`
- `chore: update dependencies`

## Testing

Before submitting a PR:

1. Test your changes locally
2. Ensure no TypeScript errors
3. Test on different browsers if UI changes
4. Test on mobile if responsive changes
5. Verify database migrations work

## Documentation

When adding new features:

1. Update README.md if needed
2. Add comments to complex code
3. Update FEATURES.md
4. Add examples if applicable

## Project Structure

```
app/
├── api/              # API routes
├── dashboard/        # Dashboard pages
├── login/           # Auth pages
└── [username]/      # Public profiles

components/
├── ui/              # Reusable UI components
└── providers.tsx    # Context providers

lib/
├── auth.ts          # Auth configuration
├── prisma.ts        # Database client
└── utils.ts         # Utility functions

prisma/
└── schema.prisma    # Database schema
```

## Questions?

Feel free to:
- Open an issue for questions
- Join discussions
- Reach out to maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

Thank you for contributing! 🚀
