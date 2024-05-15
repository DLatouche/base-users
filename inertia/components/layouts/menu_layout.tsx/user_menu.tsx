import User from '#models/user'
import { Avatar } from '@/components/avatar/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Link, router, usePage } from '@inertiajs/react'
import { twMerge } from 'tailwind-merge'

export const UserMenu = () => {
  const {
    props: { user },
  } = usePage<{ user: User }>()

  const logout = async () => {
    router.post('/auth/logout')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className={twMerge(
            'scale-100 transition-all',
            ' hover:scale-105  transition-all w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border border-primary-500 mr-2'
          )}
          avatar={user?.avatar}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link href="/account">
          <DropdownMenuItem onClick={logout}>Mon compte</DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={logout}>Se déconnecter</DropdownMenuItem>
        {user?.isAdmin && (
          <>
            <DropdownMenuSeparator />
            <Link href="/admin/dashboard">
              <DropdownMenuItem>Administration</DropdownMenuItem>
            </Link>
            <Link href="/">
              <DropdownMenuItem>Accueil</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
