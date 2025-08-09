/* General variables */
let grid_size = 16;
const sketch_area = document.getElementById("main-grid");
let paint_color = "#a3d3ff";
let curr_rgb = [];
let mouse_down = false;

/**
 * Paint given target with current paint_color
 * @param {MouseEvent} event_on_div 
 */
function paint_div (event_on_div) {
    if (mouse_down || event_on_div.type === 'click') {
        console.log(event_on_div.type)
        event_on_div.target.style.backgroundColor = paint_color;
        console.log(`Painting element ${event_on_div.target}`)
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
            new_div.addEventListener('mousemove', (event) => paint_div(event)); //paint when moving inside element
            new_div.addEventListener('click', (event) => paint_div(event)); //paint when clicking on element
        }

        sketch_area.appendChild(new_row);

    }

    /* Disable drag */
    document.querySelectorAll('*').forEach(el => {
        el.setAttribute('draggable', false);
    });

    return null;
}

/** Generates a random color and returns it in RGB string format. Also adds colors to curr_rgb
 * @returns {string}
 */
function get_random_color() {
    const get_rand = () => Math.floor(Math.random() * 256);

    curr_rgb[0] = get_rand();
    curr_rgb[1] = get_rand();
    curr_rgb[2] = get_rand();

    return `rgb(${curr_rgb[0]}, ${curr_rgb[1]}, ${curr_rgb[2]})`
}

/**
 * Paints all backgrouns with the current paint_color and fixes font colors if needed (hard to read)
 * @returns {null}
 */
function paint_page() {
    const elements_to_paint =[...document.getElementsByClassName("main-color")];

    elements_to_paint.forEach(element => {
        element.style.backgroundColor = paint_color;
    });

    /**
     * @returns {number}
     */
    function get_luminance() {
        /**
         * @param {number} color
         * @returns {number}
         */
        function sRGB_to_linear(color) {
            clr = color/ 255.0;

            return clr <= 0.04045 ? clr / 12.92 : Math.pow((clr + 0.055) / 1.055, 2.4);
        }

        //Add supprot for changing curr_rgb array given the curr paint color

        const linear_rgb = curr_rgb.map((clr) => sRGB_to_linear(clr));

        return 0.2126 * linear_rgb[0] + 0.7152 * linear_rgb[1] + 0.0722 * linear_rgb[2];
    }

    /**
     * @param {string} luminance 
     * @returns {null}
     */
    function recolor_text(luminance) {
        const primary_fonts = [...document.getElementsByClassName("primary-font-color")];
        const secondary_fonts = [...document.getElementsByClassName("secondary-font-color")];

        if (luminance === "white") {
            primary_fonts.forEach(element => {
                element.style.color = "#ffffff";
            });

            secondary_fonts.forEach(element => {
                element.style.color = "#f5f5f5";
            });
        }

        return null;
    }

    get_luminance() < 0.179 ? recolor_text('white') : true;

    return null;
}


/* Adding general event listeners */
document.addEventListener('pointerdown', () => mouse_down = true);
document.addEventListener('pointerup', () => mouse_down = false);

/* Initialize grid and colors */
create_grid(grid_size);
paint_color = get_random_color();
paint_page();