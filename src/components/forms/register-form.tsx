'use client';

import { SignupFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { unknown, z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../custom-form-field';
import SubmitButton from '../submit-button';
import { createUser } from '@/lib/actions/user/signup.action';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { capitalize } from '@/lib/utils/capitalize-input.utils';

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ open: false, message: [] });

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

  const onSubmit = async (values: z.infer<typeof SignupFormValidation>) => {
    setIsLoading(true);
    setError({ open: false, message: [] });

    const user = {
      first_name: capitalize(values.first_name),
      last_name: capitalize(values.last_name),
      email: values.email,
      phone: values.phone,
      password: values.confirm_password,
    };

    try {
      const newUser = await createUser(user);

      if (newUser.error) {
        // setError({ open: true, message: newUser.message });
        // return;

        console.log(newUser.error);
      }

      console.log(newUser);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="space-y-4">
          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Nome"
              name="first_name"
              placeholder="Digite seu nome"
              iconSrc="/assets/icons/user.svg"
              iconAlt="first_name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Sobrenome"
              name="last_name"
              placeholder="Digite seu sobrenome"
              iconSrc="/assets/icons/user.svg"
              iconAlt="last_name"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="Digite seu email"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Telefone"
              placeholder="(__) _____-____"
              iconSrc="/assets/icons/phone.svg"
              iconAlt="phone"
            />
          </div>

          <div className="flex flex-col gap-4 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Senha"
              placeholder="Digite sua senha"
              iconSrc="/assets/icons/key.svg"
              iconAlt="password"
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="confirm_password"
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              iconSrc="/assets/icons/key.svg"
              iconAlt="confirm_password"
            />
          </div>
        </section>

        <div>
          {error.open && (
            <Alert className="border-[#ff1f1f65] rounded-xl bg-[#ff1f1f0c]">
              <CircleAlert className="h-4 w-4 stroke-error-300" />
              <AlertTitle className="text-error-300 mb-1">Oops! Algo deu errado</AlertTitle>
              {error.message && error.message.map(item => <AlertDescription key={item.property}>{item.message}</AlertDescription>)}
            </Alert>
          )}
        </div>

        <SubmitButton isLoading={isLoading}>Cadastra-se</SubmitButton>
      </form>
    </Form>
  );
}
