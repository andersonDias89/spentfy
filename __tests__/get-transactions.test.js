// Teste simples simulando a lógica de getTransactionsByUser
function simulateGetTransactionsByUser(userId, db) {
  if (!userId) return [];
  return db
    .filter((t) => t.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

describe("getTransactionsByUser (simulação)", () => {
  const db = [
    { id: 1, userId: "user-1", date: "2024-01-01" },
    { id: 2, userId: "user-1", date: "2023-12-01" },
    { id: 3, userId: "user-2", date: "2024-02-01" },
  ];

  it("deve retornar as transações do usuário ordenadas por data desc", () => {
    const result = simulateGetTransactionsByUser("user-1", db);
    expect(result).toEqual([
      { id: 1, userId: "user-1", date: "2024-01-01" },
      { id: 2, userId: "user-1", date: "2023-12-01" },
    ]);
  });

  it("deve retornar lista vazia se não houver transações para o usuário", () => {
    const result = simulateGetTransactionsByUser("user-3", db);
    expect(result).toEqual([]);
  });

  it("deve retornar lista vazia se userId for undefined", () => {
    const result = simulateGetTransactionsByUser(undefined, db);
    expect(result).toEqual([]);
  });
});
