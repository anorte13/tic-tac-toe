const Gameboard = (function() {

   const game = document.querySelectorAll("[class^='board-square']");
   const start = document.getElementById('startGame');
   const gameboard = document.querySelector(".board");
   let gameButtons = [];
   let buttonID = '';

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
        game[i].addEventListener('click', function(){
            addMarker(btn);
        })
    };
   };
   function addMarker(button) {
    let mark = document.getElementById(`${button.id}`);
    mark.classList = 'mark'
    mark.textContent = 'X';
   }
   return {
    renderGameboard
   };
})();
const Players = (function () {

    function getPlayerName(){
        const firstName = document.getElementById('player-name').value;
        const input = document.getElementById('enter-name');
        const button = document.getElementById('show-button');
        if(firstName.length === 0) {
            alert('Enter player name!')
        } else {
            document.getElementById('player-name-show').innerHTML = firstName;
            input.style.display = 'none';
            button.style.display = 'none';
        }
    }
    return {
        getPlayerName
    };
})();

   
