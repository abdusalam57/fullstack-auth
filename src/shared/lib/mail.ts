import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Подтверждение почты',
    html: `<p>Нажмите <a href="${confirmLink}">здесь</a>, чтобы подтвердить почту.</p>`,
  })
}
