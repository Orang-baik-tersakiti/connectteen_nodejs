require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

// init client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function search(query) {
  try {
    // ambil access token (client credentials)
    const tokenData = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(tokenData.body.access_token);

    // search track
    const result = await spotifyApi.searchTracks(query);

    // tampilkan judul & artist
    // result.body.tracks.items.slice(0, 5).forEach((track, i) => {
    //   console.log(`${i + 1}. ${track.id} — ${track.artists[0].name}`);
    // });

    return result.body.tracks.items.map((item) => ({
      trackId: item.id,
      artistName: item.artists[0].name,
      songName: item.name,
    }));
  } catch (err) {
    console.error("Error:", err);
  }
}

const getMusic = async (req, res) => {
  try {
    const result = await search(req.query.search);
    return res.json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Ocurred",
    });
  }
};

module.exports = { getMusic };
