import RegisterForm from '@/features/auth/components/register-form'

export default function RegisterPage () {
  return (
    <main className='flex flex-col gap-5 justify-center grow max-w-lg mx-auto w-full'>
      <h1 className='font-bold text-3xl text-center'>Crear cuenta</h1>

      <RegisterForm />
    </main>
  )
}
