'use client'

import { useForm } from 'react-hook-form'
import {
  type RegisterSchemaType,
  RegisterSchema,
} from '@/features/auth/register/model'
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

import ReCAPTCHA from 'react-google-recaptcha'

export function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const { theme } = useTheme()

  const onSubmit = async (values: RegisterSchemaType) => {
    console.log(values)
  }

  return (
    <CardWrapper
      headerLabel="Создать аккаунт"
      description="Для регистрации достаточно ввести своё имя, email и придумать пароль"
      backButtonLabel="Уже есть аккаунт? Войти"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
