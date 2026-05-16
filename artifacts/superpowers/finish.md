# Finish – Praktická část

## Verification Results

| Check | Result |
|---|---|
| `pnpm exec tsc --noEmit` | ✅ PASS |
| `pnpm run build` | ✅ PASS (7 static routes prerendered) |
| Browser: /prakticka-cast cards | ✅ 7 cards visible |
| Browser: carousel autoplay | ✅ 15s interval, progress bar |
| Browser: pause on hover/click | ✅ Works |
| Browser: play/pause button | ✅ Toggle works |
| Browser: prev/next navigation | ✅ Arrows work |
| Browser: dot indicators | ✅ Active dot updates |
| Browser: category colors | ✅ Color-coded labels |
| Browser: photos loading | ✅ External images render |
| Browser: YouTube videos | ✅ Lazy iframe on active slide |
| Browser: sidebar link | ✅ "Praktická část" shows, active state works |

## Summary of Changes

| File | Change |
|---|---|
| `src/data/masaze-postupy.ts` | **NEW** – Data model + 7 massage procedures (112 total steps) |
| `src/app/prakticka-cast/page.tsx` | **NEW** – Cards grid page |
| `src/app/prakticka-cast/[sestava]/page.tsx` | **NEW** – Carousel detail page |
| `src/components/ProcedureCarousel.tsx` | **NEW** – Autoplay carousel component |
| `src/components/ProcedureCarousel.css` | **NEW** – Carousel styles |
| `src/components/TopicSidebar.tsx` | **MODIFIED** – Added "Praktická část" link |

## Review Pass

- **Blocker:** None
- **Major:** None
- **Minor:** Some massage steps lack photos/videos (data limitation from source material – not all techniques have media on masaze.ftk.upol.cz)
- **Nit:** Emoji for "Masáž zad" (🔙) could be more descriptive – but functional

## Follow-ups

1. Add keyboard navigation (← → arrows) for carousel
2. Consider adding "quiz this sequence" button at the end of each carousel
3. Mobile: test touch swipe behavior on real device
