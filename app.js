const $=s=>document.querySelector(s);
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=n=>TRIP.currency+Math.round(n).toLocaleString('en-IN');
const parse=d=>new Date(d+'T00:00:00');
const fmt=(d,o)=>d.toLocaleDateString('en-IN',o||{weekday:'short',day:'numeric',month:'short'});
const ppl=TRIP.crew.filter(c=>!c.infant);
const PAGES=[['index.html','Home','home'],['itinerary.html','The Plan','itinerary'],['crew.html','The Squad','crew'],['stay.html','The Crib','stay'],['ride.html','The Whip','ride'],['budget.html','The Damage','budget'],['outfits.html','Fit Check','outfits'],['playlists.html','Aux Cord','playlists'],['games.html','Games','games'],['gallery.html','Core Memories','gallery']];
const page=document.body.dataset.page,nk=page==='imposter'?'games':page;
document.title=(page==='home'?'':(page==='imposter'?'Imposter':PAGES.find(p=>p[2]===nk)[1])+' | ')+TRIP.name;
document.body.insertAdjacentHTML('afterbegin','<nav><div class="wrap"><a class="logo" href="index.html">🌴 '+esc(TRIP.name)+'</a>'+PAGES.map(p=>'<a class="l'+(p[2]===nk?' on':'')+'" href="'+p[0]+'">'+p[1]+'</a>').join('')+'<button class="mbtn" id="mbtn" aria-expanded="false" aria-controls="menu">☰ Menu</button></div></nav><div class="mq"><div>'+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+'</div></div>');
document.body.insertAdjacentHTML('beforeend','<footer>Made with ☀️ and zero sleep by the squad · '+esc(TRIP.name)+'</footer>');
const MEM={outfits:'👗',playlists:'🎧',home:'🏠',itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',imposter:'🕵️',games:'🎲',gallery:'📸'};
document.body.insertAdjacentHTML('beforeend','<div id="menu" class="menu" role="dialog" aria-label="Site menu"><div class="panel"><div class="mh"><b>Where to?</b><button id="mclose">✕ Close</button></div><div class="mg">'+PAGES.map(p=>'<a href="'+p[0]+'" class="'+(p[2]===nk?'cur':'')+'"><span>'+(MEM[p[2]]||'•')+'</span>'+p[1]+(p[2]===nk?'<small>you are here</small>':'')+'</a>').join('')+'</div></div></div>');
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
  const em={itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',outfits:'👗',playlists:'🎧',imposter:'🕵️',games:'🎲',gallery:'📸'};
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
  const N=TRIP.nails,F=TRIP.fitcheck||{},tab=()=>location.hash==='#nails'&&N?'nails':location.hash==='#dress'?'dress':'home';
  const tabs=t=>'<div class="ftabs" role="tablist"><a href="#" class="chip" style="box-shadow:none">← Fit Check</a>'+[['dress','👗 Dress'],['nails','💅 Nails']].filter(x=>x[0]==='dress'||N).map(x=>'<a href="#'+x[0]+'" role="tab" aria-selected="'+(t===x[0])+'" class="chip'+(t===x[0]?' on':'')+'">'+x[1]+'</a>').join('')+'</div>';
  const q=encodeURIComponent;
  const nailsHtml=()=>'<div class="card" style="background:var(--cyan);color:#111"><h3>💅 Beach nails</h3><p>'+esc(N.intro)+'</p></div>'+
  '<h2 style="margin:26px 0 4px">💅 Nail art ideas</h2><div class="fitgrid">'+N.ideas.map(n=>'<div class="card fit"><a class="fph" href="'+esc(n.credit?n.credit.url:'https://www.pexels.com/photo/'+n.photo+'/')+'" target="_blank" rel="noopener"><img loading="lazy" src="'+esc(n.img||ph(n.photo))+'" alt="'+esc(n.title)+' nail art" onerror="this.parentNode.style.display=\'none\'"></a><div class="fb">'+(n.credit?'<p class="muted" style="font-size:.72rem;margin-bottom:6px">Photo: '+esc(n.credit.by)+', <a href="'+esc(n.credit.licUrl)+'" target="_blank" rel="noopener">'+esc(n.credit.lic)+'</a>, via Wikimedia Commons</p>':'')+'<span class="tag">'+esc(n.when)+'</span><h3>'+n.emoji+' '+esc(n.title)+'</h3><p>'+esc(n.why)+'</p><p class="muted" style="margin-top:6px"><b>Tip:</b> '+esc(n.tips)+'</p><div class="pbtns" style="margin-top:10px"><a class="pbtn pin" href="https://in.pinterest.com/search/pins/?q='+q(n.pin)+'" target="_blank" rel="noopener">📌 Pinterest refs</a><a class="pbtn igb" href="https://www.instagram.com/explore/tags/'+q(n.ig)+'/" target="_blank" rel="noopener">📸 #'+esc(n.ig)+'</a></div></div></div>').join('')+'</div>'+
  '<div class="card toecard" style="margin-top:22px">'+(N.toesPhoto?'<a href="https://www.pexels.com/photo/'+N.toesPhoto+'/" target="_blank" rel="noopener"><img loading="lazy" src="'+ph(N.toesPhoto)+'" alt="Pink pedicure on the beach" onerror="this.style.display=\'none\'"></a>':'')+'<div><h3>🦶 Toes to match</h3><p class="muted" style="margin-bottom:10px">Bright pedicure shades that pop on sand.</p><div class="toes">'+N.toes.map(t=>'<span><i style="background:'+esc(t.c)+'"></i>'+esc(t.name)+'</span>').join('')+'</div></div></div>'+
  '<div class="card" style="margin-top:18px"><h3>🧴 Nail rules for the beach</h3><ul style="margin-left:18px">'+N.tips.map(t=>'<li style="margin:4px 0">'+esc(t)+'</li>').join('')+'</ul></div>'+
  '<div class="card" style="margin-top:18px"><h3>📌 More nail inspo</h3><p class="muted" style="margin-bottom:8px">Pinterest searches and Instagram hashtags. Screenshot a design and show it at the salon. They may ask you to sign in.</p><div class="pbtns">'+N.inspo.map(l=>'<a class="pbtn" style="background:var(--lime);color:#111" href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+'</a>').join('')+'</div></div>'+
  '<p class="muted" style="font-size:.8rem;margin-top:16px">Photos: free images from <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a> and Wikimedia Commons (tap a photo for its page). Tap Pinterest or Instagram on any card for many more real designs in that style.</p>';
  const homeHtml=()=>'<div class="card" style="background:var(--yellow);color:#111"><h3>🏖️ '+esc(F.title||'Beach-ready, head to toe')+'</h3>'+(F.intro||[]).map(x=>'<p style="margin-top:6px">'+esc(x)+'</p>').join('')+(girls.length?'<p style="margin-top:10px"><b>For the girls:</b> '+esc(girls.join(', '))+'. Pick a section below to start planning your looks.</p>':'')+'</div>'+
  '<div class="fchome">'+(F.sections||[]).filter(x=>x.id==='dress'||N).map(x=>'<a class="card fit fctile" href="#'+x.id+'"><span class="fph"><img loading="lazy" src="'+ph(x.photo)+'" alt="'+esc(x.title)+'" onerror="this.parentNode.style.display=\'none\'"></span><span class="fb"><h3>'+x.emoji+' '+esc(x.title)+'</h3><p>'+esc(x.text)+'</p><span class="pbtn" style="background:var(--lime);color:#111;margin-top:10px;display:inline-block">Open '+esc(x.title)+' →</span></span></a>').join('')+'</div>'+
  ((F.rules||[]).length?'<div class="card" style="margin-top:22px"><h3>🌴 The beach dress code</h3><ul style="margin-left:18px">'+F.rules.map(t=>'<li style="margin:4px 0">'+esc(t)+'</li>').join('')+'</ul></div>':'');
  const draw=()=>{const t=tab();
  $('#app').innerHTML=head('Fit Check 👗',esc(F.tagline||'Beach-ready looks for Goa, head to toe.'))+'<section class="wrap">'+(t==='home'?homeHtml()+'</section>':tabs(t)+(t==='nails'?nailsHtml()+'</section>':
  '<div class="card" style="background:var(--yellow);color:#111"><h3>☀️ The vibe</h3><p>'+esc(O.intro)+'</p>'+(girls.length?'<p style="margin-top:8px"><b>For the girls:</b> '+esc(girls.join(', '))+'. Beachy, party and sightseeing looks, so pick whatever you love.</p>':'')+'</div>'+
  '<h2 style="margin:26px 0 4px">🗓️ Day-by-day</h2><div class="card">'+O.plan.map(p=>'<div class="it" style="grid-template-columns:130px 1fr"><time style="font-size:.85rem">'+esc(p.day)+'</time><div>'+esc(p.looks)+'</div></div>').join('')+'<p class="muted" style="font-size:.8rem;margin-top:8px">Matches the sample itinerary, so tweak it if your plans change.</p></div>'+
  '<h2 style="margin:26px 0 4px">👗 Outfit ideas</h2><div class="fitgrid">'+O.ideas.map(i=>'<div class="card fit"><a class="fph" href="https://www.pexels.com/photo/'+i.photo+'/" target="_blank" rel="noopener"><img loading="lazy" src="'+ph(i.photo)+'" alt="'+esc(i.title)+'" onerror="this.parentNode.style.display=\'none\'"></a><div class="fb"><span class="tag">'+esc(i.when)+'</span><h3>'+i.emoji+' '+esc(i.title)+'</h3><p>'+esc(i.why)+'</p><p class="muted" style="margin-top:6px"><b>Tip:</b> '+esc(i.tips)+'</p><div class="pbtns" style="margin-top:10px">'+i.shop.map(l=>'<a class="pbtn shop" href="'+esc(l.url)+'" target="_blank" rel="noopener">🛍️ '+esc(l.label)+'</a>').join('')+'</div></div></div>').join('')+'</div>'+
  '<div class="card" style="margin-top:22px"><h3>🧳 Quick rules</h3><ul style="margin-left:18px">'+O.tips.map(t=>'<li style="margin:4px 0">'+esc(t)+'</li>').join('')+'</ul></div>'+
  '<div class="card" style="margin-top:18px"><h3>📌 More inspo</h3><p class="muted" style="margin-bottom:8px">Search pages on Pinterest and Instagram. They may ask you to sign in.</p><div class="pbtns">'+O.inspo.map(l=>'<a class="pbtn" style="background:var(--lime);color:#111" href="'+esc(l.url)+'" target="_blank" rel="noopener">'+esc(l.label)+'</a>').join('')+'</div></div>'+
  '<div class="card" style="margin-top:18px;background:#111;color:#fff"><h3 style="color:var(--lime)">👨 And the boys?</h3><p style="font-size:1.15rem;font-weight:700">'+esc(O.boys)+'</p></div>'+
  '<p class="muted" style="font-size:.8rem;margin-top:16px">Photos: free stock images from <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a> (tap a photo for its page). Shop buttons open Myntra and Amazon categories, not specific products, so prices and availability are whatever the shops show.</p></section>'));window.scrollTo(0,0);};
  draw();window.addEventListener('hashchange',draw);
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
    $('#app').innerHTML=head('Imposter 🕵️','Same word for everyone. Except one.')+'<section class="wrap"><div class="ftabs"><a href="games.html" class="chip">← Game Night</a></div>'+top+board+'</section>';
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

games(){
  const names=ppl.map(p=>p.name);
  const rnd=n=>crypto.getRandomValues(new Uint32Array(1))[0]%n;
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
  const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
  const keep=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
  const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
  const mm=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  const back='<div class="ftabs"><a href="#" class="chip">← Game Night</a></div>';
  const GAMES=[
    {href:'imposter.html',emoji:'🕵️',title:'Imposter',bg:'var(--pink)',text:'Everyone gets the same secret word, except one person. Talk it out and catch the imposter.'},
    {href:'#charades',emoji:'🎬',title:'Dumb Charades',bg:'var(--yellow)',text:'Act out Bollywood movies, songs and shows without saying a word. Two teams, a timer and a scoreboard.'},
    {href:'#spin',emoji:'🎡',title:'Spin the Wheel',bg:'var(--cyan)',text:'Let the wheel decide: who pays for chai, who picks the next song, who does the dare.'}];
  const hub=()=>'<div class="card" style="background:var(--lime);color:#111"><h3>🌙 Villa nights sorted</h3><p>Pass-the-phone party games for the squad. No internet, no sign-ups, just one phone and a lot of shouting.</p></div>'+
    '<div class="fchome">'+GAMES.map(g=>'<a class="card tile gtile" href="'+g.href+'" style="background:'+g.bg+';color:#111"><div class="e">'+g.emoji+'</div><h3>'+esc(g.title)+'</h3><p>'+esc(g.text)+'</p><span class="pbtn" style="background:#111;color:#fff;margin-top:12px;display:inline-block">Play →</span></a>').join('')+'</div>';

  /* ---------- Dumb Charades ---------- */
  const LIST=typeof CHARADES!=='undefined'?CHARADES:[],CATS=[...new Set(LIST.map(x=>x.c))];
  let C=load('goa-charades',null);
  if(!C||!Array.isArray(C.teams)||C.teams.length!==2)C={teams:[{name:'Team Chai',m:[],pts:0},{name:'Team Feni',m:[],pts:0}],turn:0,ai:[0,0],secs:90,cats:CATS.slice(),hist:[]};
  C.teams.forEach(t=>t.m=t.m.filter(n=>names.includes(n)));
  names.filter(n=>!C.teams.some(t=>t.m.includes(n))).forEach(n=>{(C.teams[0].m.length<=C.teams[1].m.length?C.teams[0]:C.teams[1]).m.push(n)});
  C.cats=(C.cats||[]).filter(c=>CATS.includes(c));if(!C.cats.length)C.cats=CATS.slice();if(C.sound===undefined)C.sound=true;
  const saveC=()=>keep('goa-charades',{teams:C.teams,turn:C.turn,ai:C.ai,secs:C.secs,cats:C.cats,sound:C.sound,hist:C.hist.slice(-30)});
  // Sounds are generated with the Web Audio API (no sound files). The context must be started from a tap, so it is unlocked on "start the timer".
  let AC=null;
  const audio=()=>{try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume()}catch(e){AC=null}return AC};
  const tone=(f,d,type,vol,at,f2)=>{const a=AC;if(!a||!C.sound)return;try{const t=a.currentTime+(at||0),o=a.createOscillator(),g=a.createGain();
    o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.2,t+0.01);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
    o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+0.05)}catch(e){}};
  const sfx={
    tick:()=>tone(880,0.1,'square',0.12),                       // 15..6 seconds left: short beep each second
    urgent:()=>{tone(1320,0.16,'square',0.2)},                  // last 5 seconds: higher, louder beep
    start:()=>{tone(660,0.12,'triangle',0.25);tone(990,0.18,'triangle',0.25,0.13)},
    buzzer:()=>{tone(300,0.4,'sawtooth',0.32,0,200);tone(300,0.4,'sawtooth',0.32,0.5,200);tone(260,1.1,'sawtooth',0.35,1.0,110)},  // time is up
    win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,0.22,'triangle',0.25,i*0.11))
  };
  const sndBtn=()=>'<button class="chip'+(C.sound?' on':'')+'" data-g="c-sound">'+(C.sound?'🔊 Sound on':'🔇 Sound off')+'</button>';
  let T=null,deck=[],tid=null;
  const pick=()=>{const ok=x=>C.cats.includes(x.c);deck=deck.filter(ok);if(!deck.length)deck=shuffle(LIST.filter(ok));return deck.pop()};
  const stop=()=>{clearInterval(tid);tid=null};
  const newTurn=()=>{stop();const ti=C.turn,tm=C.teams[ti],actor=tm.m[C.ai[ti]%tm.m.length];T={ti,actor,item:pick(),phase:'pass',skips:1,left:C.secs,peek:false}};
  const endTurn=res=>{stop();T.phase='done';T.res=res;if(res==='got')C.teams[T.ti].pts++;if(res==='time')sfx.buzzer();else if(res==='got')sfx.win();
    C.hist.push({team:C.teams[T.ti].name,actor:T.actor,t:T.item.t,got:res==='got'});C.ai[T.ti]++;C.turn=1-T.ti;saveC();buzz(res==='got'?[80,60,80]:[300])};
  const words=t=>t.trim().split(/\s+/).length;
  const charades=()=>{
    if(!LIST.length)return back+'<div class="card"><p>The title list did not load. Refresh the page.</p></div>';
    const ok=C.teams.every(t=>t.m.length>0);
    const board='<div class="card" style="margin-top:18px"><h3>🏆 Scoreboard</h3><div class="grid" style="grid-template-columns:1fr 1fr;gap:10px">'+C.teams.map((t,i)=>'<div style="border:3px solid var(--bd);border-radius:12px;padding:8px;text-align:center;background:'+(i?'var(--cyan)':'var(--yellow)')+';color:#111"><div class="big">'+t.pts+'</div>'+esc(t.name)+'</div>').join('')+'</div>'+
      (C.hist.length?'<h3 style="margin-top:14px;font-size:1.1rem">Last turns</h3>'+C.hist.slice().reverse().slice(0,8).map(h=>'<div style="padding:4px 0">'+(h.got?'✅':'❌')+' <b>'+esc(h.actor)+'</b> ('+esc(h.team)+') acted <i>'+esc(h.t)+'</i></div>').join(''):'')+
      '<button class="btn2 alt" data-g="c-reset" style="margin-top:12px">Reset scores</button></div>';
    let top;
    if(!T){
      const nt=C.teams[C.turn],na=nt.m.length?nt.m[C.ai[C.turn]%nt.m.length]:'';
      top='<div class="card"><h3>⚙️ Teams</h3><p class="muted" style="margin-bottom:10px">Tap a name to move them to the other team.</p><div class="grid" style="grid-template-columns:1fr 1fr;gap:12px">'+
        C.teams.map((t,i)=>'<div style="border:3px solid var(--bd);border-radius:14px;padding:10px;background:'+(i?'var(--cyan)':'var(--yellow)')+';color:#111"><b style="font-family:Bricolage Grotesque;font-size:1.15rem">'+esc(t.name)+'</b><div style="margin-top:8px">'+(t.m.map(n=>'<button class="chip" data-g="c-move" data-n="'+esc(n)+'">'+esc(n)+'</button>').join('')||'<span>Nobody yet</span>')+'</div></div>').join('')+'</div>'+
        '<button class="btn2 alt" data-g="c-shuffle" style="margin-top:12px">🔀 Shuffle teams</button>'+
        '<p class="muted" style="margin:14px 0 6px">What to act</p>'+CATS.map(c=>'<button class="chip'+(C.cats.includes(c)?' on':'')+'" data-g="c-cat" data-c="'+esc(c)+'">'+esc(c)+'</button>').join('')+
        '<p class="muted" style="margin:12px 0 6px">Time per turn</p>'+[60,90,120].map(s=>'<button class="chip'+(C.secs===s?' on':'')+'" data-g="c-secs" data-s="'+s+'">'+s+' sec</button>').join('')+
        '<p class="muted" style="margin:12px 0 6px">Countdown beeps for the last 15 seconds and a buzzer at time-up</p>'+sndBtn()+
        '<div style="margin-top:14px"><button class="btn2" data-g="c-start"'+(ok&&C.cats.length?'':' disabled')+'>🎬 Start: '+esc(nt.name)+(na?', '+esc(na)+' acts':'')+'</button>'+(ok?'':'<span class="muted"> Both teams need at least one player.</span>')+'</div></div>'+
        '<div class="card" style="margin-top:18px"><h3>📜 How to play</h3><ul style="margin-left:18px"><li>The actor secretly sees a title, then acts it out for their own team. <b>No talking, no mouthing words, no pointing at things that spell it.</b></li><li>Show the category first: crank an old film camera for a <b>movie</b>, pretend to sing into a mic for a <b>song</b>, draw a TV box in the air for a <b>show</b>.</li><li>Hold up fingers for the number of words, then fingers again to say which word you are acting. Tap your forearm with fingers for syllables.</li><li>Guess it before the timer runs out to win 1 point. Teams take turns, and everyone gets a go at acting.</li></ul></div>';
    }else if(T.phase==='pass'){
      top='<div class="card"><h3>🎬 '+esc(C.teams[T.ti].name)+'</h3><p style="font-size:1.25rem">Pass the phone to <b>'+esc(T.actor)+'</b></p><p class="muted" style="margin:6px 0 12px">Only the actor looks. Everyone else, eyes off the screen!</p><button class="btn2" data-g="c-show">👀 I am '+esc(T.actor)+', show me</button> <button class="btn2 alt" data-g="c-cancel">Cancel</button></div>';
    }else if(T.phase==='show'){
      top='<div class="card"><div class="rolecard"><p>'+esc(T.item.c)+' · '+words(T.item.t)+' word'+(words(T.item.t)>1?'s':'')+'</p><h3 style="font-size:2.3rem;margin-top:8px;text-transform:none">'+esc(T.item.t)+'</h3><p style="margin-top:10px;color:var(--lime)">Memorise it. No talking from now on!</p></div>'+
        '<div style="margin-top:12px"><button class="btn2" data-g="c-go">▶️ Hide it and start the timer</button> '+(T.skips?'<button class="btn2 alt" data-g="c-skip">🔁 Too hard? Skip ('+T.skips+' left)</button>':'')+'</div></div>';
    }else if(T.phase==='act'){
      top='<div class="card" style="text-align:center"><h3>'+esc(T.actor)+' is acting for '+esc(C.teams[T.ti].name)+'</h3><div class="big ctimer'+(T.left<=15?' low':'')+'" id="ctm">'+mm(Math.max(T.left,0))+'</div>'+
        '<p class="muted" style="margin-bottom:10px">'+esc(T.item.c)+' · '+words(T.item.t)+' word'+(words(T.item.t)>1?'s':'')+(T.peek?' · <b style="color:var(--ink)">'+esc(T.item.t)+'</b>':'')+'</p>'+
        '<button class="btn2" data-g="c-got" style="font-size:1.25rem">✅ They guessed it!</button> <button class="btn2 alt" data-g="c-giveup">❌ Give up</button><div>'+sndBtn()+' <button class="chip" data-g="c-peek" style="margin-top:10px">'+(T.peek?'🙈 Hide title':'👀 Actor peek')+'</button></div></div>';
    }else{
      const nt=C.teams[C.turn];
      top='<div class="card"><h3>'+(T.res==='got'?'🎉 Got it! +1 for '+esc(C.teams[T.ti].name):T.res==='time'?'⏰ Time is up!':'😅 No points this time')+'</h3><p>The title was <b>'+esc(T.item.t)+'</b> <span class="muted">('+esc(T.item.c)+')</span>.</p><div style="margin-top:12px"><button class="btn2" data-g="c-start">▶️ Next: '+esc(nt.name)+'</button> <button class="btn2 alt" data-g="c-cancel">Change teams / settings</button></div></div>';
    }
    return back+top+board;
  };
  const tick=()=>{T.left--;const el=document.getElementById('ctm');if(el){el.textContent=mm(Math.max(T.left,0));el.classList.toggle('low',T.left<=15)}
    if(T.left>5&&T.left<=15)sfx.tick();else if(T.left>0&&T.left<=5)sfx.urgent();
    if(T.left===15)buzz(120);if(T.left<=0){endTurn('time');draw()}};

  /* ---------- Spin the Wheel ---------- */
  const QS=['Who pays for the next round of chai? ☕','Who picks the next song? 🎧','Who gets the front seat? 🚙','Who does the next dare? 😈','Who orders for the whole table? 🍤','Who wakes everyone up tomorrow? ⏰','Who takes the group photo? 📸','Who hits the dance floor first? 💃','Who carries the beach bag today? 🎒'];
  let W=load('goa-spin',null);
  if(!W||!Array.isArray(W.off))W={mode:'crew',q:0,custom:'Beach shack\nCafe\nSeafood place\nOrder in at the villa',off:[],elim:false,hist:[]};
  const saveW=()=>keep('goa-spin',{mode:W.mode,q:W.q,custom:W.custom,off:W.off,elim:W.elim,hist:W.hist.slice(-12)});
  let rot=0,spinning=false,result=null;
  const opts=()=>W.mode==='crew'?names.filter(n=>!W.off.includes(n)):W.custom.split('\n').map(s=>s.trim()).filter(Boolean).slice(0,16);
  const COLS=['#ffe14d','#38e1ff','#c6ff3d','#8f5cff','#ff7a3d','#4a63ff','#ff5fa2','#2fbf71'];
  const wheelSvg=o=>{const n=o.length,R=150,c=160,seg=360/n,pt=a=>[c+R*Math.sin(a*Math.PI/180),c-R*Math.cos(a*Math.PI/180)];
    if(!n)return '<p class="muted" style="text-align:center;padding:60px 0">Add at least 2 options to spin.</p>';
    const fs=n<=6?17:n<=10?14:11,lbl=s=>s.length>16?s.slice(0,15)+'…':s;
    return '<svg viewBox="0 0 320 320" class="wheel" id="wheel" style="transform:rotate('+rot+'deg)" role="img" aria-label="Wheel with '+n+' options">'+
      o.map((s,i)=>{const a0=i*seg,a1=(i+1)*seg,[x0,y0]=pt(a0),[x1,y1]=pt(a1),col=COLS[i%COLS.length],dark=['#8f5cff','#4a63ff','#2fbf71'].includes(col);
        const path=n===1?'<circle cx="'+c+'" cy="'+c+'" r="'+R+'" fill="'+col+'" stroke="#111" stroke-width="3"/>':'<path d="M'+c+' '+c+' L'+x0.toFixed(2)+' '+y0.toFixed(2)+' A'+R+' '+R+' 0 '+(seg>180?1:0)+' 1 '+x1.toFixed(2)+' '+y1.toFixed(2)+' Z" fill="'+col+'" stroke="#111" stroke-width="3"/>';
        return path+'<text transform="rotate('+((a0+a1)/2-90).toFixed(2)+' '+c+' '+c+')" x="'+(c+R*0.58)+'" y="'+c+'" dy=".35em" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="'+fs+'" fill="'+(dark?'#fff':'#111')+'">'+esc(lbl(s))+'</text>'}).join('')+
      '<circle cx="'+c+'" cy="'+c+'" r="22" fill="#111" stroke="#fff" stroke-width="3"/></svg>'};
  const spin=()=>{
    const o=opts();if(o.length<2||spinning)return;spinning=true;result=null;
    const n=o.length,seg=360/n,i=rnd(n),pos=(i+0.15+0.7*(rnd(1000)/1000))*seg;
    rot=rot+360*6+((360-pos-(rot%360))%360+360)%360;
    const w=document.getElementById('wheel'),res=document.getElementById('wres'),b=document.getElementById('wbtn');
    if(res)res.innerHTML='<p class="muted">Spinning…</p>';if(b)b.disabled=true;
    w.style.transition='transform 4.2s cubic-bezier(.12,.68,.1,1)';requestAnimationFrame(()=>{w.style.transform='rotate('+rot+'deg)'});
    setTimeout(()=>{spinning=false;result={who:o[i],q:W.mode==='crew'?QS[W.q]:'The wheel says'};
      W.hist.push({who:o[i],q:result.q});if(W.elim&&W.mode==='crew'&&o.length>2)W.off.push(o[i]);saveW();buzz([60,40,60]);draw()},4300)};
  const spinView=()=>{const o=opts();
    return back+'<div class="card"><div class="ftabs" style="margin:0 0 12px">'+[['crew','👯 Squad'],['custom','✏️ Custom options']].map(m=>'<button class="chip'+(W.mode===m[0]?' on':'')+'" data-g="w-mode" data-m="'+m[0]+'">'+m[1]+'</button>').join('')+'</div>'+
      (W.mode==='crew'?'<p class="muted" style="margin-bottom:6px">The question</p><select id="wq" class="wsel">'+QS.map((q,i)=>'<option value="'+i+'"'+(i===W.q?' selected':'')+'>'+esc(q)+'</option>').join('')+'</select>'+
        '<p class="muted" style="margin:12px 0 6px">Who is on the wheel? (tap to remove or add)</p>'+names.map(n=>'<button class="chip'+(W.off.includes(n)?'':' on')+'" data-g="w-who" data-n="'+esc(n)+'">'+esc(n)+'</button>').join('')+
        '<label class="chk" style="margin-top:8px"><input type="checkbox" id="welim" '+(W.elim?'checked':'')+'> Take the winner off the wheel after each spin (fair turns)</label>'
       :'<p class="muted" style="margin-bottom:6px">One option per line (up to 16). Great for "where do we eat?"</p><textarea id="wcustom" class="wsel" rows="5">'+esc(W.custom)+'</textarea>')+
      '</div><div class="card wcard" style="margin-top:18px;text-align:center"><h3>'+esc(W.mode==='crew'?QS[W.q]:'Spin to decide')+'</h3><div class="wwrap"><div class="wptr" aria-hidden="true"></div>'+wheelSvg(o)+'</div>'+
      '<button class="btn2" id="wbtn" data-g="w-spin" style="font-size:1.3rem;padding:12px 34px"'+(o.length<2?' disabled':'')+'>🎡 SPIN</button>'+
      '<div id="wres" style="margin-top:12px">'+(result?'<div class="rolecard"><p>'+esc(result.q)+'</p><h3 style="font-size:2.4rem;margin-top:6px;text-transform:none">'+esc(result.who)+'</h3></div>':'')+'</div></div>'+
      (W.hist.length?'<div class="card" style="margin-top:18px"><h3>📜 Recent spins</h3>'+W.hist.slice().reverse().slice(0,8).map(h=>'<div style="padding:4px 0"><b>'+esc(h.who)+'</b> <span class="muted">· '+esc(h.q)+'</span></div>').join('')+'<button class="btn2 alt" data-g="w-clear" style="margin-top:10px">Clear history</button></div>':'');
  };

  /* ---------- router + events ---------- */
  const view=()=>{const h=location.hash.slice(1);return h==='charades'||h==='spin'?h:'hub'};
  const SUB={hub:'Pass the phone. Let the chaos begin.',charades:'Dumb Charades 🎬 · act it, don\'t say it.',spin:'Spin the Wheel 🎡 · the wheel has spoken.'};
  const draw=()=>{const v=view();
    $('#app').innerHTML=head('Game Night 🎲',esc(SUB[v]))+'<section class="wrap">'+(v==='charades'?charades():v==='spin'?spinView():hub())+'</section>'};
  $('#app').addEventListener('click',e=>{const b=e.target.closest('[data-g]');if(!b||b.disabled)return;const a=b.dataset.g;
    if(a==='c-move'){const n=b.dataset.n,i=C.teams[0].m.includes(n)?0:1;C.teams[i].m=C.teams[i].m.filter(x=>x!==n);C.teams[1-i].m.push(n);saveC()}
    else if(a==='c-shuffle'){const s=shuffle(names),h=Math.ceil(s.length/2);C.teams[0].m=s.slice(0,h);C.teams[1].m=s.slice(h);C.ai=[0,0];saveC()}
    else if(a==='c-cat'){const c=b.dataset.c;C.cats=C.cats.includes(c)?C.cats.filter(x=>x!==c):C.cats.concat(c);saveC()}
    else if(a==='c-secs'){C.secs=+b.dataset.s;saveC()}
    else if(a==='c-start'){newTurn()}
    else if(a==='c-cancel'){stop();T=null}
    else if(a==='c-show'){T.phase='show'}
    else if(a==='c-skip'){T.skips--;T.item=pick()}
    else if(a==='c-go'){audio();sfx.start();T.phase='act';T.left=C.secs;stop();tid=setInterval(tick,1000)}
    else if(a==='c-sound'){C.sound=!C.sound;saveC();if(C.sound){audio();sfx.tick()}if(T&&T.phase==='act'){b.outerHTML=sndBtn();return}}
    else if(a==='c-peek'){T.peek=!T.peek}
    else if(a==='c-got'){endTurn('got')}
    else if(a==='c-giveup'){endTurn('gave')}
    else if(a==='c-reset'){if(!confirm('Reset charades scores?'))return;C.teams.forEach(t=>t.pts=0);C.hist=[];C.ai=[0,0];C.turn=0;saveC()}
    else if(a==='w-mode'){W.mode=b.dataset.m;result=null;saveW()}
    else if(a==='w-who'){const n=b.dataset.n;W.off=W.off.includes(n)?W.off.filter(x=>x!==n):W.off.concat(n);result=null;saveW()}
    else if(a==='w-spin'){spin();return}
    else if(a==='w-clear'){W.hist=[];saveW()}
    else return;
    draw()});
  $('#app').addEventListener('change',e=>{const t=e.target;
    if(t.id==='wq'){W.q=+t.value;result=null;saveW();draw()}
    else if(t.id==='welim'){W.elim=t.checked;saveW()}
    else if(t.id==='wcustom'){W.custom=t.value.slice(0,600);result=null;saveW();draw()}});
  window.addEventListener('hashchange',()=>{if(view()!=='charades'){stop();if(T&&T.phase!=='done')T=null}draw();window.scrollTo(0,0)});
  draw();
},

gallery(){
  const P=TRIP.photos;
  $('#app').innerHTML=head('Core Memories 📸','Receipts for the group chat.')+'<section class="wrap">'+(P.length?'<div class="pics">'+P.map(p=>'<figure data-s="'+esc(p.src)+'"><img loading="lazy" src="'+esc(p.src)+'" alt="'+esc(p.caption)+'"><figcaption>'+esc(p.caption)+'</figcaption></figure>').join('')+'</div>':'<div class="card" style="text-align:center"><div class="ph0">📸</div><h3>Camera roll is empty (for now)</h3><p class="muted">Copy your pictures into the <code>photos/</code> folder and list them in <code>data.js</code> under <code>photos</code>.</p></div>')+'</section><div id="lb"><img alt=""></div>';
  const lb=$('#lb');document.querySelectorAll('.pics figure').forEach(f=>f.onclick=()=>{lb.querySelector('img').src=f.dataset.s;lb.classList.add('on')});lb.onclick=()=>lb.classList.remove('on');
}};
R[page]();
