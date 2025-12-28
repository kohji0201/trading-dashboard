'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { type Tables } from '@/lib/supabase'

type SalesData = Tables<'sales_data'>

interface RegionChartProps {
  data: SalesData[]
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

export function RegionChart({ data }: RegionChartProps) {
  const chartData = data
    .reduce((acc, item) => {
      const region = item.region
      const existing = acc.find(d => d.region === region)
      if (existing) {
        existing.sales += item.sales_amount
      } else {
        acc.push({
          region,
          sales: item.sales_amount
        })
      }
      return acc
    }, [] as { region: string; sales: number }[])
    .sort((a, b) => b.sales - a.sales)

  const formatCurrency = (value: number) => `¥${(value / 100000000).toFixed(1)}億`

  return (
    <Card>
      <CardHeader>
        <CardTitle>地域別売上分布</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percent, payload }: any) => `${payload?.region || ''} ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="sales"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | undefined) => [value ? formatCurrency(value) : '0', '売上高']}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}