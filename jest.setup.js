// Configuração global para Jest
// Configure jest globals for testing environment
global.console = {
  ...console,
  // Suprime warnings desnecessários nos testes
  warn: jest.fn(),
};
