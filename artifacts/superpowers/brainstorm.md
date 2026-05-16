# Brainstorm – Praktická část (step-by-step masáž carousel)

## Goal

Vytvořit novou stránku `/prakticka-cast` s kartami různých masážních sestav (Celotělová, Záda, DK zezadu, DK zepředu, Hrudník, Břicho, HK, Šíje). Po kliknutí na kartu se otevře **horizontální carousel**, kde každý slide = jeden krok masáže. Carousel se automaticky přehrává (autoplay 15s/slide), při interakci (hover/click) se pozastaví. Student si tím procvičuje **správné pořadí hmatů** – u zkoušky NSK je chyba v pořadí = okamžité neúspěch.

## Constraints

1. **Next.js App Router** – existující stack (React 19, Next 16, vanilla CSS, design system GitBook-style)
2. **Datový zdroj:** `kompletni-masaz-krok-za-krokem.md` (7 sestav, 40+ kroků) + `zakladni-maserske-techniky.md` (fotky + videa ke hmatům)
3. **Design system:** musí respektovat existující tokeny (--color-*, --spacing-*, --radius-*, --font-*)
4. **Mobilní i desktopové použití** – carousel musí fungovat na obou zařízeních (touch swipe + scroll-x)
5. **Bez externích knihoven** – čistý CSS scroll-snap + JS pro autoplay, žádný Swiper/Embla
6. **Data coupling:** Fotky a videa z `zakladni-maserske-techniky.md` jsou indexovány podle názvu hmatu – potřeba mapování `název kroku → foto URL + video URL`

## Known context

- **7 masážních sestav** v `krok-za-krokem.md`: Záda, DK zezadu, DK zepředu, Hrudník, Břicho, HK, Šíje
- **35 fotek + 28 videí** v `zakladni-maserske-techniky.md` – linkované na techniky (tření plochou dlaní, hnětení vlnovité, atd.)
- **Pořadí hmatů je NSK požadavek:** Tření → Hnětení → Roztírání → Tepání → Chvění (vždy!)
- Existující routing: `/vypisy/[topic]`, `/kvizy/[topic]`, `/mega-kviz`
- TopicSidebar je server component v layout.tsx
- Projekt používá `pnpm`

## Risks

| # | Riziko | Dopad | Mitigace |
|---|--------|-------|----------|
| 1 | **Data mapping** – názvy kroků v krok-za-krokem.md nemusí přesně odpovídat názvům technik v zakladni-maserske-techniky.md | Fotky/videa se nepřiřadí ke krokům | Vytvořit explicitní mapovací soubor (JSON/TS) s manuálním párováním |
| 2 | **Autoplay UX** – 15s může být moc/málo pro různé kroky | Student nestihne přečíst nebo se nudí | Přidat progress bar + pause on interaction + manual navigation |
| 3 | **Mobile touch** – CSS scroll-snap + autoplay mohou kolidovat s touch gesty | Carousel se chová nepředvídatelně na mobilu | Testovat na mobilu, pausnout autoplay při touch events |
| 4 | **Obrovské množství dat** – 7 sestav × ~6-10 kroků = ~50 slides s fotkami/videi | Pomalé načítání, velký JS bundle | Lazy loading obrázků/videí, data jako statické JSON, ne runtime parsing MD |
| 5 | **Video autoplay** – YouTube iframy v neaktivních slides mohou žrát resources | Performance degradace | Renderovat iframe pouze pro aktivní slide, ostatní jako thumbnail |

## Options (3)

### Option A: Statické TS data + client-side carousel component
- Vytvořit `src/data/masaze-postupy.ts` s kompletními daty (kroky, fotky, videa) jako TypeScript konstanty
- Server component pro stránku `/prakticka-cast` s kartami
- Client component `ProcedureCarousel.tsx` pro horizontální autoplay carousel
- CSS scroll-snap pro smooth scrolling, JS timer pro autoplay
- **Pro:** Jednoduché, rychlé, plná kontrola nad daty
- **Con:** Data nejsou dynamická, musí se ručně aktualizovat

### Option B: MD parser + dynamic rendering
- Parsovat `krok-za-krokem.md` runtime a automaticky párovat s fotkami/videi
- **Pro:** Data se aktualizují automaticky
- **Con:** Komplexní parser, fragile text matching, těžko debugovatelné

### Option C: Dedicated MD files per procedure
- Vytvořit samostatné MD soubory pro každou masáž (záda.md, dk-zezadu.md, ...)
- Parsovat jako existující výpisy
- **Pro:** Konzistentní s existující architekturou
- **Con:** Duplikace dat, carousel logika v markdown je nepohodlná

## Recommendation

**Option A – Statické TS data + client-side carousel.**

Důvody:
1. Carousel je vysoce interaktivní UI – potřebuje přesnou kontrolu nad daty (pořadí, timing, média)
2. Data z `krok-za-krokem.md` se nemění často – jde o zkouškový standard
3. TypeScript typování zajistí, že žádný krok nechybí
4. Fotky a videa jsou z externího serveru (masaze.ftk.upol.cz) – stačí URL stringy
5. Nejjednodušší na implementaci a debugging

### Architektura:
```
src/
├── data/
│   └── masaze-postupy.ts          # Kompletní data: kroky, fotky, videa
├── app/
│   └── prakticka-cast/
│       ├── page.tsx               # Server: karty sestav
│       └── [sestava]/
│           └── page.tsx           # Client: carousel pro danou sestavu
├── components/
│   ├── ProcedureCard.tsx          # Karta masážní sestavy (na homepage)
│   └── ProcedureCarousel.tsx      # Carousel component s autoplay
```

## Acceptance criteria

1. Stránka `/prakticka-cast` zobrazí karty pro 7+ masážních sestav
2. Kliknutím na kartu se otevře `/prakticka-cast/[sestava]` s horizontálním carousel
3. Carousel má autoplay s 15s intervaly a viditelný progress bar
4. Aktivní slide je plně viditelný, ostatní mají opacity 0.7
5. Hover nebo click na slide pozastaví autoplay
6. Tlačítko Play (vpravo nahoře) obnoví autoplay
7. Každý slide zobrazuje: název hmatu, popis (Kde/Jak), fotku, video (pokud existuje)
8. Carousel funguje na desktopu i mobilu (touch swipe)
9. Design respektuje existující design system (tokeny, fonty, barvy)
10. Navigace v sidebaru obsahuje odkaz na Praktickou část
11. Data jsou kompletní pro všech 7 sestav z `krok-za-krokem.md`
