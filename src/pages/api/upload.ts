import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metod izin verilmiyor' });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: 'Yetkisiz erişim' });
  }

  try {
    const { filename, base64Data, contentType } = req.body;

    if (!filename || !base64Data) {
      return res.status(400).json({ error: 'Eksik dosya verisi' });
    }

    const cleanFilename = filename
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, '-')
      .replace(/-+/g, '-');
    const ext = path.extname(cleanFilename) || '.jpg';
    const baseName = path.basename(cleanFilename, ext);
    const finalFilename = `${baseName}-${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, finalFilename);

    // Strip data:image/...;base64, prefix if present
    const base64Clean = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Clean, 'base64');

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${finalFilename}`;
    return res.status(200).json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: buffer.length,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: error.message || 'Dosya yüklenirken hata oluştu' });
  }
}
