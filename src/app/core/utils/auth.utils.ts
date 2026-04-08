/** Pre-computed SHA-256 hash of the admin password. */
export const ADMIN_PASSWORD_HASH =
  '77866be049cd4daddefe86c2984a6157c0cadbe98cc7c5445074893020a7e14c';

/** Hashes a plaintext string with SHA-256 and returns the hex digest. */
export async function hashPassword(plain: string): Promise<string> {
  const data = new TextEncoder().encode(plain);
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
