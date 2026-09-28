/* Ilustrações em carvão, feitas em SVG.
   Cada cena devolve { fundo, camadas[] }: o fundo fica deitado na página
   e as camadas "levantam" como recortes de um livro pop-up. */
(function () {
  const T = '#15120f', T2 = '#2b2622', CZ = '#5b544b', CLARO = '#8d857a';
  const CARTAO = '#ebe5d6', PAPEL = '#d6cfbe', SG = '#6e0808', SG2 = '#a3110d', OLHO = '#f3ecd2';

  /* ---------- acaso com semente (cada cena sempre igual) ---------- */
  let semente = 1;
  function aleat() {
    semente = (semente + 0x6D2B79F5) | 0;
    let t = Math.imul(semente ^ (semente >>> 15), 1 | semente);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const r = (a, b) => a + aleat() * (b - a);
  const f = (n) => Math.round(n * 10) / 10;
  let uid = 0;
  const novoId = (p) => `${p}${++uid}`;

  /* ---------- traços de carvão ---------- */
  function zigue(x, y, w, h, o = {}) {
    const ang = ((o.ang ?? -35) * Math.PI) / 180, passo = o.passo ?? 6, jit = o.jit ?? 2;
    const cx = x + w / 2, cy = y + h / 2, D = Math.hypot(w, h) / 2 + 6;
    const c = Math.cos(ang), s = Math.sin(ang);
    const P = (u, v) => `${f(cx + u * c - v * s)},${f(cy + u * s + v * c)}`;
    let d = '', lado = -1;
    for (let v = -D; v <= D; v += passo / 2) {
      d += (d ? 'L' : 'M') + P(lado * (D + r(-jit * 5, jit * 2)), v + r(-jit, jit));
      lado *= -1;
    }
    return `<path d="${d}" fill="none" stroke="${o.cor || T}" stroke-width="${o.larg || 2}" stroke-opacity="${o.op ?? 0.8}" stroke-linejoin="round"/>`;
  }
  function hachura(d, box, o = {}) {
    const id = novoId('cp');
    return `<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})"${o.semFiltro ? '' : ' filter="url(#aspero)"'}>${zigue(box[0], box[1], box[2], box[3], o)}</g>`;
  }
  function hachuraRet(x, y, w, h, o = {}) {
    return hachura(`M${x},${y}h${w}v${h}h${-w}Z`, [x, y, w, h], o);
  }
  function manchas(n, box, o = {}) {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += `<ellipse cx="${f(r(box[0], box[0] + box[2]))}" cy="${f(r(box[1], box[1] + box[3]))}" rx="${f(r(o.min || 30, o.max || 120))}" ry="${f(r((o.min || 30) * 0.7, (o.max || 120) * 0.7))}" fill="${o.cor || T}" opacity="${f(r(o.opMin ?? 0.05, o.opMax ?? 0.2) * 100) / 100}"/>`;
    }
    return `<g filter="url(#borrao)">${s}</g>`;
  }
  function riscos(n, box, o = {}) {
    let d = '';
    for (let i = 0; i < n; i++) {
      let x = r(box[0], box[0] + box[2]), y = r(box[1], box[1] + box[3]);
      d += `M${f(x)},${f(y)}`;
      let a = o.ang != null ? o.ang : r(0, Math.PI * 2);
      const k = Math.floor(r(2, 6));
      for (let j = 0; j < k; j++) {
        a += r(-(o.curva ?? 1.2), o.curva ?? 1.2);
        const L = r(o.min || 10, o.max || 40);
        x += Math.cos(a) * L; y += Math.sin(a) * L;
        d += `L${f(x)},${f(y)}`;
      }
    }
    return `<path d="${d}" fill="none" stroke="${o.cor || T}" stroke-width="${o.larg || 1.4}" stroke-opacity="${o.op || 0.5}" stroke-linecap="round" stroke-linejoin="round" filter="url(#aspero)"/>`;
  }
  const carvao = (inner) => `<g filter="url(#carvao)">${inner}</g>`;
  const aspero = (inner) => `<g filter="url(#aspero)">${inner}</g>`;
  const recorte = (inner, cls = '') => `<g class="recorte ${cls}" filter="url(#corte)">${inner}</g>`;
  const legenda = (txt, x, y, o = {}) =>
    `<text x="${x}" y="${y}" class="legenda-arte" font-size="${o.tam || 22}" fill="${o.cor || T}" transform="rotate(${o.rot ?? -4} ${x} ${y})" text-anchor="${o.ancora || 'start'}" filter="url(#aspero)">${txt}</text>`;

  function dedos(x, y, ang, len = 24, larg = 3.4, cor = T, abre = 0.2) {
    let d = '';
    for (let k = -1.5; k <= 1.5; k += 1) {
      const a = ang + k * abre, L = len * (1 - Math.abs(k) * 0.12);
      const mx = x + Math.cos(a) * L * 0.55 + Math.cos(a + 1.57) * 2, my = y + Math.sin(a) * L * 0.55 + Math.sin(a + 1.57) * 2;
      d += `M${f(x)},${f(y)} Q${f(mx)},${f(my)} ${f(x + Math.cos(a) * L)},${f(y + Math.sin(a) * L)}`;
    }
    return `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${larg}" stroke-linecap="round"/>`;
  }
  const braco = (d, larg = 13, cor = T) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${larg}" stroke-linecap="round" stroke-linejoin="round"/>`;

  function gota(x, y, len, larg = 3, cor = SG2) {
    return `<path d="M${f(x - larg)},${f(y)} C${f(x - larg)},${f(y + len * 0.6)} ${f(x - larg * 1.5)},${f(y + len)} ${f(x)},${f(y + len + larg * 1.4)} C${f(x + larg * 1.5)},${f(y + len)} ${f(x + larg)},${f(y + len * 0.6)} ${f(x + larg)},${f(y)} Z" fill="${cor}"/>`;
  }
  function respingo(cx, cy, R, n = 18, cor = SG2) {
    let s = `<ellipse cx="${cx}" cy="${cy}" rx="${f(R * 0.55)}" ry="${f(R * 0.4)}" fill="${cor}"/>`;
    for (let i = 0; i < n; i++) {
      const a = r(0, Math.PI * 2), dd = r(R * 0.3, R * 1.4), rr = r(1.5, R * 0.14);
      const x = cx + Math.cos(a) * dd, y = cy + Math.sin(a) * dd * 0.8;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="${cor}"/>`;
      if (aleat() < 0.4) s += `<path d="M${f(cx + Math.cos(a) * R * 0.3)},${f(cy + Math.sin(a) * R * 0.25)} L${f(x)},${f(y)}" stroke="${cor}" stroke-width="${f(rr * 0.9)}" stroke-linecap="round"/>`;
    }
    return `<g filter="url(#sangue)">${s}</g>`;
  }

  /* ---------- o gato, de frente ---------- */
  const GATO_CORPO = 'M40,0 L80,50 Q100,44 120,50 L160,0 L154,60 Q172,92 150,118 L166,128 L142,133 C170,172 186,240 176,296 L24,296 C14,240 30,172 58,133 L34,128 L50,118 Q28,92 46,60 Z';
  const GATO_RABO = 'M168,282 C236,292 246,222 208,196 C202,192 195,199 200,205 C228,232 218,272 166,294 Z';
  const CABECA_GATO = 'M40,0 L80,50 Q100,44 120,50 L160,0 L154,60 Q176,96 152,126 L170,140 L136,142 Q100,162 64,142 L30,140 L48,126 Q24,96 46,60 Z';

  function olhoGato(x, y, tipo, o = {}) {
    const alm = `M${x - 14},${y} Q${x},${y - 13} ${x + 14},${y} Q${x},${y + 10} ${x - 14},${y} Z`;
    const brilho = o.brilho ? ` data-brilho="${o.brilho}"` : '';
    if (tipo === 'fenda') return `<path d="${alm}" fill="${OLHO}"${brilho}/><ellipse cx="${x}" cy="${y}" rx="2.6" ry="8.5" fill="${T}"/>`;
    if (tipo === 'ponto') return `<path d="${alm}" fill="${OLHO}"${brilho}/><circle cx="${x + (o.dx || 0)}" cy="${y + (o.dy || 0)}" r="2.6" fill="${T}" class="${o.clsPupila || ''}"/>`;
    if (tipo === 'arregalado') return `<circle cx="${x}" cy="${y}" r="13" fill="${OLHO}"${brilho}/><circle cx="${x}" cy="${y}" r="2.4" fill="${T}"/>`;
    if (tipo === 'fogo') return `<path d="${alm}" fill="#ffb13b" filter="url(#brilho)" data-brilho="fogo"/><path d="${alm}" fill="#ffe7a8" transform="translate(${x} ${y}) scale(.55) translate(${-x} ${-y})"/><ellipse cx="${x}" cy="${y}" rx="2" ry="8" fill="${SG}"/>`;
    if (tipo === 'ferido') {
      let s = `<path d="M${x - 14},${y} Q${x},${y - 11} ${x + 14},${y} Q${x},${y + 13} ${x - 14},${y} Z" fill="#1d0202"/><path d="M${x - 14},${y} Q${x},${y - 11} ${x + 14},${y}" fill="none" stroke="${SG2}" stroke-width="3"/>`;
      s += gota(x - 6, y + 6, 58, 3.2) + gota(x + 3, y + 8, 96, 4) + gota(x + 10, y + 4, 38, 2.4) + gota(x - 12, y + 2, 24, 2);
      return s;
    }
    if (tipo === 'cicatriz') return `<path d="M${x - 14},${y + 1} Q${x},${y + 5} ${x + 14},${y - 1}" fill="none" stroke="${CLARO}" stroke-width="3" stroke-linecap="round"/><path d="M${x - 8},${y - 5} l3,11 M${x},${y - 4} l1,11 M${x + 8},${y - 5} l-2,11" stroke="${CLARO}" stroke-width="1.6" stroke-linecap="round"/>`;
    return '';
  }

  function gatoFrente(cx, base, s, o = {}) {
    const x = cx - 100 * s, y = base - 300 * s;
    let corpo = `<path d="${GATO_RABO}" fill="${T}"/><path d="${GATO_CORPO}" fill="${T}"/>`;
    // pelos eriçados nas bordas
    corpo += `<path d="${GATO_CORPO}" fill="none" stroke="${T}" stroke-width="7" stroke-dasharray="2 5" />`;
    let g = carvao(corpo);
    g += `<path d="M84,205 C80,240 78,270 80,296 M116,205 C120,240 122,270 120,296" fill="none" stroke="#3a332d" stroke-width="3" stroke-linecap="round"/>`;
    g += `<path d="M70,289 q8,-10 16,0 M114,289 q8,-10 16,0" fill="none" stroke="#3a332d" stroke-width="2.4"/>`;
    // mancha do peito
    if (o.mancha) g += manchaPeito(o.mancha);
    // bigodes (fora do recorte de papel, para não virarem tiras brancas)
    const bigodes = `<path d="M72,110 L14,98 M72,115 L12,120 M74,119 L22,138 M128,110 L186,98 M128,115 L188,120 M126,119 L178,138" stroke="${o.corBigode || CLARO}" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>`;
    // focinho
    g += `<path d="M93,104 L107,104 L100,112 Z" fill="#3d352f"/>`;
    if (o.boca === 'aberta') g += bocaAberta(100, 112);
    else g += `<path d="M100,112 Q94,121 87,118 M100,112 Q106,121 113,118" fill="none" stroke="#4a423a" stroke-width="2"/>`;
    const tipoE = o.olhoE || 'fenda', tipoD = o.olhoD || 'fenda';
    g += olhoGato(78, 90, tipoE, { brilho: o.brilhoE, ...(o.olhoOpts || {}) }) + olhoGato(122, 90, tipoD, { brilho: o.brilhoD, ...(o.olhoOpts || {}) });
    const tr = `translate(${f(x)} ${f(y)}) scale(${s})`;
    const out = `<g transform="${tr}">${g}</g>`, fios = `<g transform="${tr}">${bigodes}</g>`;
    return (o.recorte === false ? out : recorte(out)) + fios;
  }
  function bocaAberta(x, y) {
    let s = `<path d="M${x - 17},${y} Q${x},${y + 40} ${x + 17},${y} Q${x},${y + 7} ${x - 17},${y} Z" fill="${SG2}"/>`;
    s += `<path d="M${x - 15},${y + 1} L${x - 11},${y + 16} L${x - 8},${y + 3} Z M${x + 15},${y + 1} L${x + 11},${y + 16} L${x + 8},${y + 3} Z M${x - 5},${y + 4} l2,6 l2,-6 Z M${x + 1},${y + 4} l2,6 l2,-6 Z" fill="${OLHO}"/>`;
    s += `<path d="M${x - 10},${y + 26} Q${x},${y + 34} ${x + 10},${y + 26}" fill="none" stroke="${SG}" stroke-width="3"/>`;
    return s;
  }
  function manchaPeito(tipo) {
    const blob = `<path d="M76,168 C66,190 72,224 92,238 C106,246 124,232 128,212 C132,192 124,172 110,165 C98,160 84,161 76,168 Z" fill="#e4ddcc" filter="url(#aspero)"/>` +
      `<path d="M84,176 l6,-4 M96,170 l5,3 M112,180 l4,6 M88,226 l7,2" stroke="${CLARO}" stroke-width="2"/>`;
    const forca = `<g fill="none" stroke="#efe8d6" stroke-width="7" stroke-linecap="round" filter="url(#aspero)"><path d="M84,248 L84,160 M76,162 L132,162 M84,184 L106,162 M124,162 L124,184 M68,248 L102,248"/><ellipse cx="124" cy="195" rx="7.5" ry="10.5" stroke-width="5"/></g>`;
    if (tipo === 'indefinida') return blob;
    if (tipo === 'forca') return `<g class="forca-peito">${forca}</g>`;
    if (tipo === 'transforma') return `<g class="mancha-a">${blob}</g><g class="mancha-b">${forca}</g>`;
    return '';
  }

  /* ---------- gato de perfil (andando / sombra) ---------- */
  const GATO_PERFIL = 'M20,60 C20,40 60,35 110,38 C140,40 160,35 170,28 L176,6 L186,22 L196,4 L199,30 C214,36 216,48 205,54 C196,58 186,58 180,56 C172,64 166,72 164,82 L170,120 L160,120 L150,86 C130,88 92,88 62,86 L64,120 L54,120 L44,84 C34,80 26,72 20,60 Z';
  const RABO_PERFIL = 'M24,60 C4,52 -4,30 6,8 C8,4 13,6 12,10 C6,30 12,46 30,52 Z';
  function gatoPerfil(x, y, s, o = {}) {
    const flip = o.espelho ? `translate(${f(220 * s)} 0) scale(-1 1)` : '';
    let g = carvao(`<path d="${RABO_PERFIL}" fill="${o.cor || T}"/><path d="${GATO_PERFIL}" fill="${o.cor || T}"/><path d="${GATO_PERFIL}" fill="none" stroke="${o.cor || T}" stroke-width="6" stroke-dasharray="2 5"/>`);
    if (o.olho !== false) g += `<path d="M184,36 q6,-5 12,0 q-6,4 -12,0 Z" fill="${OLHO}"${o.brilho ? ` data-brilho="${o.brilho}"` : ''}/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) ${flip} scale(${s})">${g}</g>`;
  }

  /* ---------- gato enforcado ---------- */
  function gatoEnforcado(x, y, s, o = {}) {
    // x,y = ponto onde a corda aperta o pescoço
    const cor = o.cor || T;
    const topo = o.cordaTopo != null ? f((o.cordaTopo - (y - 50 * s)) / s) : -400;
    let g = `<path d="M40,${topo} L40,48" stroke="${o.corda || '#6b5a44'}" stroke-width="3.2" fill="none"/>`;
    g += `<path d="M31,44 q9,10 18,0 M34,52 q6,5 12,0" stroke="${o.corda || '#6b5a44'}" stroke-width="3" fill="none"/>`;
    const corpo = `<path d="M22,6 L30,24 Q40,20 50,24 L58,6 L62,30 Q64,44 52,52 L53,60 C64,82 66,132 60,166 L64,204 L56,206 L50,174 L45,178 L44,208 L36,208 L33,174 C18,140 16,90 27,60 L28,52 Q16,44 18,30 Z" fill="${cor}"/>` +
      `<path d="M30,70 L24,120 L28,122 M50,70 L56,116 L52,118" stroke="${cor}" stroke-width="7" stroke-linecap="round" fill="none"/>` +
      `<path d="M40,168 C34,190 48,204 42,236 C40,244 36,246 36,240" stroke="${cor}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
    g += o.relevo ? corpo : carvao(corpo);
    if (!o.relevo) g += `<path d="M31,36 l10,4 M33,40 l8,-4" stroke="${CLARO}" stroke-width="2"/><path d="M45,34 l8,6 M53,34 l-8,6" stroke="${CLARO}" stroke-width="2"/>`;
    return `<g transform="translate(${f(x - 40 * s)} ${f(y - 50 * s)}) scale(${s})">${g}</g>`;
  }

  /* ---------- o homem ---------- */
  const HOMEM_CASACO = 'M58,88 Q80,98 102,88 L128,104 C136,190 140,270 148,350 L106,354 L102,432 L116,440 L86,440 L86,356 L74,356 L74,440 L44,440 L58,432 L54,354 L12,350 C20,270 24,190 32,104 Z';
  function cabecaHomem(o = {}) {
    let s = `<path d="M58,56 C56,30 66,18 80,18 C94,18 104,30 102,56 C102,76 92,90 80,90 C68,90 58,76 58,56 Z" fill="${T}"/>`;
    s += `<path d="M64,54 C64,38 70,30 80,30 C90,30 96,38 96,54 C96,70 90,82 80,82 C70,82 64,70 64,54 Z" fill="${CARTAO}"/>`;
    s += `<ellipse cx="73" cy="52" rx="6" ry="8" fill="${CZ}" opacity=".6"/><ellipse cx="87" cy="52" rx="6" ry="8" fill="${CZ}" opacity=".6"/>`;
    if (o.olhos === 'arregalados') s += `<circle cx="73" cy="52" r="4.5" fill="${OLHO}" stroke="${T}" stroke-width="1.4"/><circle cx="87" cy="52" r="4.5" fill="${OLHO}" stroke="${T}" stroke-width="1.4"/><circle cx="73" cy="52" r="1.3" fill="${T}"/><circle cx="87" cy="52" r="1.3" fill="${T}"/>`;
    else s += `<ellipse cx="73" cy="53" rx="4" ry="5.5" fill="${T}"/><ellipse cx="87" cy="53" rx="4" ry="5.5" fill="${T}"/>`;
    s += o.boca === 'grito' ? `<ellipse cx="80" cy="71" rx="4" ry="6" fill="${T}"/>` : `<path d="M73,71 Q80,68 87,71" fill="none" stroke="${T}" stroke-width="2"/>`;
    s += `<path d="M56,50 L44,30 L58,34 L52,10 L68,24 L72,2 L80,20 L90,0 L93,22 L108,10 L101,32 L114,34 L104,50 C100,36 92,28 80,28 C68,28 60,36 56,50 Z" fill="${T}"/>`;
    if (o.lagrimas) s += `<path d="M72,60 C71,72 73,80 71,92 M88,60 C89,70 87,82 89,94" stroke="${OLHO}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    return s;
  }
  function homem(cx, base, s, pose = 'baixo', o = {}) {
    const x = cx - 80 * s, y = base - 440 * s;
    let g = carvao(`<path d="${HOMEM_CASACO}" fill="${T}"/>`);
    g += `<path d="M68,88 L80,110 L92,88 Z" fill="${CARTAO}"/><path d="M80,110 L80,300" stroke="${CZ}" stroke-width="1.4" opacity=".6"/>`;
    g += hachura(HOMEM_CASACO, [0, 90, 160, 270], { cor: '#4b433b', passo: 7, larg: 1.3, op: 0.55, ang: -60 });
    let bracos = '';
    if (pose === 'baixo') bracos = braco('M34,108 C26,170 22,220 22,268') + braco('M126,108 C134,170 138,220 138,268') + dedos(22, 268, 1.62) + dedos(138, 268, 1.52);
    if (pose === 'rosto') bracos = braco('M34,108 L22,184 L66,74') + braco('M126,108 L138,184 L94,74') + dedos(66, 74, -1.2, 26) + dedos(94, 74, -1.9, 26);
    if (pose === 'erguido') bracos = braco('M34,108 L18,190 L28,256') + dedos(28, 256, 1.5) + braco('M126,106 L152,36 L146,-36') + dedos(146, -36, -1.9, 18);
    if (pose === 'garrafa') bracos = braco('M34,108 L14,186 L30,250') + dedos(30, 250, 1.4) + braco('M126,106 L162,52 L160,-6') + garrafa(146, -70, 0.9, -12);
    if (pose === 'bengala') bracos = braco('M34,108 C26,170 22,220 22,268') + dedos(22, 268, 1.62) + braco('M126,108 L176,160 L226,186') + dedos(226, 186, 0.35, 18) + `<path d="M226,186 L${o.bengalaX ?? 330},${o.bengalaY ?? 250}" stroke="${T}" stroke-width="6" stroke-linecap="round"/><path d="M220,180 q-10,-14 6,-18" fill="none" stroke="${T}" stroke-width="6" stroke-linecap="round"/>`;
    if (pose === 'horror') bracos = braco('M34,108 L-4,120 L-14,40') + braco('M126,108 L164,120 L174,40') + dedos(-14, 40, -1.8, 28, 3.4, T, 0.3) + dedos(174, 40, -1.35, 28, 3.4, T, 0.3);
    if (pose === 'cruzados') bracos = braco('M34,108 L44,176 L122,160') + braco('M126,108 L116,182 L40,166');
    if (pose === 'trolha') bracos = braco('M34,108 C26,170 22,220 22,268') + dedos(22, 268, 1.62) + braco('M126,108 L150,190 L196,200') + `<path d="M196,200 L214,196 L240,212 L214,222 Z" fill="${CZ}" stroke="${T}" stroke-width="2"/>`;
    if (pose === 'vazio') bracos = braco('M34,108 C26,170 20,220 16,262') + braco('M126,108 C140,160 150,200 170,236') + dedos(16, 262, 1.7) + dedos(170, 236, 1.1);
    g += bracos + cabecaHomem(o) + (o.extra || '');
    const tr = o.inclina ? ` rotate(${o.inclina} 80 440)` : '';
    const out = `<g transform="translate(${f(x)} ${f(y)}) scale(${s})${tr}">${g}</g>`;
    return o.recorte === false ? out : recorte(out);
  }
  function garrafa(x, y, s, rot = 0) {
    return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M8,0 h12 v22 c10,8 14,18 14,30 v58 c0,6 -4,9 -10,9 h-20 c-6,0 -10,-3 -10,-9 v-58 c0,-12 4,-22 14,-30 Z" fill="${T2}" stroke="${T}" stroke-width="2.5"/><rect x="0" y="62" width="28" height="28" fill="${CARTAO}"/><text x="14" y="82" font-size="11" text-anchor="middle" class="legenda-arte" fill="${T}">GIM</text></g>`;
  }

  /* ---------- a esposa ---------- */
  const MULHER_VESTIDO = 'M64,92 Q80,100 96,92 L114,106 C116,140 112,170 106,196 C128,260 146,340 156,436 L4,436 C14,340 32,260 54,196 C48,170 44,140 46,106 Z';
  function cabecaMulher(o = {}) {
    let s = `<circle cx="80" cy="20" r="14" fill="${T}"/>`;
    s += `<path d="M60,58 C58,34 66,26 80,26 C94,26 102,34 100,58 C100,78 92,92 80,92 C68,92 60,78 60,58 Z" fill="${T}"/>`;
    s += `<path d="M65,58 C65,42 71,36 80,36 C89,36 95,42 95,58 C95,74 89,86 80,86 C71,86 65,74 65,58 Z" fill="${o.pele || CARTAO}"/>`;
    s += `<path d="M60,58 C60,40 68,32 80,32 C92,32 100,40 100,58 C96,46 88,40 80,40 C72,40 64,46 60,58 Z" fill="${T}"/>`;
    if (o.olhos === 'fechados') s += `<path d="M69,58 q5,3 9,0 M83,58 q5,3 9,0" stroke="${T}" stroke-width="2" fill="none"/>`;
    else if (o.olhos === 'ocos') s += `<ellipse cx="73" cy="58" rx="6" ry="7.5" fill="${T}"/><ellipse cx="88" cy="58" rx="6" ry="7.5" fill="${T}"/>`;
    else s += `<ellipse cx="74" cy="58" rx="5" ry="6.5" fill="${CZ}" opacity=".55"/><ellipse cx="87" cy="58" rx="5" ry="6.5" fill="${CZ}" opacity=".55"/><ellipse cx="74" cy="59" rx="3" ry="4" fill="${T}"/><ellipse cx="87" cy="59" rx="3" ry="4" fill="${T}"/>`;
    if (o.boca === 'aberta') s += `<path d="M74,72 Q80,90 86,72 Q80,76 74,72 Z" fill="${T}"/>`;
    else s += `<path d="M75,75 Q80,77 85,75" fill="none" stroke="${SG}" stroke-width="2"/>`;
    if (o.ferida) s += `<path d="M84,30 L90,48 L86,50" fill="none" stroke="${SG}" stroke-width="5"/>` + gota(88, 44, 40, 2.4, SG) + gota(94, 40, 62, 2.2, SG) + gota(71, 40, 34, 1.8, SG);
    return s;
  }
  function mulher(cx, base, s, pose = 'baixo', o = {}) {
    const x = cx - 80 * s, y = base - 436 * s;
    let g = carvao(`<path d="${MULHER_VESTIDO}" fill="${o.vestido || T}"/>`);
    g += hachura(MULHER_VESTIDO, [0, 190, 160, 250], { cor: '#4b433b', passo: 8, larg: 1.2, op: 0.5, ang: 70 });
    g += `<path d="M70,92 Q80,104 90,92" fill="none" stroke="${CARTAO}" stroke-width="3"/>`;
    let b = '';
    if (pose === 'baixo') b = braco('M48,108 C40,170 38,210 42,256', 11) + braco('M112,108 C120,170 122,210 118,256', 11) + dedos(42, 256, 1.5, 20, 3) + dedos(118, 256, 1.6, 20, 3);
    if (pose === 'boca') b = braco('M48,108 C40,170 38,210 42,256', 11) + dedos(42, 256, 1.5, 20, 3) + braco('M112,108 L130,170 L94,82', 11) + dedos(94, 82, -2.2, 16, 3);
    if (pose === 'segura') b = braco('M48,108 L24,150 L20,210', 11) + dedos(20, 210, 1.6, 18, 3) + braco('M60,104 L60,30 L22,-24', 11) + dedos(22, -24, -2.4, 20, 3.2);
    if (pose === 'pendente') b = braco('M50,108 C44,170 44,220 50,270', 10, o.vestido || T) + braco('M110,108 C116,170 116,220 110,270', 10, o.vestido || T) + dedos(50, 270, 1.5, 24, 3, T2) + dedos(110, 270, 1.6, 24, 3, T2);
    g += b + cabecaMulher(o);
    if (o.extra) g += o.extra;
    const tr = o.gira ? ` rotate(${o.gira} ${o.giraX ?? 80} ${o.giraY ?? 436})` : '';
    const out = `<g transform="translate(${f(x)} ${f(y)}) scale(${s})${tr}">${g}</g>`;
    return o.recorte === false ? out : recorte(out);
  }

  /* ---------- cenários ---------- */
  function tijolos(x, y, w, h, o = {}) {
    const bh = o.bh || 26, bw = o.bw || 62;
    let s = '';
    for (let row = 0, yy = y; yy < y + h - 2; row++, yy += bh) {
      for (let xx = x - (row % 2 ? bw / 2 : 0); xx < x + w; xx += bw) {
        const x0 = Math.max(x, xx), x1 = Math.min(x + w, xx + bw - 3), hh = Math.min(bh - 3, y + h - yy);
        if (x1 - x0 < 5 || hh < 4) continue;
        const tom = o.tons ? o.tons[Math.floor(r(0, o.tons.length))] : `rgba(21,18,15,${f(r(0.05, 0.28) * 100) / 100})`;
        s += `<rect x="${f(x0)}" y="${f(yy)}" width="${f(x1 - x0)}" height="${f(hh)}" fill="${tom}" stroke="${T}" stroke-width="1.3" stroke-opacity=".55"/>`;
      }
    }
    return aspero(s);
  }
  function pedras(x, y, w, h, o = {}) {
    let s = '';
    const lh = o.lh || 58;
    for (let yy = y, row = 0; yy < y + h; yy += lh, row++) {
      s += `<path d="M${x},${f(yy + r(-3, 3))} L${x + w},${f(yy + r(-3, 3))}" />`;
      for (let xx = x + (row % 2 ? 40 : 0); xx < x + w; xx += r(80, 140)) s += `<path d="M${f(xx)},${f(yy)} L${f(xx + r(-4, 4))},${f(yy + lh)}"/>`;
    }
    return `<g stroke="${o.cor || T2}" stroke-width="2" stroke-opacity="${o.op || 0.4}" fill="none" filter="url(#aspero)">${s}</g>`;
  }
  function chao(y, o = {}) {
    return `<rect x="0" y="${y}" width="600" height="${720 - y}" fill="${o.cor || '#8a8272'}"/>` + hachuraRet(0, y, 600, 720 - y, { ang: -8, passo: 9, larg: 1.6, op: 0.45 }) + `<path d="M0,${y} L600,${y + r(-6, 6)}" stroke="${T}" stroke-width="4" filter="url(#aspero)"/>`;
  }
  function vinheta(forca = 0.5) {
    return `<rect x="0" y="0" width="600" height="720" fill="url(#vinheta)" opacity="${forca}"/>`;
  }
  function escuro(x, y, w, h, op = 0.85) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${T}" opacity="${op}"/>` + hachuraRet(x, y, w, h, { passo: 5, larg: 2.4, op: 0.5, cor: '#000' });
  }
  function arvore(x, y, len, ang, w, prof) {
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len, w2 = w * 0.62;
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    const mx = (x + x2) / 2 + nx * r(-len * 0.14, len * 0.14), my = (y + y2) / 2 + ny * r(-len * 0.14, len * 0.14);
    let d = `M${f(x + (nx * w) / 2)},${f(y + (ny * w) / 2)} Q${f(mx + (nx * (w + w2)) / 4)},${f(my + (ny * (w + w2)) / 4)} ${f(x2 + (nx * w2) / 2)},${f(y2 + (ny * w2) / 2)} L${f(x2 - (nx * w2) / 2)},${f(y2 - (ny * w2) / 2)} Q${f(mx - (nx * (w + w2)) / 4)},${f(my - (ny * (w + w2)) / 4)} ${f(x - (nx * w) / 2)},${f(y - (ny * w) / 2)} Z`;
    if (prof > 0) {
      const n = prof > 3 ? 2 : aleat() < 0.5 ? 2 : 3;
      for (let i = 0; i < n; i++) d += arvore(x2, y2, len * r(0.58, 0.8), ang + r(-0.75, 0.75), w2, prof - 1);
    }
    return d;
  }
  function chama(x, y, h, w) {
    return `M${f(x)},${f(y)} C${f(x - w)},${f(y - h * 0.3)} ${f(x - w * 0.3)},${f(y - h * 0.6)} ${f(x + r(-6, 6))},${f(y - h)} C${f(x + w * 0.2)},${f(y - h * 0.7)} ${f(x + w * 0.2)},${f(y - h * 0.55)} ${f(x + w * 0.45)},${f(y - h * 0.62)} C${f(x + w)},${f(y - h * 0.3)} ${f(x + w * 0.6)},${f(y - h * 0.1)} ${f(x)},${f(y)} Z`;
  }
  function fogueira(x, y, n, h, w) {
    let a = '', b = '';
    for (let i = 0; i < n; i++) {
      const xx = x + r(-w, w), hh = h * r(0.5, 1.1), ww = hh * r(0.25, 0.4);
      a += `<path class="chama" style="animation-delay:${f(r(0, 1.2))}s" d="${chama(xx, y, hh, ww)}" fill="${SG2}"/>`;
      b += `<path class="chama" style="animation-delay:${f(r(0, 1.2))}s" d="${chama(xx, y, hh * 0.55, ww * 0.55)}" fill="#e0a13a" opacity=".85"/>`;
    }
    return `<g filter="url(#aspero)">${a}${b}</g>`;
  }
  function policial(cx, base, s, o = {}) {
    const x = cx - 50 * s, y = base - 340 * s;
    let g = `<path d="M34,70 Q50,78 66,70 L84,84 C90,160 92,220 96,270 L70,272 L66,340 L56,340 L54,274 L46,274 L44,340 L34,340 L30,272 L4,270 C8,220 10,160 16,84 Z" fill="${T}"/>`;
    g += `<path d="M34,58 C32,40 40,30 50,30 C60,30 68,40 66,58 C66,70 58,76 50,76 C42,76 34,70 34,58 Z" fill="${T}"/>`;
    g += `<rect x="30" y="-8" width="40" height="40" fill="${T}"/><rect x="22" y="28" width="56" height="6" fill="${T}"/>`;
    if (o.rosto) g += `<ellipse cx="${o.rosto === 'esq' ? 44 : 56}" cy="56" rx="9" ry="12" fill="${CARTAO}"/><circle cx="${o.rosto === 'esq' ? 41 : 53}" cy="54" r="2.2" fill="${T}"/><circle cx="${o.rosto === 'esq' ? 49 : 60}" cy="54" r="2.2" fill="${T}"/>`;
    g += `<path d="M42,90 l3,5 M42,120 l3,5 M42,150 l3,5" stroke="${CZ}" stroke-width="3"/>`;
    if (o.lanterna) g += braco('M80,90 L100,150 L110,180', 10) + `<path d="M110,180 L110,190" stroke="${T}" stroke-width="3"/><rect x="100" y="190" width="22" height="30" rx="3" fill="${T}"/><rect x="104" y="195" width="14" height="20" fill="#f0d68a" data-brilho="lamp"/><path d="M98,190 h26 l-4,-8 h-18 Z" fill="${T}"/>`;
    if (o.bracos === 'cima') g += braco('M18,86 L-6,40 L-10,-10', 10) + dedos(-10, -10, -1.8, 18, 3) + braco('M82,86 L104,36 L110,-14', 10) + dedos(110, -14, -1.3, 18, 3);
    const out = `<g transform="translate(${f(x)} ${f(y)}) scale(${s})${o.espelho ? ' translate(100 0) scale(-1 1)' : ''}">${carvao(g)}</g>`;
    return out;
  }
  function barril(cx, cy, w, h, rotulo) {
    let s = `<path d="M${cx - w / 2},${cy - h / 2} C${cx - w / 2 - 14},${cy} ${cx - w / 2 - 14},${cy} ${cx - w / 2},${cy + h / 2} L${cx + w / 2},${cy + h / 2} C${cx + w / 2 + 14},${cy} ${cx + w / 2 + 14},${cy} ${cx + w / 2},${cy - h / 2} Z" fill="#3a322b"/>`;
    for (let i = 1; i < 6; i++) s += `<path d="M${f(cx - w / 2 + (w * i) / 6)},${cy - h / 2} C${f(cx - w / 2 + (w * i) / 6 + (i < 3 ? -5 : i > 3 ? 5 : 0))},${cy} ${f(cx - w / 2 + (w * i) / 6 + (i < 3 ? -5 : i > 3 ? 5 : 0))},${cy} ${f(cx - w / 2 + (w * i) / 6)},${cy + h / 2}" stroke="${T}" stroke-width="1.5" fill="none" opacity=".7"/>`;
    s += `<path d="M${cx - w / 2 - 6},${cy - h * 0.22} Q${cx},${cy - h * 0.18} ${cx + w / 2 + 6},${cy - h * 0.22} M${cx - w / 2 - 6},${cy + h * 0.22} Q${cx},${cy + h * 0.26} ${cx + w / 2 + 6},${cy + h * 0.22}" stroke="${T}" stroke-width="7" fill="none"/>`;
    s += `<ellipse cx="${cx}" cy="${cy - h / 2}" rx="${w / 2}" ry="12" fill="#4a4036" stroke="${T}" stroke-width="3"/>`;
    if (rotulo) s += `<text x="${cx}" y="${cy + 8}" font-size="26" text-anchor="middle" class="legenda-arte" fill="${CARTAO}" opacity=".85">${rotulo}</text>`;
    return carvao(s);
  }
  function barrilDeitado(cx, cy, R, rotulo) {
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#3a322b" stroke="${T}" stroke-width="8"/><circle cx="${cx}" cy="${cy}" r="${R * 0.78}" fill="none" stroke="${T}" stroke-width="3"/>`;
    for (let i = -2; i <= 2; i++) s += `<path d="M${cx + i * R * 0.3},${f(cy - Math.sqrt(R * R - (i * R * 0.3) ** 2))} L${cx + i * R * 0.3},${f(cy + Math.sqrt(R * R - (i * R * 0.3) ** 2))}" stroke="${T}" stroke-width="1.4" opacity=".6"/>`;
    if (rotulo) s += `<text x="${cx}" y="${cy + 10}" font-size="${R * 0.42}" text-anchor="middle" class="legenda-arte" fill="${CARTAO}" opacity=".85">${rotulo}</text>`;
    return carvao(s);
  }
  function janela(x, y, w, h, o = {}) {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.ceu || '#e9e3d4'}"/>`;
    if (o.lua) s += `<circle cx="${x + w * 0.62}" cy="${y + h * 0.38}" r="${Math.min(w, h) * 0.2}" fill="#fbf7ea" filter="url(#brilho)"/>`;
    if (o.grades) for (let i = 1; i < o.grades; i++) s += `<rect x="${f(x + (w * i) / o.grades - 4)}" y="${y}" width="8" height="${h}" fill="${T}"/>`;
    else s += `<path d="M${x + w / 2},${y} V${y + h} M${x},${y + h / 2} H${x + w}" stroke="${T}" stroke-width="6"/>`;
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${T}" stroke-width="10"/>`;
    return aspero(s);
  }
  function escada(x0, y0, x1, y1, degraus, o = {}) {
    let d = `M${x0},${y0}`;
    const dx = (x1 - x0) / degraus, dy = (y1 - y0) / degraus;
    for (let i = 0; i < degraus; i++) d += ` h${f(dx)} v${f(dy)}`;
    d += ` L${x1},${o.baseY || 720} L${x0},${o.baseY || 720} Z`;
    let s = `<path d="${d}" fill="${o.cor || '#5e564b'}"/>`;
    for (let i = 0; i < degraus; i++) s += `<path d="M${f(x0 + dx * i)},${f(y0 + dy * i)} h${f(dx)}" stroke="${T}" stroke-width="4"/><path d="M${f(x0 + dx * (i + 1))},${f(y0 + dy * i)} v${f(dy)}" stroke="${T}" stroke-width="2" opacity=".6"/>`;
    return carvao(s) + hachura(d, [x0, y0, x1 - x0, 720 - y0], { passo: 8, op: 0.5, larg: 1.6, ang: 40 });
  }
  function demonioFumaça() {
    // o Demônio da Intemperança: fumaça com garras
    let corpo = `<path d="M300,120 C250,120 222,160 224,210 C180,240 150,300 160,380 C170,460 230,520 262,600 L338,600 C370,520 430,460 440,380 C450,300 420,240 376,210 C378,160 350,120 300,120 Z" fill="${T}" opacity=".78"/>`;
    corpo += `<path d="M232,160 L206,70 L268,130 Z M368,160 L394,70 L332,130 Z" fill="${T}"/>`;
    let g = `<g filter="url(#fumaca)">${corpo}</g>`;
    g += `<g filter="url(#aspero)">${zigue(160, 140, 280, 460, { passo: 5, larg: 2.4, op: 0.55, ang: 80 })}</g>`;
    // olhos e sorriso
    g += `<path d="M252,212 Q272,196 290,214 Q272,224 252,212 Z M310,214 Q328,196 348,212 Q328,224 310,214 Z" fill="${OLHO}" data-brilho="demonio"/><circle cx="272" cy="212" r="2.5" fill="${T}"/><circle cx="329" cy="212" r="2.5" fill="${T}"/>`;
    let dentes = 'M232,252 Q300,300 368,252 Q300,272 232,252 Z';
    g += `<path d="${dentes}" fill="${OLHO}"/>`;
    let zz = 'M236,254';
    for (let i = 1; i <= 14; i++) zz += ` L${236 + i * 9.4},${i % 2 ? 272 - Math.abs(7 - i) * 1.6 : 256}`;
    g += `<path d="${zz}" fill="none" stroke="${T}" stroke-width="2.4"/>`;
    // braços longos com garras
    g += braco('M200,330 C150,330 110,300 80,260', 16) + dedos(80, 260, -2.5, 60, 4, T, 0.28);
    g += braco('M400,330 C450,330 500,300 530,250', 16) + dedos(530, 250, -0.6, 60, 4, T, 0.28);
    return g;
  }

  /* ================== AS CENAS ================== */
  const CENAS = {};

  CENAS.confissao = () => {
    semente = 11;
    let fundo = `<rect width="600" height="720" fill="#b3ab99"/>` + pedras(0, 0, 600, 640, { op: 0.5 });
    fundo += manchas(14, [0, 0, 600, 640], { min: 60, max: 180, opMin: 0.12, opMax: 0.35 });
    fundo += janela(372, 70, 110, 96, { grades: 4, lua: true, ceu: '#cfc9ba' });
    fundo += `<path d="M372,166 L482,166 L420,640 L170,640 Z" fill="#f6f1e4" opacity=".16"/>`;
    fundo += `<g opacity=".62" filter="url(#borrao-leve)"><g transform="translate(${455 - 125} ${560 - 375}) scale(1.25)"><path d="${GATO_RABO}" fill="#1d1915"/><path d="${GATO_CORPO}" fill="#1d1915"/></g></g>`;
    fundo += `<circle cx="${f(455 - 125 + 78 * 1.25)}" cy="${f(560 - 375 + 90 * 1.25)}" r="2" fill="#e9e1c8" data-brilho="sombra"/>`;
    fundo += chao(640, { cor: '#7c7466' });
    fundo += legenda('amanhã eu morro', 40, 120, { tam: 24, rot: -7, cor: T2 });
    fundo += riscos(30, [0, 0, 600, 640], { op: 0.3 }) + vinheta(0.8);
    const banco = carvao(`<path d="M120,540 L440,532 L444,552 L118,560 Z" fill="${T2}"/><path d="M140,556 L136,644 M420,550 L428,642" stroke="${T}" stroke-width="12"/>`);
    let homemSentado = carvao(`<path d="M318,378 C285,383 255,408 250,448 C246,478 248,506 252,532 L352,528 L356,628 L394,630 L392,618 L372,614 L372,524 C372,510 365,504 355,502 L360,444 C362,428 360,412 352,402 C345,395 332,388 318,378 Z" fill="${T}"/>`);
    homemSentado += hachura('M318,378 C285,383 255,408 250,448 C246,478 248,506 252,532 L352,528 L356,628 L394,630 L392,618 L372,614 L372,524 C372,510 365,504 355,502 L360,444 C362,428 360,412 352,402 C345,395 332,388 318,378 Z', [240, 370, 160, 270], { cor: '#4b433b', passo: 7, larg: 1.3, op: 0.5 });
    homemSentado += `<g transform="translate(300 330) rotate(28) translate(-80 -40) scale(.95)"><path d="M58,56 C56,30 66,18 80,18 C94,18 104,30 102,56 C102,76 92,90 80,90 C68,90 58,76 58,56 Z" fill="${T}"/><path d="M56,50 L44,30 L58,34 L52,10 L68,24 L72,2 L80,20 L90,0 L93,22 L108,10 L101,32 L114,34 L104,50 Z" fill="${T}"/></g>`;
    homemSentado += braco('M300,410 L352,494 L346,420', 12) + dedos(346, 420, -1.8, 26, 3.4, T2) + braco('M312,404 L366,486 L366,414', 12) + dedos(366, 414, -1.5, 26, 3.4, T2);
    const vela = `<rect x="470" y="600" width="16" height="40" fill="${CARTAO}" stroke="${T}" stroke-width="2"/><path class="chama" d="${chama(478, 598, 26, 7)}" fill="#f4d58a" filter="url(#brilho)" data-brilho="vela"/>`;
    const c1 = recorte(`<g transform="translate(300 640) scale(1.28) translate(-290 -640)">${banco + homemSentado}</g>` + vela);
    let barras = '';
    for (const x of [14, 74, 134, 470, 530, 590]) barras += `<rect x="${x - 5}" y="0" width="11" height="720" fill="${T}"/>`;
    barras += `<rect x="0" y="30" width="150" height="10" fill="${T}"/><rect x="455" y="30" width="145" height="10" fill="${T}"/><rect x="0" y="680" width="150" height="10" fill="${T}"/><rect x="455" y="680" width="145" height="10" fill="${T}"/>`;
    const c2 = recorte(carvao(barras) + `<rect x="138" y="330" width="16" height="30" rx="3" fill="${CZ}"/>`);
    return { fundo, camadas: [c1, c2] };
  };

  CENAS.plutao = () => {
    semente = 22;
    let fundo = `<rect width="600" height="720" fill="#c9c1ae"/>`;
    let papel = '';
    for (let y = 30; y < 600; y += 64) for (let x = (y / 64) % 2 ? 50 : 18; x < 600; x += 64) papel += `<path d="M${x - 9},${y} Q${x},${y - 8} ${x + 9},${y} Q${x},${y + 6} ${x - 9},${y} Z M${x},${y - 3} v6" />`;
    fundo += `<g fill="none" stroke="${CZ}" stroke-width="1.4" opacity=".45" filter="url(#aspero)">${papel}</g>`;
    fundo += janela(410, 60, 130, 150, { lua: true, ceu: '#ddd6c6' });
    fundo += carvao(`<path d="M392,50 C420,120 400,200 420,280 L392,280 Z M558,50 C530,120 552,200 530,280 L558,280 Z" fill="${T2}"/>`);
    // gaiola
    fundo += aspero(`<path d="M110,0 V40" stroke="${T}" stroke-width="2"/><path d="M76,130 C76,70 144,70 144,130 Z" fill="none" stroke="${T}" stroke-width="3"/><path d="M88,130 C88,80 100,64 110,64 M132,130 C132,80 120,64 110,64 M110,64 V130" stroke="${T}" stroke-width="2" fill="none"/><path d="M70,130 H150" stroke="${T}" stroke-width="5"/><path d="M98,110 q10,-16 22,-4 l8,-2 l-6,6 q-6,12 -24,0 Z" fill="${T}"/>`);
    // retrato oval
    fundo += aspero(`<ellipse cx="290" cy="130" rx="46" ry="58" fill="#e6dfcf" stroke="${T}" stroke-width="7"/>`) + gatoFrente(290, 176, 0.3, { recorte: false });
    // sombra de bruxa atrás da esposa
    fundo += `<g opacity=".32" filter="url(#borrao-leve)"><path d="M520,640 C540,520 560,420 540,330 L566,330 L540,300 L600,300 L600,640 Z M520,300 L560,120 L610,300 Z M500,318 L470,330 L512,340 Z" fill="${T}"/></g>`;
    fundo += legenda('bruxas disfarçadas', 400, 360, { tam: 20, rot: 8, cor: T2 });
    fundo += chao(620, { cor: '#8f8676' });
    // aquário
    fundo += aspero(`<rect x="36" y="520" width="12" height="100" fill="${T}"/><rect x="10" y="516" width="64" height="8" fill="${T}"/><ellipse cx="42" cy="486" rx="34" ry="30" fill="#e7e1d2" stroke="${T}" stroke-width="3"/><path d="M34,488 q10,-8 18,0 l6,-4 v8 l-6,-4 q-8,8 -18,0 Z" fill="${SG2}"/>`);
    fundo += riscos(24, [0, 0, 600, 620], { op: 0.25 }) + vinheta(0.55);
    const c1 = homem(150, 660, 1.08, 'baixo') + mulher(462, 660, 1.04, 'boca');
    const cao = carvao(`<path d="M20,640 L24,588 C18,560 30,540 54,540 L96,540 C106,520 118,508 132,512 L150,500 L148,520 C164,528 166,544 154,550 C146,556 136,552 132,556 L128,590 L132,640 L120,640 L116,600 L70,600 L64,640 L52,640 L48,600 L36,600 L32,640 Z" fill="${T}"/>`);
    const coelho = carvao(`<path d="M520,640 C500,640 494,610 510,594 C520,584 540,584 548,592 L552,560 C552,550 560,550 560,560 L558,590 L566,562 C568,552 576,554 574,564 L566,598 C578,610 574,640 552,640 Z" fill="${T}"/>`);
    const macaco = carvao(`<path d="M244,300 C232,300 226,312 230,322 C220,330 222,346 232,350 L236,380 L246,380 L248,356 L262,356 L266,380 L276,380 L278,346 C288,342 290,328 280,322 C284,312 278,300 266,300 Z M280,360 C300,370 304,390 290,400" fill="${T}"/><circle cx="249" cy="318" r="2.5" fill="${OLHO}"/><circle cx="261" cy="318" r="2.5" fill="${OLHO}"/>`);
    const c2 = recorte(cao + coelho) + recorte(`<g transform="translate(-160 -150)">${macaco}</g>`);
    const c3 = gatoFrente(300, 668, 1.02, { brilhoE: 'plutao', brilhoD: 'plutao' }) + legenda('Plutão', 250, 704, { tam: 20, rot: -3, cor: CARTAO });
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.alcool = () => {
    semente = 33;
    let fundo = `<rect width="600" height="720" fill="#a79f8d"/>` + escuro(0, 0, 600, 640, 0.35);
    fundo += manchas(16, [0, 0, 600, 600], { min: 60, max: 180, opMin: 0.15, opMax: 0.4 });
    fundo += chao(630, { cor: '#6f6759' });
    fundo += carvao(`<path d="M440,640 L470,560 L560,560 L590,640 Z" fill="${T2}"/><path d="M470,560 L470,470 M556,560 L560,480" stroke="${T}" stroke-width="10"/>`);
    fundo += legenda('que doença se compara', 30, 70, { tam: 18, rot: -3, cor: CARTAO }) + legenda('ao Álcool?', 60, 104, { tam: 22, rot: -3, cor: '#e0463c' });
    fundo += vinheta(0.7);
    const c1 = `<g class="respira">${demonioFumaça()}</g>`;
    const c2 = homem(250, 690, 1.0, 'garrafa', { inclina: -7, olhos: 'arregalados' }) +
      mulherEncolhida(470, 640, 0.9) +
      recorte(gatoPerfil(26, 596, 0.56, { brilho: 'plutao' }));
    const c3 = recorte(garrafa(560, 640, 1.1, 74) + `<path d="M330,704 l30,-18 l8,20 Z M380,710 l12,-30 l14,26 Z" fill="${CARTAO}" stroke="${T}" stroke-width="2"/>`);
    return { fundo, camadas: [c1, c2, c3] };
  };
  function mulherEncolhida(cx, base, s) {
    // de joelhos, braços protegendo a cabeça
    let g = carvao(`<path d="M-70,0 C-80,-60 -60,-120 -20,-140 C10,-150 50,-130 60,-90 C70,-50 70,-20 80,0 Z" fill="${T}"/>`);
    g += hachura('M-70,0 C-80,-60 -60,-120 -20,-140 C10,-150 50,-130 60,-90 C70,-50 70,-20 80,0 Z', [-80, -150, 160, 150], { cor: '#4b433b', passo: 8, larg: 1.2, op: 0.5, ang: 70 });
    g += `<g transform="translate(-60 -236)">${cabecaMulher({})}</g>`;
    g += braco('M-40,-120 L-66,-170 L-30,-196', 11) + dedos(-30, -196, -0.3, 18, 3) + braco('M30,-120 L44,-176 L4,-200', 11) + dedos(4, -200, -2.6, 18, 3);
    return recorte(`<g transform="translate(${cx} ${base}) scale(${s})">${g}</g>`);
  }

  CENAS.olho = () => {
    semente = 44;
    let fundo = `<rect width="600" height="720" fill="#28221e"/>`;
    let raios = '';
    for (let i = 0; i < 70; i++) { const a = r(0, Math.PI * 2), r1 = r(120, 220), r2 = r(300, 520); raios += `M${f(300 + Math.cos(a) * r1)},${f(300 + Math.sin(a) * r1)} L${f(300 + Math.cos(a) * r2)},${f(300 + Math.sin(a) * r2)} `; }
    fundo += `<path d="${raios}" stroke="#6e665b" stroke-width="2.5" opacity=".6" filter="url(#aspero)"/>`;
    fundo += `<g class="depois">${respingo(420, 170, 60, 26)}${respingo(140, 520, 40, 18)}${respingo(500, 560, 30, 14)}</g>`;
    fundo += legenda('coro, ardo, estremeço', 300, 690, { tam: 22, rot: -2, cor: '#d9d2c2', ancora: 'middle' });
    fundo += vinheta(0.6);
    // cabeça enorme do gato
    const cab = (olhoD) => `<g transform="translate(300 250) scale(2.3) translate(-100 -80)">${carvao(`<path d="${CABECA_GATO}" fill="${T}"/><path d="${CABECA_GATO}" fill="none" stroke="${T}" stroke-width="6" stroke-dasharray="2 4"/>`)}` +
      `<path d="M93,100 L107,100 L100,108 Z" fill="#3d352f"/>${bocaAberta(100, 110)}` +
      olhoGato(76, 84, 'arregalado') + olhoGato(124, 84, olhoD) + `</g>`;
    const pescoco = carvao(`<path d="M186,400 C176,520 150,640 136,720 L464,720 C450,640 424,520 414,400 Z" fill="${T}"/>`);
    const c1 = recorte(pescoco + `<g class="antes">${cab('arregalado')}</g><g class="depois">${cab('ferido')}</g>`) +
      `<g transform="translate(300 250) scale(2.3) translate(-100 -80)"><path d="M72,110 L10,96 M72,115 L6,122 M128,110 L190,96 M128,115 L194,122" stroke="${CLARO}" stroke-width=".8" opacity=".8"/></g>`;
    // a mão que aperta a garganta
    let mao = braco('M-20,760 C60,660 120,560 176,500', 70, T2);
    mao += `<path d="M150,440 C190,420 230,424 244,452 C256,480 250,520 222,536 C190,552 150,540 140,510 C132,484 134,456 150,440 Z" fill="${T2}"/>`;
    [[440, 176], [466, 188], [492, 184], [516, 164]].forEach(([y, len], k) => {
      mao += `<path d="M226,${y} C${260 + len * 0.3},${y - 10} ${220 + len * 0.8},${y - 6} ${226 + len},${y + 4}" fill="none" stroke="${T2}" stroke-width="${21 - k * 1.5}" stroke-linecap="round"/>`;
      mao += `<path d="M${214 + len * 0.95},${y - 2} q8,2 12,8" stroke="${CARTAO}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M${250 + k * 4},${y - 8} q4,6 0,14" stroke="${T}" stroke-width="2" fill="none"/>`;
    });
    mao += braco('M170,448 C176,410 200,396 226,404', 22, T2);
    const c2 = recorte(carvao(mao));
    // a mão com o canivete
    const faca = (sangue) => `<g transform="translate(${sangue ? 36 : 0} ${sangue ? -34 : 0})">` +
      braco('M640,150 C580,168 540,184 500,200', 40, T2) +
      carvao(`<path d="M470,176 C500,166 522,178 524,200 C526,226 506,238 480,234 C460,230 448,216 450,198 C452,186 460,180 470,176 Z" fill="${T2}"/>`) +
      `<path d="M472,190 h40 M468,204 h46 M472,218 h40" stroke="${T}" stroke-width="2"/>` +
      `<path d="M458,194 L420,206 L424,222 L462,212 Z" fill="${T}"/>` +
      `<path d="M424,206 L366,236 L362,242 L428,220 Z" fill="#d8d2c6" stroke="${T}" stroke-width="2.5"/>` +
      (sangue ? `<path d="M406,214 L366,236 L362,242 L412,226 Z" fill="${SG2}"/>` + gota(392, 226, 54, 3) + gota(376, 234, 90, 3.4) +
        `<path d="M356,244 C340,262 336,280 322,300" stroke="${SG2}" stroke-width="4" fill="none"/>` +
        `<circle cx="352" cy="244" r="15" fill="${OLHO}" stroke="${SG2}" stroke-width="3"/><circle cx="347" cy="246" r="5" fill="${T}"/><path d="M340,236 l6,4 M360,254 l-4,-6" stroke="${SG2}" stroke-width="1.5"/>` : '') +
      `</g>`;
    const c3 = recorte(`<g class="antes">${faca(false)}</g><g class="depois">${faca(true)}</g>`);
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.arvore = () => {
    semente = 55;
    let fundo = `<rect width="600" height="720" fill="#bdb5a3"/>`;
    fundo += hachuraRet(0, 0, 600, 300, { passo: 5, op: 0.55, larg: 2.2, ang: -20 });
    fundo += manchas(10, [0, 0, 600, 260], { min: 80, max: 200, opMin: 0.25, opMax: 0.55 });
    fundo += carvao(`<path d="M430,640 L430,330 L515,250 L600,330 L600,640 Z" fill="${T2}"/>`) + janela(470, 400, 60, 80, { ceu: '#403830' });
    fundo += carvao(`<path d="M0,560 L420,560 L420,640 L0,640 Z" fill="#5a5247"/>`) + tijolos(0, 560, 420, 80, { bh: 20, bw: 44 });
    fundo += chao(640, { cor: '#6d6557' });
    let chuva = '';
    for (let i = 0; i < 90; i++) { const x = r(-50, 600), y = r(0, 700); chuva += `M${f(x)},${f(y)} l${f(-8)},${f(26)} `; }
    fundo += `<path d="${chuva}" stroke="#efe9dc" stroke-width="1.3" opacity=".5"/>`;
    fundo += legenda('porque sabia que ele me amara', 250, 700, { tam: 16, rot: -2, cor: CARTAO, ancora: 'middle' }) + vinheta(0.6);
    let tronco = `<path d="M130,650 C140,560 150,470 160,380 L190,380 C200,470 214,560 230,650 Z" fill="${T}"/>`;
    tronco += `<path d="${arvore(172, 390, 150, -1.75, 34, 5)}" fill="${T}"/>`;
    tronco += `<path d="${arvore(166, 440, 110, -2.6, 20, 4)}" fill="${T}"/>`;
    tronco += `<path d="M168,300 C230,262 320,236 420,226 L424,238 C330,250 240,276 176,318 Z" fill="${T}"/><path d="${arvore(360, 232, 70, -0.9, 8, 3)}" fill="${T}"/>`;
    const c1 = recorte(carvao(tronco));
    const c2 = `<g class="balanca" style="transform-origin:372px 234px">${recorte(gatoEnforcado(372, 318, 1.38, { cordaTopo: 232 }))}</g>`;
    const c3 = homem(492, 708, 0.56, 'rosto', { lagrimas: true });
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.fogo = () => {
    semente = 66;
    let fundo = `<rect width="600" height="720" fill="#3a332d"/>`;
    fundo += manchas(18, [0, 0, 600, 400], { min: 60, max: 200, opMin: 0.2, opMax: 0.5, cor: '#000' });
    fundo += `<path d="M0,520 L40,380 L70,440 L110,300 L130,420 L160,520 Z M470,520 L500,340 L530,400 L560,280 L600,360 L600,520 Z" fill="${T}"/>`;
    let brasas = '';
    for (let i = 0; i < 40; i++) brasas += `<circle class="brasa" style="animation-delay:${f(r(0, 3))}s" cx="${f(r(0, 600))}" cy="${f(r(80, 600))}" r="${f(r(1, 3))}" fill="#e98a2a"/>`;
    fundo += brasas + chao(600, { cor: '#2a2420' });
    const topo = 'M100,600 L100,170 L140,140 L170,160 L210,120 L260,150 L300,110 L350,146 L390,118 L440,150 L470,130 L500,170 L500,600 Z';
    let parede = `<path d="${topo}" fill="#e9e3d6"/>` + hachura(topo, [100, 110, 400, 490], { cor: CZ, passo: 14, larg: 1, op: 0.25, ang: 10 });
    parede += manchas(8, [100, 110, 400, 120], { min: 20, max: 60, opMin: 0.12, opMax: 0.3 });
    parede += `<path d="M110,420 L160,470 L150,520 M480,260 L440,300 L450,360 M300,560 L320,520 L310,480" stroke="${T}" stroke-width="2" fill="none" filter="url(#aspero)"/>`;
    // baixo-relevo do gato com a corda
    parede += `<g transform="translate(6 6)" opacity=".8" filter="url(#borrao-leve)">${gatoEnforcado(300, 250, 1.55, { relevo: true, cor: '#2b2622', corda: '#2b2622', cordaTopo: 130 })}</g>`;
    parede += `<g transform="translate(-3 -3)">${gatoEnforcado(300, 250, 1.55, { relevo: true, cor: '#fbf8f0', corda: '#fbf8f0', cordaTopo: 130 })}</g>`;
    parede += `<g filter="url(#aspero)">${gatoEnforcado(300, 250, 1.55, { relevo: true, cor: '#9a9182', corda: '#6b6358', cordaTopo: 130 })}</g>`;
    parede += `<path d="M150,600 L150,500 M450,600 L450,500 M150,520 H450 M190,520 V600 M230,520 V600 M270,520 V600 M330,520 V600 M370,520 V600 M410,520 V600" stroke="${T}" stroke-width="7" fill="none" filter="url(#aspero)"/>`;
    const c1 = recorte(parede);
    const pessoa = (x, y, s, braco) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40,120 C-40,60 -30,40 0,36 C30,40 40,60 40,120 Z" fill="${T}"/><ellipse cx="0" cy="16" rx="18" ry="22" fill="${T}"/>${braco ? `<path d="M20,52 L60,-10 L80,-40" stroke="${T}" stroke-width="10" stroke-linecap="round" fill="none"/>` + dedos(80, -40, -1.1, 16, 3) : ''}</g>`;
    const c2 = recorte(carvao(pessoa(70, 600, 1.1, true) + pessoa(160, 630, 1.0, false) + pessoa(420, 620, 1.05, false) + pessoa(520, 600, 1.15, true) + pessoa(300, 650, 0.9, false))) +
      legenda('estranho!', 20, 560, { tam: 20, rot: -12, cor: CARTAO }) + legenda('singular!', 470, 560, { tam: 20, rot: 10, cor: CARTAO });
    const c3 = fogueira(40, 720, 9, 150, 60) + fogueira(560, 720, 9, 170, 60) + recorte(carvao(`<path d="M-20,690 L260,640 L266,660 L-20,712 Z M620,660 L380,700 L376,716 L620,690 Z" fill="${T}"/>`));
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.taverna = () => {
    semente = 77;
    let fundo = `<rect width="600" height="720" fill="#8f8776"/>` + escuro(0, 0, 600, 420, 0.3);
    let prat = '';
    for (let k = 0; k < 3; k++) {
      const y = 90 + k * 90;
      prat += `<rect x="20" y="${y}" width="560" height="8" fill="${T}"/>`;
      for (let x = 34; x < 570; x += r(24, 40)) { const h = r(30, 56); prat += `<path d="M${f(x)},${y} v${f(-h * 0.6)} q0,-8 5,-12 v${f(-h * 0.3)} h6 v${f(h * 0.3)} q5,4 5,12 v${f(h * 0.6)} Z" fill="${aleat() < 0.2 ? SG : T}"/>`; }
    }
    fundo += carvao(prat);
    fundo += `<path d="M300,0 V40" stroke="${T}" stroke-width="3"/><path d="M284,40 h32 l-6,30 h-20 Z" fill="${T}"/><ellipse cx="300" cy="62" rx="8" ry="6" fill="#f3dc9a" filter="url(#brilho)"/>`;
    fundo += `<ellipse cx="300" cy="80" rx="240" ry="130" fill="#f3dc9a" opacity=".08"/>`;
    fundo += carvao(`<path d="M0,430 H600 V470 H0 Z" fill="${T2}"/>`) + chao(620, { cor: '#5f574b' });
    fundo += manchas(12, [0, 0, 600, 600], { min: 60, max: 160, opMin: 0.1, opMax: 0.3, cor: '#000' });
    fundo += legenda('nunca o tinha visto antes', 380, 700, { tam: 16, rot: -2, cor: CARTAO, ancora: 'middle' }) + vinheta(0.6);
    const dono = carvao(`<path d="M430,430 C430,370 440,340 470,334 C500,340 510,370 510,430 Z" fill="${T}"/><ellipse cx="470" cy="310" rx="20" ry="26" fill="${T}"/><path d="M436,360 L400,330 L390,300 M504,360 L540,330 L550,300" stroke="${T}" stroke-width="10" stroke-linecap="round" fill="none"/>`) + `<ellipse cx="472" cy="314" rx="11" ry="15" fill="${CARTAO}"/><circle cx="468" cy="310" r="2" fill="${T}"/><circle cx="477" cy="310" r="2" fill="${T}"/><path d="M466,322 q6,-3 12,0" stroke="${T}" stroke-width="1.6" fill="none"/>`;
    const c1 = recorte(dono);
    const c2 = recorte(barrilDeitado(120, 520, 90, 'GIM') + barrilDeitado(500, 530, 80, 'RUM')) + recorte(barril(320, 560, 170, 210, ''));
    // a mão do narrador, estendida para tocar o gato
    const mao = carvao(braco('M-30,770 C40,690 120,610 214,556', 46, T2) + `<path d="M196,536 C220,520 246,528 250,552 C254,576 236,590 214,586 C196,582 186,566 188,552 Z" fill="${T2}"/>`) +
      dedos(238, 544, -0.62, 46, 7, T2, 0.24) + `<path d="M${238 + Math.cos(-0.62) * 46},${544 + Math.sin(-0.62) * 46} l4,-3" stroke="${CARTAO}" stroke-width="3" stroke-linecap="round"/>`;
    const c3 = gatoFrente(322, 460, 0.72, { mancha: 'indefinida', olhoE: 'ponto', olhoD: 'nenhum', brilhoE: 'gato2' }) + recorte(mao);
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.segue = () => {
    semente = 88;
    let fundo = `<rect width="600" height="720" fill="#bab29f"/>`;
    let papel = '';
    for (let y = 26; y < 640; y += 46) for (let x = (y / 46) % 2 ? 30 : 8; x < 600; x += 46) papel += `<path d="M${x - 8},${y} Q${x},${y - 7} ${x + 8},${y} Q${x},${y + 5} ${x - 8},${y} Z" /><circle cx="${x}" cy="${y}" r="1.6" fill="${CZ}"/>`;
    fundo += `<g fill="none" stroke="${CZ}" stroke-width="1.3" opacity=".55" filter="url(#aspero)">${papel}</g>`;
    fundo += manchas(12, [0, 0, 600, 640], { min: 60, max: 180, opMin: 0.1, opMax: 0.3 });
    fundo += chao(640, { cor: '#7a7264' });
    fundo += legenda('ele me segue', 40, 80, { tam: 26, rot: -8, cor: T }) + legenda('ele me segue', 380, 610, { tam: 16, rot: 6, cor: T2 }) + vinheta(0.6);
    const c1 = homem(300, 712, 1.34, 'horror', { olhos: 'arregalados', boca: 'grito' });
    // o gato agarrado ao peito, com um olho que acompanha o leitor
    let gato = gatoFrente(300, 470, 0.78, { recorte: false, mancha: 'indefinida', olhoE: 'ponto', olhoD: 'cicatriz', olhoOpts: { clsPupila: 'pupila-segue' }, brilhoE: 'segue' });
    gato += `<path d="M232,272 l-26,-14 M232,282 l-28,-4 M232,292 l-26,6 M368,272 l26,-14 M368,282 l28,-4 M368,292 l26,6" stroke="${CARTAO}" stroke-width="3" stroke-linecap="round"/>`;
    gato += braco('M246,300 L214,262', 18) + braco('M354,300 L386,262', 18);
    const c2 = recorte(gato);
    let pegadas = '';
    for (let i = 0; i < 7; i++) { const x = 40 + i * 36, y = 700 - i * 8 + (i % 2) * 12; pegadas += `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="${T}"/><circle cx="${x - 6}" cy="${y - 8}" r="2.4" fill="${T}"/><circle cx="${x}" cy="${y - 10}" r="2.4" fill="${T}"/><circle cx="${x + 6}" cy="${y - 8}" r="2.4" fill="${T}"/>`; }
    const c3 = aspero(pegadas);
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.forca = () => {
    semente = 99;
    let fundo = `<rect width="600" height="720" fill="#6d665a"/>` + escuro(0, 0, 600, 720, 0.45);
    fundo += janela(60, 60, 120, 140, { lua: true, ceu: '#8b8474' });
    fundo += carvao(`<path d="M40,40 C70,120 40,220 70,320 L40,320 Z M200,40 C170,120 200,220 170,320 L200,320 Z" fill="${T}"/>`);
    fundo += manchas(14, [0, 0, 600, 720], { min: 60, max: 180, opMin: 0.2, opMax: 0.45, cor: '#000' });
    fundo += legenda('a FORCA', 470, 120, { tam: 34, rot: 8, cor: CARTAO, ancora: 'middle' }) + vinheta(0.8);
    // cama e homem deitado
    let cama = carvao(`<path d="M30,380 L70,380 L70,640 L30,640 Z M30,360 C30,330 70,330 70,360 Z" fill="${T}"/><path d="M60,520 L580,520 L580,560 L60,560 Z" fill="${T2}"/><path d="M560,470 L590,470 L590,660 L560,660 Z" fill="${T}"/>`);
    cama += `<ellipse cx="130" cy="468" rx="62" ry="28" fill="#e6dfcf" stroke="${T}" stroke-width="2"/>`;
    cama += `<g transform="translate(150 470) rotate(-90) scale(1.35) translate(-80 -58)">${cabecaHomem({ olhos: 'arregalados', boca: 'grito' })}</g>`;
    cama += `<path d="M180,450 C260,420 420,430 560,470 L560,524 L170,524 Z" fill="#d9d2c2" stroke="${T}" stroke-width="3"/>` + hachura('M180,450 C260,420 420,430 560,470 L560,524 L170,524 Z', [170, 420, 400, 110], { cor: CZ, passo: 9, larg: 1.2, op: 0.5, ang: 20 });
    cama += braco('M200,470 L190,440 L150,430', 10) + dedos(150, 430, 3.4, 22, 3);
    const c1 = recorte(cama);
    const c2 = gatoFrente(330, 470, 1.18, { mancha: 'transforma', olhoE: 'ponto', olhoD: 'cicatriz', brilhoE: 'pesadelo' });
    const c3 = recorte(carvao(`<path d="M0,620 L600,640 L600,720 L0,720 Z" fill="${T}"/>`) + `<path d="M40,660 C120,640 200,690 300,660 C380,640 480,690 560,660" stroke="${CZ}" stroke-width="2" fill="none"/>`);
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.machado = () => {
    semente = 111;
    let fundo = `<rect width="600" height="720" fill="#9d9583"/>` + pedras(0, 0, 600, 650, { op: 0.45 });
    fundo += escuro(0, 0, 600, 60, 0.9) + carvao(`<path d="M0,56 H600 V76 H0 Z M120,56 V100 M380,56 V96" stroke="${T}" stroke-width="12"/>`);
    fundo += `<path d="M470,76 V120" stroke="${T}" stroke-width="3"/><rect x="458" y="120" width="24" height="34" fill="${T}"/><rect x="462" y="126" width="16" height="22" fill="#f1d893" data-brilho="lamp" filter="url(#brilho)"/>`;
    fundo += `<ellipse cx="470" cy="220" rx="220" ry="200" fill="#f1d893" opacity=".08"/>`;
    fundo += manchas(12, [0, 0, 600, 650], { min: 60, max: 160, opMin: 0.12, opMax: 0.35 });
    fundo += chao(650, { cor: '#6c6456' });
    fundo += `<g class="depois">${respingo(470, 470, 70, 30)}${respingo(560, 330, 34, 14)}${respingo(380, 300, 26, 12)}</g>`;
    fundo += legenda('sem um gemido', 440, 700, { tam: 20, rot: -3, cor: T, ancora: 'middle' }) + vinheta(0.7);
    const c1 = recorte(escada(0, 150, 260, 650, 9)) + recorte(gatoPerfil(120, 300, 0.55, { espelho: true, brilho: 'gato2' }));
    const machado = `<path d="M146,-36 L130,-120" stroke="#4a3a28" stroke-width="7" stroke-linecap="round"/><path d="M120,-126 C150,-150 176,-130 172,-100 L136,-108 Z" fill="#cfc9bd" stroke="${T}" stroke-width="3"/>`;
    const antes = `<g class="antes">${homem(340, 668, 1.0, 'erguido', { olhos: 'arregalados', extra: machado })}${mulher(468, 668, 0.98, 'segura')}</g>`;
    const machadoCravado = `<path d="M90,34 L150,-40" stroke="#4a3a28" stroke-width="7" stroke-linecap="round"/><path d="M70,40 C84,18 110,26 110,50 L84,52 Z" fill="#cfc9bd" stroke="${T}" stroke-width="3"/>`;
    const depois = `<g class="depois">${homem(262, 660, 1.0, 'vazio', { olhos: 'arregalados' })}${mulher(150, 676, 0.9, 'baixo', { olhos: 'ocos', boca: 'aberta', ferida: true, gira: 78, extra: machadoCravado + gota(84, 60, 70, 3) + gota(96, 58, 110, 3.4) })}</g>`;
    const c2 = antes + depois;
    const c3 = `<g class="depois"><ellipse cx="500" cy="684" rx="110" ry="20" fill="${SG}" filter="url(#sangue)"/></g>`;
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.parede = () => {
    semente = 122;
    let fundo = `<rect width="600" height="720" fill="#8e8674"/>` + tijolos(0, 0, 600, 650, { bh: 28, bw: 66 });
    fundo += manchas(14, [0, 0, 600, 650], { min: 60, max: 160, opMin: 0.12, opMax: 0.35 });
    fundo += chao(650, { cor: '#5f584c' });
    fundo += `<rect x="190" y="40" width="240" height="610" fill="#a39b88" stroke="${T}" stroke-width="4" filter="url(#aspero)"/>` + tijolos(190, 40, 240, 610, { bh: 28, bw: 60 });
    fundo += `<rect x="224" y="150" width="172" height="500" fill="#1a1612"/>` + hachuraRet(224, 150, 172, 500, { passo: 6, larg: 2, op: 0.6, cor: '#000' });
    fundo += legenda('não foi em vão', 50, 90, { tam: 22, rot: -6, cor: CARTAO }) + vinheta(0.7);
    const c1 = mulher(310, 650, 1.08, 'pendente', { olhos: 'fechados', ferida: true, pele: '#d8d0bf' });
    // a nova parede, fileira por fileira (acompanha a leitura)
    let fileiras = '';
    const bh = 28;
    for (let i = 0; i < 18; i++) {
      const y = 650 - (i + 1) * bh;
      if (y < 150 - bh) break;
      const y0 = Math.max(150, y);
      let s = '';
      for (let x = 224 - (i % 2 ? 30 : 0); x < 396; x += 60) {
        const x0 = Math.max(224, x), x1 = Math.min(396, x + 57);
        if (x1 - x0 < 5) continue;
        s += `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y + bh - 3 - y0}" fill="#9c9381" stroke="${T}" stroke-width="1.4"/>`;
      }
      fileiras += `<g class="fileira" data-i="${i}">${aspero(s)}</g>`;
    }
    fileiras += `<g class="fileira reboco" data-i="18"><rect x="220" y="146" width="180" height="506" fill="#a39b88" filter="url(#aspero)"/>${hachuraRet(220, 146, 180, 506, { passo: 16, larg: 1, op: 0.2, cor: CZ, ang: 15 })}</g>`;
    const c2 = `<g class="tijolos">${fileiras}</g>`;
    const c3 = homem(520, 716, 0.72, 'trolha') + recorte(carvao(`<path d="M30,690 L150,650 L156,662 L36,702 Z" fill="${T}"/><path d="M140,640 q10,-10 18,4" stroke="${T}" stroke-width="7" fill="none"/><path d="M60,640 L110,640 L104,700 L66,700 Z" fill="${T2}"/><ellipse cx="85" cy="640" rx="25" ry="7" fill="#b9b19e"/>`));
    return { fundo, camadas: [c1, c2, c3] };
  };

  CENAS.policia = () => {
    semente = 133;
    let fundo = `<rect width="600" height="720" fill="#958d7b"/>` + pedras(0, 0, 600, 650, { op: 0.4 });
    fundo += `<rect x="400" y="60" width="200" height="590" fill="#b2aa98"/>` + hachuraRet(400, 60, 200, 590, { passo: 16, larg: 1, op: 0.18, cor: CZ, ang: 15 });
    fundo += `<path d="M400,60 V650" stroke="${T}" stroke-width="4" filter="url(#aspero)"/>`;
    fundo += manchas(12, [0, 0, 600, 650], { min: 60, max: 160, opMin: 0.1, opMax: 0.3 });
    fundo += chao(650, { cor: '#655d50' }) + legenda('paredes muito sólidas', 500, 110, { tam: 16, rot: 4, cor: T2, ancora: 'middle' }) + vinheta(0.6);
    const rachas = `<g class="racha racha-1"><path d="M470,330 L490,300 L484,270 M470,330 L500,350 L520,344" stroke="${T}" stroke-width="2.4" fill="none" filter="url(#aspero)"/></g>` +
      `<g class="racha racha-2"><path d="M470,330 L440,300 L446,250 L430,220 M470,330 L450,380 L462,420" stroke="${T}" stroke-width="2.4" fill="none" filter="url(#aspero)"/></g>` +
      `<g class="racha racha-3"><path d="M470,330 L530,300 L560,240 M470,330 L520,400 L510,470 L540,520" stroke="${T}" stroke-width="3" fill="none" filter="url(#aspero)"/>${gota(478, 338, 70, 3, SG)}${gota(468, 340, 40, 2.4, SG)}</g>`;
    fundo += rachas + `<rect class="alvo-parede" x="400" y="60" width="200" height="590" fill="transparent"/>`;
    const c1 = recorte(escada(0, 230, 240, 650, 8, { cor: '#5a5246' })) +
      recorte(policial(60, 330, 0.62, { rosto: 'dir' }) + policial(120, 390, 0.66, { lanterna: true, rosto: 'dir' }) + policial(180, 450, 0.7, { rosto: 'dir' }) + policial(236, 510, 0.72, { rosto: 'dir' }));
    const c2 = homem(300, 700, 0.98, 'bengala', { bengalaX: 318, bengalaY: 216 });
    return { fundo, camadas: [c1, c2] };
  };

  CENAS.grito = () => {
    semente = 144;
    let fundo = `<rect width="600" height="720" fill="#6f685b"/>` + pedras(0, 0, 600, 650, { op: 0.45 }) + escuro(0, 0, 600, 720, 0.35);
    fundo += `<path d="M190,660 L180,120 L230,90 L270,110 L330,80 L380,110 L420,96 L440,660 Z" fill="#0d0b09"/>`;
    fundo += manchas(12, [0, 0, 600, 650], { min: 60, max: 160, opMin: 0.15, opMax: 0.4, cor: '#000' });
    fundo += chao(650, { cor: '#4e473d' }) + vinheta(0.9);
    const c1 = recorte(policial(70, 690, 0.95, { bracos: 'cima', rosto: 'dir' }) + policial(530, 700, 0.9, { lanterna: true, rosto: 'esq', espelho: true }));
    // o cadáver
    let cad = mulher(310, 684, 1.0, 'pendente', { olhos: 'ocos', boca: 'aberta', ferida: true, pele: '#bfb5a0', vestido: '#231e1a', recorte: false });
    cad += `<g transform="translate(${310 - 80} ${684 - 436}) scale(1)">` +
      gota(70, 120, 90, 4, SG) + gota(92, 140, 150, 5, SG) + gota(60, 200, 120, 4, SG) + gota(104, 230, 80, 3, SG) + gota(84, 90, 60, 3, SG) +
      `<path d="M64,40 C40,80 30,140 36,200 M96,40 C122,80 132,140 126,200 M70,40 C60,100 56,150 60,190 M92,40 C104,100 108,150 104,190" stroke="${T}" stroke-width="3" fill="none" opacity=".9"/>` +
      `<path d="M50,300 L40,330 L60,320 L56,360 M110,300 L124,340 L104,330 L112,370" stroke="${CARTAO}" stroke-width="2" fill="none" opacity=".4"/>` +
      `</g>`;
    const c2 = recorte(cad);
    const c3 = gatoFrente(310, 262, 0.6, { boca: 'aberta', olhoE: 'fogo', olhoD: 'cicatriz', mancha: 'forca' }) +
      recorte(carvao(`<path d="M150,720 L170,660 L230,676 L260,640 L320,670 L380,648 L420,680 L470,660 L480,720 Z" fill="${T2}"/>`) + tijolos(170, 670, 300, 50, { bh: 18, bw: 40 }));
    return { fundo, camadas: [c1, c2, c3] };
  };

  /* ---------- capa, sombra que atravessa a tela, fim ---------- */
  function capa() {
    semente = 7;
    let g = `<g transform="translate(300 250) scale(2.2) translate(-100 -80)">${carvao(`<path d="${CABECA_GATO}" fill="${T}"/><path d="${CABECA_GATO}" fill="none" stroke="${T}" stroke-width="7" stroke-dasharray="2 5"/>`)}` +
      `<path d="M72,110 L6,94 M72,115 L2,124 M128,110 L194,94 M128,115 L198,124" stroke="#1b1512" stroke-width="1.2"/><path d="M93,100 L107,100 L100,108 Z" fill="#2a2320"/>` +
      olhoGato(76, 84, 'ponto', { brilho: 'capa' }) + olhoGato(124, 84, 'cicatriz') + `</g>`;
    g += riscos(40, [0, 0, 600, 600], { op: 0.35, cor: '#1b1512' });
    return `<svg viewBox="0 0 600 560" aria-hidden="true">${g}</svg>`;
  }
  function sombra() {
    return `<svg viewBox="-10 0 240 130" aria-hidden="true">${gatoPerfil(0, 4, 1, { cor: '#000', olho: true })}</svg>`;
  }
  function olhoSolto() {
    return `<svg viewBox="0 0 60 30" aria-hidden="true"><path d="M2,15 Q30,-4 58,15 Q30,30 2,15 Z" fill="${OLHO}"/><ellipse cx="30" cy="15" rx="3" ry="10" fill="${T}"/></svg>`;
  }

  window.ARTE = { CENAS, capa, sombra, olhoSolto, T, SG, SG2, PAPEL };
})();
