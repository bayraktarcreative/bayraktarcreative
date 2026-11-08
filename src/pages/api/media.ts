import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { HomepageMedia } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDatabase();

  if (req.method === 'GET') {
    return res.status(200).json(db.media);
  }

  if (req.method === 'PUT') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const body = req.body as Partial<HomepageMedia>;
    db.media = {
      ...db.media,
      ...body,
      hero: {
        ...db.media.hero,
        ...(body.hero || {}),
      },
      intro: {
        ...db.media.intro,
        ...(body.intro || {}),
      },
    };

    saveDatabase(db);
    return res.status(200).json(db.media);
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
