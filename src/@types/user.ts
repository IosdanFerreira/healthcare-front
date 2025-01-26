export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string | null;
  gender: 'Masculino' | 'Feminino' | null;
  address: string | null;
  occupation: string | null;
  emergency_contact_name: string | null;
  emergency_contact_number: string | null;
  primary_physician: string | null;
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  allergies: string | null;
  current_medication: string | null;
  family_medical_history: string | null;
  past_medical_history: string | null;
  identification_type: string | null;
  identification_number: string | null;
  identification_document: string | null;
  privacy_consent: boolean;
  created_at: Date;
  updated_at: Date;
  access_token: string;
  refresh_token: string;
}
