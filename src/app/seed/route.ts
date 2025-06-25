import postgres from 'postgres';
import { pokemon, users, teams } from '../lib/placeholder_data';

const sql = postgres(process.env.DATABASE_URL_UNPOOLED!, { ssl: 'require' });


async function seedPokemon(sql: postgres.Sql) {
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
          sql`INSERT INTO pokemon (name, type1, type2, image) VALUES (${p.name}, ${p.types1}, ${p.types2 || null}, ${
            p.image
          }) ON CONFLICT (id) DO NOTHING RETURNING *`
      )
    );
    return insertedPokemon
}

async function seedUsers(sql: postgres.Sql) {
    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`;
    const insertedUsers = await Promise.all(
        users.map(
          (u) =>
            sql`INSERT INTO users (id, name, email, password) VALUES (${u.id}, ${u.name}, ${u.email}, ${u.password}) ON CONFLICT (id) DO NOTHING RETURNING *`
        )
      );
      
      console.log('Inserted users:', insertedUsers);
    return insertedUsers
}

async function seedTeams(sql: postgres.Sql) {
    await sql`CREATE TABLE IF NOT EXISTS teams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        pokemon JSONB NOT NULL

    )`;
    await sql`ALTER TABLE teams ADD COLUMN IF NOT EXISTS pokemon JSONB NOT NULL DEFAULT '[]'::jsonb`;

    const insertedTeams = await Promise.all(
        teams.map(
          (t) =>
            sql`INSERT INTO teams ( name, user_id, pokemon) VALUES (${t.name}, ${t.user_id},  ${JSON.stringify(t.pokemon)}) ON CONFLICT (id) DO NOTHING RETURNING *`
        )
    )

    return insertedTeams
}

export async function GET() {
    try {
      const result = await sql.begin(async (trx) => {
        const pokemonResult = await seedPokemon(trx);
        const usersResult = await seedUsers(trx);
        const teamsResult = await seedTeams(trx);
  
        return {
          pokemon: pokemonResult,
          users: usersResult,
          teams: teamsResult,
        };
      });
  
      console.log('Seeding completed successfully:', result);
  
      return Response.json({
        message: 'Seeding completed successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error during seeding:', error);
      return Response.json({ error: 'Error while seeding database' }, { status: 500 });
    } finally {
      await sql.end();
    }
  }
  