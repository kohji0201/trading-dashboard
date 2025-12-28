'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { type Tables } from '@/lib/supabase'

type SalesData = Tables<'sales_data'>

interface CategoryChartProps {
  data: SalesData[]
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = data
    .reduce((acc, item) => {
      const category = item.product_category
      const existing = acc.find(d => d.category === category)
      if (existing) {
        existing.sales += item.sales_amount
        existing.margin = (existing.margin + item.profit_margin) / 2
      } else {
        acc.push({
          category,
          sales: item.sales_amount,
          margin: item.profit_margin
        })
      }
      return acc
    }, [] as { category: string; sales: number; margin: number }[])
    .sort((a, b) => b.sales - a.sales)

  const formatCurrency = (value: number) => `¥${(value / 100000000).toFixed(1)}億`

  return (
    <Card>
      <CardHeader>
        <CardTitle>商品カテゴリ別売上</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip
              formatter={(value: number | undefined, name?: string) => [
                value ? (name === 'sales' ? formatCurrency(value) : `${value.toFixed(1)}%`) : '0',
                name === 'sales' ? '売上高' : '利益率'
              ]}
              labelStyle={{ color: 'black' }}
            />
            <Bar dataKey="sales" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}