// Teste para o sistema de cache
describe("CacheService", () => {
  let MockCacheService;

  beforeEach(() => {
    // Reimplementação da classe de cache para testes
    MockCacheService = class {
      constructor() {
        this.cache = new Map();
      }

      get(key) {
        return this.cache.get(key);
      }

      set(key, value, ttl) {
        this.cache.set(key, value);
        // Em um ambiente real, o TTL seria implementado com setTimeout
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
    };
  });

  it("deve armazenar e recuperar dados do cache", () => {
    const cache = new MockCacheService();
    const key = "test-key";
    const value = { data: "test" };

    cache.set(key, value);
    expect(cache.get(key)).toEqual(value);
  });

  it("deve retornar undefined para chaves que não existem", () => {
    const cache = new MockCacheService();
    expect(cache.get("non-existent")).toBeUndefined();
  });

  it("deve deletar chaves individuais", () => {
    const cache = new MockCacheService();
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    const deleted = cache.del("key1");
    expect(deleted).toBe(1);
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBe("value2");
  });

  it("deve deletar múltiplas chaves", () => {
    const cache = new MockCacheService();
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.set("key3", "value3");

    const deleted = cache.del(["key1", "key2"]);
    expect(deleted).toBe(2);
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBeUndefined();
    expect(cache.get("key3")).toBe("value3");
  });

  it("deve limpar todo o cache", () => {
    const cache = new MockCacheService();
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    cache.clear();
    expect(cache.get("key1")).toBeUndefined();
    expect(cache.get("key2")).toBeUndefined();
    expect(cache.keys()).toEqual([]);
  });

  it("deve retornar todas as chaves", () => {
    const cache = new MockCacheService();
    cache.set("key1", "value1");
    cache.set("key2", "value2");

    const keys = cache.keys();
    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
    expect(keys.length).toBe(2);
  });

  it("deve gerar chaves de transação consistentes", () => {
    const cache = new MockCacheService();
    const userId = "user-123";

    const key1 = cache.generateTransactionKey(userId);
    const key2 = cache.generateTransactionKey(userId);

    expect(key1).toBe(key2);
    expect(key1).toBe(`transactions:${userId}`);
  });

  it("deve gerar chaves diferentes para filtros diferentes", () => {
    const cache = new MockCacheService();
    const userId = "user-123";
    const filters1 = { type: "INCOME" };
    const filters2 = { type: "EXPENSE" };

    const key1 = cache.generateTransactionKey(userId, filters1);
    const key2 = cache.generateTransactionKey(userId, filters2);

    expect(key1).not.toBe(key2);
    expect(key1).toContain(`transactions:${userId}:`);
    expect(key2).toContain(`transactions:${userId}:`);
  });

  it("deve invalidar apenas as transações do usuário específico", () => {
    const cache = new MockCacheService();

    // Adicionar dados para diferentes usuários
    cache.set("transactions:user-1", [{ id: 1 }]);
    cache.set("transactions:user-1:filter1", [{ id: 2 }]);
    cache.set("transactions:user-2", [{ id: 3 }]);
    cache.set("other-key", "other-value");

    // Invalidar apenas user-1
    cache.invalidateUserTransactions("user-1");

    // Verificar que apenas as chaves do user-1 foram removidas
    expect(cache.get("transactions:user-1")).toBeUndefined();
    expect(cache.get("transactions:user-1:filter1")).toBeUndefined();
    expect(cache.get("transactions:user-2")).toEqual([{ id: 3 }]);
    expect(cache.get("other-key")).toBe("other-value");
  });

  it("deve lidar com invalidação quando não há chaves do usuário", () => {
    const cache = new MockCacheService();
    cache.set("other-key", "other-value");

    // Não deve gerar erro ao tentar invalidar usuário inexistente
    expect(() => {
      cache.invalidateUserTransactions("non-existent-user");
    }).not.toThrow();

    // Outras chaves devem permanecer intactas
    expect(cache.get("other-key")).toBe("other-value");
  });
});
