import { createClient } from './client'

export async function getCoaches() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('coaches')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  
  if (error) console.error(error)
  return data ?? []
}

export async function getSubscriptionPlans() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  
  if (error) console.error(error)
  return data ?? []
}

export async function getLessonTypes() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('lesson_types')
    .select('*')
    .eq('active', true)
    .order('sort_order')
  
  if (error) console.error(error)
  return data ?? []
}