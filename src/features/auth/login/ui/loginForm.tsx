'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { CardWrapper } from '@/features/auth/card-wrapper'

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

import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'

import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Введите почту').email('Введите корректную почту'),
  password: z.string().min(1, 'Введите пароль').min(6, 'Минимум 6 символов'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>

export function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const { theme } = useTheme()

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
                <div className="flex items-center justify-between">
                  <FormLabel>Пароль</FormLabel>
                  <Link
                    href="/auth/reset-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>
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

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ''}
              onChange={setRecaptchaValue}
              theme={theme === 'light' ? 'light' : 'dark'}
            />
          </div>

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
