import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Link } from '@inertiajs/react'

const Verify = () => {
  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre email a été vérifié.</p>
            <p>Vous pouvez vous connecter.</p>
            <Link className="hover:underline underline-offset-4" href="/login">
              Se connecter
            </Link>
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

export default Verify
