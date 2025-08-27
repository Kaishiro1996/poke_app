import {NextRequest, NextResponse} from 'next/server';
import sql from '@/app/lib/db';

export async function POST(req: NextRequest) {
    const body = await req.json();

    console.log('Updating user with body:', body);
  const { id, favorite_pokemons, catched_pokemons } = body;

  
  if (!id || !favorite_pokemons || !catched_pokemons) {
    return NextResponse.json(
      { error: "id, favorite_pokemon, and catched_pokemon are required" },
      { status: 400 }
    );
  }

    try {
        const result = await sql`
            UPDATE users
            SET favorite_pokemons =  ${sql.json(favorite_pokemons)}, catched_pokemons = ${sql.json(catched_pokemons)}
            WHERE id = ${id}
            RETURNING id, favorite_pokemons, catched_pokemons;
        `;

        return NextResponse.json(result, { status: 200 });
}catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });

}

}