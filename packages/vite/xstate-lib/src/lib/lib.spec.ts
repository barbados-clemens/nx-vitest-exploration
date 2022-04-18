import { vi } from 'vitest';
import {
  rejectionFetchMachine,
  resolvingFetchMachine,
  viteVLibEight,
} from './vite-v-lib-eight';

describe('lib-eight', () => {
  beforeEach(() => {});

  it('should work', () => {
    expect(viteVLibEight()).toBe('vite-v-lib-eight');
  });

  it('should resolve with cb', () => {
    const mockCb = vi.fn();
    resolvingFetchMachine(mockCb);

    expect(mockCb).toHaveBeenCalledTimes(3);
  });

  it('should resolve with cb', () => {
    const mockCb = vi.fn();
    rejectionFetchMachine(mockCb);

    expect(mockCb).toHaveBeenCalledTimes(6);
  });
});
