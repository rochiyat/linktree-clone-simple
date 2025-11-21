import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { LinkIcon } from '@/components/link-icon';
import styles from '../linktree.module.css';

async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      links: {
        where: { isActive: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  return user;
}

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Back Button */}
        <div className="mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <Avatar className={styles.avatar}>
            <AvatarImage
              src={
                user.image ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
              }
              alt={user.name || 'User'}
            />
            <AvatarFallback className={styles.avatarFallback}>
              {user.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>

          <h1 className={styles.profileName}>{user.name}</h1>

          {user.bio && <p className={styles.profileDescription}>{user.bio}</p>}
        </div>

        {/* Links Section */}
        <div className={styles.linksSection}>
          {user.links.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No links available yet</p>
            </div>
          ) : (
            user.links.map((link) => (
              <div key={link.id} className={styles.linkItem}>
                <div className={styles.linkCard}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <div className={styles.linkButton}>
                      <div className={styles.linkContent}>
                        <div
                          className={`${styles.linkIcon} ${styles[link.color]}`}
                        >
                          <LinkIcon iconName={link.icon} className="w-5 h-5" />
                        </div>
                        <div className={styles.linkText}>
                          <h3 className={styles.linkTitle}>{link.title}</h3>
                          {link.description && (
                            <p className={styles.linkDescription}>
                              {link.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>Made from the oven 🔥</p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return {
      title: 'User Not Found',
    };
  }

  return {
    title: `${user.name} - Links`,
    description: user.bio || `Check out ${user.name}'s links`,
  };
}
