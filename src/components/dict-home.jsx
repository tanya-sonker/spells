import React from 'react'

export function Landing({ count }) {
  return (
    <section className="screen intro">
      <div className="intro-mark">
        <img className="intro-glyph" src={`${import.meta.env.BASE_URL}app_logo.png`} alt="Spells" />
      </div>

      <h1 className="intro-title">Spells</h1>
      <p className="intro-tag">A reader&rsquo;s word collection</p>

      <div className="intro-rule"></div>

      <p className="intro-body">
        Words are spells; Build your book of spells.
      </p>
      <p className="intro-body">
        Keep the words you meet while reading. Look one up, choose the definition
        that fits your page, and save it with the line that sent you searching.
      </p>
      <p className="intro-body">
        Your collection lives in <em>Library</em>. Add a new word from
        <em> Search</em>. Toggle the flags to read and hear words in either American or
        British English.
      </p>
      <p className="intro-body">
        Forever free (open-source). Does not harvest any of your data. Better on mobile.
      </p>
      <p className="intro-body">
        Words are stored locally on your device and can be exported. Will disappear if you remove the app. 
      </p>

      <div className="intro-foot">
        <p className="intro-credit">
          Made by
          <a href="https://tanyasonker.com" target="_blank" rel="noopener noreferrer"> Tanya Sonker</a>
        </p>
      </div>
    </section>
  );
}

export default Landing
