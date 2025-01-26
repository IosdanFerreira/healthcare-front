import Image from 'next/image';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/forms/register-form';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  return (
    <div className="flex items-center justify-center h-screen max-h-screen bg-light-400">
      <section>
        <div className="sub-container max-w-[700px] p-8 rounded-2xl bg-light-200 shadow-2xl my-5">
          <section className="mb-5 space-y-3">
            <h1 className="text-xl font-black">Gerencie Suas Consultas</h1>
            <p className="text-light-700 text-md">
              Organize sua agenda, acompanhe o estado das consultas e ofereça o melhor atendimento aos seus pacientes!
            </p>
          </section>

          <RegisterForm />
        </div>
      </section>
    </div>
  );
};

export default Register;
