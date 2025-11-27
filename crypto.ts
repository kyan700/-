export async function encryptData(data: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
  const enc = new TextEncoder();
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(data)
  );
  return Buffer.from(cipher).toString('base64');
}

export async function decryptData(cipherText: string, key: CryptoKey, iv: Uint8Array): Promise<string> {
  const dec = new TextDecoder();
  const bytes = Buffer.from(cipherText, 'base64');
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    bytes
  );
  return dec.decode(plain);
}

export async function getAesKey(keyStr: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(keyStr).slice(0, 32),
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  );
}

export function createIv(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(12));
}
