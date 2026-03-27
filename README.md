# CIA 14 Web Frontend

Frontend application for **Civil in Action (CIA) 14** built with Next.js 16, React 19, TypeScript, and TailwindCSS 4.

## Tech Stack

### Core

- **Next.js 16.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first CSS framework

### UI & Animations

- **AOS** - Animate on scroll library
- **Canvas Confetti** - Particle effects & celebrations
- **React Icons** - Icon library

### State & Integration

- **Firebase 12** - Auth & Backend services
- **Googleapis** - Drive & Sheets integration API
- **Resend & React Email** - Email templates & delivery

### Form & Validation

- **React Hook Form 7** - Form state management
- **Zod 4** - Schema validation
- **React Dropzone** - File upload handling

### Utilities

- **Sonner** - Toast notifications
- **clsx & tailwind-merge** - Conditional styling utilities

## Folder Structure

```
cia-web/
├── public/                  # Static assets (images, fonts, vector SVGs)
├── src/
│   ├── components/          # Reusable structural React components
│   │   ├── element/         # Core UI building blocks (BordirCard, Modal)
│   │   └── layouts/         # High-level layouts (Navbar, Footer, CenterScreen)
│   │
│   ├── modules/             # Feature-specific page & UI modules
│   │   ├── auth/            # Auth logic & UI (Login, Register template)
│   │   ├── events/          # Detail event pages
│   │   ├── home/            # Specific landing page sections
│   │   ├── not-found/       # Custom 404 UI implementations
│   │   └── register-lomba/  # Form schemas & specific lomba registration UI
│   │
│   └── utils/               # App-wide hooks, services, and utilities
│       ├── email/           # React email templates (e.g. verify email)
│       ├── helpers/         # Utility functions (cn, etc)
│       ├── hooks/           # Encapsulated state logic
│       └── providers/       # Global contexts (Toast, AOS)
│
├── app/                     # Next.js 14+ App Router system (API & Pages)
│   ├── api/                 # Server routes (upload-drive, write-to-sheets)
│   ├── auth/                # Auth pages route
│   ├── events/              # Event pages route
│   ├── registrasi-lomba/    # Dynamic registration slug ([slug]/success)
│   └── demo/                # Component testing & UI debugging sandbox
│
├── lib/                     # Configurations & server instantiations
│   ├── firebase.ts          # Core Firebase setup
│   └── schemas/             # Root definitions (general-form, fcec-form)
│
├── .next/                   # Next.js build output (generated)
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.* / postcss.config.mjs
```

## Setup

1. **Clone the repository**

```bash
git clone <repository_url>
cd cia-web
```

2. **Install dependencies**

Ensure you are using **npm** as your main package manager.

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root based on your Firebase/Resend configuration.

## Running the Application

### Development mode

```bash
npm run dev
```

Application will be available at `http://localhost:3000`

### Build for production

```bash
npm run build
```

### Run production build

```bash
npm start
```

### Lint code

```bash
npm run lint
```

## Git Workflow

### Pull & Push Schema

1. Checkout to the correct base branch (`development` etc.)
2. Pull the latest base code
3. Create a new branch (follow naming convention below)
4. Checkout to the new branch
5. Commit changes frequently with clear conventional messages
6. Run `npm run build` and `npx tsc --noEmit` before pushing
7. Push to remote and open Pull Request

### Branch Naming

```
<type>/<short_description>.<your_name>
```

| Type      | Usage                |
| --------- | -------------------- |
| `feature` | Creating new feature |
| `fixing`  | Fixing a bug/issue   |

**Examples:**

- `feature/home-bunga-animation.ancung`
- `fixing/success-page-layout.ancung`

### Commit Message

```
<type>(<scope>): <short_summary>
```

| Type       | Usage                  |
| ---------- | ---------------------- |
| `feat`     | Adding new feature     |
| `fix`      | Fixing a bug           |
| `refactor` | Refactoring code       |
| `style`    | Updating styles/UI     |
| `docs`     | Updating documentation |
| `chore`    | Maintenance tasks      |

**Scope** is optional (e.g., `auth`, `lomba`, `layout`)

**Examples:**

- `feat(lomba): add dynamic whatsapp URL to success page`
- `fix(layout): perfectly center 404 and success contents`
- `style(home): redesign outline for verification email`
- `chore: delete unused svg/webp in public`

---

**Web Development Team Civil in Action 14**
