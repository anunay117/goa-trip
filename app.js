const $=s=>document.querySelector(s);
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=n=>TRIP.currency+Math.round(n).toLocaleString('en-IN');
const parse=d=>new Date(d+'T00:00:00');
const fmt=(d,o)=>d.toLocaleDateString('en-IN',o||{weekday:'short',day:'numeric',month:'short'});
const ppl=TRIP.crew.filter(c=>!c.infant);
const PAGES=[['index.html','Home','home'],['itinerary.html','The Plan','itinerary'],['crew.html','The Squad','crew'],['stay.html','The Crib','stay'],['ride.html','The Whip','ride'],['budget.html','The Damage','budget'],['outfits.html','Fit Check','outfits'],['playlists.html','Aux Cord','playlists'],['imposter.html','Imposter','imposter'],['gallery.html','Core Memories','gallery']];
const page=document.body.dataset.page;
document.title=(page==='home'?'':PAGES.find(p=>p[2]===page)[1]+' | ')+TRIP.name;
document.body.insertAdjacentHTML('afterbegin','<nav><div class="wrap"><a class="logo" href="index.html">🌴 '+esc(TRIP.name)+'</a>'+PAGES.map(p=>'<a class="l'+(p[2]===page?' on':'')+'" href="'+p[0]+'">'+p[1]+'</a>').join('')+'<button class="mbtn" id="mbtn" aria-expanded="false" aria-controls="menu">☰ Menu</button></div></nav><div class="mq"><div>'+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+'</div></div>');
document.body.insertAdjacentHTML('beforeend','<footer>Made with ☀️ and zero sleep by the squad · '+esc(TRIP.name)+'</footer>');
const MEM={outfits:'👗',playlists:'🎧',home:'🏠',itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',imposter:'🕵️',playlists:'🎧',gallery:'📸'};
document.body.insertAdjacentHTML('beforeend','<div id="menu" class="menu" role="dialog" aria-label="Site menu"><div class="panel"><div class="mh"><b>Where to?</b><button id="mclose">✕ Close</button></div><div class="mg">'+PAGES.map(p=>'<a href="'+p[0]+'" class="'+(p[2]===page?'cur':'')+'"><span>'+(MEM[p[2]]||'•')+'</span>'+p[1]+(p[2]===page?'<small>you are here</small>':'')+'</a>').join('')+'</div></div></div>');
(function(){const m=document.getElementById('menu'),b=document.getElementById('mbtn');
  const set=o=>{m.classList.toggle('on',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
  b.onclick=()=>set(!m.classList.contains('on'));document.getElementById('mclose').onclick=()=>set(false);
  m.addEventListener('click',e=>{if(e.target===m)set(false)});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
  if(location.hash==='#menu')set(true);})();
const head=(t,s)=>'<div class="ph wrap"><h1>'+t+'</h1><p>'+s+'</p></div>';
const days=()=>{const s=parse(TRIP.start);return TRIP.itinerary.map((d,i)=>({...d,date:new Date(s.getTime()+i*864e5)}))};
const nights=Math.max(1,Math.round((parse(TRIP.end)-parse(TRIP.start))/864e5));
const flightsHtml=()=>!(TRIP.flights&&TRIP.flights.length)?'':'<div class="card" style="margin-bottom:18px"><h3>✈️ Flights (we are SO back)</h3>'+TRIP.flights.map(f=>'<div class="it" style="grid-template-columns:100px 1fr"><time>'+fmt(parse(f.date))+'</time><div><b>'+esc(f.airline)+' '+esc(f.no)+'</b> · '+esc(f.who)+'<div>'+esc(f.from)+' <b>'+esc(f.dep)+'</b> → '+esc(f.to)+' <b>'+esc(f.arr)+'</b> <span class="muted">('+esc(f.dur)+')</span></div>'+(f.note?'<div class="muted" style="font-size:.85rem">'+esc(f.note)+'</div>':'')+'</div></div>').join('')+'</div>';
const plCard=p=>'<div class="card pl"><div class="ple">'+p.emoji+'</div><h3>'+esc(p.name)+'</h3><span class="tag">'+esc(p.lang)+'</span><p class="muted" style="margin:8px 0 12px">'+esc(p.vibe)+'</p><div class="pbtns"><a class="pbtn sp" href="https://open.spotify.com/playlist/'+esc(p.sp)+'" target="_blank" rel="noopener">▶ Spotify</a><a class="pbtn ytm" href="https://music.youtube.com/playlist?list='+esc(p.yt)+'" target="_blank" rel="noopener">▶ YouTube Music</a></div><details><summary>Which playlists?</summary><p class="muted" style="font-size:.8rem;margin-top:4px">Spotify: '+esc(p.spName)+'<br>YouTube: '+esc(p.ytName)+'</p></details></div>';
const R={
home(){
  const s=parse(TRIP.start),e=parse(TRIP.end),w=TRIP.weather;
  const em={itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',outfits:'👗',playlists:'🎧',imposter:'🕵️',gallery:'📸'};
  const tiles=PAGES.slice(1).map(p=>'<a class="card tile" href="'+p[0]+'"><div class="e">'+(em[p[2]]||'•')+'</div><h3>'+p[1]+'</h3></a>').join('');
  let pk=[];try{pk=JSON.parse(localStorage.getItem('goa-pack2')||'[]')}catch(x){}
  const groups=TRIP.packing.map(g=>'<div class="card check"><h3>'+g.emoji+' '+esc(g.group)+'</h3>'+g.items.map(x=>'<label><input type="checkbox" data-n="'+esc(x)+'" '+(pk.includes(x)?'checked':'')+'> '+esc(x)+'</label>').join('')+'</div>').join('');
  $('#app').innerHTML='<header class="hero"><div class="wrap"><h1><span>out of office</span></h1><p>'+esc(TRIP.tagline)+'</p><div><span class="stk">'+fmt(s,{day:'numeric',month:'short'})+' → '+fmt(e,{day:'numeric',month:'short'})+'</span><span class="stk">'+ppl.length+' besties</span><span class="stk">'+nights+' nights</span><span class="stk">no cap</span></div><div class="cd" id="cd"></div></div></header>'+
  '<section class="wrap"><div class="grid">'+tiles+'</div></section>'+
  '<section class="wrap"><div class="card" style="background:var(--yellow);color:#111"><h2>☀️ Goa in December</h2><p style="margin-top:6px;font-weight:600">Dry, sunny and hot in the day, chill at night. Pack for beach weather, not rain.</p><div class="wx"><div><b>'+esc(w.hi)+'</b><span>Day high</span></div><div><b>'+esc(w.lo)+'</b><span>Night low</span></div><div><b>'+esc(w.sea)+'</b><span>Sea temp</span></div><div><b>'+esc(w.rain)+'</b><span>Rainy days</span></div><div><b>'+esc(w.sun)+'</b><span>Sun daily</span></div></div><p style="margin-top:12px;font-weight:600">'+esc(w.note)+'</p></div></section>'+
  '<section class="wrap"><h2 style="text-transform:uppercase;font-size:2.2rem">🎒 Packing list</h2><p class="muted" style="margin-top:6px;font-weight:600">Built for Goa weather. Ticks are saved on this device only.</p><div class="pk">'+groups+'</div><div class="skip"><b>Leave at home:</b> '+TRIP.skip.map(esc).join(' · ')+'</div></section>';
  document.querySelectorAll('.check input').forEach(c=>c.onchange=()=>{const a=[...document.querySelectorAll('.check input:checked')].map(x=>x.dataset.n);try{localStorage.setItem('goa-pack2',JSON.stringify(a))}catch(x){}});
  const tick=()=>{const now=new Date();let ms=s-now,label='until we leave';if(ms<=0){ms=e-now+864e5;label=ms>0?'left of the trip':'';}
    if(ms<=0){$('#cd').innerHTML='<div><b>🌅</b><span>What a trip!</span></div>';return}
    const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,sec=Math.floor(ms/1e3)%60;
    $('#cd').innerHTML=[[d,'days'],[h,'hours'],[m,'mins'],[sec,'secs']].map(x=>'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join('')+'<div style="background:none;border:none;box-shadow:none;color:#111;align-self:center;font-weight:800;font-size:1.1rem">'+label+'</div>'};
  tick();setInterval(tick,1000);
},
itinerary(){
  $('#app').innerHTML=head('The Plan 🗓️','Loosely a plan. Subject to vibes.')+'<section class="wrap">'+flightsHtml()+days().map((d,i)=>'<div class="card day"><h2>Day '+(i+1)+': '+esc(d.title)+'</h2><div class="dt">'+fmt(d.date)+'</div>'+d.items.map(x=>'<div class="it"><time>'+esc(x.t)+'</time><div>'+esc(x.text)+(x.note?'<div class="muted" style="font-size:.85rem">'+esc(x.note)+'</div>':'')+'</div></div>').join('')+'</div>').join('')+'</section>';
},
crew(){
  $('#app').innerHTML=head('The Squad 👯',ppl.length+' besties'+(TRIP.crew.length>ppl.length?' + a mini Gunner':'')+', one whip, one crib. No notes.')+'<section class="wrap"><div class="grid">'+TRIP.crew.map(p=>'<div class="card person"><div class="av">'+esc(p.emoji)+'</div><h3>'+esc(p.name)+'</h3>'+(p.from?'<div class="muted">'+esc(p.from)+'</div>':'')+'<span class="tag">'+esc(p.role)+'</span>'+(p.phone?'<div style="margin-top:8px"><a href="tel:'+esc(p.phone)+'">'+esc(p.phone)+'</a></div>':'')+'</div>').join('')+'</div></section>';
},
stay(){
  const s=TRIP.stay;
  $('#app').innerHTML=head('The Crib 🏡','Home base for '+nights+' nights. It\'s giving villa.')+'<section class="wrap"><div class="card"><h2>'+esc(s.name)+'</h2><p class="muted" style="margin-bottom:14px">'+esc(s.address)+'</p><dl class="kv"><dt>Check-in</dt><dd>'+esc(s.checkIn)+'</dd><dt>Check-out</dt><dd>'+esc(s.checkOut)+'</dd><dt>Rooms</dt><dd>'+s.bedrooms+' bedrooms · '+esc(s.beds)+'</dd><dt>Host</dt><dd>'+esc(s.host)+(s.hostPhone?' · <a href="tel:'+esc(s.hostPhone)+'">'+esc(s.hostPhone)+'</a>':'')+'</dd><dt>Wi-Fi</dt><dd>'+esc(s.wifi)+'</dd><dt>Cost</dt><dd>'+money(s.totalCost)+' for '+s.nights+' nights · <b>'+money(s.totalCost/ppl.length)+' each</b></dd></dl><div class="pbtns" style="margin-top:14px"><a class="pbtn" style="background:var(--lime);color:#111" href="'+esc(s.mapLink)+'" target="_blank" rel="noopener">📍 Open villa in Google Maps</a><a class="pbtn" style="background:var(--yellow);color:#111" href="'+esc(s.link)+'" target="_blank" rel="noopener">View listing</a></div></div>'+
  '<div class="grid" style="margin-top:14px"><div class="card"><h3>✨ Perks</h3><ul style="margin-left:18px">'+s.perks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="card"><h3>📜 House rules</h3><ul style="margin-left:18px">'+s.rules.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div></section>';
},
ride(){
  const r=TRIP.ride,tot=r.rentalTotal+r.fuelEstimate;
  $('#app').innerHTML=head('The Whip 🚙','Main character transport.')+'<section class="wrap"><div class="card"><h2>🚙 '+esc(r.car)+'</h2><p class="muted" style="margin-bottom:14px">'+esc(r.company)+(r.phone?' · <a href="tel:'+esc(r.phone)+'">'+esc(r.phone)+'</a>':'')+'</p><dl class="kv"><dt>Pick-up</dt><dd>'+esc(r.pickup)+'</dd><dt>Drop-off</dt><dd>'+esc(r.dropoff)+'</dd><dt>Drivers</dt><dd>'+r.drivers.map(esc).join(', ')+'</dd><dt>Seats</dt><dd>'+r.seats+'</dd><dt>Rental</dt><dd>'+money(r.rentalTotal)+'</dd><dt>Fuel (est.)</dt><dd>'+money(r.fuelEstimate)+'</dd><dt>Deposit</dt><dd>'+money(r.deposit)+' (refundable)</dd><dt>Per person</dt><dd><b>'+money(tot/ppl.length)+'</b> for rental + fuel</dd></dl>'+'</div>'+
  '<div class="grid" style="margin-top:14px"><div class="card"><h3>📄 Documents</h3><ul style="margin-left:18px">'+r.docs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="card"><h3>🛣️ Road rules</h3><ul style="margin-left:18px">'+r.tips.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div></section>';
},
budget(){
  const CATS=[['Food','🍽️'],['Drinks','🍹'],['Travel','🚗'],['Stay','🏡'],['Activity','🏄'],['Shopping','🛍️'],['Other','✨']];
  const catEmoji=Object.fromEntries(CATS);
  const names=ppl.map(p=>p.name),pre=TRIP.budget||[];
  const lg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},ls=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
  const local=location.protocol==='file:'||['localhost','127.0.0.1'].includes(location.hostname);
  const API=((local&&new URLSearchParams(location.search).get('api'))||(TRIP.expenseApi||'')).replace(/\/$/,'');
  const hm=location.hash.match(/k=([\w-]{6,64})/);if(hm){ls('goa-code',hm[1]);history.replaceState(null,'',location.pathname+location.search)}
  let code=lg('goa-code')||'',entries=[],queue=[],err='',lastOk=0,me=lg('goa-me')||'',busy=false,modal=false;
  try{entries=JSON.parse(lg('goa-entries')||'[]')}catch(e){}
  try{queue=JSON.parse(lg('goa-queue')||'[]')}catch(e){}
  const saveQ=()=>ls('goa-queue',JSON.stringify(queue));
  const day=t=>new Date(t).toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata',weekday:'short',day:'numeric',month:'short'});
  const tm=t=>new Date(t).toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit'});
  const all=()=>{const ids=new Set(entries.map(e=>e.id));return [...queue.filter(q=>!ids.has(q.id)).map(q=>({...q,pending:true})),...entries].sort((a,b)=>b.ts-a.ts)};
  const calc=list=>{const net=Object.fromEntries(names.map(n=>[n,0])),paid={...net},share={...net};
    list.forEach(e=>{const w=(e.split||[]).filter(n=>n in net);if(!w.length||!(e.paid_by in net))return;paid[e.paid_by]+=e.amount;w.forEach(n=>share[n]+=e.amount/w.length)});
    names.forEach(n=>net[n]=paid[n]-share[n]);return {net,paid,share}};
  const settle=net=>{const d=names.filter(n=>net[n]<-.5).map(n=>({n,a:-net[n]})).sort((a,b)=>b.a-a.a),c=names.filter(n=>net[n]>.5).map(n=>({n,a:net[n]})).sort((a,b)=>b.a-a.a),out=[];
    for(let i=0,j=0;i<d.length&&j<c.length;){const m=Math.min(d[i].a,c[j].a);out.push([d[i].n,c[j].n,m]);d[i].a-=m;c[j].a-=m;if(d[i].a<.5)i++;if(c[j].a<.5)j++}return out};
  const hdr={'Content-Type':'application/json'};
  const api=(path,opt={})=>fetch(API+path,{...opt,headers:{...hdr,'X-Trip-Code':code,...(opt.headers||{})},cache:'no-store'});
  const refresh=async()=>{if(!API||!code||busy)return;busy=true;
    try{
      for(const q of queue.slice()){const r=await api('/expenses',{method:'POST',body:JSON.stringify(q)});if(r.ok||r.status===400){queue=queue.filter(x=>x.id!==q.id);saveQ()}else if(r.status===401)throw new Error('401')}
      const r=await api('/expenses');if(r.status===401){code='';ls('goa-code','');err='That trip code was not accepted. Ask Anunay for the right one.';busy=false;return draw()}
      if(!r.ok)throw new Error(r.status);const d=await r.json();entries=d.entries;ls('goa-entries',JSON.stringify(entries));lastOk=Date.now();err='';
    }catch(e){err=navigator.onLine===false||/Failed|fetch|Network/i.test(String(e))?'Offline or weak signal. Showing the last saved list; new entries will sync later.':'Could not reach the server, retrying.'}
    busy=false;if(!modal)draw()};
  const csv=()=>{const rows=[['Date','Time','Paid by','Amount','Category','What for','Split between']].concat(all().map(e=>[day(e.ts),tm(e.ts),e.paid_by,e.amount,e.category,e.note,(e.split||[]).join(' + ')]));
    const t=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(t);a.download='goa-trip-expenses.csv';a.click()};
  const sheet=()=>{const sel=new Set(names);let cat='Food',who=names.includes(me)?me:'';
    return '<div class="sheetbg" id="sbg"><div class="sheet" role="dialog" aria-label="Add expense"><div class="mh"><b>＋ Add expense</b><button data-a="close">✕</button></div>'+
    '<p class="lab">Who paid?</p><div id="f-who">'+names.map(n=>'<button class="chip'+(n===who?' on':'')+'" data-a="who" data-v="'+esc(n)+'">'+esc(n)+'</button>').join('')+'</div>'+
    '<p class="lab">Amount (₹)</p><input id="f-amt" type="number" inputmode="decimal" min="1" step="any" placeholder="e.g. 850" autocomplete="off">'+
    '<p class="lab">Category</p><div id="f-cat">'+CATS.map(([c,e])=>'<button class="chip'+(c===cat?' on':'')+'" data-a="cat" data-v="'+c+'">'+e+' '+c+'</button>').join('')+'</div>'+
    '<p class="lab">What for? (optional)</p><input id="f-note" type="text" maxlength="80" placeholder="Dinner at the shack" autocomplete="off">'+
    '<p class="lab">Split between <span class="muted" style="font-weight:600">(everyone by default)</span></p><div id="f-split">'+names.map(n=>'<button class="chip on" data-a="sp" data-v="'+esc(n)+'">'+esc(n)+'</button>').join('')+'</div>'+
    '<div style="margin:6px 0 12px"><button class="chip" data-a="spall">Everyone</button><button class="chip" data-a="spme">Just the payer</button></div>'+
    '<p id="f-err" class="ferr"></p><button class="btn2" id="f-save" data-a="save">Save expense</button></div></div>'};
  const draw=()=>{
    if(!API){$('#app').innerHTML=head('The Damage 💸','Live expense tracker')+'<section class="wrap"><div class="card"><h3>📲 Live expense logging is coming</h3><p class="muted">Soon everyone will log spends here from their phone and the totals will update for all of us. For now, here is the plan.</p></div>'+preHtml()+'</section>';return}
    if(!code){$('#app').innerHTML=head('The Damage 💸','Everyone logs spends here. Totals update live.')+'<section class="wrap"><div class="card"><h3>🔐 Enter the trip code</h3><p class="muted" style="margin-bottom:10px">Ask Anunay for the code, or open the special link they shared and it will fill in automatically.</p>'+(err?'<p class="ferr">'+esc(err)+'</p>':'')+'<input id="codein" type="password" placeholder="Trip code" autocomplete="off"><button class="btn2" data-a="code">Unlock</button></div>'+preHtml()+'</section>';return}
    const list=all(),{net,paid,share}=calc(list),total=list.reduce((a,e)=>a+e.amount,0);
    const today=day(Date.now()),todayTotal=list.filter(e=>day(e.ts)===today).reduce((a,e)=>a+e.amount,0);
    const cats={};list.forEach(e=>cats[e.category]=(cats[e.category]||0)+e.amount);const mx=Math.max(...Object.values(cats),1);
    const groups={};list.forEach(e=>{(groups[day(e.ts)]=groups[day(e.ts)]||[]).push(e)});
    const st=settle(net),sc=err?'⚠️ '+esc(err):'<span class="dot"></span> Live · updated '+(lastOk?tm(lastOk):'now');
    $('#app').innerHTML=head('The Damage 💸','Log every spend. Totals and balances update for everyone.')+'<section class="wrap">'+
    '<div class="livebar">'+sc+'<button class="chip" data-a="refresh">↻ Refresh</button></div>'+
    '<div class="grid"><div class="card"><div class="muted">Spent on the trip</div><div class="big">'+money(total)+'</div><div class="muted" style="font-size:.85rem">'+list.length+' expense'+(list.length===1?'':'s')+' logged</div></div>'+
    '<div class="card"><div class="muted">Today</div><div class="big">'+money(todayTotal)+'</div><div class="muted" style="font-size:.85rem">'+esc(today)+'</div></div></div>'+
    '<div class="card" style="margin-top:16px"><h3>👥 Everyone\'s balance</h3><p class="muted" style="font-size:.82rem;margin-bottom:6px">Share = what each person owes of the logged spends. Net = paid minus share.</p>'+
    names.map(n=>{const v=Math.round(net[n]);return '<div class="bal"><b>'+esc(n)+'</b><span class="muted">paid '+money(paid[n])+' · share '+money(share[n])+'</span><b class="'+(v>0?'pos':v<0?'neg':'')+'">'+(v>0?'gets back '+money(v):v<0?'owes '+money(-v):'all square')+'</b></div>'}).join('')+
    (st.length?'<details style="margin-top:10px"><summary>💸 Who pays whom (fewest transfers)</summary><ul style="margin:8px 0 0 18px">'+st.map(s=>'<li><b>'+esc(s[0])+'</b> pays <b>'+esc(s[1])+'</b> '+money(s[2])+'</li>').join('')+'</ul></details>':'')+'</div>'+
    (Object.keys(cats).length?'<div class="card" style="margin-top:16px"><h3>By category</h3>'+Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><span>'+(catEmoji[k]||'')+' '+esc(k)+'</span><b>'+money(v)+'</b></div><div class="bar"><i style="width:'+v/mx*100+'%"></i></div></div>').join('')+'</div>':'')+
    '<div class="card" style="margin-top:16px"><h3>🧾 Expenses</h3>'+(list.length?Object.entries(groups).map(([d,es])=>'<div class="dayh">'+esc(d)+' · '+money(es.reduce((a,e)=>a+e.amount,0))+'</div>'+es.map(e=>'<div class="exp"><div class="ex1"><b>'+(catEmoji[e.category]||'✨')+' '+esc(e.note||e.category)+'</b>'+(e.pending?' <span class="tag">⏳ syncing</span>':'')+'<div class="muted" style="font-size:.8rem">'+esc(e.paid_by)+' paid · '+tm(e.ts)+' · split '+((e.split||[]).length===names.length?'everyone':(e.split||[]).map(esc).join(', '))+'</div></div><div class="ex2"><b>'+money(e.amount)+'</b>'+(e.pending?'':'<button class="x" data-a="del" data-id="'+esc(e.id)+'" aria-label="Delete">✕</button>')+'</div></div>').join('')).join(''):'<p class="muted">Nothing logged yet. Tap <b>＋ Add expense</b> after the first spend.</p>')+'</div>'+
    preHtml(list)+
    '<p style="margin-top:14px"><button class="chip" data-a="csv">⬇️ Download CSV</button> <button class="chip" data-a="lock">🔒 Forget code on this phone</button></p></section>'+
    '<button class="fab" data-a="open">＋ Add expense</button>'};
  const preHtml=(list)=>{list=list||[];const U=TRIP.upcoming||[],G=TRIP.groupCats||{};if(!pre.length&&!U.length)return '';
    const O=TRIP.otherCosts||[],sum=(xs,f)=>xs.reduce((a,x)=>a+f(x),0),preT=sum(pre,b=>b.amount),upT=sum(U,b=>b.amount),grand=preT+upT;
    const each=Object.fromEntries(names.map(n=>[n,0]));
    [...pre,...U].forEach(b=>{const who=names.filter(n=>b.only?b.only.includes(n):!(b.exclude||[]).includes(n));who.forEach(n=>each[n]+=b.amount/who.length)});
    const note=b=>b.only?'<div class="muted" style="font-size:.78rem">charged to '+esc(b.only.join(', '))+' only</div>':(b.exclude&&b.exclude.length?'<div class="muted" style="font-size:.78rem">split '+(names.length-b.exclude.length)+' ways, not '+esc(b.exclude.join(', '))+'</div>':'');
    const groups=[...new Set(U.map(u=>u.group))];
    const rows=groups.map(g=>{const items=U.filter(u=>u.group===g),pl=sum(items,x=>x.amount),sp=sum(list.filter(e=>(G[g]||[]).includes(e.category)),e=>e.amount),pct=pl?Math.min(100,sp/pl*100):0,over=sp>pl;
      return '<div style="margin:12px 0"><div style="display:flex;justify-content:space-between;gap:8px"><b>'+esc(g)+'</b><b>'+money(pl)+(items.some(i=>i.est)?' <span class="muted" style="font-weight:600">'+(items.every(i=>i.est)?'est.':'incl. est.')+'</span>':'')+'</b></div><div class="muted" style="font-size:.8rem">'+items.map(i=>esc(i.label)+' '+money(i.amount)).join(' · ')+'</div>'+
      (list.length||API?'<div class="bar" style="margin-top:6px"><i style="width:'+pct+'%'+(over?';background:#d12b2b':'')+'"></i></div><div class="muted" style="font-size:.8rem">'+money(sp)+' spent so far'+(over?' <b style="color:#d12b2b">· over by '+money(sp-pl)+'</b>':' · '+money(pl-sp)+' left')+'</div>':'')+'</div>'}).join('');
    return '<div class="card" style="margin-top:16px"><h3>📊 Budget estimate</h3><div class="big">'+money(grand)+'</div><div class="muted" style="font-size:.85rem">estimated for the whole trip ('+money(preT)+' already paid + '+money(upT)+' still to spend)</div><div class="note" style="margin:10px 0">These are estimates. What we actually spend is logged live and will be different.</div>'+
      '<h4 style="margin:12px 0 4px">🧳 Already paid</h4><div class="tw"><table><tr><th>What</th><th class="r">Amount</th></tr>'+pre.map(b=>'<tr><td>'+esc(b.label)+note(b)+'</td><td class="r">'+money(b.amount)+'</td></tr>').join('')+O.map(o=>'<tr><td>'+esc(o.label)+'<div class="muted" style="font-size:.78rem">'+esc(o.note)+' 😎</div></td><td class="r muted">not in plan</td></tr>').join('')+'<tr><td><b>Paid so far</b></td><td class="r"><b>'+money(preT)+'</b></td></tr></table></div>'+
      '<h4 style="margin:16px 0 0">🛒 Still to spend <span class="muted" style="font-weight:600;font-size:.8rem">(estimates)</span></h4>'+rows+
      '<h4 style="margin:16px 0 4px">👥 Expected cost per person</h4><p class="muted" style="font-size:.8rem;margin-bottom:6px">If every estimate above comes true.</p>'+names.map(n=>'<div class="bal" style="grid-template-columns:1fr auto"><span><b>'+esc(n)+'</b>'+O.filter(o=>o.who===n).map(o=>'<span class="muted" style="font-size:.78rem"> + own flight: '+esc(o.note)+'</span>').join('')+'</span><b>'+money(each[n])+'</b></div>').join('')+'</div>'};  const open=()=>{modal=true;document.body.insertAdjacentHTML('beforeend',sheet());document.body.style.overflow='hidden';const a=document.getElementById('f-amt');a&&a.focus()};
  const close=()=>{modal=false;const s=document.getElementById('sbg');s&&s.remove();document.body.style.overflow='';draw()};
  const uid=()=>(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(16).slice(2));
  document.addEventListener('click',async e=>{
    const b=e.target.closest('[data-a]');const bg=e.target.id==='sbg';if(bg){close();return}if(!b)return;const a=b.dataset.a;
    if(a==='open')open();else if(a==='close')close();
    else if(a==='who'){document.querySelectorAll('#f-who .chip').forEach(c=>c.classList.toggle('on',c===b))}
    else if(a==='cat'){document.querySelectorAll('#f-cat .chip').forEach(c=>c.classList.toggle('on',c===b))}
    else if(a==='sp'){b.classList.toggle('on')}
    else if(a==='spall'){document.querySelectorAll('#f-split .chip').forEach(c=>c.classList.add('on'))}
    else if(a==='spme'){const w=document.querySelector('#f-who .chip.on');document.querySelectorAll('#f-split .chip').forEach(c=>c.classList.toggle('on',!!w&&c.dataset.v===w.dataset.v))}
    else if(a==='save'){
      const who=(document.querySelector('#f-who .chip.on')||{dataset:{}}).dataset.v,amt=parseFloat(document.getElementById('f-amt').value),cat=(document.querySelector('#f-cat .chip.on')||{dataset:{}}).dataset.v||'Other',note=document.getElementById('f-note').value.trim(),sp=[...document.querySelectorAll('#f-split .chip.on')].map(c=>c.dataset.v),er=document.getElementById('f-err');
      if(!who){er.textContent='Pick who paid.';return}if(!(amt>0)){er.textContent='Enter an amount.';return}if(!sp.length){er.textContent='Pick at least one person to split with.';return}
      me=who;ls('goa-me',me);queue.push({id:uid(),ts:Date.now(),paid_by:who,amount:Math.round(amt*100)/100,category:cat,note,split:sp,added_by:who});saveQ();close();refresh()}
    else if(a==='del'){if(confirm('Delete this expense for everyone?')){entries=entries.filter(x=>x.id!==b.dataset.id);draw();try{await api('/expenses/'+encodeURIComponent(b.dataset.id),{method:'DELETE'})}catch(x){}refresh()}}
    else if(a==='code'){const v=document.getElementById('codein').value.trim();if(v){code=v;ls('goa-code',v);err='';draw();refresh()}}
    else if(a==='lock'){if(confirm('Forget the trip code on this phone?')){code='';ls('goa-code','');entries=[];ls('goa-entries','[]');draw()}}
    else if(a==='refresh')refresh();else if(a==='csv')csv()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal)close()});
  window.addEventListener('hashchange',()=>{const m=location.hash.match(/k=([\w-]{6,64})/);if(m){code=m[1];ls('goa-code',code);err='';history.replaceState(null,'',location.pathname+location.search);draw();refresh()}});
  draw();
  if(API&&code){refresh();setInterval(()=>{if(!document.hidden&&!modal)refresh()},8000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});window.addEventListener('online',refresh)}
},
outfits(){
  const O=TRIP.outfits,ph=id=>'https://images.pexels.com/photos/'+id+'/pexels-photo-'+id+'.jpeg?auto=compress&cs=tinysrgb&w=700';
  const girls=ppl.filter(p=>['Shruti','Akriti','Sarvpriya'].includes(p.name)).map(p=>p.name);
  $('#app').innerHTML=head('Fit Check 👗','What to wear in Goa: easy, covered-up and Instagram-ready.')+'<section class="wrap">'+
  '<div class="card" style="background:var(--yellow);color:#111"><h3>☀️ The vibe</h3><p>'+esc(O.intro)+'</p>'+(girls.length?'<p style="margin-top:8px"><b>For the girls:</b> '+esc(girls.join(', '))+'. Beachy, party and sightseeing looks, so pick whatever you love.</p>':'')+'</div>'+
  '<h2 style="margin:26px 0 4px">🗓️ Day-by-day</h2><div class="card">'+O.plan.map(p=>'<div class="it" style="grid-template-columns:130px 1fr"><time style="font-size:.85rem">'+esc(p.day)+'</time><div>'+esc(p.looks)+'</div></div>').join('')+'<p class="muted" style="font-size:.8rem;margin-top:8px">Matches the sample itinerary, so tweak it if your plans change.</p></div>'+
  '<h2 style="margin:26px 0 4px">👗 Outfit ideas</h2><div class="fitgrid">'+O.ideas.map(i=>'<div class="card fit"><a class="fph" href="https://www.pexels.com/photo/'+i.photo+'/" target="_blank" rel="noopener"><img loading="lazy" src="'+ph(i.photo)+'" alt="'+esc(i.title)+'" onerror="this.parentNode.style.display=\'none\'"></a><div class="fb"><span class="tag">'+esc(i.when)+'</span><h3>'+i.emoji+' '+esc(i.title)+'</h3><p>'+esc(i.why)+'</p><p class="muted" style="margin-top:6px"><b>Tip:</b> '+esc(i.tips)+'</p><div class="pbtns" style="margin-top:10px">'+i.shop.map(l=>'<a class="pbtn shop" href="'+esc(l.url)+'" target="_blank" rel="noopener">🛍️ '+esc(l.label)+'</a>').join('')+'</div></div></div>').join('')+'</div>'+
  '<div class="card" style="margin-top:22px"><h3>🧳 Quick rules</h3><ul style="margin-left:18px">'+O.tips.map(t=>'<li style="margin:4px 0">'+esc(t)+'</li>').join('')+'</ul></div>'+
  '<div class="card" style="margin-top:18px"><h3>📌 More inspo</h3><p class="muted" style="margin-bottom:8px">Search pages on Pinterest and Instagram. They may ask you to sign in.</p><div class="pbtns">'+O.inspo.map(l=>'<a class="pbtn" style="background:var(--lime);color:#111" href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+'</a>').join('')+'</div></div>'+
  '<div class="card" style="margin-top:18px;background:#111;color:#fff"><h3 style="color:var(--lime)">👨 And the boys?</h3><p style="font-size:1.15rem;font-weight:700">'+esc(O.boys)+'</p></div>'+
  '<p class="muted" style="font-size:.8rem;margin-top:16px">Photos: free stock images from <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a> (tap a photo for its page). Shop buttons open Myntra and Amazon categories, not specific products, so prices and availability are whatever the shops show.</p></section>';
},
playlists(){
  $('#app').innerHTML=head('Aux Cord 🎧','Whoever drives controls the vibe. Pick one.')+'<section class="wrap"><div class="plgrid">'+TRIP.playlists.map(plCard).join('')+'</div><p class="muted" style="font-size:.85rem;margin-top:18px">These are public playlists made by other people on Spotify and YouTube, so their songs can change over time. You may need to sign in to play full tracks. YouTube Music plays the playlist\'s music videos.</p></section>';
},
imposter(){
  const names=ppl.map(p=>p.name),CATS=[...new Set(WORDS.map(w=>w.c))];
  let S;try{S=JSON.parse(localStorage.getItem('goa-imposter'))}catch(e){}
  S=S&&S.pts&&S.hist?S:{pts:{},hist:[],impWins:0,inWins:0};
  names.forEach(n=>{if(!(n in S.pts))S.pts[n]=0});
  const save=()=>{try{localStorage.setItem('goa-imposter',JSON.stringify(S))}catch(e){}};
  const cfg={play:new Set(names),cats:new Set(CATS),clue:true};
  let R=null,deck=[],last={imp:null,word:null},tmin=3,left=180,tid=null;
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=crypto.getRandomValues(new Uint32Array(1))[0]%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const mm=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  const pickWord=()=>{const ok=w=>cfg.cats.has(w.c);deck=deck.filter(ok);if(!deck.length)deck=shuffle(WORDS.filter(ok));
    let w=deck.pop();if(w.w===last.word&&deck.length)w=deck.pop();return w};
  const start=()=>{const pl=names.filter(n=>cfg.play.has(n));
    const pool=pl.length>2?pl.filter(n=>n!==last.imp):pl,imp=pool[crypto.getRandomValues(new Uint32Array(1))[0]%pool.length];
    const word=pickWord();last={imp,word:word.w};clearInterval(tid);tid=null;left=tmin*60;
    R={word,imp,order:shuffle(pl),idx:0,shown:false,phase:'pass',res:null}};
  const record=win=>{const inn=R.order.filter(n=>n!==R.imp);
    if(win==='imp'){S.pts[R.imp]=(S.pts[R.imp]||0)+2;S.impWins++}else{inn.forEach(n=>S.pts[n]=(S.pts[n]||0)+1);S.inWins++}
    S.hist.push({n:S.hist.length+1,imp:R.imp,word:R.word.w,win});save();R.res=win;R.phase='done'};
  const draw=()=>{
    const np=cfg.play.size;let top='';
    if(!R){
      top='<div class="card"><h3>⚙️ Set up</h3><p class="muted" style="margin-bottom:6px">Who is playing?</p>'+names.map(n=>'<button class="chip'+(cfg.play.has(n)?' on':'')+'" data-act="pl" data-n="'+esc(n)+'">'+esc(n)+'</button>').join('')+
      '<p class="muted" style="margin:12px 0 6px">Word categories</p>'+CATS.map(c=>'<button class="chip'+(cfg.cats.has(c)?' on':'')+'" data-act="cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('')+
      '<label class="chk" style="margin-top:12px"><input type="checkbox" data-act="clue" '+(cfg.clue?'checked':'')+'> Imposter gets a subtle hint (off = no hint, hard mode)</label>'+
      '<button class="btn2" data-act="start"'+(np<3||!cfg.cats.size?' disabled':'')+'>🎲 Start round</button>'+(np<3?'<span class="muted"> Need at least 3 players.</span>':'')+'</div>';
    }else if(R.phase==='pass'){
      const n=R.order[R.idx],isImp=n===R.imp;
      top='<div class="card"><h3>Round '+(S.hist.length+1)+': pass the phone</h3>'+(R.shown?
        '<div class="rolecard">'+(isImp?'<div class="re">🕵️</div><h3>You are the imposter</h3>'+(cfg.clue?'<p style="margin-top:8px">Your hint:</p><h3 style="font-size:2.2rem">'+esc(R.word.h)+'</h3>':'<p style="margin-top:8px">No hint this time. Good luck!</p>')+'<p style="margin-top:10px;color:var(--lime)">Blend in. Do not get caught.</p>':'<div class="re">🔤</div><p>The word is</p><h3 style="font-size:2.4rem;margin-top:6px">'+esc(R.word.w)+'</h3><p style="margin-top:10px;color:var(--lime)">Do not say it out loud.</p>')+'</div><p class="muted" style="margin:10px 0">Memorise it, then hide it before passing.</p><button class="btn2" data-act="hide">Got it, hide &amp; pass</button>'
        :'<p style="font-size:1.25rem">Pass the phone to <b>'+esc(n)+'</b></p><p class="muted" style="margin:6px 0 12px">('+(R.idx+1)+' of '+R.order.length+') Make sure nobody else is looking.</p><button class="btn2" data-act="show">👀 I am '+esc(n)+', show it</button>')+'</div>';
    }else if(R.phase==='debate'){
      top='<div class="card"><h3>🗣️ Debate time</h3><p>Everyone has seen their card. Take turns describing the word <b>without saying it</b>, then vote for who you think the imposter is.</p><div class="big" id="tm" style="margin-top:10px">'+mm(left)+'</div><div style="margin:8px 0">'+[1,2,3,5].map(m=>'<button class="chip'+(m===tmin?' on':'')+'" data-act="tmin" data-m="'+m+'">'+m+' min</button>').join('')+'</div><button class="btn2" data-act="tstart">'+(tid?'Pause':'Start timer')+'</button> <button class="btn2 alt" data-act="treset">Reset</button><hr style="border:0;border-top:2px dashed var(--bd);margin:14px 0"><p class="muted" style="margin-bottom:8px">Voted? Reveal the truth.</p><button class="btn2" data-act="reveal">🎭 Reveal imposter &amp; word</button></div>';
    }else if(R.phase==='reveal'){
      top='<div class="card"><h3>🎭 The reveal</h3><p style="font-size:1.2rem">The imposter was <b>'+esc(R.imp)+'</b>.</p><p style="font-size:1.2rem;margin-top:4px">The word was <b>'+esc(R.word.w)+'</b> <span class="muted">('+esc(R.word.c)+')</span>.</p><p style="margin:14px 0 8px;font-weight:800">Who won this round?</p><button class="btn2" data-act="win" data-w="inn">🧑‍🤝‍🧑 Innocents won</button> <button class="btn2 alt" data-act="win" data-w="imp">🕵️ Imposter won</button></div>';
    }else{
      top='<div class="card"><h3>'+(R.res==='imp'?'🕵️ Imposter wins!':'🧑‍🤝‍🧑 Innocents win!')+'</h3><p>'+(R.res==='imp'?esc(R.imp)+' fooled everyone (+2 points).':'They caught '+esc(R.imp)+' (+1 point each).')+'</p><p class="muted" style="margin:6px 0 12px">The word was '+esc(R.word.w)+'.</p><button class="btn2" data-act="start">▶️ Next round (new word)</button> <button class="btn2 alt" data-act="setup">Change players / categories</button></div>';
    }
    const rows=names.slice().sort((a,b)=>(S.pts[b]||0)-(S.pts[a]||0));
    const board='<div class="card" style="margin-top:18px"><h3>🏆 Scoreboard</h3><div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px"><div style="border:3px solid var(--bd);border-radius:12px;padding:8px;text-align:center;background:var(--cyan);color:#111"><div class="big">'+S.inWins+'</div>Innocent wins</div><div style="border:3px solid var(--bd);border-radius:12px;padding:8px;text-align:center;background:var(--yellow);color:#111"><div class="big">'+S.impWins+'</div>Imposter wins</div></div>'+
      rows.map(n=>'<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:2px dashed var(--bd)"><b>'+esc(n)+'</b><b>'+(S.pts[n]||0)+' pts</b></div>').join('')+
      '<p class="muted" style="font-size:.8rem;margin-top:8px">Innocents who catch the imposter get 1 point each. An imposter who wins gets 2. Scores are saved on this device.</p>'+
      (S.hist.length?'<h3 style="margin-top:14px;font-size:1.1rem">Round history</h3>'+S.hist.slice().reverse().slice(0,12).map(h=>'<div style="padding:4px 0">Round '+h.n+': <b>'+esc(h.imp)+'</b> was the imposter ('+esc(h.word)+') &rarr; <b>'+(h.win==='imp'?'Imposter won':'Innocents won')+'</b></div>').join(''):'')+
      '<button class="btn2 alt" data-act="resetscores" style="margin-top:12px">Reset scores</button></div>';
    $('#app').innerHTML=head('Imposter 🕵️','Same word for everyone. Except one.')+'<section class="wrap">'+top+board+'</section>';
  };
  $('#app').addEventListener('click',e=>{
    const b=e.target.closest('[data-act]');if(!b||b.type==='checkbox')return;const a=b.dataset.act;
    if(a==='pl'){const n=b.dataset.n;cfg.play.has(n)?cfg.play.delete(n):cfg.play.add(n)}
    else if(a==='cat'){const c=b.dataset.c;cfg.cats.has(c)?cfg.cats.delete(c):cfg.cats.add(c)}
    else if(a==='start'){if(b.disabled)return;start()}
    else if(a==='setup'){R=null}
    else if(a==='show')R.shown=true;
    else if(a==='hide'){R.shown=false;R.idx++;if(R.idx>=R.order.length)R.phase='debate'}
    else if(a==='reveal'){clearInterval(tid);tid=null;R.phase='reveal'}
    else if(a==='win')record(b.dataset.w)
    else if(a==='resetscores'){if(confirm('Reset all scores and history?')){S={pts:Object.fromEntries(names.map(n=>[n,0])),hist:[],impWins:0,inWins:0};save()}}
    else if(a==='tmin'){tmin=+b.dataset.m;left=tmin*60;clearInterval(tid);tid=null}
    else if(a==='treset'){left=tmin*60;clearInterval(tid);tid=null}
    else if(a==='tstart'){if(tid){clearInterval(tid);tid=null}else{if(left<=0)left=tmin*60;tid=setInterval(()=>{left--;const t=document.getElementById('tm');if(t)t.textContent=mm(Math.max(left,0));if(left<=0){clearInterval(tid);tid=null;try{navigator.vibrate&&navigator.vibrate([300,150,300])}catch(x){}draw()}},1000)}}
    draw();
  });
  $('#app').addEventListener('change',e=>{if(e.target.dataset.act==='clue'){cfg.clue=e.target.checked;draw()}});
  draw();
},

gallery(){
  const P=TRIP.photos;
  $('#app').innerHTML=head('Core Memories 📸','Receipts for the group chat.')+'<section class="wrap">'+(P.length?'<div class="pics">'+P.map(p=>'<figure data-s="'+esc(p.src)+'"><img loading="lazy" src="'+esc(p.src)+'" alt="'+esc(p.caption)+'"><figcaption>'+esc(p.caption)+'</figcaption></figure>').join('')+'</div>':'<div class="card" style="text-align:center"><div class="ph0">📸</div><h3>Camera roll is empty (for now)</h3><p class="muted">Copy your pictures into the <code>photos/</code> folder and list them in <code>data.js</code> under <code>photos</code>.</p></div>')+'</section><div id="lb"><img alt=""></div>';
  const lb=$('#lb');document.querySelectorAll('.pics figure').forEach(f=>f.onclick=()=>{lb.querySelector('img').src=f.dataset.s;lb.classList.add('on')});lb.onclick=()=>lb.classList.remove('on');
}};
R[page]();
