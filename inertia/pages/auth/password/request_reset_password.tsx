import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Link, router, usePage } from '@inertiajs/react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { z } from 'zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useErrors } from '@/hooks/use_errors'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  email: z.string().email(),
})

const RequestResetPassword = () => {
  const { SITE_KEY } = usePage().props
  const refCaptcha = useRef<HCaptcha>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })
  useErrors(usePage().props, 'Une erreur est survenue lors de la réinitialisation de mot de passe.')

  const onSubmit = () => {
    refCaptcha?.current?.execute()
  }

  const callbackCaptcha = async (token: string) => {
    try {
      const values = form.getValues()
      router.post('/auth/email/requestResetPassword', {
        email: values.email,
        captcha: token,
      })
    } catch (error) {
      console.log('%cregister.tsx (63) -> error', 'background: #FF0000; color:#FFFFFF', error)
    }
  }

  return (
    <MenuLayout className="!pt-0 h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <Card className="max-w-96 w-full">
          <CardHeader>
            <CardTitle>Réinitialisation de mot de passe</CardTitle>
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

                <HCaptcha
                  sitekey={SITE_KEY as string}
                  onVerify={callbackCaptcha}
                  ref={refCaptcha}
                  size="invisible"
                />
                <Button className="w-full mt-8" type="submit">
                  Réinitialiser le mot de passe
                </Button>
              </form>
            </Form>
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

export default RequestResetPassword
