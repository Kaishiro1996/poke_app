import {NextRequest, NextResponse} from 'next/server';
import sql from '@/app/lib/db';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id_trainer = searchParams.get('id_trainer');
        if (!id_trainer) {
            return NextResponse.json({ error: 'id_trainer is required' }, { status: 400 });
        }
        const result= await sql`
        SELECT * from pokemon
        WHERE id_trainer = ${id_trainer};
        `;
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Error fetching pokemon by trainer ID:', error);
        return NextResponse.json({ error: 'Error fetching pokemon by trainer ID' }, { status: 500 });
    }
}