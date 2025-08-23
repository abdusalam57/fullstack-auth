'use server'

import { type RegisterSchemaType, RegisterSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { prisma } from '@/shared/lib'

export const RegisterAction = async (values: RegisterSchemaType) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Ошибка при заполнении формы' }
  }

  const { name, email, password } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    return { error: 'Почта уже используется' }
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { success: 'Аккаунт успешно создан' }
}
