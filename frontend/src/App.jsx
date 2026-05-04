import { useState } from "react";

const BASE_URL = "https://url-shortner-216y.onrender.com";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);

  //  Create short URL
  const handleShorten = async () => {
    try {
      const res = await fetch(`${BASE_URL}/url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      if (!res.ok) {
        const err = await res.text();
        console.log("Error:", err);
        return;
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
      setAnalytics(null); // reset analytics
    } catch (err) {
      console.log("Network error:", err);
    }
  };

  //  Get analytics
  const getAnalytics = async () => {
    try {
      const code = shortUrl.split("/").pop();

      const res = await fetch(
        `${BASE_URL}/url/analytics/${code}`
      );

      if (!res.ok) {
        const err = await res.text();
        console.log("Error:", err);
        return;
      }

      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.log("Network error:", err);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🔗 URL Shortener</h1>

      {/* Input */}
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button onClick={handleShorten}>
        Shorten
      </button>

      {/* Short URL */}
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Short URL:</strong>{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>

          <button onClick={getAnalytics}>
            Get Analytics
          </button>
        </div>
      )}

      {/* Analytics */}
      {analytics && (
        <div style={{ marginTop: "20px" }}>
          <h3>Total Clicks: {analytics.totalClicks}</h3>

          {analytics.analytics.map((item, i) => (
            <p key={i}>
              {new Date(item.timestamp).toLocaleString()}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
