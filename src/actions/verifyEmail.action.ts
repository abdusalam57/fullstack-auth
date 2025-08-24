'use server'

import { prisma } from '@/shared/lib'

export const VerifyEmailAction = async (token: string) => {
  const existingToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!existingToken) {
    return { error: 'Неверная ссылка подтверждения' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'Срок действия ссылки истёк' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email },
  })

  if (!existingUser) {
    return { error: 'Пользователь не найден' }
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })

    return { success: 'Почта подтверждена' }
  } catch {
    return { error: 'Ошибка подтверждении почты' }
  }
}
