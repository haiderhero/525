/* =========================================================
   525 — Five Two Five · Specialty Coffee
   Video bg · full menu · search · cart · cinematic extras
   ========================================================= */
(function () {
  'use strict';

  /* ---- Scenes (edit paths to swap footage; groups can override) ---- */
  var SCENES = {
    exterior:'assets/video/intro-exterior.mp4',
    interior:'assets/video/welcome.mp4',
    hot:'assets/video/hot.mp4',
    cold:'assets/video/cold-matcha.mp4',
    v60:'assets/video/hot-alt.mp4',
    pastry:'assets/video/pastry-cookies.mp4',
    signature:'assets/video/signature.mp4'
  };
  var POSTERS = {
    exterior:'assets/img/posters/intro-exterior.jpg', interior:'assets/img/posters/welcome.jpg',
    hot:'assets/img/posters/hot.jpg', cold:'assets/img/posters/cold-matcha.jpg',
    v60:'assets/img/posters/hot-alt.jpg', pastry:'assets/img/posters/pastry-cookies.jpg',
    signature:'assets/img/posters/signature.jpg'
  };

  /* ---- line-art glyphs (brand style) ---- */
  var ST='stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"';
  function svg(i){ return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">'+i+'</svg>'; }
  var GLYPHS={
    hot:svg('<path d="M5 9h9v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z" '+ST+'/><path d="M14 10h2.2a2.2 2.2 0 0 1 0 4.4H14" '+ST+'/><path d="M8 3.6c-.5.8.5 1.3 0 2.2M11 3.6c-.5.8.5 1.3 0 2.2" '+ST+'/>'),
    iced:svg('<path d="M7 8h10l-1.2 11a1 1 0 0 1-1 .9H9.2a1 1 0 0 1-1-.9L7 8z" '+ST+'/><path d="M6.3 8h11.4" '+ST+'/><path d="M13.5 4l-1.6 5" '+ST+'/>'),
    drip:svg('<path d="M6 6h12l-4.2 6.2h-3.6L6 6z" '+ST+'/><path d="M12 12.2v2.2" '+ST+'/><path d="M8.2 16.4h7.6l-1 3.1a2 2 0 0 1-1.9 1.4h-1.8a2 2 0 0 1-1.9-1.4l-1-3.1z" '+ST+'/>'),
    matcha:svg('<path d="M5 11h14l-1.1 4.6a4 4 0 0 1-3.9 3.1H10a4 4 0 0 1-3.9-3.1L5 11z" '+ST+'/><path d="M15 4.5l-2.2 6.3M17 5.4l-2 5.4" '+ST+'/>'),
    juice:svg('<path d="M7 6.5h10l-1.4 12.6a1.2 1.2 0 0 1-1.2 1.1H9.6a1.2 1.2 0 0 1-1.2-1.1L7 6.5z" '+ST+'/><path d="M12 3.4v3.1" '+ST+'/><circle cx="12" cy="12.5" r="2.1" '+ST+'/>'),
    cake:svg('<path d="M5 15.2h14l-.9 3.6a1.4 1.4 0 0 1-1.4 1H7.3a1.4 1.4 0 0 1-1.4-1L5 15.2z" '+ST+'/><path d="M6.3 15.2 12 6.8l5.7 8.4" '+ST+'/><circle cx="12" cy="6" r="1" '+ST+'/>')
  };
  var ADD='<svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  var SHARE='<svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M12 15V4M8.5 7.5 12 4l3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 12v6a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 18v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  function isImg(v){ return typeof v==='string' && v.indexOf('/')!==-1; }

  /* it(nameAr, nameEn, priceM, priceL, glyphOrImg, tags) — tags: pop new season nomilk */
  function it(n,e,m,l,g,t){ return {n:n,e:e,m:m,l:l,g:g,t:(t||'')}; }

  /* =========================================================
     FULL MENU (from 525's official menu). group.scene reuses
     an existing clip for now; give each its own later.
     ========================================================= */
  var SECTIONS=[
    { id:'hot', scene:'hot', label:'الساخن', en:'HOT', art:'hot',
      title:'المشروبات الحارة', titleEn:'HOT DRINKS',
      desc:'إسبريسو وحليب مبخّر ولمسة لاتيه آرت — تُحضّر باللحظة.',
      foot:'اكسترا شوت 750 · حليب بديل 1250',
      groups:[
        { h:'المشروبات الحارة', e:'HOT DRINKS', scene:'hot', items:[
          it('اسبريسو دبل','DOUBLE ESPRESSO',3000,0,'hot','nomilk'),
          it('امريكانو','AMERICANO',4000,0,'hot','nomilk'),
          it('فريدو اسبريسو','FREDDO ESPRESSO',4000,0,'hot','nomilk'),
          it('كورتادو','CORTADO',4000,0,'hot','pop'),
          it('فلات وايت','FLAT WHITE',4500,0,'hot','pop'),
          it('كافي لاتيه','CAFE LATTE',4000,5000,'hot'),
          it('لاتيه فستق','PISTACHIO LATTE',5000,6000,'hot'),
          it('سبانش لاتيه','SPANISH LATTE',4000,5000,'hot','pop'),
          it('كابتشينو','CAPPUCCINO',4500,0,'hot'),
          it('كراميل ماكياتو','CARAMEL MACCHIATO',4500,5500,'hot'),
          it('كراميل لاتيه','CARAMEL LATTE',4500,5500,'hot'),
          it('لاتيه كراميل مملح','SALTED CARAMEL LATTE',4500,5500,'hot'),
          it('موكا','MOCHA',4500,5500,'hot'),
          it('ماكياتو','MACCHIATO',4000,0,'hot'),
          it('هوت شوكليت','HOT CHOCOLATE',4000,5000,'hot','season'),
          it('قهوة تركية','TURKISH COFFEE',2500,0,'hot','nomilk')
        ]}
      ] },
    { id:'v60', scene:'v60', label:'التقطير', en:'V60', art:'drip',
      title:'القهوة المختصّة', titleEn:'SPECIALTY · SINGLE ORIGIN',
      desc:'تُصنع بأجود حبوب القهوة المختصّة — اسأل الباريستا عن المحاصيل المتوفّرة.',
      groups:[
        { h:'Single Origin', e:'FILTER', scene:'v60', items:[
          it('V60','POUR OVER',0,0,'drip','nomilk'),
          it('كيمكس','CHEMEX',0,0,'drip','nomilk'),
          it('كولد برو','COLD BREW · 24H',0,0,'drip','nomilk')
        ]}
      ] },
    { id:'cold', scene:'cold', label:'البارد', en:'COLD', art:'iced',
      title:'المشروبات الباردة', titleEn:'COLD DRINKS',
      desc:'مشروبات باردة ومنعشة على الثلج — من الآيس ماتشا للموهيتو.',
      foot:'اكسترا شوت 750 · حليب بديل 1250',
      groups:[
        { h:'المشروبات الباردة', e:'COLD DRINKS', scene:'cold', items:[
          it('ايس تيراميسو','ICE TIRAMISU',6000,7000,'iced','pop'),
          it('ايس موكا','ICE MOCHA',4500,5500,'iced'),
          it('ايس سبانش لاتيه','ICE SPANISH LATTE',4500,5500,'iced','pop'),
          it('ايس كراميل لاتيه','ICE CARAMEL LATTE',4500,5500,'iced'),
          it('ايس لاتيه','ICE LATTE',4000,5000,'iced'),
          it('ايس سولت كراميل','ICE SALTED CARAMEL',5500,6500,'iced'),
          it('ايس كراميل ماكياتو','ICE CARAMEL MACCHIATO',5000,6000,'iced'),
          it('ايس امريكانو','ICE AMERICANO',4000,0,'iced','nomilk'),
          it('أفوكاتو','AFFOGATO',4000,0,'iced')
        ]},
        { h:'ماتشا', e:'MATCHA', scene:'cold', items:[
          it('لاتيه ماتشا','MATCHA LATTE',6000,0,'matcha','pop'),
          it('ايس ماتشا لاتيه','ICE MATCHA LATTE',6000,7000,'matcha','pop'),
          it('ايس ماتشا بالفراولة','ICE STRAWBERRY MATCHA',6000,7000,'matcha','new'),
          it('ايس دارك ماتشا','ICE DARK MATCHA',6000,7000,'matcha'),
          it('ايس وايت ماتشا','ICE WHITE MATCHA',6000,7000,'matcha','new')
        ]},
        { h:'سموذي', e:'SMOOTHIE', scene:'cold', items:[
          it('سموذي فراولة','STRAWBERRY SMOOTHIE',5000,0,'juice'),
          it('سموذي منجا','MANGO SMOOTHIE',5500,0,'juice'),
          it('سموذي أناناس','PINEAPPLE SMOOTHIE',5000,0,'juice'),
          it('سموذي باشن فروت','PASSION FRUIT SMOOTHIE',5000,0,'juice'),
          it('سموذي ميكس بيري','MIXED BERRIES SMOOTHIE',5000,0,'juice')
        ]},
        { h:'موهيتو', e:'MOJITO', scene:'cold', items:[
          it('موهيتو ليتشي','LYCHEE MOJITO',4000,0,'iced','nomilk'),
          it('موهيتو فراولة','STRAWBERRY MOJITO',4000,0,'iced','nomilk'),
          it('موهيتو بلوبيري','BLUEBERRY MOJITO',4000,0,'iced','nomilk'),
          it('موهيتو فايولا','VIOLA MOJITO',4000,0,'iced','new'),
          it('موهيتو كيوي','KIWI MOJITO',4000,0,'iced','nomilk')
        ]},
        { h:'فرابتشينو', e:'FRAPPUCCINO', scene:'cold', items:[
          it('فرابيه موكا','MOCHA FRAPPE',5000,6000,'iced','pop'),
          it('فرابيه كراميل','CARAMEL FRAPPE',5000,6000,'iced'),
          it('فرابيه بستاشيو','PISTACHIO FRAPPE',5000,6000,'iced'),
          it('فرابيه كراميل مملح','SALTED CARAMEL FRAPPE',5000,6000,'iced')
        ]},
        { h:'عصائر طبيعية', e:'FRESH JUICE', scene:'cold', items:[
          it('عصير برتقال','ORANGE JUICE',4000,0,'juice','nomilk'),
          it('عصير ليمون ونعناع','LEMONADE',3500,0,'juice','nomilk')
        ]}
      ] },
    { id:'pastry', scene:'pastry', label:'الحلى', en:'SWEETS', art:'cake',
      title:'الحلى والمعجنات', titleEn:'THE BEST PASTRY IN TOWN',
      desc:'توفّرت حلويات فاخرة في 525 — الرفيق المثالي لفنجانك.',
      groups:[
        { h:'تشيزكيك', e:'CHEESECAKE', scene:'pastry', items:[
          it('تشيزكيك جيري','CHERRY CHEESECAKE',0,0,'assets/img/menu/cheesecake-cherry.jpg','pop'),
          it('تشيزكيك لوتس','LOTUS CHEESECAKE',0,0,'assets/img/menu/cheesecake-lotus.jpg','pop'),
          it('تشيزكيك بستاشيو','PISTACHIO CHEESECAKE',0,0,'assets/img/menu/cheesecake-pistachio.jpg'),
          it('تشيزكيك أوريو','OREO CHEESECAKE',0,0,'assets/img/menu/cheesecake-oreo.jpg')
        ]},
        { h:'كوكيز', e:'COOKIES', scene:'pastry', items:[
          it('كوكيز','COOKIES',0,0,'assets/img/menu/cookie.jpg','pop')
        ]}
      ] }
  ];

  var BADGE={ pop:'الأكثر طلباً', new:'جديد', season:'موسمي' };

  /* ---- flatten items (assign ids; keep section/group refs) ---- */
  var ITEMS=[]; var _id=0;
  SECTIONS.forEach(function(sec){
    sec.groups.forEach(function(g,gi){
      g.items.forEach(function(x){
        x._id=_id++; x._sec=sec.id; x._gi=gi; ITEMS.push(x);
      });
    });
  });
  function itemById(id){ return ITEMS[+id]; }

  /* ---- DOM ---- */
  var $=function(s){ return document.getElementById(s); };
  var body=document.body, stage=$('stage');
  var layers=[$('layerA'),$('layerB')];
  var intro=$('intro'), enterBtn=$('enterBtn');
  var soundBtn=$('soundBtn'), moodBtn=$('moodToggle');
  var dockPills=$('dockPills'), suggestBtn=$('suggestBtn');
  var panel=$('panel'), panelArt=$('panelArt'), panelTitle=$('panelTitle'),
      panelDesc=$('panelDesc'), panelClose=$('panelClose'), menuList=$('menuList'), catChips=$('catChips');
  var rail=$('rail'), scrollHint=$('scrollHint');
  var searchPanel=$('searchPanel'), searchBtn=$('searchBtn'), searchClose=$('searchClose'),
      searchInput=$('searchInput'), filtersEl=$('filters'), searchResults=$('searchResults');
  var cartPanel=$('cartPanel'), cartBtn=$('cartBtn'), cartClose=$('cartClose'),
      cartList=$('cartList'), cartTotal=$('cartTotal'), cartCount=$('cartCount'),
      cartCopy=$('cartCopy'), cartClear=$('cartClear');
  var hoursChip=$('hoursChip'), hoursText=$('hoursText');

  var activeIdx=0, currentScene=null, sceneBeforeMood='interior';
  var muted=true, moodOn=false, switchToken=0, curSection=null;

  function fmt(n){ return n? n.toLocaleString('en-US') : ''; }

  /* ---- crossfade ---- */
  function playScene(scene,opts){
    opts=opts||{};
    if(scene===currentScene && !opts.force) return;
    currentScene=scene;
    var token=++switchToken, cur=layers[activeIdx], next=layers[1-activeIdx];
    next.poster=POSTERS[scene]||''; next.src=SCENES[scene]; next.muted=muted; next.load();
    var start=function(){
      if(token!==switchToken) return;
      next.currentTime=0; var p=next.play(); if(p&&p.catch) p.catch(function(){});
      next.classList.add('is-active'); cur.classList.remove('is-active'); activeIdx=1-activeIdx;
      window.setTimeout(function(){ if(token===switchToken){ try{cur.pause();}catch(e){} } },1200);
    };
    if(next.readyState>=2) start(); else next.addEventListener('canplay',start,{once:true});
  }

  /* ---- item card html (used by menu, search) ---- */
  function badgeHtml(t){
    var out='';
    ['pop','new','season'].forEach(function(k){ if(t.indexOf(k)!==-1) out+='<span class="badge badge--'+k+'">'+BADGE[k]+'</span>'; });
    return out;
  }
  function priceHtml(x){
    if(!x.m) return '';
    return '<span class="price">'+fmt(x.m)+(x.l?'<span class="price__l">'+fmt(x.l)+'</span>':'')+'</span>';
  }
  function addHtml(x){
    if(x.m && x.l){
      return '<span class="add"><button class="addbtn" data-id="'+x._id+'" data-size="M">M</button>'+
             '<button class="addbtn" data-id="'+x._id+'" data-size="L">L</button></span>';
    }
    return '<span class="add"><button class="addbtn addbtn--one" data-id="'+x._id+'" data-size="">'+ADD+'</button></span>';
  }
  function itemCard(x,withSec){
    var media=isImg(x.g)?'<span class="menu-item__thumb" style="background-image:url('+x.g+')"></span>'
                        :'<span class="menu-item__thumb menu-item__thumb--glyph">'+(GLYPHS[x.g]||GLYPHS.hot)+'</span>';
    var sec=withSec?'<span class="menu-item__sec">'+secLabel(x._sec)+'</span>':'';
    return '<div class="menu-item" data-id="'+x._id+'">'+media+
      '<span class="menu-item__main">'+
        '<span class="menu-item__name">'+x.n+badgeHtml(x.t)+'</span>'+
        '<span class="menu-item__en">'+x.e+sec+'</span>'+
      '</span>'+
      '<span class="menu-item__tail">'+
        priceHtml(x)+
        '<span class="menu-item__act">'+
          '<button class="sharebtn" data-id="'+x._id+'" title="مشاركة" aria-label="مشاركة">'+SHARE+'</button>'+
          addHtml(x)+
        '</span>'+
      '</span></div>';
  }
  function secLabel(id){ for(var i=0;i<SECTIONS.length;i++) if(SECTIONS[i].id===id) return SECTIONS[i].title; return ''; }
  function findSection(id){ for(var i=0;i<SECTIONS.length;i++) if(SECTIONS[i].id===id) return SECTIONS[i]; return null; }

  /* ---- dock + rail ---- */
  SECTIONS.forEach(function(sec){
    var b=document.createElement('button');
    b.className='pill'; b.type='button'; b.dataset.id=sec.id;
    b.innerHTML=sec.label+'<small>'+sec.en+'</small>';
    b.addEventListener('click',function(){ openSection(sec.id); });
    dockPills.appendChild(b);

    var d=document.createElement('button');
    d.className='rail__dot'; d.type='button'; d.dataset.id=sec.id;
    d.innerHTML='<span></span><em>'+sec.label+'</em>';
    d.addEventListener('click',function(){ openSection(sec.id); });
    rail.appendChild(d);
  });

  /* ---- open section (optionally jump to a group index) ---- */
  function openSection(id,gi){
    var sec=findSection(id); if(!sec) return;
    var activePill=dockPills.querySelector('.pill.is-active');
    if(gi==null && panel.classList.contains('is-open') && activePill && activePill.dataset.id===id){ closePanel(); return; }
    curSection=sec;
    if(moodOn) setMood(false);
    var g0=sec.groups[gi||0];
    playScene((g0&&g0.scene)||sec.scene); sceneBeforeMood=sec.scene;

    setActive(dockPills,'.pill',id); setActive(rail,'.rail__dot',id);
    panelArt.innerHTML=(GLYPHS[sec.art]||'')+'<span class="steam"><i></i><i></i><i></i></span>';
    panelTitle.innerHTML=sec.title+'<span>'+sec.titleEn+'</span>';
    panelDesc.textContent=sec.desc;

    // category chips
    catChips.innerHTML=sec.groups.map(function(g,i){
      return '<button class="chip" data-gi="'+i+'">'+g.h+'</button>';
    }).join('');

    // groups
    var html='';
    sec.groups.forEach(function(g,i){
      html+='<div class="menu-group" id="grp-'+sec.id+'-'+i+'"><div class="menu-group__head">'+
            '<span class="menu-group__ar">'+g.h+'</span><span class="menu-group__en">'+g.e+'</span></div>';
      g.items.forEach(function(x){ html+=itemCard(x,false); });
      html+='</div>';
    });
    if(sec.foot) html+='<p class="menu-foot">'+sec.foot+'</p>';
    menuList.innerHTML=html;

    // animate items
    var items=menuList.querySelectorAll('.menu-item');
    for(var k=0;k<items.length;k++) items[k].style.setProperty('--d',(60+k*40)+'ms');

    panel.classList.remove('is-open'); void panel.offsetWidth;
    panel.classList.add('is-open'); body.classList.add('panel-open');
    if(gi!=null) jumpGroup(sec.id,gi); else menuList.scrollTop=0;
    if(location.hash!=='#'+id) history.replaceState(null,'','#'+id);
    hideHint();
  }
  function jumpGroup(secId,gi){
    setActive(catChips,'.chip',null);
    var chip=catChips.querySelector('.chip[data-gi="'+gi+'"]'); if(chip) chip.classList.add('is-active');
    var el=document.getElementById('grp-'+secId+'-'+gi);
    if(el) menuList.scrollTop = el.offsetTop - 8;
    var g=curSection&&curSection.groups[gi]; if(g&&g.scene) playScene(g.scene);
  }
  function setActive(root,sel,id){
    var els=root.querySelectorAll(sel);
    for(var i=0;i<els.length;i++) els[i].classList.toggle('is-active', id!=null && (els[i].dataset.id===id||els[i].dataset.gi===String(id)));
  }
  function closePanel(){
    panel.classList.remove('is-open'); body.classList.remove('panel-open'); curSection=null;
    setActive(dockPills,'.pill',null); setActive(rail,'.rail__dot',null);
    if(location.hash) history.replaceState(null,'',location.pathname+location.search);
    if(!moodOn) playScene('interior'); sceneBeforeMood='interior';
  }
  panelClose.addEventListener('click',closePanel);

  /* chips (event delegation) */
  catChips.addEventListener('click',function(e){
    var c=e.target.closest('.chip'); if(!c||!curSection) return;
    jumpGroup(curSection.id,+c.dataset.gi);
  });

  /* ---- delegation for add / share / result-nav ---- */
  document.addEventListener('click',function(e){
    var add=e.target.closest('.addbtn');
    if(add){ addToCart(itemById(add.dataset.id), add.dataset.size); e.stopPropagation(); return; }
    var sh=e.target.closest('.sharebtn');
    if(sh){ shareItem(itemById(sh.dataset.id)); e.stopPropagation(); return; }
    var res=e.target.closest('.result');
    if(res){ var x=itemById(res.dataset.id); closeSearch(); openSection(x._sec,x._gi); }
  });

  /* =========================================================
     SEARCH + FILTERS
     ========================================================= */
  var FILTERS=[{k:'all',l:'الكل'},{k:'pop',l:'الأكثر طلباً'},{k:'new',l:'جديد'},{k:'nomilk',l:'بدون حليب'}];
  var activeFilter='all';
  filtersEl.innerHTML=FILTERS.map(function(f,i){ return '<button class="filter'+(i===0?' is-active':'')+'" data-k="'+f.k+'">'+f.l+'</button>'; }).join('');
  filtersEl.addEventListener('click',function(e){
    var f=e.target.closest('.filter'); if(!f) return;
    activeFilter=f.dataset.k; setActive(filtersEl,'.filter',null);
    var els=filtersEl.querySelectorAll('.filter'); for(var i=0;i<els.length;i++) els[i].classList.toggle('is-active',els[i].dataset.k===activeFilter);
    renderResults();
  });
  function renderResults(){
    var q=(searchInput.value||'').trim().toLowerCase();
    var list=ITEMS.filter(function(x){
      var okF = activeFilter==='all' || x.t.indexOf(activeFilter)!==-1;
      var okQ = !q || (x.n.toLowerCase().indexOf(q)!==-1) || (x.e.toLowerCase().indexOf(q)!==-1);
      return okF && okQ;
    });
    if(!list.length){ searchResults.innerHTML='<p class="empty">لا نتائج مطابقة.</p>'; return; }
    searchResults.innerHTML=list.map(function(x){
      return '<div class="result menu-item" data-id="'+x._id+'">'+itemCardInner(x)+'</div>';
    }).join('');
  }
  function itemCardInner(x){ // reuse card content without outer wrapper duplication
    var tmp=itemCard(x,true);
    return tmp.replace('<div class="menu-item" data-id="'+x._id+'">','').replace(/<\/div>$/,'');
  }
  function openSearch(){ searchPanel.classList.add('is-open'); searchPanel.setAttribute('aria-hidden','false'); renderResults(); setTimeout(function(){ searchInput.focus(); },80); }
  function closeSearch(){ searchPanel.classList.remove('is-open'); searchPanel.setAttribute('aria-hidden','true'); }
  searchBtn.addEventListener('click',openSearch);
  searchClose.addEventListener('click',closeSearch);
  searchInput.addEventListener('input',renderResults);

  /* =========================================================
     CART (localStorage, no WhatsApp) + copy order
     ========================================================= */
  var CART_KEY='525_cart_v1';
  var cart=loadCart();
  function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ return []; } }
  function saveCart(){ try{ localStorage.setItem(CART_KEY,JSON.stringify(cart)); }catch(e){} }
  function addToCart(x,size){
    if(!x) return;
    var price = size==='L'? x.l : x.m; price=price||0;
    var key=x.n+'|'+(size||'');
    var row=null; for(var i=0;i<cart.length;i++) if(cart[i].key===key){ row=cart[i]; break; }
    if(row) row.qty++; else cart.push({key:key,n:x.n,e:x.e,size:size||'',price:price,qty:1});
    saveCart(); renderCart(); bumpCart(); toast('أُضيف للسلة');
  }
  function changeQty(key,d){
    for(var i=0;i<cart.length;i++) if(cart[i].key===key){ cart[i].qty+=d; if(cart[i].qty<=0) cart.splice(i,1); break; }
    saveCart(); renderCart();
  }
  function cartCountVal(){ var n=0; cart.forEach(function(r){ n+=r.qty; }); return n; }
  function cartTotalVal(){ var t=0; cart.forEach(function(r){ t+=r.price*r.qty; }); return t; }
  function renderCart(){
    var n=cartCountVal();
    if(n>0){ cartCount.hidden=false; cartCount.textContent=n; } else cartCount.hidden=true;
    if(!cart.length){ cartList.innerHTML='<p class="empty">السلة فارغة — أضف أصنافك من القائمة.</p>'; cartTotal.textContent='0 د.ع'; return; }
    cartList.innerHTML=cart.map(function(r){
      var size=r.size?'<span class="ci__size">'+r.size+'</span>':'';
      var price=r.price?fmt(r.price*r.qty)+' د.ع':'—';
      return '<div class="ci"><div class="ci__main"><span class="ci__name">'+r.n+size+'</span>'+
             '<span class="ci__en">'+r.e+'</span></div>'+
             '<div class="ci__qty"><button class="cq" data-k="'+r.key+'" data-d="-1">−</button>'+
             '<span>'+r.qty+'</span><button class="cq" data-k="'+r.key+'" data-d="1">+</button></div>'+
             '<span class="ci__price">'+price+'</span></div>';
    }).join('');
    cartTotal.textContent=fmt(cartTotalVal())+' د.ع';
  }
  cartList.addEventListener('click',function(e){ var b=e.target.closest('.cq'); if(b) changeQty(b.dataset.k,+b.dataset.d); });
  function bumpCart(){ cartBtn.classList.remove('bump'); void cartBtn.offsetWidth; cartBtn.classList.add('bump'); }
  cartBtn.addEventListener('click',function(){ cartPanel.classList.toggle('is-open'); cartPanel.setAttribute('aria-hidden', cartPanel.classList.contains('is-open')?'false':'true'); renderCart(); });
  cartClose.addEventListener('click',function(){ cartPanel.classList.remove('is-open'); cartPanel.setAttribute('aria-hidden','true'); });
  cartClear.addEventListener('click',function(){ cart=[]; saveCart(); renderCart(); });
  cartCopy.addEventListener('click',function(){
    if(!cart.length){ toast('السلة فارغة'); return; }
    var lines=['طلب 525 ☕'];
    cart.forEach(function(r){ lines.push('• '+r.n+(r.size?' ('+r.size+')':'')+' ×'+r.qty+(r.price?' — '+fmt(r.price*r.qty)+' د.ع':'')); });
    lines.push('———'); lines.push('المجموع: '+fmt(cartTotalVal())+' د.ع');
    var text=lines.join('\n');
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function(){ toast('تم نسخ الطلب'); },function(){ fallbackCopy(text); });
    else fallbackCopy(text);
  });
  function fallbackCopy(text){ var t=document.createElement('textarea'); t.value=text; document.body.appendChild(t); t.select(); try{document.execCommand('copy');toast('تم نسخ الطلب');}catch(e){} document.body.removeChild(t); }

  /* =========================================================
     SUGGEST (random) + RAIL wheel navigation
     ========================================================= */
  suggestBtn.addEventListener('click',function(){
    var x=ITEMS[Math.floor(Math.random()*ITEMS.length)];
    openSection(x._sec,x._gi);
    setTimeout(function(){
      var el=menuList.querySelector('.menu-item[data-id="'+x._id+'"]');
      if(el){ el.scrollIntoView({block:'center'}); el.classList.add('flash'); setTimeout(function(){ el.classList.remove('flash'); },1600); }
      toast('جرّب: '+x.n);
    },420);
  });

  var wheelLock=false;
  document.addEventListener('wheel',function(e){
    if(!body.classList.contains('is-entered')) return;
    if(e.target.closest('.panel,.search,.cart,.dock,.topbar')) return; // let those scroll
    if(wheelLock) return; wheelLock=true; setTimeout(function(){ wheelLock=false; },720);
    var ids=SECTIONS.map(function(s){return s.id;});
    var cur=curSection?ids.indexOf(curSection.id):-1;
    var nx=cur + (e.deltaY>0?1:-1);
    if(nx<0){ closePanel(); return; }
    if(nx>=ids.length) nx=ids.length-1;
    openSection(ids[nx]);
  },{passive:true});

  function hideHint(){ if(scrollHint) scrollHint.classList.add('gone'); }

  /* ---- sound ---- */
  soundBtn.addEventListener('click',function(){
    muted=!muted; soundBtn.setAttribute('aria-pressed',String(!muted));
    layers.forEach(function(v){ v.muted=muted; });
    if(!muted){ var p=layers[activeIdx].play(); if(p&&p.catch) p.catch(function(){}); }
  });

  /* ---- cookie mood toggle ---- */
  function setMood(on){
    moodOn=on; body.classList.toggle('mood-on',on); moodBtn.setAttribute('aria-pressed',String(on));
    var lbl=moodBtn.querySelector('.mood__label'); if(lbl) lbl.textContent=on?lbl.dataset.on:lbl.dataset.off;
    if(on){ if(currentScene!=='signature') sceneBeforeMood=currentScene||'interior'; playScene('signature'); toast('good mood on'); }
    else playScene(sceneBeforeMood||'interior');
  }
  moodBtn.addEventListener('click',function(){ setMood(!moodOn); });

  /* ---- toast ---- */
  var toastEl=null,toastT=null;
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.className='toast'; body.appendChild(toastEl); }
    toastEl.innerHTML='<span class="toast__cookie"></span>'+msg;
    toastEl.classList.add('is-show'); window.clearTimeout(toastT);
    toastT=window.setTimeout(function(){ toastEl.classList.remove('is-show'); },1900);
  }

  /* =========================================================
     DAY / NIGHT by opening hours (open 7:00–01:00)
     ========================================================= */
  function updateClock(){
    var h=new Date().getHours();
    var open = (h>=7 || h<1);
    var night = !(h>=7 && h<17);
    body.classList.toggle('is-night',night);
    body.classList.toggle('is-closed',!open);
    if(hoursText) hoursText.textContent = open? 'مفتوح الآن · ٧ص–١ص' : 'مغلق · يفتح ٧ص';
    hoursChip.classList.toggle('is-off',!open);
  }

  /* =========================================================
     SHARE CARD (canvas) — branded story per item
     ========================================================= */
  function shareItem(x){
    var c=$('shareCanvas'), ctx=c.getContext('2d'), W=c.width, Hh=c.height;
    var teal='#669391', cream='#f4efe6', ink='#0e0c0b';
    var g=ctx.createLinearGradient(0,0,0,Hh); g.addColorStop(0,'#12100f'); g.addColorStop(1,'#1c2b2a');
    ctx.fillStyle=g; ctx.fillRect(0,0,W,Hh);
    ctx.strokeStyle='rgba(102,147,145,.5)'; ctx.lineWidth=4; ctx.strokeRect(40,40,W-80,Hh-80);
    var draw=function(img){
      // circle image or teal disc
      var cx=W/2, cy=560, r=250;
      ctx.save(); ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.closePath();
      if(img){ ctx.clip(); var s=Math.max((2*r)/img.width,(2*r)/img.height); ctx.drawImage(img,cx-img.width*s/2,cy-img.height*s/2,img.width*s,img.height*s); }
      else { ctx.fillStyle='rgba(102,147,145,.18)'; ctx.fill(); }
      ctx.restore();
      ctx.strokeStyle=teal; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
      // texts
      ctx.textAlign='center'; ctx.direction='rtl';
      ctx.fillStyle=cream; ctx.font='700 84px Tajawal, sans-serif'; ctx.fillText(x.n, W/2, 960);
      ctx.fillStyle=teal; ctx.font='300 34px Jost, sans-serif'; ctx.fillText(x.e, W/2, 1015);
      if(x.m){ ctx.fillStyle=cream; ctx.font='400 46px Jost, sans-serif'; ctx.fillText(fmt(x.m)+(x.l?' / '+fmt(x.l):'')+' IQD', W/2, 1095); }
      // logo
      ctx.fillStyle=cream; ctx.font='200 96px Jost, sans-serif'; ctx.fillText('525', W/2, 220);
      ctx.fillStyle='rgba(244,239,230,.75)'; ctx.font='300 26px Jost, sans-serif'; ctx.fillText('F I V E   T W O   F I V E', W/2, 258);
      ctx.fillStyle=teal; ctx.font='300 24px Jost, sans-serif'; ctx.fillText('@525.coffee.iraq', W/2, Hh-70);
      exportCard(c,x);
    };
    if(isImg(x.g)){ var im=new Image(); im.onload=function(){ draw(im); }; im.onerror=function(){ draw(null); }; im.src=x.g; }
    else draw(null);
  }
  function exportCard(c,x){
    c.toBlob(function(blob){
      if(!blob){ return; }
      var file=new File([blob],'525-'+x.e.replace(/\s+/g,'-').toLowerCase()+'.png',{type:'image/png'});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        navigator.share({files:[file],title:'525 · '+x.n}).catch(function(){});
      } else {
        var url=URL.createObjectURL(blob); var a=document.createElement('a');
        a.href=url; a.download=file.name; document.body.appendChild(a); a.click();
        document.body.removeChild(a); setTimeout(function(){ URL.revokeObjectURL(url); },1500);
        toast('تم تنزيل البطاقة');
      }
    },'image/png');
  }

  /* =========================================================
     ENTER / BOOT / DEEP-LINK / KEYS
     ========================================================= */
  function boot(){ body.classList.remove('is-preload'); renderCart(); updateClock(); setInterval(updateClock,60000); playScene('exterior',{force:true}); }
  function enter(then){
    intro.classList.add('is-hidden'); body.classList.add('is-entered');
    stage.classList.add('is-entering');
    window.setTimeout(function(){ stage.classList.remove('is-entering'); },1700);
    window.setTimeout(function(){ if(then) then(); else playScene('interior'); },650);
  }
  enterBtn.addEventListener('click',function(){ enter(); });
  function applyHash(){
    var id=(location.hash||'').replace('#','');
    if(id==='mood'){ enter(function(){ setMood(true); }); return; }
    if(id==='search'){ enter(function(){ openSearch(); }); return; }
    if(id==='cart'){ enter(function(){ cartPanel.classList.add('is-open'); renderCart(); }); return; }
    if(findSection(id)) enter(function(){ openSection(id); });
  }
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(searchPanel.classList.contains('is-open')) return closeSearch();
      if(cartPanel.classList.contains('is-open')){ cartPanel.classList.remove('is-open'); return; }
      if(panel.classList.contains('is-open')) return closePanel();
    }
  });

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ boot(); applyHash(); });
  else { boot(); applyHash(); }
})();
