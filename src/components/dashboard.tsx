'use client'

import { useEffect, useState } from 'react'
import { supabase, type Tables } from '@/lib/supabase'
import { mockSalesData, mockKpiData } from '@/lib/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SalesChart } from '@/components/sales-chart'
import { KPIMetrics } from '@/components/kpi-metrics'
import { RegionChart } from '@/components/region-chart'
import { CategoryChart } from '@/components/category-chart'
import { TrendingUp, DollarSign, Target, Users } from 'lucide-react'

type SalesData = Tables<'sales_data'>
type KPIData = Tables<'kpi_data'>

export default function Dashboard() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [kpiData, setKpiData] = useState<KPIData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)

      // 環境変数が設定されていない場合はモックデータを使用
      const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

      if (!isSupabaseConfigured) {
        // モックデータを使用
        await new Promise(resolve => setTimeout(resolve, 500)) // ローディングをシミュレート
        setSalesData(mockSalesData)
        setKpiData(mockKpiData)
      } else {
        // 実際のSupabaseデータを使用
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Using Supabase connection...')

        const [salesResponse, kpiResponse] = await Promise.all([
          supabase.from('sales_data').select('*').order('created_at', { ascending: false }),
          supabase.from('kpi_data').select('*').order('created_at', { ascending: false })
        ])

        console.log('Sales response:', salesResponse)
        console.log('KPI response:', kpiResponse)

        if (salesResponse.error) {
          console.error('Sales error:', salesResponse.error)
          throw salesResponse.error
        }
        if (kpiResponse.error) {
          console.error('KPI error:', kpiResponse.error)
          throw kpiResponse.error
        }

        setSalesData(salesResponse.data || [])
        setKpiData(kpiResponse.data || [])
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center p-8">データを読み込み中...</div>
  if (error) return <div className="text-red-500 p-8">{error}</div>

  const totalSales = salesData.reduce((sum, item) => sum + item.sales_amount, 0)
  const averageMargin = salesData.reduce((sum, item) => sum + item.profit_margin, 0) / salesData.length
  const uniqueCustomers = new Set(salesData.map(item => item.salesperson)).size

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上高</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{(totalSales / 100000000).toFixed(1)}億円</div>
            <p className="text-xs text-muted-foreground">+8.2% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均利益率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+1.5% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">営業担当者数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueCustomers}名</div>
            <p className="text-xs text-muted-foreground">+2 new this quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">達成率</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.0%</div>
            <p className="text-xs text-muted-foreground">Target: ¥300億円</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <RegionChart data={salesData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart data={salesData} />
        <KPIMetrics data={kpiData} />
      </div>
    </div>
  )
}