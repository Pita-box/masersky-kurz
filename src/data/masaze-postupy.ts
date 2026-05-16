// Datový model a kompletní data pro masážní postupy krok-za-krokem
// Zdroj: kompletni-masaz-krok-za-krokem.md + zakladni-maserske-techniky.md

export type KategorieHmatu = 'tření' | 'hnětení' | 'roztírání' | 'tepání' | 'chvění' | 'pasivní pohyby' | 'příprava';

export interface MasazniKrok {
  id: string;
  nazev: string;
  popis: string;
  kategorie: KategorieHmatu;
  fotka?: string;
  videoId?: string;
}

export interface MasazniSestava {
  slug: string;
  nazev: string;
  emoji: string;
  poziceKlienta: string;
  kroky: MasazniKrok[];
}

// ============================================================
// SESTAVY
// ============================================================

const zada: MasazniSestava = {
  slug: 'zada',
  nazev: 'Masáž zad',
  emoji: '🔙',
  poziceKlienta: 'Klient leží na břiše',
  kroky: [
    {
      id: 'zada-1',
      nazev: 'Úvodní tření plochou dlaní',
      popis: 'Plochami dlaní provádíme rovné tahy od beder k ramenům. Obě ruce, rovnoměrný tlak. Začínáme jemně a postupně zvyšujeme intenzitu.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg',
      videoId: '8cj_p5d2zDk',
    },
    {
      id: 'zada-2',
      nazev: 'Tření obtahováním',
      popis: 'Obě ruce, rovné tahy. Tlak do hřbetu ruky směrem od maséra, zpět celou plochou dlaně.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6803e-web.jpg',
      videoId: 'LhD7B6rtWhc',
    },
    {
      id: 'zada-3',
      nazev: 'Tření bříšky prstů („klikatě")',
      popis: 'Obě ruce, rovné tahy. Celou dlaní rovně od maséra, zpět „klikatě" – tlak do distálních článků 2.–4. prstu.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6805e-web.jpg',
      videoId: 'zU0iETm31qE',
    },
    {
      id: 'zada-4',
      nazev: 'Roztírání patkou',
      popis: 'Jedna ruka, spirálovitý pohyb od páteře s přítlakem šikmo vzhůru. Tlak do dolní části dlaně (patky).',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6807e-web.jpg',
      videoId: 'kRj6MH5QJPY',
    },
    {
      id: 'zada-5',
      nazev: 'Roztírání čtyřmi prsty',
      popis: 'Jedna ruka, spirálovitý pohyb od páteře. Tlak do distálních článků 2.–4. prstu, prsty od sebe.',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6809e-web.jpg',
      videoId: 'ZOseIlPMFWc',
    },
    {
      id: 'zada-6',
      nazev: 'Roztírání osmi prsty',
      popis: 'Obě ruce položeny na sobě, spirálovitý pohyb s přítlakem šikmo vzhůru. Větší spirála než u čtyř prstů.',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6812e-web.jpg',
      videoId: 'ock8C8S_g_o',
    },
    {
      id: 'zada-7',
      nazev: 'Roztírání palcem',
      popis: 'Jedna nebo obě ruce, krouživé pohyby palcem podél páteře. Rozsah spirály podle svalového napětí.',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6815e-web.jpg',
      videoId: '8XmTTuzkCCI',
    },
    {
      id: 'zada-8',
      nazev: 'Vytírání kolem lopatky',
      popis: 'Klient ohne ruku na záda – masírujeme kolem lopatky a mezi žebry. Roztírání pěstí pro hluboký efekt.',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7008e-web.jpg',
      videoId: '7sSzriKFzyo',
    },
    {
      id: 'zada-9',
      nazev: 'Tepání tleskáním',
      popis: 'Obě ruce s propnutými prsty střídavě dopadají celou plochou na záda. Lokty u těla, zápěstí zpevněné.',
      kategorie: 'tepání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6833e-web.jpg',
      videoId: 'P5xkDqz1Uj4',
    },
    {
      id: 'zada-10',
      nazev: 'Tepání pleskáním',
      popis: 'Prsty s dlaní tvoří „stříšku". Dopadá pouze obvod stříšky a vzduchový polštář ovlivňuje oblast.',
      kategorie: 'tepání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6832e-web.jpg',
      videoId: 'iq-sU8XmIg4',
    },
    {
      id: 'zada-11',
      nazev: 'Tepání smetáním',
      popis: 'Lokty do stran, díváme se do dlaní. Zevní rotací v zápěstí (= „pohlavek") prsty podeberou svalovinu. „Mlýnek".',
      kategorie: 'tepání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6798e-web.jpg',
      videoId: 'uc6vQ9N8O4w',
    },
    {
      id: 'zada-12',
      nazev: 'Tepání vějířem',
      popis: 'Lokty u těla, dlaně proti sobě. Ruce dopadají hranou malíku. Pohyb z maximálně uvolněného zápěstí.',
      kategorie: 'tepání',
      videoId: 'yizR2cMVsuk',
    },
    {
      id: 'zada-13',
      nazev: 'Chvění dlaněmi',
      popis: 'Obě ruce vibrují do stran, posouvají se podél páteře. Rychlé, krátké intervaly.',
      kategorie: 'chvění',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6892e-web.jpg',
      videoId: '8eMHnwkW8dw',
    },
    {
      id: 'zada-14',
      nazev: 'Závěrečné tření bříšky prstů',
      popis: 'Zpět „klikatě" bříšky prstů, uklidnění kůže a svalů.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6805e-web.jpg',
    },
    {
      id: 'zada-15',
      nazev: 'Závěrečné tření obtahováním',
      popis: 'Obtahování jako na začátku, ale s klesající intenzitou.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6803e-web.jpg',
    },
    {
      id: 'zada-16',
      nazev: 'Závěrečné tření plochou dlaní',
      popis: 'Závěrečné jemné tahy plochou dlaní od beder k ramenům. Klesající intenzita, uklidnění.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg',
    },
  ],
};

const dkZezadu: MasazniSestava = {
  slug: 'dk-zezadu',
  nazev: 'Dolní končetiny zezadu',
  emoji: '🦵',
  poziceKlienta: 'Klient leží na břiše',
  kroky: [
    {
      id: 'dkz-1',
      nazev: 'Tření celé nohy plochou dlaní',
      popis: 'Plochami dlaní provádíme vytírání celé nohy od chodidla po hýždě. Obě ruce, rovné tahy k srdci.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg',
      videoId: '8cj_p5d2zDk',
    },
    {
      id: 'dkz-2',
      nazev: 'Tření celé nohy obtahováním',
      popis: 'Obtahování celé nohy od chodidla k hýždím. Hřbetem ruky směrem od maséra, zpět dlaní.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6803e-web.jpg',
      videoId: 'LhD7B6rtWhc',
    },
    {
      id: 'dkz-3',
      nazev: 'Chodidlo – tření obtahováním',
      popis: 'Obtahování plosky chodidla jednou rukou.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-4',
      nazev: 'Chodidlo – roztírání patkou a palci',
      popis: 'Roztírání plosky patkou dlaně, poté palci. Silný tlak na plosku.',
      kategorie: 'roztírání',
    },
    {
      id: 'dkz-5',
      nazev: 'Chodidlo – roztírání pěstí',
      popis: 'Ruka sevřená v pěst, rovné tahy nebo „zavrtávání" po plosce.',
      kategorie: 'roztírání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7008e-web.jpg',
      videoId: '7sSzriKFzyo',
    },
    {
      id: 'dkz-6',
      nazev: 'Achillova šlacha – tření nůžkovým hmatem',
      popis: 'Jedna ruka, tlak mezi ohnutý ukazovák a prostředník. Rovné tahy podél šlachy.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7123e-web.jpg',
    },
    {
      id: 'dkz-7',
      nazev: 'Achillova šlacha – tření kolébkou',
      popis: 'Prsty obou rukou propleteny, tlak mezi thenar a hypothenar. Rovné tahy.',
      kategorie: 'tření',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7124e-web.jpg',
    },
    {
      id: 'dkz-8',
      nazev: 'Achillova šlacha – hnětení vlnovité',
      popis: 'Palec proti prstům druhé ruky, „udržet vlnu", neštípat. Obě ruce se plynule střídají.',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6797e-web.jpg',
      videoId: 'nnGH5kYr-x4',
    },
    {
      id: 'dkz-9',
      nazev: 'Achillova šlacha – hnětení palci („podpichování")',
      popis: 'Palce ze stran Achillovy šlachy. Kolmý tlak z obou stran pod šlachu.',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7010e-web.jpg',
    },
    {
      id: 'dkz-10',
      nazev: 'Lýtko – tření plochou dlaní',
      popis: 'Vytírání lýtka od kotníku ke kolenu plochou dlaní.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-11',
      nazev: 'Lýtko – tření obtahováním',
      popis: 'Obtahování lýtka, jedna ruka v rovných tazích.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-12',
      nazev: 'Lýtko – hnětení uchopením a odtažením',
      popis: 'Oblast mezi rukama, stisknout, povytáhnout, rychle pustit. Postupně k srdci.',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7019e-web.jpg',
      videoId: 'JnqS2SI_TpU',
    },
    {
      id: 'dkz-13',
      nazev: 'Lýtko – hnětení vlnovité',
      popis: 'Palec nahrnuje svalovinu k prstům druhé ruky. Udržet vlnu!',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_6797e-web.jpg',
      videoId: 'nnGH5kYr-x4',
    },
    {
      id: 'dkz-14',
      nazev: 'Lýtko – hnětení finské',
      popis: 'Dlaně fixují sval, palce se „zabořují" – slalom, spirálky nebo křížky.',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7027e-web.jpg',
      videoId: 'WOrX-sb9Ye4',
    },
    {
      id: 'dkz-15',
      nazev: 'Lýtko – tepání smetáním',
      popis: 'Lokty do stran, rotace v zápěstí, prsty podeberou svalovinu.',
      kategorie: 'tepání',
      videoId: 'uc6vQ9N8O4w',
    },
    {
      id: 'dkz-16',
      nazev: 'Lýtko – tepání vějířem',
      popis: 'Hranou malíku, uvolněné zápěstí. Lokty u těla.',
      kategorie: 'tepání',
      videoId: 'yizR2cMVsuk',
    },
    {
      id: 'dkz-17',
      nazev: 'Lýtko – chvění vidlicí',
      popis: 'Ohbí mezi palcem a ukazovákem na lýtku, rychlé vibrace do stran. Při držení nohy rukou.',
      kategorie: 'chvění',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7127e-web.jpg',
      videoId: 'fqOQF9QZBGo',
    },
    {
      id: 'dkz-18',
      nazev: 'Stehno – tření plochou dlaní',
      popis: 'Vytírání stehna od kolene po hýždi.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-19',
      nazev: 'Stehno – tření obtahováním',
      popis: 'Obtahování stehna jednou rukou, rovné tahy.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-20',
      nazev: 'Stehno – roztírání patkou a palci',
      popis: 'Roztírání patkou dlaně a palci na stehnu.',
      kategorie: 'roztírání',
    },
    {
      id: 'dkz-21',
      nazev: 'Stehno – hnětení uchopením, vlnovité a finské',
      popis: 'Postupně aplikovat uchopení, vlnovité a finské hnětení na stehnu.',
      kategorie: 'hnětení',
    },
    {
      id: 'dkz-22',
      nazev: 'Stehno – tepání smetáním a vějířem',
      popis: 'Smetání a vějířovité tepání na stehnu.',
      kategorie: 'tepání',
    },
    {
      id: 'dkz-23',
      nazev: 'Stehno – vyklepání (sekání)',
      popis: 'Tepání sekáním na hamstringy – nejhlubší tepací hmat. Celou hranou ruky, prsty propnuty.',
      kategorie: 'tepání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7034e-web.jpg',
      videoId: '0gWB82hCINQ',
    },
    {
      id: 'dkz-24',
      nazev: 'Hýždě – tření plochou dlaní a obtahováním',
      popis: 'Vytírání a obtahování hýždě od stehna k bederní oblasti.',
      kategorie: 'tření',
    },
    {
      id: 'dkz-25',
      nazev: 'Hýždě – roztírání patkou, 4 prsty, 8 prsty',
      popis: 'Roztírání hýždě patkou, čtyřmi a osmi prsty.',
      kategorie: 'roztírání',
    },
    {
      id: 'dkz-26',
      nazev: 'Hýždě – hnětení pěstmi („zavrtávání")',
      popis: 'Pěst sevřená, zevní rotace v hýždi. Ruce se pravidelně střídají.',
      kategorie: 'hnětení',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7036e-web.jpg',
    },
    {
      id: 'dkz-27',
      nazev: 'Hýždě – tepání pěstmi („buben") a vyklepání',
      popis: 'Pěsti dopadají střídavě v rychlé frekvenci, uvolněné zápěstí. Poté vyklepání.',
      kategorie: 'tepání',
      fotka: 'https://masaze.ftk.upol.cz/images/DSC_7039e-web.jpg',
    },
  ],
};

const dkZepredu: MasazniSestava = {
  slug: 'dk-zepredu',
  nazev: 'Dolní končetiny zepředu',
  emoji: '🦿',
  poziceKlienta: 'Klient leží na zádech',
  kroky: [
    { id: 'dkp-1', nazev: 'Tření celé nohy plochou dlaní', popis: 'Vytírání celé přední strany nohy od nártu po stehno.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg' },
    { id: 'dkp-2', nazev: 'Tření celé nohy obtahováním', popis: 'Obtahování celé přední strany nohy k srdci.', kategorie: 'tření' },
    { id: 'dkp-3', nazev: 'Chodidlo a nárt – roztírání prstů', popis: 'Roztírání jednotlivých prstů nůžkovým hmatem a palci.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7051e-web.jpg' },
    { id: 'dkp-4', nazev: 'Nárt – roztírání patkou, špetkou a palci', popis: 'Roztírání nártu patkou dlaně, špetkou a palci. Vytírání mezikostních rýh palci.', kategorie: 'roztírání', videoId: 'WhBlEuqcQxo' },
    { id: 'dkp-5', nazev: 'Kotník – roztírání patkou a špetkou', popis: 'Roztírání kolem kotníku patkou dlaně, špetkou a obkružování palci.', kategorie: 'roztírání' },
    { id: 'dkp-6', nazev: 'Holeň – obtahování a roztírání', popis: 'Obtahování vnější části holenní kosti, roztírání patkou a palcem.', kategorie: 'roztírání' },
    { id: 'dkp-7', nazev: 'Holeň – tepání smetáním a chvění', popis: 'Smetání na holeňi a chvění s pokrčeným kolenem.', kategorie: 'tepání' },
    { id: 'dkp-8', nazev: 'Koleno – roztírání patkou, špetkou a palci', popis: 'Roztírání kolenního kloubu patkou, špetkou a palci (hmat osmička a roztahování).', kategorie: 'roztírání' },
    { id: 'dkp-9', nazev: 'Stehno – tření přes ruku', popis: 'Vytírání přes ruku, obtahování vnější části. Palec v opozici.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6989e-web.jpg', videoId: '9BaVNIeuKLw' },
    { id: 'dkp-10', nazev: 'Stehno – hnětení uchopením, vlnovité a finské', popis: 'Kompletní hnětení stehna – uchopení, vlnovité i finské.', kategorie: 'hnětení', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7027e-web.jpg', videoId: 'WOrX-sb9Ye4' },
    { id: 'dkp-11', nazev: 'Stehno – roztírání patkou', popis: 'Roztírání patkou dlaně na stehnu.', kategorie: 'roztírání' },
    { id: 'dkp-12', nazev: 'Stehno – tepání s chvěním („zadělávání těsta")', popis: 'Jedna ruka fixuje koleno, druhá podvlečena pod DK. Předloktí dopadne, dlaň „zaklapne".', kategorie: 'tepání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7001e-web.jpg', videoId: 'BH_4ykA623Y' },
    { id: 'dkp-13', nazev: 'Stehno – chvění rychlým válením', popis: 'Ruce protisměrně, kolmo na vlákna. Velmi rychlý pohyb (≠ pomalé válení!).', kategorie: 'chvění', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6998e-web.jpg', videoId: '73t0iBglilA' },
    { id: 'dkp-14', nazev: 'Stehno – tepání smetáním a vějířem', popis: 'Smetání a vějířovité tepání na přední straně stehna.', kategorie: 'tepání' },
    { id: 'dkp-15', nazev: 'Vytřásání celé končetiny', popis: 'Uchopíme za patu, v tahu jemně vytřeseme do stran.', kategorie: 'chvění' },
    { id: 'dkp-16', nazev: 'Pasivní pohyby', popis: 'Ohýbání, natahování a kroužení v hlezenním, kolenním a kyčelním kloubu. Pomalu, malý rozsah → větší.', kategorie: 'pasivní pohyby' },
  ],
};

const hrudnik: MasazniSestava = {
  slug: 'hrudnik',
  nazev: 'Masáž hrudníku',
  emoji: '🫁',
  poziceKlienta: 'Klient leží na zádech',
  kroky: [
    { id: 'hru-1', nazev: 'Tření plochou dlaní', popis: 'Plochami dlaní přes celý hrudník. Přes tělo, po polovinách.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg' },
    { id: 'hru-2', nazev: 'Hnětení vlnovité', popis: 'Pouze vnější okraj m. pectoralis major (velký prsní sval). Palec proti prstům druhé ruky.', kategorie: 'hnětení', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6797e-web.jpg', videoId: 'nnGH5kYr-x4' },
    { id: 'hru-3', nazev: 'Stlačování hrudníku', popis: 'Jednotlivé stisky a dvojité pérování při výdechu klienta nad žebry.', kategorie: 'hnětení' },
    { id: 'hru-4', nazev: 'Roztírání patkou', popis: 'Patkou dlaně po hrudníku, spirálovitě.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6807e-web.jpg', videoId: 'kRj6MH5QJPY' },
    { id: 'hru-5', nazev: 'Roztírání čtyřmi a osmi prsty', popis: 'Roztírání čtyřmi prsty, poté osmi prsty. Spirálovitě.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6812e-web.jpg' },
    { id: 'hru-6', nazev: 'Roztírání mezi žebry', popis: 'Čtyřmi prsty roztíráme mezižeberní prostory, až dolů ke stolu.', kategorie: 'roztírání' },
    { id: 'hru-7', nazev: 'Tepání tleskáním a pleskáním', popis: 'Vynechávat bradavky, u žen celá prsa! Tleskání celou plochou, pleskání „stříškou".', kategorie: 'tepání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6833e-web.jpg' },
    { id: 'hru-8', nazev: 'Tepání smetáním a vějířem', popis: 'Smetání vnějšího okraje, vějířovité kolmo na svalové snopce.', kategorie: 'tepání', videoId: 'uc6vQ9N8O4w' },
    { id: 'hru-9', nazev: 'Chvění vidlicí', popis: 'Ohbí mezi palcem a ukazovákem, rychlé vibrace. Tím končí první polovina.', kategorie: 'chvění', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7127e-web.jpg', videoId: 'fqOQF9QZBGo' },
    { id: 'hru-10', nazev: 'Vytřásání hrudníku', popis: 'Spojenýma rukama maséra pod zády, jemné vytřesení hrudníku.', kategorie: 'chvění' },
    { id: 'hru-11', nazev: 'Závěrečné tření plochou dlaní', popis: 'Plochami dlaní, klesající intenzita. Uklidnění.', kategorie: 'tření' },
  ],
};

const bricho: MasazniSestava = {
  slug: 'bricho',
  nazev: 'Masáž břicha',
  emoji: '🫃',
  poziceKlienta: 'Klient leží na zádech, pokrčené nohy',
  kroky: [
    { id: 'bri-1', nazev: 'Tření plochou dlaně (kolem pupku)', popis: 'Okolo pupku i celá plocha. VŽDY ve směru hodinových ručiček!', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6802e-web.jpg' },
    { id: 'bri-2', nazev: 'Tření hřbetem ruky', popis: 'Ruce vloženy v sobě jako „misky", tlak do hřbetů prstů. Po spirále kolem pupku ve směru střevního traktu.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6876e-web.jpg', videoId: '_EnSvi3oqzk' },
    { id: 'bri-3', nazev: 'Tření obtahováním', popis: 'Od stydké spony k hrudníku a od pupku k bočním stranám.', kategorie: 'tření' },
    { id: 'bri-4', nazev: 'Hnětení vlnovité – přímé svaly', popis: 'Přímé břišní svaly od hrudní kosti ke stydké sponě.', kategorie: 'hnětení', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6797e-web.jpg' },
    { id: 'bri-5', nazev: 'Hnětení vlnovité – boční partie', popis: 'Přes tělo na bočních partiích, nakonec celé břicho najednou.', kategorie: 'hnětení' },
    { id: 'bri-6', nazev: 'Roztírání špetkou', popis: 'Prsty se vzájemně dotýkají (jeden bod). Krouživě po spirále ve směru hodinových ručiček.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6981e-web.jpg', videoId: 'WhBlEuqcQxo' },
    { id: 'bri-7', nazev: 'Tepání smetáním', popis: 'Smetání celého břicha. Lokty do stran, „mlýnek".', kategorie: 'tepání' },
    { id: 'bri-8', nazev: 'Tepání konečky prstů („klavír")', popis: 'Distální články prstů jemně poklepávají břišní krajinu jako hra na klavír.', kategorie: 'tepání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6888e-web.jpg' },
    { id: 'bri-9', nazev: 'Chvění dlaní', popis: 'Do stran a rychlým stlačováním/povolováním stěny břišní.', kategorie: 'chvění', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6892e-web.jpg', videoId: '8eMHnwkW8dw' },
    { id: 'bri-10', nazev: 'Závěrečné tření plochou dlaní', popis: 'Plochami dlaní, klesající intenzita. Ve směru hodinových ručiček.', kategorie: 'tření' },
  ],
};

const hk: MasazniSestava = {
  slug: 'horni-koncetiny',
  nazev: 'Masáž horních končetin',
  emoji: '💪',
  poziceKlienta: 'Klient leží na zádech (rameno vsedě)',
  kroky: [
    { id: 'hk-1', nazev: 'Tření celé paže', popis: 'Tření stejnostrannou i druhostrannou rukou celé HK.', kategorie: 'tření' },
    { id: 'hk-2', nazev: 'Prsty – tření nůžkovým hmatem', popis: 'Nůžkový hmat na jednotlivých prstech i všech najednou. Roztírání palci.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7051e-web.jpg' },
    { id: 'hk-3', nazev: 'Hřbet ruky – roztírání patkou, špetkou, palci', popis: 'Roztírání hřbetu ruky patkou, špetkou a palci.', kategorie: 'roztírání' },
    { id: 'hk-4', nazev: 'Dlaň – roztírání patkou, palci a pěstí', popis: 'Roztírání v dlani patkou dlaně, palci a pěstí.', kategorie: 'roztírání', videoId: '7sSzriKFzyo' },
    { id: 'hk-5', nazev: 'Zápěstí – roztírání patkou a špetkou', popis: 'Roztírání kolem zápěstí patkou a špetkou. Tlakové body tahem dolů.', kategorie: 'roztírání' },
    { id: 'hk-6', nazev: 'Předloktí – tření přes ruku', popis: 'Vytírání předloktí přes ruku. Palec v opozici.', kategorie: 'tření', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6989e-web.jpg', videoId: '9BaVNIeuKLw' },
    { id: 'hk-7', nazev: 'Předloktí – hnětení uchopením, vlnovité, pomalým válením, finské', popis: 'Kompletní hnětení předloktí – uchopení, vlnovité, pomalé válení kolmo ke stolu a finské.', kategorie: 'hnětení', videoId: 'KegCABbQerk' },
    { id: 'hk-8', nazev: 'Předloktí – tepání smetáním a chvění rychlým válením', popis: 'Smetání a chvění rychlým válením na předloktí.', kategorie: 'tepání' },
    { id: 'hk-9', nazev: 'Loket – roztírání patkou, špetkou, palci', popis: 'Loket ohnutý k rameni. Roztírání patkou, špetkou a oběma palci (osmičkový hmat).', kategorie: 'roztírání' },
    { id: 'hk-10', nazev: 'Biceps – tření přes ruku, hnětení kompletní, tepání vějířem', popis: 'Ruka ohnutá na břiše. Tření přes ruku, hnětení uchopením, vlnovité a finské, tepání vějířem.', kategorie: 'hnětení' },
    { id: 'hk-11', nazev: 'Triceps – tření přes ruku, hnětení kompletní', popis: 'Ruka natažená na protilehlý bok. Hnětení uchopením, vlnovité, finské, pomalé válení.', kategorie: 'hnětení' },
    { id: 'hk-12', nazev: 'Triceps – tepání vějířem a chvění rychlým válením', popis: 'Tepání vějířem (ruka položená přes tělo), chvění rychlým válením.', kategorie: 'tepání' },
    { id: 'hk-13', nazev: 'Rameno – tření „mileneckým hmatem"', popis: 'Klient sedí. Tření vytíráním přes ruku (milenecký hmat).', kategorie: 'tření' },
    { id: 'hk-14', nazev: 'Rameno – hnětení vlnovité a finské', popis: 'Hnětení vlnovité a finské na rameni.', kategorie: 'hnětení' },
    { id: 'hk-15', nazev: 'Rameno – roztírání patkou a špetkou', popis: 'Roztírání ramenního kloubu patkou a špetkou.', kategorie: 'roztírání' },
    { id: 'hk-16', nazev: 'Rameno – tepání vějířem', popis: 'Vějířovité tepání na rameni. Lokty od těla, díváme se do dlaní.', kategorie: 'tepání', videoId: 'yizR2cMVsuk' },
    { id: 'hk-17', nazev: 'Rameno – chvění vidlicí a vytřásání HK', popis: 'Chvění vidlicí na rameni, poté vytřásání celé horní končetiny.', kategorie: 'chvění', fotka: 'https://masaze.ftk.upol.cz/images/DSC_7127e-web.jpg' },
    { id: 'hk-18', nazev: 'Pasivní pohyby', popis: 'Ohýbání, natahování a kroužení v zápěstí, loketním a ramenním kloubu.', kategorie: 'pasivní pohyby' },
    { id: 'hk-19', nazev: 'Závěrečné tření celé HK', popis: 'Tření celé horní končetiny od prstů k rameni. Klesající intenzita.', kategorie: 'tření' },
  ],
};

const sije: MasazniSestava = {
  slug: 'sije',
  nazev: 'Masáž šíje',
  emoji: '🧣',
  poziceKlienta: 'Klient sedí',
  kroky: [
    { id: 'sij-1', nazev: 'Tření plochou dlaní', popis: 'Plochami dlaní najednou i střídavě. Od hlavy k ramenům.', kategorie: 'tření' },
    { id: 'sij-2', nazev: 'Hnětení vlnovité', popis: 'Vlnovité hnětení od hlavy k rameni. Sestupné snopce m. trapezius.', kategorie: 'hnětení', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6797e-web.jpg', videoId: 'nnGH5kYr-x4' },
    { id: 'sij-3', nazev: 'Roztírání patkou', popis: 'Patkou dlaně po šíji, spirálovitě.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6807e-web.jpg' },
    { id: 'sij-4', nazev: 'Roztírání špetkou (horní partie)', popis: 'Špetkou na horní partii šíje. Prsty se dotýkají (jeden bod).', kategorie: 'roztírání', videoId: 'WhBlEuqcQxo' },
    { id: 'sij-5', nazev: 'Roztírání čtyřmi prsty (dolní partie)', popis: 'Čtyřmi prsty dolní partie po lopatce do strany.', kategorie: 'roztírání' },
    { id: 'sij-6', nazev: 'Roztírání palci (podél krční páteře)', popis: 'Palci podél krční páteře a dolů do lopatek.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6815e-web.jpg', videoId: '8XmTTuzkCCI' },
    { id: 'sij-7', nazev: 'Roztírání prsty do vlasů', popis: 'Prsty pronikají do vlasové části, roztírání pokožky hlavy.', kategorie: 'roztírání' },
    { id: 'sij-8', nazev: 'Uši – hmat vidlička', popis: 'Ukazovák a prostředník kolem uší, mnutí boltců.', kategorie: 'roztírání' },
    { id: 'sij-9', nazev: 'Krk – kolíbka', popis: 'Jemná kolíbka na krku.', kategorie: 'roztírání' },
    { id: 'sij-10', nazev: 'Roztírání malíkovou hranou', popis: 'Malíkovou hranou po šíji a lopatce. Spirálovité tahy.', kategorie: 'roztírání', fotka: 'https://masaze.ftk.upol.cz/images/DSC_6915e-web.jpg', videoId: 'eRz1tOct1Ok' },
    { id: 'sij-11', nazev: 'Tepání smetáním', popis: 'Smetání na šíji. Lokty do stran, „mlýnek".', kategorie: 'tepání', videoId: 'uc6vQ9N8O4w' },
    { id: 'sij-12', nazev: 'Tepání vějířem', popis: 'Vějířovité tepání na šíji.', kategorie: 'tepání', videoId: 'yizR2cMVsuk' },
    { id: 'sij-13', nazev: 'Závěrečné tření plochou dlaní', popis: 'Plochami dlaní, klesající intenzita. Uklidnění.', kategorie: 'tření' },
  ],
};

// Export všech sestav
export const vsechnySestavy: MasazniSestava[] = [
  zada,
  dkZezadu,
  dkZepredu,
  hrudnik,
  bricho,
  hk,
  sije,
];

export function getSestavaBySlug(slug: string): MasazniSestava | undefined {
  return vsechnySestavy.find(s => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return vsechnySestavy.map(s => s.slug);
}
