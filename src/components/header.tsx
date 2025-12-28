import { Building2, BarChart3 } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">総合商社ダッシュボード</h1>
              <p className="text-sm text-gray-600">Trading Company Analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">2024年度 業績分析</span>
          </div>
        </div>
      </div>
    </header>
  )
}