
const board = ( () => {
    let array = [];
    let height = 3;
    let size = height * height;
    for (let i=0; i< size; i++){
        array.push('');
    }
    const show = () => console.log(array);
    // Need to add a location
    const change = (id, move) => {
        //Add move board
        array.splice(id,1, move);
        console.log(`Board updated with ${move}`)
    }
    const clear = () => {
        board = [];
        console.log('Clearing board');
    }
    return { 
        array,
        show,
        change,
        size,
        clear 
    };
})();


const controller = ( () => {

    // Logic for game flow;
    let Xplayer = {};
    let Oplayer = {};
    let activePlayer = {};
    // Update game
    const makeMark = (e) => {
        choice = e.target.dataset.id;
        console.log(`Active player is ${activePlayer.name}`)
        if (board.array[choice] !== ''){
            alert('Already taken! Please choose a different square.');
            return;
        }
        if (activePlayer) {
            activePlayer.move(choice); 
        }
        render()
        changeActivePlayer(activePlayer)
        // TODO finish implementation of mark.

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
        render()
        // Get PLayer names or use a default value
        let xName = document.getElementById('xName').value || 'John Doe';
        Xplayer = createPlayer(xName, 'X');
        let oName = document.getElementById('oName').value || 'Jane Doe';        
        Oplayer = createPlayer(oName, 'O');
        activePlayer = Xplayer;
        mainLoop()

    }
    const changeActivePlayer = (activePlayer) =>  {
        // CUREENTLY A BUG IN THIS CODE WHERE active playe only changes within block andn then reverts back. 
        activePlayer = (activePlayer === Xplayer)? Oplayer:Xplayer;
        console.log('change active player called')
    }
    
    const mainLoop = () => {
        let activePlayer = Xplayer
        let active = true;
        let moved = false;
        while (active) {
            // Update status element stating that 
            console.log(`It is your turn ${activePlayer.name}.`)

            // TODO may need and event listener here to listent for when the board change is done
            // Then check if player has won or if the board is full and no one has won. and announce win or draw
            // Then render screen if not the end. 
            // Other wise switch active player to other player
            // activePlayer = changeActivePlayer(activePlayer)
            console.log(activePlayer)
            // Temporary while building the rest of the logic to make sure the loop ends
            active = false;
        }
    }

    const end = () => console.log('The game is over');

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

const name1 = document.getElementById('xName').value;
console.log(name1);

