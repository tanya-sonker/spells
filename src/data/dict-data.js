// Seed dictionary data. Exports DICT_WORDS and LOOKUP_DB.
export const DICT_WORDS = [
  {
    id: 'beguile',
    us: 'beguile', uk: 'beguile',
    pos: 'verb',
    ipaUS: 'bɪˈɡaɪl', ipaUK: 'bɪˈɡʌɪl',
    added: '2026-06-03',
    senses: [
      { gloss: 'To deceive or mislead, especially in a charming way; to hoodwink.',
        example: 'The traveller was beguiled into parting with his last coin.' },
      { gloss: 'To engage the interest of by, or as if by, guile; to charm or enchant.',
        example: 'She was beguiled by the warmth of his voice.' },
      { gloss: 'To while away time pleasantly.',
        example: 'They beguiled the long afternoon with old stories.' },
    ],
    context: 'He had a way of beguiling strangers into confidences.',
  },
  {
    id: 'misplaced',
    us: 'misplaced', uk: 'misplaced',
    pos: 'adjective',
    ipaUS: 'ˌmɪsˈpleɪst', ipaUK: 'ˌmɪsˈpleɪst',
    added: '2026-06-05',
    senses: [
      { gloss: 'Incorrectly positioned.',
        example: 'A million dollars had been lost because of a misplaced comma.' },
      { gloss: 'Not appropriate or correct in the circumstances.',
        example: 'A telling sign of misplaced priorities.' },
      { gloss: '(Of an emotion) Directed unwisely or to an inappropriate object.',
        example: 'He began to wonder if his sympathy were misplaced.' },
      { gloss: 'Lost; mislaid.',
        example: 'Her misplaced keys.' },
    ],
    context: 'A telling sign of misplaced priorities.',
  },
  {
    id: 'fortuitous',
    us: 'fortuitous', uk: 'fortuitous',
    pos: 'adjective',
    ipaUS: 'fɔːrˈtuːɪtəs', ipaUK: 'fɔːˈtjuːɪtəs',
    added: '2026-06-01',
    senses: [
      { gloss: 'Happening by chance rather than intention.',
        example: 'The discovery was entirely fortuitous.' },
      { gloss: 'Happening by a lucky chance; fortunate.',
        example: 'A fortuitous meeting set the whole evening in motion.' },
    ],
    context: 'Their paths crossed in the most fortuitous manner.',
  },
  {
    id: 'lexicon',
    us: 'lexicon', uk: 'lexicon',
    pos: 'noun',
    ipaUS: 'ˈleksɪkɑːn', ipaUK: 'ˈleksɪkən',
    added: '2026-05-28',
    senses: [
      { gloss: 'The vocabulary of a person, language, or branch of knowledge.',
        example: 'The word had quietly entered the common lexicon.' },
      { gloss: 'A dictionary, especially of an ancient language.',
        example: 'She consulted a Greek lexicon for the unfamiliar term.' },
    ],
    context: 'A word seldom found outside a scholar\u2019s lexicon.',
  },
  {
    id: 'colour',
    us: 'color', uk: 'colour',
    pos: 'noun',
    ipaUS: 'ˈkʌlər', ipaUK: 'ˈkʌlə',
    added: '2026-05-22',
    senses: [
      { gloss: 'The property possessed by an object of producing different sensations on the eye as a result of the way it reflects or emits light.',
        example: 'The colour of the autumn leaves deepened by the hour.' },
      { gloss: 'Vividness or variety of detail; interest.',
        example: 'Local anecdotes lent colour to the report.' },
    ],
    context: 'Every wall had been painted a different colour.',
  },
  {
    id: 'collected',
    us: 'collected', uk: 'collected',
    pos: 'adjective',
    ipaUS: 'kəˈlektɪd', ipaUK: 'kəˈlektɪd',
    added: '2026-05-18',
    senses: [
      { gloss: 'Calm and self-possessed; not perturbed or distracted.',
        example: 'She remained cool and collected throughout the ordeal.' },
      { gloss: 'Brought together into one body or place.',
        example: 'His collected letters were published a decade later.' },
    ],
    context: 'Calm, collected, and entirely unhurried.',
  },
];

export const LOOKUP_DB = {};
DICT_WORDS.forEach((w) => { LOOKUP_DB[w.id] = w; });

[
  {
    id: 'serendipity', us: 'serendipity', uk: 'serendipity', pos: 'noun',
    ipaUS: 'ˌserənˈdɪpədi', ipaUK: 'ˌsɛr(ə)nˈdɪpɪti',
    senses: [
      { gloss: 'The occurrence of events by chance in a happy or beneficial way.',
        example: 'A fortunate stroke of serendipity brought them together.' },
      { gloss: 'The faculty of making fortunate discoveries by accident.',
        example: 'Much of science depends on serendipity.' },
    ],
  },
  {
    id: 'ephemeral', us: 'ephemeral', uk: 'ephemeral', pos: 'adjective',
    ipaUS: 'əˈfem(ə)rəl', ipaUK: 'ɪˈfɛm(ə)r(ə)l',
    senses: [
      { gloss: 'Lasting for a very short time.',
        example: 'Fashions are ephemeral by their very nature.' },
      { gloss: '(Of plants) Having a very short life cycle.',
        example: 'Ephemeral desert flowers bloom after the rains.' },
    ],
  },
  {
    id: 'quixotic', us: 'quixotic', uk: 'quixotic', pos: 'adjective',
    ipaUS: 'kwɪkˈsɑːtɪk', ipaUK: 'kwɪkˈsɒtɪk',
    senses: [
      { gloss: 'Exceedingly idealistic; unrealistic and impractical.',
        example: 'A quixotic crusade against the modern world.' },
    ],
  },
  {
    id: 'halcyon', us: 'halcyon', uk: 'halcyon', pos: 'adjective',
    ipaUS: 'ˈhælsiən', ipaUK: 'ˈhalsɪən',
    senses: [
      { gloss: 'Denoting a period of time in the past that was idyllically happy and peaceful.',
        example: 'The halcyon days of his youth.' },
    ],
  },
  {
    id: 'mellifluous', us: 'mellifluous', uk: 'mellifluous', pos: 'adjective',
    ipaUS: 'məˈlɪfluəs', ipaUK: 'mɛˈlɪflʊəs',
    senses: [
      { gloss: '(Of a voice or words) Sweet or musical; pleasant to hear.',
        example: 'The mellifluous tones of the announcer.' },
    ],
  },
  {
    id: 'languid', us: 'languid', uk: 'languid', pos: 'adjective',
    ipaUS: 'ˈlæŋɡwɪd', ipaUK: 'ˈlaŋɡwɪd',
    senses: [
      { gloss: 'Of a person: disinclined to physical exertion; relaxed and slow.',
        example: 'A languid afternoon spent by the river.' },
      { gloss: 'Weak or faint from illness or fatigue.',
        example: 'She felt languid in the summer heat.' },
    ],
  },
].forEach((w) => { LOOKUP_DB[w.id] = w; });
