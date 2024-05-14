import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@inertiajs/react'

const RequestResetPasswordSuccess = () => {
  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Réinitialisation de mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Un email vous a été envoyé pour réinitialiser votre mot de passe.</p>
            <hr className="my-4" />
            <Link className="hover:underline underline-offset-4" href="/">
              Accueil
            </Link>
          </CardContent>
        </Card>
      </div>
    </MenuLayout>
  )
}

export default RequestResetPasswordSuccess
