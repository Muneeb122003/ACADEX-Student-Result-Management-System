'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  PlusCircle,
  Calendar,
  Video,
  Award,
  UserCheck,
  ClipboardList
} from 'lucide-react'

const studentLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Analytics' },
  { href: '/dashboard/grades', label: 'My Grades', icon: BookOpen, description: 'View Academic Results' },
  { href: '/dashboard/report', label: 'Academic Report', icon: FileText, description: 'Download Reports' },
  { href: '/dashboard/schedule', label: 'Class Schedule', icon: Calendar, description: 'View Timetable' },
  { href: '/dashboard/attendance', label: 'Attendance', icon: UserCheck, description: 'Track Attendance' },
  { href: '/dashboard/profile', label: 'Profile', icon: Settings, description: 'Account Settings' },
]

const teacherLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3, description: 'Overview & Analytics' },
  { href: '/dashboard/students', label: 'Students', icon: Users, description: 'Manage Student Records' },
  { href: '/dashboard/grades', label: 'Manage Grades', icon: BookOpen, description: 'Grade Management' },
  { href: '/dashboard/subjects', label: 'Subjects', icon: PlusCircle, description: 'Course Management' },
  { href: '/dashboard/classes', label: 'Live Classes', icon: Video, description: 'Virtual Classroom' },
  { href: '/dashboard/assignments', label: 'Assignments', icon: ClipboardList, description: 'Homework & Tasks' },
  { href: '/dashboard/reports', label: 'Reports', icon: Award, description: 'Academic Reports' },
  { href: '/dashboard/profile', label: 'Profile', icon: Settings, description: 'Account Settings' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const links = user?.role === 'teacher' ? teacherLinks : studentLinks

  const handleSignOut = async () => {
    signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-80 bg-white shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-emerald-600">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Acadex</h1>
                <p className="text-sm text-blue-100 capitalize">{user?.role} Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {links.map((link, index) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                return (
                  <li key={link.href} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in-left">
                    <Button
                      variant={isActive ? 'default' : 'ghost'}
                      className={cn(
                        'w-full justify-start text-left transition-all duration-200 h-auto p-4 group',
                        isActive && 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg transform scale-105',
                        !isActive && 'hover:bg-gray-50 hover:scale-105 hover:shadow-md'
                      )}
                      onClick={() => {
                        router.push(link.href)
                        setIsOpen(false)
                      }}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className={cn(
                          'p-2 rounded-lg transition-all duration-200',
                          isActive ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-blue-100'
                        )}>
                          <Icon className={cn(
                            'h-5 w-5 transition-colors duration-200',
                            isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                          )} />
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            'font-medium transition-colors duration-200',
                            isActive ? 'text-white' : 'text-gray-900'
                          )}>
                            {link.label}
                          </p>
                          <p className={cn(
                            'text-xs transition-colors duration-200',
                            isActive ? 'text-blue-100' : 'text-gray-500'
                          )}>
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t bg-gray-50">
            <div className="mb-4 p-4 bg-white rounded-xl shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-full">
                  <span className="text-white font-bold text-sm">
                    {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{user?.full_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {user?.student_id && (
                    <p className="text-xs text-blue-600 font-medium">ID: {user.student_id}</p>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 transform hover:scale-105"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      <style jsx>{`
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.5s ease-out both;
        }
      `}</style>
    </>
  )
}