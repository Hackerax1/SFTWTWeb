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
  