import { Button } from '@/components/ui/button'
import { Link, router, usePage } from '@inertiajs/react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { UserMenu } from './user_menu'

type MenuLayoutProps = {
  children: ReactNode
  className?: string
}

export const MenuLayout = ({ children, className }: MenuLayoutProps) => {
  // Wait for true type of user
  const {
    props: { user },
  } = usePage<{ user: { username: string } }>()

  const goToLogin = async () => {
    router.visit('/auth/login')
  }
  const goToRegister = async () => {
    router.visit('/auth/register')
  }
  return (
    <>
      <div className=" z-10 h-adminTopMenu fixed top-0 right-0  transition-all duration-300 w-full ">
        <div
          className={twMerge(
            'backdrop-blur-sm bg-background/90 container',
            'flex items-center justify-between p-5 mx-auto'
          )}
        >
          <span>
            {' '}
            <Link href="/">Accueil</Link>
          </span>
          {user ? (
            <UserMenu />
          ) : (
            <span>
              <Button variant="link" onClick={goToRegister}>
                S'inscrire
              </Button>
              <Button onClick={goToLogin} className="ml-2">
                Se connecter
              </Button>
            </span>
          )}
        </div>
      </div>
      <div className={twMerge('pt-adminTopMenu', className)}>{children}</div>
    </>
  )
}
