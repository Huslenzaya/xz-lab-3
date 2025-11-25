// src/app/api/hello/route.ts
export async function GET(request: Request) {
  return new Response('Hello, from API!');
}
