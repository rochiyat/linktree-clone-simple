import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123456', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
      username: 'demouser',
      bio: 'This is a demo account. Feel free to explore!',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create demo links
  const links = [
    {
      title: 'Personal Website',
      url: 'https://example.com',
      description: 'Check out my personal website',
      icon: 'Globe',
      color: 'purple',
      order: 0,
      userId: user.id,
    },
    {
      title: 'GitHub Profile',
      url: 'https://github.com',
      description: 'Follow me on GitHub',
      icon: 'Github',
      color: 'blue',
      order: 1,
      userId: user.id,
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com',
      description: 'Connect with me professionally',
      icon: 'Linkedin',
      color: 'blue',
      order: 2,
      userId: user.id,
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com',
      description: 'Follow me on Twitter',
      icon: 'Twitter',
      color: 'blue',
      order: 3,
      userId: user.id,
    },
    {
      title: 'YouTube Channel',
      url: 'https://youtube.com',
      description: 'Subscribe to my channel',
      icon: 'Youtube',
      color: 'red',
      order: 4,
      userId: user.id,
    },
    {
      title: 'Contact Me',
      url: 'mailto:demo@example.com',
      description: 'Send me an email',
      icon: 'Mail',
      color: 'green',
      order: 5,
      userId: user.id,
    },
  ];

  for (const link of links) {
    await prisma.link.create({
      data: link,
    });
  }

  console.log('✅ Created demo links');
  console.log('\n📝 Demo Account Credentials:');
  console.log('   Email: demo@example.com');
  console.log('   Password: demo123456');
  console.log('   Username: demouser');
  console.log('\n🔗 Access demo profile at: http://localhost:3000/demouser');
  console.log('🎯 Login at: http://localhost:3000/login');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
