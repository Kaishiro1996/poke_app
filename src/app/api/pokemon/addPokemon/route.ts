import {NextResponse, NextRequest} from 'next/server';
import sql from '@/app/lib/db';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            
            name,
            nickname,
            pokedex_number,
            move1,
            move2,
            move3,
            move4,
            shiny,
            ability,
            id_trainer,
            id_team
        } = body;
        if (  !name || !nickname || !pokedex_number || !move1 || !move2 || !move3 || !move4 || shiny === undefined || !ability || !id_trainer || !id_team) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const [result] = await sql`
        INSERT INTO pokemon (name, nickname, pokedex_number, move1, move2, move3, move4, shiny, ability, id_trainer, id_team)
        VALUES ( ${name}, ${nickname}, ${pokedex_number}, ${move1}, ${move2}, ${move3}, ${move4}, ${shiny}, ${ability}, ${id_trainer}, ${id_team})
        RETURNING id, nickname, name;
        `;
        return NextResponse.json({ pokemonId: result.id }, { status: 201 });
    } catch (error) {
        console.error('Error adding pokemon:', error);  
        return NextResponse.json({ error: 'Error adding pokemon' }, { status: 500 });
    }
}