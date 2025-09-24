import {NextResponse, NextRequest} from 'next/server';
import sql from '@/app/lib/db';

export async function DELETE(req: NextRequest) {

    const body = await req.json();
    const { id } = body;
    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    try {
      const [result] = await sql`
  DELETE FROM pokemon
  WHERE id = ${id}
  RETURNING id
`;
if (!result) {
  return NextResponse.json({ error: "Pokemon not found" }, { status: 404 });
}
        return NextResponse.json({ message: 'Pokemon deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting pokemon:', error);
        return NextResponse.json({ error: 'Error deleting pokemon' }, { status: 500 });
    }
}