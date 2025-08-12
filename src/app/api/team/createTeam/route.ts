import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';





export async function POST(req: NextRequest) {
    try{

    
    const body = await req.json();
    const { user_id, name } = body;

    if (!user_id || !name) {
        return new Response(JSON.stringify({ error: 'user_id and name are required' }), { status: 400 });
    }

    

   const [result] = await sql`
       INSERT INTO teams (user_id, name)
       VALUES (${user_id}, ${name})
    RETURNING id, name;
   `;

   return NextResponse.json({ teamId: result.id, name: result.name }, { status: 201 });
} catch (error) {
    console.error('Error creating team:', error);
    return new Response(JSON.stringify({ error: 'Error creating team' }), { status: 500 });
}

}