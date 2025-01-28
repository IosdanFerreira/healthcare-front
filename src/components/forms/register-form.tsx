'use client';

import { SignupFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import SubmitButton from '../submit-button';
import { createUser } from '@/lib/actions/user/signup.action';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { capitalize } from '@/lib/utils/capitalize-input.utils';
import { IErrorProps } from '@/@types';
import { login } from '@/lib/actions/user/login.action';
import InputPassword from '../inputs/password-input';
import TextInput from '../inputs/text-input';
import MaskInput from '../inputs/mask-input';

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<IErrorProps[]>([]);

  // Validação do formulário
  const form = useForm<z.infer<typeof SignupFormValidation>>({
    resolver: zodResolver(SignupFormValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
  });

  // Função para lidar com o envio do formulário
  const onSubmit = async (values: z.infer<typeof SignupFormValidation>) => {
    setIsLoading(true);
    setErrors([]);

    // Dados de entrada do cadastro
    const user = {
      first_name: capitalize(values.first_name),
      last_name: capitalize(values.last_name),
      email: values.email,
      phone: values.phone,
      password: values.confirm_password,
    };

    try {
      // Realiza cadastro do usuário
      const createdUser = await createUser(user);

      // Se a API retornar erros, definir os erros na state
      if (createdUser?.errors) {
        setErrors(createdUser?.errors);
        setIsLoading(false);
        return;
      }

      // Se a criação do usuário for bem-sucedida, realizar login
      const loggedUser = await login({ email: createdUser.data.email, password: user.password });

      // Se a API retornar erros, definir os erros na state
      if (loggedUser?.errors) {
        setErrors(loggedUser?.errors);
        setIsLoading(false);
        return;
      }

      // Redirecionar para a página de agendamento de consulta
      router.push(`/patients/${loggedUser?.data?.id}/new-appointment`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            <TextInput
              control={form.control}
              label="Nome"
              name="first_name"
              placeholder="Digite seu nome"
              iconSrc="/assets/icons/user.svg"
              iconAlt="first_name"
            />

            <TextInput
              control={form.control}
              label="Sobrenome"
              name="last_name"
              placeholder="Digite seu sobrenome"
              iconSrc="/assets/icons/user.svg"
              iconAlt="last_name"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <TextInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Digite seu email"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <MaskInput
              mask="(__) _____-____"
              replacement={{ _: /\d/ }}
              control={form.control}
              name="phone"
              label="Telefone"
              placeholder="(__) _____-____"
              iconSrc="/assets/icons/phone.svg"
              iconAlt="phone"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <InputPassword
              control={form.control}
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              iconSrc="/assets/icons/key.svg"
              iconAlt="user"
            />

            <InputPassword
              control={form.control}
              name="confirm_password"
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              iconSrc="/assets/icons/key.svg"
              iconAlt="confirm_password"
            />
          </div>
        </section>

        {errors?.length > 0 && (
          <Alert className="border-[#ff1f1f65] rounded-xl bg-[#ff1f1f0c]">
            <CircleAlert className="h-4 w-4 stroke-error-300" />
            <AlertTitle className="text-error-300 mb-1">Oops! Algo deu errado</AlertTitle>
            {errors?.map(error => <AlertDescription key={error?.property}>{error?.message}</AlertDescription>)}
          </Alert>
        )}

        <SubmitButton isLoading={isLoading}>Cadastra-se</SubmitButton>
      </form>
    </Form>
  );
}
