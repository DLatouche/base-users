import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSuccess } from '@/hooks/use_success'

import { Link, usePage } from '@inertiajs/react'

const Registered = () => {
  useSuccess(usePage().props, 'register', 'Inscription réussie')

  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vous êtes inscrit(e), un email de confirmation vous a été envoyé.</p>
            <p>Vérfiez votre email pour vous connecter.</p>
            <hr className="my-4" />
            <Link className="hover:underline underline-offset-4" href="/">
              Retour à l'accueil
            </Link>
          </CardContent>
        </Card>
      </div>
    </MenuLayout>
  )
}

export default Registered
