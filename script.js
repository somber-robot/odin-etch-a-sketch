const GRID_SIZE = 480;
const container = document.querySelector("#container");
const ui = document.querySelector("#ui");

const newGridBtn = document.querySelector("#new-grid");
const refreshBtn = document.querySelector("#refresh");
const toggleBtn = document.querySelector("#toggle-grid");
const modeBtn = document.querySelector("#mode");

const picker = document.createElement("input");
picker.type = "color";

let grid_count = 16;
let border = true;
let mode = "rainbow";
let color = "black";

newGridBtn.addEventListener("click", function() {
    temp = Math.min(100, parseInt(prompt("Enter grid length: ", "")));
    if (Number.isNaN(temp)) return;
    grid_count = temp < 1 ? 1 : temp;
    clearGrid();
    createGrid(grid_count);
});

refreshBtn.addEventListener("click", refreshGrid);
toggleBtn.addEventListener("click", toggleGrid);
modeBtn.addEventListener("click", toggleDrawMode);

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

function colorCell(){
    if (mode === "rainbow"){
        if (this.style.backgroundColor !== "") {
            this.style.opacity = Math.min(1.0, +this.style.opacity+0.1);
            return;
        }
        this.style.backgroundColor = randomColor();
        this.style.opacity = 0.1;
    }else{
        if (this.style.backgroundColor !== ""){
            this.style.opacity = Math.min(1.0, +this.style.opacity+0.1);
            return;
        }
        this.style.backgroundColor = picker.value;
        this.style.opacity = 0.1;
    }
}

function createGrid(grid_count){
    for (i = 0; i < (grid_count*grid_count); i++){
        let square = document.createElement("div");
        let border_val = border ? "1px solid lightgray" : "none";
        square.style = `border: ${border_val}; 
                        box-sizing: border-box;
                        flex: auto;
                        width: ${GRID_SIZE/grid_count}px;`;
        square.addEventListener("mouseover", colorCell);
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

function toggleDrawMode(){
    if (mode === "rainbow"){
        modeBtn.innerHTML = "Single";
        mode = "single";
        ui.appendChild(picker);
    }else{
        modeBtn.innerHTML = "Rainbow";
        mode = "rainbow";
        picker.parentNode.removeChild(picker);
    }
}

createGrid(grid_count);