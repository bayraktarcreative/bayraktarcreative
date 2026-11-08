import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { NextApiRequest } from 'next';

export const ADMIN_USERNAME = process.env.ADMIN_USER;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const AUTH_COOKIE_NAME = 'bayraktar_admin_session';

function sessionSecret() {
  return process.env.SESSION_SECRET;
}

export function createSessionToken(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = Date.now() + 10 * 24 * 60 * 60 * 1000;
  const nonce = randomBytes(24).toString('hex');
  const payload = `${expires}.${nonce}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${signature}`;
}

function isValidSessionToken(token: string): boolean {
  const secret = sessionSecret();
  if (!secret) return false;
  const [expires, nonce, signature, extra] = token.split('.');
  if (!expires || !nonce || !signature || extra || Number(expires) <= Date.now()) return false;
  const expected = createHmac('sha256', secret).update(`${expires}.${nonce}`).digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, 'hex');
  } catch {
    return false;
  }
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function isAuthenticated(req: NextApiRequest): boolean {
  // Check cookie or Authorization header
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [k, ...v] = c.trim().split('=');
        return [k, decodeURIComponent(v.join('='))];
      })
    );
    if (isValidSessionToken(cookies[AUTH_COOKIE_NAME] || '')) {
      return true;
    }
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (isValidSessionToken(token)) {
      return true;
    }
  }

  return false;
}
