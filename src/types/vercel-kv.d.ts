declare module '@vercel/kv' {
  export const kv: {
    incr: (key: string) => Promise<number>;
    get: <T = unknown>(key: string) => Promise<T | null>;
    mget: <T = unknown>(...keys: string[]) => Promise<(T | null)[]>;
  };
}


