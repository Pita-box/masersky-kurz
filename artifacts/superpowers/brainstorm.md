# Superpowers Brainstorm

## Goal
Upravit a vylepšit UI/UX stávající Next.js aplikace s ohledem na Gitbook design. Zrušit redundantní přehledy (archivní stránky), zavést třísloupcový layout pro detail tématu (levý sidebar s navigací témat od nejstaršího, prostřední obsah, pravý sidebar s Page outline). Přidat sticky tlačítko pro spuštění kvízu a rozšířit analytiku – aplikace si zapamatuje četnost chyb u konkrétních otázek a na stránce teorie pak vygeneruje rozbor mezer ve znalostech. Navíc vytvořit sekci "Mega kvíz", která sjednotí všechny otázky napříč tématy, s perzistentním postupem (stav kvízu zůstává uložený i po vypnutí) a dedikovaným kruhovým progresem.

## Constraints
- Framework: Next.js (App Router), Vanilla CSS s ohledem na Gitbook tokens.
- DB/Stav: Supabase / LocalStorage. Bude nutné upravit strukturu ukládaných dat, aby obsahovala:
  1. Historii každé jednotlivé otázky (celkové skóre a počet chyb na konkrétní otázku).
  2. Rozpracovaný stav Mega kvízu (např. pole indexů náhodně seřazených otázek, aktuální pozice a zaznamenané odpovědi), aby šlo kvíz kdykoli obnovit.
- Čtení z Markdownu: Outline musí být vygenerován z obsahu (vyhledání H1, H2, H3).

## Known context
- Kvízy fungují (čtou se přes Regex z `.md` souborů). Možnosti se míchají, je vyžadováno zapamatování konkrétního uživatelova výběru ('a', 'b', atd.) přes refreshe pro Mega kvíz.
- Témata se načítají funkcí `getAllTopics()`. Chybí řazení dle stáří, k tomu využijeme `fs.statSync` k seřazení podle času vytvoření (birthtime).

## Risks
- **Rozpracovaný stav (Mega kvíz):** Udržení pole všech namixovaných otázek (id/topic a indexy) po reloadu prohlížeče vyžaduje stabilní ukládání buď do `localStorage` nebo do DB pod uživatelským sezením, aby nedocházelo k přehašování pořadí otázek (jinak by se uživateli změnila další otázka po reloadu).
- **Extrakce nadpisů (TOC):** K reaktivnímu scrollování a vytvoření id pro nadpisy se doporučuje nasadit `rehype-slug`.
- **Struktura historie kvízu a rozbor mezer:** Je nutné korektně agregovat `explanation` a téma na základě uložených historických odpovědí a vypsat je do zprávy pro studenta na konci výpisu.

## Options (2–4)
- **Option 1 (Kompletní analytika + Mega Kvíz):** Použití `rehype-slug` pro id nadpisů. Nový třísloupcový layout s levým globálním sidebarem. Aplikace ukládá statistiky odpovědí. Pro Mega Kvíz vznikne speciální kontejnerový stav (stavový strom uložený v local storage/Supabase obsahující `seed` pro generování pseudonáhodného pořadí NEBO rovnou pole namixovaných objektů a záznam aktuálního kroku). Kruhový progres v hlavičce čte tento globální stav.
- **Option 2 (Odložené funkce):** Soustředit se jen na Layout a Mega Kvíz přidat později. Tím nevyhovíme požadavkům včas.

## Recommendation
Zvolit **Option 1**. Umožní to masivní posun kupředu. Třísloupcový layout nasadíme napříč aplikací kromě homepage. Pro "Mega kvíz" vytvoříme samostatnou stránku `/mega-kviz` a globální `Provider` (např. přes Context API nebo Zustand), který se postará o ukládání rozpracovanosti kvízu (persisted store), takže po F5 nebo vypnutí PC bude klient pokračovat tam, kde skončil, včetně svých namíchaných voleb. Kruhový widget do Headeru napojíme na tento Store.

## Acceptance criteria
1. Stránky `/vypisy` a `/kvizy` jsou smazány.
2. Na stránce detailu tématu `/vypisy/[topic]` je levý sidebar s tématy (od nejstaršího) a pravý sidebar s Page Outline.
3. Sticky tlačítko "Spustit kvíz" na detailu tématu.
4. Ukládá se historie za každou otázku a pod teorií se ukazuje podrobný rozbor chyb a mezer.
5. Vznikne `/mega-kviz` – kvíz náhodně propojující všechny otázky z celého kurzu.
6. Postup Mega kvízu je persistentní, takže po návratu na web uživatel rovnou pokračuje tam, kde přestal. Volby odpovědí pro Mega Kvíz zůstávají zamíchané stejně a vybraná volba si pamatuje svou hodnotu.
7. V hlavní navigaci je přidán vizuální kruhový Progress bar Mega Kvízu (počet dokončených / celkem).
