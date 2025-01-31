import LoginForm from '@/components/forms/patient-form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen max-h-screen overflow-hidden bg-light-400">
      <section>
        <div className="sub-container max-w-[496px] p-8 rounded-2xl bg-light-200 shadow-md my-5">
          <section className="mb-5 space-y-3">
            <h1 className="text-xl font-black">
              Bem-vindo ao <span className="text-green-500">CarePulse</span>
            </h1>
            <p className="text-light-700 text-[15px]">
              Acesse sua conta para gerenciar consultas, acompanhar pacientes e otimizar sua prática médica. Tudo em um só lugar!
            </p>
          </section>

          <LoginForm />

          <div className="py-4">
            <Link href="/cadastre" className="text-sm hover:underline">
              Ainda não possui uma conta?
            </Link>
          </div>

          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-300 xl:text-left">© 2025 CarePluse</p>
          </div>
        </div>
      </section>
    </div>
  );
}
