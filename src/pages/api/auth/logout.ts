import type { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_COOKIE_NAME } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return res.status(200).json({ success: true, message: 'Çıkış yapıldı' });
}
