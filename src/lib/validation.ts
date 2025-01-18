import { z } from 'zod';

export const UserFormValidation = z.object({
  name: z.string().min(2, 'Nome deve conter pelo menos 2 caracteres').max(50, 'Nome deve conter no máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().refine(phone => /^\+\d{10,15}$/.test(phone), 'Telefone inválido'),
});

export const PatientFormValidation = z.object({
  name: z.string().min(2, 'Nome deve conter pelo menos 2 caracteres').max(50, 'Nome deve conter no máximo 50 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().refine(phone => /^\+\d{10,15}$/.test(phone), 'Telefone inválido'),
  birthDate: z.coerce.date(),
  gender: z.enum(['Masculino', 'Feminino']),
  address: z.string().min(5, 'Endereço deve conter pelo menos 5 caracteres').max(500, 'Endereço deve conter no máximo 500 caracteres'),
  occupation: z.string().min(2, 'Ocupação deve conter pelo menos 2 caracteres').max(500, 'Ocupação deve conter no máximo 500 caracteres'),
  emergencyContactName: z
    .string()
    .min(2, 'Nome para contato de emergência deve conter pelo menos 2 caracteres')
    .max(50, 'Nome para contato de emergência deve conter no máximo 50 caracteres'),
  emergencyContactNumber: z.string().refine(emergencyContactNumber => /^\+\d{10,15}$/.test(emergencyContactNumber), 'Telefone inválido'),
  primaryPhysician: z.string().min(2, 'Selecione pelo menos um doutor'),
  insuranceProvider: z.string().min(2, 'Nome do seguro deve conter pelo menos 2 caracteres').max(50, 'Nome do seguro deve conter no máximo 50 caracteres'),
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
