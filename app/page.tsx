'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Link as LinkIcon,
  Sparkles,
  Shield,
  Zap,
  Users,
  Palette,
  BarChart,
  ArrowRight,
  Check,
  Github,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Built with Next.js 14 for optimal performance',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Fully Customizable',
      description: 'Choose from 6 colors and unlimited icons',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User Friendly',
      description: 'Intuitive dashboard for easy link management',
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: 'Unlimited Links',
      description: 'Add as many links as you need, no restrictions',
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Analytics Ready',
      description: 'Track your link performance (coming soon)',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up in seconds with just your email',
    },
    {
      number: '2',
      title: 'Add Your Links',
      description: 'Customize with icons, colors, and descriptions',
    },
    {
      number: '3',
      title: 'Share Your Profile',
      description: 'Get your unique URL and share it everywhere',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Linktree Clone
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">
              Free & Open Source
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            One Link for
            <br />
            Everything You Are
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share your social media, portfolio, and important links in one
            beautiful page. Built with Next.js, TypeScript, and love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8"
              >
                Create Your Free Page
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Github className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-2">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg">John Doe</h3>
                    <p className="text-sm text-gray-600">
                      Full Stack Developer
                    </p>
                  </div>
                  <div className="w-full space-y-2">
                    {['Website', 'GitHub', 'LinkedIn'].map((link, i) => (
                      <div
                        key={i}
                        className="p-3 border-2 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:shadow-md transition-shadow"
                      >
                        <p className="font-medium text-center">{link}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Shine Online
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to make your link page stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <div className="space-y-4">
                {[
                  'No monthly fees or hidden costs',
                  'Full control over your data',
                  'Modern, responsive design',
                  'Easy to use dashboard',
                  'Unlimited customization',
                  'Fast and reliable',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 text-center">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-2xl font-semibold mb-4">Free Forever</div>
              <p className="text-gray-600">
                No credit card required. Start building your link page today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of creators sharing their links in style
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-12"
            >
              Create Your Free Page Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Linktree Clone</span>
              </div>
              <p className="text-gray-600 text-sm">
                Open source link-in-bio solution built with Next.js
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/register" className="hover:text-purple-600">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-purple-600">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/register" className="hover:text-purple-600">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-purple-600">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/register" className="hover:text-purple-600">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-purple-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            <p>
              Made with ❤️ by{' '}
              <Link href="/" className="text-purple-600 hover:underline">
                Rochiyat
              </Link>
            </p>
            <p className="mt-2">© 2024 Linktree Clone. Open Source & Free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
