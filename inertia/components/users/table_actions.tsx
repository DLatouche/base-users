import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import type User from '#models/user'
import { router } from '@inertiajs/react'

type TableActionsProps = {
  user: User
  currentUser: User
}

export const TableActions = ({ user, currentUser }: TableActionsProps) => {
  const handleDeleteUser = (user: User) => {}

  const handleEditUser = (user: User) => {
    router.visit(`/admin/users/edit/${user.id}`)
  }

  return (
    <div className="flex justify-end items-center">
      <Button
        variant="ghost"
        className="rounded-full px-1 py-1 inline-flex items-center justify-center size-6 "
        onClick={() => {
          handleDeleteUser(user)
        }}
        disabled={user.id === currentUser.id}
      >
        <Trash2 className="size-6" />
      </Button>
      <Button
        variant="ghost"
        className="rounded-full px-1 py-1 inline-flex items-center justify-center size-5 ml-2 "
        onClick={() => {
          handleEditUser(user)
        }}
      >
        <Pencil className="size-5" />
      </Button>
    </div>
  )
}
