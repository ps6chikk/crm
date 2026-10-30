// Petits utilitaires d'interface : création d'éléments, vibration, notifications, glitch.
SIG.UI = SIG.UI || {};
SIG.UI.fx = (function () {
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  // Texte des données -> HTML : échappement, puis *italique* et **gras**.
  function rich(s) {
    return esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function vibrate(pattern) {
    const st = SIG.Game && SIG.Game.settings;
    if (!st || !st.vibration) return;
    try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* ignore */ }
  }

  let toastTimer = null;
  function toast(msg, ms) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('on'), ms || 2600);
  }

  function confirmBox(msg, yes, no) {
    const ov = el('div', 'confirm');
    const box = el('div', 'confirm-box');
    box.appendChild(el('p', '', esc(msg)));
    const row = el('div', 'confirm-row');
    const b1 = el('button', 'btn', esc(yes || 'Oui'));
    const b2 = el('button', 'btn ghost', esc(no || 'Annuler'));
    row.append(b2, b1);
    box.appendChild(row);
    ov.appendChild(box);
    document.body.appendChild(ov);
    return new Promise((resolve) => {
      b1.onclick = () => { ov.remove(); resolve(true); };
      b2.onclick = () => { ov.remove(); resolve(false); };
    });
  }

  return { el, esc, rich, vibrate, toast, confirmBox };
})();
