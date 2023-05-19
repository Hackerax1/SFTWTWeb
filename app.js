const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const path = require('path');
const ejs = require('ejs');
const app = express();

require('dotenv').config()

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '/public')));

// Define the home page route
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/getFriends', async (req, res) => {
  try {
    const { vanityUrl } = req.body;
    const steamID = await axios.get(
      `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${process.env.STEAM_API_KEY}&vanityurl=${vanityUrl}`
    );

    // console.log(steamID);
    const friends = await axios.get(
      `https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamID.data.response.steamid}&relationship=friend`
    );
    //console.log(friends);
    const friendsList = friends.data.friendslist.friends;
    //add user's steamid to friendsList
    friendsList.push({ steamid: steamID.data.response.steamid });
    // console.log(friendsList + "friendsList");
    const friendsIds = friendsList.map((friend) => friend.steamid);
    const friendsInfo = await Promise.all(
      friendsIds.map(async (friend) => {
        const response = await axios.get(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${friend}`
        );
        // console.log(response.data.response.players[0]);
        return response.data.response.players[0];
      })
    );



    //trim friendsInfo to only include personaname, steamid, and avatar
    const friendsInfoTrimmed = friendsInfo.map((friend) => {
      //trim profileurl to only include vanityUrl
      const vanityUrl = friend.profileurl.split('/')[4];
      return {
        steamID: friend.steamid,
        personaname: friend.personaname,
        avatar: friend.avatar,
        vanityUrl: vanityUrl,
      };
    });
    console.log(friendsInfoTrimmed)
    res.json(friendsInfoTrimmed);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


//get data from submitFriends and send to games page
app.post('/submitFriends', async (req, res) => {
  try {
    const { friends } = req.body;
    console.log(friends);
    res.render('games', {friends: friends});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Define the route to handle form submissions
app.post('/getGames', async (req, res) => {
  try {
    const { steamIds } = req.body;
    console.log(steamIds);

    // Get the owned games for each Steam ID
    const ownedGames = await Promise.all(
      steamIds.map(async (steamId) => {
        console.log(steamId);
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
    //alphebetize commonGames
    commonGames.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    // Render the games template with the common games
    res.json(commonGames)
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
