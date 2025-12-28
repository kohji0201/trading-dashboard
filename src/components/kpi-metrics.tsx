'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Tables } from '@/lib/supabase'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, TrendingDown } from 'lucide-react'

type KPIData = Tables<'kpi_data'>

interface KPIMetricsProps {
  data: KPIData[]
}

export function KPIMetrics({ data }: KPIMetricsProps) {
  const formatValue = (value: number, metricName: string) => {
    if (metricName.includes('率') || metricName.includes('ROE')) {
      return `${value.toFixed(1)}%`
    }
    if (metricName.includes('売上') || metricName.includes('利益')) {
      return `¥${(value / 100000000).toFixed(1)}億円`
    }
    return value.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KPI実績</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.slice(0, 5).map((kpi) => {
          const achievementRate = (kpi.metric_value / kpi.target_value) * 100
          const isAboveTarget = kpi.metric_value >= kpi.target_value

          return (
            <div key={kpi.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{kpi.metric_name}</span>
                <div className="flex items-center space-x-2">
                  {isAboveTarget ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {achievementRate.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>実績: {formatValue(kpi.metric_value, kpi.metric_name)}</span>
                  <span>目標: {formatValue(kpi.target_value, kpi.metric_name)}</span>
                </div>
                <Progress value={Math.min(achievementRate, 100)} className="h-2" />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}