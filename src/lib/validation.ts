import { z } from 'zod';

export const UserFormValidation = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve conter pelo menos 6 caracteres').max(50, 'Senha deve conter no máximo 50 caracteres'),
});

export const SignupFormValidation = z
  .object({
    first_name: z.string().min(2, 'Nome deve conter ao menos 2 caracteres').max(50, 'Nome deve conter no máximo 50 caracteres'),
    last_name: z.string().min(2, 'Sobrenome deve conter ao menos 2 caracteres').max(50, 'Sobrenome deve conter no máximo 50 caracteres'),
    email: z.string().email('Email inválido'),
    phone: z
      .string()
      .nonempty('Telefone é obrigatório')
      .refine(phone => /^\(\d{2}\) \d{5}-\d{4}$/.test(phone), 'Telefone inválido'),
    password: z
      .string()
      .min(6, 'Senha deve conter pelo menos 6 caracteres')
      .max(50, 'Senha deve conter no máximo 50 caracteres')
      .refine(
        password => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
        'A senha deve conter ao menos 8 caracteres, uma letra maiúscula, um número e um carácter especial',
      ),
    confirm_password: z.string().nonempty('Confirmação de senha obrigatória'),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'As senhas devem ser iguais',
    path: ['confirm_password'],
  });

export const PatientFormValidation = z.object({
  first_name: z.string().min(2, 'Nome deve conter pelo menos 2 caracteres').max(50, 'Nome deve conter no máximo 50 caracteres'),
  last_name: z.string().min(2, 'Sobrenome deve conter pelo menos 2 caracteres').max(50, 'Sobrenome deve conter no máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().refine(phone => /^[0-9]{11}$/.test(phone), 'Telefone inválido'),
  birthDate: z.string(),
  gender: z.enum(['Masculino', 'Feminino']),
  address: z.string().min(5, 'Endereço deve conter pelo menos 5 caracteres').max(500, 'Endereço deve conter no máximo 500 caracteres'),
  occupation: z.string().min(2, 'Ocupação deve conter pelo menos 2 caracteres').max(500, 'Ocupação deve conter no máximo 500 caracteres'),
  emergencyContactName: z
    .string()
    .min(2, 'Nome para contato de emergência deve conter pelo menos 2 caracteres')
    .max(50, 'Nome para contato de emergência deve conter no máximo 50 caracteres'),
  emergencyContactNumber: z.string().refine(emergencyContactNumber => /^\+\d{10,15}$/.test(emergencyContactNumber), 'Telefone inválido'),
  primaryPhysician: z.string().min(2, 'Selecione pelo menos um doutor'),
  insuranceProvider: z
    .string()
    .min(2, 'Nome do seguro deve conter pelo menos 2 caracteres')
    .max(50, 'Nome do seguro deve conter no máximo 50 caracteres'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Número da apólice de seguro deve conter pelo menos 2 caracteres')
    .max(50, 'Número da apólice de seguro deve conter no máximo 50 caracteres'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: 'Você deve consentir com o tratamento para prosseguir',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: 'Você deve consentir com a divulgação para prosseguir',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: 'Você deve consentir com a privacidade para prosseguir',
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Selecione pelo menos um doutor'),
  schedule: z.coerce.date(),
  reason: z.string().min(2, 'O motivo deve ter pelo menos 2 caracteres').max(500, 'O motivo deve ter no máximo 500 caracteres'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string(),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Selecione pelo menos um doutor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().min(2, 'O motivo deve ter pelo menos 2 caracteres').max(500, 'O motivo deve ter no máximo 500 caracteres'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'criado':
      return CreateAppointmentSchema;
    case 'cancelado':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
