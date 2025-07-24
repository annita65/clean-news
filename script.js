const newsContainer = document.getElementById('news-container');

const feeds = {
  all: [
    { name: "The Hindu", url: 'https://www.thehindu.com/feeder/default.rss' },
    { name: "Indian Express", url: 'https://indianexpress.com/section/india/feed/' },
    { name: "BBC World", url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: "Al Jazeera", url: 'https://www.aljazeera.com/xml/rss/all.xml' }
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
    { name: "CNBC", url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' }
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

        // Try different fields for the publish date
        const rawDate = article.pubDate || article.published || article.isoDate;
        const publishedDate = rawDate ? new Date(rawDate) : null;

        const formattedDate = publishedDate
          ? publishedDate.toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          : 'Date unavailable';

        card.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>${feed.name}</strong> <em>${formattedDate}</em></p>
          <a href="${article.link}" target="_blank">Read More</a>
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
