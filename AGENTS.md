# AGENTS.md

> This file provides guidance for AI coding agents working with this codebase.

---

## Project Overview

| Property       | Value                         |
| -------------- | ----------------------------- |
| **Name**       | template-electron-react       |
| **Type**       | Desktop Application           |
| **Framework**  | Electron + React + TypeScript |
| **UI Library** | shadcn/ui + Tailwind CSS 4    |
| **Build Tool** | Vite                          |
| **Language**   | TypeScript                    |

---

## Commands

| Command                             | Description              |
| ----------------------------------- | ------------------------ |
| `pnpm run dev`                      | Start development server |
| `pnpm run build`                    | Build production bundle  |
| `pnpm run lint`                     | Run ESLint               |
| `pnpm run test`                     | Run all tests            |
| `pnpm run test -- <test-file-path>` | Run a single test file   |

---

## Project Structure

```
src/
├── main/           # Electron main process
├── preload/        # Electron preload scripts
└── renderer/       # React frontend
    ├── src/
    │   ├── assets/     # Static assets (images, fonts)
    │   ├── components/ # Reusable React components
    │   ├── pages/      # Page components
    │   ├── store/      # Zustand state management
    │   ├── i18n/       # Internationalization (i18next)
    │   └── App.tsx     # Main application component
    └── index.html
```

---

## Code Style Guidelines

### Imports

- Group imports by type: **external** → **internal** → **styles**
- Sort alphabetically within each group

### Formatting

- Use **Prettier** with config in `.prettierrc.yaml`
- Use **ESLint** for linting

### UI Components (shadcn/ui)

- Use existing components from `src/renderer/src/components/ui/`
- When creating new UI elements, prefer using shadcn/ui primitives
- Use `cn()` utility for class merging

### Naming Conventions

| Type                  | Convention  | Example           |
| --------------------- | ----------- | ----------------- |
| Variables & Functions | camelCase   | `getUserData`     |
| Components & Types    | PascalCase  | `UserProfile`     |
| Constants             | UPPER_SNAKE | `MAX_RETRY_COUNT` |
| Files (components)    | PascalCase  | `Dashboard.tsx`   |
| Files (utilities)     | camelCase   | `formatDate.ts`   |

### TypeScript

- Always use TypeScript for type safety
- Prefer explicit types over `any`
- Use interfaces for object shapes, types for unions/primitives

### Error Handling

- Use `try-catch` blocks for async operations
- Handle errors gracefully with user-friendly messages
- Log errors for debugging purposes

---

## State Management

- **Library**: Zustand
- **Store Location**: `src/renderer/src/store/`
- Create separate stores for different domains (e.g., `counterStore.ts`)

---

## Internationalization (i18n)

- **Library**: i18next + react-i18next
- **Translations**: `src/renderer/src/i18n/locales/`
- **Supported Languages**: English (`en`), Lao (`lo`)

---

## Additional Configuration Files

| File                              | Purpose                     |
| --------------------------------- | --------------------------- |
| `.cursor/rules/`                  | Cursor IDE rules            |
| `.github/copilot-instructions.md` | GitHub Copilot instructions |
| `.prettierrc.yaml`                | Prettier configuration      |
| `electron.vite.config.ts`         | Vite config for Electron    |
| `tsconfig.json`                   | TypeScript configuration    |

---

## Best Practices

1. **Component Structure**: Keep components small and focused
2. **Reusability**: Extract common logic into custom hooks
3. **Performance**: Use React.memo for expensive components
4. **Testing**: Write tests for critical business logic
5. **Accessibility**: Follow WCAG guidelines for UI components
