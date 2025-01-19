'use client';

import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../custom-form-field';
import SubmitButton from '../submit-button';

export default function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const user = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá, seja bem-vindo</h1>
          <p className="text-dark-700">Comece com as consultas</p>
        </section>

        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="first_name" label="Nome" placeholder="" iconSrc="/assets/icons/user.svg" iconAlt="user" />

        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="last_name" label="Sobrenome" placeholder="" iconSrc="/assets/icons/user.svg" iconAlt="user" />

        <CustomFormField fieldType={FormFieldType.INPUT} control={form.control} name="email" label="Email" placeholder="" iconSrc="/assets/icons/email.svg" iconAlt="email" />

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  );
}
