const $=s=>document.querySelector(s);
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=n=>TRIP.currency+Math.round(n).toLocaleString('en-IN');
const parse=d=>new Date(d+'T00:00:00');
const fmt=(d,o)=>d.toLocaleDateString('en-IN',o||{weekday:'short',day:'numeric',month:'short'});
const ppl=TRIP.crew.filter(c=>!c.infant);
const PAGES=[['index.html','Home','home'],['itinerary.html','The Plan','itinerary'],['crew.html','The Squad','crew'],['stay.html','The Crib','stay'],['ride.html','The Whip','ride'],['budget.html','The Damage','budget'],['gallery.html','Core Memories','gallery']];
const page=document.body.dataset.page;
document.title=(page==='home'?'':PAGES.find(p=>p[2]===page)[1]+' | ')+TRIP.name;
document.body.insertAdjacentHTML('afterbegin','<nav><div class="wrap"><a class="logo" href="index.html">🌴 '+esc(TRIP.name)+'</a>'+PAGES.map(p=>'<a class="l'+(p[2]===page?' on':'')+'" href="'+p[0]+'">'+p[1]+'</a>').join('')+'</div></nav><div class="mq"><div>'+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+Array(8).join('<span>'+esc(TRIP.name)+' ✦ '+ppl.length+' BESTIES ✦ NO CAP ✦ OUT OF OFFICE ✦ </span>')+'</div></div>');
document.body.insertAdjacentHTML('beforeend','<footer>Made with ☀️ and zero sleep by the squad · '+esc(TRIP.name)+'</footer>');
const head=(t,s)=>'<div class="ph wrap"><h1>'+t+'</h1><p>'+s+'</p></div>';
const days=()=>{const s=parse(TRIP.start);return TRIP.itinerary.map((d,i)=>({...d,date:new Date(s.getTime()+i*864e5)}))};
const nights=Math.max(1,Math.round((parse(TRIP.end)-parse(TRIP.start))/864e5));
const flightsHtml=()=>!(TRIP.flights&&TRIP.flights.length)?'':'<div class="card" style="margin-bottom:18px"><h3>✈️ Flights (we are SO back)</h3>'+TRIP.flights.map(f=>'<div class="it" style="grid-template-columns:100px 1fr"><time>'+fmt(parse(f.date))+'</time><div><b>'+esc(f.airline)+' '+esc(f.no)+'</b> · '+esc(f.who)+'<div>'+esc(f.from)+' <b>'+esc(f.dep)+'</b> → '+esc(f.to)+' <b>'+esc(f.arr)+'</b> <span class="muted">('+esc(f.dur)+')</span></div>'+(f.note?'<div class="muted" style="font-size:.85rem">'+esc(f.note)+'</div>':'')+'</div></div>').join('')+'</div>';
const R={
home(){
  const s=parse(TRIP.start),e=parse(TRIP.end),w=TRIP.weather;
  const em={itinerary:'🗓️',crew:'👯',stay:'🏡',ride:'🚙',budget:'💸',gallery:'📸'};
  const tiles=PAGES.slice(1).map(p=>'<a class="card tile" href="'+p[0]+'"><div class="e">'+em[p[2]]+'</div><h3>'+p[1]+'</h3></a>').join('');
  let pk=[];try{pk=JSON.parse(localStorage.getItem('goa-pack2')||'[]')}catch(x){}
  const groups=TRIP.packing.map(g=>'<div class="card check"><h3>'+g.emoji+' '+esc(g.group)+'</h3>'+g.items.map(x=>'<label><input type="checkbox" data-n="'+esc(x)+'" '+(pk.includes(x)?'checked':'')+'> '+esc(x)+'</label>').join('')+'</div>').join('');
  $('#app').innerHTML='<header class="hero"><div class="wrap"><h1>Goa<br><span>or bust</span></h1><p>'+esc(TRIP.tagline)+'</p><div><span class="stk">'+fmt(s,{day:'numeric',month:'short'})+' → '+fmt(e,{day:'numeric',month:'short'})+'</span><span class="stk">'+ppl.length+' besties</span><span class="stk">'+nights+' nights</span><span class="stk">no cap</span></div><div class="cd" id="cd"></div></div></header>'+
  '<section class="wrap"><div class="grid">'+tiles+'</div></section>'+
  '<section class="wrap"><div class="card" style="background:var(--yellow);color:#111"><h2>☀️ Goa in December</h2><p style="margin-top:6px;font-weight:600">Dry, sunny and hot in the day, chill at night. Pack for beach weather, not rain.</p><div class="wx"><div><b>'+esc(w.hi)+'</b><span>Day high</span></div><div><b>'+esc(w.lo)+'</b><span>Night low</span></div><div><b>'+esc(w.sea)+'</b><span>Sea temp</span></div><div><b>'+esc(w.rain)+'</b><span>Rainy days</span></div><div><b>'+esc(w.sun)+'</b><span>Sun daily</span></div></div><p style="margin-top:12px;font-weight:600">'+esc(w.note)+'</p></div></section>'+
  '<section class="wrap"><h2 style="text-transform:uppercase;font-size:2.2rem">🎒 Packing list</h2><p class="muted" style="margin-top:6px;font-weight:600">Built for Goa weather. Ticks are saved on this device only.</p><div class="pk">'+groups+'</div><div class="skip"><b>Leave at home:</b> '+TRIP.skip.map(esc).join(' · ')+'</div></section>';
  document.querySelectorAll('.check input').forEach(c=>c.onchange=()=>{const a=[...document.querySelectorAll('.check input:checked')].map(x=>x.dataset.n);try{localStorage.setItem('goa-pack2',JSON.stringify(a))}catch(x){}});
  const tick=()=>{const now=new Date();let ms=s-now,label='until we leave';if(ms<=0){ms=e-now+864e5;label=ms>0?'left of the trip':'';}
    if(ms<=0){$('#cd').innerHTML='<div><b>🌅</b><span>What a trip!</span></div>';return}
    const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60;
    $('#cd').innerHTML=[[d,'days'],[h,'hours'],[m,'mins']].map(x=>'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join('')+'<div style="background:none;border:none;box-shadow:none;color:#111;align-self:center;font-weight:800;font-size:1.1rem">'+label+'</div>'};
  tick();setInterval(tick,30000);
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
  const n=ppl.length,B=TRIP.budget,total=B.reduce((a,b)=>a+b.amount,0),share=total/n;
  const cats={};B.forEach(b=>cats[b.cat]=(cats[b.cat]||0)+b.amount);const mx=Math.max(...Object.values(cats),1);
  const pct=Math.min(100,total/TRIP.planned*100);
  $('#app').innerHTML=head('The Damage 💸','Split equally across '+n+' of us. UPI ready.')+'<section class="wrap"><div class="grid"><div class="card"><div class="muted">Spent so far</div><div class="big">'+money(total)+'</div><div class="bar"><i style="width:'+pct+'%"></i></div><div class="muted" style="margin-top:6px;font-size:.85rem">of '+money(TRIP.planned)+' planned ('+Math.round(pct)+'%)</div></div><div class="card"><div class="muted">Each person\'s share</div><div class="big">'+money(share)+'</div><div class="muted" style="font-size:.85rem">Budget per head: '+money(TRIP.planned/n)+'</div></div></div>'+
  '<div class="card" style="margin-top:14px"><h3>By category</h3>'+Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([k,v])=>'<div style="margin:10px 0"><div style="display:flex;justify-content:space-between"><span>'+esc(k)+'</span><b>'+money(v)+'</b></div><div class="bar"><i style="width:'+v/mx*100+'%"></i></div></div>').join('')+'</div>'+
  '<div class="card" style="margin-top:14px"><h3>Expenses</h3><div class="tw"><table><tr><th>What</th><th>Category</th><th class="r">Amount</th></tr>'+B.map(b=>'<tr><td>'+esc(b.label)+'</td><td>'+esc(b.cat)+'</td><td class="r">'+money(b.amount)+'</td></tr>').join('')+'<tr><td colspan="2"><b>Total</b></td><td class="r"><b>'+money(total)+'</b></td></tr></table></div></div>'+
  '</section>';
},
gallery(){
  const P=TRIP.photos;
  $('#app').innerHTML=head('Core Memories 📸','Receipts for the group chat.')+'<section class="wrap">'+(P.length?'<div class="pics">'+P.map(p=>'<figure data-s="'+esc(p.src)+'"><img loading="lazy" src="'+esc(p.src)+'" alt="'+esc(p.caption)+'"><figcaption>'+esc(p.caption)+'</figcaption></figure>').join('')+'</div>':'<div class="card" style="text-align:center"><div class="ph0">📸</div><h3>Camera roll is empty (for now)</h3><p class="muted">Copy your pictures into the <code>photos/</code> folder and list them in <code>data.js</code> under <code>photos</code>.</p></div>')+'</section><div id="lb"><img alt=""></div>';
  const lb=$('#lb');document.querySelectorAll('.pics figure').forEach(f=>f.onclick=()=>{lb.querySelector('img').src=f.dataset.s;lb.classList.add('on')});lb.onclick=()=>lb.classList.remove('on');
}};
R[page]();
