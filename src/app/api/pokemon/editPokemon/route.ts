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
            iv_hp,
            iv_atq,
            iv_def,
            iv_spa,
            iv_spd,
            iv_spe,
            ev_hp,
            ev_atq,
            ev_def,
            ev_spa,
            ev_spd,
            ev_spe,
            nature,
            item
        } = body;
        if ( !id ||  !name ||  !teratype || !move1 || shiny === undefined || !ability) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        const realGender = body.gender === true ? 'male' : 'female';
        console.log(realGender);const [result] = await sql`
UPDATE pokemon
SET
  name = ${name || null},
  nickname = ${nickname || null},
  pokedex_number = ${pokedex_number || 0},
  move1 = ${move1 || null},
  move2 = ${move2 || null},
  move3 = ${move3 || null},
  move4 = ${move4 || null},
  shiny = ${shiny ?? false},
  ability = ${ability || null},
  iv_hp = ${iv_hp ?? 0},
  iv_atq = ${iv_atq ?? 0},
  iv_def = ${iv_def ?? 0},
  iv_spa = ${iv_spa ?? 0},
  iv_spd = ${iv_spd ?? 0},
  iv_spe = ${iv_spe ?? 0},
  ev_hp = ${ev_hp ?? 0},
  ev_atq = ${ev_atq ?? 0},
  ev_def = ${ev_def ?? 0},
  ev_spa = ${ev_spa ?? 0},
  ev_spd = ${ev_spd ?? 0},
  ev_spe = ${ev_spe ?? 0},
  nature = ${nature || null},
  gender = ${realGender || null},
  teratype = ${teratype || null},
  item = ${item || null}
WHERE id = ${id}
RETURNING id;
`;
        return NextResponse.json({ pokemonId: result }, { status: 200 });
    } catch (error) {
        console.error('Error adding pokemon:', error);  
        return NextResponse.json({ error: 'Error adding pokemon' }, { status: 500 });
    }
}