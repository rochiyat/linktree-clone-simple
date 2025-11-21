'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  LogOut,
  Eye,
  X,
  User,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { DynamicIcon } from '@/components/dynamic-icon';

interface Link {
  id: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  color: string;
  order: number;
  isActive: boolean;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: '',
    color: 'purple',
  });
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    bio: '',
    image: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchLinks();
      fetchProfile();
    }
  }, [status, router]);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (error) {
      toast.error('Failed to fetch links');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setProfileFormData({
          name: data.name || '',
          bio: data.bio || '',
          image: data.image || '',
        });
      }
    } catch (error) {
      toast.error('Failed to fetch profile');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileFormData),
      });

      if (response.ok) {
        toast.success('Profile updated!');
        setIsProfileDialogOpen(false);
        fetchProfile();
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleRemoveImage = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: null }),
      });

      if (response.ok) {
        toast.success('Profile picture removed!');
        setProfileFormData({ ...profileFormData, image: '' });
        fetchProfile();
      } else {
        toast.error('Failed to remove picture');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingLink ? `/api/links/${editingLink.id}` : '/api/links';
      const method = editingLink ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editingLink ? 'Link updated!' : 'Link created!');
        setIsDialogOpen(false);
        resetForm();
        fetchLinks();
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      const response = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Link deleted!');
        fetchLinks();
      } else {
        toast.error('Failed to delete link');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleToggleActive = async (link: Link) => {
    try {
      const response = await fetch(`/api/links/${link.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !link.isActive }),
      });

      if (response.ok) {
        toast.success(link.isActive ? 'Link hidden' : 'Link activated');
        fetchLinks();
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const openEditDialog = (link: Link) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      icon: link.icon || '',
      color: link.color,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingLink(null);
    setFormData({
      title: '',
      url: '',
      description: '',
      icon: '',
      color: 'purple',
    });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name}!
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/${(session?.user as any)?.username}`)
              }
            >
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            <Button variant="outline" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Manage your profile information and picture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={
                      profile?.image ||
                      `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.name}`
                    }
                    alt={profile?.name || 'User'}
                  />
                  <AvatarFallback>
                    <User className="w-12 h-12" />
                  </AvatarFallback>
                </Avatar>
                {profile?.image && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="text-destructive"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{profile?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">@{profile?.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bio</p>
                    <p className="text-sm">{profile?.bio || 'No bio yet'}</p>
                  </div>
                </div>
                <Dialog
                  open={isProfileDialogOpen}
                  onOpenChange={setIsProfileDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="mt-4">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <form onSubmit={handleProfileSubmit}>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            value={profileFormData.name}
                            onChange={(e) =>
                              setProfileFormData({
                                ...profileFormData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            value={profileFormData.bio}
                            onChange={(e) =>
                              setProfileFormData({
                                ...profileFormData,
                                bio: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Profile Picture URL</Label>
                          <Input
                            id="image"
                            type="url"
                            placeholder="https://example.com/avatar.jpg"
                            value={profileFormData.image}
                            onChange={(e) =>
                              setProfileFormData({
                                ...profileFormData,
                                image: e.target.value,
                              })
                            }
                          />
                          <p className="text-xs text-muted-foreground">
                            Enter a URL to your profile picture or leave empty
                            for default avatar
                          </p>
                        </div>
                        {profileFormData.image && (
                          <div className="space-y-2">
                            <Label>Preview</Label>
                            <Avatar className="w-20 h-20">
                              <AvatarImage
                                src={profileFormData.image}
                                alt="Preview"
                              />
                              <AvatarFallback>
                                <User className="w-10 h-10" />
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsProfileDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Links</CardTitle>
                <CardDescription>
                  Manage your links and customize your profile
                </CardDescription>
              </div>
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>
                        {editingLink ? 'Edit Link' : 'Add New Link'}
                      </DialogTitle>
                      <DialogDescription>
                        Fill in the details for your link
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="My Website"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">URL *</Label>
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com"
                          value={formData.url}
                          onChange={(e) =>
                            setFormData({ ...formData, url: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          placeholder="Check out my website"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Lucide name)</Label>
                        <Input
                          id="icon"
                          placeholder="Globe"
                          value={formData.icon}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Browse icons at{' '}
                          <a
                            href="https://lucide.dev/icons"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            lucide.dev/icons
                          </a>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Select
                          value={formData.color}
                          onValueChange={(value) =>
                            setFormData({ ...formData, color: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                            <SelectItem value="pink">Pink</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">
                        {editingLink ? 'Update' : 'Create'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {links.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No links yet. Create your first link!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg bg-${link.color}-100 flex items-center justify-center`}
                      >
                        {link.icon ? (
                          <DynamicIcon name={link.icon} className="w-5 h-5" />
                        ) : (
                          <ExternalLink className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {link.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={link.isActive}
                        onCheckedChange={() => handleToggleActive(link)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(link)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(link.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
