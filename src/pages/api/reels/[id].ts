import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Reel } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const db = getDatabase();
  const index = db.reels.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reel bulunamadı' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(db.reels[index]);
  }

  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const body = req.body as Partial<Reel>;
    const existing = db.reels[index];

    const updated: Reel = {
      ...existing,
      ...body,
      id: existing.id,
    };

    db.reels[index] = updated;
    saveDatabase(db);
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const deleted = db.reels.splice(index, 1);
    saveDatabase(db);
    return res.status(200).json({ success: true, deleted: deleted[0] });
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
