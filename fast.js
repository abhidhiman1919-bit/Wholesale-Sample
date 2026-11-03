/* fast.js — shared speed helpers for the Control Panel AND the store.
   Idea: product list only carries a tiny thumbnail; big photos live in /pimgs and load when needed.
   Products are cached in the browser so the next visit opens instantly. */
(function(){
const PID='wholesale-76fd2';
const cfg={apiKey:"AIzaSyBJaj2zyVpN2X6AysWiMLGWO6ah0NOg6T4",authDomain:PID+".firebaseapp.com",projectId:PID,appId:"1:1093831529804:web:490ced132e72808237abe9"};
/* Database ka link khud dhoondh leta hai (US, Singapore ya Europe) - kuch daalna nahi padta. */
const URLS=['https://'+PID+'-default-rtdb.firebaseio.com','https://'+PID+'-default-rtdb.asia-southeast1.firebasedatabase.app','https://'+PID+'-default-rtdb.europe-west1.firebasedatabase.app'];
let DB=null,ERR='';
const P=p=>String(p).split('/').filter(Boolean).join('/');
const denied=e=>/permission/i.test(String(e&&(e.code||e.message)||e));
function probe(url,i){return new Promise(res=>{
  let app,db;try{app=firebase.initializeApp(cfg,'p'+i);db=app.database(url)}catch(e){return res({url,app,err:String(e&&e.message||e)})}
  const t=setTimeout(()=>res({url,app,db,err:'timeout'}),8000);
  db.ref('ver').get().then(()=>{clearTimeout(t);res({url,app,db,ok:1})},e=>{clearTimeout(t);res({url,app,db,err:denied(e)?'denied':String(e&&e.message||e)})});
})}
const ready=(async()=>{
  if(!window.firebase){ERR='Firebase script load nahi hui (internet check karo).';return}
  let saved='';try{saved=localStorage.getItem('fb.url')||''}catch(e){}
  const pick=list=>new Promise(done=>{const all=[];let n=list.length;
    list.forEach((u,i)=>probe(u,i).then(r=>{all.push(r);if(r.ok)done(r);else if(--n===0)done(all.find(x=>x.err==='denied')||all[0])}))});
  let r=saved?await pick([saved]):null;
  if(!r||!r.ok&&r.err!=='denied'){r=await pick(URLS)}
  if(r&&r.db&&(r.ok||r.err==='denied')){DB=r.db;if(r.ok){try{localStorage.setItem('fb.url',r.url)}catch(e){}}else ERR='Permission denied: Firebase Realtime Database > Rules mein read aur write true karo.'}
  else ERR='Database nahi mila. Firebase Console > Build > Realtime Database > Create Database karo. ('+(r&&r.err||'unknown')+')';
})();
async function rest(m,p,b){
  await ready;
  if(!DB)throw new Error(ERR||'Database not set');
  const r=DB.ref(P(p));
  if(m==='GET'){const s=await r.get();return s.val()}
  if(m==='PUT'){
    if(b&&b['.sv']&&b['.sv'].increment!==undefined){await r.set(firebase.database.ServerValue.increment(b['.sv'].increment));return null}
    if(b&&b['.sv']==='timestamp'){await r.set(firebase.database.ServerValue.TIMESTAMP);return (await r.get()).val()}
    await r.set(b===undefined?null:b);return b;
  }
  if(m==='PATCH'){await r.update(b);return b}
  if(m==='DELETE'){await r.remove();return null}
  throw new Error('Bad method '+m);
}
const idb=()=>new Promise((res,rej)=>{const r=indexedDB.open('fastcache_wholesale',1);r.onupgradeneeded=()=>r.result.createObjectStore('k');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
const cget=async k=>{try{const d=await idb();return await new Promise(res=>{const q=d.transaction('k').objectStore('k').get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)})}catch(e){return null}};
const cset=async(k,v)=>{try{const d=await idb();d.transaction('k','readwrite').objectStore('k').put(v,k)}catch(e){}};
function shrink(src,max,q){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};im.onerror=()=>rej(new Error('Image failed'));im.src=src})}
const memo={};
window.FAST={
  rest,cget,cset,ready,err:()=>ERR,
  /* LIVE: calls cb the moment the value at `path` changes in the database (Firebase streaming, no polling delay). Returns a stop() function. */
  listen(path,cb){
    let stop=()=>{},dead=false;
    ready.then(()=>{if(dead||!DB)return;const r=DB.ref(P(path));let first=true;const h=()=>{if(first){first=false;return}try{cb()}catch(e){}};r.on('value',h);stop=()=>{try{r.off('value',h)}catch(e){}}});
    return()=>{dead=true;stop()};
  },
  /* Admin: call this after ANY change (product, category, price, stock, brand...) so every open store/admin refreshes instantly. */
  bump:()=>rest('PUT','ver',Date.now()),
  thumb:src=>shrink(src,320,.62),
  full:src=>shrink(src,800,.7),
  /* Opens instantly from cache (cb is called at once with cached products), then refreshes only if the admin changed something. */
  async loadProducts(cb){
    const c=await cget('products');
    if(c&&c.p&&cb)cb(c.p,true);
    let v=null;try{v=await rest('GET','ver')}catch(e){if(c&&c.p)return c.p;throw e}
    if(c&&c.p&&c.v===v)return c.p;
    const p=(await rest('GET','products'))||{};cset('products',{v,p});if(cb)cb(p,false);return p;
  },
  /* Big photos of one product (fetched only when the product is opened). */
  async fullImgs(p){
    if(p&&p.imgRef){const k=p.imgRef;if(!memo[k])memo[k]=rest('GET','pimgs/p'+k).catch(()=>null);const a=await memo[k];if(a&&(a.length||Object.keys(a).length))return Array.isArray(a)?a:Object.values(a)}
    return p&&p.imgs&&p.imgs.length?p.imgs:(p&&p.img?[p.img]:[]);
  }
};
})();
