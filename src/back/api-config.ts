export interface IApiConfig {
  base_url: string | undefined;
}

export const API_CONFIG: IApiConfig = {
  base_url: process.env.NEXT_PUBLIC_API_ENDPOINT,
};
