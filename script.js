const GRID_SIZE = 480;
const container = document.querySelector("#container");
const ui = document.querySelector("#ui");

const newGridBtn = document.querySelector("#new-grid");
const refreshBtn = document.querySelector("#refresh");
const toggleBtn = document.querySelector("#toggle-grid");
const modeBtn = document.querySelector("#mode");
const penBtn = document.querySelector("#pen");

const picker = document.querySelector("#picker");
picker.style.display = "none";

let grid_count = 16;
let border = true;
let mode = "rainbow";
let pen = "draw";

newGridBtn.addEventListener("click", resizeGrid);
refreshBtn.addEventListener("click", refreshGrid);
toggleBtn.addEventListener("click", toggleGrid);
modeBtn.addEventListener("click", toggleColorMode);
penBtn.addEventListener("click", togglePen);

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
    if (pen === "draw"){
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
    }else{
        if (this.style.backgroundColor === "") return;
        let alpha = Math.max(0, +this.style.opacity-0.1);
        if (alpha == 0) {
            this.style.backgroundColor = "";
            this.style.opacity = 1.0;
        }
        else {
            this.style.opacity = alpha;
        }
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

function resizeGrid(){
    temp = Math.min(100, parseInt(prompt("Enter grid length: ", "")));
    if (Number.isNaN(temp)) return;
    grid_count = temp < 1 ? 1 : temp;
    clearGrid();
    createGrid(grid_count);
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

function toggleColorMode(){
    if (mode === "rainbow"){
        modeBtn.innerHTML = "Single";
        mode = "single";
        picker.style.display = "initial";
    }else{
        modeBtn.innerHTML = "Rainbow";
        mode = "rainbow";
        picker.style.display = "none";
    }
}

function togglePen(){
    if (pen === "draw"){
        penBtn.innerHTML = "Erase";
        pen = "erase";
    }else{
        penBtn.innerHTML = "Draw";
        pen = "draw";
    }
}

createGrid(grid_count);