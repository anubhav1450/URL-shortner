var nanoId = require('nano-id');

const URL = require('../models/models.url')

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
  shortUrl: `http://localhost:3000/url/${shortID}`
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
    module.exports = {generateNewShortCode,
        handleRedirect
    }
