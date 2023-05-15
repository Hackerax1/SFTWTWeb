// Function to add a new input field for VanityURLs
function addInput() {
    var inputDiv = document.getElementById('input-div');
    var newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'vanityURL';
    newInput.placeholder = 'Enter a VanityURL';
    inputDiv.appendChild(newInput);
  }
  
  // Function to remove the last input field for VanityURLs
  function removeInput() {
    var inputDiv = document.getElementById('input-div');
    if (inputDiv.children.length > 1) {
      inputDiv.removeChild(inputDiv.lastChild);
    }
  }
  
  // Function to send a GET request to the server and display the result
  function getGames() {
    // Get all the input values for VanityURLs
    var inputs = document.getElementsByName('vanityURL');
    var vanityURLs = [];
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        vanityURLs.push(inputs[i].value);
      }
    }
  
    // Send a GET request to the server with the VanityURLs
    fetch('/games?vanityURLs=' + vanityURLs.join(','))
      .then(response => response.json())
      .then(data => {
        // Display the common games
        var commonGames = document.getElementById('common-games');
        commonGames.innerHTML = '';
        if (data.length == 0) {
          commonGames.innerHTML = '<p>No common games found.</p>';
        } else {
          for (var i = 0; i < data.length; i++) {
            var game = document.createElement('p');
            game.innerText = data[i];
            commonGames.appendChild(game);
          }
        }
      })
      .catch(error => console.error(error));
  }
  
  // Function to choose a random game from the common games list
  function chooseRandomGame() {
    var commonGames = document.getElementById('common-games');
    var gamesList = commonGames.getElementsByTagName('p');
    if (gamesList.length > 0) {
      var randomIndex = Math.floor(Math.random() * gamesList.length);
      var randomGame = gamesList[randomIndex].innerText;
      var randomGameText = document.getElementById('random-game-text');
      randomGameText.innerText = randomGame;
    }
  }
  
  // Function to save the common games list to a text file
  function saveGamesList() {
    var commonGames = document.getElementById('common-games');
    var gamesList = commonGames.getElementsByTagName('p');
    if (gamesList.length > 0) {
      var gamesString = '';
      for (var i = 0; i < gamesList.length; i++) {
        gamesString += gamesList[i].innerText + '\n';
      }
      var fileBlob = new Blob([gamesString], { type: 'text/plain' });
      var url = URL.createObjectURL(fileBlob);
      var link = document.createElement('a');
      link.download = 'common_games.txt';
      link.href = url;
      link.click();
    }
  }
  