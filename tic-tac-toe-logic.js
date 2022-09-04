const Gameboard = (function() {

   const game = document.querySelectorAll("[class^='board-square']");
   const start = document.getElementById('startGame');

   function renderGameboard() {
    for (let i = 0; i < game.length; i++) {
        const btn = document.createElement('button');
        btn.id = 'mark';
        game[i].appendChild(btn);
        start.disabled = true;
    };
   };
   
   return {
    renderGameboard
   };
})();