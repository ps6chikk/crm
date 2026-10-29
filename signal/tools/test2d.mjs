// Test automatisé : ouvre dist/signal.html en 2D forcé dans Chromium (Playwright préinstallé),
// lance une partie et joue au hasard en cliquant les vrais boutons jusqu'à une fin, plusieurs fois.
// Échoue sur toute erreur JavaScript de la page.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { ROOT } from './lib/load.mjs';

function loadPlaywright() {
  const req = createRequire(import.meta.url);
  try { return req('playwright'); } catch (e) { /* essai global */ }
  try { return req(join(process.execPath, '..', '..', 'lib', 'node_modules', 'playwright')); } catch (e) { /* suite */ }
  throw new Error("Playwright introuvable : impossible d'exécuter le test navigateur");
}

export async function runBrowserTest(file, { games = 3, mode = '2d', screenshot = null } = {}) {
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 360, height: 760 }, deviceScaleFactor: 2, hasTouch: true });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)/.test(m.text())) errors.push(m.text()); });
  const q = mode === '2d' ? '?2d&test' : '?test';
  await page.goto(pathToFileURL(file).href + q);
  await page.waitForFunction(() => window.__SIGNAL);
  let screens = 0;
  const steps = () => page.evaluate(() => (window.__SIGNAL.game.state ? window.__SIGNAL.game.state.path.length : 0));
  async function clickChoice() {
    const before = await steps();
    const ready = page.locator('#choices.on button:not([disabled])');
    try { await ready.first().waitFor({ timeout: 4000 }); } catch (e) {
      await page.locator('#card-scroll').click({ position: { x: 30, y: 40 } }); // tap = tout afficher
      await ready.first().waitFor({ timeout: 8000 });
    }
    const n = await ready.count();
    const b = ready.nth(Math.floor(Math.random() * n));
    const cls = (await b.getAttribute('class')) || '';
    if (cls.includes('hold')) {
      const box = await b.boundingBox();
      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.down();
      await page.waitForTimeout(450);
      await page.mouse.up();
      await page.waitForTimeout(500); // délai de garde après une micro-interaction
    } else if (cls.includes('rhythm')) {
      for (let k = 0; k < 10; k++) await b.dispatchEvent('pointerdown');
      await page.waitForTimeout(500);
    } else {
      await b.click();
    }
    screens++;
    // Attendre l'écran suivant avant de recliquer (sinon on vise des boutons en train de disparaître).
    await page.waitForFunction((n) => window.__SIGNAL.game.state.path.length > n, before, { timeout: 8000 });
  }
  try {
    for (let g = 0; g < games; g++) {
      await page.locator('#title.on .title-btns button', { hasText: 'Nouvelle partie' }).click();
      // Une confirmation apparaît s'il existe déjà une partie : on l'attend avant de jouer.
      await page.waitForFunction(() => document.querySelector('.confirm') || !document.body.classList.contains('at-title'));
      const conf = page.locator('.confirm .btn:not(.ghost)');
      if (await conf.count()) await conf.click();
      await page.waitForFunction(() => !document.body.classList.contains('at-title'));
      for (let step = 0; step < 400 && !(await page.evaluate(() => window.__SIGNAL.ended())); step++) await clickChoice();
      if (!(await page.evaluate(() => window.__SIGNAL.ended()))) throw new Error(`partie ${g + 1} : aucune fin atteinte`);
      if (screenshot) await page.screenshot({ path: screenshot });
      await page.locator('#ending.on button', { hasText: 'Écran titre' }).click();
    }
    const gfx = await page.evaluate(() => window.__SIGNAL.mode());
    if (mode === '2d' && gfx !== '2d') throw new Error(`mode graphique attendu 2d, obtenu ${gfx}`);
  } catch (e) {
    const path = await page.evaluate(() => window.__SIGNAL.game.state && window.__SIGNAL.game.state.path.slice(-6).join(' > ')).catch(() => '?');
    throw new Error(`${e.message.split('\n')[0]} · derniers écrans : ${path}`);
  } finally {
    await browser.close();
  }
  if (errors.length) throw new Error('erreurs dans la page : ' + errors.slice(0, 5).join(' | '));
  return { games, screens };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = join(ROOT, 'dist', 'signal.html');
  runBrowserTest(file, { games: 3 })
    .then((r) => console.log(`OK : ${r.games} parties en 2D forcé, ${r.screens} écrans cliqués, aucune erreur.`))
    .catch((e) => { console.error('ÉCHEC : ' + e.message); process.exit(1); });
}
