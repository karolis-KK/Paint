// Get references to HTML elements
const squaresInput = document.getElementById("squaresInput"); // Input field for the number of squares
const selectClrBtn = document.getElementById("selectClrBtn"); // Button to select drawing color
const confirmBtn = document.getElementById("confirmBtn"); // Button to confirm and create the grid
const resetBtn = document.getElementById("resetBtn"); // Button to reset the grid
const container = document.getElementById("container"); // Container where the grid will be created
const colorClrPicker = document.getElementById("colorClrPicker"); // Color picker for drawing color
const colorBgPicker = document.getElementById("colorBgPicker"); // Color picker for background color
const selectBgBtn = document.getElementById("selectBgBtn"); // Button to select background color

// Variables to hold current drawing and color states
let isDrawing; // Boolean to track whether the user is currently drawing
let colorClr = "#000000"; // Default color for drawing
let colorBg = "#ffffff"; // Default background color

// Event listener to update the drawing color when the color picker button is clicked
selectClrBtn.addEventListener("click", () => {
    colorClr = colorClrPicker.value; // Update the drawing color to the selected value in the color picker
});

// Event listener to update the background color when the background color picker button is clicked
selectBgBtn.addEventListener("click", () => {
    colorBg = colorBgPicker.value; // Update the background color to the selected value in the color picker
});

// Event listener to start drawing when mouse is pressed down within the container
container.addEventListener("mousedown", () => {
    isDrawing = true; // Set isDrawing to true to indicate that the user is drawing
});

// Event listener to stop drawing when mouse is released
container.addEventListener("mouseup", () => {
    isDrawing = false; // Set isDrawing to false to stop drawing
});

// Event listener to stop drawing when mouse leaves the container
container.addEventListener("mouseleave", () => {
    isDrawing = false; // Set isDrawing to false to stop drawing if the mouse leaves the container
});

// Event listener to create a grid of squares when the confirm button is clicked
confirmBtn.addEventListener("click", () => {
    // Remove all existing squares from the container
    while (container.firstChild) {
        container.firstChild.remove();
    }

    // Get the number of squares from the input field
    let squares = parseInt(squaresInput.value);

    // Validate the number of squares input
    if (isNaN(squares) || squares <= 0 || squares > 100) {
        alert("Enter a valid number of squares (More than 0 and less than 100)"); // Alert if input is invalid
    } else {
        let squareLength = 720 / squares; // Calculate the length of each square based on the container size and number of squares

        // Create the grid of squares
        for (let i = 0; i < squares; i++) {
            for (let j = 0; j < squares; j++) {
                let square = document.createElement("div"); // Create a new div element for the square
                square.className = "no-drag"; // Set the class for styling
                square.style.width = `${squareLength}px`; // Set the width of the square
                square.style.height = `${squareLength}px`; // Set the height of the square
                square.style.backgroundColor = `${colorBg}`; // Set the background color of the square

                // Event listener to change square color on mouseover if drawing
                square.addEventListener("mouseover", () => {
                    if (isDrawing) {
                        square.style.backgroundColor = `${colorClr}`; // Change the color of the square if drawing
                    }
                });

                // Event listener to change square color on click
                square.addEventListener("click", () => {
                    square.style.backgroundColor = `${colorClr}`; // Change the color of the square on click
                });

                container.appendChild(square); // Add the square to the container
            }
        }
    }
});

// Event listener to remove all squares from the container when the reset button is clicked
resetBtn.addEventListener("click", () => {
    while (container.firstChild) {
        container.firstChild.remove(); // Remove each child element (square) from the container
    }
});

// Function to save the drawing as an image
function saveDrawing() {
    let canvas = document.createElement('canvas'); // Create a new canvas element
    let ctx = canvas.getContext('2d'); // Get the 2D drawing context
    let containerWidth = container.offsetWidth; // Get the width of the container
    let containerHeight = container.offsetHeight; // Get the height of the container

    canvas.width = containerWidth; // Set the canvas width to the container width
    canvas.height = containerHeight; // Set the canvas height to the container height

    // Loop through each square and draw it on the canvas
    let squares = container.children;
    for (let square of squares) {
        let rect = square.getBoundingClientRect(); // Get the position and size of the square
        let x = rect.left - container.getBoundingClientRect().left; // Calculate the x position relative to the container
        let y = rect.top - container.getBoundingClientRect().top; // Calculate the y position relative to the container
        let width = square.offsetWidth; // Get the width of the square
        let height = square.offsetHeight; // Get the height of the square

        ctx.fillStyle = window.getComputedStyle(square).backgroundColor; // Set the fill color to the square's background color
        ctx.fillRect(x, y, width, height); // Draw the square on the canvas
    }

    // Create a link to download the canvas image
    let link = document.createElement('a');
    link.download = 'drawing.png'; // Set the filename for the download
    link.href = canvas.toDataURL(); // Set the href to the canvas data URL
    link.click(); // Trigger the download
}

// Event listener to save the drawing when the save button is clicked
document.getElementById("saveBtn").addEventListener("click", saveDrawing);