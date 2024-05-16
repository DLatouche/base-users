import type User from '#models/user'
import { Avatar } from '@/components/avatar/avatar'
import { MenuLayout } from '@/components/layouts/menu_layout.tsx/menu_layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useErrors } from '@/hooks/use_errors'
import { useSuccess } from '@/hooks/use_success'
import { avatars } from '@/utils/avatars'
import { upperFirst } from '@/utils/strings'
import { themesList } from '@/utils/themes_list'
import { zodResolver } from '@hookform/resolvers/zod'

import { router, usePage } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    avatar: z.string(),
    theme: z.string(),
    password: z.string().min(8).optional().or(z.literal('')),
    rePassword: z.string().min(8).optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      return !data.password || data.password === '' || data.password === data.rePassword
    },
    {
      message: 'Passwords do not match',
      path: ['rePassword'],
    }
  )
const Account = () => {
  const { user } = usePage<{ user: User }>().props

  useSuccess(usePage().props, 'account', 'Mise à jour réussie')
  useErrors(usePage().props, 'Erreur lors de la mise à jour de votre compte')

  const isEmailProvider = user.auths[0].providerName === 'email'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      theme: user.setting.theme,
      password: '',
      rePassword: '',
    },
  })

  const onSubmit = async () => {
    const { email, username, password, avatar, theme } = form.getValues()

    // We can change email and password only if the user is using email provider
    const userData = {
      id: user.id,
      username,
      avatar,
      theme,
      ...(isEmailProvider && { email, password }),
    }
    router.patch(`/account`, userData)
  }

  return (
    <MenuLayout className="container">
      <h1 className="text-2xl font-semibold mb-4">Mon compte</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex my-4">
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() => {
                router.visit('/')
              }}
            >
              Retour
            </Button>
            <Button type="submit">Enregister</Button>
          </div>
          <div className="flex mt-8">
            <Card className="max-w-96 w-full mr-4">
              <CardHeader>
                <p className="text-xl">Compte</p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  Type de connexion: {upperFirst(user.auths[0].providerName)}
                </p>
                {isEmailProvider ? (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full my-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="exemple@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <p className=" mb-4">Email: {user.email} </p>
                )}

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full my-4">
                      <FormLabel>Pseudo</FormLabel>
                      <FormControl>
                        <Input placeholder="Exemple" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Avatar</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisi ton avatar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {avatars.map((avt) => (
                            <SelectItem value={avt} key={avt}>
                              <Avatar avatar={avt} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {isEmailProvider && (
                  <>
                    <hr className="my-4 mt-8" />
                    <p className="mb-4 text-muted-foreground">Changez votre mot de passe</p>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="my-4 w-full">
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem className="my-4 w-full">
                          <FormLabel>Confirmation du mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <div className="grid grid-cols-2 gap-4 mt-8"></div>
              </CardContent>
            </Card>
            <Card className="max-w-96 w-full">
              <CardHeader>
                <p className="text-xl">Paramètres</p>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel>Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisi ton theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themesList.map((theme) => (
                            <SelectItem key={theme.value} value={theme.value}>
                              {theme.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </MenuLayout>
  )
}

export default Account
