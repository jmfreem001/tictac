
const board = ( () => {
    let array = [];
    let height = 3;
    let size = height * height;
    for (let i=0; i< size; i++){
        array.push('');
    }
    const show = () => console.log(array);
    // Need to add a location
    const change = (move) => {
        //Add move board
        array.splice(0,1, move);
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
    const render = () => {
        let gameboard = document.querySelector('.board');
        // Reset gameboarrd before redraw. 
        while (gameboard.children.length > 0){
            gameboard.removeChild(gameboard.children[0]);
        }
        for (let i =0; i < board.size; i++){
            let content = board.array[i];


            let cell = document.createElement('p');
            cell.setAttribute('class', 'cell');
            cell.setAttribute('data-id', i);
            cell.textContent = content;
            gameboard.appendChild(cell);
        }     
    }
    // render game board for each element in size array. 
    const start = () => {
        render()
        // getPlayers()
        let xName = 'John Doe';
        Xplayer = createPlayer(xName, 'X');
        // Update with names from input text boxes  document.getElementById('oName').textContent? 
        let oName = 'Jane Doe';        
        Oplayer = createPlayer(oName, 'O');

        // TEsting a move
        Xplayer.move()
        render()

// TODO LEFT OFF HERE, trying to assign players. 

    // get Players = create players and assign them a marker. 
    // const getPlayers = () => {
    //     // assigns name to each player
    //     // let xName = document.getElementById('xName') || 'John Doe'
    //     // Xplayer = createPlayer(xName, 'X');
    //     // let oName = document.getElementById('oName') || 'Jane Doe'        
    //     // Oplayer = createPlayer(oName, 'O');
    }
    const end = () => console.log('The game is over');

    return {
        start,
        end,
    }
})();


// player factory function

const createPlayer = (name, marker) => {
    const move = () => {
        // add value of change to gameboard
        console.log(`${name} made a move`);
        // Need to remove and move to controller module. 
        board.change(marker);
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