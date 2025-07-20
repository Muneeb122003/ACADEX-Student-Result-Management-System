'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GradeChart } from '@/components/dashboard/grade-chart'
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Search, 
  Filter,
  TrendingUp,
  Award,
  Calendar,
  Users,
  BarChart3
} from 'lucide-react'

const mockGrades = [
  {
    id: '1',
    student_name: 'John Smith',
    student_id: 'STU001',
    subject: 'Mathematics',
    exam_type: 'Midterm',
    marks: 85,
    max_marks: 100,
    percentage: 85,
    grade: 'A',
    exam_date: '2024-01-15',
    teacher: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    student_name: 'Emily Johnson',
    student_id: 'STU002',
    subject: 'Physics',
    exam_type: 'Final',
    marks: 92,
    max_marks: 100,
    percentage: 92,
    grade: 'A+',
    exam_date: '2024-01-20',
    teacher: 'Prof. Michael Chen'
  },
  {
    id: '3',
    student_name: 'Michael Brown',
    student_id: 'STU003',
    subject: 'Chemistry',
    exam_type: 'Quiz',
    marks: 78,
    max_marks: 100,
    percentage: 78,
    grade: 'B+',
    exam_date: '2024-01-18',
    teacher: 'Dr. Lisa Wang'
  },
  {
    id: '4',
    student_name: 'Sarah Davis',
    student_id: 'STU004',
    subject: 'English',
    exam_type: 'Assignment',
    marks: 88,
    max_marks: 100,
    percentage: 88,
    grade: 'A',
    exam_date: '2024-01-22',
    teacher: 'Ms. Jennifer Lee'
  }
]

const studentGrades = [
  { subject: 'Mathematics', marks: 85, maxMarks: 100, percentage: 85, grade: 'A' },
  { subject: 'Physics', marks: 78, maxMarks: 100, percentage: 78, grade: 'B+' },
  { subject: 'Chemistry', marks: 92, maxMarks: 100, percentage: 92, grade: 'A+' },
  { subject: 'English', marks: 88, maxMarks: 100, percentage: 88, grade: 'A' },
  { subject: 'Computer Science', marks: 95, maxMarks: 100, percentage: 95, grade: 'A+' },
  { subject: 'Biology', marks: 82, maxMarks: 100, percentage: 82, grade: 'A-' }
]

export default function GradesPage() {
  const { user } = useAuth()
  const [grades, setGrades] = useState(mockGrades)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSubject, setFilterSubject] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const isTeacher = user?.role === 'teacher'

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = filterSubject === 'all' || grade.subject === filterSubject
    return matchesSearch && matchesSubject
  })

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-green-100 text-green-700'
      case 'A-': return 'bg-blue-100 text-blue-700'
      case 'B+': return 'bg-blue-100 text-blue-600'
      case 'B': return 'bg-yellow-100 text-yellow-700'
      case 'B-': return 'bg-yellow-100 text-yellow-600'
      case 'C+': return 'bg-orange-100 text-orange-700'
      case 'C': return 'bg-orange-100 text-orange-600'
      default: return 'bg-red-100 text-red-700'
    }
  }

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'Final': return 'bg-purple-100 text-purple-800'
      case 'Midterm': return 'bg-blue-100 text-blue-800'
      case 'Quiz': return 'bg-emerald-100 text-emerald-800'
      case 'Assignment': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const averageGrade = studentGrades.reduce((acc, grade) => acc + grade.percentage, 0) / studentGrades.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            {isTeacher ? 'Grade Management' : 'My Grades'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isTeacher 
              ? 'Manage student grades and academic performance' 
              : 'Track your academic progress and performance'
            }
          </p>
        </div>
        
        {isTeacher && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Grade</DialogTitle>
                <DialogDescription>Enter grade information for a student</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Student</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STU001">John Smith (STU001)</SelectItem>
                      <SelectItem value="STU002">Emily Johnson (STU002)</SelectItem>
                      <SelectItem value="STU003">Michael Brown (STU003)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Final">Final Exam</SelectItem>
                      <SelectItem value="Midterm">Midterm</SelectItem>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                      <SelectItem value="Assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marks">Marks Obtained</Label>
                  <Input id="marks" type="number" placeholder="85" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_marks">Maximum Marks</Label>
                  <Input id="max_marks" type="number" placeholder="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exam_date">Exam Date</Label>
                  <Input id="exam_date" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Add Grade</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {isTeacher ? (
        // Teacher View
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Grades</p>
                    <p className="text-3xl font-bold">{grades.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100">Students</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <Users className="h-8 w-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-100">Avg Grade</p>
                    <p className="text-3xl font-bold">A-</p>
                  </div>
                  <Award className="h-8 w-8 text-amber-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">This Week</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by student name, ID, or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 transition-all duration-200 focus:scale-105"
                  />
                </div>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Grades Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Latest grade entries and student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredGrades.map((grade, index) => (
                  <div 
                    key={grade.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{grade.student_name}</p>
                        <p className="text-sm text-gray-500">{grade.student_id} • {grade.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getExamTypeColor(grade.exam_type)}>
                        {grade.exam_type}
                      </Badge>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {grade.marks}/{grade.max_marks}
                        </p>
                        <p className="text-sm text-gray-500">{grade.percentage}%</p>
                      </div>
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                      <Button size="sm" variant="outline" className="hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        // Student View
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Overall Average</p>
                      <p className="text-3xl font-bold">{Math.round(averageGrade)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Subjects</p>
                      <p className="text-3xl font-bold">{studentGrades.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100">Grade Rank</p>
                      <p className="text-3xl font-bold">A</p>
                    </div>
                    <Award className="h-8 w-8 text-amber-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your grades across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <GradeChart data={studentGrades} type="bar" />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentGrades.map((grade, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{grade.subject}</CardTitle>
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Score:</span>
                        <span className="font-bold">{grade.marks}/{grade.maxMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Percentage:</span>
                        <span className="font-bold text-blue-600">{grade.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${grade.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Your academic progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <GradeChart data={studentGrades} type="line" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .space-y-4 > * {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  )
}