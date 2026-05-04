var nanoId = require('nano-id');

const URL = require('../models/models.url')
const BASE_URL = "https://url-shortner-216y.onrender.com";

async function generateNewShortCode(req,res) {

    try {
        const body = req.body;
    if(!body.url) return res.status(400).json({
        error: 'url is required'
    })
    const shortID = nanoId(8);
    await URL.create({
        shortCode: shortID,
        originalURL: body.url,
        visitHistory: []
    });
   return res.json({
  shortUrl: `${BASE_URL}/url/${shortID}`
});
}
    catch (err) {
        console.log(err); 
    return res.status(500).json({ error: "Server error" });
  }
}
async function handleRedirect(req, res) {
  try {
    const shortCode = req.params.shortCode;

    // DB me find + update (visit history)
    const entry = await URL.findOneAndUpdate(
      { shortCode },
      {
        $push: {
          visitHistory: {
            timestamp: new Date()
          }
        }
      },
      { new: true }
    );

    // Agar nahi mila
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    // Redirect
    return res.redirect(entry.originalURL);

  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
}
async function getAnalytics(req, res) {
  try {
    const { shortCode } = req.params;

    // DB se data lao
    const result = await URL.findOne({ shortCode });

    // Agar shortCode nahi mila
    if (!result) {
      return res.status(404).json({
        error: "Short URL not found"
      });
    }

    // Response bhejo
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
      lastVisited:
        result.visitHistory.length > 0
          ? result.visitHistory[result.visitHistory.length - 1].timestamp
          : null
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Server error"
    });
  }
}
async function getAllUrls(req, res) {
  try {
    const urls = await URL.find().sort({ createdAt: -1 });

    return res.json(urls);

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

    module.exports = {generateNewShortCode,
        handleRedirect, getAnalytics,getAllUrls
    };
