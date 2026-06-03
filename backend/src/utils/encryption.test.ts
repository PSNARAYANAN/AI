import { describe, it, expect } from 'vitest';
import { encrypt, decrypt } from './encryption';

describe('Encryption Utility', () => {
  it('should encrypt and decrypt a string correctly', () => {
    const text = 'test-password-123';
    const encrypted = encrypt(text);
    expect(encrypted).not.toBe(text);

    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(text);
  });

  it('should produce different ciphertexts for the same input (if using salt/randomness, though CryptoJS AES might be deterministic depending on config)', () => {
    const text = 'secret';
    const enc1 = encrypt(text);
    const enc2 = encrypt(text);
    // AES in CryptoJS with a simple key usually uses a random salt by default if not specified
    // so enc1 and enc2 should be different.
    expect(enc1).not.toBe(enc2);
  });
});
