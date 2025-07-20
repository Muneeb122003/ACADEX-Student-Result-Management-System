'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Filter,
  Users,
  GraduationCap,
  Mail,
  Phone,
  Calendar
} from 'lucide-react'

const mockStudents = [
  {
    id: '1',
    student_id: 'STU001',
    full_name: 'John Smith',
    email: 'john.smith@student.edu',
    phone: '+1 (555) 123-4567',
    grade_level: '12th Grade',
    section: 'A',
    enrollment_date: '2023-09-01',
    status: 'Active',
    gpa: 3.8,
    attendance: 95
  },
  {
    id: '2',
    student_id: 'STU002',
    full_name: 'Emily Johnson',
    email: 'emily.johnson@student.edu',
    phone: '+1 (555) 234-5678',
    grade_level: '11th Grade',
    section: 'B',
    enrollment_date: '2023-09-01',
    status: 'Active',
    gpa: 3.9,
    attendance: 98
  },
  {
    id: '3',
    student_id: 'STU003',
    full_name: 'Michael Brown',
    email: 'michael.brown@student.edu',
    phone: '+1 (555) 345-6789',
    grade_level: '10th Grade',
    section: 'A',
    enrollment_date: '2023-09-01',
    status: 'Active',
    gpa: 3.6,
    attendance: 92
  },
  {
    id: '4',
    student_id: 'STU004',
    full_name: 'Sarah Davis',
    email: 'sarah.davis@student.edu',
    phone: '+1 (555) 456-7890',
    grade_level: '12th Grade',
    section: 'B',
    enrollment_date: '2023-09-01',
    status: 'Active',
    gpa: 4.0,
    attendance: 100
  }
]

export default function StudentsPage() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === 'all' || student.grade_level === filterGrade
    return matchesSearch && matchesGrade
  })

  const handleAddStudent = () => {
    // Add student logic here
    setIsAddDialogOpen(false)
  }

  const handleViewStudent = (student: any) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-red-100 text-red-800'
      case 'Suspended': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-600'
    if (gpa >= 3.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            Student Management
          </h1>
          <p className="text-gray-600 mt-2">Manage student records, enrollment, and academic information</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student information to create a new record</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="student_id">Student ID</Label>
                <Input id="student_id" placeholder="STU005" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade_level">Grade Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th Grade">9th Grade</SelectItem>
                    <SelectItem value="10th Grade">10th Grade</SelectItem>
                    <SelectItem value="11th Grade">11th Grade</SelectItem>
                    <SelectItem value="12th Grade">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddStudent} className="bg-blue-600 hover:bg-blue-700">Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:scale-105"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterGrade} onValueChange={setFilterGrade}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9th Grade">9th Grade</SelectItem>
                  <SelectItem value="10th Grade">10th Grade</SelectItem>
                  <SelectItem value="11th Grade">11th Grade</SelectItem>
                  <SelectItem value="12th Grade">12th Grade</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hover:bg-gray-50 transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student, index) => (
          <Card 
            key={student.id} 
            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {student.full_name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{student.student_id}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {student.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {student.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {student.grade_level} - Section {student.section}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-500">GPA</p>
                  <p className={`font-bold text-lg ${getGPAColor(student.gpa)}`}>
                    {student.gpa}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Attendance</p>
                  <p className="font-bold text-lg text-blue-600">
                    {student.attendance}%
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => handleViewStudent(student)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>Complete information for {selectedStudent?.full_name}</DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Student ID</Label>
                  <p className="text-gray-900">{selectedStudent.student_id}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                  <p className="text-gray-900">{selectedStudent.full_name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p className="text-gray-900">{selectedStudent.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Phone</Label>
                  <p className="text-gray-900">{selectedStudent.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Grade Level</Label>
                  <p className="text-gray-900">{selectedStudent.grade_level}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Section</Label>
                  <p className="text-gray-900">Section {selectedStudent.section}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Enrollment Date</Label>
                  <p className="text-gray-900">{selectedStudent.enrollment_date}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedStudent.status)}>
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Current GPA</p>
                  <p className={`font-bold text-2xl ${getGPAColor(selectedStudent.gpa)}`}>
                    {selectedStudent.gpa}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="font-bold text-2xl text-blue-600">
                    {selectedStudent.attendance}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
        
        .grid > * {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </div>
  )
}