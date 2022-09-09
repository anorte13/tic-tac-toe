const Gameboard = (function() {

   const game = document.querySelectorAll("[class^='board-square']");
   const start = document.getElementById('startGame');
   const gameboard = document.querySelector(".board");
   let gameButtons = [];
   let buttonID = '';

   function renderGameboard() {
    if(gameboard.style.display === 'grid') {
        gameboard.style.dispay = 'none';
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

function CreatePlayer(firstName, playerWins) {
    return {
        firstName: firstName,
        playerWins:  playerWins,
        getPlayerInfo() {
            return firstName + playerWins;
        },
    };
}
