import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(null);
  const [copied, setCopied] = useState("");
  const [toast, setToast] = useState("");

  // Toast
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  // Fetch all URLs
  const fetchUrls = async () => {
    try {
      const res = await fetch(`${BASE_URL}/all`);
      const data = await res.json();

      setUrls(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  // Create short URL
  const handleShorten = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      setUrl("");

      showToast("Short URL created");

      // realtime refresh
      await fetchUrls();

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete URL
  const handleDelete = async (shortCode) => {
    try {

      await fetch(`${BASE_URL}/${shortCode}`, {
        method: "DELETE",
      });

      setUrls((prev) =>
        prev.filter(
          (item) => item.shortCode !== shortCode
        )
      );

      showToast("Link deleted");

    } catch (err) {
      console.log(err);
    }
  };

  // Copy URL
  const handleCopy = async (shortCode) => {
    try {

      await navigator.clipboard.writeText(
        `${BASE_URL}/${shortCode}`
      );

      setCopied(shortCode);

      showToast("Copied to clipboard");

      setTimeout(() => {
        setCopied("");
      }, 1500);

    } catch (err) {
      console.log(err);
    }
  };

  // Toggle Analytics
  const toggleAnalytics = async (shortCode) => {
    try {

      if (openAnalytics === shortCode) {
        setOpenAnalytics(null);
        return;
      }

      const res = await fetch(
        `${BASE_URL}/analytics/${shortCode}`
      );

      const data = await res.json();

      // realtime clicks update
      setUrls((prev) =>
        prev.map((item) =>
          item.shortCode === shortCode
            ? {
                ...item,
                analyticsData: data,
                visitHistory: Array(data.totalClicks),
              }
            : item
        )
      );

      setOpenAnalytics(shortCode);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d14] text-white">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-[#1a2131] border border-gray-700 px-5 py-3 rounded-2xl shadow-xl animate-pulse">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            URL Shortener
          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-lg">
            Minimal link management dashboard
          </p>

        </div>

        {/* Input */}
        <div className="bg-[#121826] border border-gray-800 rounded-3xl p-4 sm:p-5 shadow-xl">

          <div className="flex flex-col sm:flex-row gap-4">

            <input
              type="text"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-[#0b0f19] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 transition"
            />

            <button
              onClick={handleShorten}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                "Shorten"
              )}
            </button>

          </div>

        </div>

        {/* Cards */}
        <div className="mt-8 space-y-5">

          {urls.length === 0 ? (

            <div className="bg-[#121826] border border-gray-800 rounded-3xl p-12 text-center text-gray-400">

              <div className="text-6xl mb-4">
                🔗
              </div>

              <h2 className="text-2xl font-semibold">
                No Links Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Create your first short URL
              </p>

            </div>

          ) : (

            urls.map((item, i) => (

              <div
                key={i}
                className="bg-[#121826] border border-gray-800 rounded-3xl p-5 sm:p-6 hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >

                {/* Top */}
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">

                  {/* Left */}
                  <div className="flex-1 min-w-0">

                    <a
                      href={`${BASE_URL}/${item.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition text-lg font-semibold break-all"
                    >
                      {BASE_URL.replace("https://", "")}/
                      {item.shortCode}
                    </a>

                    <p className="text-gray-500 mt-3 text-sm break-all">
                      {item.originalURL}
                    </p>

                  </div>

                  {/* Right */}
                  <div className="flex flex-wrap items-center gap-3">

                    {/* Click Badge */}
                    <div className="bg-[#1a2131] px-4 py-2 rounded-xl text-sm text-gray-300">
                      {item.visitHistory.length} clicks
                    </div>

                    {/* Copy */}
                    <button
                      onClick={() =>
                        handleCopy(item.shortCode)
                      }
                      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300
                        
                        ${
                          copied === item.shortCode
                            ? "bg-green-500/20 text-green-400"
                            : "bg-[#1a2131] hover:bg-[#27324a]"
                        }
                      `}
                    >
                      {copied === item.shortCode
                        ? "Copied"
                        : "Copy"}
                    </button>

                    {/* Analytics */}
                    <button
                      onClick={() =>
                        toggleAnalytics(item.shortCode)
                      }
                      className="bg-[#1a2131] hover:bg-[#27324a] transition-all px-4 py-2 rounded-xl text-sm"
                    >
                      {openAnalytics === item.shortCode
                        ? "Hide"
                        : "Analytics"}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDelete(item.shortCode)
                      }
                      className="bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-all px-4 py-2 rounded-xl text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                {/* Analytics */}
                {openAnalytics === item.shortCode &&
                  item.analyticsData && (

                  <div className="mt-6 border-t border-gray-800 pt-6">

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Total Clicks */}
                      <div className="bg-[#0b0f19] border border-gray-800 rounded-2xl p-5">

                        <p className="text-gray-400 text-sm">
                          Total Clicks
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                          {item.analyticsData.totalClicks}
                        </h2>

                      </div>

                      {/* Last Visit */}
                      <div className="bg-[#0b0f19] border border-gray-800 rounded-2xl p-5">

                        <p className="text-gray-400 text-sm">
                          Last Visited
                        </p>

                        <h2 className="text-sm mt-3 text-gray-300 break-words">
                          {item.analyticsData.lastVisited
                            ? new Date(
                                item.analyticsData.lastVisited
                              ).toLocaleString()
                            : "No visits yet"}
                        </h2>

                      </div>

                    </div>

                    {/* Timeline */}
                    <div className="mt-5">

                      <h3 className="text-lg font-semibold mb-4">
                        Visit Timeline
                      </h3>

                      <div className="space-y-3 max-h-52 overflow-y-auto pr-2">

                        {item.analyticsData.analytics
                          .slice()
                          .reverse()
                          .map((visit, index) => (

                            <div
                              key={index}
                              className="bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-gray-300 text-sm hover:border-gray-700 transition"
                            >
                              {new Date(
                                visit.timestamp
                              ).toLocaleString()}
                            </div>
                          ))}

                      </div>

                    </div>

                  </div>
                )}

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;