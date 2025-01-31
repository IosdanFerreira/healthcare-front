import { JWTPayload } from 'jose';

export interface ISessionPayload extends JWTPayload {
  user_id: number;
  first_name: string;
  last_name: string;
  access_token: string;
  refresh_token: string;
}
