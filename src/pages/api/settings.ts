import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { SiteSettings } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDatabase();

  if (req.method === 'GET') {
    return res.status(200).json(db.settings);
  }

  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const body = req.body as Partial<SiteSettings>;
    db.settings = {
      ...db.settings,
      ...body,
    };

    saveDatabase(db);
    return res.status(200).json(db.settings);
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
