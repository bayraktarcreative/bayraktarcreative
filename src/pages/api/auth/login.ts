import type { NextApiRequest, NextApiResponse } from 'next';
import { ADMIN_USERNAME, ADMIN_PASSWORD, AUTH_COOKIE_NAME, createSessionToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnızca POST metoduna izin verilir' });
  }

  const { username, password } = req.body || {};

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
    return res.status(503).json({ error: 'Yönetici girişi henüz yapılandırılmadı' });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = createSessionToken();
    if (!token) return res.status(503).json({ error: 'Yönetici oturumu yapılandırılmadı' });
    // Set cookie
    res.setHeader(
      'Set-Cookie',
      `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=864000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    );
    return res.status(200).json({ success: true, message: 'Giriş başarılı' });
  }

  return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
}
