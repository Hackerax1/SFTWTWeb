const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const ejs = require('ejs');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the home page route
app.get('/', (req, res) => {
  res.render('index');
});

// Define the route to handle form submissions
app.post('/get-games', async (req, res) => {
  try {
    const { vanityUrls } = req.body;

    // Convert the list of vanity URLs to a list of Steam IDs
    const steamIds = await Promise.all(
      vanityUrls.map(async (vanityUrl) => {
        const response = await axios.get(
          `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_API_KEY}&vanityurl=${vanityUrl}`
        );
        return response.data.response.steamid;
      })
    );

    // Get the owned games for each Steam ID
    const ownedGames = await Promise.all(
      steamIds.map(async (steamId) => {
        const response = await axios.get(
          `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=1`
        );
        return response.data.response.games;
      })
    );

    // Find the common games
    const commonGames = ownedGames.reduce((acc, games) => {
      const appIds = games.map((game) => game.appid);
      return acc.filter((game) => appIds.includes(game.appid));
    });

    // Render the games template with the common games
    res.render('games', { commonGames });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
