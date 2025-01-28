'use client';

import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../custom-form-field';
import SubmitButton from '../submit-button';
import { login } from '@/lib/actions/user/login.action';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { CircleAlert } from 'lucide-react';
import { IDefaultResponse, IErrorProps, IUser } from '@/@types';
import { ILoginParams } from '@/interfaces/user';
import InputPassword from '../inputs/password-input';
import TextInput from '../inputs/text-input';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<IErrorProps[]>([]);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    setErrors([]);

    const loginParams: ILoginParams = {
      email: values?.email,
      password: values?.password,
    };

    try {
      // Realizar login do usuário
      const user: IDefaultResponse<IUser> = await login(loginParams);

      // Se a API retornar erros, definir os erros na state
      if (user?.errors) {
        setErrors(user?.errors);
        setIsLoading(false);
        return;
      }

      // Redirecionar para a página de agendamento de consulta
      router.push(`/patients/${user?.data?.id}/new-appointment`);
    } catch (error: any) {
      console.log('Erro ao realizar login', error);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
          <TextInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Digite seu email"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <InputPassword
            control={form.control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            iconSrc="/assets/icons/key.svg"
            iconAlt="user"
          />

          {errors.length > 0 && (
            <Alert className="border-[#ff1f1f65] rounded-xl bg-[#ff1f1f0c]">
              <CircleAlert className="h-4 w-4 stroke-error-300" />
              <AlertTitle className="text-error-300 mb-1">Oops! Algo deu errado</AlertTitle>
              {errors?.map(error => <AlertDescription key={error?.property}>{error?.message}</AlertDescription>)}
            </Alert>
          )}

          <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
        </form>
      </Form>
    </section>
  );
}
