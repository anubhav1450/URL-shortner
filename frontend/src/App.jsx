import { useState } from "react";

const BASE_URL = "https://url-shortner-216y.onrender.com";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);

  const handleShorten = async () => {
    const res = await fetch(`${BASE_URL}/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    setShortUrl(data.shortUrl);
    setAnalytics(null);
  };

  const getAnalytics = async () => {
    const code = shortUrl.split("/").pop();

    const res = await fetch(`${BASE_URL}/url/analytics/${code}`);
    const data = await res.json();
    setAnalytics(data);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔗 URL Shortener</h1>

        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleShorten}>
            Shorten
          </button>
        </div>

        {shortUrl && (
          <div style={styles.result}>
            <p>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>

            <button style={styles.secondaryBtn} onClick={getAnalytics}>
              View Analytics
            </button>
          </div>
        )}

        {analytics && (
          <div style={styles.analytics}>
            <h3>Total Clicks: {analytics.totalClicks}</h3>

            <div style={styles.list}>
              {analytics.analytics.map((item, i) => (
                <div key={i} style={styles.listItem}>
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "sans-serif"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  inputRow: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 15px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  result: {
    marginTop: "20px",
    textAlign: "center"
  },
  secondaryBtn: {
    marginTop: "10px",
    padding: "8px 12px",
    background: "#764ba2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  analytics: {
    marginTop: "20px"
  },
  list: {
    maxHeight: "150px",
    overflowY: "auto",
    marginTop: "10px"
  },
  listItem: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    fontSize: "14px"
  }
};

export default App;
