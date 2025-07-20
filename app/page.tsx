'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  BarChart3, 
  Award, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Comprehensive student record management with detailed profiles and academic history"
  },
  {
    icon: BookOpen,
    title: "Grade Tracking",
    description: "Real-time grade entry and tracking with detailed performance analytics"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Advanced charts and insights to track academic progress over time"
  },
  {
    icon: Award,
    title: "Academic Reports",
    description: "Generate detailed academic reports and transcripts in PDF format"
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Role-based authentication ensuring data security and privacy"
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Instant notifications and updates for grades and academic activities"
  }
]

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Academic Director",
    content: "Acadex has revolutionized how we manage student records. The interface is intuitive and the analytics are incredibly helpful.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Mathematics Teacher",
    content: "Grade entry is now so much faster, and students love being able to track their progress in real-time.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    content: "I can easily track my performance across all subjects and download my academic reports whenever needed.",
    rating: 5
  }
]

export default function LandingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    } else {
      setIsVisible(true)
    }
  }, [user, loading, router])

  if (loading || !isVisible) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Acadex</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="hover:bg-blue-50 transition-all duration-200"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200">
                <Globe className="h-3 w-3 mr-1" />
                Trusted by 1000+ Educational Institutions
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Modern Student Result
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  {" "}Management System
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Streamline academic record management with our comprehensive platform. 
                Track grades, generate reports, and provide insights for better educational outcomes.
              </p>
            </div>
            
            <div className="animate-fade-in-up-delay flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => router.push('/login')}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105"
              >
                View Demo
              </Button>
            </div>

            {/* Demo Credentials */}
            <div className="animate-fade-in-up-delay-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-6 max-w-md mx-auto shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Demo Credentials</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Teacher:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">teacher@acadex.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Student:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">student@acadex.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Password:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">password123</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Academic Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to enhance educational management and student success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Educators Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Academic Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators who trust Acadex for their student management needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => router.push('/register')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => router.push('/login')}
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg transition-all duration-200 transform hover:scale-105"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Acadex</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="text-gray-400">© 2025 Acadex. All rights reserved.</span>
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Secure & Reliable</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.4s both;
        }
      `}</style>
    </div>
  )
}