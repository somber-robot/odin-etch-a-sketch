const GRID_SIZE = 480;
const container = document.querySelector("#container");

const newGridBtn = document.querySelector("#new-grid");
const refreshBtn = document.querySelector("#refresh");

let grid_count = 16;

newGridBtn.addEventListener("click", function() {
    temp = grid_count;
    grid_count = Math.min(100, parseInt(prompt("Enter grid length: ", "")));
    if (Number.isNaN(grid_count)) {
        grid_count = temp;
        return;
    }
    clearGrid();
    createGrid(grid_count);
});

refreshBtn.addEventListener("click", refreshGrid);

function clearGrid(){
    Array.from(container.childNodes).forEach(square => {
        square.parentNode.removeChild(square);
    });
}

function randomColor(){
    return `rgb(${Math.random() * 255},
                ${Math.random() * 255}, 
                ${Math.random() * 255})`;
}

function createGrid(grid_count){
    for (i = 0; i < (grid_count*grid_count); i++){
        let square = document.createElement("div");
        square.style = `border: 1px solid lightgray; 
                        box-sizing: border-box;
                        flex: auto;
                        width: ${GRID_SIZE/grid_count}px;`;
        square.addEventListener("mouseover", function(){
            square.style.backgroundColor = randomColor();
        });

        container.appendChild(square);
    }
}

function refreshGrid(){
    clearGrid();
    createGrid(grid_count);
}

createGrid(grid_count);