import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Yetkisiz erişim' });
  }

  const { id } = req.query;
  const db = getDatabase();
  const index = db.quotes.findIndex((q) => q.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Teklif başvurusu bulunamadı' });
  }

  if (req.method === 'PATCH') {
    const { status, notes } = req.body;
    if (status) db.quotes[index].status = status;
    if (notes !== undefined) db.quotes[index].notes = notes;

    saveDatabase(db);
    return res.status(200).json(db.quotes[index]);
  }

  if (req.method === 'DELETE') {
    const deleted = db.quotes.splice(index, 1);
    saveDatabase(db);
    return res.status(200).json({ success: true, deleted: deleted[0] });
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
