/* Sons sintetizados com a Web Audio API: nada é baixado da internet.
   Cada ambiente devolve uma função que o desliga. */
(function () {
  let ctx = null, mestre = null, ruidoBuf = null, ligado = true;
  let ambienteAtual = null, nomeAtual = null, coracao = null;

  function iniciar() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    mestre = ctx.createGain();
    mestre.gain.value = ligado ? 0.9 : 0;
    const comp = ctx.createDynamicsCompressor();
    mestre.connect(comp); comp.connect(ctx.destination);
    ruidoBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = ruidoBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const agora = () => ctx.currentTime;
  const ok = () => ctx && mestre;

  function ganho(v, destino = mestre) { const g = ctx.createGain(); g.gain.value = v; g.connect(destino); return g; }
  function ruido(destino) { const s = ctx.createBufferSource(); s.buffer = ruidoBuf; s.loop = true; s.connect(destino); s.start(); return s; }
  function filtro(tipo, freq, q = 1, destino) { const b = ctx.createBiquadFilter(); b.type = tipo; b.frequency.value = freq; b.Q.value = q; if (destino) b.connect(destino); return b; }
  function osc(tipo, freq, destino) { const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = freq; o.connect(destino); o.start(); return o; }
  function lfo(freq, prof, alvo) { const o = ctx.createOscillator(); o.frequency.value = freq; const g = ctx.createGain(); g.gain.value = prof; o.connect(g); g.connect(alvo); o.start(); return o; }
  function envelope(g, pico, ataque, dur) {
    const t = agora();
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(pico, t + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, t + ataque + dur);
  }
  function repetir(fn, min, max) {
    let vivo = true, id;
    const passo = () => { if (!vivo) return; fn(); id = setTimeout(passo, min + Math.random() * (max - min)); };
    id = setTimeout(passo, Math.random() * min);
    return () => { vivo = false; clearTimeout(id); };
  }

  /* ---------- efeitos ---------- */
  const efeitos = {
    gota() {
      const g = ganho(0); const o = osc('sine', 1400, g);
      o.frequency.exponentialRampToValueAtTime(380, agora() + 0.09);
      envelope(g, 0.12, 0.005, 0.12); o.stop(agora() + 0.3);
    },
    batida(vol = 0.5) { // um "tum" de coração
      const g = ganho(0); const o = osc('sine', 62, g);
      o.frequency.exponentialRampToValueAtTime(40, agora() + 0.18);
      envelope(g, vol, 0.01, 0.22); o.stop(agora() + 0.4);
    },
    coracao(vol = 0.5) { efeitos.batida(vol); setTimeout(() => efeitos.batida(vol * 0.7), 190); },
    folha() { // virar a página
      const g = ganho(0); const f = filtro('bandpass', 2400, 0.6, g); const s = ruido(f);
      f.frequency.setValueAtTime(800, agora()); f.frequency.exponentialRampToValueAtTime(4200, agora() + 0.35);
      envelope(g, 0.35, 0.05, 0.4); s.stop(agora() + 0.6);
    },
    miado(agudo = false) {
      const g = ganho(0), f1 = filtro('bandpass', agudo ? 1500 : 1100, 4, g), f2 = filtro('bandpass', agudo ? 2600 : 2100, 5, g);
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.connect(f1); o.connect(f2);
      const t = agora(), base = agudo ? 620 : 480;
      o.frequency.setValueAtTime(base, t); o.frequency.linearRampToValueAtTime(base * 1.7, t + 0.35); o.frequency.linearRampToValueAtTime(base * 1.1, t + (agudo ? 1.2 : 0.8));
      lfo(7, agudo ? 40 : 12, o.frequency);
      o.start(); envelope(g, agudo ? 0.9 : 0.5, 0.06, agudo ? 1.2 : 0.8); o.stop(t + 1.6);
      if (agudo) { const gn = ganho(0), fn = filtro('highpass', 3000, 0.7, gn), s = ruido(fn); envelope(gn, 0.15, 0.03, 1.0); s.stop(t + 1.3); }
    },
    trovao() {
      const g = ganho(0), f = filtro('lowpass', 400, 0.7, g), s = ruido(f);
      const t = agora(); f.frequency.setValueAtTime(1200, t); f.frequency.exponentialRampToValueAtTime(90, t + 3);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(1.2, t + 0.05); g.gain.exponentialRampToValueAtTime(0.4, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
      s.stop(t + 3.6);
    },
    baque() {
      const g = ganho(0); const o = osc('sine', 90, g); o.frequency.exponentialRampToValueAtTime(30, agora() + 0.4);
      envelope(g, 1.2, 0.005, 0.5); o.stop(agora() + 0.7);
      const gn = ganho(0), fn = filtro('lowpass', 900, 0.8, gn), s = ruido(fn); envelope(gn, 0.6, 0.005, 0.25); s.stop(agora() + 0.4);
    },
    pancada() { // bengala na parede
      const g = ganho(0), f = filtro('bandpass', 380, 2, g), s = ruido(f); envelope(g, 1.4, 0.002, 0.16); s.stop(agora() + 0.3);
      const g2 = ganho(0); const o = osc('triangle', 140, g2); envelope(g2, 0.5, 0.002, 0.2); o.stop(agora() + 0.3);
    },
    susto() { // acorde dissonante de choque
      const g = ganho(0), f = filtro('lowpass', 3000, 0.5, g);
      const t = agora();
      [110, 116.5, 233, 349, 370].forEach((fr) => { const o = osc('sawtooth', fr, f); o.stop(t + 2.2); });
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
    },
    sussurro() {
      const g = ganho(0), f = filtro('bandpass', 2600, 3, g), s = ruido(f);
      const t = agora(); lfo(9, 900, f.frequency);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.4); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
      s.stop(t + 2);
    },
    tilintar() {
      const t = agora();
      [2637, 3520, 4186].forEach((fr, i) => { const g = ganho(0); const o = osc('sine', fr, g); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06 / (i + 1), t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2); o.stop(t + 1.3); });
    },
    rangido() { // corda rangendo no galho
      const g = ganho(0), f = filtro('bandpass', 900, 8, g);
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.connect(f);
      const t = agora(); o.frequency.setValueAtTime(70, t); o.frequency.linearRampToValueAtTime(110, t + 0.8);
      lfo(31, 20, o.frequency); o.start(); envelope(g, 0.18, 0.3, 0.7); o.stop(t + 1.2);
    },
    soluco() { // soluço abafado de criança, dentro da parede
      const t = agora(); const g = ganho(0), f = filtro('lowpass', 900, 1, g);
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 330; o.connect(f); lfo(5, 18, o.frequency); o.start();
      g.gain.setValueAtTime(0.0001, t);
      for (let i = 0; i < 6; i++) { const ti = t + i * 0.42 + Math.random() * 0.08; g.gain.exponentialRampToValueAtTime(0.18, ti + 0.06); g.gain.exponentialRampToValueAtTime(0.01, ti + 0.3); }
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3); o.stop(t + 3.1);
    },
    uivo() { // o grito do túmulo: começa como soluço e vira um guincho inumano
      const t = agora(), dur = 5.5;
      const g = ganho(0), f1 = filtro('bandpass', 850, 3, g), f2 = filtro('bandpass', 1250, 4, g), f3 = filtro('bandpass', 2900, 6, g);
      [1, 1.007, 0.993, 1.5].forEach((m) => {
        const o = ctx.createOscillator(); o.type = 'sawtooth'; o.connect(f1); o.connect(f2); o.connect(f3);
        o.frequency.setValueAtTime(300 * m, t); o.frequency.linearRampToValueAtTime(360 * m, t + 1.2); o.frequency.exponentialRampToValueAtTime(820 * m, t + 2.6); o.frequency.linearRampToValueAtTime(700 * m, t + dur);
        lfo(6 + Math.random() * 2, 25, o.frequency); o.start(); o.stop(t + dur + 0.2);
      });
      g.gain.setValueAtTime(0.0001, t);
      for (let i = 0; i < 3; i++) { g.gain.exponentialRampToValueAtTime(0.12, t + i * 0.4 + 0.1); g.gain.exponentialRampToValueAtTime(0.02, t + i * 0.4 + 0.33); }
      g.gain.exponentialRampToValueAtTime(1.1, t + 2.6); g.gain.setValueAtTime(1.1, t + 4.2); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const gn = ganho(0), fn = filtro('bandpass', 3200, 1.5, gn), s = ruido(fn);
      gn.gain.setValueAtTime(0.0001, t + 1.2); gn.gain.exponentialRampToValueAtTime(0.35, t + 2.6); gn.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.stop(t + dur + 0.2);
    },
    fogo() {
      const g = ganho(0), f = filtro('lowpass', 700, 0.7, g), s = ruido(f);
      const t = agora(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.9, t + 0.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.5); s.stop(t + 2.6);
      for (let i = 0; i < 18; i++) setTimeout(() => efeitos.estalo(0.5), Math.random() * 2000);
    },
    estalo(vol = 0.25) {
      const g = ganho(0), f = filtro('highpass', 1500 + Math.random() * 3000, 1, g), s = ruido(f);
      envelope(g, vol, 0.001, 0.03 + Math.random() * 0.05); s.stop(agora() + 0.12);
    },
    respiro() {
      const g = ganho(0), f = filtro('bandpass', 700, 0.8, g), s = ruido(f);
      const t = agora(); f.frequency.setValueAtTime(500, t); f.frequency.linearRampToValueAtTime(1100, t + 1.2);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.4, t + 1.1); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2); s.stop(t + 2.3);
    }
  };

  /* ---------- camadas contínuas ---------- */
  function drone(freq, vol, corte = 260) {
    const g = ganho(0), f = filtro('lowpass', corte, 1.2, g);
    const os = [osc('sawtooth', freq, f), osc('sawtooth', freq * 1.006, f), osc('sine', freq / 2, g)];
    lfo(0.07, corte * 0.5, f.frequency);
    g.gain.setTargetAtTime(vol, agora(), 1.5);
    return () => { g.gain.setTargetAtTime(0.0001, agora(), 0.6); os.forEach((o) => o.stop(agora() + 3)); };
  }
  function vento(vol) {
    const g = ganho(0), f = filtro('bandpass', 500, 1.4, g), s = ruido(f);
    lfo(0.13, 350, f.frequency); lfo(0.21, vol * 0.5, g.gain);
    g.gain.setTargetAtTime(vol, agora(), 1.5);
    return () => { g.gain.setTargetAtTime(0.0001, agora(), 0.6); s.stop(agora() + 3); };
  }
  function ronrom(vol) {
    const g = ganho(0), f = filtro('lowpass', 320, 1, g), am = ctx.createGain(); am.gain.value = 0.5; am.connect(f);
    const s = ruido(am); lfo(24, 0.5, am.gain); lfo(0.35, vol * 0.6, g.gain);
    g.gain.setTargetAtTime(vol, agora(), 1);
    return () => { g.gain.setTargetAtTime(0.0001, agora(), 0.5); s.stop(agora() + 3); };
  }
  function murmurio(vol) {
    const g = ganho(0), f = filtro('bandpass', 420, 2.5, g), s = ruido(f); lfo(0.9, 120, f.frequency); lfo(0.4, vol * 0.7, g.gain);
    g.gain.setTargetAtTime(vol, agora(), 1);
    return () => { g.gain.setTargetAtTime(0.0001, agora(), 0.5); s.stop(agora() + 3); };
  }
  function crepitar(vol) {
    const g = ganho(0), f = filtro('lowpass', 500, 0.6, g), s = ruido(f); g.gain.setTargetAtTime(vol, agora(), 1);
    const para = repetir(() => efeitos.estalo(0.12 + Math.random() * 0.2), 60, 420);
    return () => { para(); g.gain.setTargetAtTime(0.0001, agora(), 0.5); s.stop(agora() + 3); };
  }
  function caixaDeMusica(vol) { // canção de ninar desafinada
    const notas = [659, 587, 523, 494, 523, 440, 494, 415, 440, 0, 523, 494, 440, 392, 415, 330];
    let i = 0;
    const para = repetir(() => {
      const fr = notas[i++ % notas.length]; if (!fr) return;
      const g = ganho(0); const o = osc('sine', fr * (1 + (Math.random() - 0.5) * 0.02), g); const o2 = osc('triangle', fr * 2.01, g);
      const t = agora(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.stop(t + 1.7); o2.stop(t + 1.7);
    }, 520, 700);
    return para;
  }
  function batimentos(bpm, vol) {
    let vivo = true, id;
    const passo = () => { if (!vivo) return; efeitos.coracao(vol); id = setTimeout(passo, 60000 / (coracao ? coracao.bpm : bpm)); };
    coracao = { bpm };
    passo();
    return () => { vivo = false; clearTimeout(id); coracao = null; };
  }

  const AMBIENTES = {
    capa: () => [drone(41, 0.16, 200), vento(0.05)],
    cela: () => [drone(49, 0.2), repetir(efeitos.gota, 1800, 4200), vento(0.04)],
    lar: () => [drone(55, 0.08, 180), caixaDeMusica(0.05), ronrom(0.08)],
    taverna: () => [drone(46, 0.14), murmurio(0.14), repetir(efeitos.tilintar, 3000, 7000)],
    tensao: () => [drone(58, 0.22, 400), batimentos(92, 0.35)],
    vento: () => [vento(0.28), drone(44, 0.12), repetir(efeitos.rangido, 2600, 4200)],
    fogo: () => [crepitar(0.16), drone(40, 0.14)],
    ronrom: () => [ronrom(0.22), drone(52, 0.12)],
    pesadelo: () => [drone(38, 0.22, 220), batimentos(70, 0.45), repetir(efeitos.respiro, 3500, 5200)],
    porao: () => [drone(43, 0.18), repetir(efeitos.gota, 2000, 5000)],
    policia: () => [drone(47, 0.12), batimentos(58, 0.3)],
    grito: () => [drone(36, 0.25, 300)],
    fim: () => [drone(41, 0.12, 200)]
  };

  function ambiente(nome) {
    if (!ok() || nome === nomeAtual) return;
    parar();
    nomeAtual = nome;
    const f = AMBIENTES[nome];
    if (f) { const paradas = f(); ambienteAtual = () => paradas.forEach((p) => p && p()); }
  }
  function parar() { if (ambienteAtual) ambienteAtual(); ambienteAtual = null; nomeAtual = null; }

  window.SOM = {
    iniciar,
    ambiente,
    parar,
    efeito(nome, ...a) { if (ok() && efeitos[nome]) efeitos[nome](...a); },
    acelerar(bpm) { if (coracao) coracao.bpm = bpm; },
    ligar(v) { ligado = v; if (mestre) mestre.gain.setTargetAtTime(v ? 0.9 : 0, agora(), 0.2); },
    get ligado() { return ligado; }
  };
})();
