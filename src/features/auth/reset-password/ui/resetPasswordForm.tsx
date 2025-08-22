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

export const ResetPasswordSchema = z.object({
  email: z.string().min(1, 'Введите почту').email('Введите корректную почту'),
})

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const { theme } = useTheme()

  const onSubmit = async (values: ResetPasswordSchemaType) => {
    console.log(values)
  }

  return (
    <CardWrapper
      headerLabel="Сброс пароля"
      description="Для сброса пароля введите свою почту"
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
