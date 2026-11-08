import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Project } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDatabase();

  if (req.method === 'GET') {
    const { status, featured } = req.query;
    let list = [...db.projects];
    if (status) {
      list = list.filter((p) => p.status === status);
    }
    if (featured === 'true') {
      list = list.filter((p) => p.isFeatured);
    }
    list.sort((a, b) => (a.order || 0) - (b.order || 0));
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }

    const body = req.body as Partial<Project>;
    if (!body.title) {
      return res.status(400).json({ error: 'Proje başlığı zorunludur' });
    }

    const slug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || '',
      category: body.category || 'Sinematik Tanıtım',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1600&auto=format&fit=crop',
      videoUrl: body.videoUrl || '',
      year: body.year || new Date().getFullYear().toString(),
      client: body.client || '',
      description: body.description || '',
      fullDescription: body.fullDescription || '',
      deliverables: body.deliverables || [],
      gallery: body.gallery || [],
      isFeatured: body.isFeatured ?? true,
      order: body.order ?? db.projects.length + 1,
      status: body.status || 'published',
      isDemo: body.isDemo ?? false,
    };

    db.projects.push(newProject);
    saveDatabase(db);
    return res.status(201).json(newProject);
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
