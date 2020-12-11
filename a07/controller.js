import Game from './engine/game.js';

var size = 4
export const buildBoard = function(size, board, score) {
                        //background orange
                        //title pink

    var board_struct = `<div class = "board" style="background-color:#fb8654">
                        <h1 class = "title center" style="color:#893457">2048</h1>
                        <h2>Score: ${score} </h2>`
                        
                       
        board_struct += `<button class = "button center start" style="color:#893457" id = "start">
                        <h1>Reset</h1>
                        </button>`
        board_struct += `</div>` 
        
        //background purple
        board_struct += `<div style:"background-color:#8179dd">`
        //questionable
        //var game = new Game(4)
        //board = game.getGameState().board
        var index = 0;
        for(var j = 0; j<size; j++){
            board_struct += '<div class="grid-container" style="background-color:#7959a3">'
        for(var i=0; i<size; i++){
            var tile = ''
            //if(!board[index]){
                tile = board[index]
            //tile color pink
            if(tile != 0){
                board_struct += `<div class ="tile" style="background-color:#b2435f"><p>${tile}</p></div>`
            //} else{
            //tile color dark purple
            //    board_struct += `<div class ="tile" style="background-color:#b2435f"><p>${tile}</p></div><>`
 
           // }
           /* if((i+1)%4==0){
                board_struct += `<br>`
            }
        */} else{ board_struct += `<div class ="tile" style="background-color:#b2435f"><p></p></div>`
            
        }
            index++;
        }
        board_struct += `</div>`
        
        }
        board_struct += `<h3>HOW TO PLAY: Use your arrow keys to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048! </h3>`
        return board_struct;
    }

export const endGame = function(gameState){
    var endScore = gameState.score
    return `<div class = "board" style="background-color:#fb8654">
            <h1 class = "title" style="color:#893457"> 2048 </h1>
            <h2 class = "subtitle" style="color:#893457"> Score: ${endScore} </h2>
            <h2 class = "subtitle" style="color:#893457" >Game Over</h2>
            <button class = "button start" id = "start" style="color:#893457">Play Again?</button>
            </div> `
}
export const win = function(gameState){
    var endScore = gameState.score
    return `<div style="background-color:#fb8654">
            <h1 class = "title has-text-centered" style="color:#893457">2048</h1>
            <h1 class = "subtitle has-text-centered" style="color:#893457">Score: ${endScore} </h1>
            <h2 class = "subtitle has-text-centered" style="color:#893457"> You Won! </h2>
            <button class = "button start" id = "start" style="color:#893457">Play Again?</button>
            </div>`
}
//export const update = function(gameState){
//for loop that goes through game board
//assigns each tile to the value in the game board
//after a key press you use this function to update game tiles using game state
    /*
    $root.html(buildBoard(4, game.getGameState().board, game.getGameState().score));
    var index = 0;
    for(var j = 0; j<size; j++){
        board_struct += '<div class="grid-container" style="background-color:#7959a3">'
    for(var i=0; i<size; i++){
        var tile = ''
        //if(!board[index]){
            tile = board[index]
        //tile color pink
        if(tile != 0){
            board_struct += `<div class ="tile" style="background-color:#b2435f"><p>${tile}</p></div>`
    */
//}

$(function(){
    var won = false;
    var game;
    
    const $root = $('#root');
    //$('#root').html(buildBoard(4, game.getGameState().board), game.getGameState().score);
    
    //commented this out and nothing changed, luv dat
    //$('#root').html(buildBoard(4, this, 0))


    //literally just call build board on size 4
    /*
    $('#root').on('click', '#start', function(event){
        game = new Game(size)
        $('#root').html(buildBoard(size, game.getGameState().board, game.getGameState().score));
        
    });
    */

    //issues are in these lines, not properly importing game info!!!
   if(!game){
        game = new Game(4)
   }
   
   $('#root').html(buildBoard(4, game.board, game.score))

    $(document).on('keydown', y => {
        y.preventDefault();
        var game_tile = document.getElementsByClassName('tile');
        
        if(game){
            if(y.keyCode==39){
                game.move('right');
            } else if (y.keyCode==37){
                game.move('left');
            } else if (y.keyCode==38){
                game.move('up');
            } else if(y.keyCode==40){
                game.move('down');
            }
            //issue in here
            $root.html(buildBoard(4, game.getGameState().board, game.getGameState().score));
            if(won == false && game.getGameState().over){
                $root.html(endGame(game.getGameState()));
            }
            if(won && game.getGameState().won){
             won = true;
             $root.html(win(game.getGameState()));
            }
        }
    });

    //var newGame = new Game(4)
    
    $('#root').on('click', '#start', function(event){
        game.setupNewGame()
        $root.html(buildBoard(4, game.getGameState().board, 0));
        
    });
    $('#root').on('click', '#end', function(event){
        $root.html(endGame(game.getGameState()));
    });
});