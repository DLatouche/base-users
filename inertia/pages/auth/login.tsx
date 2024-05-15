import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { useErrors } from '@/hooks/use_errors'

const formSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Mot de passe trop court' }),
})

const Login = () => {
  const { SITE_KEY } = usePage().props
  useErrors(usePage().props, 'Une erreur est survenue lors de la connexion')
  const refCaptcha = useRef<HCaptcha>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = () => {
    refCaptcha?.current?.execute()
  }

  const callbackCaptcha = async (token: string) => {
    const values = form.getValues()
    router.post('/auth/email/login', {
      email: values.email,
      password: values.password,
    })
  }

  const loginGoogle = () => {
    window.location.href = `${window.location.origin}/auth/google/redirect`
  }
  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Link
                  className="hover:underline underline-offset-4 mt-2"
                  href="/auth/email/requestResetPassword"
                >
                  Mot de passe oublié?
                </Link>
                <HCaptcha
                  sitekey={SITE_KEY as string}
                  onVerify={callbackCaptcha}
                  ref={refCaptcha}
                  size="invisible"
                />
                <Button className="w-full mt-4" type="submit">
                  Se connecter
                </Button>
              </form>
            </Form>
            <div className="flex flex-col space-y-2 mt-4">
              <Button className="w-full" variant="outline" onClick={loginGoogle}>
                Se connecter avec Google
                <img
                  className="block h-4 mx-2"
                  src="/images/socials/google.png"
                  alt="google logo"
                />
              </Button>
            </div>
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

export default Login
