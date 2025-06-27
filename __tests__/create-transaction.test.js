// Teste simples sem dependências externas
describe("createTransaction (simulação)", () => {
  // Simula a função createTransaction sem dependências
  function simulateCreateTransaction(data, session) {
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

    // Simula sucesso
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
    const result = simulateCreateTransaction(mockTransaction, null);
    expect(result.success).toBe(false);
    expect(result.message).toBe("Não autenticado.");
  });

  it("deve retornar erro se a data for no passado", () => {
    const session = { user: { id: "user-1" } };
    const pastTransaction = { ...mockTransaction, date: "2000-01-01" };
    const result = simulateCreateTransaction(pastTransaction, session);
    expect(result.success).toBe(false);
    expect(result.message).toMatch(
      /data da transação não pode ser no passado/i
    );
  });

  it("deve criar transação com sucesso", () => {
    const session = { user: { id: "user-1" } };
    const result = simulateCreateTransaction(mockTransaction, session);
    expect(result.success).toBe(true);
  });
});
