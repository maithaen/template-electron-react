# Template Electron React

A modern Electron application template with React, TypeScript, and essential tools pre-configured for rapid desktop application development.

## ✨ Features

- ⚡ **Electron + Vite** - Fast development with HMR (Hot Module Replacement)
- ⚛️ **React 19** - Latest React with concurrent features
- 🔷 **TypeScript** - Full type safety
- 🐻 **Zustand** - Lightweight state management (with counter example)
- 🌍 **i18next** - Internationalization support (Lao & English)
- 🎨 **Tailwind CSS v4** - Modern utility-first styling
- 🛣️ **React Router v7** - Client-side routing
- 📦 **electron-builder** - Cross-platform packaging
- ⚡ **IPC Example** - Pre-configured inter-process communication

## 🚀 Quick Start

### Clone the template

```bash
git clone https://github.com/maithaen/template-electron-react.git
cd template-electron-react
```

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
# For Windows
pnpm build:win

# For macOS
pnpm build:mac

# For Linux
pnpm build:linux
```

## 📁 Project Structure

```
src/
├── main/               # Electron main process
│   └── index.ts        # Main window creation, IPC handlers
├── preload/            # Preload scripts
│   └── index.ts        # Context bridge API
└── renderer/           # React application
    └── src/
        ├── assets/     # Static assets & styles
        ├── components/ # Reusable UI components
        │   ├── layout/ # Layout components (Sidebar, Layout)
        │   └── ui/     # UI components
        ├── context/    # React context providers
        ├── locales/    # i18n translation files
        ├── pages/      # Page components
        ├── route/      # React Router configuration
        └── store/      # Zustand stores
```

## 🔧 Examples Included

### Zustand State Management
A counter example demonstrating Zustand store usage with:
- Increment/Decrement actions
- Reset functionality
- Custom amount addition

**Store location:** `src/renderer/src/store/counterStore.ts`

### Electron IPC Communication
Ping/Pong example showing inter-process communication:
- Main process: `ipcMain.on('ping', () => console.log('pong'))`
- Renderer: `window.electron.ipcRenderer.send('ping')`

**IPC location:** `src/main/index.ts` (Line 52-53)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Electron | 39.x | Desktop app framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Vite | 7.x | Build tool |
| Zustand | 5.x | State management |
| Tailwind CSS | 4.x | Styling |
| i18next | 25.x | Internationalization |
| React Router | 7.x | Routing |

## 🌐 Internationalization

Pre-configured with English and Lao language support:
- Translation files: `src/renderer/src/locales/`
- Language context: `src/renderer/src/context/`

## 💻 Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 📄 License

MIT License

## 👤 Author

**maithaen**

- GitHub: [@maithaen](https://github.com/maithaen)
