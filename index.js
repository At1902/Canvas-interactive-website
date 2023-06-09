// access a <canvas> element with the HTML DOM and create a 2D context object

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const radius = 30;


let level = 0;

// function to draw a line from start point to end point
function drawLine(xStart, yStart, xEnd, yEnd) {
  ctx.beginPath();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}

// function to draw a circle around mouse's position
function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}


// Event hadler for mouse movement
function handleMouseMove(event) {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mouse position relative to canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Level 1-- Draw a circle only around the user's mouse position.
  if (level === 0) {
    drawCircle(mouseX, mouseY, radius);
  } else if (level === 1) {
    
    // Level 2-- The canvas is divided into two halves and on user's mouse over one half, a mirror image of the circle is shown in the other half.
    drawLine(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
    
    if (mouseX < canvasWidth / 2) {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
    } else {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
    }
  } else if (level === 2) {
    
    // Level 3-- The canvas is divided into four quadrants and on user's mouse over one quadrant, and a mirror image of the circle is shown in other three quadrants.
    drawLine(canvasWidth / 2, 0, canvasWidth / 2, canvasHeight);
    drawLine(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
    
    if (mouseX < canvasWidth / 2 && mouseY < canvasHeight / 2) {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
      drawCircle(mouseX, canvasHeight - mouseY, radius);
      drawCircle(canvasWidth - mouseX, canvasHeight - mouseY, radius);
    } else if (mouseX < canvasWidth / 2 && mouseY >= canvasHeight / 2) {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
      drawCircle(mouseX, canvasHeight - mouseY, radius);
      drawCircle(canvasWidth - mouseX, canvasHeight - mouseY, radius);
    } else if (mouseX >= canvasWidth / 2 && mouseY < canvasHeight / 2) {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
      drawCircle(mouseX, canvasHeight - mouseY, radius);
      drawCircle(canvasWidth - mouseX, canvasHeight - mouseY, radius);
    } else if (mouseX >= canvasWidth / 2 && mouseY >= canvasHeight / 2) {
      drawCircle(mouseX, mouseY, radius);
      drawCircle(canvasWidth - mouseX, mouseY, radius);
      drawCircle(mouseX, canvasHeight - mouseY, radius);
      drawCircle(canvasWidth - mouseX, canvasHeight - mouseY, radius);
    }
  }
}

// Event handler for mouse click
function handleMouseClick() {
  // Changing level on mouse click-- initially level=0 , then on one click it changes to level = 1 then again on click it changes to level = 2
  level = (level + 1) % 3;
}

// Add event listeners
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleMouseClick);
