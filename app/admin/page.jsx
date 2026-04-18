import { redirect } from 'next/navigation'

export default function AdminPage() {
  redirect('/auth/login?role=admin')
}