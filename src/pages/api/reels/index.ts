import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Reel } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDatabase();

  if (req.method === 'GET') {
    const list = [...db.reels].sort((a, b) => (a.order || 0) - (b.order || 0));
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const body = req.body as Partial<Reel>;
    if (!body.title || !body.videoUrl) {
      return res.status(400).json({ error: 'Başlık ve video bağlantısı zorunludur' });
    }

    const newReel: Reel = {
      id: `reel-${Date.now()}`,
      title: body.title,
      category: body.category || 'Reel Prodüksiyon',
      videoUrl: body.videoUrl,
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
      description: body.description || '',
      duration: body.duration || '0:15',
      order: body.order ?? db.reels.length + 1,
      published: body.published ?? true,
      isDemo: body.isDemo ?? false,
    };

    db.reels.push(newReel);
    saveDatabase(db);
    return res.status(201).json(newReel);
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
