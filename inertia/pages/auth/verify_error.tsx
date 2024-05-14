import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useErrors } from '@/hooks/use_errors'

import { Link, usePage } from '@inertiajs/react'

const VerifyError = () => {
  useErrors(usePage().props, "Erreur de vérification d'email")

  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Inscription - Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre email n'a pas été vérifié.</p>
            <p>Le token fourni n'est pas valide.</p>
            <hr className="my-4" />
            <Link href="/">Retour à l'accueil</Link>
          </CardContent>
        </Card>
      </div>
    </MenuLayout>
  )
}

export default VerifyError
