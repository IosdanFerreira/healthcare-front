import Image from 'next/image';
import { redirect } from 'next/navigation';

import RegisterForm from '@/components/forms/register-form';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className="mb-12 h-10 w-fit" />

          <RegisterForm />

          <p className="copyright py-12">© 2025 CarePluse</p>
        </div>
      </section>
    </div>
  );
};

export default Register;
