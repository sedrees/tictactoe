const board = (() => {
    let positions = [ [0,0,0],
                      [0,0,0],
                      [0,0,0] ]
    const cols = [ [positions[0][0], positions[1][0], positions[2][0]],
                   [positions[0][1], positions[1][1], positions[2][1]],
                   [positions[0][2], positions[1][2], positions[2][2]]                
                 ]

    const diags = [ [positions[0][0], positions[1][1], positions[2][2]],
                    [positions[0][2], positions[1][1], positions[2][0]]        
                  ]
    return {positions,cols,diags};
})();

const display = (() => {
    const gameDiv = document.querySelector("board");
    const squares =  document.querySelectorAll('.move');
    const draw = () => {
        for(let i=0;i<9;i++) {
            if(board.positions[i]) {
                squares[i].innerHTML = "<span>"+board.positions[i]+"</span>";
            }
        }
    }
    const player = (team) => {
        const text = document.querySelector("h2 span");
        text.textContent = team;
    }
    return {squares,draw,player};
})();

const play = (() => {
    let currentPlayer;
    const init = () => {
        randomize = Math.floor(Math.random() * 2);
        currentPlayer = (randomize) ? xPlayer : oPlayer;
        display.player(currentPlayer.team);
        display.draw();
        for(let i=0;i<9;i++) {
            display.squares[i].addEventListener('click', (e) => {
                play.turn(i);
            }); 
        }
    }
    const turn = (location) => {
        if (!board.positions[location]) {
            board.positions[location] = currentPlayer.team;
            display.draw();
            currentPlayer == xPlayer ? currentPlayer = oPlayer : currentPlayer = xPlayer;
            display.player(currentPlayer.team);
            analyze(board.positions);
        } 
    }
    const analyze = (board) => {
        board.forEach(element =>
            console.log(element));
    }
    return {init,turn,currentPlayer:currentPlayer};
})();

const makePlayer = (team) => {
    return {team};
}

const xPlayer = makePlayer('X');
const oPlayer = makePlayer('O');

play.init();