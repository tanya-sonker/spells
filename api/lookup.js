export default async function handler(req, res) {
  const term = (req.query.term || '').trim();
  if (!term) {
    return res.status(400).json({ error: 'Missing term' });
  }

  const apiKey = process.env.MW_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing MW_API_KEY' });
  }

  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${encodeURIComponent(term)}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Lookup API error', error);
    return res.status(500).json({ error: 'Lookup failed' });
  }
}
