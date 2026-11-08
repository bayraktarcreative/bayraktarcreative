import type { NextApiRequest, NextApiResponse } from 'next';
import { isAuthenticated } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authed = isAuthenticated(req);
  return res.status(200).json({ authenticated: authed });
}
