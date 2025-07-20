'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { StatsCard } from '@/components/dashboard/stats-card'
import { GradeChart } from '@/components/dashboard/grade-chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, TrendingUp, Award, Calendar, Clock } from 'lucide-react'

// Mock data for demonstration
const mockGrades = [
  { subject: 'Mathematics', marks: 85, maxMarks: 100, percentage: 85, grade: 'A' },
  { subject: 'Physics', marks: 78, maxMarks: 100, percentage: 78, grade: 'B+' },
  { subject: 'Chemistry', marks: 92, maxMarks: 100, percentage: 92, grade: 'A+' },
  { subject: 'English', marks: 88, maxMarks: 100, percentage: 88, grade: 'A' },
  { subject: 'Computer Science', marks: 95, maxMarks: 100, percentage: 95, grade: 'A+' },
]

const mockRecentActivity = [
  { subject: 'Mathematics', student: 'John Smith', marks: 85, maxMarks: 100, grade: 'A', type: 'Final Exam' },
  { subject: 'Physics', student: 'Jane Doe', marks: 78, maxMarks: 100, grade: 'B+', type: 'Midterm' },
  { subject: 'Chemistry', student: 'Mike Johnson', marks: 92, maxMarks: 100, grade: 'A+', type: 'Quiz' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const averageGrade = mockGrades.reduce((acc, grade) => acc + grade.percentage, 0) / mockGrades.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.full_name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your {user?.role === 'teacher' ? 'students' : 'academic progress'} today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.role === 'teacher' ? (
          <>
            <StatsCard
              title="Total Students"
              value={156}
              description="Active students"
              icon={Users}
              color="blue"
            />
            <StatsCard
              title="Subjects"
              value={8}
              description="Subjects managed"
              icon={BookOpen}
              color="emerald"
            />
            <StatsCard
              title="Recent Grades"
              value={24}
              description="Grades entered this week"
              icon={Award}
              color="amber"
            />
            <StatsCard
              title="Active Sessions"
              value="3"
              description="Classes today"
              icon={Clock}
              color="red"
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Average Grade"
              value={`${Math.round(averageGrade)}%`}
              description="Overall performance"
              icon={TrendingUp}
              color="blue"
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatsCard
              title="Subjects"
              value={mockGrades.length}
              description="Enrolled courses"
              icon={BookOpen}
              color="emerald"
            />
            <StatsCard
              title="Recent Exams"
              value={3}
              description="This month"
              icon={Award}
              color="amber"
            />
            <StatsCard
              title="Attendance"
              value="94%"
              description="This semester"
              icon={Calendar}
              color="red"
              trend={{ value: 2.1, isPositive: true }}
            />
          </>
        )}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {user?.role === 'student' && (
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your grades across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <GradeChart data={mockGrades} type="bar" />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {user?.role === 'teacher' ? 'Latest grades you\'ve entered' : 'Your recent exam results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(user?.role === 'student' ? mockGrades : mockRecentActivity).slice(0, 5).map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.role === 'teacher' ? item.student : item.type || 'Final Exam'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">
                      {item.marks}/{item.maxMarks}
                    </p>
                    <p className="text-sm text-gray-500">{item.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}