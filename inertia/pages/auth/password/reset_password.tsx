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
import { toast } from '@/components/ui/use-toast'
import { useErrors } from '@/hooks/use_errors'
import { zodResolver } from '@hookform/resolvers/zod'

import { Link, router, usePage } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  password: z.string().min(8, { message: 'Mot de passe trop court' }),
})

const ResetPassword = () => {
  useErrors(usePage().props, 'Une erreur est survenue lors de la modification du mot de passe')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')
    if (!token) {
      toast({
        variant: 'destructive',
        description: 'Token invalide',
      })
      return
    }
    try {
      const values = form.getValues()
      router.post('/auth/email/resetPassword', {
        password: values.password,
        token: token,
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
            <CardTitle>Réinitialisation de votre mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col items-start">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-4 w-full">
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full mt-4" type="submit">
                  Changer le mot de passe
                </Button>
              </form>
            </Form>
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

export default ResetPassword
