const Gameboard = (function() {
   const game = document.querySelectorAll("[class^='board-square']");
   const start = document.getElementById('startGame');
   const gameboard = document.querySelector(".board");

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
        btn.id = 'mark' + i; //
        btn.classList = 'before'
        game[i].appendChild(btn);
        start.disabled = true;
        gameButtons.push(btn);
        game[i].addEventListener('click', function(){
            addMarker(btn);

        })
    };
   };
   function addMarker(button) {
    const marker = document.getElementById(`${button.id}`)
    if(marker.firstChild) {
        return
    }
    else {
        if(Players.getPlayerName.called == true) {
            if(turn){
                turn = false;
                return playerOneMarks(button)
            }
           else {
               turn = true;
               return playerTwoMarks(button)
            }
        }
        else {
            alert('Enter name before playing!')
        }
      }
    }
   function playerOneMarks(button) {
    let mark = document.getElementById(`${button.id}`);
    mark.classList = 'mark'
    mark.textContent = 'X'
    console.log("Player one just marked")
   }
   function playerTwoMarks(button) {
    let mark2 = document.getElementById(`${button.id}`);
    mark2.classList = 'mark'
    mark2.textContent = 'O'
    console.log("Player two just marked")
   }
   
   return {
    renderGameboard
   };
})();
const Players = (function () {
    function getPlayerName() {
        getPlayerName.called = false
        const firstName = document.getElementById('player-name').value;
        const input = document.getElementById('enter-name');
        const button = document.getElementById('show-button');
        if(firstName.length === 0) {
            alert('Player name cannot be empty')
        } else {
            validateName()
            document.getElementById('player-name-show').innerHTML = firstName;
            input.style.display = 'none';
            button.style.display = 'none';
        }
    }
    function validateName() {
       return getPlayerName.called = true;
    }
    return {
        getPlayerName
    };
})();

   
