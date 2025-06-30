# Sidebar Component

Um componente de sidebar modular e responsivo para o sistema Spentfy.

## Estrutura

```
Sidebar/
├── index.ts                 # Exportações principais
├── Sidebar.tsx             # Componente principal
├── SidebarToggle.tsx       # Botão de toggle do sidebar
├── SidebarQuickAction.tsx  # Ação rápida (criar transação)
├── SidebarNavigation.tsx   # Navegação com destaque de página ativa
├── useSidebar.ts           # Hook personalizado para estado
├── types.ts                # Tipos TypeScript
├── constants.ts            # Constantes e configurações
└── README.md              # Este arquivo
```

## Funcionalidades

- **Estado Inteligente**: Gerencia automaticamente o estado de abertura/fechamento
- **Navegação Ativa**: Destaca a página atual automaticamente
- **Ação Rápida**: Botão para criar nova transação
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Acessível**: Inclui suporte a navegação por teclado e ARIA labels
- **Ícones Lucide**: Usa ícones modernos e consistentes

## Uso

```tsx
import Sidebar from "@/app/(session)/_components/Sidebar";
import { SIDEBAR_LINKS } from "@/app/(session)/_components/Sidebar/constants";

<Sidebar links={SIDEBAR_LINKS} />;
```

## Personalização

Para adicionar novos links, edite o arquivo `constants.ts`:

```tsx
export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  // Adicione mais links aqui...
];
```

## Cores do Sistema

O componente utiliza a paleta de cores do sistema:

- **Background**: `zinc-800` (sidebar), `zinc-900` (conteúdo expandido)
- **Accent**: `green-600` (ações primárias)
- **Text**: `zinc-300` (inativo), `white` (ativo)
- **Hover**: `zinc-700` (botões), `green-700` (ações)
