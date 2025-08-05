/* General variables */
let grid_size = 16;
const sketch_area = document.getElementById("main-grid");
let paint_color = "#ffe078";
let mouse_down = false;

/**
 * Paint given target with current paint_color
 * @param {HTMLElement} to_paint 
 */
function paint_div (to_paint) {
    if (mouse_down) {
        to_paint.style.backgroundColor = paint_color;
        console.log(`Holding down pointer on element ${to_paint}`)
    }
}

/**
 * Creates grid with dimensions use_size x use_size.
 * @param {number} use_size
 * @returns {null}
 */
function create_grid (use_size) {

    /**
     * @type {HTMLElement[]}
     */
    const grid_divs = [];

    for (let i = 0; i < use_size; i++) { //Creating rows to append to main grid
        const new_row = document.createElement("div");
        new_row.classList.add("row", "flexer", "flex-container")
        
        for (let j = 0; j < use_size; j++) {
            const new_div = document.createElement("div");
            new_div.classList.add("grid-element", "flexer");
            new_row.appendChild(new_div);
            grid_divs.push(new_div);

            /* Adding listeners */
            new_div.addEventListener('mouseenter', (event) => paint_div(event.target));
        }

        sketch_area.appendChild(new_row);

    }

    /* Disable drag */
    document.querySelectorAll('*').forEach(el => {
        el.setAttribute('draggable', false);
    });

    return null;
}

/* Adding general event listeners */
document.addEventListener('pointerdown', () => mouse_down = true);
document.addEventListener('pointerup', () => mouse_down = false);


/* Initialize grid */
create_grid(grid_size);