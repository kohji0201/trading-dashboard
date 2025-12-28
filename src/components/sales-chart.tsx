'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { type Tables } from '@/lib/supabase'

type SalesData = Tables<'sales_data'>

interface SalesChartProps {
  data: SalesData[]
}

export function SalesChart({ data }: SalesChartProps) {
  const chartData = data
    .reduce((acc, item) => {
      const quarter = item.quarter
      const existing = acc.find(d => d.quarter === quarter)
      if (existing) {
        existing.sales += item.sales_amount
        existing.count += 1
      } else {
        acc.push({
          quarter,
          sales: item.sales_amount,
          count: 1
        })
      }
      return acc
    }, [] as { quarter: string; sales: number; count: number }[])
    .sort((a, b) => a.quarter.localeCompare(b.quarter))

  const formatCurrency = (value: number) => `¥${(value / 100000000).toFixed(1)}億`

  return (
    <Card>
      <CardHeader>
        <CardTitle>四半期別売上推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number | undefined) => [value ? formatCurrency(value) : '0', '売上高']}
              labelStyle={{ color: 'black' }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}