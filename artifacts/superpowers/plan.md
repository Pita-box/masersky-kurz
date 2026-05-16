# Plan – Praktická část (step-by-step masáž carousel)

## Goal

Implementovat stránku `/prakticka-cast` s kartami masážních sestav a detailní stránku `/prakticka-cast/[sestava]` s horizontálním autoplay carouselem (15s/slide), kde každý krok zobrazuje název hmatu, popis, fotku a video.

## Assumptions

1. Brainstorm schválen – jdeme s **Option A** (statické TS data + client-side carousel)
2. Dev server běží na `localhost:3001`
3. Fotky/videa z `masaze.ftk.upol.cz` jsou dostupné (external hotlinking)
4. Existující layout (TopicSidebar, Navigation) zůstává beze změn
5. Data z `kompletni-masaz-krok-za-krokem.md` jsou zdrojem pravdy pro pořadí kroků
6. Carousel bude pure CSS scroll-snap + JS timer (žádné externí knihovny)

## Plan

### 1. Vytvořit datový model a typování
- **Files:** `src/data/masaze-postupy.ts`
- **Change:**
  - Definovat TypeScript interfaces: `MasazniKrok`, `MasazniSestava`
  - Vytvořit data pro **2 sestavy** (Záda + DK zezadu) jako proof-of-concept
  - Každý krok obsahuje: `id`, `nazev`, `popis`, `fotka?`, `videoId?`, `kategorie` (tření/hnětení/...)
- **Verify:** `pnpm exec tsc --noEmit` – žádné TS chyby

### 2. Vytvořit stránku s kartami `/prakticka-cast`
- **Files:** `src/app/prakticka-cast/page.tsx`
- **Change:**
  - Server component
  - Zobrazit grid karet (ProcedureCard inline) – název sestavy, počet kroků, ikona/emoji
  - Každá karta linkuje na `/prakticka-cast/[slug]`
  - Design: parchment bg, radius-cards, hover efekt
- **Verify:** Otevřít `http://localhost:3001/prakticka-cast` – viditelné karty

### 3. Vytvořit ProcedureCarousel component
- **Files:** `src/components/ProcedureCarousel.tsx`, `src/components/ProcedureCarousel.css`
- **Change:**
  - Client component (`"use client"`)
  - Horizontální scroll container s CSS `scroll-snap-type: x mandatory`
  - Každý slide: `scroll-snap-align: start`, šířka 85vw (desktop) / 90vw (mobile)
  - Aktivní slide = opacity 1, ostatní = opacity 0.7 + scale 0.95
  - Autoplay: `setInterval(15000)` posouvá na další slide
  - Pause: `onMouseEnter` / `onClick` / `onTouchStart` pozastaví timer
  - Play button (vpravo nahoře): obnoví autoplay
  - Progress bar pod aktivním slidem (15s animace)
  - Slide content: heading, popis (Kde/Jak), fotka (`<img>`), video (`<iframe>` pouze pro aktivní slide)
- **Verify:** Import v detail stránce, vizuální kontrola v prohlížeči

### 4. Vytvořit detail stránku `/prakticka-cast/[sestava]`
- **Files:** `src/app/prakticka-cast/[sestava]/page.tsx`
- **Change:**
  - Načíst data ze `src/data/masaze-postupy.ts` podle slug
  - Předat kroky do `<ProcedureCarousel>`
  - Nadpis sestavy + back link na `/prakticka-cast`
  - Mobilní responsivita
- **Verify:** Otevřít `http://localhost:3001/prakticka-cast/zada` – carousel s kroky

### 5. Doplnit kompletní data pro všech 7 sestav
- **Files:** `src/data/masaze-postupy.ts`
- **Change:**
  - Doplnit zbývajících 5 sestav: DK zepředu, Hrudník, Břicho, HK, Šíje
  - Mapovat fotky/videa z `zakladni-maserske-techniky.md` ke správným krokům
- **Verify:** Každá sestava se renderuje, žádné prázdné slides

### 6. Přidat sidebar navigaci + UI polish
- **Files:** `src/components/TopicSidebar.tsx`, `src/components/ProcedureCarousel.css`
- **Change:**
  - Přidat odkaz „Praktická část" do sidebaru (pod Mega Kvíz)
  - Finální polish: transitions, mobile swipe behavior, edge cases (poslední slide → loop/stop)
- **Verify:** Sidebar link funguje, carousel se chová správně na desktopu i mobilu

### 7. Vizuální test + build check
- **Files:** žádné nové
- **Change:** žádné
- **Verify:**
  - `pnpm run build` – žádné build chyby
  - Browser test: autoplay funguje, pause on hover, play button, progress bar, mobile swipe
  - Zkontrolovat všech 7 sestav

## Risks & mitigations

| Riziko | Mitigace |
|--------|----------|
| CSS scroll-snap nedetekuje aktivní slide spolehlivě | Použít `IntersectionObserver` pro detekci viditelného slidu |
| YouTube iframy zpomalují stránku | Lazy render: iframe jen pro aktivní slide, ostatní = placeholder |
| Touch swipe koliduje s autoplay | `onTouchStart` → pause, explicitní Play button pro resume |
| Data mapping fotka↔krok není 1:1 | Některé kroky nemají fotku/video – zobrazit placeholder nebo vynechat media sekci |

## Rollback plan

1. Stránka `/prakticka-cast` je plně izolovaná (nový route, nový component)
2. Žádné změny v existujících stránkách (výpisy, kvízy, mega-kvíz)
3. Jediná změna v existujícím kódu = link v TopicSidebar → revert jednoho řádku
4. Smazat `src/app/prakticka-cast/`, `src/data/masaze-postupy.ts`, `src/components/ProcedureCarousel.*`
