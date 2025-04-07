const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://api.the-odds-api.com/v4";

app.get("/proxy/odds/:sport", async (req, res) => {
  const { sport } = req.params;
  const {
    regions = "us",
    markets = "h2h,spreads,totals",
    bookmakers,
  } = req.query;

  try {
    const url = `${BASE_URL}/sports/${sport}/odds`;
    const response = await axios.get(url, {
      params: {
        apiKey: process.env.ODDS_API_KEY,
        regions,
        markets,
        bookmakers,
      },
    });

    res.json({ data: response.data }); // Wrap array in an object
  } catch (err) {
    console.error("Error fetching odds:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch odds." });
  }
});

app.listen(PORT, () => {
  console.log(`Odds API Proxy running at http://localhost:${PORT}`);
});
