import postgres from 'postgres';
import { pokemon, teams, users } from '../lib/placeholder_data';

const sql = postgres(process.env.DATABASE_URL_UNPOOLED!, { ssl: 'require' });


async function seedPokemon() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS pokemon (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        type1 TEXT NOT NULL,
        type2 TEXT,
        image TEXT NOT NULL
    )`;

    const insertedPokemon = await Promise.all(
      pokemon.map(
        (p) =>
          sql`INSERT INTO pokemon (id,name, type1, type2, image) VALUES (${
            p.id
          },${p.name}, ${p.types1}, ${p.types2 || null}, ${
            p.image
          }) ON CONFLICT (id) DO NOTHING RETURNING *`
      )
    );
    return insertedPokemon
}

async function seedUsers() {
    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`;
    const insertedUsers = await Promise.all(
      users.map(
        (u) =>
          sql`INSERT INTO users (id, name, email, password) VALUES (${
            u.id
          }, ${u.name}, ${u.email}, ${u.password}) ON CONFLICT (id) DO NOTHING RETURNING *`
      )
    );
    return insertedUsers
}

const seedTeams = async () => {
    sql`CREATE TABLE IF NOT EXISTS teams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        pokemon JSONB NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
    )`;
    const insertedTeams = await Promise.all(
      teams.map(
        (t) =>
          sql`INSERT INTO teams (id, name, pokemon, user_id) VALUES (${
            t.user_id
          }, ${t.name}, ${JSON.stringify(t.pokemon)}, ${
            t.user_id
          }) ON CONFLICT (id) DO NOTHING RETURNING *`
      )
    )
    return insertedTeams
};


export async function GET() {
    try{
        const result = await sql.begin(async () => {
            await seedPokemon();
            await seedUsers();
            await seedTeams();
          });
          console.log("result",result); // O hacer algo útil con él
        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      return Response.json({ error }, { status: 500 });
    }
}