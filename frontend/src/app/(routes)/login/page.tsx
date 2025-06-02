import LoginForm from '@/features/auth/components/login-form'

export default function LoginPage () {
  return (
    <main className='flex flex-col gap-5 justify-center grow max-w-lg mx-auto w-full'>
      <h1 className='font-bold text-3xl text-center'>Iniciar sesión</h1>

      <LoginForm />
    </main>
  )
}
