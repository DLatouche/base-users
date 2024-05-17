import { AdminLayout } from '@/components/layouts/admin_layout/admin_layout'
import { Avatar } from '@/components/avatar/avatar'
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
import { zodResolver } from '@hookform/resolvers/zod'

import { router, usePage } from '@inertiajs/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { themesList } from '@/utils/themes_list'
import { roles } from '../../../../enums/roles'
import User from '#models/user'
import { providers } from '../../../../enums/providers'

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3),
    avatar: z.string(),
    theme: z.string(),
    roleId: z.string(),
    password: z.string().min(8).optional().or(z.literal('')),
    rePassword: z.string().min(8).optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      return !data.password || data.password === '' || data.password === data.rePassword
    },
    {
      message: 'Les mots de passe ne correspondent pas',
      path: ['rePassword'],
    }
  )

type EditUserProps = {
  userEditing: User
}
const EditUser = () => {
  const { userEditing } = usePage<EditUserProps>().props

  //For now we only have one provider by user
  const isEmailProvider = userEditing.auths[0].providerName === providers.email

  useSuccess(usePage().props, 'editUser', 'Modifications réussie')
  useErrors(usePage().props, "Erreur lors de la modification de l'utilisateur")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: userEditing.email,
      username: userEditing.username,
      avatar: userEditing.avatar,
      roleId: userEditing.roleId,
      theme: userEditing.setting.theme,
      password: '',
      rePassword: '',
    },
  })

  const onSubmit = async () => {
    // Add email and password only if the provider is email
    const { email, password, ...otherData } = form.getValues()

    router.patch(`/admin/users/`, {
      ...otherData,
      ...(isEmailProvider && { email, password }),
      id: userEditing.id,
    })
  }
  return (
    <AdminLayout>
      <div className="container">
        <h1 className="text-2xl font-semibold mb-6">Éditer un utilisateur</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="flex my-4">
              <Button
                variant="outline"
                className="mr-4"
                type="button"
                onClick={() => {
                  router.visit('/admin/users')
                }}
              >
                Retour
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
            <div className="flex mt-8">
              <Card className="max-w-96 w-full mr-4">
                <CardHeader>
                  <p className="text-xl">Compte</p>
                </CardHeader>
                <CardContent>
                  {isEmailProvider ? (
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
                  ) : (
                    <p className="mt-2 mb-4">Email: {userEditing.email} </p>
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
                    name="roleId"
                    render={({ field }) => (
                      <FormItem className="my-4">
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(roles).map((role) => (
                              <SelectItem value={role.id} key={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                              <SelectValue placeholder="Avatar" />
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
                      <p className="mb-4 text-muted-foreground">
                        Changer le mot de passe de l'utilisateur
                      </p>
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
                      <FormItem className="mb-4">
                        <FormLabel>Theme</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Theme" />
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
      </div>
    </AdminLayout>
  )
}

export default EditUser
