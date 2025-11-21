'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
import { Badge } from '@/components/ui/badge';
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
  Link as LinkIcon,
  Sparkles,
  Home,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { DynamicIcon } from '@/components/dynamic-icon';

interface LinkType {
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
  profileViews: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkType | null>(null);
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

  const handleToggleActive = async (link: LinkType) => {
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

  const openEditDialog = (link: LinkType) => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const activeLinksCount = links.filter((link) => link.isActive).length;
  const totalLinksCount = links.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header/Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Dashboard</h1>
                <p className="text-xs text-gray-600 hidden sm:block">
                  Welcome back, {profile?.name}!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href={`/${profile?.username}`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">View Profile</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Links</p>
                  <p className="text-3xl font-bold">{totalLinksCount}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Links</p>
                  <p className="text-3xl font-bold">{activeLinksCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-3xl font-bold">
                    {profile?.profileViews || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-2 shadow-lg sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-purple-100">
                    <AvatarImage
                      src={
                        profile?.image ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.name}`
                      }
                      alt={profile?.name || 'User'}
                    />
                    <AvatarFallback className="text-2xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  {profile?.image && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveImage}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 mb-4"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove Picture
                    </Button>
                  )}
                  <h3 className="font-bold text-xl mb-1">{profile?.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    @{profile?.username}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">{profile?.email}</p>
                  {profile?.bio && (
                    <p className="text-sm text-gray-700 mb-4">{profile?.bio}</p>
                  )}
                </div>

                <Dialog
                  open={isProfileDialogOpen}
                  onOpenChange={setIsProfileDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
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
                            Enter a URL to your profile picture
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
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-blue-600"
                        >
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Links Management - Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <LinkIcon className="w-6 h-6" />
                      Your Links
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Manage and customize your links
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
                      <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Link
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
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
                                setFormData({
                                  ...formData,
                                  title: e.target.value,
                                })
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
                                setFormData({
                                  ...formData,
                                  url: e.target.value,
                                })
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
                                setFormData({
                                  ...formData,
                                  icon: e.target.value,
                                })
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
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-blue-600"
                          >
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
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <LinkIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No links yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create your first link to get started
                    </p>
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Link
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className="group flex items-center gap-4 p-4 border-2 rounded-lg hover:shadow-md transition-all bg-white"
                      >
                        <div
                          className={`w-12 h-12 rounded-lg bg-${link.color}-100 flex items-center justify-center flex-shrink-0`}
                        >
                          {link.icon ? (
                            <DynamicIcon
                              name={link.icon}
                              className={`w-6 h-6 text-${link.color}-600`}
                            />
                          ) : (
                            <ExternalLink
                              className={`w-6 h-6 text-${link.color}-600`}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">
                              {link.title}
                            </h3>
                            {link.isActive ? (
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50">
                                Hidden
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {link.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Switch
                            checked={link.isActive}
                            onCheckedChange={() => handleToggleActive(link)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(link.url, '_blank')}
                            className="hidden sm:flex"
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
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
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
      </div>
    </div>
  );
}
