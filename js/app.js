(function(){
'use strict';
var LESSONS=window.MH_LESSONS||[],BLOCKS=window.MH_BLOCKS||[],SRC=window.MH_SRC||{};

var SHOP=[
 {id:'palms',name:'Potted palms',price:30,blurb:'A pair of palms for the corners of the ballroom.'},
 {id:'gramophone',name:'Gramophone',price:40,blurb:'Plays records until the band arrives.'},
 {id:'chandelier',name:'Chandelier',price:60,blurb:'Crystal and gold, hung from the centre of the ceiling.'},
 {id:'floor',name:'Dance floor',price:80,blurb:'A black and cream chequered floor.'},
 {id:'lanterns',name:'Paper lanterns',price:80,blurb:'Two strings of coloured lanterns across the ceiling.'},
 {id:'curtains',name:'Velvet curtains',price:90,blurb:'Deep red curtains tied back with gold cord.'},
 {id:'tower',name:'Champagne tower',price:100,blurb:'A pyramid of glasses on a white cloth.'},
 {id:'balloons',name:'Balloons',price:100,blurb:'Gold, cream and black balloons by the terrace doors.'},
 {id:'bar',name:'Cocktail bar',price:120,blurb:'A bar with bottles on the shelf and two cocktails poured.'},
 {id:'cake',name:'Cake table',price:120,blurb:'A three tier cake on a long white cloth.'},
 {id:'waiter',name:'Waiter',price:120,blurb:'Carries a tray of cocktails through the crowd.'},
 {id:'band',name:'Jazz band',price:150,blurb:'Saxophone, double bass and drums on a small stage.'},
 {id:'singer',name:'Singer',price:150,blurb:'Sings at a ring microphone beside the piano.'},
 {id:'piano',name:'Grand piano',price:180,blurb:'A black grand piano with the lid raised.'},
 {id:'car',name:'Motor car',price:200,blurb:'Parked on the drive, seen through the terrace doors.'},
 {id:'fireworks',name:'Fireworks',price:250,blurb:'Three bursts in the night sky over the terrace.'}
];
var GUEST_AT=[1,4,8,13,18,24,30,36,43,50,58,66];
var TERMS=[
 {t:'Identify',m:'2 marks',own:'Own knowledge is not usually needed.',how:'Give two direct quotes from a written source, or two features from a visual source. Dot points are enough.',
  checks:['I gave two separate points.','Each point comes straight from the source.','I kept it short.']},
 {t:'Describe',m:'3 to 4 marks',own:'Own knowledge is rarely needed.',how:'Give the view of the person who made the source. Start with a topic sentence, then use at least two quotes or visual features.',
  checks:['My first sentence states the view of the person who made the source.','I used at least two quotes or visual features.','I said what each quote or feature shows about that view.']},
 {t:'Outline',m:'4 to 5 marks',own:'Own knowledge is sometimes needed.',how:'Give a general overview that answers the question. Start with a topic sentence. Use the source at least twice and link each use to the question.',
  checks:['My first sentence answers the question.','I used the source at least twice.','I linked each use of the source back to the question.','I added my own knowledge if the question asked for it.']},
 {t:'Explain',m:'5 to 6 marks',own:'Own knowledge is usually needed.',how:'Start with a topic sentence that names both points. For each point: list it, describe the evidence, explain why it matters to the question. Use the source at least twice.',
  checks:['My first sentence names both points.','Each point has evidence.','I used the source at least twice, if a source was given.','I used my own knowledge: a date, a name, a term or a figure.','For each point I said why it matters to the question.']},
 {t:'Analyse',m:'6 to 10 marks',own:'Own knowledge is almost always needed.',how:'Answer as for explain. A 10 mark question may need a third point.',
  checks:['My first sentence names my points.','Each point has evidence.','I used the source at least twice, if a source was given.','I used my own knowledge: a date, a name, a term or a figure.','For each point I said why it matters to the question.']},
 {t:'Evaluate',m:'8 to 10 marks, or the 20 mark essay',own:'Own knowledge is almost always needed.',how:'Make a judgement about which factor mattered more. Your topic sentence must name the more significant factor. Weigh the second point against the first.',
  checks:['My contention says which factor mattered most.','Each paragraph has a clear point and evidence.','I weighed the other factors against my main one.','I used specific evidence: dates, names, figures or the view of a historian.','My conclusion returns to the question.']}
];
var TERM={};TERMS.forEach(function(t){TERM[t.t]=t;});
var KINDS={
 a:{fields:[['Your answer',6]]},
 wsp:{fields:[['Two words: your two points',1],['One sentence: your topic sentence',2],['One paragraph: your full answer with evidence',7]],
  checks:['My two words are two different points.','My sentence names both points and answers the question.','My paragraph gives evidence for each point: a date, a figure, a name or a quote.','I said why each point matters to the question.']},
 sowhat:{fields:[['Cause',2],['Effect',2],['So what? Why it matters and what it led to',4]],
  checks:['My cause is what made the event happen.','My effect is what changed straight away.','My last box says why the event matters and what it led to later.','I used one specific piece of evidence.']},
 plan:{fields:[['Contention: your answer to the question in one sentence',2],['Point 1 and the evidence for it',3],['Point 2 and the evidence for it',3],['Point 3 and the evidence for it',3]],
  checks:['My contention takes a clear position on the question.','Each point is different from the others.','Each point has specific evidence: a date, a figure, a name or the view of a historian.','I weighed my main factor against the other factors.']}
};

/* ---------- state ---------- */
var KEY='modern-history-v2';
function fresh(){return {coins:30,owned:{},L:{},guests:0,best:{},ev:1};}
var S=fresh();
function load(){try{var r=localStorage.getItem(KEY);if(r){var o=JSON.parse(r);if(o&&typeof o==='object'){var f=fresh();for(var k in f){if(o[k]!==undefined)f[k]=o[k];}S=f;}}}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function LS(id){return S.L[id]||(S.L[id]={q:{},e:{},p:{},o:0,s:{},r:'',done:false});}
function $(id){return document.getElementById(id);}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!==undefined)e.innerHTML=html;return e;}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function norm(s){return String(s).toLowerCase().replace(/[^a-z0-9]/g,'');}
function mins(marks){return marks===20?38:Math.round(marks*1.8*2)/2;}
function fmt(sec){var m=Math.floor(sec/60),s=sec%60;return m+':'+(s<10?'0':'')+s;}
function byId(id){for(var i=0;i<LESSONS.length;i++)if(LESSONS[i].id===id)return LESSONS[i];return null;}
function blockOf(l){return +l.id.split('.')[0];}
function blockLessons(n){return LESSONS.filter(function(l){return blockOf(l)===n;});}
function isMC(q){return Array.isArray(q);}
function right(q,a){if(a===undefined)return false;return isMC(q)?a===q[1]:q.a.map(norm).indexOf(norm(a))>=0;}

function addCoins(n){S.coins+=n;save();paintCoins(true);paintShopButtons();}
function paintCoins(bump){$('coinN').textContent=S.coins;if(bump){var c=$('coins');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');}}

/* ---------- progress ---------- */
function lessonDone(l){
 var st=LS(l.id),i;
 if(l.quiz)for(i=0;i<l.quiz.length;i++)if(st.q[i]===undefined)return false;
 if(l.practice)for(i=0;i<l.practice.length;i++)if(!(st.p[i]&&st.p[i].done))return false;
 if(l.order&&!st.o)return false;
 return true;
}
function doneCount(){var n=0;LESSONS.forEach(function(l){if(LS(l.id).done)n++;});return n;}
function guestsFor(n){var g=0;for(var i=0;i<GUEST_AT.length;i++)if(n>=GUEST_AT[i])g=i+1;return g;}
function checkProgress(l){
 var st=LS(l.id);
 if(st.done||!lessonDone(l))return;
 st.done=true;
 var g=guestsFor(doneCount()),newGuest=g>S.guests;
 if(newGuest)S.guests=g;
 save();paintParty(newGuest?'guest':null);
 var bar=$('donebar');
 if(bar){bar.textContent='Lesson finished.'+(newGuest?' A new guest has arrived at the party.':'');bar.classList.add('on');}
}

/* ---------- party ---------- */
function paintParty(popId){
 var items=document.querySelectorAll('#scene [data-item]'),i;
 for(i=0;i<items.length;i++){var id=items[i].getAttribute('data-item');items[i].classList.toggle('on',!!S.owned[id]);if(id===popId)pop(items[i]);}
 var gs=document.querySelectorAll('#scene [data-guest]');
 for(i=0;i<gs.length;i++){var n=+gs[i].getAttribute('data-guest'),was=gs[i].classList.contains('on');gs[i].classList.toggle('on',n<=S.guests);if(!was&&n<=S.guests&&popId==='guest')pop(gs[i]);}
 $('guestN').textContent=S.guests;
 var c=0;for(var k in S.owned)if(S.owned[k])c++;$('ownN').textContent=c;
 var d=doneCount();$('doneN').textContent=d;$('allN').textContent=LESSONS.length;
 var nx='';if(S.guests<GUEST_AT.length){var need=GUEST_AT[S.guests]-d;nx='Next guest after '+need+' more lesson'+(need===1?'':'s');}
 $('nextGuest').textContent=nx;
}
function pop(node){node.classList.remove('pop');void node.getBoundingClientRect();node.classList.add('pop');}
function buildShop(){
 var box=$('shop');box.innerHTML='';
 SHOP.forEach(function(it){var d=el('div','shop-item');d.id='shop-'+it.id;d.innerHTML='<h3>'+esc(it.name)+'</h3><p>'+esc(it.blurb)+'</p><div class="act"></div>';box.appendChild(d);});
 paintShopButtons();
}
function paintShopButtons(){
 SHOP.forEach(function(it){
  var act=document.querySelector('#shop-'+it.id+' .act');if(!act)return;
  if(S.owned[it.id]){if(!act.querySelector('.owned'))act.innerHTML='<div class="owned">At the party</div>';return;}
  var b=act.querySelector('button');
  if(!b){act.innerHTML='';b=el('button','btn');b.type='button';b.style.width='100%';b.addEventListener('click',function(){buy(it);});act.appendChild(b);}
  var can=S.coins>=it.price;b.disabled=!can;
  b.textContent=can?('Buy for '+it.price+' coins'):(it.price+' coins. You need '+(it.price-S.coins)+' more');
 });
}
function buy(it){
 if(S.owned[it.id]||S.coins<it.price)return;
 S.coins-=it.price;S.owned[it.id]=true;save();paintCoins(true);paintShopButtons();paintParty(it.id);
}

/* ---------- lesson list ---------- */
function buildJump(box,pressed,fn){
 box.innerHTML='';
 BLOCKS.forEach(function(b){var x=el('button','',String(b.n));x.type='button';x.setAttribute('aria-label','Block '+b.n+': '+b.title);
  if(pressed!==null)x.setAttribute('aria-pressed',pressed===b.n?'true':'false');
  x.addEventListener('click',function(){fn(b.n);});box.appendChild(x);});
}
function buildLessons(){
 var box=$('lessonList');box.innerHTML='';var unit=0;
 BLOCKS.forEach(function(b){
  if(b.unit!==unit){unit=b.unit;box.appendChild(el('h2','unit','Unit '+unit+': '+esc(b.unitTitle)));}
  var ls=blockLessons(b.n),dn=ls.filter(function(l){return LS(l.id).done;}).length;
  var d=el('div','block');d.id='block-'+b.n;
  d.innerHTML='<div class="block-head"><h3>Block '+b.n+'</h3><span class="prog">'+dn+' of '+ls.length+' finished</span></div><p class="for"><b style="color:var(--ink)">'+esc(b.title)+'.</b> '+esc(b.prep)+'.</p>';
  var bb=el('div','blockbtns'),qf=el('button','btn ghost sm','Quick-fire round'+(S.best[b.n]?' (best '+S.best[b.n]+')':''));qf.type='button';
  qf.addEventListener('click',function(){go('dash-'+b.n);});bb.appendChild(qf);d.appendChild(bb);
  ls.forEach(function(l){
   var st=LS(l.id),row=el('button','lrow');row.type='button';
   row.innerHTML='<span class="no">'+l.id+'</span><span class="ti">'+esc(l.t)+'</span><span class="dot '+(st.r||'')+'" aria-hidden="true"></span><span class="tick">'+(st.done?'✓':'')+'</span>';
   row.setAttribute('aria-label','Lesson '+l.id+': '+l.t+(st.done?', finished':''));
   row.addEventListener('click',function(){go('lesson-'+l.id.replace('.','-'));});
   d.appendChild(row);
  });
  box.appendChild(d);
 });
}
function jumpToBlock(n){var b=$('block-'+n);if(!b)return;var y=b.getBoundingClientRect().top+window.scrollY-$('top').offsetHeight-8;window.scrollTo(0,y);}

/* ---------- lesson ---------- */
function paras(arr){
 var h='',inList=false;
 arr.forEach(function(p){
  if(p.indexOf('• ')===0){if(!inList){h+='<ul>';inList=true;}h+='<li>'+p.slice(2)+'</li>';}
  else{if(inList){h+='</ul>';inList=false;}h+='<p>'+p+'</p>';}
 });
 if(inList)h+='</ul>';return h;
}
function sourceCard(id){
 var s=SRC[id];if(!s)return null;
 var d=el('div','source'),h='<p class="who">'+esc(s.who)+'</p>';
 if(s.img)h+='<img class="srcimg" src="'+s.img+'" alt="'+esc(s.alt||'')+'">';
 if(s.text)h+='<blockquote>'+s.text+'</blockquote>';
 if(s.desc)h+='<p class="desc">'+s.desc+'</p>';
 if(s.note)h+='<p class="note">'+esc(s.note)+'</p>';
 d.innerHTML=h;return d;
}
function renderLesson(l){
 var box=$('lessonBody');box.innerHTML='';
 var st=LS(l.id),b=BLOCKS[blockOf(l)-1],idx=LESSONS.indexOf(l);
 var back=el('button','back','‹ All lessons');back.type='button';back.addEventListener('click',function(){go('lessons');});box.appendChild(back);
 box.appendChild(el('p','eyebrow','Block '+b.n+' · Lesson '+l.id));
 box.appendChild(el('h1','ltitle',esc(l.t)));
 (l.cards||[]).forEach(function(c){box.appendChild(el('div','card','<h3>'+c[0]+'</h3>'+paras(c.slice(1))));});
 if(l.facts&&l.facts.length){
  var fh='<h3>Facts to remember</h3><ul class="facts">';
  l.facts.forEach(function(f){fh+='<li><b>'+f[1]+'</b><span>'+f[0]+'</span></li>';});
  box.appendChild(el('div','card',fh+'</ul>'));
 }
 if(l.sort)buildSort(box,l,st);
 if(l.order)buildOrder(box,l,st);
 if(l.quiz&&l.quiz.length)buildQuiz(box,l,st);
 if(l.practice&&l.practice.length)buildPractice(box,l,st);
 box.appendChild(el('h2','sec','How well do you know this lesson?'));
 box.appendChild(el('p','lead','Red means you need to revise before answering anything. Orange means you could answer some questions. Green means you could answer any question on it.'));
 var rate=el('div','rate');
 [['red','r','Red'],['orange','o','Orange'],['green','g','Green']].forEach(function(r){
  var x=el('button',r[1],r[2]);x.type='button';x.setAttribute('aria-pressed',st.r===r[0]?'true':'false');
  x.addEventListener('click',function(){st.r=r[0];save();var bs=rate.querySelectorAll('button');for(var i=0;i<bs.length;i++)bs[i].setAttribute('aria-pressed',bs[i]===x?'true':'false');});
  rate.appendChild(x);
 });
 box.appendChild(rate);
 var bar=el('div','donebar',st.done?'Lesson finished.':'');bar.id='donebar';if(st.done)bar.classList.add('on');box.appendChild(bar);
 var nav=el('div','lnav');
 if(idx>0){var pv=el('button','btn ghost','‹ '+LESSONS[idx-1].id);pv.type='button';pv.addEventListener('click',function(){go('lesson-'+LESSONS[idx-1].id.replace('.','-'));});nav.appendChild(pv);}
 if(idx<LESSONS.length-1){var nx=el('button','btn','Next: '+LESSONS[idx+1].id+' ›');nx.type='button';nx.addEventListener('click',function(){go('lesson-'+LESSONS[idx+1].id.replace('.','-'));});nav.appendChild(nx);}
 box.appendChild(nav);
}
function buildSort(box,l,st){
 box.appendChild(el('h2','sec','Sort'));
 box.appendChild(el('p','lead',esc(l.sort.t)+' This is practice and earns no coins.'));
 var q=el('div','q');
 l.sort.items.forEach(function(it,i){
  var row=el('div','sortrow');row.innerHTML='<span class="st">'+esc(it[0])+'</span><span class="sb"></span>';
  var sb=row.querySelector('.sb');
  function paint(ch){var bs=sb.querySelectorAll('button');for(var k=0;k<bs.length;k++){var c=bs[k].getAttribute('data-c');bs[k].className='';if(c===ch)bs[k].className=(c===it[1]?'right':'wrong');bs[k].disabled=(ch===it[1]);}}
  l.sort.cats.forEach(function(c){var x=el('button','',esc(c[1]));x.type='button';x.setAttribute('data-c',c[0]);
   x.addEventListener('click',function(){st.s[i]=c[0];save();paint(c[0]);});sb.appendChild(x);});
  q.appendChild(row);if(st.s[i])paint(st.s[i]);
 });
 box.appendChild(q);
}
function buildOrder(box,l,st){
 box.appendChild(el('h2','sec','Put in order'));
 box.appendChild(el('p','lead',esc(l.order.t)+' Use the arrows, then check. A correct order earns 5 coins.'));
 var q=el('div','q'),list=el('div'),msg=el('p','small'),items=st.o?l.order.items.slice():shuffle(l.order.items);
 if(!st.o&&items.join('|')===l.order.items.join('|')&&items.length>1){var t=items[0];items[0]=items[1];items[1]=t;}
 function draw(){
  list.innerHTML='';
  items.forEach(function(t,i){
   var row=el('div','orow'+(st.o?' ok':''));row.innerHTML='<span class="ot">'+esc(t)+'</span>';
   if(!st.o){
    var up=el('button','','↑'),dn=el('button','','↓');up.type=dn.type='button';up.setAttribute('aria-label','Move up');dn.setAttribute('aria-label','Move down');
    up.disabled=i===0;dn.disabled=i===items.length-1;
    up.addEventListener('click',function(){var x=items[i-1];items[i-1]=items[i];items[i]=x;draw();});
    dn.addEventListener('click',function(){var x=items[i+1];items[i+1]=items[i];items[i]=x;draw();});
    row.appendChild(up);row.appendChild(dn);
   }
   list.appendChild(row);
  });
 }
 draw();q.appendChild(list);
 var chk=el('button','btn','Check the order');chk.type='button';chk.style.marginTop='10px';
 chk.addEventListener('click',function(){
  var ok=0;items.forEach(function(t,i){if(t===l.order.items[i])ok++;});
  if(ok===items.length){st.o=1;save();addCoins(5);draw();chk.style.display='none';msg.textContent='Correct order. You earned 5 coins.';checkProgress(l);}
  else msg.textContent='Not yet. '+ok+' of '+items.length+' are in the right place.';
 });
 if(st.o){chk.style.display='none';msg.textContent='Correct order.';}
 q.appendChild(chk);q.appendChild(msg);box.appendChild(q);
}
function buildQuiz(box,l,st){
 box.appendChild(el('h2','sec','Recall quiz'));
 box.appendChild(el('p','lead',l.quiz.length+' questions. Each correct answer earns 5 coins the first time.'));
 var wrap=el('div'),doneP=el('p','small');
 function reward(i,ok){if(ok&&!st.e[i]){st.e[i]=1;save();addCoins(5);return ' You earned 5 coins.';}return '';}
 function paintDone(){
  var n=0,r=0;l.quiz.forEach(function(q,i){if(st.q[i]!==undefined){n++;if(right(q,st.q[i]))r++;}});
  doneP.innerHTML='';
  if(n<l.quiz.length){doneP.textContent=n?('Answered '+n+' of '+l.quiz.length+'.'):'';return;}
  doneP.appendChild(document.createTextNode('Quiz finished: '+r+' of '+l.quiz.length+' correct. '));
  var again=el('button','btn ghost sm','Try the quiz again');again.type='button';
  again.addEventListener('click',function(){st.q={};save();draw();});doneP.appendChild(again);
 }
 function draw(){
  wrap.innerHTML='';
  l.quiz.forEach(function(q,i){
   var d=el('div','q');d.id='quiz-'+l.id.replace('.','-')+'-'+i;
   d.innerHTML='<div class="qn">Question '+(i+1)+' of '+l.quiz.length+'</div><div class="qt">'+esc(isMC(q)?q[0]:q.q)+'</div>';
   var fb=el('div','fb');fb.style.display='none';
   function feedback(ans,extra){
    var ok=right(q,ans),corr=isMC(q)?q[1]:q.show,why=isMC(q)?q[q.length-1]:q.why;
    fb.className='fb '+(ok?'ok':'no');fb.style.display='block';
    fb.innerHTML='<b>'+(ok?'Correct.':'Not correct. The answer is '+esc(corr)+'.')+(extra||'')+'</b>'+esc(why||'');
   }
   if(isMC(q)){
    var ow=el('div','opts'),opts=shuffle(q.slice(1,q.length-1));
    var paintMC=function(ans,extra){var bs=ow.querySelectorAll('button');for(var k=0;k<bs.length;k++){bs[k].disabled=true;var t=bs[k].getAttribute('data-t');if(t===q[1])bs[k].classList.add('right');else if(t===ans)bs[k].classList.add('wrong');}feedback(ans,extra);};
    opts.forEach(function(t){var x=el('button','',esc(t));x.type='button';x.setAttribute('data-t',t);
     x.addEventListener('click',function(){if(st.q[i]!==undefined)return;st.q[i]=t;save();paintMC(t,reward(i,t===q[1]));paintDone();checkProgress(l);});ow.appendChild(x);});
    d.appendChild(ow);d.appendChild(fb);if(st.q[i]!==undefined)paintMC(st.q[i]);
   }else{
    var f=el('form','typed');f.setAttribute('autocomplete','off');
    f.innerHTML='<input type="text" id="in-'+l.id.replace('.','-')+'-'+i+'" aria-label="Your answer" autocapitalize="off" autocorrect="off"><button type="submit" class="btn">Check</button>';
    var paintT=function(v,extra){var inp=f.querySelector('input');inp.value=v;inp.readOnly=true;f.querySelector('button').disabled=true;feedback(v,extra);};
    f.addEventListener('submit',function(e){e.preventDefault();var v=f.querySelector('input').value;if(!v.trim()||st.q[i]!==undefined)return;st.q[i]=v;save();paintT(v,reward(i,right(q,v)));paintDone();checkProgress(l);});
    d.appendChild(f);d.appendChild(fb);if(st.q[i]!==undefined)paintT(st.q[i]);
   }
   wrap.appendChild(d);
  });
  paintDone();
 }
 draw();box.appendChild(wrap);box.appendChild(doneP);
}
function buildPractice(box,l,st){
 box.appendChild(el('h2','sec','Written practice'));
 box.appendChild(el('p','lead','Write your answer, then mark it against the model answer and the checklist. Marking an answer earns 10 coins.'));
 l.practice.forEach(function(p,i){
  var ps=st.p[i]||(st.p[i]={f:{},shown:false,checks:{},done:false});
  if(p.src){var sc=sourceCard(p.src);if(sc)box.appendChild(sc);}
  var kind=KINDS[p.kind||'a'],term=p.term?TERM[p.term]:null,checks=p.checks||kind.checks||(term?term.checks:['I answered the question that was asked.','I used specific evidence.']);
  var d=el('div','q'),pid=l.id.replace('.','-')+'-'+i,h='';
  if(p.term)h+='<span class="chip">'+p.term+'</span>';
  if(p.marks)h+='<span class="chip">'+p.marks+' marks</span><span class="chip">about '+mins(p.marks)+' minutes</span>';
  h+='<div class="qt">'+esc(p.q)+'</div>';
  var tip=p.tip||(term&&!p.kind?term.how:'');if(tip)h+='<p class="small" style="margin:0 0 10px">'+esc(tip)+'</p>';
  d.innerHTML=h;
  kind.fields.forEach(function(f,k){
   var lab=el('label','field');lab.setAttribute('for','ta-'+pid+'-'+k);
   lab.innerHTML='<span>'+f[0]+'</span><textarea id="ta-'+pid+'-'+k+'" rows="'+f[1]+'"></textarea>';
   var ta=lab.querySelector('textarea');ta.value=ps.f[k]||'';ta.addEventListener('input',function(){ps.f[k]=ta.value;save();});
   d.appendChild(lab);
  });
  if(p.marks){
   var pr=el('div','prow'),tb=el('button','btn ghost','Start '+mins(p.marks)+' minute timer'),to=el('span','timer'),tid=null,left=0;tb.type='button';
   tb.addEventListener('click',function(){
    if(tid){clearInterval(tid);tid=null;to.textContent='';tb.textContent='Start '+mins(p.marks)+' minute timer';return;}
    left=Math.round(mins(p.marks)*60);to.textContent=fmt(left);tb.textContent='Stop timer';
    tid=setInterval(function(){left--;if(!document.body.contains(tb)){clearInterval(tid);return;}if(left<=0){clearInterval(tid);tid=null;to.textContent='Time is up. Finish your sentence.';tb.textContent='Start '+mins(p.marks)+' minute timer';}else to.textContent=fmt(left);},1000);
   });
   pr.appendChild(tb);pr.appendChild(to);d.appendChild(pr);
  }
  var pr2=el('div','prow'),sb=el('button','btn','Show model answer and checklist');sb.type='button';pr2.appendChild(sb);d.appendChild(pr2);
  var model=el('div','model'+(ps.shown?' on':''));
  model.innerHTML='<div class="card"><h3>'+(p.kind==='plan'?'Model plan':'Model answer')+'</h3>'+p.model+'</div>';
  var cw=el('div','checks');
  checks.forEach(function(c,k){var id='ck-'+pid+'-'+k,lb=el('label','check');lb.setAttribute('for',id);lb.innerHTML='<input type="checkbox" id="'+id+'"><span>'+esc(c)+'</span>';
   var cb=lb.querySelector('input');cb.checked=!!ps.checks[k];cb.addEventListener('change',function(){ps.checks[k]=cb.checked;save();});cw.appendChild(lb);});
  model.appendChild(cw);
  var pr3=el('div','prow'),db=el('button','btn','I have marked my answer'),msg=el('span','small');db.type='button';
  if(ps.done){db.disabled=true;msg.textContent='Marked. You earned 10 coins for this answer.';}
  db.addEventListener('click',function(){if(ps.done)return;ps.done=true;save();addCoins(10);db.disabled=true;msg.textContent='Marked. You earned 10 coins for this answer.';checkProgress(l);});
  pr3.appendChild(db);pr3.appendChild(msg);model.appendChild(pr3);d.appendChild(model);
  sb.addEventListener('click',function(){ps.shown=true;save();model.classList.add('on');});
  box.appendChild(d);
 });
}

/* ---------- quick-fire round ---------- */
var dashTimer=null;
function renderDash(n){
 var box=$('dashBody');box.innerHTML='';if(dashTimer){clearInterval(dashTimer);dashTimer=null;}
 var b=BLOCKS[n-1];if(!b){go('lessons');return;}
 var pool=[];blockLessons(n).forEach(function(l){(l.quiz||[]).forEach(function(q){if(isMC(q))pool.push(q);});});
 var back=el('button','back','‹ All lessons');back.type='button';back.addEventListener('click',function(){go('lessons');});box.appendChild(back);
 box.appendChild(el('p','eyebrow','Block '+n+' · Quick-fire round'));
 box.appendChild(el('h1','ltitle',esc(b.title)));
 var d=el('div','dash');box.appendChild(d);
 function intro(msg){
  d.innerHTML=(msg||'')+'<p>Answer as many questions as you can in 60 seconds. Each correct answer earns 1 coin, up to 10 coins a round.</p><p class="small">Your best score for this block: '+(S.best[n]||0)+'</p>';
  var go1=el('button','btn','Start');go1.type='button';go1.addEventListener('click',run);d.appendChild(go1);
 }
 function run(){
  var left=60,score=0,qs=shuffle(pool),qi=0;
  d.innerHTML='<span class="score">Score <span id="dScore">0</span></span><div class="clock" id="dClock">1:00</div><div class="qt" id="dQ" style="margin-top:12px"></div><div class="opts" id="dO"></div>';
  function next(){
   if(qi>=qs.length){qs=shuffle(pool);qi=0;}
   var q=qs[qi++];$('dQ').textContent=q[0];var o=$('dO');o.innerHTML='';
   shuffle(q.slice(1,q.length-1)).forEach(function(t){var x=el('button','',esc(t));x.type='button';
    x.addEventListener('click',function(){if(t===q[1]){score++;$('dScore').textContent=score;}next();});o.appendChild(x);});
  }
  next();
  dashTimer=setInterval(function(){
   left--;var c=$('dClock');if(!c){clearInterval(dashTimer);dashTimer=null;return;}
   c.textContent=fmt(left);
   if(left<=0){clearInterval(dashTimer);dashTimer=null;
    var coins=Math.min(10,score),best=score>(S.best[n]||0);if(best)S.best[n]=score;save();if(coins)addCoins(coins);
    intro('<p><b>Time is up. You scored '+score+'.</b> You earned '+coins+' coin'+(coins===1?'':'s')+'.'+(best?' That is a new best score.':'')+'</p>');}
  },1000);
 }
 if(!pool.length){d.innerHTML='<p>This block has no quick-fire questions.</p>';return;}
 intro();
}

/* ---------- evidence bank ---------- */
function buildEvidence(){
 buildJump($('evJump'),S.ev,function(n){S.ev=n;save();buildEvidence();});
 var box=$('evList');box.innerHTML='';var b=BLOCKS[S.ev-1];
 box.appendChild(el('p','eyebrow','Block '+b.n));box.appendChild(el('h2','sec',esc(b.title)));
 blockLessons(S.ev).forEach(function(l){
  (l.facts||[]).forEach(function(f){
   var x=el('button','ev');x.type='button';x.setAttribute('aria-expanded','false');
   x.innerHTML='<span class="p">'+f[0]+'</span><span class="a">Press to show the answer</span>';
   x.addEventListener('click',function(){var on=x.getAttribute('aria-expanded')!=='true';x.setAttribute('aria-expanded',on?'true':'false');x.querySelector('.a').innerHTML=on?f[1]:'Press to show the answer';});
   box.appendChild(x);
  });
 });
}

/* ---------- command terms ---------- */
function buildTerms(){
 var box=$('ctList');box.innerHTML='';
 TERMS.forEach(function(t){var d=el('div','ct');d.innerHTML='<div class="ct-head"><h3>'+t.t+'</h3><span>'+t.m+'</span></div><p>'+esc(t.how)+'</p><p class="own">'+esc(t.own)+'</p>';box.appendChild(d);});
 var r=$('marks');
 function paint(){var m=+r.value;$('marksN').textContent=m;$('mins').textContent=mins(m)+' minutes';}
 r.addEventListener('input',paint);paint();
}

/* ---------- views ---------- */
var cur=null,scrolls={};
function viewFor(name){
 if(name.indexOf('lesson-')===0)return 'v-lesson';
 if(name.indexOf('dash-')===0)return 'v-dash';
 return 'v-'+name;
}
function valid(name){
 if(['party','lessons','evidence','command-terms'].indexOf(name)>=0)return true;
 if(name.indexOf('lesson-')===0)return !!byId(name.slice(7).replace('-','.'));
 if(name.indexOf('dash-')===0)return !!BLOCKS[+name.slice(5)-1];
 return false;
}
function show(name){
 if(!valid(name))name='party';
 if(name===cur)return;
 if(cur)scrolls[cur]=window.scrollY;
 if(dashTimer){clearInterval(dashTimer);dashTimer=null;}
 if(name==='lessons')buildLessons();
 if(name==='evidence')buildEvidence();
 if(name.indexOf('lesson-')===0)renderLesson(byId(name.slice(7).replace('-','.')));
 if(name.indexOf('dash-')===0)renderDash(+name.slice(5));
 var vs=document.querySelectorAll('.view'),v=viewFor(name);
 for(var i=0;i<vs.length;i++)vs[i].classList.toggle('on',vs[i].id===v);
 var tabs=document.querySelectorAll('.tabs button');
 for(i=0;i<tabs.length;i++){var g=tabs[i].getAttribute('data-go');var on=(g===name)||(g==='lessons'&&(v==='v-lesson'||v==='v-dash'));if(on)tabs[i].setAttribute('aria-current','page');else tabs[i].removeAttribute('aria-current');}
 cur=name;
 window.scrollTo(0,scrolls[name]||0);
}
function go(name){if(location.hash.slice(1)!==name){try{location.hash=name;}catch(e){}}show(name);}
function measure(){document.documentElement.style.setProperty('--top-h',$('top').offsetHeight+'px');}

function start(){
 load();
 LESSONS.forEach(function(l){var st=LS(l.id);if(!st.done&&lessonDone(l)&&(l.quiz||l.practice||l.order)&&Object.keys(st.q).length)st.done=true;});
 window.MHScene.build($('scene'));paintParty();buildShop();paintCoins(false);buildTerms();
 buildJump($('jump'),null,jumpToBlock);
 var gos=document.querySelectorAll('.tabs [data-go]');
 for(var i=0;i<gos.length;i++)(function(b){b.addEventListener('click',function(){go(b.getAttribute('data-go'));});})(gos[i]);
 $('protoCoins').addEventListener('click',function(){addCoins(500);});
 var armed=false,rb=$('protoReset');
 rb.addEventListener('click',function(){
  if(!armed){armed=true;rb.textContent='Press again to erase all progress';setTimeout(function(){armed=false;rb.textContent='Start again';},5000);return;}
  armed=false;rb.textContent='Start again';S=fresh();save();scrolls={};paintParty();buildShop();paintCoins(false);
 });
 window.addEventListener('hashchange',function(){show(location.hash.slice(1)||'party');});
 window.addEventListener('resize',measure);
 measure();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
 show(location.hash.slice(1)||'party');
}
start();
})();
