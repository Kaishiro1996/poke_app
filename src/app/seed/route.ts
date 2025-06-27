import postgres from 'postgres';
import { pokemon, users, teams } from '../lib/placeholder_data';

const sql = postgres(process.env.DATABASE_URL_UNPOOLED!, { ssl: 'require' });


async function seedPokemon(sql: postgres.Sql) {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`CREATE TABLE IF NOT EXISTS pokemon (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        pokedex_number INTEGER NOT NULL,
        nickname TEXT NOT NULL,
        move1 TEXT NOT NULL,
        move2 TEXT NOT NULL,
        move3 TEXT NOT NULL,
        move4 TEXT NOT NULL,
        shiny BOOLEAN NOT NULL DEFAULT false,
        ability TEXT NOT NULL,
        id_trainer UUID REFERENCES users(id) ON DELETE CASCADE /* the user who caught the pokemon */
        
    )`;

    // Create a foreign key reference to the teams table
    await sql`ALTER TABLE pokemon ADD COLUMN IF NOT EXISTS id_team UUID REFERENCES teams(id) ON DELETE SET NULL /* the team this pokemon belongs to */`;
    await sql`ALTER TABLE pokemon ADD COLUMN IF NOT EXISTS name TEXT NOT NULL /* the name of the pokemon */`;
    // Insert placeholder data into the pokemon table
    for (const poke of pokemon) {
        await sql`INSERT INTO pokemon (id, pokedex_number, name, nickname, move1, move2, move3, move4, shiny, ability, id_trainer, id_team)
            VALUES (${poke.id}, ${poke.pokedex_number}, ${poke.name}, ${poke.nickname}, ${poke.move1}, ${poke.move2}, ${poke.move3}, ${poke.move4}, ${poke.shiny}, ${poke.ability}, ${poke.id_trainer}, ${poke.id_team})
        ON CONFLICT (id) DO NOTHING`; // Prevent duplicate entries
    }

   return "seeded pokemon";
}

async function seedUsers(sql: postgres.Sql) {
    await sql`CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )`;
    // Insert placeholder data into the users table
    for (const user of users) {
        await sql`INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password})
            ON CONFLICT (id) DO NOTHING`; // Prevent duplicate entries
    }
 return "seeded users";
}

async function seedTeams(sql: postgres.Sql) {
    await sql`CREATE TABLE IF NOT EXISTS teams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        pokemon1 UUID REFERENCES pokemon(id) ON DELETE SET NULL,
        pokemon2 UUID REFERENCES pokemon(id) ON DELETE SET NULL,
        pokemon3 UUID REFERENCES pokemon(id) ON DELETE SET NULL,
        pokemon4 UUID REFERENCES pokemon(id) ON DELETE SET NULL,
        pokemon5 UUID REFERENCES pokemon(id) ON DELETE SET NULL,
        pokemon6 UUID REFERENCES pokemon(id) ON DELETE SET NULL

    )`;
    // Insert placeholder data into the teams table
    for (const team of teams) {
      // Rellenar los campos faltantes con null si no existen
      const {
        id,
        name,
        user_id,
        pokemon1 = null,
        pokemon2 = null,
        pokemon3 = null,
        pokemon4 = null,
        pokemon5 = null,
        pokemon6 = null
      } = team;
  
      await sql`INSERT INTO teams (
        id, name, user_id,
        pokemon1, pokemon2, pokemon3,
        pokemon4, pokemon5, pokemon6
      ) VALUES (
        ${id}, ${name}, ${user_id},
        ${pokemon1}, ${pokemon2}, ${pokemon3 || null},
        ${pokemon4 || null}, ${pokemon5 || null}, ${pokemon6 || null}
      ) ON CONFLICT (id) DO NOTHING`;
    }
  
    return 'seeded teams';
  }

  export async function GET() {
    try {
      const result = await sql.begin(async (trx) => {
        const usersResult = await seedUsers(trx);       // primero
        const pokemonResult = await seedPokemon(trx);   // último

        const teamsResult = await seedTeams(trx);       // luego
  
        return {
          users: usersResult,
          teams: teamsResult,
          pokemon: pokemonResult,
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