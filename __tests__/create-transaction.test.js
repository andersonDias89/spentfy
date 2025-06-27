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

// Teste simples sem dependências externas
describe("createTransaction com cache (simulação)", () => {
  let cache;

  beforeEach(() => {
    cache = new MockCacheService();
  });

  // Simula a função createTransaction sem dependências
  function simulateCreateTransaction(data, session, cache) {
    if (!session?.user?.id) {
      return { success: false, message: "Não autenticado." };
    }

    const dataTransacao = new Date(data.date);
    const agora = new Date();
    agora.setHours(0, 0, 0, 0);

    if (dataTransacao < agora) {
      return {
        success: false,
        message: "A data da transação não pode ser no passado.",
      };
    }

    // Simula a criação da transação
    // Em caso de sucesso, invalida o cache
    cache.invalidateUserTransactions(session.user.id);

    return { success: true };
  }

  const mockTransaction = {
    title: "Teste",
    amount: 100,
    type: "INCOME",
    date: new Date().toISOString(),
    userId: "user-1",
  };

  it("deve retornar erro se não estiver autenticado", () => {
    const result = simulateCreateTransaction(mockTransaction, null, cache);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Não autenticado.");
  });

  it("deve retornar erro se a data for no passado", () => {
    const session = { user: { id: "user-1" } };
    const pastTransaction = { ...mockTransaction, date: "2000-01-01" };
    const result = simulateCreateTransaction(pastTransaction, session, cache);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(
      /data da transação não pode ser no passado/i
    );
  });

  it("deve criar transação com sucesso", () => {
    const session = { user: { id: "user-1" } };
    const result = simulateCreateTransaction(mockTransaction, session, cache);
    expect(result.success).toBe(true);
  });

  it("deve invalidar cache após criar transação com sucesso", () => {
    const session = { user: { id: "user-1" } };

    // Adicionar dados no cache antes
    const cacheKey = cache.generateTransactionKey(session.user.id);
    cache.set(cacheKey, [{ id: 1, title: "Teste", userId: "user-1" }]);

    // Verificar que há dados no cache
    expect(cache.get(cacheKey)).toBeDefined();

    // Criar transação (deve invalidar cache)
    const result = simulateCreateTransaction(mockTransaction, session, cache);
    expect(result.success).toBe(true);

    // Verificar que o cache foi invalidado
    expect(cache.get(cacheKey)).toBeUndefined();
  });

  it("não deve invalidar cache se a criação falhar", () => {
    const session = { user: { id: "user-1" } };

    // Adicionar dados no cache antes
    const cacheKey = cache.generateTransactionKey(session.user.id);
    const cachedData = [{ id: 1, title: "Teste", userId: "user-1" }];
    cache.set(cacheKey, cachedData);

    // Tentar criar transação com data no passado (deve falhar)
    const pastTransaction = { ...mockTransaction, date: "2000-01-01" };
    const result = simulateCreateTransaction(pastTransaction, session, cache);
    expect(result.success).toBe(false);

    // Verificar que o cache NÃO foi invalidado
    expect(cache.get(cacheKey)).toEqual(cachedData);
  });
});
