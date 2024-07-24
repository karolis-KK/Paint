// Get references to HTML elements
const squaresInput = document.getElementById("squaresInput");
const selectClrBtn = document.getElementById("selectClrBtn");
const confirmBtn = document.getElementById("confirmBtn");
const resetBtn = document.getElementById("resetBtn");
const container = document.getElementById("container");
const colorClrPicker = document.getElementById("colorClrPicker");
const colorBgPicker = document.getElementById("colorBgPicker");
const selectBgBtn = document.getElementById("selectBgBtn");

// Variables to hold current drawing and color states
let isDrawing;
let colorClr = "#000000"; // Default color for drawing
let colorBg = "#ffffff"; // Default background color

// Event listener to update the drawing color when the color picker button is clicked
selectClrBtn.addEventListener("click", () => {
    colorClr = colorClrPicker.value; // Set the drawing color to the value selected in the color picker
})

// Event listener to update the background color when the background color picker button is clicked
selectBgBtn.addEventListener("click", () => {
    colorBg = colorBgPicker.value; // Set the background color to the value selected in the color picker
})

// Event listener to start drawing when mouse is pressed down within the container
container.addEventListener("mousedown", () => {
    isDrawing = true; // Set isDrawing to true to indicate that the user is drawing
})

// Event listener to stop drawing when mouse is released
container.addEventListener("mouseup", () => {
    isDrawing = false; // Set isDrawing to false to stop drawing
})

// Event listener to stop drawing when mouse leaves the container
container.addEventListener("mouseleave", () => {
    isDrawing = false; // Set isDrawing to false to stop drawing if the mouse leaves the container
})

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
                        square.style.backgroundColor = `${colorClr}`;
                    }
                });

                // Event listener to change square color on click
                square.addEventListener("click", () => {
                    square.style.backgroundColor = `${colorClr}`;
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
})
