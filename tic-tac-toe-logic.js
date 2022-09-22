const Gameboard = (function() {
   const game = document.querySelectorAll("[class^='board-square']");
   const start = document.getElementById('startGame');
   const gameboard = document.querySelector(".board");
   const gameStatus = document.getElementById('game-status');
   const player = document.getElementById('current-player');
   

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
        if(Players.getPlayerName.called == true) {
            if(turn){
                turn = false;
                playerOneMarks(button), checkHorizontal(), checkDiagonals();
            }
           else {
               turn = true;
               playerTwoMarks(button), checkHorizontal(), checkDiagonals();
            }
        }
        if(checkHorizontal() == true || checkDiagonals() == true){
            Players.playerOneWins();
            return;
        }
        else if(checkDiagonals() == false || checkHorizontal() == false) {
            Players.computerWins();
        }
        else if (Players.getPlayerName.called == false){
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
    function checkDiagonals() {
        if(gameButtons[0].value == 'X' && gameButtons[4].value == 'X' && gameButtons[8].value == 'X') {
            return true;
        }
        else if (gameButtons[2].value == 'X' && gameButtons[4].value == 'X' && gameButtons[6].value == 'X'){
            return false;
        }
    }
    function currentPlayer() {
        let player;
        if(turn) {
            return player = 'Computer';
        }
        else if (turn == false) {
            return Players.getPlayerName()
        }
    }
   return {
    renderGameboard
   };
})();
const Players = (function () {
    const playerOne = document.getElementById('player-name-show');
    const playerTwo = document.querySelector('.player2-name')

    function getPlayerName() {
        getPlayerName.called = false
        const firstName = document.getElementById('player-name').value;
        const input = document.getElementById('enter-name');
        const button = document.getElementById('show-button');
        if(firstName.length === 0) {
            alert('Player name cannot be empty')
        } else {
            validateName()
            let name = document.getElementById('player-name-show').innerHTML = firstName;
            input.style.display = 'none';
            button.style.display = 'none';
            return name;
        }
    }
    function validateName() {
       return getPlayerName.called = true;
    }
    function playerOneWins() {
        let winCount = 1;
        console.log('YOU WON')
        const wins = document.getElementById('player-wins');
        wins.innerHTML = winCount++;
    }
    function computerWins() {
        let winCount = 1;
        console.log('COMPUTER WON!')
        const wins = document.getElementById('computer-wins');
        wins.innerHTML = winCount++;

    }
    return {
        getPlayerName, playerOneWins, computerWins
    };
})();