// ---- WHOLESALE store settings ----
// moq = default minimum order pieces per product (product me 'moq' likhoge to wahi chalega).
// step = (optional, product me) quantity kitne ke jump se badhe, jaise pack of 6 ke liye step: 6.
// UPI payment chalu karne ke liye apni UPI ID daalo, jaise 'name@upi'. Khaali chhodoge to Prepaid band rahega.
const SETTINGS = { cod: true, prepaid: true, open: true, upi: '', upiName: '', maintMsg: '', moq: 1 };

const PRODUCTS = [];

const ART = {
    shirt: `<path class="a" d="M70 34L28 58l14 36 20-10v86h76V84l20 10 14-36-42-24q-30 20-60 0z"/><path class="b" d="M70 34l20 8 10 20-22 6zM130 34l-20 8-10 20 22 6z"/><path class="sk" stroke-width="2" d="M100 62v106"/><circle class="k" cx="100" cy="82" r="2.6"/><circle class="k" cx="100" cy="106" r="2.6"/><circle class="k" cx="100" cy="130" r="2.6"/><circle class="k" cx="100" cy="154" r="2.6"/><rect class="c" x="110" y="96" width="18" height="20" rx="3"/>`,
    tshirt: `<path class="a" d="M72 36L30 60l14 34 18-8v86h76V86l18 8 14-34-42-24q-28 16-56 0z"/><path class="sb" stroke-width="7" stroke-linecap="round" d="M72 36q28 18 56 0"/><circle class="w" opacity=".85" cx="100" cy="110" r="14"/><path class="c" d="M94 110l6-8 6 8-6 8z"/>`,
    jeans: `<path class="a" d="M62 28h76l10 150h-36l-12-92-12 92H52z"/><rect class="b" x="62" y="28" width="76" height="14" rx="3"/><path class="sk" stroke-width="2.5" stroke-linecap="round" d="M100 42v44M70 52q10 14 22 2M130 52q-10 14-22 2"/><circle class="k" cx="100" cy="35" r="3"/>`,
    kurti: `<path class="a" d="M70 26L40 48l8 30 16-6-12 106h96L136 72l16 6 8-30-30-22q-30 26-60 0z"/><path class="sb" stroke-width="6" stroke-linecap="round" d="M70 26q30 26 60 0"/><path class="b" d="M52 164h96l2 14H50z"/><path class="sw" stroke-width="2.5" stroke-linecap="round" d="M100 54v50"/><circle class="w" cx="100" cy="112" r="4"/>`,
    kurta: `<path class="a" d="M72 28L38 48l8 36 18-8-4 96h80l-4-96 18 8 8-36-34-20q-28 18-56 0z"/><path class="b" d="M72 28q28 18 56 0l-4 10q-24 12-48 0z"/><path class="sk" stroke-width="2" d="M100 44v70"/><circle class="k" cx="100" cy="60" r="2.6"/><circle class="k" cx="100" cy="82" r="2.6"/><circle class="k" cx="100" cy="104" r="2.6"/><rect class="b" x="60" y="160" width="80" height="12"/>`,
    saree: `<path class="a" d="M58 26c20 8 56 8 84 0l16 152H42z"/><path class="b" d="M58 26c20 8 56 8 84 0l2 14c-28 8-64 8-88 0z"/><path class="sb" opacity=".5" stroke-width="3" d="M70 58l-8 120M90 62l-4 116M110 62l4 116M130 58l8 120"/><rect class="b" x="42" y="164" width="116" height="14"/>`,
    dress: `<path class="a" d="M80 22L72 76 36 178h128l-36-102-8-54-20 18z"/><path class="b" d="M72 76h56l3 9H69z"/><path class="sw" stroke-width="3" stroke-linecap="round" d="M80 22q20 22 40 0"/><path class="sk" opacity=".25" stroke-width="3" d="M90 90l-14 88M110 90l14 88M100 92v86"/>`,
    frock: `<path class="a" d="M84 28l-4 36-46 114h132l-46-114-4-36-16 12z"/><path class="b" opacity=".7" d="M34 150q33 22 66 8t66-8v28H34z"/><circle class="b" cx="76" cy="36" r="13"/><circle class="b" cx="124" cy="36" r="13"/><rect class="c" x="76" y="62" width="48" height="8" rx="3"/><path class="w" d="M100 64l-14-9v18zM100 64l14-9v18z"/>`,
    hoodie: `<path class="a" d="M64 46L24 68l10 82 24-4v24h84v-24l24 4 10-82-40-22z"/><path class="b" d="M68 46q32 40 64 0-6-26-32-30-26 4-32 30z"/><path class="sw" stroke-width="3" stroke-linecap="round" d="M92 74v28M108 74v28"/><rect class="c" x="72" y="126" width="56" height="30" rx="10"/><rect class="b" x="58" y="164" width="84" height="8" rx="3"/>`,
    jacket: `<path class="a" d="M70 34L28 56l-6 96 22 4 8-60v76h96v-76l8 60 22-4-6-96-42-22q-30 12-60 0z"/><path class="b" d="M70 34q30 12 60 0l-3 14q-27 10-54 0z"/><rect class="b" x="52" y="158" width="96" height="12" rx="3"/><path class="sk" stroke-width="2.5" d="M100 48v110"/><rect class="c" x="64" y="104" width="22" height="3" rx="1.5"/><rect class="c" x="114" y="104" width="22" height="3" rx="1.5"/>`
  };

(() => {
  'use strict';
  /* ---- Firebase connection (direct, no fast.js needed) ---- */
  const FB = (() => {
    const PID = 'wholesale-76fd2';
    const cfg = { apiKey: "AIzaSyBJaj2zyVpN2X6AysWiMLGWO6ah0NOg6T4", authDomain: PID + ".firebaseapp.com", projectId: PID, appId: "1:1093831529804:web:490ced132e72808237abe9" };
    const URLS = ['https://' + PID + '-default-rtdb.firebaseio.com', 'https://' + PID + '-default-rtdb.asia-southeast1.firebasedatabase.app', 'https://' + PID + '-default-rtdb.europe-west1.firebasedatabase.app'];
    let DB = null, ERR = '';
    const P = p => String(p).split('/').filter(Boolean).join('/');
    const denied = e => /permission/i.test(String(e && (e.code || e.message) || e));
    const probe = (url, i) => new Promise(res => {
      let app, db; try { app = firebase.initializeApp(cfg, 'p' + i); db = app.database(url); } catch (e) { return res({ url, err: String(e && e.message || e) }); }
      const t = setTimeout(() => res({ url, db, err: 'timeout' }), 8000);
      db.ref('ver').get().then(() => { clearTimeout(t); res({ url, db, ok: 1 }); }, e => { clearTimeout(t); res({ url, db, err: denied(e) ? 'denied' : String(e && e.message || e) }); });
    });
    const ready = (async () => {
      if (!window.firebase) { ERR = 'Firebase script load nahi hui (internet check karo).'; return; }
      let saved = ''; try { saved = localStorage.getItem('fb.url') || ''; } catch (e) {}
      const pick = list => new Promise(done => { const all = []; let n = list.length;
        list.forEach((u, i) => probe(u, i).then(r => { all.push(r); if (r.ok) done(r); else if (--n === 0) done(all.find(x => x.err === 'denied') || all[0]); })); });
      let r = saved ? await pick([saved]) : null;
      if (!r || (!r.ok && r.err !== 'denied')) r = await pick(URLS);
      if (r && r.db && (r.ok || r.err === 'denied')) { DB = r.db; if (r.ok) { try { localStorage.setItem('fb.url', r.url); } catch (e) {} } else ERR = 'Permission denied: Firebase Realtime Database > Rules check karo.'; }
      else ERR = 'Database nahi mila. (' + (r && r.err || 'unknown') + ')';
    })();
    async function rest(m, p, b) {
      await ready;
      if (!DB) throw new Error(ERR || 'Database not set');
      const r = DB.ref(P(p));
      if (m === 'GET') return (await r.get()).val();
      if (m === 'PUT') {
        if (b && b['.sv'] && b['.sv'].increment !== undefined) { await r.set(firebase.database.ServerValue.increment(b['.sv'].increment)); return null; }
        await r.set(b === undefined ? null : b); return b;
      }
      if (m === 'PATCH') { await r.update(b); return b; }
      if (m === 'DELETE') { await r.remove(); return null; }
      throw new Error('Bad method ' + m);
    }
    /* calls cb whenever the value at path changes (live) */
    function listen(path, cb) {
      ready.then(() => { if (!DB) return; let first = true; DB.ref(P(path)).on('value', () => { if (first) { first = false; return; } try { cb(); } catch (e) {} }); });
    }
    return { rest, listen };
  })();
  /* Big photos of one product (loaded only when needed) */
  const fbMemo = {};
  async function fullImgs(p) {
    if (p && p.imgRef) { const k = p.imgRef; if (!fbMemo[k]) fbMemo[k] = FB.rest('GET', 'pimgs/p' + k).catch(() => null); const a = await fbMemo[k]; if (a && (a.length || Object.keys(a).length)) return Array.isArray(a) ? a : Object.values(a); }
    return p && p.imgs && p.imgs.length ? p.imgs : (p && p.img ? [p.img] : []);
  }
  const P = PRODUCTS;
  let BRAND = 'Wholesale Hub';
  let TAGLINE = 'Wholesale prices for retailers and resellers.';
  let LOGO = '';
  const logoHTML = () => `<span class="lg" aria-hidden="true">${esc(BRAND[0])}<img src="${LOGO}" alt="" onload="this.parentNode.classList.add('has')" onerror="this.remove()"></span>`;

  const FBS = SETTINGS;
  const prepaidOn = () => validUpi(FBS.upi) && FBS.prepaid !== false;
  const SOLD = {};
  const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];
  const sizesOf = p => { const z = p && p.sizes; const a = Array.isArray(z) ? z : (z && typeof z === 'object' ? Object.values(z) : []); return a.filter(x => x && x.n); };
  const hasSizes = p => sizesOf(p).length > 0;
  const leftSize = (p, sz) => { const z = sizesOf(p).find(x => x.n === sz); if (!z) return 0; return z.q == null ? Infinity : Math.max(0, z.q - (SOLD[p.id + '_' + sz] || 0)); };
  const leftOf = p => hasSizes(p) ? sizesOf(p).reduce((a, z) => a + leftSize(p, z.n), 0) : (p.qty == null ? Infinity : Math.max(0, p.qty - (SOLD[p.id] || 0)));
  const MAXQ = 5000;
  const maxQ = p => Math.min(MAXQ, leftOf(p));
  const limLeft = (p, sz) => sz ? leftSize(p, sz) : leftOf(p);
  const limOf = (p, sz) => Math.min(MAXQ, limLeft(p, sz));
  const lkey = (id, sz) => sz ? id + ':' + sz : String(id);
  const lparse = k => { k = String(k); const i = k.indexOf(':'); return i < 0 ? { id: Number(k), size: '' } : { id: Number(k.slice(0, i)), size: k.slice(i + 1) }; };
  const maxQK = k => { const x = lparse(k), p = byId(x.id); return p ? limOf(p, x.size) : MAXQ; };
  /* ---- WHOLESALE: minimum order and quantity step ---- */
  const moqOf = p => 1;
  const stepOf = p => 1;
  const minQK = k => { const x = lparse(k), p = byId(x.id); if (!p) return 1; return hasSizes(p) ? 1 : Math.min(moqOf(p), Math.max(1, limOf(p, x.size))); };
  const moqMsg = lines => { const m = {}; lines.forEach(l => { m[l.id] = (m[l.id] || 0) + l.qty; }); for (const id of Object.keys(m)) { const p = byId(id); if (!p) continue; const need = Math.min(moqOf(p), Math.max(1, leftOf(p))); if (m[id] < need) return `Minimum order for ${p.name} is ${need} pcs`; } return ''; };


  const art = (p, label, eager) => `<svg viewBox="0 0 200 200" ${label ? `role="img" aria-label="${esc(p.name)}"` : 'aria-hidden="true"'}><circle class="c" cx="100" cy="106" r="82" opacity=".5"/>${ART[p.art] || ''}</svg><img class="shot" src="${esc(p.img || '')}" alt="${label ? esc(p.name) : ''}" loading="${eager ? 'eager' : 'lazy'}" onerror="this.remove()">`;

  const CATS = ['All'];
  const setCats = () => { CATS.length = 0; CATS.push('All'); [...P].sort((a, b) => a.id - b.id).forEach(x => { if (x.cat && !CATS.includes(x.cat)) CATS.push(x.cat); }); };
  setCats();

  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const INR = n => '₹' + n.toLocaleString('en-IN');
  const num = n => n.toLocaleString('en-IN');

  /* ---- Coupons: Firebase coupons/<CODE> = { code, pct, start, end (ms), auto (true = applies to every buyer while live), on } ---- */
  let CP = {}, CPSIG = '', CPD = '', CPN = '', cpLast = '';
  const CPK = 'wsl.cpn';
  try { CPN = localStorage.getItem(CPK) || ''; } catch (e) {}
  function setCP(raw) {
    CP = {};
    if (raw && typeof raw === 'object') Object.keys(raw).forEach(k => {
      const x = raw[k]; if (!x || typeof x !== 'object') return;
      const code = String(x.code || k).toUpperCase().replace(/[^A-Z0-9_-]/g, ''); if (!code) return;
      CP[code] = Object.assign({}, x, { code, pct: +x.pct || 0, start: +x.start || 0, end: +x.end || 0 });
    });
  }
  const cpOk = x => !!x && x.on !== false && x.pct > 0 && x.pct <= 90 && Date.now() >= x.start && Date.now() < x.end;
  const cpAuto = () => { const a = Object.values(CP).filter(x => cpOk(x) && x.auto === true).sort((p, q) => q.pct - p.pct)[0]; return a ? Object.assign({}, a, { src: 'auto' }) : null; };
  function cpnGet() {
    const m = CPN && cpOk(CP[CPN]) ? Object.assign({}, CP[CPN], { src: 'code' }) : null, a = cpAuto();
    return m && a ? (a.pct > m.pct ? a : m) : (m || a);
  }
  const cpSigNow = () => { const c = cpnGet(); return c ? c.code + ':' + c.pct + ':' + c.src : ''; };
  const cpAmt = (sub, cp) => cp ? Math.min(sub, Math.round(sub * cp.pct / 100)) : 0;
  const pad2 = n => String(n).padStart(2, '0');
  const cdFmt = ms => { const t = Math.max(0, Math.floor(ms / 1000)), d = Math.floor(t / 86400); return (d ? d + 'd ' : '') + pad2(Math.floor(t % 86400 / 3600)) + 'h ' + pad2(Math.floor(t % 3600 / 60)) + 'm ' + pad2(t % 60) + 's'; };
  const cdTag = end => `<b class="cdt" data-end="${end}">${cdFmt(end - Date.now())}</b>`;

  /* ---- Ratings (customers rate after ordering; stars are saved in Firebase: ratings/<productId>/<orderId> + totals in rstat/<productId>) ---- */
  let RS = {}, RSRAW = {}, RSSIG = '', RSDIRTY = false;
  const RSEL = {}, RQK = 'wsl.rq';
  const rqGet = () => { try { return JSON.parse(localStorage.getItem(RQK) || '[]') || []; } catch (e) { return []; } };
  const rqSet = a => { try { localStorage.setItem(RQK, JSON.stringify(a)); } catch (e) {} };
  /* RS = totals from the database + ratings still waiting to be sent, so the number updates at once */
  function rebuildRS() {
    const m = {};
    Object.keys(RSRAW || {}).forEach(k => { const x = RSRAW[k]; if (x && x.n > 0) m[k] = { s: +x.s || 0, n: +x.n || 0 }; });
    rqGet().forEach(r => { const x = m[r.p] || (m[r.p] = { s: 0, n: 0 }); if (r.st < 2) x.s += r.n; x.n += 1; });
    RS = m;
  }
  /* real customer average if the product has been rated, otherwise the value set for the product */
  const rtOf = p => { const x = RS[p.id]; return x && x.n > 0 ? { r: x.s / x.n, c: x.n } : { r: Number(p.rating) || 0, c: Number(p.count) || 0 }; };
  /* 1-2 red, 3-4 yellow, 5 green */
  const band = r => { const v = Math.round(r); return v <= 2 ? 'r' : v <= 4 ? 'y' : 'g'; };
  const rtgHTML = p => { const x = rtOf(p); if (!(x.c > 0)) return ''; return `<span class="rtg rc-${band(x.r)}"><b>${x.r.toFixed(1)}</b> ★<i>${num(x.c)}</i></span>`; };
  const detailRt = p => { const x = rtOf(p); if (!(x.c > 0)) return ''; return `<div class="rt big"><span class="pill rc-${band(x.r)}">${x.r.toFixed(1)} ★</span><span>${num(x.c)} ${x.c === 1 ? 'rating' : 'ratings'}</span></div>`; };
  const byId = id => P.find(p => p.id === parseInt(id, 10));
  const off = p => p.mrp > p.price ? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
  const mask = ph => `+91 ${ph.slice(0, 2)}••••••${ph.slice(-2)}`;
  const main = $('#main'), drawer = $('#cart'), scrim = $('#scrim'), modal = $('#modal'), sheet = $('#sheet'), toastEl = $('#toast');

  const S = { view: 'home', sec: null, stack: [], pend: null, users: {}, lang: 'en', gi: 0, id: null, q: '', cat: 'All', dq: 1, cart: {}, user: null };
  const KEY = 'wholesale.v1';
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (d.cart) for (const [k, v] of Object.entries(d.cart)) if (byId(k) && v > 0) S.cart[k] = Math.min(MAXQ, v | 0);
    if (typeof d.user === 'string' && /^\d{10}$/.test(d.user)) S.user = d.user;
    if (d.lang === 'hi') S.lang = 'hi';
    if (d.users && typeof d.users === 'object') for (const [ph, u] of Object.entries(d.users)) if (/^\d{10}$/.test(ph) && u && typeof u === 'object') {
      const pr = u.profile, ok = pr && ['name', 'phone', 'addr', 'pin'].every(k => typeof pr[k] === 'string');
      S.users[ph] = { profile: ok ? { name: pr.name, phone: pr.phone, addr: pr.addr, pin: pr.pin, lm: typeof pr.lm === 'string' ? pr.lm : '', state: typeof pr.state === 'string' ? pr.state : '' } : null,
        addrs: (Array.isArray(u.addrs) ? u.addrs : []).filter(a => a && typeof a.id === 'string' && ['name', 'phone', 'addr', 'pin'].every(k => typeof a[k] === 'string')).map(a => ({ id: a.id, name: a.name, phone: a.phone, addr: a.addr, pin: a.pin, lm: typeof a.lm === 'string' ? a.lm : '', state: typeof a.state === 'string' ? a.state : '', area: typeof a.area === 'string' ? a.area : '', city: typeof a.city === 'string' ? a.city : '' })),
        fav: (Array.isArray(u.fav) ? u.fav : []).filter(i => byId(i)).map(Number),
        orders: (Array.isArray(u.orders) ? u.orders : []).filter(o => o && typeof o.id === 'string' && Array.isArray(o.lines)).slice(0, 50) };
    }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify({ cart: S.cart, user: S.user, users: S.users, lang: S.lang })); } catch (e) {} };

  const qtyOf = id => S.cart[id] || 0;
  const cartCount = () => Object.values(S.cart).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(S.cart).reduce((a, [id, q]) => a + byId(id).price * q, 0);
  const savings = () => Object.entries(S.cart).reduce((a, [id, q]) => a + Math.max(0, byId(id).mrp - byId(id).price) * q, 0);
  const SHIP_PER_QTY = false;
  const hasShip = p => typeof p.ship === 'number' && p.ship >= 0;
  const shipOf = (p, q) => hasShip(p) ? p.ship * (SHIP_PER_QTY ? q : 1) : 0;
  const shipFor = lines => { const m = {}; lines.forEach(l => { m[l.id] = (m[l.id] || 0) + l.qty; }); return Object.entries(m).reduce((a, [id, q]) => a + shipOf(byId(id), q), 0); };
  const cartShip = () => shipFor(Object.entries(S.cart).map(([k, q]) => ({ id: lparse(k).id, qty: q })));
  const cartHasShip = () => Object.keys(S.cart).some(id => hasShip(byId(id)));
  const jumpTop = () => {
    const r = document.documentElement, prev = r.style.scrollBehavior;
    r.style.scrollBehavior = 'auto';
    try { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
    document.body.scrollTop = 0; r.scrollTop = 0;
    r.style.scrollBehavior = prev;
  };
  let toastT;
  const toast = msg => { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2200); };

  const B0 = { n: BRAND, t: TAGLINE, l: LOGO };
  (function splash() {
    let li = 0;
    $('#splashWm').innerHTML = BRAND.split(' ').map(w => `<span class="w">${[...w].map(ch => `<span style="--i:${li++}">${esc(ch)}</span>`).join('')}</span>`).join('');
    $('#splashWm').setAttribute('aria-label', BRAND);
    const sl = document.querySelector('.sp-disc img'), mono = $('#splashMono');
    if (LOGO && sl) { sl.src = LOGO; mono.style.display = 'none'; } else { mono.textContent = [...BRAND][0] || ''; if (sl) sl.removeAttribute('src'); }
    $('#splashTag').textContent = TAGLINE;
    const el = $('#splash');
    el.addEventListener('click', () => el.remove());
    setTimeout(() => el.remove(), 4400);
  })();
  document.title = BRAND;
  $('#brandBtn').innerHTML = `${logoHTML()}<span class="bn">${esc(BRAND)}</span>`;
  $('#footBrand').innerHTML = `${logoHTML()}<span class="bn">${esc(BRAND)}</span>`;
  $('#footTag').textContent = TAGLINE;

  const card = p => `
    <div class="card" role="button" tabindex="0" data-act="open" data-id="${p.id}" aria-label="${esc(p.name)}, ${INR(p.price)}">
      <div class="ph" style="--h:${p.h}">${art(p)}<span class="off">${off(p)}% off</span>${heart(p.id)}${rtgHTML(p)}${leftOf(p) === 0 ? '<span class="oos">Out of stock</span>' : ''}</div>
      <div class="cb"><div class="pr"><b>${INR(p.price)}</b><s>${INR(p.mrp)}</s></div></div>
    </div>`;

  const ICO = d => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const shortName = (s, n = 26) => { s = String(s).trim(); if (s.length <= n) return s; const cut = s.slice(0, n), sp = cut.lastIndexOf(' '); return (sp > 10 ? cut.slice(0, sp) : cut).trimEnd() + '…'; };
  const bestList = () => P.filter(p => p.best);
  /* Bestseller banner is big, so it shows the full-quality photo (loaded in the background, swapped in when ready). */
  const BIG = {};
  function upgradeBest() {
    bestList().forEach(p => {
      if (BIG[p.id]) return;
      fullImgs(p).then(a => {
        const u = a && a[0]; if (!u || u === p.img) return;
        BIG[p.id] = u;
        const el = document.querySelector('.bs[data-id="' + p.id + '"] .shot'); if (el) el.src = u;
      }).catch(() => {});
    });
  }
  const bslide = p => `<button class="bs" style="--h:${p.h}" data-act="open" data-id="${p.id}" aria-label="${esc(p.name)}, ${INR(p.price)}">
      <span class="bt"><span class="bl">Bestseller</span><span class="bh">${esc(shortName(p.name))}</span><span class="bp"><b>${INR(p.price)}</b><s>${INR(p.mrp)}</s><em>${off(p)}% off</em></span><span class="bcta">Shop now</span></span>
      <span class="bi"><span class="ph">${art(BIG[p.id] ? Object.assign({}, p, { img: BIG[p.id] }) : p, false, true)}</span></span>
    </button>`;
  let best = null, bestTimer;
  function initBest() {
    clearInterval(bestTimer); best = null;
    const b = document.querySelector('.best'); if (!b) return;
    const trk = b.querySelector('.btrk'), dd = b.querySelector('.bdots');
    const n = trk.children.length; if (!n) return;
    let idx = 0, hold = 0, down = false;
    const mark = () => {
      idx = Math.min(n - 1, Math.max(0, Math.round(trk.scrollLeft / (trk.clientWidth || 1))));
      if (!dd) return;
      dd.querySelectorAll('button').forEach((x, k) => x.setAttribute('aria-current', String(k === idx)));
      const c = dd.querySelector('.bcnt'); if (c) c.textContent = (idx + 1) + ' / ' + n;
    };
    const to = (i, smooth) => { i = ((i % n) + n) % n; trk.scrollTo({ left: i * trk.clientWidth, behavior: smooth ? 'smooth' : 'auto' }); };
    const poke = () => { hold = Date.now() + 4000; };
    best = { go: i => { poke(); to(i, true); }, step: d => { poke(); const j = idx + d; to(j, j >= 0 && j < n); } };
    trk.addEventListener('scroll', mark, { passive: true });
    b.addEventListener('pointerdown', () => { down = true; });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => b.addEventListener(ev, () => { if (down) { down = false; poke(); } }));
    b.addEventListener('wheel', poke, { passive: true });
    b.addEventListener('keydown', poke);
    let sx = null, dragged = false;
    trk.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') { sx = e.clientX; dragged = false; } });
    trk.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) { dragged = true; best.step(dx < 0 ? 1 : -1); } });
    trk.addEventListener('click', e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
    mark();
    bestTimer = setInterval(() => {
      if (!document.body.contains(trk)) { clearInterval(bestTimer); return; }
      if (n < 2 || document.hidden || down || Date.now() < hold) return;
      to(idx + 1, idx + 1 < n);
    }, 4000);
  }

  function heroHTML() {
    const L = bestList();
    const banner = L.length ? `
      <section class="hb" aria-label="Bestsellers">
        <div class="best" role="region" aria-roledescription="carousel" aria-label="Bestsellers">
          <div class="btrk" tabindex="0">${L.map(bslide).join('')}</div>
          ${L.length > 1 ? `<div class="bdots">${L.length <= 8 ? L.map((_, k) => `<button data-act="best-go" data-i="${k}" aria-label="Product ${k + 1}"></button>`).join('') : '<span class="bcnt"></span>'}</div>` : ''}
        </div>
      </section>` : '';
    return `<div class="trust-row">
        <div>${ICO('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>')}<span><b>Wholesale prices</b>Made for retailers</span></div>
        <div>${ICO('<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>')}<span><b>Genuine products</b>Quality checked</span></div>
      </div>${banner}`;
  }

  function renderHome() {
    const q = S.q.trim().toLowerCase();
    const list = P.filter(p => (S.cat === 'All' || p.cat === S.cat) && (!q || (p.name + ' ' + p.cat + ' ' + p.desc).toLowerCase().includes(q)));
    const key = S.cat + '|' + q; if (key !== S.lk) { S.lk = key; S.lim = 24; }
    const lim = S.lim || 24, hero = !S.q.trim() ? heroHTML() : '';
    const title = S.q.trim() ? `Results for “${esc(S.q.trim())}”` : (S.cat === 'All' ? 'All products' : S.cat);
    const html = `
      <div id="cpromo">${promoInner()}</div>${hero}<div class="wrap" id="collection">
        <nav class="chips" aria-label="Categories">${CATS.map(c => `<button class="chip" data-act="cat" data-cat="${c}" aria-pressed="${c === S.cat}">${c}</button>`).join('')}</nav>
        <div class="head"><h2>${title}</h2><span>${list.length} ${list.length === 1 ? 'product' : 'products'}</span></div>
        ${list.length ? `<div class="grid" id="hgrid">${list.slice(0, lim).map(card).join('')}</div>${list.length > lim ? '<div id="sent" style="height:1px"></div>' : ''}` : (P.length ? `
          <div class="empty"><h3>Nothing matched your search</h3><p>Try a shorter word, or browse all products.</p><button class="btn" data-act="home">Show all products</button></div>` : `
          <div class="empty"><h3>No products yet</h3><p>New products will show up here soon.</p></div>`)}
      </div>`;
    const hk = html.replace(/(<b class="cdt"[^>]*>)[^<]*/g, '$1');
    if (main.dataset.v === 'home' && S.hh === hk && main.firstElementChild) return;   /* same page as before: do not redraw (no blink) */
    S.hh = hk; main.dataset.v = 'home'; main.innerHTML = html;
    initBest(); upgradeBest();
    const g = document.getElementById('hgrid'), se = document.getElementById('sent');
    if (g && se && 'IntersectionObserver' in window) {
      let shown = lim;
      const io = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        g.insertAdjacentHTML('beforeend', list.slice(shown, shown + 24).map(card).join('')); shown += 24; S.lim = shown;
        if (shown >= list.length) { io.disconnect(); se.remove(); } else { io.unobserve(se); io.observe(se); }
      }, { rootMargin: '900px' });
      io.observe(se);
    } else if (g) g.innerHTML = list.map(card).join('');
  }

  const polHTML = p => {
    const c = [];
    if (hasShip(p)) c.push([p.ship > 0 ? 'Delivery ' + INR(p.ship) + (SHIP_PER_QTY ? ' per item' : '') : 'Free delivery', 0]);
    if (p.replace > 0) c.push([p.replace + '-day replacement', 0]);
    else if (p.exch > 0 && !(p.returns > 0)) c.push([p.exch + '-day exchange', 0]);
    else if (typeof p.returns === 'number') c.push([p.returns > 0 ? p.returns + '-day returns' : 'No returns', p.returns > 0 ? 0 : 1]);
    return c.length ? `<div class="pol">${c.map(([t, no]) => `<span${no ? ' class="no"' : ''}>${esc(t)}</span>`).join('')}</div>` : '';
  };

  const curKey = () => { const p = byId(S.id); return p && hasSizes(p) ? (S.sz ? lkey(p.id, S.sz) : '') : String(S.id); };
  const curLim = () => { const p = byId(S.id); if (!p) return 1; return hasSizes(p) ? (S.sz ? Math.min(MAXQ, leftSize(p, S.sz)) : MAXQ) : maxQ(p); };
  const sizeHTML = p => {
    if (!hasSizes(p)) return '';
    const warn = S.szWarn && !S.sz, l = S.sz ? leftSize(p, S.sz) : null;
    return `<div class="szb${warn ? ' warn' : ''}"><div class="szh"><b>Select size</b>${warn ? '<em>Please choose a size</em>' : ''}</div>
      <div class="szs" role="group" aria-label="Size">${sizesOf(p).map(z => { const out = leftSize(p, z.n) === 0, on = S.sz === z.n;
        return `<button class="sz${on ? ' on' : ''}${out ? ' out' : ''}" data-act="size" data-s="${esc(z.n)}" aria-pressed="${on}"${out ? ` disabled aria-label="Size ${esc(z.n)}, out of stock"` : ''}><span>${esc(z.n)}</span>${out ? '<small>Out of stock</small>' : ''}</button>`; }).join('')}</div>
      ${l !== null && l !== Infinity && l > 0 && l <= 5 ? `<p class="szn">Only ${l} left in size ${esc(S.sz)}</p>` : ''}</div>`;
  };

  const minAdd = p => Math.min(moqOf(p), Math.max(1, curLim()));
  const fitDq = () => { const p = byId(S.id); if (!p) return; const lim = Math.max(1, curLim()); S.dq = Math.max(Math.min(moqOf(p), lim), Math.min(S.dq, lim)); };

  const moqNote = p => '';
  function renderDetail() {
    const p = byId(S.id); if (!p) return renderHome();
    const sz = hasSizes(p), inCart = (sz && !S.sz) ? 0 : qtyOf(curKey()), q = inCart || S.dq, lim = curLim();
    main.dataset.v = 'detail';
    main.innerHTML = `
      <div class="wrap">
        <div class="dback"><button class="pg-back" data-act="back" aria-label="Back">${ARROW}</button></div>
        <div class="dt">
          ${galleryHTML(p)}
          <div class="info">
            <div class="crow"><p class="crumb">${esc(p.cat)}</p><button class="fv" data-act="fav" data-id="${p.id}" aria-pressed="${isFav(p.id)}">${HEART}<span>${isFav(p.id) ? 'Saved' : 'Save'}</span></button></div>
            <h1>${esc(p.name)}</h1>
            ${detailRt(p)}
            <div class="price"><b>${INR(p.price)}</b><s>${INR(p.mrp)}</s><em>${off(p)}% off</em><small class="ppc">per piece</small></div>
            ${moqNote(p)}
            <div id="coffer">${offerInner()}</div>
            ${polHTML(p)}
            ${sizeHTML(p)}
            ${leftOf(p) === 0 ? '' : `<div class="qrow"><span>Quantity</span><div class="step" role="group" aria-label="Quantity">
              <button data-act="dq-" aria-label="Decrease quantity" ${!inCart && q <= minAdd(p) ? 'disabled' : ''}>−</button>
              <output aria-live="polite">${q}</output>
              <button data-act="dq+" aria-label="Increase quantity" ${q >= Math.max(1, lim) ? 'disabled' : ''}>+</button>
            </div></div>`}
            <p class="desc${S.dx ? '' : ' clamp'}" id="descTx">${esc(p.desc)}</p>
            <button class="lnk dmore" id="descBtn" data-act="desc-more" hidden>${S.dx ? 'See less' : 'See more'}</button>
            <ul class="pts">${p.pts.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            <div class="buy">
              ${leftOf(p) === 0 ? '<button class="btn" disabled>Out of stock</button>' : `<button class="btn${inCart ? ' added' : ''}" data-act="add">${inCart ? 'Added ✓' : 'Add to cart'}</button>`}
            </div>
          </div>
        </div>
        ${relatedHTML(p)}
      </div>`;
    initGallery(); initDesc();
  }

  function initDesc() {
    const t = document.getElementById('descTx'), b = document.getElementById('descBtn'); if (!t || !b) return;
    const chk = () => { b.hidden = !S.dx && t.scrollHeight <= t.clientHeight + 1 ? true : false; };
    chk(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(chk);
    addEventListener('resize', chk, { once: true });
  }

  const artSvg = p => `<svg viewBox="0 0 200 200" role="img" aria-label="${esc(p.name)}"><circle class="c" cx="100" cy="106" r="82" opacity=".5"/>${ART[p.art] || ''}</svg>`;
  const FULL = {};
  const galleryHTML = p => {
    const ref = p.imgRef;
    if (ref && FULL[ref] === undefined) {
      FULL[ref] = 0;
      fullImgs(p).then(a => { FULL[ref] = a; if (S.view === 'detail' && S.id === p.id && !(modal && !modal.hidden)) renderDetail(); }).catch(() => { FULL[ref] = undefined; });
    }
    const fl = ref && Array.isArray(FULL[ref]) && FULL[ref].length ? FULL[ref] : null;
    const list = fl || (ref ? [p.img] : p.imgs && p.imgs.length ? p.imgs : [p.img, ...[2, 3, 4, 5].map(n => p.img.replace(/(\.\w+)$/, `-${n}$1`))]);
    return `<div class="gal ph" style="--h:${p.h}">
      <div class="trk" tabindex="0" role="group" aria-label="${esc(p.name)} photos">
        <div class="sl artsl" hidden>${artSvg(p)}</div>
        ${list.map((s, i) => `<div class="sl im"><img class="gi" src="${esc(s)}" alt="${esc(p.name)}${i ? ', photo ' + (i + 1) : ''}" draggable="false"></div>`).join('')}
      </div>
      <span class="cnt" hidden></span>
      ${rtgHTML(p)}
      <button class="gn l" data-act="gal-prev" aria-label="Previous photo">‹</button>
      <button class="gn r" data-act="gal-next" aria-label="Next photo">›</button>
      <div class="dd"></div>
    </div>`;
  };
  function initGallery() {
    const g = document.querySelector('.gal'); if (!g) return;
    const trk = g.querySelector('.trk'), dd = g.querySelector('.dd'), cnt = g.querySelector('.cnt'), artsl = g.querySelector('.artsl');
    const ims = () => [...trk.querySelectorAll('.sl.im')];
    const mark = () => {
      const n = ims().length, i = Math.min(n - 1, Math.max(0, Math.round(trk.scrollLeft / (trk.clientWidth || 1))));
      S.gi = i < 0 ? 0 : i;
      dd.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-current', String(k === S.gi)));
      cnt.textContent = `${S.gi + 1} / ${n}`;
    };
    const build = () => {
      const n = ims().length;
      artsl.hidden = n > 0;
      g.classList.toggle('multi', n > 1);
      cnt.hidden = n < 2;
      dd.innerHTML = n > 1 ? ims().map((_, k) => `<button data-act="gal-go" data-i="${k}" aria-label="Photo ${k + 1}"></button>`).join('') : '';
      mark();
    };
    const drop = img => { const s = img.closest('.sl'); if (s) { s.remove(); build(); } };
    trk.addEventListener('error', e => { if (e.target.tagName === 'IMG') drop(e.target); }, true);
    trk.querySelectorAll('img').forEach(im => { if (im.complete && im.naturalWidth === 0) im.closest('.sl').remove(); });
    trk.addEventListener('scroll', mark, { passive: true });
    build();
    if (S.gi) trk.scrollTo({ left: S.gi * trk.clientWidth, behavior: 'auto' });
  }
  const galGo = i => { const t = document.querySelector('.trk'); if (t) t.scrollTo({ left: i * t.clientWidth, behavior: 'smooth' }); };

  function relatedHTML(p) {
    const same = P.filter(x => x.id !== p.id && x.cat === p.cat);
    const rest = P.filter(x => x.id !== p.id && x.cat !== p.cat);
    const sec = (title, list) => list.length ? `<section class="more"><div class="head"><h2>${title}</h2></div><div class="grid">${list.map(card).join('')}</div></section>` : '';
    return sec(`More in ${esc(p.cat)}`, same) + sec('You may also like', rest.slice(0, 8));
  }

  function showHome(reset) {
    S.view = 'home'; S.stack.length = 0; S.pend = null; S.ck = null; hidePage();
    if (reset) { S.q = ''; S.cat = 'All'; $('#q').value = ''; }
    renderHome();
  }
  function openProduct(id) { if (PAGES.includes(S.view)) pushHist(); hidePage(); S.gi = 0; S.view = 'detail'; S.id = Number(id); S.dq = moqOf(byId(id)); S.dx = false; S.sz = ''; S.szWarn = false; fitDq(); jumpTop(); renderDetail(); jumpTop(); }

  function setQty(id, n) {
    const pp = byId(id); n = Math.max(0, Math.min(pp ? maxQK(id) : MAXQ, n));
    if (n === 0) delete S.cart[id]; else S.cart[id] = n;
    save(); renderCart();
    if (S.view === 'detail') renderDetail();
  }
  function renderCart() {
    const n = cartCount();
    const badge = $('#badge');
    badge.hidden = n === 0; badge.textContent = n;
    $('#cartBtn').setAttribute('aria-label', `Open cart, ${n} ${n === 1 ? 'item' : 'items'}`);
    $('#cartCount').textContent = n ? `(${n})` : '';
    const ids = Object.keys(S.cart);
    if (!ids.length) {
      $('#cartBody').innerHTML = `<div class="empty" style="margin-top:18px"><h3>Your cart is empty</h3><p>Add something you like and it will show up here.</p><button class="btn" data-act="shop">Start shopping</button></div>`;
      $('#cartFoot').innerHTML = '';
      return;
    }
    $('#cartBody').innerHTML = ids.map(id => {
      const p = byId(id), q = S.cart[id], szl = lparse(id).size;
      return `
        <div class="ci">
          <button class="cth" data-act="open-cart" data-id="${p.id}" aria-label="View ${esc(p.name)}"><span class="ph" style="--h:${p.h}">${art(p)}</span></button>
          <div class="cm">
            <button class="cn" data-act="open-cart" data-id="${p.id}">${esc(p.name)}</button>
            <div class="cp"><span>${INR(p.price)} each</span><b>${INR(p.price * q)}</b></div>
            ${szl ? `<p class="dl">Size: <b>${esc(szl)}</b></p>` : ''}
            ${hasShip(p) ? `<p class="dl">${p.ship > 0 ? 'Delivery ' + INR(shipOf(p, q)) : 'Free delivery'}</p>` : ''}
            <div class="cr">
              <div class="step sm" role="group" aria-label="Quantity of ${esc(p.name)}">
                <button data-act="dec" data-k="${esc(id)}" aria-label="Decrease quantity">−</button>
                <output>${q}</output>
                <button data-act="inc" data-k="${esc(id)}" aria-label="Increase quantity" ${q >= maxQK(id) ? 'disabled' : ''}>+</button>
              </div>
              <button class="lnk red" data-act="rm" data-k="${esc(id)}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join('');
    const sh = cartShip(), cpC = cpnGet(), cpD = cpAmt(subtotal(), cpC);
    $('#cartFoot').innerHTML = `
      ${cpnBox()}
      <div class="srow"><span>Subtotal</span><span>${INR(subtotal())}</span></div>
      ${cpD ? `<div class="srow"><span>Coupon (${esc(cpC.code)} · ${cpC.pct}% off)</span><span class="gd">− ${INR(cpD)}</span></div>` : ''}
      ${cartHasShip() ? `<div class="srow"><span>Delivery</span><span>${sh ? INR(sh) : 'Free'}</span></div>` : ''}
      ${savings() + cpD ? `<p class="save">You save ${INR(savings() + cpD)} on this order</p>` : ''}
      ${moqMsg(Object.entries(S.cart).map(([k, q]) => ({ id: lparse(k).id, qty: q }))) ? `<p class="save" style="color:var(--danger)">${esc(moqMsg(Object.entries(S.cart).map(([k, q]) => ({ id: lparse(k).id, qty: q }))))}</p>` : ''}
      <div class="cbar2"><div class="cbt"><small>Total</small><b>${INR(subtotal() + sh - cpD)}</b></div><button class="btn" data-act="checkout">Checkout</button></div>
      <p class="dsec">Secure checkout &middot; Genuine products</p>`;
  }
  let lastFocus = null;
  function openCart() {
    closeMenu();
    lastFocus = document.activeElement;
    drawer.inert = false; drawer.classList.add('open'); scrim.classList.add('open');
    setTimeout(() => drawer.querySelector('.x').focus(), 50);
  }
  function closeCart() {
    drawer.classList.remove('open'); scrim.classList.remove('open'); drawer.inert = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  let lg = { step: 'phone', phone: '', otp: '', err: '', after: null, order: null };
  function renderAcct() {
    const pr = S.user && S.users[S.user] && S.users[S.user].profile;
    $('#acctLbl').textContent = S.user ? (pr ? (pr.name.trim().split(/\s+/)[0] || mask(S.user)) : mask(S.user)) : 'Login';
    $('#acctBtn').classList.toggle('named', !!S.user);
    $('#acctCh').hidden = !S.user;
    $('#menuPhone').textContent = S.user ? mask(S.user) : '';
  }
  function closeMenu() { $('#menu').hidden = true; $('#acctBtn').setAttribute('aria-expanded', 'false'); }
  function openLogin(after, only) { closeCart(); lg = { step: 'phone', phone: '', otp: '', err: '', after: after || null, only: only || null, order: null }; renderModal(); modal.hidden = false; }
  function closeModal() { modal.hidden = true; modal.classList.remove('full'); if (RSDIRTY) refreshRatings(); }
  const IC = {
    trash: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    out: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
    x: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
  };
  // premium confirm popup (browser ka confirm() ki jagah). Kahin bhi: askConfirm({icon,title,text,extra,yes,no,danger}, onYes)
  const cfmHTML = (o, act) => `<div class="cfm"><div class="cfm-ic${o.danger ? ' red' : ''}" aria-hidden="true">${o.icon}</div>
      <h2 id="mTitle">${o.title}</h2><p class="sub">${o.text}</p>${o.extra || ''}
      <div class="cfm-b"><button class="btn block${o.danger ? ' dng' : ''}" data-act="${act}">${o.yes}</button><button class="btn alt block" data-act="modal-close">${o.no}</button></div></div>`;
  const askConfirm = (o, fn) => { lg = { step: 'confirm', cfm: o, fn }; renderModal(); modal.hidden = false; };

  function renderModal() {
    modal.classList.toggle('full', lg.step === 'done');
    if (lg.step === 'phone') {
      sheet.innerHTML = `
        <h2 id="mTitle">Login or sign up</h2>
        <p class="sub">Enter your mobile number and we will send a 6-digit OTP.</p>
        <form id="fPhone" novalidate>
          <div><label for="phone">Mobile number</label></div>
          <div class="phone"><span>+91</span><input id="phone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="9876543210" value="${esc(lg.phone)}"></div>
          <p class="err" id="err" role="alert">${esc(lg.err)}</p>
          <button class="btn block" type="submit">Get OTP</button>
        </form>
        <button class="lnk" data-act="modal-close" style="justify-self:start">Cancel</button>`;
      setTimeout(() => $('#phone') && $('#phone').focus(), 30);
    } else if (lg.step === 'otp') {
      sheet.innerHTML = `
        <h2 id="mTitle">Enter the OTP</h2>
        <p class="sub">Sent to ${mask(lg.phone)}</p>
        <div class="demo">Demo mode: your OTP is <b>${lg.sent}</b>. A live store sends this by SMS.</div>
        <form id="fOtp" novalidate>
          <div><label for="otp">6-digit OTP</label></div>
          <div class="otpf"><input id="otp" type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="••••••"></div>
          <p class="err" id="err" role="alert">${esc(lg.err)}</p>
          <button class="btn block" type="submit">Verify and login</button>
        </form>
        <div class="row"><button class="lnk" data-act="change-num">Change number</button><button class="lnk" data-act="resend">Resend OTP</button></div>`;
      setTimeout(() => $('#otp') && $('#otp').focus(), 30);
    } else if (lg.step === 'confirm') {
      sheet.innerHTML = cfmHTML(lg.cfm, 'cfm-yes');
    } else if (lg.step === 'cancel') {
      sheet.innerHTML = cfmHTML({ icon: IC.x, danger: true, title: 'Cancel this order?', text: 'This cannot be undone. If you paid online, the seller will arrange your refund.', yes: 'Yes, cancel order', no: 'Keep order' }, 'cancel-yes');
    } else if (lg.step === 'logout') {
      sheet.innerHTML = cfmHTML({ icon: IC.out, title: 'Log out?', text: 'You will need to login again with an OTP.', yes: 'Yes, log out', no: 'Stay logged in' }, 'logout-yes');
    } else {
      const o = lg.order, a = o.addr || {}, ls = o.lines || [];
      const adl = [a.addr, a.area, a.city, a.state].filter(Boolean).map(esc).join(', ') + (a.pin ? ' - ' + esc(a.pin) : '');
      const money = o.pay === 'cod' ? 'Please keep ' + INR(o.total) + ' ready to pay when your order arrives.' : 'We have your payment details. The seller will confirm your payment shortly.';
      sheet.innerHTML = `
        <div class="op">
          <div class="op-hero">
            <div class="op-conf" aria-hidden="true">${'<i></i>'.repeat(16)}</div>
            <div class="ok" aria-hidden="true"><svg viewBox="0 0 52 52"><circle class="ring" cx="26" cy="26" r="24"/><path class="chk" d="M15 27l8 8 15-16"/></svg></div>
            <h2 id="mTitle">Order placed!</h2>
            <p class="sub">Thank you for shopping with ${esc(BRAND)}. ${money}</p>
            <button class="op-id" data-act="op-copy" data-id="${esc(o.id)}" aria-label="Copy order number"><span><small>Order number</small><b>${esc(o.id)}</b></span><em>Copy</em></button>
          </div>
          <ol class="op-trk" aria-label="Order progress"><li class="on"><i></i>Placed</li><li><i></i>Shipped</li><li><i></i>Delivered</li></ol>
          <section class="op-c"><h3>Your items <span>${o.items}</span></h3>
            ${ls.map(l => `<div class="op-l">${thumb(l)}<div><b>${esc(l.name)}</b><small>${l.size ? 'Size ' + esc(l.size) + ' · ' : ''}${INR(l.price)} × ${l.qty}</small></div><b>${INR(l.price * l.qty)}</b></div>`).join('')}</section>
          ${rateHTML(o, 'op-c')}
          <section class="op-c"><h3>Delivery</h3>
            ${o.dAt ? `<div class="op-r"><span>Delivery by</span><b class="gd">${dwk(o.dAt)}</b></div>` : ''}
            <div class="op-ad"><b>${esc(a.name || '')}</b><span>${adl}</span>${a.phone ? `<span>+91 ${esc(a.phone)}</span>` : ''}</div></section>
          <section class="op-c"><h3>Payment summary</h3>
            ${o.sub != null ? `<div class="op-r"><span>Items total</span><b>${INR(o.sub)}</b></div>` : ''}
            ${o.cpn ? `<div class="op-r"><span>Coupon (${esc(o.cpn.code)} · ${o.cpn.pct}% off)</span><b class="gd">− ${INR(o.cpn.amt)}</b></div>` : ''}
            ${o.dl ? `<div class="op-r"><span>Delivery</span><b>${o.ship ? INR(o.ship) : 'Free'}</b></div>` : ''}
            <div class="op-r op-t"><span>Total</span><b>${INR(o.total)}</b></div>
            <div class="op-r"><span>Payment</span><b>${payName(o.pay)}</b></div></section>
        </div>
        <div class="op-bar"><button class="btn block" data-act="order-view" data-id="${esc(o.id)}">View order</button><button class="btn alt block" data-act="modal-close">Continue shopping</button></div>`;
    }
  }
  function sendOtp() { lg.sent = String(100000 + Math.floor(Math.random() * 900000)); lg.step = 'otp'; lg.err = ''; renderModal(); }

  function calc(only) {
    const lines = only ? [{ id: only.id, size: only.size || '', qty: only.qty }] : Object.entries(S.cart).map(([k, q]) => { const x = lparse(k); return { id: x.id, size: x.size, qty: q }; });
    const items = lines.reduce((a, l) => a + l.qty, 0);
    const sub = lines.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
    const ship = shipFor(lines), dl = lines.some(l => hasShip(byId(l.id)));
    const cp = cpnGet(), cd = cpAmt(sub, cp);
    return { lines, items, sub, ship, dl, cp: cd ? cp : null, cd, total: sub - cd + ship };
  }
  const ckAddr = () => (S.ck && S.user) ? (U().addrs.find(a => a.id === S.ck.sel) || null) : null;
  const rd = n => String(Math.floor(Math.random() * Math.pow(10, n))).padStart(n, '0');
  const genOid = () => 'WS' + rd(4) + 'X' + rd(4) + 'C' + rd(6);
  const validUpi = s => /^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9]{2,64}$/.test(s || '');
  const rndDays = () => 5 + (Math.random() < 0.5 ? 0 : 1);
  const addrLine = a => `${esc(a.addr)}${a.lm ? ', ' + esc(a.lm) : ''}${a.area ? ', ' + esc(a.area) : ''}${a.city && a.city !== a.area ? ', ' + esc(a.city) : ''}${a.state ? ', ' + esc(a.state) : ''} - ${esc(a.pin)}`;

  function checkout(only) {
    if (!calc(only).lines.length) return;
    { const w = moqMsg(calc(only).lines); if (w) { toast(w); return; } }
    if (!S.user) { openLogin('checkout', only); return; }
    const l = U().addrs;
    S.ck = { only: only || null, step: l.length ? 'addr' : 'form', sel: l[0] ? l[0].id : null, pay: null, oid: null, dAt: null, busy: false };
    S.af = { id: null };
    closeCart(); closeModal(); go('chk');
  }

  function pageBack() {
    const ck = S.ck;
    if (S.view === 'chk' && ck && !ck.busy) {
      const prev = { sum: 'addr', pay: 'sum' }[ck.step];
      if (prev || (ck.step === 'form' && U().addrs.length)) { ck.step = prev || 'addr'; render(); page.scrollTop = 0; return; }
    }
    backStep();
  }

  const STEP_LBL = [['addr', 'Address'], ['sum', 'Summary'], ['pay', 'Payment']];
  const stepper = () => '';

  function addrListHTML(pick) {
    const l = U().addrs;
    const cards = l.map(a => {
      const on = pick && S.ck && S.ck.sel === a.id;
      const inner = `${pick ? '<span class="rad" aria-hidden="true">✓</span>' : ''}<span class="at"><b>${esc(a.name)}</b><span>${addrLine(a)}</span><span>+91 ${esc(a.phone)}</span></span>`;
      return `<div class="acard${pick ? ' pick' : ''}${on ? ' on' : ''}">${pick ? `<button class="abody" data-act="ck-sel" data-id="${esc(a.id)}" aria-pressed="${on}">${inner}</button>` : `<div class="abody">${inner}</div>`}<div class="aact"><button class="lnk" data-act="aedit" data-id="${esc(a.id)}">Edit</button><button class="lnk red" data-act="adel" data-id="${esc(a.id)}">Delete</button></div></div>`;
    }).join('');
    return `${l.length ? `<div class="alist">${cards}</div>` : '<div class="empty"><h3>No saved addresses</h3><p>Add an address and we will deliver your orders there.</p></div>'}
      <button class="btn alt block" data-act="anew" style="margin-top:.9rem">+ Add new address</button>`;
  }

  let PL = { pin: '', status: null, offices: [], district: '', state: '' }, plSeq = 0;
  const normState = s => { s = String(s || '').replace(/&/g, 'and').trim().toLowerCase(); return STATES.find(x => x.toLowerCase() === s) || null; };
  const pinStatusHTML = () => PL.status === 'wait' ? 'Checking pincode…' : PL.status === 'ok' ? `<span class="gd">✓ ${esc(PL.district)}${PL.district && PL.state ? ', ' : ''}${esc(PL.state)}</span>` : PL.status === 'bad' ? '<span class="rd">Pincode not found. Please enter a valid pincode.</span>' : PL.status === 'net' ? 'Could not check the pincode right now. Please select your state.' : '';
  const areaOpts = sel => PL.offices.map(n => `<option value="${esc(n)}"${n === sel ? ' selected' : ''}>${esc(n)}</option>`).join('');
  function paintPin() {
    const st = $('#pinst'); if (!st) return;
    st.innerHTML = pinStatusHTML();
    const ok = PL.status === 'ok', has = ok && PL.offices.length;
    const af = $('#areaF'), cf = $('#cityF'), sel = $('#pstate');
    if (af) { af.hidden = !has; const pa = $('#parea'); if (pa) { const cur = pa.value; pa.innerHTML = areaOpts(PL.offices.includes(cur) ? cur : PL.offices[0]); } }
    if (cf) { cf.hidden = !(ok && PL.district); const pc = $('#pcity'); if (pc) pc.value = PL.district; }
    if (ok && PL.state && sel) { if (![...sel.options].some(o => o.value === PL.state)) sel.add(new Option(PL.state, PL.state)); sel.value = PL.state; }
  }
  async function lookupPin(pin) {
    const my = ++plSeq; PL = { pin, status: 'wait', offices: [], district: '', state: '' }; paintPin();
    let res = { pin, status: 'net', offices: [], district: '', state: '' };
    try {
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 7000);
      const r = await fetch('https://api.postalpincode.in/pincode/' + pin, { signal: ctl.signal }); clearTimeout(to);
      const j = await r.json(), d = Array.isArray(j) ? j[0] : null;
      if (d && d.Status === 'Success' && Array.isArray(d.PostOffice) && d.PostOffice.length) { const po = d.PostOffice; res = { pin, status: 'ok', offices: po.map(x => x.Name).filter(Boolean), district: po[0].District || po[0].Block || '', state: normState(po[0].State) || po[0].State || '' }; }
      else if (d && /no records/i.test(String(d.Message || ''))) res = { pin, status: 'bad', offices: [], district: '', state: '' };
    } catch (e) {}
    if (my !== plSeq) return;
    PL = res; paintPin();
  }
  const AV = {
    pname: v => v.trim().length < 2 ? 'Please enter your full name' : '',
    pphone: v => /^[6-9]\d{9}$/.test(v) ? '' : v.length < 10 ? 'Please enter a valid 10-digit mobile number' : 'Mobile number must start with 6, 7, 8 or 9',
    paddr: v => v.trim().length < 8 ? 'Please enter your full address with house number, street and city' : '',
    ppin: v => /^\d{6}$/.test(v) ? '' : 'Please enter a valid 6-digit pincode'
  };
  function showFE(k) {
    const el = $('#' + k), er = $('#e_' + k); if (!el || !er) return '';
    const m = AV[k](el.value); er.textContent = m; el.classList.toggle('bad', !!m); return m;
  }

  function addrFormHTML(id) {
    const a = id ? U().addrs.find(x => x.id === id) : null;
    PL = a && a.pin ? { pin: a.pin, status: a.state ? 'ok' : null, offices: a.area ? [a.area] : [], district: a.city || '', state: a.state || '' } : { pin: '', status: null, offices: [], district: '', state: '' };
    const okA = PL.status === 'ok';
    return `<form id="fAddr" class="cf" novalidate>
      <div class="fld"><label for="pname">Full name</label><input id="pname" autocomplete="name" maxlength="60" value="${esc(a ? a.name : '')}"><p class="ferr" id="e_pname" role="alert"></p></div>
      <div class="fld"><label for="pphone">Mobile number</label><div class="phone"><span>+91</span><input id="pphone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national" value="${esc(a ? a.phone : S.user || '')}"></div><p class="ferr" id="e_pphone" role="alert"></p></div>
      <div class="fld"><label for="paddr">Address</label><textarea id="paddr" rows="3" maxlength="200" autocomplete="street-address" placeholder="House no., building, street, area">${esc(a ? a.addr : '')}</textarea><p class="ferr" id="e_paddr" role="alert"></p></div>
      <div class="fld"><label for="plm">Landmark (optional)</label><input id="plm" maxlength="80" placeholder="Near school, temple, shop…" value="${esc(a ? a.lm : '')}"></div>
      <div class="two"><div class="fld"><label for="ppin">Pincode</label><input id="ppin" inputmode="numeric" maxlength="6" autocomplete="postal-code" value="${esc(a ? a.pin : '')}"></div>
        <div class="fld"><label for="pstate">State</label><select id="pstate"><option value="">Select state</option>${STATES.map(x => `<option value="${esc(x)}"${a && a.state === x ? ' selected' : ''}>${esc(x)}</option>`).join('')}</select></div></div>
      <p class="ferr" id="e_ppin" role="alert"></p><p class="pinst" id="pinst">${pinStatusHTML()}</p>
      <div class="fld" id="areaF"${okA && PL.offices.length ? '' : ' hidden'}><label for="parea">Area</label><select id="parea">${areaOpts(a ? a.area : '')}</select></div>
      <div class="fld" id="cityF"${okA && PL.district ? '' : ' hidden'}><label for="pcity">City / District</label><input id="pcity" readonly value="${esc(PL.district)}"></div>
      <p class="err" id="err" role="alert"></p>
      <button class="btn block" type="submit">Save address</button>
    </form>`;
  }

  const priceCard = c => {
    const mrp = c.lines.reduce((a, l) => a + byId(l.id).mrp * l.qty, 0), disc = Math.max(0, mrp - c.sub), pct = mrp ? Math.round(disc / mrp * 100) : 0;
    return `<section class="dcard"><h3>Price details</h3>
      <div class="prow"><span>Price (${c.items} ${c.items === 1 ? 'item' : 'items'})</span><s>${INR(mrp)}</s></div>
      ${disc ? `<div class="prow"><span>Discount (${pct}% off)</span><span class="gd">− ${INR(disc)}</span></div>` : ''}
      <div class="prow"><span>Selling price</span><b>${INR(c.sub)}</b></div>
      ${c.cd ? `<div class="prow"><span>Coupon (${esc(c.cp.code)} · ${c.cp.pct}% off)</span><span class="gd">− ${INR(c.cd)}</span></div>` : ''}
      <div class="prow"><span>Delivery charges</span>${c.ship ? `<span>${INR(c.ship)}</span>` : '<span class="gd">Free</span>'}</div>
      <div class="prow t"><span>Total amount</span><span>${INR(c.total)}</span></div>
      ${disc + c.cd ? `<p class="sbn">You will save ${INR(disc + c.cd)} (${mrp ? Math.round((disc + c.cd) / mrp * 100) : 0}% off) on this order</p>` : ''}</section>`;
  };
  const itemRow = (l, edit, many) => {
    const p = byId(l.id), mnq = (S.ck && S.ck.only) ? Math.min(moqOf(p), Math.max(1, limOf(p, l.size))) : minQK(lkey(l.id, l.size));
    return `<div class="ci2">${thumb({ id: l.id })}<div class="oi-b"><b>${esc(p.name)}</b>${l.size ? `<span class="sub">Size: ${esc(l.size)}</span>` : ''}
      <div class="pr"><b>${INR(p.price)}</b><s>${INR(p.mrp)}</s><em class="gd">${off(p)}% off</em></div>
      ${edit ? `<div class="cr"><div class="step sm" role="group" aria-label="Quantity of ${esc(p.name)}"><button data-act="ck-q" data-k="${esc(lkey(l.id, l.size))}" data-d="-1" aria-label="Decrease quantity"${l.qty <= mnq ? ' disabled' : ''}>−</button><output>${l.qty}</output><button data-act="ck-q" data-k="${esc(lkey(l.id, l.size))}" data-d="1" aria-label="Increase quantity"${l.qty >= limOf(p, l.size) ? ' disabled' : ''}>+</button></div>${many ? `<button class="lnk red" data-act="ck-rm" data-k="${esc(lkey(l.id, l.size))}">Remove</button>` : ''}</div>` : `<span class="sub">Qty ${l.qty}</span>`}
    </div><b class="lt">${INR(p.price * l.qty)}</b></div>`;
  };
  const cbar = (c, btn) => `<div class="cbar"><div class="cbt"><small>Total</small><b>${INR(c.total)}</b></div>${btn}</div>`;
  const trustStrip = () => `<div class="tstrip"><span>${ICO('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>')}Secure checkout</span><span>${ICO('<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>')}Genuine products</span><span>${ICO('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')}Track your order</span></div>`;

  function chkHTML() {
    const ck = S.ck; if (!ck) return pgBar('Checkout');
    const c = calc(ck.only), a = ckAddr();
    const sl = ck.shown !== ck.step ? ' slide' : ''; ck.shown = ck.step;
    if (ck.step === 'form') return pgBar(S.af && S.af.id ? 'Edit address' : 'Add address') + `<div class="pg-in${sl}">${stepper('addr')}${addrFormHTML(S.af && S.af.id)}</div>`;
    if (ck.step === 'addr' || !a) {
      const many = !ck.only && c.lines.length > 1;
      return pgBar('Select address') + `<div class="pg-in${sl}">${stepper('addr')}${addrListHTML(true)}
        <section class="dcard" style="margin-top:1.1rem"><h3>Your order</h3>${c.lines.map(l => itemRow(l, true, many)).join('')}
          ${c.cd ? `<div class="prow"><span>Coupon (${esc(c.cp.code)} · ${c.cp.pct}% off)</span><span class="gd">− ${INR(c.cd)}</span></div>` : ''}
          <div class="prow t"><span>Total (${c.items} ${c.items === 1 ? 'item' : 'items'})</span><span>${INR(c.sub - c.cd)}</span></div></section>
        ${cbar({ total: c.sub - c.cd + c.ship }, `<button class="btn" data-act="ck-confirm"${a ? '' : ' disabled'}>Confirm</button>`)}</div>`;
    }
    if (ck.step === 'sum') {
      return pgBar('Order summary') + `<div class="pg-in${sl}">${stepper('sum')}
        <section class="dcard"><h3>Deliver to</h3><b>${esc(a.name)}</b><p class="sub">${addrLine(a)}</p><p class="sub">+91 ${esc(a.phone)}</p><button class="lnk" data-act="ck-change" style="justify-self:start">Change address</button></section>
        <section class="dcard"><h3>Items (${c.items})</h3>${c.lines.map(l => itemRow(l, false)).join('')}</section>
        <section class="dcard"><h3>Delivery</h3><div class="prow"><span>Order date</span><b>${dwk(Date.now())}</b></div><div class="prow"><span>Expected delivery</span><b class="gd">${dwk(ck.dAt)}</b></div><div class="prow"><span>Delivery charges</span>${c.ship ? `<b>${INR(c.ship)}</b>` : '<b class="gd">Free</b>'}</div></section>
        ${cpnBox()}${priceCard(c)}${trustStrip()}
        ${cbar(c, '<button class="btn" data-act="ck-next">Continue to payment</button>')}</div>`;
    }
    const codOff = FBS.cod === false, upi = prepaidOn() ? FBS.upi : '';
    const pm = (act, ico, t, d, on, dis) => `<button class="pm${on ? ' on' : ''}" data-act="${act}" aria-pressed="${on}"${dis ? ' disabled aria-disabled="true"' : ''}><span class="pmi">${ico}</span><span class="pmt"><b>${t}</b><span>${d}</span></span><span class="rad" aria-hidden="true">✓</span></button>`;
    const cashIco = ICO('<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v.01M18 14v.01"/>');
    const upiIco = ICO('<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18h3"/><path d="m9.5 10 2 2 3.5-4"/>');
    let panel = '';
    if (ck.pay === 'online' && upi) {
      const link = 'upi://pay?pa=' + encodeURIComponent(upi) + '&pn=' + encodeURIComponent(FBS.upiName || BRAND) + '&am=' + c.total.toFixed(2) + '&cu=INR&tn=' + encodeURIComponent('Order ' + ck.oid);
      panel = `<section class="dcard upi"><h3>Pay with UPI</h3>
        <div class="prow"><span>UPI ID</span><b>${esc(upi)}</b></div>
        <div class="prow"><span>Amount</span><b>${INR(c.total)}</b></div>
        <button class="lnk" data-act="upi-copy" style="justify-self:start">Copy UPI ID</button>
        <a class="btn block" href="${esc(link)}">Pay ${INR(c.total)} with UPI app</a>
        <p class="sub small">This opens GPay, PhonePe, Paytm or any UPI app on your phone with the amount filled in. After paying, come back here and tap Place order. On a computer, pay to the UPI ID above from your phone.</p>
        <div class="fld"><label for="utr">UPI transaction ID (optional)</label><input id="utr" inputmode="numeric" maxlength="12" placeholder="12 digits, shown after payment"></div></section>`;
    } else if (ck.pay === 'cod') {
      panel = `<section class="dcard"><h3>Cash on Delivery</h3><p class="sub">Please keep ${INR(c.total)} ready. You pay the delivery person when your order arrives at your door.</p></section>`;
    }
    const mrp = c.lines.reduce((x, l) => x + byId(l.id).mrp * l.qty, 0), disc = Math.max(0, mrp - c.sub);
    const label = ck.busy ? 'Placing order…' : ck.pay === 'online' ? 'I have paid, place order' : ck.pay === 'cod' ? 'Place order' : 'Select payment method';
    return pgBar('Payment') + `<div class="pg-in${sl}">${stepper('pay')}
      <section class="amt"><div><small>Amount payable</small><b>${INR(c.total)}</b></div>${disc + c.cd ? `<span class="sv">You save ${INR(disc + c.cd)}</span>` : ''}</section>
      <p class="sec-t">Choose payment method</p>
      <div class="pms">${pm('pay-cod', cashIco, 'Cash on Delivery', codOff ? 'Currently unavailable' : 'Pay when your order arrives', ck.pay === 'cod', codOff || ck.busy)}${pm('pay-online', upiIco, 'Prepaid (UPI)', upi ? 'GPay, PhonePe, Paytm or any UPI app' : 'Currently unavailable', ck.pay === 'online', !upi || ck.busy)}</div>
      ${panel}${cpnBox()}${priceCard(c)}${trustStrip()}
      ${cbar(c, `<button class="btn" data-act="pay-place"${ck.pay && !ck.busy ? '' : ' disabled'}>${label}</button>`)}</div>`;
  }

  async function placeOrder(pay, utr) {
    const ck = S.ck; if (!ck || ck.busy) return;
    const only = ck.only, a = ckAddr(); let c = calc(only);
    const cp0 = c.cp ? c.cp.code : '';
    pay = pay === 'online' ? 'online' : 'cod';
    if (!c.lines.length || !a) return;
    ck.busy = true; render();
    await pull();
    ck.busy = false;
    if (S.ck !== ck) return;
    if (FBS.open === false) { render(); return; }
    if (only && !byId(only.id)) { toast('This item is no longer available'); S.ck = null; showHome(false); renderCart(); return; }
    c = calc(only);
    if (cp0 && !c.cp) { toast('Your coupon has expired. Please check your new total.'); cpnRender(); return; }
    if (!c.lines.length) { toast('Your items are no longer available'); S.ck = null; showHome(false); renderCart(); return; }
    if (pay === 'cod' && FBS.cod === false) { toast('Cash on Delivery is not available right now'); ck.pay = null; render(); return; }
    if (pay === 'online' && !prepaidOn()) { toast('Online payment is currently unavailable'); ck.pay = null; render(); return; }
    const bad = c.lines.find(l => { const p = byId(l.id); return !p || limLeft(p, l.size) < l.qty; });
    if (bad) { const p = byId(bad.id); toast(p ? `Only ${limLeft(p, bad.size)} left of ${p.name}${bad.size ? ' (size ' + bad.size + ')' : ''}` : 'An item is no longer available'); S.ck = null; showHome(false); renderCart(); return; }
    { const mw = moqMsg(c.lines); if (mw) { toast(mw); S.ck = null; showHome(false); renderCart(); return; } }
    const now = Date.now(), dAt = ck.dAt || now + rndDays() * DAY;
    const order = { id: ck.oid || genOid(), ts: now, st: 'placed', t: { placed: now }, sAt: now + SHIP_AFTER, dAt, pay,
      items: c.items, sub: c.sub, ship: c.ship, dl: true, total: c.total, to: `${a.name}, ${a.pin}`, addr: { name: a.name, phone: a.phone, addr: a.addr, pin: a.pin, lm: a.lm || '', state: a.state || '', area: a.area || '', city: a.city || '' },
      lines: c.lines.map(l => { const p = byId(l.id); return { id: l.id, size: l.size || '', name: p.name, qty: l.qty, price: p.price, ret: typeof p.returns === 'number' ? p.returns : undefined, rep: typeof p.replace === 'number' ? p.replace : undefined, exc: typeof p.exch === 'number' ? p.exch : undefined }; }) };
    if (utr) order.utr = utr;
    if (c.cp && c.cd) order.cpn = { code: c.cp.code, pct: c.cp.pct, amt: c.cd, auto: c.cp.src === 'auto' };
    ck.busy = true; render();
    const u = U(); u.addrs = [a, ...u.addrs.filter(x => x.id !== a.id)]; syncProf();
    u.orders = [order, ...u.orders].slice(0, 50); save(); sendOrder(order);
    if (!only) { S.cart = {}; save(); renderCart(); }
    S.ck = null; showHome(false);
    lg = { step: 'done', phone: '', otp: '', err: '', after: null, only: null, order };
    renderModal(); modal.hidden = false;
  }

  const U = () => {
    const u = (S.users[S.user] = S.users[S.user] || { profile: null, fav: [], orders: [], addrs: [] });
    if (!Array.isArray(u.addrs)) u.addrs = [];
    if (!u.addrs.length && u.profile) u.addrs.push(Object.assign({ id: 'a' + Date.now().toString(36) }, u.profile));
    return u;
  };
  const syncProf = () => { const u = U(), a = u.addrs[0]; u.profile = a ? { name: a.name, phone: a.phone, addr: a.addr, pin: a.pin, lm: a.lm || '', state: a.state || '' } : null; };
  const isFav = id => !!S.user && U().fav.includes(Number(id));
  const HEART = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  const heart = id => `<button class="hrt" data-act="fav" data-id="${id}" aria-pressed="${isFav(id)}" aria-label="Save to favorites">${HEART}</button>`;
  const rerender = () => S.view === 'detail' ? renderDetail() : PAGES.includes(S.view) ? render() : renderHome();
  function toggleFav(id) {
    if (!S.user) { openLogin(); toast('Login to save favorites'); return; }
    const f = U().fav, i = f.indexOf(Number(id));
    if (i < 0) f.unshift(Number(id)); else f.splice(i, 1);
    save(); rerender(); toast(i < 0 ? 'Saved to favorites' : 'Removed from favorites');
  }
  const dstr = ts => new Date(ts).toLocaleDateString(S.lang === 'hi' ? 'hi-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const PAGES = ['account', 'orders', 'order', 'fav', 'lang', 'addrs', 'aform', 'chk'];
  const page = $('#page');
  let histOK = false;
  const hidePage = () => { page.hidden = true; delete page.dataset.v; page.classList.remove('enter'); document.body.classList.remove('lock'); };
  function pushHist() { S.stack.push({ view: S.view, id: S.id }); try { history.pushState({ n: S.stack.length }, ''); histOK = true; } catch (e) {} }
  function go(view) { closeCart(); closeMenu(); pushHist(); S.view = view; render(); page.scrollTop = 0; jumpTop(); }
  function goBack() {
    const s = S.stack.pop(); if (!s) return showHome(false);
    S.view = s.view; S.id = s.id;
    if (s.view === 'detail') { hidePage(); renderDetail(); } else if (PAGES.includes(s.view)) render(); else { hidePage(); renderHome(); }
  }
  let skipPop = 0;
  const backStep = () => { if (!S.stack.length) return showHome(false); if (histOK) { skipPop++; try { history.back(); } catch (e) { skipPop--; } } goBack(); };
  window.addEventListener('popstate', () => { if (skipPop) { skipPop--; return; } if (S.stack.length) goBack(); else if (S.view !== 'home') showHome(false); });
  function render() {
    if (!PAGES.includes(S.view)) { hidePage(); return S.view === 'detail' ? renderDetail() : renderHome(); }
    const st = page.scrollTop;
    const opening = page.dataset.v !== S.view; page.dataset.v = S.view; page.classList.remove('enter');
    page.hidden = false; document.body.classList.add('lock'); page.innerHTML = pageHTML(); page.scrollTop = st;
    if (opening) { void page.offsetWidth; page.classList.add('enter'); }
  }

  const ARROW = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>';
  const pgBar = t => `<div class="pg-bar"><button class="pg-back" data-act="pback" aria-label="Back">${ARROW}</button><h1>${t}</h1></div>`;
  const emptyBox = (h, p) => `<div class="empty"><h3>${h}</h3><p>${p}</p><button class="btn" data-act="shop">Start shopping</button></div>`;
  const DAY = 864e5, SHIP_AFTER = DAY, DELIVER_AFTER = 4 * DAY;
  const RANK = { placed: 0, accepted: 1, ready: 2, shipped: 3, delivered: 4 };
  const STL = { placed: 'Order placed', accepted: 'Accepted', ready: 'Ready to ship', shipped: 'In transit', delivered: 'Delivered', cancelled: 'Cancelled', rejected: 'Rejected' };
  const dead = o => o.st === 'cancelled' || o.st === 'rejected';
  const loc = () => S.lang === 'hi' ? 'hi-IN' : 'en-IN';
  const dwk = ts => new Date(ts).toLocaleDateString(loc(), { weekday: 'short', day: 'numeric', month: 'short' });
  const dmon = ts => new Date(ts).toLocaleDateString(loc(), { day: 'numeric', month: 'short' });
  const dfull = ts => { const d = new Date(ts); return d.toLocaleDateString(loc(), { weekday: 'short', day: 'numeric', month: 'short' }) + " '" + String(d.getFullYear()).slice(2) + ' · ' + d.toLocaleTimeString(loc(), { hour: 'numeric', minute: '2-digit' }); };
  const payName = p => p === 'cod' ? 'Cash on Delivery' : p === 'online' ? 'Prepaid' : '';
  function syncOrder(o) {
    let ch = false; const now = Date.now();
    if (!o.st) { o.st = 'placed'; ch = true; }
    if (!o.t) { o.t = { placed: o.ts }; ch = true; }
    if (!o.sAt) { o.sAt = o.ts + SHIP_AFTER; ch = true; }
    if (!o.dAt) { o.dAt = o.ts + DELIVER_AFTER; ch = true; }
    return ch;
  }
  const syncAll = () => { let ch = false; U().orders.forEach(o => { if (syncOrder(o)) ch = true; }); if (ch) save(); };
  window.setOrderStatus = (id, st) => {
    const o = S.user && U().orders.find(x => x.id === id);
    if (!o) return 'Order nahi mila. Login karke sahi order ID likho.';
    const now = Date.now(); syncOrder(o);
    if (st === 'placed') { o.st = 'placed'; delete o.t.shipped; delete o.t.delivered; delete o.t.cancelled; o.sAt = now + SHIP_AFTER; o.dAt = now + DELIVER_AFTER; }
    else if (st === 'shipped') { o.st = 'shipped'; o.t.shipped = now; delete o.t.delivered; delete o.t.cancelled; o.sAt = now; o.dAt = Math.max(o.dAt, now + DAY); }
    else if (st === 'delivered') { o.st = 'delivered'; o.t.shipped = o.t.shipped || now; o.t.delivered = now; delete o.t.cancelled; o.sAt = Math.min(o.sAt, now); o.dAt = now; }
    else if (st === 'cancelled') { o.st = 'cancelled'; o.t.cancelled = now; }
    else return "st 'placed', 'shipped', 'delivered' ya 'cancelled' likho.";
    save(); if (PAGES.includes(S.view)) render();
    return o.id + ' -> ' + o.st;
  };
  const stSub = o => o.st === 'delivered' ? 'on ' + dwk(o.t.delivered) : dead(o) ? 'on ' + dwk(o.t.cancelled || o.t.rejected || o.ts) : 'Expected by ' + dwk(o.dAt);
  function lineChips(l, o) {
    const out = [], d = o.t && o.t.delivered;
    if (dead(o)) return out;
    const one = (v, word, noText, closed) => {
      if (typeof v !== 'number') return;
      if (v <= 0) out.push([noText, 1]);
      else if (d) { const u = d + v * DAY; out.push(Date.now() <= u ? [word + ' till ' + dmon(u), 0] : [closed, 1]); }
      else out.push([v + '-day ' + (word === 'Return' ? 'returns' : word === 'Exchange' ? 'exchange' : 'replacement'), 0]);
    };
    if (l.rep > 0) one(l.rep, 'Replacement', 'No replacement', 'Replacement window closed');
    else if (l.exc > 0 && !(l.ret > 0)) one(l.exc, 'Exchange', 'No exchange', 'Exchange window closed');
    else one(l.ret, 'Return', 'No returns', 'Return window closed');
    return out;
  }
  const chipsHTML = arr => arr.map(([t, bad]) => `<span class="ochip${bad ? ' no' : ''}">${esc(t)}</span>`).join('');
  const thumb = l => { const p = byId(l.id); return `<span class="ph oth"${p ? ` style="--h:${p.h}"` : ''}>${p ? art(p) : ''}</span>`; };
  const orderRow = o => {
    const f = o.lines[0], n = o.lines.length;
    const ch = (o.pay ? `<span class="ochip pay">${o.pay === 'cod' ? 'COD' : 'Prepaid'}</span>` : '') + (n === 1 ? chipsHTML(lineChips(f, o)) : '');
    return `<button class="oc" data-act="order-open" data-id="${esc(o.id)}" aria-label="Order ${esc(o.id)}">
      <span class="oc-img">${thumb(f)}</span>
      <span class="oc-body">
        <span class="oc-n">${esc(f.name)}${f.size ? ' (' + esc(f.size) + ')' : ''}${n > 1 ? ` <small>+ ${n - 1} more</small>` : ''}</span>
        <span class="oc-s"><span class="st ${o.st}">${STL[o.st]}</span><span class="sd">${esc(stSub(o))}</span></span>
        <span class="oc-m">Ordered ${dstr(o.ts)} · ${esc(o.id)}</span>
        ${ch ? `<span class="oc-c">${ch}</span>` : ''}
      </span>
      <span class="oc-r"><b>${INR(o.total)}</b><span class="chev" aria-hidden="true">›</span></span>
    </button>`;
  };
  function stepsHTML(o) {
    const t = o.t, r = RANK[o.st] || 0, st = [{ n: 'Order placed', at: t.placed, done: true }];
    if (dead(o)) st.push({ n: o.st === 'rejected' ? 'Rejected' : 'Cancelled', at: t.cancelled || t.rejected, done: true, bad: true });
    else {
      st.push({ n: 'Accepted', at: t.accepted, done: r >= 1 });
      st.push({ n: 'Ready to ship', at: t.ready, done: r >= 2 });
      st.push({ n: 'In transit', at: t.shipped, done: r >= 3 });
      st.push(r >= 4 ? { n: 'Delivered', at: t.delivered, done: true } : { n: 'Delivery expected by ' + dwk(o.dAt), done: false });
    }
    return `<div class="tl">${st.map((x, i) => {
      const nx = st[i + 1];
      const cls = ['tl-s', x.done ? 'done' : '', x.bad ? 'bad' : '', nx && nx.done ? (nx.bad ? 'lnb' : 'ln') : '', x.done && !(nx && nx.done) ? 'cur' : ''].filter(Boolean).join(' ');
      return `<div class="${cls}"><div class="tl-t">${x.n}</div>${x.done && x.at ? `<div class="tl-d">${dfull(x.at)}</div>` : ''}</div>`;
    }).join('')}</div>`;
  }
  function orderPage(o) {
    const a = o.addr, sub = o.sub != null ? o.sub : o.total - (o.ship || 0);
    const items = o.lines.map(l => { const c = lineChips(l, o); return `<div class="oi">${thumb(l)}<div class="oi-b"><b>${esc(l.name)}</b><span>${l.size ? 'Size ' + esc(l.size) + ' · ' : ''}${l.qty | 0} × ${INR(l.price)} = ${INR(l.price * l.qty)}</span>${c.length ? `<div class="oc-c">${chipsHTML(c)}</div>` : ''}</div></div>`; }).join('');
    return `
      <section class="dcard"><div class="oh"><b>${esc(o.id)}</b><span>Ordered ${dstr(o.ts)}</span></div><div class="oc-s"><span class="st ${o.st}">${STL[o.st]}</span><span class="sd">${esc(stSub(o))}</span></div>${o.st === 'rejected' && o.reason ? `<p class="sub" style="margin-top:.5rem">Reason: ${esc(o.reason)}</p>` : ''}</section>
      <section class="dcard"><h3>Order status</h3>${stepsHTML(o)}${o.st === 'placed' ? '<button class="btn alt block" data-act="cancel-ask" style="margin-top:.5rem">Cancel order</button>' : ''}</section>
      <section class="dcard"><h3>Items</h3>${items}</section>
      ${rateHTML(o, 'dcard')}
      ${o.pay ? `<section class="dcard"><h3>Payment</h3><b>${o.pay === 'cod' ? 'Cash on Delivery' : 'Online payment (Prepaid)'}</b><p class="sub">${o.pay === 'cod' ? (o.payStatus === 'paid' ? 'Paid ' + INR(o.total) + ' on delivery.' : 'Pay ' + INR(o.total) + ' when your order arrives.') : (o.payStatus === 'paid' ? 'Payment of ' + INR(o.total) + ' received.' : 'Payment of ' + INR(o.total) + ' submitted. The seller will confirm it shortly.')}</p></section>` : ''}
      <section class="dcard"><h3>Delivery address</h3>${a ? `<b>${esc(a.name)}</b><p class="sub">${addrLine(a)}</p><p class="sub">+91 ${esc(a.phone)}</p>` : `<p class="sub">${esc(o.to || '')}</p>`}</section>
      <section class="dcard"><h3>Price details</h3>
        <div class="prow"><span>Subtotal</span><span>${INR(sub)}</span></div>
        ${o.cpn ? `<div class="prow"><span>Coupon (${esc(o.cpn.code)} · ${o.cpn.pct}% off)</span><span class="gd">− ${INR(o.cpn.amt)}</span></div>` : ''}
        ${o.dl ? `<div class="prow"><span>Delivery</span><span>${o.ship ? INR(o.ship) : 'Free'}</span></div>` : ''}
        <div class="prow t"><span>Total</span><span>${INR(o.total)}</span></div>
      </section>`;
  }

  function pageHTML() {
    const u = U(), pr = u.profile;
    if (S.view === 'chk') return chkHTML();
    if (S.view === 'addrs') return pgBar('Addresses') + `<div class="pg-in">${addrListHTML(false)}</div>`;
    if (S.view === 'aform') return pgBar(S.af && S.af.id ? 'Edit address' : 'Add address') + `<div class="pg-in">${addrFormHTML(S.af && S.af.id)}</div>`;
    if (S.view === 'order') { syncAll(); const o = u.orders.find(x => x.id === S.oid); if (o) return pgBar('Order details') + `<div class="pg-in">${orderPage(o)}</div>`; S.view = 'orders'; }
    if (S.view === 'orders') { syncAll(); return pgBar('Orders') + `<div class="pg-in ol">${u.orders.length ? u.orders.map(orderRow).join('') : emptyBox('No orders yet', 'Your placed orders will show up here.')}</div>`; }
    if (S.view === 'fav') { const l = u.fav.map(byId).filter(Boolean); return pgBar('Favorites') + `<div class="pg-in wide">${l.length ? `<div class="grid">${l.map(card).join('')}</div>` : emptyBox('No favorites yet', 'Tap the heart on a product to save it here.')}</div>`; }
    if (S.view === 'lang') return pgBar('Language') + `<div class="pg-in"><p class="sub" style="margin-bottom:1rem">Choose your language</p><div class="alist">${[['en', 'English'], ['hi', 'हिन्दी']].map(([c, n]) => `<button class="rh lopt" data-act="lang" data-l="${c}" aria-pressed="${S.lang === c}"><span class="rl">${n}</span><span class="ck" aria-hidden="true">✓</span></button>`).join('')}</div></div>`;
    const name = pr ? pr.name.trim() : '';
    const ico = (d, c) => `<span class="ri">${ICO(d)}</span>`;
    const rows = [
      ['orders', 'Orders', '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>', u.orders.length],
      ['fav', 'Favorites', '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>', u.fav.length],
      ['lang', 'Language', '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>', S.lang === 'hi' ? 'हिन्दी' : 'English'],
      ['addrs', 'Addresses', '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', u.addrs.length || null]];
    return pgBar('My account') + `
      <div class="pg-in acct">
        <section class="ac-card">
          <div class="ac-top"><div class="av" aria-hidden="true">${esc((name || '+')[0].toUpperCase())}</div><div class="ac-id"><h1>${name ? esc(name) : '+91 ' + esc(S.user)}</h1><p>${mask(S.user)}</p></div></div>
          <div class="ac-stats"><div><b>${u.orders.length}</b><span>Orders</span></div><div><b>${u.fav.length}</b><span>Favorites</span></div><div><b>${u.addrs.length}</b><span>Addresses</span></div></div>
        </section>
        <div class="ac-tiles">
          ${rows.map(r => `<button class="ac-tile" data-act="goto" data-to="${r[0]}"><span class="ac-ic">${ICO(r[2])}</span><span class="ac-go" aria-hidden="true">›</span><span class="ac-t"><span class="ac-l">${r[1]}</span><span class="ac-n">${r[3] === null ? 'Add' : r[3]}</span></span></button>`).join('')}
        </div>
        <button class="ac-out" data-act="logout">${ICO('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>')}<span>Log out</span></button>
      </div>`;
  }

  /* ---- Coupon UI ---- */
  const promoInner = () => { const a = cpAuto(); return a ? `<div class="cpromo"><span aria-hidden="true">🎉</span><b>${a.pct}% OFF on every order</b><span>Offer ends in ${cdTag(a.end)}</span></div>` : ''; };
  const offerInner = () => { const a = cpAuto(); return a ? `<p class="coff">🏷️ Extra ${a.pct}% off applied at checkout · ends in ${cdTag(a.end)}</p>` : ''; };
  function cpnBox() {
    const cp = cpnGet();
    if (cp) return `<div class="cpn on"><div class="cpn-h"><span class="cpn-i" aria-hidden="true">%</span><div class="cpn-t"><b>${esc(cp.code)}</b><small>${cp.pct}% off · ${cp.src === 'auto' ? 'Offer applied automatically' : 'Coupon applied'}</small></div>${cp.src === 'code' ? '<button class="lnk red" data-act="cp-remove">Remove</button>' : ''}</div><div class="cpn-c">Offer ends in ${cdTag(cp.end)}</div></div>`;
    return `<div class="cpn"><div class="cpn-f"><input type="text" class="cpn-in" placeholder="Enter coupon code" value="${esc(CPD)}" maxlength="20" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Coupon code"><button class="btn" data-act="cp-apply">Apply</button></div></div>`;
  }
  function cpnRender() {
    cpLast = cpSigNow();
    renderCart();
    const pr = document.getElementById('cpromo'); if (pr) pr.innerHTML = promoInner();
    const of = document.getElementById('coffer'); if (of) of.innerHTML = offerInner();
    if (S.view === 'chk' && S.ck) render();
  }
  function cpApply(v) {
    const code = String(v || '').toUpperCase().replace(/[^A-Z0-9_-]/g, ''), x = CP[code], n = Date.now();
    if (!code) { toast('Enter a coupon code'); return; }
    if (!x || x.on === false || !(x.pct > 0)) { toast('Invalid coupon code'); return; }
    if (n < x.start) { toast('This coupon is not active yet'); return; }
    if (n >= x.end) { toast('This coupon has expired'); return; }
    const cur = cpnGet();
    if (cur && cur.src === 'auto' && cur.pct >= x.pct) { toast('A better offer of ' + cur.pct + '% is already applied'); return; }
    CPN = code; CPD = ''; try { localStorage.setItem(CPK, CPN); } catch (e) {}
    cpnRender(); toast(code + ' applied! ' + x.pct + '% off');
  }
  document.addEventListener('input', e => { if (e.target.matches && e.target.matches('.cpn-in')) CPD = e.target.value.toUpperCase(); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches && e.target.matches('.cpn-in')) { e.preventDefault(); cpApply(e.target.value); } });
  /* live countdown + auto refresh when an offer starts or ends */
  setInterval(() => {
    const n = Date.now();
    document.querySelectorAll('.cdt[data-end]').forEach(el => { el.textContent = cdFmt(+el.dataset.end - n); });
    if (cpSigNow() !== cpLast) cpnRender();
  }, 1000);

  /* ---- Rating UI: shown in "Order placed" popup and in Order details ---- */
  const RLAB = ['', 'Very bad', 'Bad', 'Okay', 'Good', 'Excellent'];
  const ordOf = oid => (lg && lg.order && lg.order.id === oid && lg.order) || (S.user ? U().orders.find(x => x.id === oid) : null);
  function rateHTML(o, cls) {
    if (!o || o.st !== 'delivered' || !Array.isArray(o.lines) || !o.lines.length) return '';
    const done = o.rated || {}, sel = RSEL[o.id] || (RSEL[o.id] = {}), seen = {};
    const ls = o.lines.filter(l => !seen[l.id] && (seen[l.id] = 1));
    const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';
    const rows = ls.map(l => {
      const lock = !!done[l.id], v = done[l.id] || sel[l.id] || 0;
      const stars = [1, 2, 3, 4, 5].map(n => `<button type="button" class="${n <= v ? 'on' : ''}" data-act="rate-star" data-oid="${esc(o.id)}" data-id="${l.id}" data-n="${n}" role="radio" aria-checked="${n === v}" aria-label="${n} star${n > 1 ? 's' : ''}"${lock ? ' disabled' : ''}>${STAR}</button>`).join('');
      return `<div class="rr"><div class="rr-t">${thumb(l)}<b>${esc(l.name)}</b></div><div class="stars c${band(v)}" role="radiogroup" aria-label="Rate ${esc(l.name)}">${stars}</div><div class="rl c${band(v)}">${v ? RLAB[v] : '&nbsp;'}</div></div>`;
    }).join('');
    const doneN = ls.filter(l => done[l.id]).length, all = doneN === ls.length, ready = ls.some(l => !done[l.id] && sel[l.id]);
    return `<section class="${cls} rate" data-rate="${esc(o.id)}" data-cls="${cls}"><h3>Rate your purchase</h3>
      ${all ? '' : '<p class="sub">Tap the stars to rate each product.</p>'}
      ${rows}
      ${doneN ? '<div class="rthx"><span aria-hidden="true">🙏</span><div><b>Thank you for rating!</b><p>Thanks for taking the time to rate. Your feedback helps us and other customers.</p></div></div>' : ''}
      ${all ? '' : `<button class="btn block" data-act="rate-submit" data-oid="${esc(o.id)}"${ready ? '' : ' disabled'}>Submit rating</button>`}
    </section>`;
  }
  function redrawRate(oid) {
    document.querySelectorAll('[data-rate]').forEach(el => {
      if (el.dataset.rate !== oid) return;
      const o = ordOf(oid); if (!o) return;
      const t = document.createElement('div'); t.innerHTML = rateHTML(o, el.dataset.cls);
      if (t.firstElementChild) el.replaceWith(t.firstElementChild);
    });
  }
  function refreshRatings() {
    if (modal && !modal.hidden) { RSDIRTY = true; return; }
    RSDIRTY = false;
    if (S.view === 'home') renderHome(); else if (S.view === 'detail' && byId(S.id)) renderDetail();
  }
  function submitRate(oid) {
    const o = ordOf(oid); if (!o) return;
    const sel = RSEL[oid] || {}, ids = Object.keys(sel).filter(id => sel[id] >= 1 && sel[id] <= 5 && !(o.rated && o.rated[id]));
    if (!ids.length) { toast('Please tap the stars to rate'); return; }
    o.rated = o.rated || {};
    const q = rqGet();
    ids.forEach(id => { o.rated[id] = sel[id]; q.push({ p: id, o: oid, n: sel[id], st: 0 }); });
    rqSet(q); delete RSEL[oid]; save(); rebuildRS();
    redrawRate(oid); refreshRatings(); toast('Thank you for rating!');
    flushRatings();
  }
  /* sends ratings to Firebase step by step, so nothing is counted twice even if the network drops half way */
  let rfl = false;
  async function flushRatings() {
    if (rfl) return; rfl = true; let did = false;
    try {
      for (;;) {
        const q = rqGet(); if (!q.length) break;
        const r = q[0];
        try {
          if (r.st === 0) {
            if (await fbSend('GET', 'ratings/' + r.p + '/' + r.o)) { q.shift(); rqSet(q); did = true; continue; }
            await fbSend('PUT', 'ratings/' + r.p + '/' + r.o, r.n); r.st = 1; rqSet(q); did = true;
          }
          if (r.st === 1) { await fbSend('PUT', 'rstat/' + r.p + '/s', { '.sv': { increment: r.n } }); r.st = 2; rqSet(q); did = true; }
          if (r.st === 2) { await fbSend('PUT', 'rstat/' + r.p + '/n', { '.sv': { increment: 1 } }); q.shift(); rqSet(q); did = true; }
        } catch (e) { break; }
      }
    } finally { rfl = false; }
    if (did) { rebuildRS(); refreshRatings(); }
  }

  const HI = {
    'Free delivery on orders above ₹999': '₹999 से ऊपर के ऑर्डर पर फ्री डिलीवरी', '7-day easy returns': '7 दिन में आसान रिटर्न', '100% genuine products': '100% असली प्रोडक्ट',
    'Login': 'लॉगिन', 'Cart': 'कार्ट', 'Your cart': 'आपका कार्ट', 'Secure checkout': 'सुरक्षित चेकआउट', 'Easy returns': 'आसान रिटर्न', 'Genuine products': 'असली प्रोडक्ट',
    'Everyday things,': 'रोज़ की चीज़ें,', 'chosen with care.': 'पूरी परख के साथ चुनी हुई।',
    'Headphones, bags, lamps and more. Hand-picked, fairly priced and delivered to your door.': 'हेडफ़ोन, बैग, लैंप और बहुत कुछ। चुने हुए प्रोडक्ट, सही दाम, सीधे आपके दरवाज़े तक।',
    'Shop the collection': 'कलेक्शन देखें', 'Shop now': 'अभी खरीदें', 'In transit': 'रास्ते में', 'Delivered': 'डिलीवर हो गया', 'Cancelled': 'रद्द', 'Order Confirmed': 'ऑर्डर कन्फ़र्म', 'Shipped': 'शिप हो गया', 'Order status': 'ऑर्डर स्टेटस', 'Order details': 'ऑर्डर विवरण', 'Payment': 'पेमेंट', 'Payment method': 'पेमेंट का तरीका', 'Delivery address': 'डिलीवरी पता', 'Price details': 'कीमत विवरण', 'Cancel order': 'ऑर्डर रद्द करें', 'Cancel this order?': 'ऑर्डर रद्द करें?', 'Yes, cancel order': 'हाँ, रद्द करें', 'Keep order': 'ऑर्डर रखें', 'Cash on Delivery': 'कैश ऑन डिलीवरी', 'Online payment (Prepaid)': 'ऑनलाइन पेमेंट (प्रीपेड)', 'Prepaid': 'प्रीपेड', 'Place order': 'ऑर्डर करें', 'View order': 'ऑर्डर देखें', 'Delivery': 'डिलीवरी', 'Free': 'फ्री', 'No returns': 'रिटर्न नहीं', 'No replacement': 'रिप्लेसमेंट नहीं', 'Curated products': 'चुने हुए प्रोडक्ट', 'Average rating': 'औसत रेटिंग', '7 days': '7 दिन', 'Bestseller': 'बेस्टसेलर',
    'Free delivery': 'फ्री डिलीवरी', 'Above ₹999': '₹999 से ऊपर', '7-day returns': '7 दिन रिटर्न', 'No questions asked': 'कोई सवाल नहीं', 'Safe and private': 'सुरक्षित और प्राइवेट', 'Quality checked': 'क्वालिटी जाँची हुई',
    'All': 'सभी', 'Women': 'महिलाएँ', 'Men': 'पुरुष', 'Kids': 'बच्चे', 'All products': 'सभी प्रोडक्ट', 'Nothing matched your search': 'आपकी खोज से कुछ नहीं मिला', 'Show all products': 'सभी प्रोडक्ट दिखाएँ',
    '← Back to products': '← प्रोडक्ट पर वापस', 'Add to cart': 'कार्ट में डालें', 'You may also like': 'आपको ये भी पसंद आ सकते हैं', 'Free delivery above ₹999': '₹999 से ऊपर फ्री डिलीवरी',
    'Your cart is empty': 'आपका कार्ट खाली है', 'Add something you like and it will show up here.': 'अपनी पसंद की चीज़ जोड़ें, वो यहाँ दिखेगी।', 'Start shopping': 'खरीदारी शुरू करें', 'Subtotal': 'कुल', 'Checkout': 'चेकआउट', 'Remove': 'हटाएँ',
    'Login or sign up': 'लॉगिन या साइन अप', 'Enter your mobile number and we will send a 6-digit OTP.': 'अपना मोबाइल नंबर डालें, हम 6 अंकों का OTP भेजेंगे।', 'Mobile number': 'मोबाइल नंबर', 'Get OTP': 'OTP पाएँ', 'Cancel': 'रद्द करें',
    'Enter the OTP': 'OTP डालें', '6-digit OTP': '6 अंकों का OTP', 'Verify and login': 'जाँचें और लॉगिन करें', 'Change number': 'नंबर बदलें', 'Resend OTP': 'OTP दोबारा भेजें',
    'Order placed': 'ऑर्डर हो गया', 'Continue shopping': 'खरीदारी जारी रखें', 'Order number': 'ऑर्डर नंबर', 'Items': 'आइटम', 'Total': 'कुल योग', 'Deliver to': 'डिलीवरी पता',
    'My account': 'मेरा खाता', 'Orders': 'ऑर्डर', 'Favorites': 'पसंदीदा', 'Language': 'भाषा', 'Address': 'पता', 'Log out': 'लॉग आउट', 'Add': 'जोड़ें',
    'No orders yet': 'अभी कोई ऑर्डर नहीं', 'Your placed orders will show up here.': 'आपके ऑर्डर यहाँ दिखेंगे।', 'No favorites yet': 'अभी कोई पसंदीदा नहीं', 'Tap the heart on a product to save it here.': 'किसी प्रोडक्ट पर दिल दबाएँ, वो यहाँ सेव हो जाएगा।',
    'Choose your language': 'अपनी भाषा चुनें', 'Name': 'नाम', 'Pincode': 'पिनकोड', 'Landmark': 'लैंडमार्क', 'Landmark (optional)': 'लैंडमार्क (ज़रूरी नहीं)', 'No address added yet.': 'अभी कोई पता नहीं जोड़ा गया।',
    'Add address': 'पता जोड़ें', 'Change details': 'विवरण बदलें', 'Your delivery details': 'आपके डिलीवरी विवरण', 'We will use these to deliver your orders.': 'हम इनका उपयोग आपके ऑर्डर पहुँचाने में करेंगे।',
    'Save details': 'विवरण सेव करें', 'Fill later': 'बाद में भरें', 'Log out?': 'लॉग आउट करें?', 'You will need to login again with an OTP.': 'दोबारा OTP से लॉगिन करना होगा।', 'Yes, log out': 'हाँ, लॉग आउट करें', 'Stay logged in': 'लॉगिन रहने दें',
    'Save': 'सेव करें', 'Saved': 'सेव हो गया', 'item': 'आइटम', 'items': 'आइटम', 'Search kurti, shirts, jeans…': 'कुर्ती, शर्ट, जींस खोजें…',
    'Enter your full name.': 'अपना पूरा नाम डालें।', 'Enter a valid 10-digit mobile number.': 'सही 10 अंकों का मोबाइल नंबर डालें।', 'Enter your full address with house number, street and city.': 'मकान नंबर, गली और शहर के साथ पूरा पता डालें।', 'Enter a valid 6-digit pincode.': 'सही 6 अंकों का पिनकोड डालें।',
    'Optional. Helps the delivery person find you.': 'ज़रूरी नहीं। डिलीवरी वाले को आपको ढूँढने में मदद मिलती है।', 'Add your delivery address to place your order.': 'ऑर्डर करने के लिए अपना डिलीवरी पता जोड़ें।',
    'Currently unavailable': 'अभी उपलब्ध नहीं', 'Select address': 'पता चुनें', 'Add address': 'पता जोड़ें', 'Edit address': 'पता बदलें', 'Addresses': 'पते', 'Order summary': 'ऑर्डर समरी', 'Confirm': 'कन्फ़र्म करें', 'Confirm address': 'पता कन्फ़र्म करें', '+ Add new address': '+ नया पता जोड़ें', 'Shipping': 'शिपिंग', 'Edit': 'बदलें', 'Delete': 'हटाएँ', 'Save address': 'पता सेव करें', 'Change address': 'पता बदलें', 'Order date': 'ऑर्डर की तारीख', 'Expected delivery': 'डिलीवरी की तारीख', 'Delivery by': 'डिलीवरी तक', 'Out of stock': 'स्टॉक खत्म', 'Select size': 'साइज़ चुनें', 'Please choose a size': 'कृपया साइज़ चुनें', 'Confirmed': 'कन्फ़र्म', 'Rejected': 'अस्वीकृत', 'State': 'राज्य', 'Select state': 'राज्य चुनें', 'Select your state.': 'अपना राज्य चुनें।', 'Login successful': 'लॉगिन हो गया', 'Details saved': 'विवरण सेव हो गए', 'Saved to favorites': 'पसंदीदा में सेव किया', 'Removed from favorites': 'पसंदीदा से हटाया', 'Login to save favorites': 'पसंदीदा सेव करने के लिए लॉगिन करें', 'You have been logged out': 'आप लॉग आउट हो गए'
  };
  Object.assign(HI, { 'Rate your purchase': 'अपनी खरीदारी को रेट करें', 'Tap the stars to rate each product.': 'हर प्रोडक्ट को रेट करने के लिए स्टार दबाएँ।', 'Submit rating': 'रेटिंग सबमिट करें', 'Thank you for rating!': 'रेटिंग देने के लिए धन्यवाद!', 'Thanks for taking the time to rate. Your feedback helps us and other customers.': 'रेटिंग देने के लिए समय निकालने का शुक्रिया। आपका फीडबैक हमें और दूसरे ग्राहकों के काम आता है।', 'Very bad': 'बहुत खराब', 'Bad': 'खराब', 'Okay': 'ठीक-ठाक', 'Good': 'अच्छा', 'Excellent': 'बहुत बढ़िया', 'Please tap the stars to rate': 'रेटिंग के लिए स्टार दबाएँ' });
  Object.assign(HI, { 'Enter coupon code': 'कूपन कोड डालें', 'Apply': 'लगाएँ', 'Remove': 'हटाएँ', 'Offer applied automatically': 'ऑफ़र अपने आप लगा', 'Coupon applied': 'कूपन लग गया', 'Invalid coupon code': 'गलत कूपन कोड', 'This coupon has expired': 'यह कूपन खत्म हो चुका है', 'Coupon removed': 'कूपन हटाया' });
  Object.assign(HI, { 'Wholesale prices': 'थोक भाव', 'Made for retailers': 'दुकानदारों के लिए', 'per piece': 'प्रति पीस', 'Search products…': 'प्रोडक्ट खोजें…' });
  const ORIG = new WeakMap();
  let langObs, langPend = false;
  function applyLang() {
    if (langObs) langObs.disconnect();
    const hi = S.lang === 'hi';
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let n;
    while ((n = w.nextNode())) {
      let o = ORIG.get(n); if (o === undefined) { o = n.nodeValue; ORIG.set(n, o); }
      const k = o.trim(), nv = hi && HI[k] ? o.replace(k, HI[k]) : o;
      if (n.nodeValue !== nv) n.nodeValue = nv;
    }
    const q = $('#q'); if (!q.dataset.en) q.dataset.en = q.placeholder;
    q.placeholder = hi ? (HI[q.dataset.en] || q.dataset.en) : q.dataset.en;
    if (langObs) langObs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  langObs = new MutationObserver(() => { if (S.lang === 'hi' && !langPend) { langPend = true; requestAnimationFrame(() => { langPend = false; applyLang(); }); } });
  function setLang(l) {
    S.lang = l === 'hi' ? 'hi' : 'en'; save();
    document.documentElement.lang = S.lang;
    if (PAGES.includes(S.view)) render();
    applyLang();
  }

  const actions = {
    home: () => { showHome(true); jumpTop(); },
    'desc-more': () => { S.dx = !S.dx; renderDetail(); },
    'gal-prev': () => galGo(Math.max(0, S.gi - 1)),
    'gal-next': () => galGo(S.gi + 1),
    'gal-go': t => galGo(Number(t.dataset.i)),
    'best-go': t => best && best.go(Number(t.dataset.i)),
    'hero-go': () => { const c = document.getElementById('collection'); if (c) c.scrollIntoView(); },
    shop: () => { closeCart(); showHome(false); jumpTop(); },
    back: () => backStep(),
    pback: () => pageBack(),
    goto: t => { S.pend = null; go(t.dataset.to); },
    open: t => openProduct(t.dataset.id),
    'open-cart': t => { closeCart(); openProduct(t.dataset.id); },
    cat: t => { S.cat = t.dataset.cat; renderHome(); },
    'dq+': () => { const k = curKey(), c = k ? qtyOf(k) : 0, st = stepOf(byId(S.id)); if (c) return setQty(k, c + st); S.dq = Math.min(Math.max(1, curLim()), S.dq + st); renderDetail(); },
    'dq-': () => { const p = byId(S.id), k = curKey(), c = k ? qtyOf(k) : 0, st = stepOf(p); if (c) { const n = c - st; return setQty(k, n < minQK(k) ? 0 : n); } S.dq = Math.max(minAdd(p), S.dq - st); renderDetail(); },
    add: () => {
      const p = byId(S.id); if (hasSizes(p) && !S.sz) { S.szWarn = true; renderDetail(); toast('Please select a size'); return; } const k = curKey(), before = qtyOf(k);
      if (before) return openCart();
      const n = Math.min(curLim(), S.dq); if (n < 1) { toast('Out of stock'); return; }
      setQty(k, n);
      toast(n === S.dq ? `Added ${S.dq} × ${p.name}${S.sz ? ' (' + S.sz + ')' : ''}` : `Only ${curLim()} available`);
    },
    inc: t => setQty(t.dataset.k, qtyOf(t.dataset.k) + stepOf(byId(t.dataset.k))),
    dec: t => { const k = t.dataset.k, p = byId(k), n = qtyOf(k) - stepOf(p); if (n < minQK(k)) { setQty(k, 0); toast(`Removed ${p.name}`); } else setQty(k, n); },
    rm: t => { const p = byId(t.dataset.k); setQty(t.dataset.k, 0); toast(`Removed ${p.name}`); },
    size: t => { const pp = byId(S.id); if (pp && leftSize(pp, t.dataset.s) === 0) return; S.sz = t.dataset.s; S.szWarn = false; fitDq(); renderDetail(); },
    'cart-open': openCart,
    'cart-close': closeCart,
    checkout: () => checkout(),
    account: () => { if (!S.user) return openLogin(); go('account'); },
    lang: t => setLang(t.dataset.l),
    fav: t => toggleFav(t.dataset.id),
    logout: () => { lg = { step: 'logout' }; renderModal(); modal.hidden = false; },
    'order-open': t => { S.oid = t.dataset.id; go('order'); },
    'rate-star': t => { const o = ordOf(t.dataset.oid); if (!o || (o.rated && o.rated[t.dataset.id])) return; (RSEL[o.id] = RSEL[o.id] || {})[t.dataset.id] = Number(t.dataset.n); redrawRate(o.id); },
    'rate-submit': t => submitRate(t.dataset.oid),
    'cp-apply': t => { const b = t.closest('.cpn'), i = b && b.querySelector('input'); cpApply(i ? i.value : CPD); },
    'cp-remove': () => { CPN = ''; CPD = ''; try { localStorage.removeItem(CPK); } catch (e) {} cpnRender(); toast('Coupon removed'); },
    'order-view': t => { closeModal(); S.oid = t.dataset.id; go('order'); },
    anew: () => { S.af = { id: null }; if (S.view === 'chk' && S.ck) { S.ck.step = 'form'; render(); page.scrollTop = 0; } else go('aform'); },
    aedit: t => { S.af = { id: t.dataset.id }; if (S.view === 'chk' && S.ck) { S.ck.step = 'form'; render(); page.scrollTop = 0; } else go('aform'); },
    adel: t => {
      const u = U(), id = t.dataset.id, ad = u.addrs.find(x => x.id === id); if (!ad) return;
      const line = [ad.addr, ad.area, ad.city, ad.state].filter(Boolean).join(', ') + (ad.pin ? ' - ' + ad.pin : '');
      askConfirm({ icon: IC.trash, danger: true, title: 'Delete this address?', text: 'It will be removed from your saved addresses. This cannot be undone.',
        extra: `<div class="cfm-card"><b>${esc(ad.name || '')}</b><span>${esc(line)}</span>${ad.phone ? `<span>+91 ${esc(ad.phone)}</span>` : ''}</div>`, yes: 'Yes, delete', no: 'Keep address' }, () => {
        u.addrs = u.addrs.filter(x => x.id !== id);
        if (u.addrs.length) syncProf(); else u.profile = null; // aakhri address hatao to wapas na aaye
        if (S.ck && S.ck.sel === id) S.ck.sel = u.addrs[0] ? u.addrs[0].id : null;
        save(); renderAcct(); render(); toast('Address deleted');
      });
    },
    'ck-sel': t => { if (S.ck) { S.ck.sel = t.dataset.id; render(); } },
    'ck-confirm': () => { const ck = S.ck; if (!ck || !ckAddr()) return; ck.dAt = ck.dAt || Date.now() + rndDays() * DAY; ck.step = 'sum'; render(); page.scrollTop = 0; },
    'ck-change': () => { if (S.ck) { S.ck.step = 'addr'; render(); page.scrollTop = 0; } },
    'ck-next': () => { const ck = S.ck; if (!ck) return; ck.oid = ck.oid || genOid(); ck.step = 'pay'; ck.pay = 'cod'; render(); page.scrollTop = 0; },
    'ck-q': t => { const ck = S.ck, k = t.dataset.k, d = Number(t.dataset.d), x = lparse(k), p = byId(x.id); if (!ck || !p) return; const st = stepOf(p); if (ck.only) ck.only.qty = Math.max(Math.min(moqOf(p), Math.max(1, limOf(p, x.size))), Math.min(limOf(p, x.size), ck.only.qty + d * st)); else { const n = qtyOf(k) + d * st; if (n < minQK(k)) return; setQty(k, n); } render(); },
    'ck-rm': t => { const ck = S.ck; if (!ck || ck.only || Object.keys(S.cart).length < 2) return; setQty(t.dataset.k, 0); render(); },
    'pay-cod': () => { const ck = S.ck; if (!ck || ck.busy || FBS.cod === false) return; ck.pay = 'cod'; render(); },
    'pay-online': () => { const ck = S.ck; if (!ck || ck.busy || !prepaidOn()) return; ck.pay = 'online'; render(); },
    'pay-place': () => { const ck = S.ck; if (!ck || ck.busy || !ck.pay) return; const el = $('#utr'); placeOrder(ck.pay, ck.pay === 'online' && el ? el.value.replace(/\D/g, '') : ''); },
    'upi-copy': () => { const done = () => toast('UPI ID copied'); try { navigator.clipboard.writeText(FBS.upi).then(done, () => toast(FBS.upi)); } catch (e) { toast(FBS.upi); } },
    'cancel-ask': () => { lg = { step: 'cancel' }; renderModal(); modal.hidden = false; },
    'cancel-yes': async () => {
      const o = S.user && U().orders.find(x => x.id === S.oid);
      if (o) syncOrder(o);
      if (o && o.st === 'placed') {
        o.st = 'cancelled'; o.t.cancelled = Date.now(); save(); toast('Order cancelled');
        fbSend('PATCH', 'orders/' + o.id, { cancelReq: Date.now() }).catch(() => {});
      }
      closeModal(); if (PAGES.includes(S.view)) render();
    },
    'logout-yes': () => { S.user = null; S.sec = null; save(); renderAcct(); closeMenu(); closeModal(); showHome(true); jumpTop(); toast('You have been logged out'); },
    'modal-close': closeModal,
    'cfm-yes': () => { const fn = lg && lg.fn; closeModal(); if (fn) fn(); },
    'op-copy': t => { const id = t.dataset.id, ok = () => toast('Order number copied'); try { navigator.clipboard.writeText(id).then(ok, () => toast(id)); } catch (e) { toast(id); } },
    'change-num': () => { lg.step = 'phone'; lg.err = ''; renderModal(); },
    resend: () => { sendOtp(); toast('A new OTP has been generated'); }
  };
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-act]');
    if (t && actions[t.dataset.act]) { actions[t.dataset.act](t, e); return; }
    if (!e.target.closest('.rel')) closeMenu();
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.card')) { e.preventDefault(); openProduct(e.target.dataset.id); }
    if (e.key === 'Escape') { if (!modal.hidden) closeModal(); else if (drawer.classList.contains('open')) closeCart(); else if (!page.hidden) pageBack(); else closeMenu(); }
  });
  document.addEventListener('input', e => {
    const t = e.target;
    if (['phone', 'otp', 'pphone', 'ppin', 'utr'].includes(t.id)) t.value = t.value.replace(/\D/g, '');
    if (AV[t.id] && t.dataset.t) showFE(t.id);
    if (t.id === 'ppin') {
      if (t.value.length === 6) { if (PL.pin !== t.value) lookupPin(t.value); }
      else { plSeq++; PL = { pin: '', status: null, offices: [], district: '', state: '' }; paintPin(); }
    }
  });
  document.addEventListener('focusout', e => { const t = e.target; if (t && AV[t.id]) { t.dataset.t = '1'; showFE(t.id); } });
  document.addEventListener('submit', e => {
    e.preventDefault();
    const id = e.target.id;
    if (id === 'searchForm') { return; }
    if (id === 'fPhone') {
      const v = $('#phone').value.replace(/\D/g, '');
      lg.phone = v;
      if (!/^[6-9]\d{9}$/.test(v)) { lg.err = 'Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9.'; $('#err').textContent = lg.err; $('#phone').focus(); return; }
      sendOtp();
    }
    if (id === 'fAddr') {
      const v = k => $('#' + k).value.trim();
      let first = null;
      ['pname', 'pphone', 'paddr', 'ppin'].forEach(k => { const m = showFE(k); if (m && !first) first = k; });
      const name = v('pname'), ph = v('pphone').replace(/\D/g, ''), addr = v('paddr'), pin = v('ppin').replace(/\D/g, ''), lm = v('plm'), state = v('pstate'), err = $('#err');
      err.textContent = '';
      if (!first) {
        if (PL.pin !== pin) { lookupPin(pin); err.textContent = 'Checking pincode… please tap Save address again.'; return; }
        if (PL.status === 'wait') { err.textContent = 'Checking pincode… please wait a moment.'; return; }
        if (PL.status === 'bad') { $('#e_ppin').textContent = 'Pincode not found. Please enter a valid pincode'; $('#ppin').classList.add('bad'); first = 'ppin'; }
        else if (!state) { err.textContent = 'Select your state.'; $('#pstate').focus(); return; }
      }
      if (first) { $('#' + first).focus(); return; }
      const area = PL.status === 'ok' ? ($('#parea') ? $('#parea').value : '') : '', city = PL.status === 'ok' ? PL.district : '';
      const u = U(), eid = S.af && S.af.id;
      let a = eid ? u.addrs.find(x => x.id === eid) : null;
      if (a) Object.assign(a, { name, phone: ph, addr, pin, lm, state, area, city });
      else { a = { id: 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name, phone: ph, addr, pin, lm, state, area, city }; u.addrs.unshift(a); }
      syncProf(); save(); renderAcct(); S.af = null;
      toast('Details saved');
      if (S.view === 'chk' && S.ck) { S.ck.sel = a.id; S.ck.step = 'addr'; render(); page.scrollTop = 0; } else backStep();
    }
    if (id === 'fOtp') {
      const v = $('#otp').value;
      if (v !== lg.sent) { lg.err = 'That OTP does not match. Check the code and try again.'; $('#err').textContent = lg.err; $('#otp').focus(); return; }
      S.user = lg.phone; U(); save(); renderAcct();
      const after = lg.after, only = lg.only;
      toast('Login successful');
      closeModal();
      if (after === 'checkout') checkout(only);
    }
  });
  $('#searchForm').addEventListener('input', e => {
    if (e.target.id !== 'q') return;
    S.q = e.target.value; S.view = 'home'; renderHome();
  });


  const fbSend = (m, p, body) => FB.rest(m, p, body);
  /* IndexedDB cache: products (big) are kept here so a reload opens instantly instead of re-downloading everything */
  const idb = () => new Promise((res, rej) => { const r = indexedDB.open('wsl_store', 1); r.onupgradeneeded = () => r.result.createObjectStore('k'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const cget = async k => { try { const d = await idb(); return await new Promise(res => { const q = d.transaction('k').objectStore('k').get(k); q.onsuccess = () => res(q.result); q.onerror = () => res(null); }); } catch (e) { return null; } };
  const cset = async (k, v) => { try { const d = await idb(); d.transaction('k', 'readwrite').objectStore('k').put(v, k); } catch (e) {} };
  const CK = 'wsl.cache', OB = 'wsl.outbox';
  let cache = {}; try { cache = JSON.parse(localStorage.getItem(CK) || '{}') || {}; } catch (e) {}
  let sig = '';
  if (cache.coupons) { setCP(cache.coupons); CPSIG = JSON.stringify(cache.coupons); }
  if (cache.rstat && typeof cache.rstat === 'object') { RSRAW = cache.rstat; RSSIG = JSON.stringify(cache.rstat); rebuildRS(); }
  function maint() {
    let m = document.getElementById('maint');
    if (FBS.open !== false) { if (m) m.remove(); return; }
    if (!m) { m = document.createElement('div'); m.id = 'maint'; m.style.cssText = 'position:fixed;inset:0;z-index:500;background:#fff;display:grid;place-items:center;text-align:center;padding:2rem'; document.body.appendChild(m); }
    m.innerHTML = '<div style="max-width:22rem"><div style="font-size:3rem">🛠️</div><h2 style="font-family:var(--serif);font-size:1.9rem;margin:.6rem 0">We will be back soon</h2><p style="color:#6B7280">' + esc(FBS.maintMsg || 'The store is under maintenance right now. Please visit again in a little while.') + '</p></div>';
  }
  function applyCloud(d) {
    const s = String(d.ver || '') + JSON.stringify(d.settings || {}) + JSON.stringify(d.sold || {});
    if (s === sig) return false; sig = s;
    if (d.products && typeof d.products === 'object') {
      const arr = Object.values(d.products).filter(p => p && p.name && p.price > 0 && !p.hide)
        .map(p => Object.assign({ h: 220, ship: 0, rating: 4.5, count: 0, pts: [], desc: '' }, p, { id: Number(p.id), mrp: p.mrp || p.price }))
        .sort((a, b) => b.id - a.id);
      if (arr.length) { PRODUCTS.length = 0; PRODUCTS.push(...arr); }
    }
    if (d.settings && typeof d.settings === 'object') Object.assign(FBS, d.settings);
    { const b = d.brand && typeof d.brand === 'object' ? d.brand : {}; BRAND = b.name || B0.n; TAGLINE = b.tagline || B0.t; LOGO = b.logo || B0.l; document.title = BRAND;
      $('#brandBtn').innerHTML = `${logoHTML()}<span class="bn">${esc(BRAND)}</span>`; $('#footBrand').innerHTML = `${logoHTML()}<span class="bn">${esc(BRAND)}</span>`; $('#footTag').textContent = TAGLINE; }
    Object.keys(SOLD).forEach(k => delete SOLD[k]);
    if (d.sold && typeof d.sold === 'object') Object.keys(d.sold).forEach(k => { if (d.sold[k]) SOLD[k] = Number(d.sold[k]) || 0; });
    for (const k of Object.keys(S.cart)) { const x = lparse(k), p = byId(x.id); if (!p || (x.size ? !sizesOf(p).some(z => z.n === x.size) : hasSizes(p))) delete S.cart[k]; }
    setCats(); if (S.cat !== 'All' && !CATS.includes(S.cat)) S.cat = 'All';
    maint(); return true;
  }
  function repaint() {
    if (modal && !modal.hidden) return;
    if (S.view === 'detail') { if (byId(S.id)) renderDetail(); else showHome(false); }
    else if (S.view === 'home') renderHome();
    renderCart();
  }
  const outbox = () => { try { return JSON.parse(localStorage.getItem(OB) || '[]'); } catch (e) { return []; } };
  async function pushOrder(o) {
    if (await fbSend('GET', 'orders/' + o.id)) return;
    await fbSend('PUT', 'orders/' + o.id, o);
    for (const l of o.lines || []) { try { await fbSend('PUT', 'sold/' + (l.size ? l.id + '_' + l.size : l.id), { '.sv': { increment: l.qty | 0 } }); } catch (e) {} }
  }
  async function flush() {
    flushRatings();
    const q = outbox(); if (!q.length) return;
    const left = [];
    for (const o of q) { try { await pushOrder(o); } catch (e) { left.push(o); } }
    try { localStorage.setItem(OB, JSON.stringify(left)); } catch (e) {}
  }
  function sendOrder(o) { try { localStorage.setItem(OB, JSON.stringify([...outbox(), o])); } catch (e) {} flush(); }
  async function pullOrders() {
    let ch = false;
    const jobs = [];
    Object.values(S.users).forEach(u => (u.orders || []).forEach(o => { if (!o.synced && o.st !== 'cancelled') jobs.push(o); }));
    await Promise.all(jobs.slice(0, 20).map(async o => {
      let r = null; try { r = await fbSend('GET', 'orders/' + o.id); } catch (e) {}
      if (!r || !r.st) return;
      if (r.st !== o.st || r.reason !== o.reason || r.payStatus !== o.payStatus) { o.st = r.st; o.t = Object.assign({}, o.t, r.t || {}); o.reason = r.reason; o.payStatus = r.payStatus; ch = true; }
      if (r.st === 'delivered' || r.st === 'rejected') o.synced = true;
    }));
    if (ch) { save(); if (PAGES.includes(S.view) && S.view !== 'chk') render(); }
  }
  let pulling = false, lastOrd = 0;
  let again = false;
  async function pull() {
    if (pulling) { again = true; return; } pulling = true;   /* never run two pulls at once (old code piled up big downloads) */
    try {
      await flush();
      const [settings, soldN, ver, rstat, coupons] = await Promise.all([fbSend('GET', 'settings'), fbSend('GET', 'sold'), fbSend('GET', 'ver'), fbSend('GET', 'rstat').catch(() => null), fbSend('GET', 'coupons').catch(() => null)]);
      let products = cache.products, brand = cache.brand, pv = cache.pv;
      if (!products || ver !== pv) {
        [products, brand] = await Promise.all([fbSend('GET', 'products'), fbSend('GET', 'brand')]);
        pv = ver;
        cset('products', { products, brand, pv });
      }
      cache = { products, brand, settings, sold: soldN, ver, pv };
      try { localStorage.setItem(CK, JSON.stringify({ brand, settings, sold: soldN, ver, pv, rstat, coupons })); } catch (e) {}
      const rsg = JSON.stringify(rstat || {}), rch = rsg !== RSSIG;
      if (rch) { RSSIG = rsg; RSRAW = rstat || {}; rebuildRS(); }
      const cps = JSON.stringify(coupons || {}), cch = cps !== CPSIG;
      if (cch) { CPSIG = cps; setCP(coupons); }
      const ac = applyCloud(cache);
      if (ac || rch || cch) repaint();
      if (cch) cpnRender();
      if (Date.now() - lastOrd > 30000) { lastOrd = Date.now(); pullOrders(); }
    } catch (e) {} finally { pulling = false; if (again) { again = false; setTimeout(pull, 0); } }
  }
  const boot = async () => {
    try {
      const c = await Promise.race([cget('products'), new Promise(r => setTimeout(() => r(null), 1500))]);
      if (c && c.products) { cache.products = c.products; cache.brand = c.brand; cache.pv = c.pv; }
    } catch (e) {}
    applyCloud(cache); renderAcct(); renderCart(); renderHome(); document.documentElement.lang = S.lang; applyLang(); setTimeout(pull, 50);
  };
  setInterval(() => { if (!document.hidden) pull(); }, 15000);
  /* instant: admin changes ver/settings/sold -> store refreshes right away (polling stays as backup) */
  ['ver', 'settings', 'sold', 'rstat', 'coupons'].forEach(k => FB.listen(k, () => pull()));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) pull(); });
  boot();

})();