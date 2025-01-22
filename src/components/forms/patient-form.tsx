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
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ open: false, message: '' });

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    const loginParams = {
      email: values.email,
      password: values.password,
    };

    try {
      const newUser = await login(loginParams);

      if (newUser.error) {
        setError({ open: true, message: newUser.message });
        return;
      }

      router.push(`/patients/${newUser.id}/new-appointment`);
    } catch (error: any) {
      console.log('Erro ao realizar login', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
          <section className="mb-12 space-y-4">
            <h1 className="header">Olá, seja bem-vindo</h1>
            <p className="text-dark-700">Comece com as consultas</p>
          </section>

          <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="" iconSrc="/assets/icons/email.svg" iconAlt="email" />

          <CustomFormField fieldType={FormFieldType.PASSWORD} control={form.control} name="password" label="Senha" placeholder="" iconSrc="/assets/icons/user.svg" iconAlt="user" />

          <SubmitButton isLoading={isLoading}>Entrar</SubmitButton>
        </form>
      </Form>

      <AlertDialog open={error.open}>
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Oops! Algo deu errado</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">{error.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError({ open: false, message: '' })}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
