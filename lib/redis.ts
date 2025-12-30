import { Redis } from '@upstash/redis';

// 'export' keyword thappakunda undali
export const redis = Redis.fromEnv();

export function getCurrentTime(headers: Headers): number {
  const testNow = headers.get('x-test-now-ms');
  if (process.env.TEST_MODE === '1' && testNow) {
    return parseInt(testNow, 10);
  }
  return Date.now();
}