'use client'

import { useForm } from 'react-hook-form'
import { type LoginSchemaType, LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useTheme } from 'next-themes'
import { LoginAction } from '@/actions'
import { toast } from 'sonner'
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

  const [isPending, startTransition] = useTransition()

  const onSubmit = async (values: LoginSchemaType) => {
    if (recaptchaValue) {
      startTransition(async () => {
        const result = await LoginAction(values)

        if (result?.error) {
          toast.error(result.error)
        } else if (result?.success) {
          toast.success(result.success)
        }
      })
    } else {
      toast.error('Пожалуйста, завершите reCAPTCHA')
    }
  }

  return (
    <CardWrapper
      headerLabel="Войти в аккаунт"
      description="Для входа на сайт используйте ваш email и пароль, которые были указаны при регистрации на сайте"
      backButtonLabel="Ещё нет аккаунта? Регистрация"
      backButtonHref="/auth/register"
      showSocial
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
                    disabled={isPending}
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
                    disabled={isPending}
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
            disabled={isPending}
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
