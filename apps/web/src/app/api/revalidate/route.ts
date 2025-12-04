// apps/web/src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || (!body.path && !body.id)) {
      return new Response(
        JSON.stringify({
          error: 'path эсвэл id заавал шаардлагатай',
        }),
        { status: 400 }
      );
    }

    // Хэрвээ шууд path ирсэн бол
    if (body.path) {
      await revalidatePath(body.path);
      return new Response(
        JSON.stringify({ revalidated: true, path: body.path }),
        { status: 200 }
      );
    }

    // Хэрвээ зөвхөн id ирсэн бол /yellow-books болон тухайн details хуудсыг revalidate хийнэ
    if (body.id) {
      await revalidatePath('/yellow-books');
      await revalidatePath(`/yellow-books/${body.id}`);
      return new Response(
        JSON.stringify({
          revalidated: true,
          paths: ['/yellow-books', `/yellow-books/${body.id}`],
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ error: 'Invalid payload' }), {
      status: 400,
    });
  } catch (e) {
    console.error('Revalidate error:', e);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
    });
  }
}
