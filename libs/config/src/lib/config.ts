export const API_PORT = Number(process.env.API_PORT ?? 3333);
export const API_HOST = process.env.API_HOST ?? '0.0.0.0';

export const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN ?? 'http://localhost:4200';