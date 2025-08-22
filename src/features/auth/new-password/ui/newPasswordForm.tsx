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

import ReCAPTCHA from 'react-google-recaptcha'

import z from 'zod'

export const NewPasswordSchema = z.object({
  password: z.string().min(1, 'Введите пароль').min(6, 'Минимум 6 символов'),
})

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>

export function NewPasswordForm() {
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const { theme } = useTheme()

  const onSubmit = async (values: NewPasswordSchemaType) => {
    console.log(values)
  }

  return (
    <CardWrapper
      headerLabel="Новый пароль"
      description="Придумайте новый пароль для вашего аккаунта"
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
