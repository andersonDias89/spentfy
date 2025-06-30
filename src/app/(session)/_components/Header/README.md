# Header Component

Um componente de header global e responsivo para o sistema Spentfy com autenticação.

## Estrutura

```
Header/
├── index.ts                # Exportações principais
├── Header.tsx             # Componente principal
├── HeaderUserSection.tsx  # Seção do usuário (avatar + dropdown)
├── UserAvatar.tsx         # Avatar do usuário com dados
├── UserDropdown.tsx       # Menu dropdown do usuário
├── useHeader.ts           # Hook personalizado para estado
├── types.ts               # Tipos TypeScript
├── constants.ts           # Constantes e configurações
├── utils.ts               # Utilitários e helpers
└── README.md             # Este arquivo
```

## Funcionalidades

- **Autenticação NextAuth**: Integração completa com NextAuth.js
- **Avatar Inteligente**:
  - Imagem do GitHub quando disponível
  - Fallback com iniciais do usuário
  - Indicador de status online
- **Dropdown Contextual**:
  - Menu com ações do usuário
  - Preparado para perfil e configurações
  - Logout funcional
- **Responsivo**: Layout adaptativo
- **Acessível**: Navegação por teclado e ARIA labels
- **Global**: Presente em todas as páginas autenticadas

## Uso

```tsx
import Header from "@/app/(session)/_components/Header";

// No layout da sessão
<Header />;
```

## Integração com NextAuth

O Header utiliza o `useSession` do NextAuth para:

- Obter dados do usuário autenticado
- Exibir avatar do GitHub
- Gerenciar logout

## Avatar

### Imagem do GitHub

Quando o usuário se autentica via GitHub, a imagem é carregada automaticamente.

### Fallback

Caso não tenha imagem, mostra as iniciais do nome do usuário em um círculo verde.

## Menu Dropdown

### Itens Atuais:

- **Perfil** - Preparado para implementação futura
- **Configurações** - Preparado para implementação futura
- **Sair** - Funcional (logout do NextAuth)

### Adicionar Novos Itens:

Edite o arquivo `constants.ts`:

```tsx
export const HEADER_CONTENT = {
  DROPDOWN_ITEMS: [
    // ...itens existentes
    { id: "help", label: "Ajuda", action: "help" },
  ],
} as const;
```

E adicione a ação no hook `useHeader.ts`:

```tsx
case "help":
  // Implementar ação de ajuda
  break;
```

## Cores do Sistema

Mantém coerência com o design:

- **Background**: `zinc-900` com borda `zinc-800`
- **Avatar ativo**: `green-600`
- **Hover states**: `zinc-700`/`zinc-800`
- **Logout**: `red-400` (variante de perigo)

## Responsividade

- Adapta o nome do usuário em telas menores
- Dropdown responsivo com largura fixa
- Funciona bem com o Sidebar existente
