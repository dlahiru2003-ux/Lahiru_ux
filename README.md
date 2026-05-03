# My Portfolio — Next.js

## 🚀 Setup Instructions (VS Code)

### Step 1 — Dependencies install කරන්න
VS Code terminal (Ctrl + `) open කරලා:
```bash
npm install
```

### Step 2 — Dev server run කරන්න
```bash
npm run dev
```

Browser එකේ http://localhost:3000 open කරන්න ✅

---

## 📁 Project Structure

```
src/
  app/
    page.tsx        ← Main portfolio page (සියලු sections)
    layout.tsx      ← HTML wrapper
    globals.css     ← All styles & CSS variables
    data.ts         ← Skills, timeline, projects data
```

## ✏️ Customize කරන්න

### ඔබේ නම වෙනස් කරන්න
`page.tsx` file එකේ `AK.` සහ `Alex Kim` ඔබේ නමට වෙනස් කරන්න.

### Skills වෙනස් කරන්න
`data.ts` file එකේ `skills` array එක edit කරන්න.

### Experience වෙනස් කරන්න
`data.ts` file එකේ `timeline` array එක edit කරන්න.

### Projects වෙනස් කරන්න
`data.ts` file එකේ `initialProjects` array එක edit කරන්න.
හෝ browser එකේ "+ Add Project" button click කරන්න.

## 🌐 Deploy කරන්න (Vercel — Free)

```bash
npm run build
```

Vercel.com → Import GitHub repo → Deploy ✅
