# Superpowers Plan: Komplexní responsivita pro celý web

## Goal
Vyřešit "rozsypaný" layout na menších obrazovkách (mobilech a tabletech) plošně napříč celou aplikací. Všechny komponenty, včetně kvízů, analýz a navigace, musí být plně použitelné a čitelné.

## Plan

### Step 1: Příprava CSS tříd a layoutu
- **Files:** `src/app/globals.css`, `src/app/layout.tsx`
- **Change:** Vytvoříme silné responsivní utility v CSS (např. flex wrap, zmenšení paddingů). Skryjeme levý postranní panel (`TopicSidebar`) na úzkých displejích a upravíme odsazení celého `main` obsahu.

### Step 2: Navigace a vyhledávání
- **Files:** `src/components/Navigation.tsx`, `src/components/SearchBar.tsx`, `src/components/PageOutline.tsx`
- **Change:** Vyhledávací pole se přizpůsobí zbylému prostoru. Pravé menu (`PageOutline`) se na telefonech skryje, uvolní tak vzácné místo pro hlavní čtení. Hlavička bude hezky obtékat nebo se poskládá pod sebe.

### Step 3: Úprava přehledů (Homepage) a Kvízového Engine
- **Files:** `src/app/page.tsx`, `src/components/QuizEngine.tsx`, `src/components/MegaQuizEngine.tsx`, `src/components/QuizAnalysis.tsx`
- **Change:** Na úvodní stránce se tlačítka témat na menších zařízeních roztáhnou na celou šířku a poskládají se nad sebe. U kvízů zajistíme, že text otázky se nedeformuje a tlačítka odpovědí fungují jako velké "tap" zóny přes celou šířku obrazovky.

## Verification
- Vizuální kontrola všech zmíněných stránek ve zmenšeném (mobile) okně prohlížeče. Kód projde přes `pnpm run build`.

## Approval
Prosím o schválení plánu (napiš APPROVED).
