
### Step 1: Inicializace Next.js projektu
- **Files changed:** `package.json`, `src/app/page.tsx`
- **What changed:** 
  - Initialized Next.js app in temp directory and copied over (to bypass name restriction).
  - Cleaned up `src/app/page.tsx` boilerplate.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 2: Struktura, CSS a Vzhled (Design System)
- **Files changed:** `src/app/globals.css`, `src/components/Navigation.tsx`, `src/app/layout.tsx`
- **What changed:** 
  - Created global CSS based on the requested Gitbook design system.
  - Built a responsive `Navigation.tsx` component.
  - Integrated navigation and styles into `layout.tsx`.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 3: Čtení Markdown výpisů (Logika API)
- **Files changed:** `src/lib/markdown.ts`, `src/app/page.tsx`
- **What changed:** 
  - Created a utility to parse and read Markdown files directly from the `/Výpisy` directory using `fs` and `path`.
  - Updated the homepage to list all available topics dynamically with links to read them or start a quiz.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 4: UI pro Knihovnu Výpisů
- **Files changed:** `src/app/vypisy/page.tsx`, `src/app/vypisy/[topic]/page.tsx`, `src/app/globals.css`
- **What changed:** 
  - Installed `react-markdown` and added styles for the markdown body.
  - Created a list page for all notes (`/vypisy`).
  - Created dynamic route for individual topics (`/vypisy/[topic]`) using SSG (`generateStaticParams`).
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 5: Interaktivní Kvízový Modul (Engine)
- **Files changed:** `src/lib/quiz.ts`, `src/components/QuizEngine.tsx`, `src/app/kvizy/[topic]/page.tsx`
- **What changed:** 
  - Created a robust regex-based quiz parser to read Markdown quizzes that follow a specific syntax.
  - Built a stateful `QuizEngine.tsx` component to handle answering questions step-by-step.
  - Showcases the resulting score with a dynamic UI depending on whether the user passed 60%.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 6: Logika "Lektora" a ukládání Historie (Supabase)
- **Files changed:** `src/lib/supabase.ts`, `src/components/QuizEngine.tsx`, `src/components/QuizCard.tsx`, `src/app/page.tsx`
- **What changed:** 
  - Installed `@supabase/supabase-js` and configured the client.
  - Implemented saving and fetching quiz results (with a fallback to localStorage during local dev/tests without env vars).
  - Built `QuizCard` component to fetch client-side history and display previous percentage on the dashboard.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 7: Globální Full-Text Vyhledávání
- **Files changed:** `src/app/api/search/route.ts`, `src/components/SearchBar.tsx`, `src/components/Navigation.tsx`
- **What changed:** 
  - Installed `fuse.js` for fuzzy search.
  - Created a dynamic API route `/api/search` to search across all parsed markdown notes.
  - Built a client-side `SearchBar` with debounce and integrated it into the navigation header.
- **Verification:** `npm run build`
- **Result:** Pass (0 exit code)


### Step 1: Aktualizace Supabase klienta pro ukládání Mega Kvízu a analytiky
- **Files changed:** `src/lib/supabase.ts`
- **What changed:** 
  - Vytvořeny rozhraní a funkce `saveMegaQuizState` a `getMegaQuizState` pro persistenci Mega Kvízu s podporou pro LocalStorage.
  - Založeno rozhraní `QuestionResult` do `QuizHistory`.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 2: Vytvoření Třísloupcového Layoutu a Levého Sidebaru
- **Files changed:** `src/lib/markdown.ts`, `src/components/TopicSidebar.tsx`, `src/app/layout.tsx`, `src/components/Navigation.tsx`
- **What changed:** 
  - Smazány archivní stránky `/vypisy/page.tsx` a `/kvizy/page.tsx`.
  - Vytvořena `TopicSidebar` a zanesena do `layout.tsx`. 
  - `getAllVypisy()` seřazeno dle data vytvoření (birthtime).
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 3: Page Outline (TOC) na pravé straně pro Témata
- **Files changed:** `package.json`, `src/components/PageOutline.tsx`, `src/app/vypisy/[topic]/page.tsx`
- **What changed:** 
  - Nainstalovány pluginy `rehype-slug` a `rehype-autolink-headings` k Markdownu.
  - Vytvořena klientská komponenta `PageOutline`, která dynamicky načítá `h2` a `h3` elementy a generuje obsah stránky (TOC).
  - Téma má teď sticky Sidebar napravo i s odkazem na spuštění kvízu.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 4: Rozšíření historie kvízu a generování rozboru chyb
- **Files changed:** `src/components/QuizEngine.tsx`, `src/app/vypisy/[topic]/page.tsx`, `src/components/QuizAnalysis.tsx`
- **What changed:** 
  - Vytvořena komponenta `QuizAnalysis`, která zobrazuje chybné odpovědi a z nich lektorská vysvětlení.
  - V `QuizEngine.tsx` se přidala podpora pro trackování jednotlivých odpovědí do state `details`, které se ukládají.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 5: Implementace Mega Kvízu (Logika)
- **Files changed:** `src/lib/quiz.ts`, `src/app/mega-kviz/page.tsx`, `src/components/MegaQuizEngine.tsx`
- **What changed:** 
  - V `quiz.ts` přidána metoda `getAllQuizzes` spojující všechny otázky.
  - Vytvořen `MegaQuizEngine` na čtení z a ukládání do perzistentního stavu. Přidáno event dispatch `megaQuizUpdate`.
  - Vytvořena globální stránka pro Mega kvíz.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 6: Progress Bar Mega Kvízu do Headeru
- **Files changed:** `src/components/Navigation.tsx`, `src/components/MegaQuizProgress.tsx`
- **What changed:** 
  - Vytvořena komponenta `MegaQuizProgress`, která kreslí kruhový SVG graf zobrazující progres Mega Kvízu.
  - Vložena do navigace, reaktivně poslouchá na custom event `megaQuizUpdate`.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 1: Vylepšení levého Sidebaru
- **Files changed:** `src/components/TopicSidebar.tsx`
- **What changed:** 
  - Sidebar `top` a `height` přesně doladěny na `67px` a `calc(100vh - 67px)` aby po přidání spousty témat umožnil scrollování vlastní oblasti díky `overflow-y: auto` a zároveň zůstal `position: sticky`.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)


### Step 2: IntersectionObserver v Page Outline
- **Files changed:** `src/components/PageOutline.tsx`
- **What changed:** 
  - Přidán stav `activeId`.
  - Vytvořen `IntersectionObserver`, který monitoruje nadpisy (`h2`, `h3`) a při protnutí `rootMargin: 0px 0px -80% 0px` (odpovídá scrollování) nastavuje `activeId`.
  - Zvýraznění aktivního bodu v pravém sidebaru tučným písmem, sytější barvou a levým modrým okrajem.
- **Verification:** `pnpm run build`
- **Result:** Pass (0 exit code)

