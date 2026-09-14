import { describe, expect, it } from 'vitest';
import { verifiedAtSchema } from './source-date';

describe('verifiedAtSchema', () => {
  it('rejects impossible calendar dates', () => {
    expect(verifiedAtSchema.safeParse('2026-09-14').success).toBe(true);
    expect(verifiedAtSchema.safeParse('2026-99-99').success).toBe(false);
  });
});
