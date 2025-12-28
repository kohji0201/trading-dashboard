import { Suspense } from 'react'
import Dashboard from '@/components/dashboard'
import { Header } from '@/components/header'
import { Loading } from '@/components/loading'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      </main>
    </div>
  )
}
