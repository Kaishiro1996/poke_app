import { NextRequest } from "next/server";
import sql from '@/app/lib/db';
export async function GET(req: NextRequest) {
    
    const name = req.nextUrl.searchParams.get('name');
    
    if (!name) {
        return Response.json({ error: 'Name parameter is required' }, { status: 400 });
    }
   const result = await sql`SELECT * FROM pokemon
   WHERE name = ${name} `;
    return Response.json(result, { status: 200 });
}