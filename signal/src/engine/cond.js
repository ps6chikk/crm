// Mini-langage de conditions, parsé sans eval.
//   a_promis_humain && !a_alerte_securite
//   rel_remi >= 40 || sk_empathie >= 2
//   visits('o3_hub') >= 2   has('fragments', 'memoire')   count('fragments') >= 4
//   carac == 'franche'
// Les identifiants nus sont résolus par l'état (flags, jauges, relations, compétences).
SIG.cond = (function () {
  const cache = new Map();

  function tokenize(src) {
    const toks = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) { i++; continue; }
      const two = src.slice(i, i + 2);
      if (['&&', '||', '>=', '<=', '==', '!='].includes(two)) { toks.push({ t: 'op', v: two }); i += 2; continue; }
      if ('()!<>,'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue; }
      if (c === "'" || c === '"') {
        const end = src.indexOf(c, i + 1);
        if (end < 0) throw new Error(`chaîne non fermée dans « ${src} »`);
        toks.push({ t: 'str', v: src.slice(i + 1, end) });
        i = end + 1; continue;
      }
      const num = src.slice(i).match(/^-?\d+(\.\d+)?/);
      if (num) { toks.push({ t: 'num', v: parseFloat(num[0]) }); i += num[0].length; continue; }
      const id = src.slice(i).match(/^[A-Za-z_][A-Za-z0-9_]*/);
      if (id) { toks.push({ t: 'id', v: id[0] }); i += id[0].length; continue; }
      throw new Error(`caractère inattendu « ${c} » dans « ${src} »`);
    }
    return toks;
  }

  const FUNCS = ['visits', 'has', 'count', 'seen', 'chance'];

  // Grammaire : or := and ('||' and)* ; and := not ('&&' not)* ; not := '!' not | cmp ;
  // cmp := atom (op atom)? ; atom := num | str | id | id '(' args ')' | '(' or ')'
  function parse(src) {
    const toks = tokenize(src);
    let p = 0;
    const ids = new Set();
    const calls = [];
    const peek = () => toks[p];
    const eat = (v) => {
      const t = toks[p];
      if (!t || t.v !== v) throw new Error(`« ${v} » attendu dans « ${src} »`);
      p++;
    };
    function or() {
      let l = and();
      while (peek() && peek().v === '||') { p++; const a = l, b = and(); l = (S) => a(S) || b(S); }
      return l;
    }
    function and() {
      let l = not();
      while (peek() && peek().v === '&&') { p++; const a = l, b = not(); l = (S) => a(S) && b(S); }
      return l;
    }
    function not() {
      if (peek() && peek().v === '!') { p++; const a = not(); return (S) => !a(S); }
      return cmp();
    }
    function cmp() {
      const l = atom();
      const t = peek();
      if (t && t.t === 'op' && ['>=', '<=', '==', '!=', '<', '>'].includes(t.v)) {
        p++;
        const r = atom();
        switch (t.v) {
          case '>=': return (S) => l(S) >= r(S);
          case '<=': return (S) => l(S) <= r(S);
          case '==': return (S) => l(S) == r(S); // eslint-disable-line eqeqeq
          case '!=': return (S) => l(S) != r(S); // eslint-disable-line eqeqeq
          case '<': return (S) => l(S) < r(S);
          case '>': return (S) => l(S) > r(S);
        }
      }
      return l;
    }
    function atom() {
      const t = toks[p++];
      if (!t) throw new Error(`expression incomplète : « ${src} »`);
      if (t.t === 'num' || t.t === 'str') { const v = t.v; return () => v; }
      if (t.v === '(') { const e = or(); eat(')'); return e; }
      if (t.t === 'id') {
        if (peek() && peek().v === '(') {
          if (!FUNCS.includes(t.v)) throw new Error(`fonction inconnue « ${t.v} » dans « ${src} »`);
          p++;
          const args = [];
          while (peek() && peek().v !== ')') {
            const a = toks[p++];
            if (a.t !== 'str' && a.t !== 'num') throw new Error(`argument littéral attendu dans « ${src} »`);
            args.push(a.v);
            if (peek() && peek().v === ',') p++;
          }
          eat(')');
          calls.push({ fn: t.v, args });
          const fn = t.v;
          return (S) => S.call(fn, args);
        }
        const name = t.v;
        if (name === 'true') return () => true;
        if (name === 'false') return () => false;
        ids.add(name);
        return (S) => S.get(name);
      }
      throw new Error(`jeton inattendu « ${t.v} » dans « ${src} »`);
    }
    const fn = or();
    if (p < toks.length) throw new Error(`jeton en trop « ${toks[p].v} » dans « ${src} »`);
    return { fn, ids: [...ids], calls };
  }

  function compile(src) {
    if (!cache.has(src)) cache.set(src, parse(src));
    return cache.get(src);
  }

  // scope : { get(name), call(fn, args) }
  function test(src, scope) {
    if (src === undefined || src === null || src === '') return true;
    return !!compile(src).fn(scope);
  }

  return { compile, test, FUNCS };
})();
