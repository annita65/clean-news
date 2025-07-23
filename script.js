const feedGroups = {
  all: [
    { name: "The Hindu", url: "https://www.thehindu.com/feeder/default.rss" },
    { name: "Indian Express", url: "https://indianexpress.com/section/india/feed/" },
    { name: "BBC", url: "http://feeds.bbci.co.uk/news/world/rss.xml" },
    { name: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" }
  ],
  india: [
    { name: "NDTV", url: "https://feeds.feedburner.com/ndtvnews-top-stories" },
    { name: "India Today", url: "https://www.indiatoday.in/rss/home" }
  ],
  "india-finance": [
    { name: "Financial Express", url: "https://www.financialexpress.com/feed/" },
    { name: "Moneycontrol", url: "https://www.moneycontrol.com/rss/latestnews.xml" }
  ],
  world: [
    { name: "Reuters World", url: "http://feeds.reuters.com/Reuters/worldNews" },
    { name: "The Guardian", url: "https://www.theguardian.com/world/rss" }
  ],
  "world-finance": [
    { name: "Reuters Business", url: "http://feeds.reuters.com/reuters/businessNews" },
    { name: "Yahoo Finance", url: "https://finance.yahoo.com/news/rssindex" }
  ]
};

function showTab(tabName) {
  document.querySelectorAll(".news-section").forEach(section => section.style.display = "none");
  const selected = document.getElementById(`news-container-${tabName}`);
  if (selected) selected.style.display = "block";
}

async function fetchRSS(feed, containerId) {
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.items && data.items.length) {
      const container = document.getElementById(containerId);
      data.items.slice(0, 5).forEach(article => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>${feed.name}</strong></p>
          <a href="${article.link}" target="_blank">Read More</a>
        `;
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error(`Error loading ${feed.name}:`, error);
  }
}

async function fetchAllNews() {
  for (const category in feedGroups) {
    const containerId = `news-container-${category}`;
    for (const feed of feedGroups[category]) {
      await fetchRSS(feed, containerId);
    }
  }
}

fetchAllNews();
