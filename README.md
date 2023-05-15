# Steam Common Games Finder

This is a web application that allows users to input their Steam Vanity URLs and find the common games they own with their friends. Users can also pick a random common game and save the list of common games to a text file.

## Getting Started

To run this application, you will need to have Node.js installed on your computer. Once you have Node.js installed, follow these steps:

1. Clone this repository to your local machine
2. Navigate to the root directory of the project in your terminal
3. Run `npm install` to install the required dependencies
4. Create a `.env` file in the root directory of the project and add your Steam API key as the value for the `STEAM_API_KEY` variable (e.g. `STEAM_API_KEY=YOUR_API_KEY`)
5. Run `npm start` to start the application
6. Open a web browser and navigate to `http://localhost:3000` to access the application

## Usage

### Input Vanity URLs

On the homepage, input your Steam Vanity URLs separated by commas in the input field provided.

### Get Common Games

Click the "Get Common Owned Games" button to see a list of games that are owned by all players.

### Pick a Random Game

Click the "Pick a Random Game" button to select a random game from the list of common games.

### Save List of Common Games

Click the "Save List of Common Games" button to save the list of common games to a text file. The filename will be the combined Vanity URLs separated by dashes.

## Technologies Used

- Node.js
- Express
- EJS
- Bootstrap
- Steam API

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
