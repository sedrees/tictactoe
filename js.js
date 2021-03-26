const board = (() => {
    const positions = [ 0,0,0,
                        0,0,0,
                        0,0,0 ]
    const winConditions = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ]
    return {positions,winConditions};
})();

const display = (() => {
    const squares =  document.querySelectorAll('.move');
    const draw = () => {
        for(let i=0;i<9;i++) {
            squares[i].innerHTML = board.positions[i] ? "<span>"+board.positions[i]+"</span>" : "";
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
    let winState = 0;
    let xPlayer;
    let oPlayer;
    let winMsg;
    let isWinner;
    let gameState;
    const main = document.querySelector("main");
    const init = () => {
        gameState = 1;
        const startBtn = document.querySelector("#makeNames");
        const inputDiv = document.querySelector("#nameInputs");
        inputDiv.style.display = "flex";
        startBtn.addEventListener('click', () => {
            const xName = document.querySelector("#xplayer").value;
            const oName = document.querySelector("#oplayer").value;
            if (xName && oName) {
                xPlayer = makePlayer('X', xName);
                oPlayer = makePlayer('O', oName);
                randomize = Math.floor(Math.random() * 2);
                currentPlayer = (randomize) ? xPlayer : oPlayer;
                display.player(currentPlayer.name);
                inputDiv.style.display = "none";
                display.draw();
                for(let i=0;i<9;i++) {
                    display.squares[i].addEventListener('click', () => {
                        turn(i);
                    }); 
                }
            }  
        });
    }
    const turn = (location) => {
        if (!board.positions[location] && gameState) {
            board.positions[location] = currentPlayer.team;
            /* Update each win condition position to match player marker */
            for(let i=0;i<board.winConditions.length;i++) {
                let set = board.winConditions[i];
                for(let n=0;n<3;n++) {
                    if (set[n] == location) {
                        set[n] = currentPlayer.team;
                    }
                }
                /* If a win condition is met then declare a winner */
                isWinner = set => set.every(v => v !== 0 && v === set[0]);
                if(isWinner(set)) {
                    winState = 1;
                    display.draw();
                    endGame(winState);
                }
            }
            /* Check for tie */
            if(board.positions.every(position => position !== 0) && winState < 1) {
                winState = 2;
                display.draw();
                endGame(winState);
            }
            display.draw();
            currentPlayer == xPlayer ? currentPlayer = oPlayer : currentPlayer = xPlayer;
            display.player(currentPlayer.name);
        }
    }
    const endGame = (winState) => {
        gameState = 0;
        winMsg = document.createElement('h3');
        const resetBtn = document.createElement('button');
        resetBtn.textContent = "Reset";
        resetBtn.addEventListener('click', () => {
            board.winConditions = [
                [0,1,2],
                [0,3,6],
                [0,4,8],
                [1,4,7],
                [2,5,8],
                [2,4,6],
                [3,4,5],
                [6,7,8]
            ]
            board.positions = [0,0,0,0,0,0,0,0,0];
            display.draw();
            play.winState = 0;
            xPlayer = {};
            oPlayer = {};
            currentPlayer = {};
            isWinner = 0;
            main.removeChild(winMsg);
            play.init();
        });
        winState == 2 ? winMsg.textContent = "It's a tie!" : winMsg.textContent = currentPlayer.name+" wins!";
        winMsg.appendChild(resetBtn);
        main.appendChild(winMsg);
    }
    return {init,turn,currentPlayer:currentPlayer,winState:winState};
})();

const makePlayer = (team,name) => {
    return {team,name};
}

play.init();