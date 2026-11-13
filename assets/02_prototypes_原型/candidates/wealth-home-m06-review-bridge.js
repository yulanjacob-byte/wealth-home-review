/* Project-owned read-only bridge. Never loads the annotation editor or drafts. */
(function () {
  'use strict';
  const query = new URLSearchParams(location.search);
  if (query.get('review-center') !== 'm06') return;
  document.documentElement.dataset.reviewMode = 'review-center-readonly';
  document.body.classList.add('m06-review-focus');
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'wealth-home-m06-review-focus.css?' + (document.currentScript?.src.split('?')[1] || 'v=20261029-1');
  document.head.append(stylesheet);
  let payload = JSON.parse(document.getElementById('m06-review-data').textContent);
  const baseKey = 'wealth-home-m06-ranking';
  const allowedPages = new Set(payload.pages.map(p => p.pageKey));
  const layer = document.createElement('div');
  layer.id = 'm06-review-markers';
  layer.setAttribute('aria-label', '页面区域对应编号');
  document.body.append(layer);
  let pageKey = '', selected = '', scheduled = false, lastAnnouncement = '';
  const markers = new Map();

  function currentPage() {
    const selector=document.getElementById('m06-all-selector');
    if(selector&&!selector.hidden) return 'wealth-home-m06-ranking-selector';
    const subpage = document.getElementById('subpage');
    return subpage.classList.contains('is-active') && allowedPages.has(subpage.dataset.m06PageKey)
      ? subpage.dataset.m06PageKey : baseKey;
  }
  function entries() { return payload.annotations.filter(a => a.pageKey === pageKey && a.visible !== false); }
  function announce(type, extra) {
    if (parent !== window) parent.postMessage(Object.assign({type, pageKey}, extra || {}), '*');
  }
  function targetFor(a) {
    const ruleSheet=document.getElementById('m06-rule-sheet');
    const ruleOpen=ruleSheet&&!ruleSheet.hidden;
    if(Boolean(a.surfaceId)!==Boolean(ruleOpen) && (a.surfaceId||ruleOpen))return null;
    const matches = document.querySelectorAll(a.target.selector);
    if (matches.length !== 1) return null;
    const target = matches[0];
    if (!target.getClientRects().length || getComputedStyle(target).visibility === 'hidden') return null;
    return target;
  }
  function clearFocus() {
    document.querySelectorAll('.m06-review-highlight').forEach(el => el.classList.remove('m06-review-highlight'));
  }
  function focusAnnotation(id, notify) {
    const annotation = entries().find(a => a.id === id);
    const target = annotation && targetFor(annotation);
    if (!target) return;
    clearFocus(); selected = id;
    target.classList.add('m06-review-highlight');
    target.scrollIntoView({block:'start', behavior:'smooth', inline:'nearest'});
    if (notify) {
      window.dispatchEvent(new CustomEvent('prototypeannotatorselect', {detail:{annotationId:id,pageKey,reviewRegion:annotation.reviewRegion}}));
      announce('review-center:annotation-selected', {annotationId:id});
    }
    schedule();
  }
  function sizePhone() {
    const scale = Math.max(.1, Math.min((innerWidth - 72) / 790, (innerHeight - 16) / 1664, .56));
    document.documentElement.style.setProperty('--m06-review-scale', String(scale));
    document.documentElement.style.setProperty('--m06-review-frame-height', '1664px');
  }
  function render() {
    scheduled = false;
    const next = currentPage();
    if (pageKey !== next) {
      clearFocus(); selected=''; pageKey=next;
      markers.forEach(button => button.remove()); markers.clear();
    }
    const phone=document.querySelector('.phone'), rect=phone.getBoundingClientRect();
    const scale=rect.width/790;
    const current=entries(), ids=new Set(current.map(a=>a.id));
    markers.forEach((button,id)=>{if(!ids.has(id)){button.remove();markers.delete(id);}});
    const available=[];
    current.forEach(a=>{
      const target=targetFor(a);
      let marker=markers.get(a.id);
      if (!target) {if(marker) marker.hidden=true;return;}
      available.push(a.id);
      if(!marker){
        marker=document.createElement('button');marker.type='button';
        marker.className='m06-review-marker';marker.dataset.annotationId=a.id;
        marker.textContent=String(a.order).padStart(2,'0');
        marker.setAttribute('aria-label','页面对应 '+marker.textContent+'：'+a.title);
        marker.title=a.title;
        marker.addEventListener('click',()=>focusAnnotation(a.id,true));
        layer.append(marker);markers.set(a.id,marker);
      }
      const r=target.getBoundingClientRect();
      const scroller=target.closest('#appScroll, #subpageContent');
      const clip=scroller ? scroller.getBoundingClientRect() : rect;
      const top=Math.max(clip.top,rect.top+20*scale), bottom=Math.min(clip.bottom,rect.bottom-20*scale);
      const size=Math.max(20,44*scale), y=r.top+4*scale;
      marker.hidden=y<top || y+size>bottom || r.bottom<=top || r.top>=bottom;
      marker.style.left=Math.max(2,rect.left-size-4)+'px';marker.style.top=y+'px';
      marker.style.width=size+'px';marker.style.height=size+'px';
      marker.classList.toggle('is-selected',selected===a.id);
    });
    const signature=pageKey+'|'+available.join('|');
    if(signature!==lastAnnouncement){
      lastAnnouncement=signature;
      announce('review-center:page-ready',{annotationIds:available,surface:document.getElementById('m06-rule-sheet')?.hidden===false?'rules':''});
    }
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(render);}}
  window.addEventListener('message',event=>{
    if(event.source!==parent || !event.data) return;
    const msg=event.data;
    if(msg.type==='review-center:request-ready') {lastAnnouncement='';schedule();return;}
    if(msg.type!=='review-center:focus-annotation' || msg.pageKey!==currentPage()) return;
    if(!payload.annotations.some(a=>a.id===msg.annotationId && a.pageKey===msg.pageKey)) return;
    pageKey=currentPage();focusAnnotation(msg.annotationId,false);
  });
  document.addEventListener('click',event=>{
    const tab=event.target.closest('.main-tab[data-tab]');
    const module=tab&&({feed:'M03',theme:'M04'})[tab.dataset.tab];
    if(!module)return;
    event.preventDefault();event.stopImmediatePropagation();
    announce('review-center:module-request',{module});
  },true);
  document.querySelectorAll('.bottom-dock, #bottomHotspotInfo').forEach(node=>{node.inert=true;});
  new MutationObserver(records=>{
    if(records.some(r=>!layer.contains(r.target) && !(r.type==='attributes' && r.attributeName==='class' &&
      ((r.oldValue||'').replace(/\bm06-review-highlight\b/g,'').trim() === String(r.target.getAttribute('class')||'').replace(/\bm06-review-highlight\b/g,'').trim())))) schedule();
  }).observe(document.querySelector('.phone'),{childList:true,subtree:true,attributes:true,attributeOldValue:true,attributeFilter:['class','hidden','data-m06-page-key']});
  document.addEventListener('scroll',schedule,true);
  window.addEventListener('resize',()=>{sizePhone();schedule();});
  stylesheet.addEventListener('load',schedule);
  sizePhone();requestAnimationFrame(()=>{document.getElementById('appScroll').scrollTop=0;schedule();});
  // On HTTP prefer the formal file; file mode uses exactly the embedded snapshot.
  if(location.protocol==='http:' || location.protocol==='https:') {
    fetch('./.prototype-annotations/m06/annotations.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('mapping');return r.json();}).then(fresh=>{
      if(fresh.project?.id!==payload.project.id || fresh.workflowMode!=='review-center-readonly' || fresh.mappingRevision!==payload.mappingRevision) return;
      if(JSON.stringify(fresh)!==JSON.stringify(payload)) { console.warn('M06 mapping differs from paired snapshot; rebuild the review package.'); return; }
      payload=fresh;schedule();
    }).catch(()=>{});
  }
})();
