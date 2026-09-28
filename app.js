/* O Gato Preto — leitura interativa */
(function () {
  const H = window.HISTORIA, A = window.ARTE, S = window.SOM;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const pagina = $('#pagina'), capa = $('#capa'), livro = $('#livro');
  const lanterna = $('#lanterna'), brilhos = $('#brilhos'), flashEl = $('#flash');
  const reduzMov = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const DESCRICOES = {
    confissao: 'Uma cela escura: um homem magro, encolhido num banco, esconde o rosto nas mãos. Na parede, a sombra enorme de um gato de um olho só.',
    plutao: 'O narrador e a esposa, pálidos, em casa. Entre eles, Plutão, um gato preto enorme. Na parede, a sombra da esposa tem forma de bruxa.',
    alcool: 'Um homem cambaleia com uma garrafa de gim erguida. Atrás dele, um demônio de fumaça com garras e sorriso de dentes pontudos.',
    olho: 'A cabeça do gato em close: uma mão aperta a sua garganta e a outra aproxima um canivete do olho.',
    arvore: 'Noite de tempestade: um gato enforcado balança no galho de uma árvore retorcida. Embaixo, o homem chora com as mãos no rosto.',
    fogo: 'Ruínas em chamas. Na única parede branca que restou, a figura de um gato gigante com uma corda no pescoço. A multidão aponta.',
    taverna: 'Uma taverna escura com barris de gim e rum. Sobre um barril, um gato preto com uma mancha branca no peito encara o leitor.',
    segue: 'Um homem em pânico, de braços erguidos, enquanto um gato de um olho só se agarra ao seu peito com as garras.',
    forca: 'Um homem deitado, de olhos arregalados, com um gato enorme sentado sobre o peito. A mancha branca do gato vai virando uma forca.',
    machado: 'Um porão com escada íngreme. O homem ergue um machado e a esposa segura o seu braço. O gato desce a escada.',
    parede: 'O corpo da esposa, de pé, dentro de um nicho no porão, enquanto os tijolos vão fechando a parede.',
    policia: 'Policiais de cartola sobem a escada do porão. O homem bate com a bengala na parede recém-rebocada.',
    grito: 'A parede derrubada: o cadáver da esposa, de pé e ensanguentado. Sobre a cabeça dela, o gato de boca vermelha e um olho em chamas.'
  };

  /* ---------- preferências (só neste navegador) ---------- */
  const PADRAO = { som: true, luz: true, sustos: true };
  let pref = { ...PADRAO };
  try { pref = { ...PADRAO, ...JSON.parse(localStorage.getItem('gatopreto-pref') || '{}') }; } catch (e) { /* sem armazenamento */ }
  const salvar = () => { try { localStorage.setItem('gatopreto-pref', JSON.stringify(pref)); } catch (e) { /* ignora */ } };

  let atual = -1;
  let limpar = [];
  let abertura = 0;
  const ponteiro = { x: innerWidth / 2, y: innerHeight * 0.55 };
  const aoLimpar = (fn) => limpar.push(fn);
  const depois = (ms, fn) => { const id = setTimeout(fn, ms); aoLimpar(() => clearTimeout(id)); };

  /* ---------- capa ---------- */
  $('#capa-arte').innerHTML = A.capa();
  $('#abrir').addEventListener('click', () => abrirLivro(indiceDoEndereco() ?? 0));
  $('#ir-capa').addEventListener('click', mostrarCapa);

  function indiceDoEndereco() {
    const m = /^#parte-(\d{1,2})$/.exec(location.hash);
    if (m) { const n = +m[1] - 1; if (n >= 0 && n < H.length) return n; }
    if (location.hash === '#fim') return H.length;
    return null;
  }
  function abrirLivro(i) {
    S.iniciar(); S.ligar(pref.som);
    capa.hidden = true; livro.hidden = false;
    ir(i, { dir: 1 });
  }
  function mostrarCapa() {
    desmontar();
    atual = -1;
    livro.hidden = true; capa.hidden = false; lanterna.hidden = true;
    S.ambiente('capa');
    history.replaceState(null, '', location.pathname + location.search);
    scrollTo(0, 0);
  }

  /* ---------- barra ---------- */
  const btSom = $('#bt-som'), btLuz = $('#bt-luz'), btSustos = $('#bt-sustos');
  function pintarChaves() {
    btSom.setAttribute('aria-pressed', pref.som); btSom.title = pref.som ? 'Desligar o som' : 'Ligar o som';
    btLuz.setAttribute('aria-pressed', pref.luz); btLuz.title = pref.luz ? 'Acender a luz (desliga o escuro)' : 'Apagar a luz (liga a lanterna)';
    btSustos.setAttribute('aria-pressed', pref.sustos); btSustos.title = pref.sustos ? 'Desligar os sustos' : 'Ligar os sustos';
  }
  pintarChaves();
  btSom.addEventListener('click', () => { pref.som = !pref.som; S.iniciar(); S.ligar(pref.som); salvar(); pintarChaves(); });
  btLuz.addEventListener('click', () => { pref.luz = !pref.luz; salvar(); pintarChaves(); if (atual >= 0 && atual < H.length) aplicarLanterna(H[atual]); });
  btSustos.addEventListener('click', () => { pref.sustos = !pref.sustos; salvar(); pintarChaves(); });

  const dlg = $('#sumario');
  $('#lista-sumario').innerHTML = H.map((p, i) => `<li><button type="button" data-i="${i}"><span class="num">${p.numero}</span>${p.titulo}</button></li>`).join('') +
    `<li><button type="button" data-i="${H.length}"><span class="num">—</span>Fim e perguntas finais</button></li>`;
  $('#bt-sumario').addEventListener('click', () => dlg.showModal ? dlg.showModal() : dlg.setAttribute('open', ''));
  $('#lista-sumario').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    dlg.close ? dlg.close() : dlg.removeAttribute('open');
    const i = +b.dataset.i;
    ir(i, { dir: i >= atual ? 1 : -1 });
  });

  function atualizarRiscos() {
    let s = '';
    for (let k = 0; k < H.length; k++) {
      const cor = k < atual ? '#d9d2c2' : k === atual ? '#e0463c' : '#4a423a';
      const inc = ((k * 37) % 7) - 3;
      s += `<svg viewBox="0 0 10 30" aria-hidden="true"><path d="M${5 + inc * 0.6},2 Q${5 - inc},15 ${5 - inc * 0.6},28" fill="none" stroke="${cor}" stroke-width="2.6" stroke-linecap="round"/></svg>`;
    }
    const el = $('#riscos');
    el.innerHTML = s;
    el.setAttribute('aria-label', atual < H.length ? `Parte ${atual + 1} de ${H.length}` : 'Fim');
  }

  /* ---------- navegação ---------- */
  function ir(i, { dir = 1 } = {}) {
    if (i < 0) return mostrarCapa();
    i = Math.min(i, H.length);
    if (reduzMov || atual === -1 && livro.hidden) return montar(i);
    viraFolha(dir, () => montar(i));
  }
  function viraFolha(dir, noMeio) {
    S.efeito('folha');
    const v = $('#virada');
    v.className = 'virada ativa' + (dir < 0 ? ' volta' : '');
    v.innerHTML = '<div class="folha-vira"><div class="frente"></div><div class="verso"></div></div>';
    const fv = v.firstChild;
    const ang = dir < 0 ? 180 : -180;
    const an = fv.animate([
      { transform: 'rotateY(0deg)', opacity: 0 },
      { transform: `rotateY(${ang * 0.12}deg)`, opacity: 1, offset: 0.14 },
      { transform: `rotateY(${ang * 0.88}deg)`, opacity: 1, offset: 0.86 },
      { transform: `rotateY(${ang}deg)`, opacity: 0 }
    ], { duration: 950, easing: 'cubic-bezier(.45,.05,.35,1)' });
    setTimeout(noMeio, 470);
    an.onfinish = () => { v.className = 'virada'; v.innerHTML = ''; };
  }
  function desmontar() {
    limpar.forEach((f) => { try { f(); } catch (e) { /* segue */ } });
    limpar = [];
    brilhos.innerHTML = ''; $('#respingos').innerHTML = ''; $('#garras').innerHTML = ''; $('#olhos-margem').innerHTML = '';
    flashEl.style.opacity = 0;
    document.body.classList.remove('sacode');
  }
  function montar(i) {
    desmontar();
    atual = i;
    abertura = performance.now();
    if (i >= H.length) montarFim(); else montarParte(i);
    scrollTo(0, 0);
    pagina.focus({ preventScroll: true });
    history.replaceState(null, '', i >= H.length ? '#fim' : `#parte-${i + 1}`);
    atualizarRiscos();
  }

  addEventListener('keydown', (e) => {
    if (livro.hidden || e.altKey || e.ctrlKey || e.metaKey) return;
    if (dlg.open || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); if (atual < H.length) ir(atual + 1, { dir: 1 }); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(atual - 1, { dir: -1 }); }
  });

  /* ---------- montar uma parte ---------- */
  function dicaDoPalco(p) {
    if (p.lanterna && pref.luz) return 'Mova o mouse — ou arraste o dedo — para iluminar.';
    if (p.id === 'segue') return 'Não adianta se mexer. Ele está olhando para você.';
    if (p.tijolos) return 'A parede sobe enquanto você lê.';
    if (p.bater) return 'Toque na parede para bater com a bengala.';
    return '';
  }
  function montarParte(i) {
    const p = H[i];
    const arte = A.CENAS[p.id]();
    const camadas = arte.camadas.map((c, k) => `<svg class="camada" data-i="${k}" viewBox="0 0 600 720" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${c}</svg>`).join('');
    const perguntas = p.perguntas.map(([q, r]) => `<li><p>${q}</p><details><summary>Ver resposta sugerida</summary><p>${r}</p></details></li>`).join('');
    const bater = p.bater ? `<div class="bater"><p>Bata na parede com a bengala.</p><button class="botao" type="button" id="bt-bater">Bater (0/3)</button></div>` : '';
    pagina.innerHTML = `
      <article class="parte" data-id="${p.id}">
        <div class="folha-arte">
          <div class="palco" role="img" aria-label="${DESCRICOES[p.id]}">
            <div class="cena"><svg class="fundo" viewBox="0 0 600 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${arte.fundo}</svg>${camadas}</div>
            ${p.lanterna === 'arte' ? '<div class="escuro-arte"></div><div class="brilhos-arte"></div>' : ''}
          </div>
          <p class="dica-palco">${dicaDoPalco(p)}</p>
        </div>
        <div class="folha-texto">
          <p class="numero">Parte ${p.numero} de XIII</p>
          <h2 class="titulo">${p.titulo}</h2>
          <div class="texto">${p.texto.map((t) => `<p>${t}</p>`).join('')}</div>
          ${bater}
          <section class="pare" aria-label="Pare e pense">
            <h3>Pare e pense</h3>
            <ol>${perguntas}</ol>
          </section>
          <nav class="navega">
            ${i > 0 ? '<button class="botao botao-voltar" type="button" data-ir="-1">← Página anterior</button>' : '<button class="botao botao-voltar" type="button" data-ir="capa">← Capa</button>'}
            <button class="botao" type="button" data-ir="1">${i < H.length - 1 ? 'Virar a página →' : 'Fechar o livro →'}</button>
          </nav>
        </div>
      </article>`;
    $$('[data-ir]', pagina).forEach((b) => b.addEventListener('click', () => {
      const v = b.dataset.ir;
      if (v === 'capa') return mostrarCapa();
      ir(atual + +v, { dir: +v });
    }));

    levantar();
    S.ambiente(p.som);
    aplicarLanterna(p);
    observarGatilhos(p);
    paralaxe();

    if (p.id === 'forca') depois(2600, () => $('.parte').classList.add('transformando'));
    if (p.id === 'segue') olhoQueSegue();
    if (p.tijolos) paredeQueSobe();
    if (p.bater) batidas();
    if (p.id === 'grito') depois(1600, () => S.efeito('soluco'));
    if (i >= 6) sustosSoltos();
  }

  function levantar() {
    $$('.camada', pagina).forEach((el, k) => {
      const z = (k + 1) * 12;
      el.style.transform = `translateZ(${z}px)`;
      if (reduzMov) return;
      el.animate([
        { transform: `translateZ(${z}px) rotateX(-89deg)`, opacity: 0 },
        { transform: `translateZ(${z}px) rotateX(-86deg)`, opacity: 1, offset: 0.06 },
        { transform: `translateZ(${z}px) rotateX(8deg)`, opacity: 1, offset: 0.74 },
        { transform: `translateZ(${z}px) rotateX(0deg)`, opacity: 1 }
      ], { duration: 1150, delay: 380 + k * 280, easing: 'cubic-bezier(.25,.8,.35,1)', fill: 'backwards' });
    });
  }

  function paralaxe() {
    const palco = $('.palco', pagina), cena = $('.cena', pagina);
    if (!palco || reduzMov) return;
    const mover = () => {
      const r = palco.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (ponteiro.x - (r.left + r.width / 2)) / r.width));
      const dy = Math.max(-1, Math.min(1, (ponteiro.y - (r.top + r.height / 2)) / r.height));
      cena.style.transform = `rotateY(${(dx * 5).toFixed(2)}deg) rotateX(${(-dy * 4).toFixed(2)}deg)`;
    };
    ouvintesPonteiro.add(mover);
    aoLimpar(() => ouvintesPonteiro.delete(mover));
  }

  /* ---------- ponteiro e lanterna ---------- */
  const ouvintesPonteiro = new Set();
  function aoMover(x, y) {
    ponteiro.x = x; ponteiro.y = y;
    ouvintesPonteiro.forEach((f) => f());
  }
  addEventListener('pointermove', (e) => aoMover(e.clientX, e.clientY), { passive: true });
  addEventListener('touchstart', (e) => { const t = e.touches[0]; if (t) aoMover(t.clientX, t.clientY); }, { passive: true });
  addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) aoMover(t.clientX, t.clientY); }, { passive: true });

  function aplicarLanterna(p) {
    const modo = pref.luz ? p.lanterna : null;
    lanterna.hidden = modo !== 'tudo';
    lanterna.style.opacity = '';
    lanterna.classList.remove('pisca');
    const esc = $('.escuro-arte', pagina);
    if (esc) esc.style.opacity = modo === 'arte' ? 1 : 0;
    $('.dica-palco', pagina).textContent = dicaDoPalco(p);
    brilhos.innerHTML = ''; const ba = $('.brilhos-arte', pagina); if (ba) ba.innerHTML = '';
    if (ultimoLoop) ultimoLoop();
    if (!modo) return;
    ultimoLoop = acenderBrilhos(modo);
    aoLimpar(ultimoLoop);
    const posLuz = () => {
      const barra = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--barra')) || 52;
      lanterna.style.setProperty('--lx', ponteiro.x + 'px');
      lanterna.style.setProperty('--ly', (ponteiro.y - barra) + 'px');
      const e = $('.escuro-arte', pagina);
      if (e) { const r = e.getBoundingClientRect(); e.style.setProperty('--lx', (ponteiro.x - r.left) + 'px'); e.style.setProperty('--ly', (ponteiro.y - r.top) + 'px'); }
    };
    posLuz();
    ouvintesPonteiro.add(posLuz);
    const tremula = setInterval(() => {
      const base = Math.max(95, Math.min(170, Math.min(innerWidth, innerHeight) * 0.19));
      lanterna.style.setProperty('--lr1', (base * (0.92 + Math.random() * 0.1)) + 'px');
      lanterna.style.setProperty('--lr2', (base * (1.85 + Math.random() * 0.15)) + 'px');
    }, 110);
    aoLimpar(() => { ouvintesPonteiro.delete(posLuz); clearInterval(tremula); });
  }
  let ultimoLoop = null;
  function acenderBrilhos(modo) {
    const alvo = modo === 'tudo' ? brilhos : $('.brilhos-arte', pagina);
    if (!alvo) return () => {};
    const els = $$('[data-brilho]', pagina);
    const nos = els.map((el) => {
      const d = document.createElement('div');
      const t = el.dataset.brilho;
      d.className = 'brilho-olho' + (t === 'fogo' ? ' fogo' : t === 'vela' || t === 'lamp' ? ' quente' : '');
      alvo.appendChild(d);
      return d;
    });
    let vivo = true;
    const quadro = () => {
      if (!vivo) return;
      const base = modo === 'tudo' ? { left: 0, top: 0 } : alvo.getBoundingClientRect();
      els.forEach((el, k) => {
        const r = el.getBoundingClientRect();
        const t = el.dataset.brilho;
        const m = t === 'vela' || t === 'lamp' ? 5 : t === 'sombra' ? 0 : t === 'fogo' ? 2.6 : 2;
        let w = Math.max(r.width, 6) * m, h = Math.max(r.height, 6) * m;
        if (t === 'sombra') { w = 34; h = 22; }
        const st = nos[k].style;
        st.left = (r.left - base.left + r.width / 2 - w / 2) + 'px';
        st.top = (r.top - base.top + r.height / 2 - h / 2) + 'px';
        st.width = w + 'px'; st.height = h + 'px';
      });
      requestAnimationFrame(quadro);
    };
    quadro();
    return () => { vivo = false; nos.forEach((n) => n.remove()); };
  }

  /* ---------- gatilhos de susto ---------- */
  function palavrasAntes(el) {
    const texto = el.closest('.texto');
    const rng = document.createRange();
    rng.setStart(texto, 0); rng.setEndBefore(el);
    return rng.toString().split(/\s+/).filter(Boolean).length;
  }
  function observarGatilhos() {
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const quando = abertura + palavrasAntes(el) * 330; // ~3 palavras por segundo
      depois(Math.max(0, quando - performance.now()), () => disparar(el.dataset.susto, el));
    }), { rootMargin: '0px 0px -35% 0px', threshold: 1 });
    $$('.gatilho', pagina).forEach((g) => io.observe(g));
    aoLimpar(() => io.disconnect());
  }

  function disparar(tipo, el) {
    if (el) el.classList.add('disparado');
    const forte = pref.sustos;
    switch (tipo) {
      case 'sussurro':
        S.efeito('sussurro'); if (el && forte) { el.classList.add('treme'); }
        break;
      case 'tremor':
        S.efeito('baque'); if (forte) sacudir();
        break;
      case 'sombra':
        if (forte) { sombraGato(); S.efeito('miado'); }
        break;
      case 'olho':
        estado('depois');
        if (forte) { piscar('sangue', true); S.efeito('susto'); S.efeito('miado', true); sacudir(); } else S.efeito('miado');
        break;
      case 'relampago':
        if (forte) relampago(); else S.efeito('trovao');
        break;
      case 'fogo':
        S.efeito('fogo'); if (forte) piscar('fogo');
        break;
      case 'parede': {
        S.efeito('sussurro');
        const e = $('.escuro-arte', pagina);
        if (e && pref.luz) { e.style.opacity = 0.15; depois(2600, () => { e.style.opacity = 1; }); }
        break;
      }
      case 'olhos':
        S.efeito('miado'); if (forte) olhosNaMargem(3);
        break;
      case 'garras':
        if (forte) { garras(); S.efeito('miado', true); } else S.efeito('miado');
        break;
      case 'forca': {
        const cena = $('.cena', pagina); if (cena) cena.classList.add('forca-acesa');
        S.acelerar(150); depois(7000, () => S.acelerar(84));
        if (forte) { piscar('preto'); sacudir(); S.efeito('susto'); }
        break;
      }
      case 'halito':
        S.efeito('respiro'); if (forte) nevoa();
        break;
      case 'machado':
        S.efeito('baque');
        if (forte) { piscar('preto', false, 700); S.efeito('miado', true); depois(650, () => { estado('depois'); respingos(); sacudir(); }); }
        else estado('depois');
        break;
      case 'calma':
        S.acelerar(48);
        break;
      case 'uivo':
        S.efeito('uivo');
        if (forte) { depois(2200, sacudir); if (!lanterna.hidden) lanterna.classList.add('pisca'); }
        break;
      case 'final':
        S.efeito('miado', true);
        if (forte) piscar('sangue', true);
        if (!lanterna.hidden) depois(900, () => { lanterna.style.opacity = 0; });
        break;
    }
  }

  function estado(e) { const p = $('.parte', pagina); if (p) p.classList.toggle('estado-depois', e === 'depois'); }
  function sacudir() {
    if (reduzMov) return;
    document.body.classList.remove('sacode'); void document.body.offsetWidth; document.body.classList.add('sacode');
    depois(500, () => document.body.classList.remove('sacode'));
  }
  function piscar(tipo, comOlho = false, dur = 240) {
    const fundos = { sangue: '#6e0808', preto: '#000', branco: '#f4f0e6', fogo: 'radial-gradient(circle at 50% 70%, #f0b04a, #a3110d 60%, #2a0303)' };
    flashEl.style.background = fundos[tipo] || '#000';
    flashEl.innerHTML = comOlho ? A.olhoSolto() : '';
    const quadros = tipo === 'fogo'
      ? [{ opacity: 0 }, { opacity: 0.7 }, { opacity: 0.2 }, { opacity: 0.6 }, { opacity: 0 }]
      : [{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.7 }, { opacity: 0 }];
    flashEl.animate(quadros, { duration: tipo === 'fogo' ? 1200 : dur, easing: 'linear' });
  }
  function relampago() {
    flashEl.style.background = '#f4f0e6'; flashEl.innerHTML = '';
    flashEl.animate([{ opacity: 0 }, { opacity: 0.9, offset: 0.08 }, { opacity: 0, offset: 0.22 }, { opacity: 0.7, offset: 0.34 }, { opacity: 0 }], { duration: 700 });
    depois(350, () => S.efeito('trovao'));
  }
  function sombraGato() {
    const s = $('#sombra-gato');
    s.innerHTML = A.sombra();
    s.classList.remove('anda'); void s.offsetWidth; s.classList.add('anda');
    depois(4400, () => s.classList.remove('anda'));
  }
  function olhosNaMargem(n) {
    const c = $('#olhos-margem');
    for (let k = 0; k < n; k++) {
      const par = document.createElement('div');
      par.className = 'par';
      const lado = Math.random() < 0.5;
      par.style.left = (lado ? 2 + Math.random() * 10 : 80 + Math.random() * 12) + 'vw';
      par.style.top = (18 + Math.random() * 68) + 'vh';
      par.style.animationDelay = (k * 0.5) + 's';
      par.innerHTML = A.olhoSolto() + (Math.random() < 0.5 ? A.olhoSolto() : '');
      c.appendChild(par);
      depois(4200 + k * 500, () => par.remove());
    }
  }
  function garras() {
    const g = $('#garras');
    let d = '';
    for (let k = 0; k < 4; k++) d += `<path d="M${18 + k * 7},${-5 + k * 3} C${40 + k * 7},${30 + k * 2} ${58 + k * 6},${60 + k * 3} ${78 + k * 6},${108}" />`;
    g.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><g fill="none" stroke="#6e0808" stroke-width="1.6" stroke-linecap="round" vector-effect="non-scaling-stroke">${d}</g></svg>`;
    $$('path', g).forEach((p, k) => { p.style.strokeWidth = '9px'; p.setAttribute('vector-effect', 'non-scaling-stroke'); p.style.animationDelay = k * 60 + 'ms'; });
    depois(1800, () => g.firstChild && g.firstChild.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, fill: 'forwards' }));
  }
  function nevoa() {
    const n = document.createElement('div'); n.className = 'nevoa'; document.body.appendChild(n);
    depois(2700, () => n.remove());
    aoLimpar(() => n.remove());
  }
  function respingos() {
    let s = '';
    const gotas = (cx, cy, R, n) => {
      let g = `<ellipse cx="${cx}" cy="${cy}" rx="${R * 0.5}" ry="${R * 0.38}"/>`;
      for (let k = 0; k < n; k++) { const a = Math.random() * 6.28, dd = R * (0.4 + Math.random() * 1.3), rr = 1 + Math.random() * R * 0.12; g += `<circle cx="${(cx + Math.cos(a) * dd).toFixed(1)}" cy="${(cy + Math.sin(a) * dd).toFixed(1)}" r="${rr.toFixed(1)}"/>`; }
      return g;
    };
    s += gotas(92, 12, 16, 22) + gotas(8, 70, 12, 16) + gotas(96, 88, 10, 14) + gotas(60, 4, 7, 10);
    $('#respingos').innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="none"><g fill="#6e0808" opacity=".85" filter="url(#sangue)">${s}</g></svg>`;
    const el = $('#respingos').firstChild;
    el.animate([{ opacity: 0 }, { opacity: 1, offset: 0.03 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], { duration: 9000, fill: 'forwards' });
  }
  function sustosSoltos() {
    let vivo = true, id;
    const proximo = () => {
      id = setTimeout(() => {
        if (!vivo) return;
        if (pref.sustos && !document.hidden) { if (Math.random() < 0.5) { sombraGato(); S.efeito('miado'); } else olhosNaMargem(1); }
        proximo();
      }, 38000 + Math.random() * 40000);
    };
    proximo();
    aoLimpar(() => { vivo = false; clearTimeout(id); });
  }

  /* ---------- mecânicas de cenas específicas ---------- */
  function olhoQueSegue() {
    const pupila = $('.pupila-segue', pagina);
    if (!pupila) return;
    const cx = +pupila.getAttribute('cx'), cy = +pupila.getAttribute('cy');
    const mover = () => {
      const r = pupila.getBoundingClientRect();
      if (!r.width) return;
      const ox = r.left + r.width / 2, oy = r.top + r.height / 2;
      const a = Math.atan2(ponteiro.y - oy, ponteiro.x - ox);
      const d = Math.min(1, Math.hypot(ponteiro.x - ox, ponteiro.y - oy) / 200);
      pupila.setAttribute('cx', (cx + Math.cos(a) * 7 * d).toFixed(2));
      pupila.setAttribute('cy', (cy + Math.sin(a) * 4 * d).toFixed(2));
    };
    ouvintesPonteiro.add(mover);
    aoLimpar(() => ouvintesPonteiro.delete(mover));
  }
  function paredeQueSobe() {
    const fileiras = $$('.fileira', pagina);
    const texto = $('.texto', pagina);
    const total = fileiras.length;
    const atualiza = () => {
      const r = texto.getBoundingClientRect();
      const porLeitura = (innerHeight * 0.65 - r.top) / Math.max(1, r.height);
      const porTempo = (performance.now() - abertura) / 150000;
      const prog = Math.max(0, Math.min(1, Math.max(porLeitura, porTempo)));
      const n = Math.round(prog * total * 1.08);
      fileiras.forEach((f, k) => f.classList.toggle('posta', k < n));
    };
    const onScroll = () => requestAnimationFrame(atualiza);
    addEventListener('scroll', onScroll, { passive: true });
    const t = setInterval(atualiza, 1500);
    depois(1800, atualiza);
    aoLimpar(() => { removeEventListener('scroll', onScroll); clearInterval(t); });
  }
  function batidas() {
    let n = 0;
    const bt = $('#bt-bater', pagina);
    const bater = () => {
      if (n >= 3) return;
      n++;
      S.iniciar();
      S.efeito('pancada');
      const racha = $(`.racha-${n}`, pagina); if (racha) racha.classList.add('visivel');
      bt.textContent = `Bater (${n}/3)`;
      if (pref.sustos) { const c = $('.cena', pagina); c.animate([{ translate: '0 0' }, { translate: '3px 0' }, { translate: '-3px 0' }, { translate: '0 0' }], { duration: 160 }); }
      if (n === 3) {
        bt.disabled = true; bt.textContent = 'Silêncio…';
        S.acelerar(40);
        depois(1600, () => { S.efeito('soluco'); bt.textContent = 'Você ouviu isso?'; });
        depois(5200, () => ir(atual + 1, { dir: 1 }));
      }
    };
    bt.addEventListener('click', bater);
    const alvo = $('.alvo-parede', pagina);
    if (alvo) alvo.addEventListener('click', bater);
  }

  /* ---------- fim ---------- */
  function montarFim() {
    lanterna.hidden = true;
    S.ambiente('fim');
    pagina.innerHTML = `
      <section class="fim">
        <div class="olho-fim">${A.olhoSolto()}</div>
        <h2>Fim</h2>
        <p class="aviso-final">Eu avisei.<br>Não era para bater na parede.</p>
        <section class="pare" aria-label="Perguntas finais">
          <h3>Para discutir em grupo</h3>
          <ol>${window.FINAL_PERGUNTAS.map((q) => `<li><p>${q}</p></li>`).join('')}</ol>
        </section>
        <nav class="navega" style="margin:0 auto">
          <button class="botao botao-voltar" type="button" data-fim="reler" style="color:var(--papel);box-shadow:inset 0 0 0 2px var(--papel)">Reler desde o começo</button>
          <button class="botao" type="button" data-fim="capa">Voltar à capa</button>
        </nav>
        <p class="creditos">Texto: Edgar Allan Poe, “The Black Cat” (1843), obra em domínio público, em tradução integral para o português feita para esta leitura. Ilustrações desenhadas em código, com textura de carvão e recortes de livro pop-up, inspiradas na estética dos livros ilustrados de terror. Todos os sons são sintetizados no próprio navegador.</p>
      </section>`;
    $('[data-fim="reler"]', pagina).addEventListener('click', () => ir(0, { dir: -1 }));
    $('[data-fim="capa"]', pagina).addEventListener('click', mostrarCapa);
    depois(1200, () => S.efeito('miado'));
  }

  // abre direto numa parte quando o endereço tem #parte-N (útil para o professor)
  if (indiceDoEndereco() != null) $('#abrir').textContent = indiceDoEndereco() >= H.length ? 'Abrir no fim' : `Abrir na parte ${H[indiceDoEndereco()].numero}`;
})();
