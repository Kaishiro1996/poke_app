import { NextRequest } from "next/server";
import sql from '@/app/lib/db';
export async function GET(req: NextRequest) {

    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
        return Response.json({ error: 'ID parameter is required' }, { status: 400 });
    }
   const result = await sql`SELECT id FROM users
   WHERE email = ${email}
   `;

     const exists = result.length > 0;

    return Response.json(exists, { status: 200 });
}