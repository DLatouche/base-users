import User from '#models/user'
import { AdminLayout } from '@/components/layouts/admin_layout/admin_layout'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { usePage } from '@inertiajs/react'

const Dashboard = () => {
  const { usersCount } = usePage<{ user: User; usersCount: number }>().props

  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Tableau de bord</h1>
        <Card className=" w-fit mt-8">
          <CardHeader>
            <p className="">Nombre d'utilisateurs</p>
          </CardHeader>
          <CardContent>
            <p className="text-xl text-center">{usersCount}</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
