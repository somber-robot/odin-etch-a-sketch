const GRID_SIZE = 480;
const container = document.querySelector("#container");

let grid_count = 16;

for (i = 0; i < (grid_count*grid_count); i++){
    let square = document.createElement("div");
    square.style = `border: 1px solid red; 
                    box-sizing: border-box;
                    flex: auto;
                    width: ${GRID_SIZE/grid_count}px;`;

    square.addEventListener("mouseover", function(){
        square.style.backgroundColor = "black";
    });

    container.appendChild(square);
}