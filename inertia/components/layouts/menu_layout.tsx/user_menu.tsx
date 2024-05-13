import { Button } from '@/components/ui/button'
import { router, usePage } from '@inertiajs/react'

export const UserMenu = () => {
  const {
    props: { user },
  } = usePage<{ user: { username: string } }>()

  const logout = async () => {
    router.post('/auth/logout')
  }

  return (
    <span>
      <span className="mr-2">Bonjour {user.username}</span>
      <Button variant="link" onClick={logout}>
        Se déconnecter
      </Button>
    </span>
  )
}
