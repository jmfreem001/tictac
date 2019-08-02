
const board = ( () => {
    let array = [];
    let height = 3;
    let size = height * height;
    for (let i=0; i< size; i++){
        array.push('');
    }

    let width = height - 1;
    let length = size -1;
    const checkRows = (mark)=> {

        for (let i = 0; i < size; i += height){
            // check each row
            row:
            for(let j = 0; j < height; j++){
                // for each cell in each row check if player mark is present
                if (array[i + j] !== mark) {
                    break row;
                }
                // if code reaches the end of the row then there was a match.
                if (j === width){
                    return true;
                }
            }
        }
        return false;
    }
    const checkColumns = (mark)=> {
        for (let i = 0; i < height; i++){
            // check each column
            column:
            for(let j=0; j < size; j += height){
                // for each cell in each column check if player mark is present
                if (array[i+j] !== mark) {
                    break column;
                }
                // if code reaches the end of the column then there was a match.
                if (j === (length - width)){
                    return true;
                }
            }
        }
        return false;
    }
    const checkDiagonals = (mark)=> {
        // Check first diagonal
        for (let i = 0; i < size; i += (height + 1)){
            if (array[i] !== mark) {
                break;
            }
            if (i === size - 1){
                return true;
            }
        }
        // check second diagonal
        for (let i = width; i < size; i += width){
            if (array[i] !== mark) {
                break;
            }
            if (i === (length - width)){
                return true;
            }
        }

        return false;

         
    }



    const change = (id, move) => {
        //Add move board
        array.splice(id,1, move);
        console.log(`Board updated with ${move}`)
    }
    const clear = () => {
        //Replace each 
        for (let i=0; i< size; i++){
            array.splice(i, 1, '');
        }

    }
    return { 
        array,
        change,
        size,
        clear,
        checkRows,
        checkDiagonals,
        checkColumns 
    };
})();


const controller = ( () => {

    // Logic for game flow;
    let Xplayer = {};
    let Oplayer = {};
    let activePlayer = {};
    let log = document.getElementById('log');
    // Update game
    const makeMark = (e) => {
        choice = e.target.dataset.id;
        //Determine round number
        markCount = board.array
            .filter(item => item !== '').length;
        // console.log(markCount);
        activePlayer = setActivePlayer(markCount);
        // console.log(`Active player is ${activePlayer.name}`)

        if (board.array[choice] !== ''){
            alert('Already taken! Please choose a different square.');
            return;
        }
        if (activePlayer) {
            activePlayer.move(choice); 
        }
        // Check if player hasWon()
        if ((markCount + 1) === board.array.length) {
            end(activePlayer, 'draw');
            return;
        }
        else if (hasWon(activePlayer)){
            render()
            end(activePlayer, 'win');
            return
        }
        // Update diplay to prepare for next mark
        activePlayer = setActivePlayer(markCount + 1);

        displayNewPlayer(activePlayer)

        render()



        // TODO finish implementation of mark.

    }

    const setActivePlayer = (round) => {
        // update active player based on round
        return ((round) % 2 === 0)? Xplayer: Oplayer;
    }

    const render = () => {
        let gameboard = document.querySelector('.board');
        // Reset gameboarrd before redraw. 
        while (gameboard.children.length > 0){
            gameboard.removeChild(gameboard.children[0]);
        }
        // Add Cells
        for (let i =0; i < board.size; i++){
            let content = board.array[i];


            let cell = document.createElement('p');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-id', i);
            cell.textContent = content;
            gameboard.appendChild(cell);
        }
        // Add listener to cells. 
        let cells = document.querySelectorAll('.cell');
        cells.forEach( cell => cell.addEventListener('click', makeMark));
    }

    // render game board for each element in size array. 
    const start = () => {
        // Reset board befor e starting
        board.clear()
        render()
        // Get PLayer names or use a default value
        let xName = document.getElementById('xName').value || 'John Doe';
        Xplayer = createPlayer(xName, 'X');
        let oName = document.getElementById('oName').value || 'Jane Doe';        
        Oplayer = createPlayer(oName, 'O');
        // activePlayer = Xplayer;
        displayNewPlayer(Xplayer)
        // mainLoop(activePlayer)

    }
    const displayNewPlayer = (activePlayer) =>  {
        log.textContent = `It is your turn to move ${activePlayer.name}`

        return;
    }
    

    const hasWon = (activePlayer) => {
        // Check board to see if there are three in a row.
        let mark = activePlayer.marker
        if (board.checkColumns(mark) || board.checkRows(mark) || board.checkDiagonals(mark)){
            return true; 
        }else {
            return false;
        }

    };

    const end = (activePlayer, winStatus) => {
        console.log(`The game is over`);
        // If win state player has won
        if (winStatus === 'win'){
            let log = document.getElementById('log');
            log.textContent = `${activePlayer.name} has won!`;
            console.log('Win!')

            return;
        }
        else if (winStatus === 'draw') {
            let log = document.getElementById('log');
            log.textContent = 'Looks like a draw. CLick New game to start again.';
            console.log('draw')
            render()
            return;
        }
        else {
            alert('Oops! Something went wrong!');
            return;
        }
    }
    return {
        start,
        end,
        activePlayer
        }
    
})();


// player factory function

const createPlayer = (name, marker) => {
    const move = (choice) => {
        // add value of change to gameboard
        console.log(`${name} made a move`);
        // Need to remove and move to controller module. 
        board.change(choice, marker);
    }
    return {
        name,
        move, 
        marker
    }

}


// controller.start()
// const player1 = createPlayer('George', 'X');
// player1.move();

const newButton = document.getElementById('new-game');
newButton.addEventListener('click', controller.start);

// const name1 = document.getElementById('xName').value;
// console.log(name1);

