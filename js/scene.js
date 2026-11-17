(function(){
'use strict';
/* ---------- ballroom scene ---------- */
function flapper(x,y,dress,hair,skin){
 return '<g class="guest"><line x1="'+(x-3)+'" y1="'+(y-14)+'" x2="'+(x-3)+'" y2="'+y+'" stroke="'+skin+'" stroke-width="2.4"/><line x1="'+(x+3)+'" y1="'+(y-14)+'" x2="'+(x+3)+'" y2="'+y+'" stroke="'+skin+'" stroke-width="2.4"/>'+
 '<polygon points="'+(x-7)+','+(y-41)+' '+(x+7)+','+(y-41)+' '+(x+10)+','+(y-13)+' '+(x-10)+','+(y-13)+'" fill="'+dress+'"/>'+
 '<line x1="'+(x-10)+'" y1="'+(y-13)+'" x2="'+(x+10)+'" y2="'+(y-13)+'" stroke="#dab65c" stroke-width="2" stroke-dasharray="1.5 1.5"/>'+
 '<line x1="'+(x+6)+'" y1="'+(y-38)+'" x2="'+(x+14)+'" y2="'+(y-47)+'" stroke="'+skin+'" stroke-width="2.2" stroke-linecap="round"/>'+
 '<polygon points="'+(x+11)+','+(y-52)+' '+(x+18)+','+(y-52)+' '+(x+14.5)+','+(y-48)+'" fill="#f7e7a8"/>'+
 '<circle cx="'+x+'" cy="'+(y-48)+'" r="6.2" fill="'+skin+'"/>'+
 '<path d="M'+(x-6.8)+' '+(y-47)+' a6.8 6.8 0 0 1 13.6 0 v4 h-2.4 v-4 h-8.8 v4 h-2.4 z" fill="'+hair+'"/>'+
 '<line x1="'+(x-6)+'" y1="'+(y-50.5)+'" x2="'+(x+6)+'" y2="'+(y-50.5)+'" stroke="#dab65c" stroke-width="1.6"/></g>';
}
function gent(x,y,hair,skin){
 return '<g class="guest"><rect x="'+(x-5.5)+'" y="'+(y-22)+'" width="4.6" height="22" fill="#2a2f45"/><rect x="'+(x+.9)+'" y="'+(y-22)+'" width="4.6" height="22" fill="#2a2f45"/>'+
 '<rect x="'+(x-7.5)+'" y="'+(y-42)+'" width="15" height="21" rx="2" fill="#f4ecd8"/>'+
 '<polygon points="'+(x-3)+','+(y-42)+' '+(x+3)+','+(y-42)+' '+x+','+(y-33)+'" fill="#fff"/>'+
 '<polygon points="'+(x-3.2)+','+(y-42.6)+' '+x+','+(y-40.8)+' '+(x+3.2)+','+(y-42.6)+' '+(x+3.2)+','+(y-39)+' '+x+','+(y-40.8)+' '+(x-3.2)+','+(y-39)+'" fill="#12162a"/>'+
 '<line x1="'+(x-7)+'" y1="'+(y-38)+'" x2="'+(x-14)+'" y2="'+(y-46)+'" stroke="#f4ecd8" stroke-width="3" stroke-linecap="round"/>'+
 '<polygon points="'+(x-18)+','+(y-51)+' '+(x-11)+','+(y-51)+' '+(x-14.5)+','+(y-47)+'" fill="#f7e7a8"/>'+
 '<circle cx="'+x+'" cy="'+(y-49)+'" r="6" fill="'+skin+'"/>'+
 '<path d="M'+(x-6.3)+' '+(y-49.5)+' a6.3 6.3 0 0 1 12.6 0 z" fill="'+hair+'"/></g>';
}
function player(x,y,skin,kind){
 var s='<rect x="'+(x-4)+'" y="'+(y-13)+'" width="8" height="13" fill="#2a2f45"/><rect x="'+(x-5.5)+'" y="'+(y-29)+'" width="11" height="17" rx="1.5" fill="#f4ecd8"/><circle cx="'+x+'" cy="'+(y-34)+'" r="4.8" fill="'+skin+'"/><path d="M'+(x-5)+' '+(y-34.5)+' a5 5 0 0 1 10 0 z" fill="#1c1410"/>';
 if(kind==='sax')s+='<path d="M'+(x+3)+' '+(y-30)+' q7 8 3 17 q-1 5 5 3" fill="none" stroke="#dab65c" stroke-width="2.8" stroke-linecap="round"/>';
 if(kind==='bass')s+='<line x1="'+(x+9)+'" y1="'+(y-40)+'" x2="'+(x+9)+'" y2="'+(y-10)+'" stroke="#6b3f1f" stroke-width="2"/><ellipse cx="'+(x+9)+'" cy="'+(y-11)+'" rx="5.5" ry="9.5" fill="#8a5527"/><line x1="'+(x+9)+'" y1="'+(y-20)+'" x2="'+(x+9)+'" y2="'+(y-3)+'" stroke="#f4ecd8" stroke-width=".6"/>';
 if(kind==='drum')s+='<circle cx="'+(x+10)+'" cy="'+(y-8)+'" r="7.5" fill="#f4ecd8" stroke="#e07a8b" stroke-width="2"/><line x1="'+(x+5)+'" y1="'+(y-22)+'" x2="'+(x+9)+'" y2="'+(y-14)+'" stroke="#dab65c" stroke-width="1.4"/>';
 return s;
}
function palm(x){
 var s='<line x1="'+x+'" y1="176" x2="'+x+'" y2="160" stroke="#2c6e4a" stroke-width="2"/>';
 [-62,-32,0,32,62].forEach(function(a){s+='<ellipse cx="'+x+'" cy="146" rx="3.6" ry="17" fill="#3b9b6b" transform="rotate('+a+' '+x+' 164)"/>';});
 return s+'<polygon points="'+(x-8)+',176 '+(x+8)+',176 '+(x+5.5)+',190 '+(x-5.5)+',190" fill="#dab65c"/><rect x="'+(x-9)+'" y="174" width="18" height="3" fill="#f4ecd8"/>';
}
function windowArch(x){
 return '<path d="M'+x+' 150 V84 a18 18 0 0 1 36 0 V150 Z" fill="url(#sky)" stroke="#dab65c" stroke-width="2"/><line x1="'+(x+18)+'" y1="66" x2="'+(x+18)+'" y2="150" stroke="#dab65c" stroke-width="1"/><line x1="'+x+'" y1="108" x2="'+(x+36)+'" y2="108" stroke="#dab65c" stroke-width="1"/>'+
 '<circle class="twinkle" cx="'+(x+9)+'" cy="92" r="1" fill="#fff"/><circle class="twinkle" cx="'+(x+27)+'" cy="124" r="1" fill="#fff"/><circle class="twinkle" cx="'+(x+26)+'" cy="82" r=".8" fill="#fff"/>';
}
function buildScene(host){
 var i,s='<svg class="scene" viewBox="0 0 360 240" role="img" aria-label="An Art Deco ballroom at night. Items bought in the shop appear here.">';
 s+='<defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2f5e"/><stop offset="1" stop-color="#101b38"/></linearGradient>'+
 '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1c"/><stop offset="1" stop-color="#2b3a78"/></linearGradient>'+
 '<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2f1b"/><stop offset="1" stop-color="#27170c"/></linearGradient>'+
 '<radialGradient id="glow"><stop offset="0" stop-color="#ffe9a6" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></radialGradient>'+
 '<clipPath id="arch"><path d="M130 190 V105 a50 50 0 0 1 100 0 V190 Z"/></clipPath></defs>';
 s+='<rect width="360" height="190" fill="url(#wall)"/>';
 /* sunburst over the terrace doors */
 for(i=200;i<=340;i+=14){var a=i*Math.PI/180;s+='<line x1="'+(180+56*Math.cos(a)).toFixed(1)+'" y1="'+(105+56*Math.sin(a)).toFixed(1)+'" x2="'+(180+(i%28===4?76:68)*Math.cos(a)).toFixed(1)+'" y2="'+(105+(i%28===4?76:68)*Math.sin(a)).toFixed(1)+'" stroke="#dab65c" stroke-width="1.6" opacity=".8"/>';}
 /* pilasters */
 s+='<rect x="118" y="60" width="4" height="130" fill="#dab65c" opacity=".55"/><rect x="238" y="60" width="4" height="130" fill="#dab65c" opacity=".55"/><rect x="114" y="56" width="12" height="4" fill="#dab65c" opacity=".7"/><rect x="234" y="56" width="12" height="4" fill="#dab65c" opacity=".7"/>';
 s+=windowArch(44)+windowArch(280);
 /* terrace doors */
 s+='<g clip-path="url(#arch)"><rect x="130" y="50" width="100" height="140" fill="url(#sky)"/>';
 [[142,84],[158,70],[171,96],[190,66],[216,104],[222,78],[150,112],[200,118]].forEach(function(p,k){s+='<circle class="twinkle" cx="'+p[0]+'" cy="'+p[1]+'" r="'+(k%3?1:1.4)+'" fill="#fff"/>';});
 s+='<circle cx="205" cy="84" r="8.5" fill="#f7efcf"/><circle cx="208.5" cy="81.5" r="7.5" fill="#0d1330"/>';
 s+='<rect x="130" y="176" width="100" height="14" fill="#1a2550"/>';
 s+='<g class="item" data-item="car"><rect x="144" y="151" width="66" height="13" rx="4" fill="#e07a8b"/><path d="M163 151 l4 -10 h22 l6 10 z" fill="#f4ecd8"/><rect x="169" y="143.5" width="8" height="6.5" fill="#22306a"/><rect x="179" y="143.5" width="8" height="6.5" fill="#22306a"/><rect x="141" y="160" width="72" height="3" rx="1.5" fill="#12162a"/><circle cx="158" cy="164" r="6" fill="#12162a"/><circle cx="158" cy="164" r="2.4" fill="#f4ecd8"/><circle cx="197" cy="164" r="6" fill="#12162a"/><circle cx="197" cy="164" r="2.4" fill="#f4ecd8"/><circle cx="145" cy="154" r="2.4" fill="#ffe9a6"/></g>';
 s+='<rect x="130" y="166" width="100" height="2.6" fill="#f4ecd8"/>';
 for(i=134;i<230;i+=8)s+='<rect x="'+i+'" y="168.6" width="2.6" height="10" fill="#f4ecd8"/>';
 s+='<rect x="130" y="178.6" width="100" height="2.6" fill="#f4ecd8"/></g>';
 s+='<path d="M130 190 V105 a50 50 0 0 1 100 0 V190" fill="none" stroke="#dab65c" stroke-width="3"/>';
 /* floor */
 s+='<rect y="190" width="360" height="50" fill="url(#wood)"/><rect y="189" width="360" height="2.5" fill="#dab65c"/>';
 s+='<g class="item" data-item="floor">';
 for(var r=0;r<2;r++)for(var c=0;c<10;c++)s+='<rect x="'+(80+c*20)+'" y="'+(197+r*20)+'" width="20" height="20" fill="'+((r+c)%2?'#f4ecd8':'#14110f')+'"/>';
 s+='<rect x="80" y="197" width="200" height="40" fill="none" stroke="#dab65c" stroke-width="2"/></g>';
 /* chandelier */
 s+='<g class="item" data-item="chandelier"><circle cx="180" cy="30" r="40" fill="url(#glow)"/><line x1="180" y1="0" x2="180" y2="14" stroke="#dab65c" stroke-width="2"/><polygon points="167,14 193,14 189,21 171,21" fill="#dab65c"/><polygon points="159,23 201,23 195,33 165,33" fill="#e9cd7e"/><polygon points="170,35 190,35 185,43 175,43" fill="#dab65c"/>';
 for(i=162;i<=198;i+=6)s+='<circle class="twinkle" cx="'+i+'" cy="'+(i>172&&i<188?46:36.5)+'" r="1.5" fill="#fff6d6"/>';
 s+='</g>';
 /* palms */
 s+='<g class="item" data-item="palms">'+palm(17)+palm(343)+'</g>';
 /* band */
 s+='<g class="item" data-item="band"><rect x="34" y="178" width="76" height="12" fill="#5a3a22"/><rect x="34" y="177" width="76" height="2.4" fill="#dab65c"/>'+player(46,178,'#e8b98f','sax')+player(68,178,'#8d5a3b','bass')+player(90,178,'#f0cfae','drum')+
 '<text class="note" x="52" y="140" font-size="11" fill="#dab65c">♪</text><text class="note n2" x="74" y="136" font-size="13" fill="#f4ecd8">♫</text><text class="note n3" x="98" y="142" font-size="11" fill="#e07a8b">♪</text></g>';
 /* gramophone */
 s+='<g class="item" data-item="gramophone"><rect x="252" y="180" width="2" height="10" fill="#dab65c"/><rect x="268" y="180" width="2" height="10" fill="#dab65c"/><rect x="249" y="178" width="24" height="2.6" fill="#f4ecd8"/><rect x="254" y="169" width="14" height="9" fill="#7a4a25"/><ellipse cx="261" cy="169" rx="6.5" ry="1.6" fill="#12162a"/><path d="M262 168 L259 160 L249 146 L270 149 Z" fill="#dab65c"/><path d="M252 148 L267 150 L262 156 Z" fill="#9c7a26"/></g>';
 /* champagne tower */
 s+='<g class="item" data-item="tower"><polygon points="118,176 150,176 154,190 114,190" fill="#f4ecd8"/><rect x="116" y="174" width="36" height="2.6" fill="#fff"/>';
 [[125,134,143],[129.5,138.5],[134]].forEach(function(row,k){row.forEach(function(cx){var y=166-k*8;s+='<polygon points="'+(cx-4)+','+y+' '+(cx+4)+','+y+' '+(cx+1)+','+(y+3.5)+' '+(cx-1)+','+(y+3.5)+'" fill="#f7e7a8"/><line x1="'+cx+'" y1="'+(y+3.5)+'" x2="'+cx+'" y2="'+(y+8)+'" stroke="#f7e7a8" stroke-width="1"/>';});});
 s+='<circle class="bubble" cx="132" cy="150" r="1.2" fill="#fff6d6"/><circle class="bubble b2" cx="136" cy="148" r="1" fill="#fff6d6"/><circle class="bubble b3" cx="134" cy="151" r=".9" fill="#fff6d6"/></g>';
 /* bar */
 s+='<g class="item" data-item="bar"><rect x="282" y="134" width="50" height="2.4" fill="#dab65c"/>';
 [['#3fa796',285],['#e07a8b',293],['#f7e7a8',301],['#7d5bd0',309],['#3fa796',317],['#e07a8b',325]].forEach(function(b){s+='<rect x="'+b[1]+'" y="121" width="5" height="13" rx="1" fill="'+b[0]+'"/><rect x="'+(b[1]+1.5)+'" y="117" width="2" height="5" fill="'+b[0]+'"/>';});
 s+='<rect x="278" y="160" width="58" height="30" fill="#3d2616"/><rect x="276" y="157" width="62" height="4" fill="#dab65c"/>';
 for(i=0;i<5;i++)s+='<line x1="307" y1="188" x2="'+(287+i*10)+'" y2="164" stroke="#dab65c" stroke-width="1.2" opacity=".8"/>';
 s+='<polygon points="287,148 297,148 292,153" fill="#e07a8b"/><line x1="292" y1="153" x2="292" y2="157" stroke="#f4ecd8" stroke-width="1"/><polygon points="317,148 327,148 322,153" fill="#3fa796"/><line x1="322" y1="153" x2="322" y2="157" stroke="#f4ecd8" stroke-width="1"/></g>';
 /* lanterns */
 s+='<g class="item" data-item="lanterns">';
 [0,1].forEach(function(side){
  var pts=[],k,t,x,y,cols=['#e07a8b','#dab65c','#3fa796','#f4ecd8','#e07a8b'];
  for(k=0;k<=6;k++){t=k/6;x=116*t;y=20+30*t+7*Math.sin(Math.PI*t);if(side)x=360-x;pts.push([x,y]);}
  s+='<polyline points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="none" stroke="#b8b2a0" stroke-width=".8"/>';
  for(k=1;k<=5;k++){x=pts[k][0];y=pts[k][1];s+='<rect x="'+(x-1.5).toFixed(1)+'" y="'+y.toFixed(1)+'" width="3" height="2" fill="#dab65c"/><ellipse class="twinkle" cx="'+x.toFixed(1)+'" cy="'+(y+7).toFixed(1)+'" rx="4" ry="5.4" fill="'+cols[k-1]+'"/>';}
 });
 s+='</g>';
 /* curtains */
 s+='<g class="item" data-item="curtains"><polygon points="0,0 17,0 13,62 19,118 6,150 0,150" fill="#8c2f45"/><polygon points="360,0 343,0 347,62 341,118 354,150 360,150" fill="#8c2f45"/><rect x="1" y="112" width="15" height="3" fill="#dab65c"/><rect x="344" y="112" width="15" height="3" fill="#dab65c"/><line x1="6" y1="0" x2="5" y2="110" stroke="#6d2135" stroke-width="1.2"/><line x1="354" y1="0" x2="355" y2="110" stroke="#6d2135" stroke-width="1.2"/></g>';
 /* balloons */
 s+='<g class="item" data-item="balloons">';
 [[240,112,'#dab65c'],[250,100,'#f4ecd8'],[258,114,'#12162a'],[247,124,'#e07a8b'],[262,128,'#dab65c']].forEach(function(b){s+='<line x1="'+b[0]+'" y1="'+(b[1]+7)+'" x2="246" y2="189" stroke="#b8b2a0" stroke-width=".5"/><ellipse cx="'+b[0]+'" cy="'+b[1]+'" rx="6.5" ry="7.5" fill="'+b[2]+'" stroke="#dab65c" stroke-width=".5"/>';});
 s+='</g>';
 /* fireworks, seen through the terrace doors */
 s+='<g class="item" data-item="fireworks" clip-path="url(#arch)">';
 [[152,82,'#e07a8b'],[212,122,'#dab65c'],[176,70,'#3fa796']].forEach(function(f){for(var k=0;k<10;k++){var a=k*Math.PI/5;s+='<line class="twinkle" x1="'+(f[0]+4*Math.cos(a)).toFixed(1)+'" y1="'+(f[1]+4*Math.sin(a)).toFixed(1)+'" x2="'+(f[0]+11*Math.cos(a)).toFixed(1)+'" y2="'+(f[1]+11*Math.sin(a)).toFixed(1)+'" stroke="'+f[2]+'" stroke-width="1.4" stroke-linecap="round"/>';}});
 s+='</g>';
 /* guests, back row first */
 var GP=[[168,228,0],[198,228,1],[123,238,0],[243,238,1],[138,228,1],[228,228,0],[183,238,1],[213,238,0],[108,228,0],[258,228,1],[153,238,0],[268,238,1]];
 var DR=['#e07a8b','#3fa796','#dab65c','#b79be8','#f4ecd8','#e07a8b'],HR=['#1c1410','#7a3b1c','#3a2616','#c9a24b'],SK=['#f0cfae','#8d5a3b','#e8b98f','#c98e63'];
 var gl=GP.map(function(p,k){return {n:k+1,x:p[0],y:p[1],g:p[2]};}).sort(function(a,b){return a.y-b.y;});
 gl.forEach(function(g){s+='<g class="item" data-guest="'+g.n+'">'+(g.g?gent(g.x,g.y,HR[g.n%4],SK[g.n%4]):flapper(g.x,g.y,DR[g.n%6],HR[(g.n+1)%4],SK[(g.n+2)%4]))+'</g>';});
 /* piano and singer, front left */
 s+='<g class="item" data-item="piano"><polygon points="6,214 50,196 54,198 16,214" fill="#1b2140" stroke="#dab65c" stroke-width=".8"/><path d="M2 214 h50 q10 0 10 10 v6 h-60 z" fill="#12162a" stroke="#dab65c" stroke-width=".8"/><rect x="4" y="223" width="24" height="3.4" fill="#f4ecd8"/><rect x="8" y="230" width="3" height="10" fill="#12162a"/><rect x="52" y="230" width="3" height="10" fill="#12162a"/></g>';
 s+='<g class="item" data-item="singer">'+flapper(78,239,'#dab65c','#1c1410','#8d5a3b')+'<line x1="93" y1="239" x2="93" y2="196" stroke="#b8b2a0" stroke-width="1.2"/><circle cx="93" cy="193" r="3.6" fill="#2a2f45" stroke="#dab65c" stroke-width="1.2"/></g>';
 /* cake table and waiter, front right */
 s+='<g class="item" data-item="cake"><polygon points="302,214 350,214 354,240 298,240" fill="#f4ecd8"/><rect x="300" y="212" width="52" height="3" fill="#fff"/><rect x="314" y="203" width="24" height="9" fill="#e07a8b"/><rect x="318" y="195" width="16" height="8" fill="#fff6d6"/><rect x="322" y="188" width="8" height="7" fill="#e07a8b"/><circle cx="326" cy="186" r="2" fill="#dab65c"/><line x1="314" y1="207.5" x2="338" y2="207.5" stroke="#fff6d6" stroke-width="1" stroke-dasharray="2 2"/></g>';
 s+='<g class="item" data-item="waiter">'+gent(286,239,'#1c1410','#e8b98f')+'<ellipse cx="271.5" cy="188" rx="8.5" ry="1.7" fill="#dab65c"/><polygon points="266,183 271,183 268.5,186.5" fill="#e07a8b"/><polygon points="273,183 278,183 275.5,186.5" fill="#3fa796"/></g>';

 s+='</svg>';
 host.innerHTML=s;
}

window.MHScene={build:buildScene};
})();
