import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Link, router } from '@inertiajs/react'

const ResetPasswordSuccess = () => {
  const goToLogin = async () => {
    router.visit('/auth/login')
  }

  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Réinitialisation de votre mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre mot de passe a été mis à jour.</p>
            <p>Vous pouvez vous connecter.</p>
            <Button onClick={goToLogin} className="mt-4">
              Se connecter
            </Button>
            <hr className="my-4" />
            <Link href="/">Retour à l'accueil</Link>
          </CardContent>
        </Card>
      </div>
    </MenuLayout>
  )
}

export default ResetPasswordSuccess
