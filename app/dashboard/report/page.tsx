'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GradeChart } from '@/components/dashboard/grade-chart'
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  Printer,
  Share,
  Eye
} from 'lucide-react'

const studentData = {
  personal: {
    name: 'John Smith',
    student_id: 'STU001',
    grade: '12th Grade',
    section: 'A',
    academic_year: '2023-2024',
    enrollment_date: '2023-09-01'
  },
  grades: [
    { subject: 'Mathematics', marks: 85, maxMarks: 100, percentage: 85, grade: 'A', credits: 4 },
    { subject: 'Physics', marks: 78, maxMarks: 100, percentage: 78, grade: 'B+', credits: 4 },
    { subject: 'Chemistry', marks: 92, maxMarks: 100, percentage: 92, grade: 'A+', credits: 3 },
    { subject: 'English Literature', marks: 88, maxMarks: 100, percentage: 88, grade: 'A', credits: 3 },
    { subject: 'Computer Science', marks: 95, maxMarks: 100, percentage: 95, grade: 'A+', credits: 4 },
    { subject: 'Biology', marks: 82, maxMarks: 100, percentage: 82, grade: 'A-', credits: 3 }
  ],
  attendance: {
    total_days: 180,
    present_days: 171,
    absent_days: 9,
    percentage: 95
  },
  activities: [
    { name: 'Science Fair', position: '1st Place', year: '2024' },
    { name: 'Mathematics Olympiad', position: 'Participant', year: '2023' },
    { name: 'Debate Competition', position: '2nd Place', year: '2023' }
  ]
}

export default function ReportPage() {
  const [selectedSemester, setSelectedSemester] = useState('current')
  const [reportType, setReportType] = useState('comprehensive')

  const totalCredits = studentData.grades.reduce((acc, grade) => acc + grade.credits, 0)
  const weightedGPA = studentData.grades.reduce((acc, grade) => acc + (grade.percentage * grade.credits), 0) / (totalCredits * 100) * 4
  const overallPercentage = studentData.grades.reduce((acc, grade) => acc + grade.percentage, 0) / studentData.grades.length

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-green-100 text-green-700'
      case 'A-': return 'bg-blue-100 text-blue-700'
      case 'B+': return 'bg-blue-100 text-blue-600'
      case 'B': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownloadReport = () => {
    // In a real application, this would generate and download a PDF
    console.log('Downloading report...')
  }

  const handlePrintReport = () => {
    window.print()
  }

  const handleShareReport = () => {
    // In a real application, this would share the report
    console.log('Sharing report...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600" />
            Academic Report
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive academic performance and progress report</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrintReport}
            className="hover:bg-gray-50 transition-all duration-200"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShareReport}
            className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            onClick={handleDownloadReport}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Academic Period</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="semester1">Semester 1 (2023-24)</SelectItem>
                  <SelectItem value="semester2">Semester 2 (2023-24)</SelectItem>
                  <SelectItem value="annual">Annual Report (2023-24)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                  <SelectItem value="grades">Grades Only</SelectItem>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                  <SelectItem value="activities">Activities Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{studentData.personal.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Student ID</p>
                <p className="text-gray-900">{studentData.personal.student_id}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Grade & Section</p>
                <p className="text-gray-900">{studentData.personal.grade} - Section {studentData.personal.section}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Academic Year</p>
                <p className="text-gray-900">{studentData.personal.academic_year}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Enrollment Date</p>
                <p className="text-gray-900">{studentData.personal.enrollment_date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Report Generated</p>
                <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Overall Percentage</p>
                <p className="text-3xl font-bold">{Math.round(overallPercentage)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">GPA</p>
                <p className="text-3xl font-bold">{weightedGPA.toFixed(2)}</p>
              </div>
              <Award className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">Attendance</p>
                <p className="text-3xl font-bold">{studentData.attendance.percentage}%</p>
              </div>
              <Calendar className="h-8 w-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Credits</p>
                <p className="text-3xl font-bold">{totalCredits}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Academic Performance
          </CardTitle>
          <CardDescription>Subject-wise performance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <GradeChart data={studentData.grades} type="bar" />
        </CardContent>
      </Card>

      {/* Detailed Grades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Subject-wise Grades
          </CardTitle>
          <CardDescription>Detailed breakdown of academic performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Subject</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Credits</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Marks</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Percentage</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentData.grades.map((grade, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4 font-medium text-gray-900">{grade.subject}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{grade.credits}</td>
                    <td className="py-3 px-4 text-center text-gray-900">{grade.marks}/{grade.maxMarks}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-blue-600">{grade.percentage}%</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Attendance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{studentData.attendance.total_days}</p>
              <p className="text-sm text-gray-600">Total Days</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{studentData.attendance.present_days}</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{studentData.attendance.absent_days}</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <p className="text-2xl font-bold text-amber-600">{studentData.attendance.percentage}%</p>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extracurricular Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Extracurricular Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentData.activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{activity.name}</p>
                  <p className="text-sm text-gray-600">Year: {activity.year}</p>
                </div>
                <Badge variant="outline" className="bg-white">
                  {activity.position}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .card {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}