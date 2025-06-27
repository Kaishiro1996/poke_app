import {NextRequest, NextResponse} from 'next/server';
import sql from '@/app/lib/db';

export async function GET(req: NextRequest) {
    try{

        // Get the query string parameters from the request URL
        const searchParams = req.nextUrl.searchParams;
        const id_team = searchParams.get('id_team');

        console.log('id_team:', id_team);
        if (!id_team) {
            return new Response(JSON.stringify({ error: 'id_team is required' }), { status: 400 });
        }

        const result = await sql`
            SELECT * FROM pokemon
            WHERE id_team = ${id_team}
         
        `;

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching team:', error);
        return new Response(JSON.stringify({ error: 'Error fetching team' }), { status: 500 });
    }
}