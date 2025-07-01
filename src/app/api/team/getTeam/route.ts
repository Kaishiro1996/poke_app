import { NextRequest } from 'next/server';
import sql from '@/app/lib/db';

export async function GET(req: NextRequest) {

    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return Response.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    const result = await sql`
        SELECT * FROM teams
        WHERE user_id = ${id}
    `;
    return Response.json(result, { status: 200 });
}