import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Header, IslandBar } from './components/dict-shell'
import Landing from './components/dict-home'
import { Search, Collection, Detail } from './components/dict-screens'
import { DICT_WORDS } from './data/dict-data'

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch (e) { return fallback; }
}
function loadWords() {
  try {
    const raw = localStorage.getItem('spells_words');
    if (raw) { const a = JSON.parse(raw); if (Array.isArray(a) && a.length >= 0) return a; }
  } catch (e) {}
  return DICT_WORDS;
}

function AppRoutes({ words, variant, addWord, deleteWord, layout, setLayout }) {
  const navigate = useNavigate();
  const openWord = (id) => navigate(`/library/${encodeURIComponent(id)}`);
  const goLibrary = () => navigate('/library/index');

  function LibraryDetail() {
    const { id } = useParams();
    const word = words.find((x) => x.id === id);
    return <Detail word={word} variant={variant} onBack={() => navigate('/library/index')} />;
  }

  function handleSetLayout(next) {
    try { setLayout(next); } catch (e) {}
    navigate(`/library/${next}`);
  }

  return (
    <Routes>
      <Route path="/" element={<Landing count={words.length} />} />
      <Route path="/search" element={
        <Search
          words={words}
          variant={variant}
          onAdd={addWord}
          onOpen={openWord}
          onAdded={goLibrary}
        />
      } />
      <Route path="/library" element={<Navigate replace to="/library/index" />} />
      <Route path="/library/index" element={
        <Collection
          words={words}
          variant={variant}
          onOpen={openWord}
          onDelete={deleteWord}
          layout={layout === 'cards' ? 'index' : 'index'}
          setLayout={handleSetLayout}
        />
      } />
      <Route path="/library/cards" element={
        <Collection
          words={words}
          variant={variant}
          onOpen={openWord}
          onDelete={deleteWord}
          layout={layout === 'cards' ? 'cards' : 'cards'}
          setLayout={handleSetLayout}
        />
      } />
      <Route path="/library/:id" element={
        <LibraryDetail />
      } />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default function App() {
  const [words, setWords] = useState(loadWords);
  const [variant, setVariant] = useState(() => load('rl_variant', 'us'));
  const [layout, setLayout] = useState(() => {
    const v = load('rl_layout', 'index');
    return v === 'gallery' ? 'index' : v;
  });

  useEffect(() => { try { localStorage.setItem('rl_variant', variant); } catch (e) {} }, [variant]);
  useEffect(() => { try { localStorage.setItem('rl_layout', layout); } catch (e) {} }, [layout]);
  useEffect(() => { try { localStorage.setItem('spells_words', JSON.stringify(words)); } catch (e) {} }, [words]);
  useEffect(() => { if (window.speechSynthesis) window.speechSynthesis.getVoices(); }, []);

  function addWord(entry, chosenIdx, excerpt) {
    if (!entry) return;
    const pick = entry.senses[chosenIdx] || entry.senses[0];
    const newWord = {
      id: entry.id, us: entry.us, uk: entry.uk, pos: entry.pos,
      ipaUS: entry.ipaUS, ipaUK: entry.ipaUK,
      senses: [pick],
      context: excerpt || pick.example,
      added: new Date().toISOString().slice(0, 10),
    };
    setWords((prev) => prev.some(w => w.id === newWord.id) ? prev : [newWord, ...prev]);
  }

  function deleteWord(id) {
    setWords((prev) => prev.filter(w => w.id !== id));
  }

  const dark = variant === 'uk';

  return (
    <BrowserRouter>
      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className={'dict'} data-theme={dark ? 'dark' : 'light'}>
          <div className="grain" aria-hidden="true"></div>
          <Header variant={variant} setVariant={setVariant} />
          <IslandBar />
          <main className="scroll">
            <AppRoutes
              words={words}
              variant={variant}
              addWord={addWord}
              deleteWord={deleteWord}
              layout={layout}
              setLayout={setLayout}
            />
            <div className="scroll-pad"></div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
