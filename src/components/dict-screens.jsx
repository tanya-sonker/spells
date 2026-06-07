import React, { useState, useEffect, useRef } from 'react'
import { IcoSearch, IcoExport, IcoTrash, IcoSpeaker, IcoBack } from './dict-icons'
import { pronounce, lookupWord, PosLabel } from './dict-shell'

export function SpeakBtn({ word, variant, size = 'sm' }) {
  return (
    <button
      className={'speak ' + size}
      onClick={(e) => { e.stopPropagation(); pronounce(word, variant); }}
      title={variant === 'uk' ? 'Hear (British)' : 'Hear (American)'}
      aria-label="Pronounce"
    >
      <IcoSpeaker size={size === 'lg' ? 22 : 18} />
    </button>
  );
}

function csvCell(v) {
  const s = String(v == null ? '' : v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function exportCSV(words) {
  const headers = ['Word (US)', 'Word (UK)', 'Part of speech', 'Pronunciation (US)', 'Pronunciation (UK)', 'Definition', 'From your reading', 'Date added'];
  const rows = words.map(w => [
    w.us, w.uk, w.pos, w.ipaUS || '', w.ipaUK || '',
    (w.senses[0] && w.senses[0].gloss) || '', w.context || '', w.added || '',
  ]);
  const csv = '\uFEFF' + [headers, ...rows].map(r => r.map(csvCell).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'spells-library-' + new Date().toISOString().slice(0, 10) + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function Collection({ words, variant, onOpen, onDelete, layout, setLayout }) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const filtered = !query ? words : words.filter(w =>
    w[variant].toLowerCase().includes(query) ||
    w.pos.includes(query) ||
    w.senses.some(s => s.gloss.toLowerCase().includes(query))
  );

  return (
    <section className="screen">
      <div className="screen-head">
        <p className="eyebrow"></p>
        {/* <h1 className="display">Library</h1> */}
        <p className="lede">{words.length} words gathered from your reading</p>
      </div>

      <div className="searchfield slim">
        <IcoSearch size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a word …" autoComplete="off" />
        {q && <button className="clearx" onClick={() => setQ('')}>&times;</button>}
      </div>

      <div className="lib-toolbar">
        <div className="segmented" role="tablist" aria-label="Layout">
          {[{ id: 'index', label: 'Index' }, { id: 'cards', label: 'Cards' }].map(l => (
            <button key={l.id} role="tab" aria-selected={layout === l.id}
              className={'seg' + (layout === l.id ? ' on' : '')}
              onClick={() => setLayout(l.id)}>{l.label}</button>
          ))}
        </div>
        <button className="export-btn" onClick={() => exportCSV(words)} disabled={words.length === 0} title="Export to CSV / Excel">
          <IcoExport size={16} />
          <span>Export</span>
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="noresults">No words match “{q}”.</p>
      )}

      {layout === 'index' && filtered.length > 0 && (
        <ol className="index-list">
          {[...filtered].sort((a, b) => a[variant].localeCompare(b[variant])).map((w, i) => (
            <li key={w.id} className="index-row">
              <button className="row-main" onClick={() => onOpen(w.id)}>
                <span className="idx-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="idx-word">{w[variant]}</span>
                <span className="idx-pos">{w.pos}</span>
              </button>
              <button className="row-del" onClick={() => onDelete(w.id)} aria-label={'Remove ' + w[variant]} title="Remove">
                <IcoTrash size={18} />
              </button>
            </li>
          ))}
        </ol>
      )}

      {layout === 'cards' && filtered.length > 0 && (
        <div className="card-stack">
          {filtered.map((w) => (
            <article key={w.id} className="wordcard">
              <button className="card-main" onClick={() => onOpen(w.id)}>
                <div className="wc-top">
                  <h2 className="wc-word">{w[variant]}</h2>
                  <PosLabel>{w.pos}</PosLabel>
                </div>
                <p className="wc-gloss">{w.senses[0].gloss}</p>
                <p className="wc-ex">"{w.context}"</p>
              </button>
              <div className="card-actions">
                <SpeakBtn word={w[variant]} variant={variant} />
                <button className="speak sm danger" onClick={() => onDelete(w.id)} aria-label={'Remove ' + w[variant]} title="Remove">
                  <IcoTrash size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function Detail({ word, variant, onBack }) {
  if (!word) return null;
  const spelling = word[variant];
  const ipa = variant === 'uk' ? word.ipaUK : word.ipaUS;
  return (
    <section className="screen detail">
      <button className="textback" onClick={onBack}><IcoBack size={18} /> Library</button>
      <div className="detail-head">
        <h1 className="detail-word">{spelling}</h1>
        <div className="pron">
          <PosLabel>{word.pos}</PosLabel>
          <span className="ipa">| {ipa} |</span>
          <SpeakBtn word={spelling} variant={variant} size="lg" />
        </div>
      </div>
      <div className="rule-full"></div>
      <div className="sense-selected">
        <p className="sense-gloss">{word.senses[0].gloss}</p>
      </div>
      {word.context && (
        <div className="context-note">
          <p className="cn-label">From your reading</p>
          <p className="cn-text">"{word.context}"</p>
        </div>
      )}
    </section>
  );
}

export function Search({ words, variant, onAdd, onOpen, onAdded }) {
  const [term, setTerm] = useState('');
  const [query, setQuery] = useState('');
  const [chosen, setChosen] = useState(0);
  const [excerpt, setExcerpt] = useState('');
  const [justAdded, setJustAdded] = useState(false);
  const [status, setStatus] = useState('idle');
  const [entry, setEntry] = useState(null);
  const reqId = useRef(0);

  const inLibrary = entry ? words.some(w => w.id === entry.id) : false;

  useEffect(() => {
    const key = query.trim().toLowerCase();
    setChosen(0); setExcerpt(''); setJustAdded(false);
    if (!key) { setStatus('idle'); setEntry(null); return; }
    const myId = ++reqId.current;
    if (window.LOOKUP_DB && window.LOOKUP_DB[key]) { setEntry(window.LOOKUP_DB[key]); setStatus('found'); return; }
    setStatus('loading'); setEntry(null);
    const t = setTimeout(async () => {
      const res = await lookupWord(key);
      if (myId !== reqId.current) return;
      if (res) { setEntry(res); setStatus('found'); } else { setStatus('notfound'); }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  function handleSubmit(e) {
    if (e) e.preventDefault();
    setQuery(term.trim());
  }

  const suggestions = Object.values(window.LOOKUP_DB || {})
    .filter(w => !words.some(x => x.id === w.id)).slice(0, 6);

  function doAdd() {
    onAdd(entry, chosen, excerpt.trim());
    setJustAdded(true);
    setTimeout(() => { setTerm(''); onAdded && onAdded(); }, 950);
  }

  return (
    <section className="screen">
      <div className="screen-head">
        <p className="eyebrow"></p>
        {/* <h1 className="display">Search</h1> */}
        <p className="lede">Look up a word to add it to your library</p>
      </div>

      <div className="searchfield">
        <IcoSearch size={20} />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}
          placeholder="Type a word ..."
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
        />
        {term && <button className="clearx" onClick={() => { setTerm(''); setQuery(''); }}>&times;</button>}
      </div>

      {/* {status === 'idle' && (
        <div className="suggest">
          <p className="section-tag">Try one of these</p>
          <div className="chips">
            {suggestions.map(w => (
              <button key={w.id} className="chip" onClick={() => setTerm(w[variant])}>{w[variant]}</button>
            ))}
          </div>
        </div>
      )} */}

      {status === 'loading' && (
        <p className="looking">Looking up “{term.trim()}”…</p>
      )}

      {status === 'notfound' && (
        <p className="noresults">No entry for “{term.trim()}”. Try another spelling.</p>
      )}

      {status === 'found' && entry && inLibrary && (
        <div className="lookup">
          <div className="lk-top">
            <h2 className="lk-word">{entry[variant] || entry.id}</h2>
            <PosLabel>{entry.pos}</PosLabel>
            <SpeakBtn word={entry[variant] || entry.id} variant={variant} />
          </div>
          <p className="already">Already in your library.
            <button className="linkbtn" onClick={() => onOpen(entry.id)}> View entry ›</button>
          </p>
        </div>
      )}

      {status === 'found' && entry && !inLibrary && (
        <div className="addflow">
          <div className="lookup">
            <div className="lk-top">
              <h2 className="lk-word">{entry[variant] || entry.id}</h2>
              <PosLabel>{entry.pos}</PosLabel>
              <SpeakBtn word={entry[variant] || entry.id} variant={variant} />
            </div>
            {(variant === 'uk' ? entry.ipaUK : entry.ipaUS) && (
              <p className="ipa lk-ipa">| {variant === 'uk' ? entry.ipaUK : entry.ipaUS} |</p>
            )}
            <p className="lk-prompt">Select the sense that matches your context</p>
            <div className="choices">
              {entry.senses.map((s, i) => (
                <button key={i} className={'choice' + (chosen === i ? ' on' : '')} onClick={() => setChosen(i)}>
                  <span className="ch-num">{i + 1}</span>
                  <span className="ch-text">{s.gloss}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="capture">
            <p className="cap-help">Paste the line from the book you&rsquo;re reading <span className="muted">(optional)</span>.</p>
            <textarea className="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Enter the sentence from your book …" />
          </div>

          <button className={'cta' + (justAdded ? ' done' : '')} onClick={doAdd}>
            {justAdded ? 'Added to your library ✓' : 'Add to Library'}
          </button>
        </div>
      )}
    </section>
  );
}

export default { Collection, Detail, Search };
