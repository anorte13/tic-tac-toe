const Gameboard = (function() {
    const game = document.querySelectorAll("[class^='board-square']");
    const start = document.getElementById('startGame');
    const gameboard = document.querySelector(".board");
    const gameStatus = document.getElementById('game-status');
    const winningPlayer = document.getElementById('winner');
    
 
    let turn = true;
    let gameButtons = [];
    function renderGameboard() {
     if(gameboard.style.display === 'grid') {
         gameboard.style.display = 'none';
     } else {
         gameboard.style.display = 'grid';
     }
     for (let i = 0; i < game.length; i++) {
         let btn = document.createElement('button');
         btn.id = 'mark' + i;
         btn.classList = 'before'
         game[i].appendChild(btn);
         start.disabled = true;
         gameButtons.push(btn);
         game[i].addEventListener('click', function(){
             addMarker(btn)
         })
     };
    };
    function addMarker(button) {
     const marker = document.getElementById(`${button.id}`)
     gameStatus.innerHTML = 'Current players turn: ' + currentPlayer();
     if(marker.firstChild) {
         return;
     }
     else {
         if(Players.getPlayerName.called == true && Players.getPlayerTwoName.called == true) {
             if(turn){
                 turn = false;
                 playerOneMarks(button), checkHorizontal(), checkDiagonals(), checkVertical(), checkForDraw();
             }
            else {
                turn = true;
                playerTwoMarks(button), checkHorizontal(), checkDiagonals(), checkVertical(), checkForDraw();
             }
         }
         if(checkHorizontal() == true || checkDiagonals() == true || checkVertical() == true){
             Players.playerOneWins();
             gameWinner(Players.getPlayerName());
             return true;
         }
         else if(checkDiagonals() == false || checkHorizontal() == false || checkVertical() == false) {
             Players.computerWins();
             gameWinner(Players.getPlayerTwoName());
             return false;
         }
        else if (Players.getPlayerName.called == false || Players.getPlayerTwoName.called == false){
             alert('Enter name before playing!')
         }
       }
     }
    function playerOneMarks(button) {
     let mark = document.getElementById(`${button.id}`);
     mark.classList = 'mark';
     mark.textContent = 'X'
     mark.value = 'X';
    }
    function playerTwoMarks(button) {
     let mark2 = document.getElementById(`${button.id}`);
     mark2.classList = 'mark2'
     mark2.textContent = 'O';
     mark2.value = 'O';
    }
    function checkHorizontal() {
     for (let i = 0; i < 3; i++) {
         let count = 0;
         let computerCount = 0;
         for (let j = i * 3; j < i * 3 + 3; j++) {
             if(gameButtons[j].value == 'X'){
                 count++;
                 if(count == 3){
                     return true;
                 }
             }
             if(gameButtons[j].value == 'O'){
                 computerCount++
                 if(computerCount == 3){
                     return false;
                 }
             }
             }
         }
     }
     function checkVertical() {
            if(gameButtons[0].value == 'X' && gameButtons[3].value == 'X' && gameButtons[6].value == 'X'){
                return true
               }
               else if(gameButtons[1].value == 'X' && gameButtons[4].value == 'X' && gameButtons[7].value == 'X'){
                return true
               }
               else if(gameButtons[2].value == 'X' && gameButtons[5].value == 'X' && gameButtons[8].value == 'X'){
                return true
               }
               if(gameButtons[0].value == 'O' && gameButtons[3].value == 'O' && gameButtons[6].value == 'O'){
                return false
               }
               else if(gameButtons[1].value == 'O' && gameButtons[4].value == 'O' && gameButtons[7].value == 'O'){
                return false;
               }
               else if(gameButtons[2].value == 'O' && gameButtons[5].value == 'O' && gameButtons[8].value == 'O'){
                return false;
               }
    }
     function checkDiagonals() {
         if(gameButtons[0].value == 'X' && gameButtons[4].value == 'X' && gameButtons[8].value == 'X') {
             return true;
         }
         else if (gameButtons[2].value == 'X' && gameButtons[4].value == 'X' && gameButtons[6].value == 'X'){
             return true;
         }
         if(gameButtons[0].value == 'O' && gameButtons[4].value == 'O' && gameButtons[8].value == 'O'){
            return false;
         }
         else if(gameButtons[2].value == 'O' && gameButtons[4].value == 'O' && gameButtons[6].value == 'O'){
            return false;
        }
        else {
            return null;
        }
    }
    function checkForDraw(){
        if(addMarker === undefined){
            console.log('No winner!');
        }
    }
     function currentPlayer() {
         if(turn) {
             return Players.getPlayerTwoName();
         }
         else if (turn == false) {
             return Players.getPlayerName();
         }
     }
     function gameWinner(winner) {
        return winningPlayer.innerHTML = `${winner} has won the game!`
     }
    return {
     renderGameboard, checkForDraw
    };
 })();
 const Players = (function () {

     function getPlayerName() {
         getPlayerName.called = false
         const firstName = document.getElementById('player-name').value;
         const input = document.getElementById('enter-name');
         const button = document.getElementById('show-button');
         if(firstName.length === 0) {
             alert('Player name cannot be empty');
         } else {
             validateName(getPlayerName)
             let name = document.getElementById('player-name-show').innerHTML = firstName;
             input.style.display = 'none';
             button.style.display = 'none';
             return name;
         }
     }
     function getPlayerTwoName() {
        getPlayerTwoName.called = false;
        const playerTwo = document.getElementById('player2').value;
        const input = document.querySelector('.player2-name');
        const button = document.getElementById('show-button-two');
        if(playerTwo.length === 0){
            alert('Player 2 name cannot be empty');
        }
        else {
            validateName(getPlayerTwoName);
            let name = document.getElementById('player-two-show').innerHTML = playerTwo;
            input.style.display = 'none';
            button.style.display = 'none';
            return name;
        }
     }
     function validateName(name) {
        return name.called = true;
     }
     function playerOneWins() {
         let winCount = 1;
         const wins = document.getElementById('player-wins');
         wins.innerHTML = winCount++;
         return;
     }
     function computerWins() {
         let winCount = 1;
         const wins = document.getElementById('computer-wins');
         wins.innerHTML = winCount++;
         return;
     }
     return {
         getPlayerName, playerOneWins, computerWins, getPlayerTwoName
     };
 })();