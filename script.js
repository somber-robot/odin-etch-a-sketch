const GRID_SIZE = 480;
const container = document.querySelector("#container");
const ui = document.querySelector("#ui");

const newGridBtn = document.querySelector("#new-grid");
const refreshBtn = document.querySelector("#refresh");
const toggleBtn = document.querySelector("#toggle-grid");
const modeBtn = document.querySelector("#mode");
const penBtn = document.querySelector("#pen");
const thickBtn = document.querySelector("#thick");
const saveBtn = document.querySelector("#save");

const picker = document.querySelector("#picker");
picker.style.display = "none";

let grid_count = 16;
let border = true;
let mode = "rainbow";
let pen = "draw";
let thick = "shade";

newGridBtn.addEventListener("click", resizeGrid);
refreshBtn.addEventListener("click", refreshGrid);
toggleBtn.addEventListener("click", toggleGrid);
modeBtn.addEventListener("click", toggleColorMode);
penBtn.addEventListener("click", togglePen);
thickBtn.addEventListener("click", toggleThick);
saveBtn.addEventListener("click", saveImage);

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
        if (this.style.backgroundColor !== "") {
            this.style.opacity = (thick === "shade") 
                                ? Math.min(1.0, +this.style.opacity+0.1)
                                : 1.0;
            return;
        }
        this.style.backgroundColor = (mode === "rainbow") ? randomColor() : picker.value;
        this.style.opacity = (thick === "shade") ? 0.1 : 1.0;
    }else{
        if (this.style.backgroundColor === "") return;
        let alpha = (thick === "shade") ? Math.max(0, +this.style.opacity-0.1) : 0;
        if (alpha === 0){
            this.style.backgroundColor = "";
            alpha = 1.0;
        }
        this.style.opacity = alpha;
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

function toggleThick(){
    if (thick === "shade"){
        thickBtn.innerHTML = "Solid";
        thick = "solid";
    }else{
        thickBtn.innerHTML = "Shade";
        thick = "shade";
    }
}

function saveImage(){
    html2canvas(container, {allowTaint: true}).then(function (canvas){
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.download = "sketch.jpg";
        link.href = canvas.toDataURL();
        link.target = "_blank";
        link.click();
    });
}

createGrid(grid_count);