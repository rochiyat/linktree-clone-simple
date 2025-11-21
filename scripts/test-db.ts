import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');

    await prisma.$connect();
    console.log('✅ Database connected successfully!');

    // Test query
    const userCount = await prisma.user.count();
    console.log(`📊 Total users in database: ${userCount}`);

    const linkCount = await prisma.link.count();
    console.log(`🔗 Total links in database: ${linkCount}`);

    await prisma.$disconnect();
    console.log('👋 Database disconnected');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
