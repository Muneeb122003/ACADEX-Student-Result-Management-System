'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

interface GradeChartProps {
  data: Array<{
    subject: string
    marks: number
    maxMarks: number
    percentage: number
  }>
  type?: 'bar' | 'line'
}

export function GradeChart({ data, type = 'bar' }: GradeChartProps) {
  if (type === 'line') {
    return (
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Percentage']}
              labelFormatter={(label) => `Subject: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="percentage" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#1D4ED8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'marks' ? `${value} marks` : `${value}%`,
              name === 'marks' ? 'Obtained' : 'Percentage'
            ]}
            labelFormatter={(label) => `Subject: ${label}`}
          />
          <Bar dataKey="marks" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="percentage" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}