const GRID_SIZE = 480;
const container = document.querySelector("#container");

const newGridBtn = document.querySelector("#new-grid");
const refreshBtn = document.querySelector("#refresh");
const toggleBtn = document.querySelector("#toggle-grid");

let grid_count = 16;
let border = true;

newGridBtn.addEventListener("click", function() {
    temp = Math.min(100, parseInt(prompt("Enter grid length: ", "")));
    if (Number.isNaN(temp)) return;
    grid_count = temp < 1 ? 1 : temp;
    clearGrid();
    createGrid(grid_count);
});

refreshBtn.addEventListener("click", refreshGrid);
toggleBtn.addEventListener("click", toggleGrid);

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
        let border_val = border ? "1px solid lightgray" : "none";
        square.style = `border: ${border_val}; 
                        box-sizing: border-box;
                        flex: auto;
                        width: ${GRID_SIZE/grid_count}px;`;
        square.addEventListener("mouseover", function(){
            if (square.style.backgroundColor !== "") {
                square.style.opacity = Math.min(1.0, +square.style.opacity+0.1);
                return;
            }
            square.style.backgroundColor = randomColor();
            square.style.opacity = 0.1;
        });
        container.appendChild(square);
    }
    newGridBtn.innerHTML = grid_count + " x " + grid_count;
}

function refreshGrid(){
    clearGrid();
    createGrid(grid_count);
}

function toggleGrid(){
    if (border){
        container.childNodes.forEach(square => {
            square.style.border = "none";
            border = false;
        });
    }else{
        container.childNodes.forEach(square => {
            square.style.border = "1px solid lightgray";
            border = true;
        });
    }
}

createGrid(grid_count);