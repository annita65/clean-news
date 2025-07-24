# Clean News

Clean News is a lightweight and clutter-free news aggregator website that shows the latest headlines from trusted Indian and global sources using their RSS feeds.

### What it does
- Displays news headlines from sources like The Hindu, Indian Express, CNBC, BBC, Al Jazeera, and more
- Clean and responsive card-based UI
- Categorized tabs (All News, India, India Finance, World, Global Finance)
- Shows publish date and time for each article
- No backend or database — all logic handled on the frontend using vanilla JavaScript

### How it works
- Uses public RSS feed URLs from news websites
- Converts RSS to JSON using the rss2json.com API
- Parses and displays news on cards using plain JavaScript
- All files (`index.html`, `style.css`, `script.js`) are static and hosted via GitHub Pages

### How to run locally
1. Clone the repository  
   `git clone https://github.com/annita65/clean-news.git`
2. Open the `index.html` file in your browser

### Customize or Add Sources
In `script.js`, you can add or update sources by editing the `feeds` object. Make sure to use a valid RSS feed URL.

### Current known issues
- Some sources like LiveMint and Business Standard show outdated or no data due to their RSS feed restrictions.
- Actively looking for alternative reliable free feeds.

### License
Open source under the MIT License.

Made with love for clean and simple news reading.
