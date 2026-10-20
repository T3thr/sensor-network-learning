/* Slide-specific teaching; research evidence is separate from explanatory examples. */
(() => {
  'use strict';
  const D = window.PUBTIME_STUDY;
  const $ = id => document.getElementById(id);
  if (!D || !$('studio-study')) return;
  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paras = text => text.map(p => `<p>${esc(p)}</p>`).join('');
  let current = 0, selected = 'lesson', mastered = [];
  try { mastered = JSON.parse(localStorage.getItem('paper4-study-mastered-v2') || '[]'); if (!Array.isArray(mastered)) mastered = []; } catch { mastered = []; }
  const keys = ['lesson','terms','defense'];
  const aliases = {input:'activation'};
  function tab(name, focus = false) {
    selected = name;
    for (const key of keys) {
      const active = key === name, button = $(`study-tab-${key}`);
      button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
      $(`study-panel-${key}`).hidden = !active;
    }
    if (focus) $(`study-tab-${name}`).focus();
  }
  document.querySelectorAll('[data-study-tab]').forEach(button => {
    button.addEventListener('click', () => { window.dispatchEvent(new Event('pubtime-study-open')); tab(button.dataset.studyTab); });
    button.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault(); event.stopPropagation();
      const i = keys.indexOf(selected), n = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
      window.dispatchEvent(new Event('pubtime-study-open')); tab(keys[n], true);
    });
  });
  function terms() {
    const list = $('study-all-terms').checked ? Object.keys(D.terms) : D.lessons[current].terms;
    const query = $('study-term-search').value.trim().toLocaleLowerCase('th');
    const filtered = list.filter(key => {
      const t = D.terms[key];
      return [t.en,t.say,t.meaning,t.origin,t.why,t.use].join(' ').toLocaleLowerCase('th').includes(query);
    });
    $('study-term-count').textContent = `${filtered.length} / ${list.length} รายการ · ${$('study-all-terms').checked ? 'คลังศัพท์ทุกสไลด์' : 'ศัพท์ที่ใช้กับสไลด์ '+(current+1)}`;
    $('study-terms').innerHTML = filtered.map(key => {
      const t = D.terms[key];
      const links = t.related.map(raw => {
        const related = aliases[raw] || raw;
        return D.terms[related] ? `<button type="button" class="study-related" data-term="${related}">${esc(D.terms[related].en)}</button>` : `<span>${esc(raw)}</span>`;
      }).join(' ');
      return `<details class="study-term" id="study-term-${key}"><summary><strong>${esc(t.en)}</strong><span class="study-pronunciation">${esc(t.say)}</span><span>${esc(t.meaning)}</span></summary><dl><dt>ที่มาของคำและแนวคิด [พื้นฐาน]</dt><dd>${esc(t.origin)}</dd><dt>เหตุที่เกี่ยวข้องกับบทความ</dt><dd>${esc(t.why)}</dd><dt>บริบทใช้งานและตัวอย่างประกอบ</dt><dd>${esc(t.use)}</dd></dl><p class="pub-source">${esc(t.source)}</p><div class="study-related-list"><strong>คำเกี่ยวข้อง</strong>${links}</div></details>`;
    }).join('') || '<p class="pub-empty">ไม่พบศัพท์ที่ตรงกับคำค้น</p>';
    $('study-term-expand').textContent = 'เปิดรายละเอียดทั้งหมด';
  }
  $('study-terms').addEventListener('click', event => {
    const button = event.target.closest('[data-term]'); if (!button) return;
    const key = button.dataset.term; $('study-all-terms').checked = true; $('study-term-search').value = D.terms[key].en; terms();
    const detail = $(`study-term-${key}`); if (detail) { detail.open = true; detail.scrollIntoView({block:'nearest'}); detail.querySelector('summary').focus(); }
  });
  $('study-term-search').addEventListener('input', terms);
  $('study-all-terms').addEventListener('change', terms);
  $('study-term-expand').addEventListener('click', () => {
    const details = [...document.querySelectorAll('#study-terms details')];
    const open = details.some(d => !d.open); details.forEach(d => d.open = open);
    $('study-term-expand').textContent = open ? 'ปิดรายละเอียดทั้งหมด' : 'เปิดรายละเอียดทั้งหมด';
  });
  function progress() {
    $('study-mastered').checked = mastered.includes(current);
    $('study-progress').textContent = `ทบทวนแล้ว ${mastered.filter(n => Number.isInteger(n) && n >= 0 && n < 7).length} / 7 หน้า · เก็บในเบราว์เซอร์นี้`;
  }
  $('study-mastered').addEventListener('change', () => {
    mastered = mastered.filter(n => n !== current); if ($('study-mastered').checked) mastered.push(current);
    try { localStorage.setItem('paper4-study-mastered-v2', JSON.stringify(mastered)); } catch { /* Progress remains available for this visit. */ }
    progress();
  });
  function render(index) {
    current = Math.max(0, Math.min(6, index)); const l = D.lessons[current];
    $('study-counter').textContent = `สไลด์ ${current+1} / 7`;
    $('study-goal').textContent = `เป้าหมาย: ${l.goal}`;
    $('study-prerequisite').textContent = `พื้นฐานก่อนอ่าน: ${l.prerequisite}`;
    document.querySelectorAll('.study-nav [data-slide]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.slide) === current)));
    $('study-walk').innerHTML = l.walk.map(([where,text]) => `<li><strong>${esc(where)}</strong><p>${esc(text)}</p></li>`).join('');
    $('study-blocks').innerHTML = l.blocks.map(b => `<article class="study-block"><div class="study-block-meta">[${esc(b.label)}]</div><h4>${esc(b.title)}</h4>${paras(b.text)}<p class="pub-source">${esc(b.source)}</p></article>`).join('');
    const e=l.example;
    $('study-example').innerHTML = `<article class="study-example"><div class="study-block-meta">[${esc(e.label)}]</div><h4>${esc(e.title)}</h4>${paras(e.text)}<ol class="study-flow">${e.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>${e.code ? `<pre class="pub-code">${esc(e.code)}</pre>` : ''}</article>`;
    $('study-traps').innerHTML = l.traps.map(t => `<li>${esc(t)}</li>`).join('');
    $('study-checks').innerHTML = l.checks.map(([q,a],i) => `<details class="study-check"><summary>${i+1}. ${esc(q)}</summary><p>${esc(a)}</p><p class="pub-source">${esc(l.source)} · รายละเอียดและขอบเขตอยู่ในแท็บอ่านภาพ</p></details>`).join('');
    $('study-source-links').innerHTML = l.pages.map(p => `<a href="translation.html#page-${p}">บทแปล PDF หน้า ${p}</a>`).join('') + ' <a href="../assignement/work4/01_original/Paper_IV_1_PRIMARY_PublishTimeOpt_11298742.pdf#page='+l.pages[0]+'">เปิดต้นฉบับ</a>';
    $('study-term-search').value = ''; $('study-all-terms').checked = false;
    terms(); progress(); tab(selected);
  }
  window.addEventListener('pubtime-slide', event => render(event.detail.index));
  render(0);
})();
