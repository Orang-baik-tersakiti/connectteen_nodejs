const axios = require("axios");

let accessToken = "";

// 🔑 Ambil Access Token Spotify
const getAccessToken = async () => {
  const auth = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
  ).toString("base64");

  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
};

// 🔍 Search Lagu
const searchMusic = async (req, res) => {
  try {
    const query = req.query.search;
    if (!query) {
      return res.status(400).json({ error: "Query tidak boleh kosong" });
    }

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 5,
      },
    });

    const songs = response.data.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      image: track.album.images[0]?.url || null,
    }));

    res.json({
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAccessToken,
  searchMusic,
};
