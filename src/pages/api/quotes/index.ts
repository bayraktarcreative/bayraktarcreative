import type { NextApiRequest, NextApiResponse } from 'next';
import { getDatabase, saveDatabase } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Quote } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = getDatabase();

  if (req.method === 'GET') {
    if (!isAuthenticated(req)) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }
    const list = [...db.quotes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    const body = req.body as Partial<Quote> & { honeypot?: string };

    // Spam honeypot trap
    if (body.honeypot) {
      return res.status(200).json({ success: true, message: 'Talep alındı' });
    }

    if (!body.fullName || !body.phone || !body.serviceType) {
      return res.status(400).json({
        error: 'Lütfen zorunlu alanları (Ad Soyad, Telefon, Hizmet Türü) doldurunuz.',
      });
    }

    const newQuote: Quote = {
      id: `quote-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      serviceType: body.serviceType,
      sector: body.sector || 'Genel / Belirtilmemiş',
      description: body.description || '',
      location: body.location || '',
      targetDate: body.targetDate || '',
      fullName: body.fullName.trim(),
      phone: body.phone.trim(),
      email: (body.email || '').trim(),
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    };

    db.quotes.unshift(newQuote);
    saveDatabase(db);

    return res.status(201).json({
      success: true,
      message: 'Teklif talebiniz başarıyla stüdyomuza ulaştı. En kısa sürede sizinle iletişime geçeceğiz.',
      id: newQuote.id,
    });
  }

  return res.status(405).json({ error: 'Metod izin verilmiyor' });
}
