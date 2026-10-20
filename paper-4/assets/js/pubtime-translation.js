(() => {
 'use strict';const $=id=>document.getElementById(id),main=$('translation-main');let size=100;
 function save(key,value){try{localStorage.setItem(key,value);}catch{/* Reading remains functional when storage is unavailable. */}}
 function read(key){try{return localStorage.getItem(key);}catch{return null;}}
 function mode(value){if(!['dual','thai','english'].includes(value))value='dual';main.dataset.mode=value;document.querySelectorAll('[data-mode]').forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b.dataset.mode===value));});save('pubtime-reading-mode',value);}
 document.querySelectorAll('button[data-mode]').forEach(b=>b.addEventListener('click',()=>mode(b.dataset.mode)));mode(read('pubtime-reading-mode')||'dual');
 function font(value){size=Math.max(80,Math.min(140,value));main.style.setProperty('--reading-size',`${size/100}rem`);$('font-value').textContent=`${size}%`;$('font-minus').disabled=size<=80;$('font-plus').disabled=size>=140;save('pubtime-reading-size',String(size));}
 font(Number(read('pubtime-reading-size'))||100);$('font-minus').addEventListener('click',()=>font(size-10));$('font-plus').addEventListener('click',()=>font(size+10));$('font-reset').addEventListener('click',()=>font(100));
 $('page-jump').addEventListener('change',()=>document.getElementById(`page-${$('page-jump').value}`).scrollIntoView({behavior:'instant'}));
 function progress(){let active=1;document.querySelectorAll('.paper-page').forEach(p=>{if(p.getBoundingClientRect().top<window.innerHeight*.4)active=Number(p.id.slice(5));});$('page-jump').value=active;$('reading-progress').textContent=`หน้า ${active} / 5`;document.querySelectorAll('.pub-toc nav a').forEach(a=>{if(a.hash===`#page-${active}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
 let scheduled=false;addEventListener('scroll',()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{progress();scheduled=false;});},{passive:true});progress();
 const dialog=$('figure-dialog');document.querySelectorAll('[data-zoom]').forEach(img=>{img.tabIndex=0;img.setAttribute('role','button');const open=()=>{$('figure-image').src=img.src;$('figure-image').alt=img.alt;$('figure-caption').textContent=img.alt;dialog.showModal();};img.addEventListener('click',open);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});$('figure-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
})();
