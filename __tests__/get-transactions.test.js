// Mock do sistema de cache para testes
class MockCacheService {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    this.cache.set(key, value);
    return true;
  }

  del(key) {
    if (Array.isArray(key)) {
      let deleted = 0;
      key.forEach((k) => {
        if (this.cache.delete(k)) deleted++;
      });
      return deleted;
    }
    return this.cache.delete(key) ? 1 : 0;
  }

  clear() {
    this.cache.clear();
  }

  keys() {
    return Array.from(this.cache.keys());
  }

  invalidateUserTransactions(userId) {
    const keys = this.keys();
    const userTransactionKeys = keys.filter((key) =>
      key.startsWith(`transactions:${userId}`)
    );
    if (userTransactionKeys.length > 0) {
      this.del(userTransactionKeys);
    }
  }

  generateTransactionKey(userId, filters) {
    if (!filters) return `transactions:${userId}`;
    const filterStr = JSON.stringify(filters);
    return `transactions:${userId}:${Buffer.from(filterStr).toString(
      "base64"
    )}`;
  }
}

// Simula a função getTransactionsByUser com cache
function simulateGetTransactionsByUser(userId, db, cache, useCache = true) {
  if (!userId) return [];

  const cacheKey = cache.generateTransactionKey(userId);

  // Tentar buscar do cache primeiro
  if (useCache) {
    const cachedTransactions = cache.get(cacheKey);
    if (cachedTransactions) {
      return cachedTransactions;
    }
  }

  // Simular busca no banco
  const transactions = db
    .filter((t) => t.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Salvar no cache
  if (useCache) {
    cache.set(cacheKey, transactions);
  }

  return transactions;
}

describe("getTransactionsByUser com cache (simulação)", () => {
  let cache;
  const db = [
    { id: 1, userId: "user-1", date: "2024-01-01" },
    { id: 2, userId: "user-1", date: "2023-12-01" },
    { id: 3, userId: "user-2", date: "2024-02-01" },
  ];

  beforeEach(() => {
    cache = new MockCacheService();
  });

  it("deve retornar as transações do usuário ordenadas por data desc", () => {
    const result = simulateGetTransactionsByUser("user-1", db, cache);
    expect(result).toEqual([
      { id: 1, userId: "user-1", date: "2024-01-01" },
      { id: 2, userId: "user-1", date: "2023-12-01" },
    ]);
  });

  it("deve usar cache na segunda chamada", () => {
    // Primeira chamada - salva no cache
    const result1 = simulateGetTransactionsByUser("user-1", db, cache);

    // Segunda chamada - deve vir do cache
    const result2 = simulateGetTransactionsByUser("user-1", [], cache); // db vazio para testar cache

    expect(result1).toEqual(result2);
    expect(result2).toEqual([
      { id: 1, userId: "user-1", date: "2024-01-01" },
      { id: 2, userId: "user-1", date: "2023-12-01" },
    ]);
  });

  it("deve pular cache quando useCache é false", () => {
    // Primeira chamada com cache
    simulateGetTransactionsByUser("user-1", db, cache);

    // Segunda chamada sem cache (db vazio)
    const result = simulateGetTransactionsByUser("user-1", [], cache, false);
    expect(result).toEqual([]);
  });

  it("deve retornar lista vazia se não houver transações para o usuário", () => {
    const result = simulateGetTransactionsByUser("user-3", db, cache);
    expect(result).toEqual([]);
  });

  it("deve retornar lista vazia se userId for undefined", () => {
    const result = simulateGetTransactionsByUser(undefined, db, cache);
    expect(result).toEqual([]);
  });

  it("deve invalidar cache do usuário corretamente", () => {
    // Adicionar dados ao cache
    simulateGetTransactionsByUser("user-1", db, cache);
    simulateGetTransactionsByUser("user-2", db, cache);

    // Verificar que há dados no cache
    expect(cache.get(cache.generateTransactionKey("user-1"))).toBeDefined();
    expect(cache.get(cache.generateTransactionKey("user-2"))).toBeDefined();

    // Invalidar cache do user-1
    cache.invalidateUserTransactions("user-1");

    // Verificar que apenas user-1 foi removido
    expect(cache.get(cache.generateTransactionKey("user-1"))).toBeUndefined();
    expect(cache.get(cache.generateTransactionKey("user-2"))).toBeDefined();
  });
});
