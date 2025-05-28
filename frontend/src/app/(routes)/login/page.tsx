import LoginForm from '@/features/auth/components/login-form'

export default function LoginPage () {
  return (
    <main className='flex flex-col gap-5 grow'>
      <h1>Iniciar sesión</h1>

      <LoginForm />
    </main>
  )
}
