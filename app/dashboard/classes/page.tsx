'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Video, 
  Plus, 
  Play, 
  Users, 
  Clock, 
  Calendar,
  Settings,
  Share,
  Copy,
  Eye,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare
} from 'lucide-react'

const mockClasses = [
  {
    id: '1',
    title: 'Advanced Mathematics - Calculus',
    subject: 'Mathematics',
    grade: '12th Grade',
    section: 'A',
    scheduled_time: '2024-01-25T10:00:00',
    duration: 60,
    status: 'scheduled',
    participants: 28,
    max_participants: 30,
    meeting_link: 'https://meet.acadex.com/math-calc-001',
    description: 'Introduction to differential calculus and its applications'
  },
  {
    id: '2',
    title: 'Physics Lab - Optics',
    subject: 'Physics',
    grade: '11th Grade',
    section: 'B',
    scheduled_time: '2024-01-25T14:00:00',
    duration: 90,
    status: 'live',
    participants: 22,
    max_participants: 25,
    meeting_link: 'https://meet.acadex.com/physics-optics-002',
    description: 'Hands-on experiments with light and lenses'
  },
  {
    id: '3',
    title: 'English Literature Discussion',
    subject: 'English',
    grade: '10th Grade',
    section: 'A',
    scheduled_time: '2024-01-24T11:00:00',
    duration: 45,
    status: 'completed',
    participants: 25,
    max_participants: 30,
    meeting_link: 'https://meet.acadex.com/english-lit-003',
    description: 'Analysis of Shakespeare\'s Romeo and Juliet'
  },
  {
    id: '4',
    title: 'Chemistry - Organic Compounds',
    subject: 'Chemistry',
    grade: '12th Grade',
    section: 'B',
    scheduled_time: '2024-01-26T09:00:00',
    duration: 75,
    status: 'scheduled',
    participants: 20,
    max_participants: 25,
    meeting_link: 'https://meet.acadex.com/chem-organic-004',
    description: 'Understanding organic chemistry fundamentals'
  }
]

export default function ClassesPage() {
  const [classes, setClasses] = useState(mockClasses)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800 animate-pulse'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live': return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      case 'scheduled': return <Clock className="h-4 w-4" />
      case 'completed': return <Eye className="h-4 w-4" />
      default: return null
    }
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const handleJoinClass = (classItem: any) => {
    setSelectedClass(classItem)
    setIsJoinDialogOpen(true)
  }

  const copyMeetingLink = (link: string) => {
    navigator.clipboard.writeText(link)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Video className="h-8 w-8 text-blue-600" />
            Live Classes
          </h1>
          <p className="text-gray-600 mt-2">Manage virtual classrooms and online sessions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Class</DialogTitle>
              <DialogDescription>Create a new virtual classroom session</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title">Class Title</Label>
                <Input id="title" placeholder="Enter class title" />
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
                <Label htmlFor="grade">Grade</Label>
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
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_participants">Max Participants</Label>
                <Input id="max_participants" type="number" placeholder="30" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Class description" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Schedule Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Live Now</p>
                <p className="text-3xl font-bold">{classes.filter(c => c.status === 'live').length}</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <Video className="h-6 w-6 text-red-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Scheduled</p>
                <p className="text-3xl font-bold">{classes.filter(c => c.status === 'scheduled').length}</p>
              </div>
              <Calendar className="h-6 w-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Total Students</p>
                <p className="text-3xl font-bold">{classes.reduce((acc, c) => acc + c.participants, 0)}</p>
              </div>
              <Users className="h-6 w-6 text-emerald-200" />
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
              <Clock className="h-6 w-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((classItem, index) => {
          const { date, time } = formatDateTime(classItem.scheduled_time)
          
          return (
            <Card 
              key={classItem.id} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(classItem.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(classItem.status)}
                          <span className="capitalize">{classItem.status}</span>
                        </div>
                      </Badge>
                      <Badge variant="outline">{classItem.subject}</Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {classItem.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {classItem.grade} - Section {classItem.section}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{classItem.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {classItem.participants}/{classItem.max_participants}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Video className="h-4 w-4 mr-2" />
                    {classItem.duration} min
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  {classItem.status === 'live' ? (
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-200 transform hover:scale-105"
                      onClick={() => handleJoinClass(classItem)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Join Live
                    </Button>
                  ) : classItem.status === 'scheduled' ? (
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                      onClick={() => handleJoinClass(classItem)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Class
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="flex-1 hover:bg-gray-50 transition-all duration-200"
                      disabled
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Recording
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    onClick={() => copyMeetingLink(classItem.meeting_link)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Join Class Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Join Class</DialogTitle>
            <DialogDescription>
              {selectedClass?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Class Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Subject: {selectedClass?.subject}</p>
                <p>Duration: {selectedClass?.duration} minutes</p>
                <p>Participants: {selectedClass?.participants}/{selectedClass?.max_participants}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Audio & Video Settings</h4>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Mic className="h-4 w-4 mr-2" />
                  Mic On
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  Camera On
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsJoinDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                // Open meeting link in new tab
                window.open(selectedClass?.meeting_link, '_blank')
                setIsJoinDialogOpen(false)
              }}
            >
              Join Now
            </Button>
          </div>
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