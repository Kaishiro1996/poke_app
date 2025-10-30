import {NextRequest, NextResponse} from 'next/server';
import sql from '@/app/lib/db';

export async function POST(req: NextRequest) {
    try{
        const body = await req.json();
        const { name, email, fb_uid } = body;
        console.log('Creating user with body:', body);

        if (!name) {
            return NextResponse.json({ error: 'name is required' }, { status: 400 });
        }
        if (!email) {
            return NextResponse.json({ error: 'email is required' }, { status: 400 });
        }
       

        const [existingUser] = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
        }
        const [result] = await sql`
            INSERT INTO users (name, email, fb_uid, favorite_pokemons, catched_pokemons)
            VALUES (${name}, ${email}, ${fb_uid}, '[]', '[]')
            RETURNING id, name, email;
        `;

        return NextResponse.json({ userId: result.id }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });

    }
}