# Scripts

Utility scripts for development and maintenance.

## Available Scripts

### test-db.ts

Test database connection and display statistics.

```bash
npm run db:test
```

This script will:
- Test database connection
- Display total users
- Display total links
- Verify database is working correctly

## Usage

All scripts can be run using npm:

```bash
npm run db:test
```

Or directly with ts-node:

```bash
npx ts-node scripts/test-db.ts
```

## Adding New Scripts

1. Create a new `.ts` file in this directory
2. Add the script to `package.json` scripts section
3. Document it in this README

## Requirements

- TypeScript
- ts-node (installed as dev dependency)
- Prisma Client
