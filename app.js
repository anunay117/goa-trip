const $=s=>document.querySelector(s);
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=n=>TRIP.currency+Math.round(n).toLocaleString('en-IN');
const parse=d=>new Date(d+'T00:00:00');
const fmt=(d,o)=>d.toLocaleDateString('en-IN',o||{weekday:'short',day:'numeric',month:'short'});
const ppl=TRIP.crew.filter(c=>!c.infant);
const PAGES=[['index.html','Home','home'],['itinerary.html','The Plan','itinerary'],['crew.html','The Squad','crew'],['stay.html','The Crib','stay'],['ride.html','The Whip','ride'],['budget.html','The Damage','budget'],['playlists.html','Aux Cord','playlists'],['imposter.html','Imposter','imposter'],['gallery.html','Core Memories','gallery']];
const page=document.body.dataset.page;
document.title=(page==='home'?'':PAGES.find(p=>p[2]===page)[1]+' | ')+TRIP.name;
document.body.insertAdjacentHTML('afterbegin','<nav><div class="wrap"><a class="logo" href="index.html">🌴 '+esc(TRIP.name)+'</a>'+PAGES.map(p=>'<a class="l'+(p[2]===page?' on':'')+'" href="'+p[0]+'">'+p[1]+'</a>').join('')+'<button class="mbtn" id="mbtn" aria-expanded="false" aria-controls="menu">☰ Menu</button></div></nav><div class="mq"><div>'+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+'</div></div>');
document.body.insertAdjacentHTML('beforeend','<footer>Made with ☀️ and zero sleep by the squad · '+esc(TRIP.name)+'</footer>');
const MEM={playlists:'🎧',home:'🏠',itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',imposter:'🕵️',playlists:'🎧',gallery:'📸'};
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
  const em={itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',playlists:'🎧',imposter:'🕵️',gallery:'📸'};
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
  $('#app').innerHTML=head('The Crib 🏡','Home base for '+nights+' nights. It\'s giving villa.')+'<section class="wrap"><div class="card"><h2>'+esc(s.name)+'</h2><p class="muted" style="margin-bottom:14px">'+esc(s.address)+'</p><dl class="kv"><dt>Check-in</dt><dd>'+esc(s.checkIn)+'</dd><dt>Check-out</dt><dd>'+esc(s.checkOut)+'</dd><dt>Rooms</dt><dd>'+s.bedrooms+' bedrooms · '+esc(s.beds)+'</dd><dt>Host</dt><dd>'+esc(s.host)+(s.hostPhone?' · <a href="tel:'+esc(s.hostPhone)+'">'+esc(s.hostPhone)+'</a>':'')+'</dd><dt>Wi-Fi</dt><dd>'+esc(s.wifi)+'</dd><dt>Cost</dt><dd>'+money(s.totalCost)+' for '+s.nights+' nights · <b>'+money(s.totalCost/ppl.length)+' each</b></dd></dl><p style="margin-top:14px"><a href="'+esc(s.mapLink)+'" target="_blank" rel="noopener">📍 Open in Maps</a> · <a href="'+esc(s.link)+'" target="_blank" rel="noopener">View listing</a></p></div>'+
  '<div class="grid" style="margin-top:14px"><div class="card"><h3>✨ Perks</h3><ul style="margin-left:18px">'+s.perks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="card"><h3>📜 House rules</h3><ul style="margin-left:18px">'+s.rules.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div></section>';
},
ride(){
  const r=TRIP.ride,tot=r.rentalTotal+r.fuelEstimate;
  $('#app').innerHTML=head('The Whip 🚙','Main character transport.')+'<section class="wrap"><div class="card"><h2>🚙 '+esc(r.car)+'</h2><p class="muted" style="margin-bottom:14px">'+esc(r.company)+(r.phone?' · <a href="tel:'+esc(r.phone)+'">'+esc(r.phone)+'</a>':'')+'</p><dl class="kv"><dt>Pick-up</dt><dd>'+esc(r.pickup)+'</dd><dt>Drop-off</dt><dd>'+esc(r.dropoff)+'</dd><dt>Drivers</dt><dd>'+r.drivers.map(esc).join(', ')+'</dd><dt>Seats</dt><dd>'+r.seats+'</dd><dt>Rental</dt><dd>'+money(r.rentalTotal)+'</dd><dt>Fuel (est.)</dt><dd>'+money(r.fuelEstimate)+'</dd><dt>Deposit</dt><dd>'+money(r.deposit)+' (refundable)</dd><dt>Per person</dt><dd><b>'+money(tot/ppl.length)+'</b> for rental + fuel</dd></dl></div>'+
  '<div class="grid" style="margin-top:14px"><div class="card"><h3>📄 Documents</h3><ul style="margin-left:18px">'+r.docs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div><div class="card"><h3>🛣️ Road rules</h3><ul style="margin-left:18px">'+r.tips.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div></div></section>';
},
budget(){
  const n=ppl.length,B=TRIP.budget,total=B.reduce((a,b)=>a+b.amount,0);
  const each=Object.fromEntries(ppl.map(p=>[p.name,0]));
  B.forEach(b=>{const who=ppl.filter(p=>b.only?b.only.includes(p.name):!(b.exclude||[]).includes(p.name));who.forEach(p=>each[p.name]+=b.amount/who.length)});
  const cats={};B.forEach(b=>cats[b.cat]=(cats[b.cat]||0)+b.amount);const mx=Math.max(...Object.values(cats),1);
  const hasPlan=TRIP.planned>0,pct=hasPlan?Math.min(100,total/TRIP.planned*100):0;
  $('#app').innerHTML=head('The Damage 💸','Split equally, except where noted. UPI ready.')+'<section class="wrap"><div class="grid"><div class="card"><div class="muted">Spent so far</div><div class="big">'+money(total)+'</div>'+(hasPlan?'<div class="bar"><i style="width:'+pct+'%"></i></div><div class="muted" style="margin-top:6px;font-size:.85rem">of '+money(TRIP.planned)+' planned ('+Math.round(pct)+'%)</div>':'<div class="muted" style="font-size:.85rem">across '+B.length+' expenses</div>')+'</div><div class="card"><div class="muted">Each person pays</div>'+ppl.map(p=>'<div style="display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-bottom:2px dashed var(--bd)"><span><b>'+esc(p.name)+'</b>'+(B.some(b=>(b.exclude||[]).includes(p.name))?' <span class="muted" style="font-size:.78rem">(own flight)</span>':'')+(B.filter(b=>b.only&&b.only.includes(p.name)&&b.short).map(b=>' <span class="muted" style="font-size:.78rem">(incl. '+esc(b.short)+')</span>').join(''))+'</span><b>'+money(each[p.name])+'</b></div>').join('')+'</div></div>'+
  '<div class="card" style="margin-top:14px"><h3>By category</h3>'+Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><span>'+esc(k)+'</span><b>'+money(v)+'</b></div><div class="bar"><i style="width:'+v/mx*100+'%"></i></div></div>').join('')+'</div>'+
  '<div class="card" style="margin-top:14px"><h3>Expenses</h3><div class="tw"><table><tr><th>What</th><th>Category</th><th class="r">Amount</th></tr>'+B.map(b=>'<tr><td>'+esc(b.label)+(b.only?'<div class="muted" style="font-size:.78rem">charged to '+esc(b.only.join(', '))+' only</div>':(b.exclude&&b.exclude.length?'<div class="muted" style="font-size:.78rem">split '+(n-b.exclude.length)+' ways, not '+esc(b.exclude.join(', '))+'</div>':''))+'</td><td>'+esc(b.cat)+'</td><td class="r">'+money(b.amount)+'</td></tr>').join('')+'<tr><td colspan="2"><b>Total</b></td><td class="r"><b>'+money(total)+'</b></td></tr></table></div></div>'+
  '</section>';
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
