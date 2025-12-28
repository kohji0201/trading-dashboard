import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface Database {
  public: {
    Tables: {
      sales_data: {
        Row: {
          id: string
          created_at: string
          product_category: string
          region: string
          sales_amount: number
          profit_margin: number
          quarter: string
          year: number
          salesperson: string
          customer_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          product_category: string
          region: string
          sales_amount: number
          profit_margin: number
          quarter: string
          year: number
          salesperson: string
          customer_type: string
        }
        Update: {
          id?: string
          created_at?: string
          product_category?: string
          region?: string
          sales_amount?: number
          profit_margin?: number
          quarter?: string
          year?: number
          salesperson?: string
          customer_type?: string
        }
      }
      kpi_data: {
        Row: {
          id: string
          created_at: string
          metric_name: string
          metric_value: number
          target_value: number
          period: string
          category: string
        }
        Insert: {
          id?: string
          created_at?: string
          metric_name: string
          metric_value: number
          target_value: number
          period: string
          category: string
        }
        Update: {
          id?: string
          created_at?: string
          metric_name?: string
          metric_value?: number
          target_value?: number
          period?: string
          category?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}