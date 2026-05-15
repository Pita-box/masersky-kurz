# Superpowers Plan: Sidebar Scroll & Active Outline

## Goal
1. Upravit levý sidebar tak, aby byl správně scrollovatelný při přibývání témat (zajistit přesnou výšku a overflow chování).
2. Přidat `IntersectionObserver` do pravého Page Outline, aby automaticky zvýrazňoval právě čtený nadpis (`activeId`) na obrazovce.

## Plan

### Step 1: Vylepšení levého Sidebaru
- **Files:** `src/components/TopicSidebar.tsx`
- **Change:** Doladit výpočet `height: calc(100vh - 67px)` a `top: 67px` a ujistit se, že má `overflowY: auto`. Ponecháme `position: sticky`, což je pro flexboxy lepší než `fixed` (nevytrhne prvek z toku stránky) a vizuálně se chová stejně.
- **Verify:** Okometrická kontrola na frontendu.

### Step 2: IntersectionObserver v Page Outline
- **Files:** `src/components/PageOutline.tsx`
- **Change:** Přidáme stav `activeId`. V `useEffect` vytvoříme `IntersectionObserver`, který bude sledovat všechny vybrané nadpisy (`.markdown-body h2, .markdown-body h3`). Jakmile nadpis protne vrchní část obrazovky, zapíše se jeho id do `activeId`. Aktivní odkaz pak dostane sytou barvu a případně fontWeight.
- **Verify:** Při scrollování stránky s dlouhou teorií se menu vpravo musí dynamicky probarvovat.

## Risks & mitigations
- IntersectionObserver může někdy "přeskakovat", pokud je sekce příliš krátká. Nastavíme mu `rootMargin: '0px 0px -80% 0px'`, takže se nadpis aktivuje, jakmile se objeví v horních 20% obrazovky.

## Approval
Prosím o schválení (APPROVED).
