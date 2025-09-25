import {NextResponse, NextRequest} from 'next/server';
import sql from '@/app/lib/db';

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { 
            id,
            
            name,
            nickname,
            
            pokedex_number,
            move1,
            move2,
            move3,
            move4,
            teratype,
            shiny,
            ability,
            iv_Hp,
            iv_Atk,
            iv_Def,
            iv_SpA,
            iv_Spd,
            iv_Spe,
            ev_Hp,
            ev_Atk,
            ev_Def,
            ev_SpA,
            ev_Spd,
            ev_Spe,
            nature,
        } = body;
        if ( !id ||  !name ||  !teratype || !move1 || shiny === undefined || !ability) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const realGender = body.gender === true ? 'male' : 'female';
     

        const [result] = await sql`
        UPDATE pokemon
        SET name = ${name}, nickname = ${nickname}, pokedex_number = ${pokedex_number}, move1 = ${move1}, move2 = ${move2}, move3 = ${move3}, move4 = ${move4}, shiny = ${shiny}, ability = ${ability},  iv_hp = ${iv_Hp}, iv_atq = ${iv_Atk}, iv_def = ${iv_Def}, iv_spa = ${iv_SpA}, iv_spd = ${iv_Spd}, iv_spe = ${iv_Spe}, ev_hp = ${ev_Hp}, ev_atq = ${ev_Atk}, ev_def = ${ev_Def}, ev_spa = ${ev_SpA}, ev_spd = ${ev_Spd}, ev_spe = ${ev_Spe}, nature = ${nature}, gender = ${realGender}, teratype = ${teratype}, item = ${body.item} 
        WHERE id = ${body.id}
        RETURNING id

       
        `;
        return NextResponse.json({ pokemonId: result.id }, { status: 200 });
    } catch (error) {
        console.error('Error adding pokemon:', error);  
        return NextResponse.json({ error: 'Error adding pokemon' }, { status: 500 });
    }
}