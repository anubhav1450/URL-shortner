import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [urls, setUrls] = useState([]);

  const handleShorten = async () => {
    const res = await fetch("http://localhost:3000/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    setShortUrl(data.shortUrl);
  };

  const getAnalytics = async () => {
    const code = shortUrl.split("/").pop();

    const res = await fetch(
      `http://localhost:3000/url/analytics/${code}`
    );

    const data = await res.json();
    setAnalytics(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <button onClick={handleShorten}>Shorten</button>

      {shortUrl && (
        <>
          <p>
            Short URL: <a href={shortUrl}>{shortUrl}</a>
          </p>

          <button onClick={getAnalytics}>Get Analytics</button>
        </>
      )}

      {analytics && (
        <div>
          <h3>Total Clicks: {analytics.totalClicks}</h3>

          {analytics.analytics.map((item, i) => (
            <p key={i}>{item.timestamp}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;