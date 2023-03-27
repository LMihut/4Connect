# Connect 4

## Getting Started

Hey there, Welcome to the Connect 4 game made as a project for AWD module. In this repository you will find all the necessary files to run the application.
The game Connect4 was developed by a group of students at Darmstadt University of Applied Sciences as part of the block course 'Advanced Web Development' in SS 2021.

Project Developers:
- Nikita Fabian Bogutzki
- Joseph Acosta-Becker
- Felix Clemens Karl Christians
- Lavinia Mihut
- Haythem Trabelsi 

## Tech/framework used
- React
- Express
- Node
- MySQL
- REST

## Motivation
Our Motivation in this project was to overcome the classic rule of Connect 4 of having set rules. Therefore we decided to implement this game with the advantages that in our game  you can adjust the size of the playing field as you like, so that the joy of playing can never be lost.

### Requirements
This application is based on docker, therefore you need to install docker locally. Take a look under this link on how to do that. https://docs.docker.com/get-started/

You can start the whole project with `docker-compose up -d` and you will find the project under `http://localhost:3000`

### Installation with Docker

- Go to the initial folder and start the Frontend/Backend/Database with

```bash
docker-compose up -d
```

### Updating the schema of the database

```bash
docker-compose exec backend bash
npm run typeorm schema:drop # Deletes the current schema
npm run typeorm schema:sync # Creates a schema based on your data
```

### Now you can start the application.

## Project Functionality

#### Starting the application
- Go to the initial folder and start the Frontend/Backend/Database with

```bash
docker-compose up 
```
The frontend of this project is accessible under `http://localhost:3000`.
Upon entring this URL you will find the first page which is the login/Register page. 
### Pages
#### Login/Register Page
- Upon accessing the login page you will have to register as a user in order to be able to play the game.
- This page is also accessible under `http://localhost:3000/login`.
<img src=Docs/Screenshots/loginregister.png width="60%">

#### Dashboard Page
After logging in you will be directed to the dashboard page, in which you will find the following features
- Played Games
    - In this section you will find the history of all the games that you have played in the past.
- Profile
    - In this section you will find your Elo Score, how many games you've won and lost.
- Leaderboard
    - In this section you will find a leaderboard of players that exist in the Database.

This page is also accessible under `http://localhost:3000/dashboard`

<img src=Docs/Screenshots/dashboardPage.png width="80%">

#### New Game Page
After you click the button `Next Game` in Dashboard you will be directed to the new game page.
In this page you can specify the preferred settings that you want to play the game with such as :
- Board Width
- Board Heigth
- Row count to win

Afterwards you can create a room for the game and wait until an opponent comes. You can do this by clicking `Create Game Session`.
Otherwise you can see all the available rooms and choose one of them unless there is more than two players in the room.
When you have already chosen a room you can find all the details regarding that room on the `Game Room Details` section on the right.
After choosing a room you can join this room to play by clicking the `Join as Player` button.
This page is also accessible under `http://localhost:3000/newgame`.

<img src=Docs/Screenshots/newGamePage.png width="80%">

#### Game Page 
After choosing your preferred settings and joining a room you will be directed to the main page of this project, which is the game page.
In this page you can actually play the game against an opponent along with communicating with him through the chat box.
It is also possible to redo some moves with the help of the buttons on the bottom. 

<img src=Docs/Screenshots/newGame.png width="80%">

<img src=Docs/Screenshots/gameOver.png width="80%">

#### Settings Page
In this page you have the ability to either change your name or to change the theme of the website.
There are two available themes `Dark Theme` and `Light Theme`.
This page is also accessible under `http://localhost:3000/settings`.

<img src=Docs/Screenshots/newGameLight.png width="40%"> <img src=Docs/Screenshots/newGamePage.png width="40%"> 

#### Navigation List
In every page of this website there is a navigation list on the left with which you can access all the available pages. and most importantly you can logout of the website by clicking `Logout`.

#### Help Page
You can find here some information about the functionality of the webpage.
This page is also accessible under `http://localhost:3000/help`.

## Backend Routes

### Global Router
The global router is the main router with which an access to all endpoints is available. possible subrouters are `player`, `game` and `move`.
#### Player
With the player router it is possible to:
- Create a player
```sh
    http://localhost:4000/api/player
    with POST
```
- Read all players
```sh
    http://localhost:4000/api/player
    with GET
```
- Update a player
```sh
    http://localhost:4000/api/player/"id"
    with PUT
```
- Delete a player
```sh
    http://localhost:4000/api/player/"id"
    with DELETE
```
- Sorting players based on their Elo scores.
```sh
    http://localhost:4000/api/player/sortplayers
    with GET
```
#### Game
With the game router it is possible to:

- Create a game
```sh
    http://localhost:4000/api/game
    with POST
```
- Read all games
```sh
    http://localhost:4000/api/game
    with GET
```
- Update a game
```sh
    http://localhost:4000/api/game/"id"
    with PUT
```
- Delete a game
```sh
    http://localhost:4000/api/game/"id"
    with DELETE
```
- Limit number of shown games
```sh
    http://localhost:4000/api/game/somegames?limit=1
    with GET
```
- Games played by a single player
```sh
    http://localhost:4000/api/game/gameplayedby/"playerid"
    with GET
```
- Players playing in one game
```sh
    http://localhost:4000/api/game/players/"gameid"
    with GET
```
- Number of games Won by a player
```sh
    http://localhost:4000/api/game/gamesWon/"playerid"
    with GET
```
- Number of games Lost by a player
```sh
    http://localhost:4000/api/game/gamesLost/"playerid"
    with GET
```
#### Move
With the move router it is possible to:
- Create a move
```sh
    http://localhost:4000/api/move
    with POST
```
- Read all moves of one game
```sh
    http://localhost:4000/api/move/"gameid"
    with GET
```

#### Register / Login
With the user router it is possible to:
- Register as a new player
```sh
    http://localhost:4000/api/user
    with POST
```
- Login to the website with your credentials such as E-Mail and password
```sh
    http://localhost:4000/api/user/token
    with POST
```

## License

MIT © 


















