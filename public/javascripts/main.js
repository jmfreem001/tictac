
const board = ( () => {
    let array = [];
    let height = 3;
    let size = height * height;
    const show = () => console.log(array);
    const change = (move) => {
        //Add move board
        array.push(move)
        console.log(`Board updated with ${move}`)
    }
    const clear = () => {
        board = [];
        console.log('Clearing board');
    }
    return { 
        show,
        change,
        size,
        clear 
    };
})();


const controller = ( () => {
    // Logic for game flow;
    const render = () => {
        for (let i =0; i < board.size; i++){
            console.log(i);
        }     
    }
    // render game board for each element in size array. 
    const start = () => render()
    // get Players = create players and assign them a marker. 

    const end = () => console.log('The game is over');

    return {
        start,
        end
    }
})();


// player factory function

const createPlayer = (name, marker) => {
    const move = () => {
        // add value of change to gameboard
        console.log(`${name} made a move`);
        board.change(marker);
    }
    return {
        name,
        move
    }

}


controller.start()
const player1 = createPlayer('George', 'X');
player1.move();