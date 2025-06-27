# Sistema de Cache - Spentfy

Este projeto implementa um sistema de cache robusto para otimizar o desempenho das consultas de transações, evitando chamadas desnecessárias à API e banco de dados.

## Tecnologias Utilizadas

- **node-cache**: Cache em memória no servidor
- **SWR**: Cache no lado do cliente com revalidação inteligente
- **Jest**: Testes unitários incluindo testes de cache

## Arquitetura do Cache

### 1. Cache do Servidor (`CacheService`)

Localizado em: `src/lib/cache.ts`

#### Características:

- TTL padrão: 5 minutos (300 segundos)
- Verificação automática a cada 1 minuto
- Chaves organizadas por usuário
- Invalidação seletiva por usuário

#### Métodos principais:

```typescript
CacheService.get<T>(key: string): T | undefined
CacheService.set<T>(key: string, value: T, ttl?: number): boolean
CacheService.del(key: string | string[]): number
CacheService.clear(): void
CacheService.invalidateUserTransactions(userId: string): void
CacheService.generateTransactionKey(userId: string, filters?: any): string
```

### 2. Cache do Cliente (SWR)

Localizado em: `src/hooks/useTransactions.ts` e `src/providers/SWRProvider.tsx`

#### Características:

- Deduplicação de requisições (1 minuto)
- Retry automático em caso de erro (3 tentativas)
- Revalidação inteligente
- Estado de loading e erro

#### Hook principal:

```typescript
const { transactions, isLoading, error, refresh } = useTransactions(
  userId,
  options
);
```

## Como Usar

### 1. Nos Components React

```tsx
import {
  useTransactions,
  useTransactionMutations,
} from "@/hooks/useTransactions";

function MeuComponente({ userId }) {
  const { transactions, isLoading, error, refresh } = useTransactions(userId);
  const { invalidateCache } = useTransactionMutations();

  const handleCreateTransaction = async (data) => {
    await createTransaction(data);
    // Cache é automaticamente invalidado na função createTransaction
    // Mas você também pode invalidar manualmente:
    invalidateCache();
  };

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.id}>{tx.title}</div>
      ))}
    </div>
  );
}
```

### 2. Nas Server Actions

```typescript
import { CacheService } from "@/lib/cache";

export async function getTransactionsByUser(userId: string, useCache = true) {
  const cacheKey = CacheService.generateTransactionKey(userId);

  // Buscar do cache primeiro
  if (useCache) {
    const cached = CacheService.get(cacheKey);
    if (cached) return cached;
  }

  // Buscar do banco
  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  // Salvar no cache
  if (useCache) {
    CacheService.set(cacheKey, transactions);
  }

  return transactions;
}

export async function createTransaction(data) {
  // ... lógica de criação ...

  // Invalidar cache do usuário
  CacheService.invalidateUserTransactions(userId);

  return result;
}
```

## Configuração do Projeto

### 1. Provider SWR

O `SWRProvider` está configurado no `layout.tsx` principal:

```tsx
import { SWRProvider } from "@/providers/SWRProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
```

### 2. Configurações do SWR

- **refreshInterval**: 0 (não revalida automaticamente)
- **revalidateOnFocus**: false (não revalida no foco)
- **revalidateOnReconnect**: true (revalida ao reconectar)
- **dedupingInterval**: 60 segundos
- **errorRetryCount**: 3 tentativas
- **errorRetryInterval**: 5 segundos

## Testes

O sistema inclui testes abrangentes:

### 1. Testes de Cache (`__tests__/cache.test.js`)

- Operações básicas (get, set, del, clear)
- Geração de chaves
- Invalidação seletiva

### 2. Testes de Transações (`__tests__/get-transactions.test.js`)

- Funcionamento com e sem cache
- Invalidação após operações

### 3. Testes de Criação (`__tests__/create-transaction.test.js`)

- Invalidação automática do cache
- Comportamento em casos de erro

Para executar os testes:

```bash
npm test
# ou
npx jest
```

## Estratégias de Cache

### 1. Cache Hits

- Primeira consulta: busca no banco + salva no cache
- Consultas subsequentes: retorna do cache (muito mais rápido)

### 2. Invalidação

- **Automática**: Após criar/atualizar/deletar transações
- **Manual**: Via `invalidateCache()` ou `refresh()`
- **Temporal**: TTL de 5 minutos no servidor

### 3. Fallback

- Se cache falhar, busca direto no banco
- Dados iniciais podem ser passados como fallback
- Estado de loading/erro bem definido

## Benefícios

1. **Performance**: Redução drástica no tempo de resposta
2. **UX**: Estados de loading e erro bem definidos
3. **Economia**: Menos queries no banco de dados
4. **Flexibilidade**: Cache pode ser desabilitado quando necessário
5. **Consistência**: Invalidação automática mantém dados atualizados

## Monitoramento

Para monitorar o uso do cache, você pode verificar:

```typescript
// Ver todas as chaves em cache
console.log(CacheService.keys());

// Verificar se uma chave específica existe
const hasCache = CacheService.get("transactions:user-123") !== undefined;
```

Este sistema de cache oferece uma base sólida para otimização de performance, mantendo a simplicidade de uso e garantindo a consistência dos dados.
