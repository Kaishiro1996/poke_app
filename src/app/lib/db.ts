import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL_UNPOOLED!, { ssl: 'require' });

export default sql;