const newsContainer = document.getElementById('news-container');

const feeds = {
  all: [
    { name: "The Hindu", url: 'https://www.thehindu.com/feeder/default.rss' },
    { name: "Indian Express", url: 'https://indianexpress.com/section/india/feed/' },
    { name: "BBC World", url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: "Al Jazeera", url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    { name: "Yahoo Finance", url: 'https://finance.yahoo.com/news/rssindex' }
  ],
  india: [
    { name: "The Hindu", url: 'https://www.thehindu.com/feeder/default.rss' },
    { name: "Indian Express", url: 'https://indianexpress.com/section/india/feed/' }
  ],
  indiaFinance: [
    { name: "LiveMint", url: 'https://www.livemint.com/rss/market' },
    { name: "Business Standard", url: 'https://www.business-standard.com/rss/finance/rss.xml' }
  ],
  world: [
    { name: "BBC World", url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: "Al Jazeera", url: 'https://www.aljazeera.com/xml/rss/all.xml' }
  ],
  globalFinance: [
    { name: "Reuters", url: 'http://feeds.reuters.com/news/wealth' },
    { name: "Yahoo Finance", url: 'https://finance.yahoo.com/news/rssindex' }
  ]
};

async function fetchRSS(feed) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.items && data.items.length) {
      data.items.slice(0, 5).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';

        // Handle description or content fallback
        let summary = '';

if (article.description) {
  summary = article.description;
} else if (article.content) {
  summary = article.content;
} else if (article['content:encoded']) {
  summary = article['content:encoded'];
} else {
  summary = 'No summary available.';
}

summary = summary.replace(/<[^>]*>/g, '').trim();
summary = summary.length > 500 ? summary.slice(0, 500) + '...' : summary;

        card.innerHTML = `
  <h3>${article.title}</h3>
  <p><strong>${feed.name}</strong> • ${new Date(article.pubDate).toLocaleString()}</p>
  <p class="summary">${summary}</p>
  <div class="card-buttons">
    <a href="${article.link}" target="_blank">Read More</a>
    <button onclick="readAloud('${encodeURIComponent(article.link)}')">🔊 Read Aloud</button>
  </div>
`;
        newsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error(`Error loading ${feed.name}:`, error);
  }
}

async function showTab(tab) {
  newsContainer.innerHTML = '';
  const selectedFeeds = feeds[tab];
  for (const feed of selectedFeeds) {
    await fetchRSS(feed);
  }
}

// Load all news by default
showTab('all');
async function readAloud(articleUrlEncoded) {
  const articleUrl = decodeURIComponent(articleUrlEncoded);
  const proxyUrl = `https://mercury-parser-api.vercel.app/parser?url=${articleUrl}`;

  try {
    const res = await fetch(proxyUrl);
    const data = await res.json();

    if (!data.content) {
      alert('Unable to fetch readable content.');
      return;
    }

    const text = data.content.replace(/<[^>]+>/g, '').trim(); // Remove HTML tags

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Optional: Adjust reading speed
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Read Aloud Error:', error);
    alert('Failed to read article aloud.');
  }
}
