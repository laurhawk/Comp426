/*
Add your code for Game here
 */
export default class Game{
    constructor(size){
        this.size = size;
        this.board = new Array(size*size).fill(0);
        this.score = 0;
        this.won = false;
        this.over = false;
        this.moved = []
        this.lose = []
        this.win = []
    //this.state = Game.State.INITIALIZED;
        this.position();
        this.position();
    }

/*
Game.State = {
    INITIALIZED: 0,
    IN_PROGRESS: 1,
    LOST: 2,
    WON: 3
};
*/
//function to determine probability of which tile is added
twoOrFour(){
    var num = Math.floor(Math.random()*10)
    if (num<9) {
        return 2;
    }else{
        return 4;
    }
}
position() {
    var positions = []
    var count = 0;
    this.board.forEach(y=>{
        if(y==0){
            positions[positions.length] = count;
        }
        count++;
    });
    var number = Math.floor((Math.random()*positions.length))
    this.board[positions[number]] = this.twoOrFour();
}

/*gameState = {
    board: number[],
    score: number,
    won: boolean,
    over: boolean
}
*/
setupNewGame(){
//resets game back to random starting position
    this.board = new Array(this.size*this.size).fill(0);
    this.score = 0;
    this.won = false;
    this.over = false;
    this.position();
    this.position();


}
loadGame(gameState){
//given a gamestate object, loads that board, etc.
    this.board = gameState.board;
    this.score = gameState.score;
    this.won = gameState.won;
    this.over = gameState.over;

}
move(direction){
//given "up", "down", "left", "right" as string inputs it makes the apporpriate shifts and adds a random tile
    var gameBoardArray = this.board;
    if (direction == 'up'){
        this.up();
        
    } else if (direction == 'down'){
        this.down();
        
    } else if (direction == 'left'){
        this.left();
       
    } else if (direction == 'right'){
        this.right();
        
    }
    //this.toString()
    var counter = 0;
    for(var i = 0; i < this.size**2; i++){
        if(this.board[i] != gameBoardArray[i]){
        this.position();
        break;
        }
    }
    this.moved.forEach(x =>{
        x(this.getGameState());
    });
    if(this.won == false){
        for(var i = 0; i< this.size**2; i++){
            if(this.board[i] == 2048){
                this.won = true; 
                this.win.forEach(x =>{
                    x(this.getGameState())
                });
                break;
            }
        }
    }
this.over = true;
for(var i = 0; i< this.size**2; i++){
    if(this.board[i] == 0){
        this.over = false;
        break;
    }
    //right
    if(i + 1 < (this.size**2) && ((i+1) % this.size) != 0 && this.board[i] == this.board[i+1]){
        this.over = false;
        break;
    }
    //left
    if(i - 1 >= 0 && ((i-1) % this.size) != (this.size-1) && this.board[i] == this.board[i-1]){
        this.over = false;
        break;
    }
    //up
    if(i + this.size < (this.size**2) && this.board[i] == this.board[i+this.size]){
        this.over = false;
        break;
    }
    //down
    if(i - this.size >= 0 && this.board[i] == this.board[i-this.size]){
        this.over = false;
        break;
    }
}
if(this.over == true){
    this.lose.forEach(x => {
        x(this.getGameState())
    });
}
}
right(){
    var tile = (this.size**2) -1
    this.board.forEach(x =>{
        var row = tile % this.size
        var i = 1;
        while(row - i >= 0 && this.board[tile] == 0){
            if(this.board[tile - i] != 0){
                this.board[tile] = this.board[tile-i]
                this.board[tile - i] = 0
            }
            i++
        }
        tile--
    })
    tile = (this.size**2) -1
    this.board.forEach(x =>{
        var row = tile % this.size
        var i = 1;
        if(tile >= 0 && row - i >= 0 && this.board[tile - i] == this.board[tile] && this.board[tile] != 0){
                this.board[tile] = this.board[tile]*2
                this.board[tile - i] = 0
                this.score += this.board[tile]
                tile -= 2
        }else {
            tile--
        }
    })
    tile = (this.size**2) -1
    this.board.forEach(x =>{
        var row = tile % this.size
        var i = 1;
        while(row - i >= 0 && this.board[tile] == 0){
            if(this.board[tile - i] != 0){
                this.board[tile] = this.board[tile-i]
                this.board[tile - i] = 0
            }
            i++
        }
        tile--
    })
    this.position()
}
left(){
    var tile = 0;
    this.board.forEach(x=>{
        var row = tile % this.size;
        var i = 1;
        while(row + i < this.size && this.board[tile]==0){
            if(this.board[tile+i] != 0){
                this.board[tile] = this.board[tile+i];
                this.board[tile+i] = 0
            }
            i++
        }
        tile++
    })
    tile = 0;
    this.board.forEach(x=>{
        var row = tile % this.size;
        var i = 1;
        if(tile<this.size**2 && row + i < this.size && this.board[tile+1] == this.board[tile] && this.board[tile] != 0){
                this.board[tile] = this.board[tile] * 2
                this.board[tile+i] = 0
                this.score += this.board[tile]
                tile += 2
        } else {
            tile++
        }
    })
    tile = 0;
    this.board.forEach(x=>{
        var row = tile % this.size;
        var i = 1;
        while(row + i < this.size && this.board[tile]==0){
            if(this.board[tile+i] != 0){
                this.board[tile] = this.board[tile+i];
                this.board[tile+i] = 0
            }
            i++
        }
        tile++
    })
    this.position()
}
up(){
    var counter = 0;
    this.board.forEach(x =>{
        var i = 1;
        var currentTile = counter + this.size * i;
        while(currentTile<(this.size**2) && this.board[counter] == 0){
            if(this.board[currentTile] != 0){
                this.board[counter] = this.board[currentTile];
                this.board[currentTile] = 0;
                break;
            } else{
                i++;
                currentTile = counter+this.size*i
            }
        }
        counter++;
    });
        counter = 0;
        this.board.forEach(x =>{
            var i = 1;
            var currentTile = counter+this.size*i
            if(currentTile<(this.size**2) && this.board[counter] != 0 && this.board[counter] == this.board[currentTile]){
                this.board[counter] = this.board[currentTile] * 2
                this.board[currentTile] = 0
                this.score += this.board[counter]
                counter ++
            } else{
                counter++;
            }
        });
        counter = 0;
        this.board.forEach(x =>{
        var i = 1;
        var currentTile = counter + this.size*i;
        while(currentTile < (this.size**2) && this.board[counter] == 0){
            if(this.board[currentTile] != 0){
                this.board[counter] = this.board[currentTile];
                this.board[currentTile] = 0;
                break;
            } else{
                i++;
                currentTile = counter+this.size*i
            }
        }
        counter++
        });
        this.position()
    }
    
    /*
    if we have an array tile and we want to move it up:
    set current tile to index of current tile and value
    move tiles up to merge with tiles above
    they add together if they are the same, they stick together if they are not the same
    make everything at the bottom null

    */

down(){
    var tile = (this.size**2) - 1
    this.board.forEach(x =>{
        var i = 1;
        var currentTile = tile - (this.size * i);
        while(currentTile >= 0 && this.board[tile] == 0){
            if(this.board[currentTile] != 0){
                this.board[tile] = this.board[currentTile];
                this.board[currentTile] = 0
                break;
            } else{
                i++;
                currentTile = tile - (this.size * i)
            }
        }
        tile--;
    });
    tile = (this.size**2) - 1
    this.board.forEach(x =>{
        var i = 1;
        var currentTile = tile - (this.size * i);
        if(currentTile >= 0 && this.board[tile] != 0 && this.board[tile] == this.board[currentTile]){
            this.board[tile] = this.board[currentTile] * 2;
            this.board[currentTile] = 0;
            this.score += this.board[tile];
        }
        tile--;
    });
    tile = (this.size**2) - 1
    this.board.forEach(x =>{
        var i = 1;
        var currentTile = tile - (this.size * i);
        while(currentTile >= 0 && this.board[tile] == 0){
            if(this.board[currentTile] != 0){
                this.board[tile] = this.board[currentTile];
                this.board[currentTile] = 0
                break;
            } else{
                i++;
                currentTile = tile - (this.size * i)
            }
        }
        tile--;
    });
    this.position()
    
}
toString(){
    var output = ""
    var counter = 0
    output += `Score: ${this.score} Won: ${this.won} Over: ${this.over}` + "\n"
    this.board.forEach(tile => {
        output += `[${tile}]`
        if(counter % this.size == this.size -1){
            output += `\n`
        }
        counter++;
    })
    return output; 
}
onMove(callback){
    this.moved[this.moved.length] = callback;
}
onWin(callback){
    this.win[this.win.length] = callback;
}
onLose(callback){
    this.lose[this.lose.length] = callback;
}

getGameState(){
    return {
        "board": this.board,
        "score": this.score,
        "won": this.won,
        "over": this.over
    }
//returns a gamestate object representing the current state
}
}
