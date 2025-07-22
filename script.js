const newsContainer = document.getElementById('news-container');

const feeds = [
  {
    name: "The Hindu",
    url: 'https://www.thehindu.com/feeder/default.rss'
  },
  {
    name: "Indian Express",
    url: 'https://indianexpress.com/section/india/feed/'
  },
  {
    name: "BBC World",
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml'
  },
  {
    name: "Al Jazeera",
    url: 'https://www.aljazeera.com/xml/rss/all.xml'
  }
];

async function fetchRSS(feed) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.items && data.items.length) {
      data.items.slice(0, 5).forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>${feed.name}</strong></p>
          <a href="${article.link}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error(`Error loading ${feed.name}:`, error);
  }
}

async function fetchNews() {
  newsContainer.innerHTML = '';
  for (const feed of feeds) {
    await fetchRSS(feed);
  }
}

fetchNews();
