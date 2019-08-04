
const board = ( () => {
    let array = [];
    // Assign initial size variables
    let height = 3;
    let size = height * height
    let width = height - 1;
    let length = size -1;

    const updateSize = (newHeight) => {
        height = newHeight;
        size = height * height;
        width = height - 1;
        length = size -1;
        updateArray(size)
        return size;        
    }

    const updateArray = (newSize) => {
        if (newSize === array.length) {
            return;
        }else if (newSize > array.length){
            let difference = newSize -array.length
            for (let i=0; i < (difference); i++){
                array.push('');
            }
            return;
        }else {
            while(array.length > newSize){
                array.pop();
            }
            return;
        }
    }

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
        checkColumns, 
        updateSize 
    };
})();


// player factory function
const createPlayer = (name, marker) => {
    const move = (choice) => {
        board.change(choice, marker);
    }
    return {
        name,
        move, 
        marker
    }
}


const controller = ( () => {

    // Logic for game flow;
    let Xplayer = {};
    let Oplayer = {};
    let activePlayer = {};
    let log = document.getElementById('log');   
    let cpu = createPlayer('CPU', 'O')
    // add game type handler 
    let selector = document.querySelectorAll('input[name="versus"]');
    selector.forEach(item => addEventListener('change', gameTypeHandler));

    function gameTypeHandler(){
        let gameType = document.querySelector('input[name="versus"]:checked').value;
        let name = document.getElementById('oName');
        let label = document.getElementById('oNameLabel');
        if (gameType === 'vCpu'){
            name.style.display ='none';
            label.style.display ='none';
        }else{
            name.style.display = '';
            label.style.display = '';
        }
    }  
    gameTypeHandler()


    const makeMark = (e) => {
        // Apply player's mark to game board. 
        let gameType = document.querySelector('input[name="versus"]:checked').value;
        choice = e.target.dataset.id;
        //Determine round number
        markCount = board.array
            .filter(item => item !== '').length;
        activePlayer = setActivePlayer(markCount);

        if (board.array[choice] !== ''){
            alert('Already taken! Please choose a different square.');
            return;
        }
        if (activePlayer) {
            activePlayer.move(choice); 
        }
        // Check if game over
        if (gameOver(activePlayer)){
            return;
        }
        if (gameType === 'PvP'){
            // Update diplay to prepare for next mark
            activePlayer = setActivePlayer(markCount + 1);
            displayNewPlayer(activePlayer)
        }else{
            cpuMove('O')

            if (gameOver(cpu)){
                return;
            }
        }
        render()

    }

    const cpuMove = (mark) => {
        let choice = 0;
        do{
            choice = Math.floor(Math.random() * (board.size-1) - +0);
        }while (board.array[choice] !== '');
        board.change(choice, mark);
    }

    const setActivePlayer = (round) => {
        // update active player based on round
        return ((round) % 2 === 0)? Xplayer: Oplayer;
    }

    const getBoardSize = () => {
        // Update board size to handle requirements of both heights.
        boardSize = document.querySelector('input[name=bSize]:checked').value;
        let height = (boardSize === '3x3')? 3:5;
        return height;
    } 

    const render = () => {
        let gameboard = document.querySelector('.board');
        // Reset gameboarrd before redraw. 
        while (gameboard.children.length > 0){
            gameboard.removeChild(gameboard.children[0]);
        }

        // Update container attribute here
        let height = getBoardSize();
        let container = document.querySelector('.board');
        container.setAttribute('style', `grid-template-columns: repeat(${height}, 1fr);`)

        // Add Cells
        for (let i =0; i < board.array.length; i++){
            let content = board.array[i];
            let cell = document.createElement('p');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-id', i);
            if (height === 5){
                cell.setAttribute('style', `width: 25px;`)
            }

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
        boardSize = getBoardSize()
        board.updateSize(boardSize)
        render()
        // Get PLayer names or use a default value
        let xName = document.getElementById('xName').value || 'John Doe';
        Xplayer = createPlayer(xName, 'X');
        let oName = document.getElementById('oName').value || 'Jane Doe';        
        Oplayer = createPlayer(oName, 'O');
        displayNewPlayer(Xplayer)

    }

    const displayNewPlayer = (activePlayer) =>  {
        log.textContent = `It is your turn to move ${activePlayer.name}`

        return;
    }
    
    const gameOver = activePlayer => {
        if (hasWon(activePlayer)){
            render()
            end(activePlayer, 'win');
            let cells = document.querySelectorAll('.cell');
            cells.forEach( cell => cell.removeEventListener('click', makeMark));
            return true;
        }
        else if ((markCount + 1) === board.array.length) {
            end(activePlayer, 'draw');
            let cells = document.querySelectorAll('.cell');
            cells.forEach( cell => cell.removeEventListener('click', makeMark));
            return true;
        }
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
        // If win state player has won
        if (winStatus === 'win'){
            let log = document.getElementById('log');
            log.textContent = `${activePlayer.name} has won!`;
            return;
        }
        else if (winStatus === 'draw') {
            let log = document.getElementById('log');
            log.textContent = 'Looks like a draw. Click "New Game" to start again.';
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

// Add new game listener
const newButton = document.getElementById('new-game');
newButton.addEventListener('click', controller.start);