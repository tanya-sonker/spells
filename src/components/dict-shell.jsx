import React from 'react'
import { NavLink } from 'react-router-dom'
import { FlagUS, FlagUK, IcoHome, IcoSearch, IcoLibrary } from './dict-icons'
import { LOOKUP_DB } from '../data/dict-data'

export function pronounce(text, variant) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = variant === 'uk' ? 'en-GB' : 'en-US';
    u.rate = 0.92;
    const voices = synth.getVoices();
    const pick = voices.find(v => v.lang === u.lang)
      || voices.find(v => v.lang && v.lang.startsWith(variant === 'uk' ? 'en-GB' : 'en-US'))
      || voices.find(v => v.lang && v.lang.startsWith('en'));
    if (pick) u.voice = pick;
    synth.speak(u);
  } catch (e) { }
}

export function PosLabel({ children }) {
  return <span className="pos">{children}</span>;
}

export async function lookupWord(term) {
  const key = (term || '').trim().toLowerCase();
  if (!key) return null;
  if (LOOKUP_DB[key]) return LOOKUP_DB[key];
  const url = `/api/lookup?term=${encodeURIComponent(key)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    // The API may return suggestions (array of strings) when the word isn't found.
    if (!Array.isArray(json) || json.length === 0) return null;
    const entry = json.find(e => e && typeof e === 'object') || null;
    if (!entry) return null;

    const id = (entry.meta && entry.meta.id) ? String(entry.meta.id).split(':')[0] : key;
    const pos = entry.fl || '';
    // IPA: try hwi.prs[0].ipa or prs[0].mw to cover variants
    let ipa = '';
    try { ipa = (entry.hwi && entry.hwi.prs && entry.hwi.prs[0] && (entry.hwi.prs[0].ipa || entry.hwi.prs[0].mw)) || ''; } catch (e) { ipa = ''; }

    // shortdef is an array of definition strings
    const defs = Array.isArray(entry.shortdef) ? entry.shortdef.slice(0, 3) : [];
    const senses = defs.map(d => ({ gloss: d, example: '' })).filter(s => s.gloss);

    return {
      id,
      us: id,
      uk: id,
      pos: (pos || '').toLowerCase() || 'word',
      ipaUS: ipa,
      ipaUK: ipa,
      senses,
    };
  } catch (e) {
    return null;
  }
}

export function Header({ variant, setVariant }) {
  const flag = (id, Comp, label) => (
    <button
      className={'flagbtn' + (variant === id ? ' on' : '')}
      onClick={() => setVariant(id)}
      aria-pressed={variant === id}
      title={label}
    >
      <Comp w={30} />
    </button>
  );
  return (
    <header className="appbar">
      <div className="wordmark">
        <img src={`${import.meta.env.BASE_URL}app_logo.png`} className="wm-logo" alt="Spells" />
      </div>
      <div className="flags" role="group" aria-label="English variant">
        {flag('us', FlagUS, 'American English')}
        {flag('uk', FlagUK, 'British English')}
      </div>
    </header>
  );
}

export function IslandBar() {
  const items = [
    { id: 'home', label: 'Home', Ico: IcoHome, to: '/' },
    { id: 'search', label: 'Search', Ico: IcoSearch, to: '/search' },
    { id: 'library', label: 'Library', Ico: IcoLibrary, to: '/library/index' },
  ];
  return (
    <nav className="island" aria-label="Primary">
      {items.map(({ id, label, Ico, to }) => (
        <NavLink
          key={id}
          to={to}
          className={({ isActive }) => 'island-btn' + (isActive ? ' on' : '')}
          aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
          end={id !== 'library'}
        >
          <Ico size={22} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default { pronounce, lookupWord, Header, IslandBar, PosLabel };
