'use client'

import { useForm } from 'react-hook-form'
import { type LoginSchemaType, LoginSchema } from '@/features/auth/login/model'
import { zodResolver } from '@hookform/resolvers/zod'
import { CardWrapper } from '@/features/auth/cardWrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/shared/ui'

export function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginSchemaType) => {
    console.log(values)
  }

  return (
    <CardWrapper
      headerLabel="Войти в аккаунт"
      description="Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте"
      backButtonLabel="Ещё нет аккаунта? Регистрация"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="cursor-pointer"
            type="submit"
          >
            Продолжить
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
