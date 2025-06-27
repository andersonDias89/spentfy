import NodeCache from "node-cache";

// Cache com TTL de 5 minutos (300 segundos)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export class CacheService {
  static get<T>(key: string): T | undefined {
    return cache.get<T>(key);
  }

  static set<T>(key: string, value: T, ttl?: number): boolean {
    return cache.set(key, value, ttl || 300);
  }

  static del(key: string | string[]): number {
    return cache.del(key);
  }

  static clear(): void {
    cache.flushAll();
  }

  static keys(): string[] {
    return cache.keys();
  }

  // Método específico para invalidar cache de transações de um usuário
  static invalidateUserTransactions(userId: string): void {
    const keys = cache.keys();
    const userTransactionKeys = keys.filter((key) =>
      key.startsWith(`transactions:${userId}`)
    );
    if (userTransactionKeys.length > 0) {
      cache.del(userTransactionKeys);
    }
  }

  // Método para gerar chaves de cache consistentes
  static generateTransactionKey(userId: string, filters?: any): string {
    if (!filters) return `transactions:${userId}`;
    const filterStr = JSON.stringify(filters);
    return `transactions:${userId}:${btoa(filterStr)}`;
  }
}
