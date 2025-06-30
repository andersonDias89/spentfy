# Correção do Erro de Client Components

## Problema

O erro ocorreu porque estávamos tentando passar componentes de ícones (funções React) diretamente do Server Component para o Client Component através das props.

```
Only plain objects can be passed to Client Components from Server Components.
Classes or other objects with methods are not supported.
```

## Solução Implementada

### 1. **Separação de Responsabilidades**

- **Server Components**: Apenas dados serializáveis (strings, números, arrays, objetos simples)
- **Client Components**: Lógica de UI e componentes React

### 2. **Sistema de Mapeamento de Ícones**

Criamos um sistema que usa strings para identificar ícones:

```typescript
// types.ts
export type IconName = "dashboard" | "transactions" | "plus" | "menu" | "x";

export interface SidebarLink {
  id: string;
  label: string;
  href: string;
  iconName: IconName; // ← String ao invés de componente React
}
```

### 3. **Utilitário de Ícones**

```typescript
// utils.ts
const ICON_MAP: Record<IconName, LucideIcon> = {
  dashboard: LayoutDashboard,
  transactions: TrendingUp,
  plus: Plus,
  menu: Menu,
  x: X,
};

export function getIcon(iconName: IconName): LucideIcon {
  return ICON_MAP[iconName];
}
```

### 4. **Uso nos Componentes**

```typescript
// SidebarNavigation.tsx
const Icon = getIcon(link.iconName); // ← Resolve o ícone no Client Component
```

## Benefícios da Solução

1. **Compatibilidade RSC**: Totalmente compatível com React Server Components
2. **Serialização**: Todos os dados passados são serializáveis
3. **Performance**: Server Components podem ser renderizados no servidor
4. **Tipo Safety**: TypeScript garante que apenas ícones válidos sejam usados
5. **Manutenibilidade**: Fácil adicionar novos ícones

## Como Adicionar Novos Ícones

1. Adicione o nome no tipo `IconName` em `types.ts`
2. Adicione o mapeamento no `ICON_MAP` em `utils.ts`
3. Use o nome string nas constantes `SIDEBAR_LINKS`

```typescript
// Exemplo
export type IconName = "dashboard" | "transactions" | "settings"; // ← novo

const ICON_MAP = {
  // ...existing
  settings: Settings, // ← novo
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  // ...existing
  {
    id: "settings",
    label: "Configurações",
    href: "/settings",
    iconName: "settings", // ← uso
  },
];
```

Esta solução mantém a tipagem forte, performance e compatibilidade com as mais recentes versões do React e Next.js.
