# GitHub Repositories Explorer

A simple, responsive web app built with **Next.js**, **React Query**, and **shadcn/ui**, allowing users to search for GitHub users and view their public repositories.

## 🖼️ Preview

Live Preview → [https://github-explorer.vercel.app](https://github-explorer.vercel.app)

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/frantanius/github-repos-explorer.git
cd github-repos-explorer
```

### 2. Install dependencies (using pnpm)

If you don't have `pnpm` installed:

```bash
npm install -g pnpm
```

Then install dependencies:

```bash
pnpm install
```

### 3. Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run tests

```bash
pnpm test
```


## 🛠️ Folder Structure

```
.
├── components/
│   ├── ui/                 # Shadcn-based UI components
│   ├── providers/          # React Query Provider
│   ├── UserAccordionItem.tsx
│   ├── SearchInput.tsx
│   ├── Skeletons.tsx
│   └── UserRepoList.tsx
├── lib/
│   └── github.ts           # GitHub API helpers
├── app/
│   ├── page.tsx            # Homepage
│   └── layout.tsx
├── styles/
│   └── globals.css
└── ...
```

## 🔐 API Rate Limiting

GitHub’s API is rate-limited for unauthenticated requests (60 requests/hour).
For higher limits, you can modify `fetchUsers` and `fetchUserRepos` in `lib/github.ts` to use a GitHub token.

## 📦 Tech Stack

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Query](https://tanstack.com/query/latest)
* [shadcn/ui](https://ui.shadcn.dev/)
* [Zod](https://zod.dev/)
* [React Hook Form](https://react-hook-form.com/)
* [GitHub REST API](https://docs.github.com/en/rest)
