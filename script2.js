let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

let context = canvas.getContext("2d");
alert("تم الانتقال الى المرحلة الثانية");

let child = {
  x: 30,
  y: 70,
  width: 20,
  height: 30,
  speed: 15,
  hasBone: true,
};

let exitDoor = {
  x: canvas.width - 30,
  y: canvas.height - 70,
  width: 20,
  height: 50,
};

let mazeWalls = [
  { x1: 0, y1: 400, x2: 400, y2: 400 },
  { x1: 400, y1: 400, x2: 400, y2: 250 },
  { x1: 400, y1: 250, x2: 1000, y2: 250 },
  { x1: 1000, y1: 250, x2: 1000, y2: 100 },
  { x1: 1000, y1: 100, x2: 600, y2: 100 },
  { x1: 600, y1: 100, x2: 1600, y2: 100 },
  { x1: 1600, y1: 100, x2: 1600, y2: 300 },

  { x1: 200, y1: 550, x2: 600, y2: 550 },
  { x1: 600, y1: 550, x2: 600, y2: 400 },
  { x1: 600, y1: 400, x2: 1200, y2: 400 },
  { x1: 1200, y1: 400, x2: 1200, y2: 200 },
  { x1: 1200, y1: 400, x2: 1915, y2: 400 },

  { x1: 200, y1: 700, x2: 1600, y2: 700 },
  { x1: 1600, y1: 700, x2: 1600, y2: 550 },
  { x1: 1600, y1: 550, x2: 1000, y2: 550 },
  { x1: 1000, y1: 700, x2: 1000, y2: 910 },
];

function walls() {
  context.beginPath();
  for (let wall of mazeWalls) {
    context.moveTo(wall.x1, wall.y1);
    context.lineTo(wall.x2, wall.y2);
  }
  context.stroke();
}

function drawMaze() {
  context.strokeStyle = "black";
  walls();
}

function isCollision(child, wall) {
  return (
    child.x - child.width / 2 < wall.x1 &&
    child.x + child.width / 2 > wall.x2 &&
    child.y - child.height / 2 < wall.y1 &&
    child.y + child.height / 2 > wall.y2
  );
}

function isChildInMaze(child) {
  // Check if the child is within the maze boundaries
  for (let i = 0; i < mazeWalls.length; i++) {
    if (isCollision(child, mazeWalls[i])) {
      return false;
    }
  }
  return true;
}
function drawDog() {
  // Draw the dog
  context.fillStyle = "#8B4513"; // Brown color
  context.fillRect(exitDoor.x - 120, exitDoor.y - 30, 100, 60);

  // Legs
  context.fillStyle = "#8B4513"; // Brown color
  context.fillRect(exitDoor.x - 100, exitDoor.y + 30, 15, 40); // Left leg
  context.fillRect(exitDoor.x - 60, exitDoor.y + 30, 15, 40); // Right leg

  // Head
  context.beginPath();
  context.arc(exitDoor.x - 130, exitDoor.y - 30, 30, 0, Math.PI * 2);
  context.fillStyle = "#8B4513"; // Brown color
  context.fill();

  // Eyes
  context.beginPath();
  context.arc(exitDoor.x - 140, exitDoor.y - 40, 3, 0, Math.PI * 2);
  context.arc(exitDoor.x - 135, exitDoor.y - 40, 3, 0, Math.PI * 2);
  context.fillStyle = "#000"; // Black color
  context.fill();

  // Nose
  context.beginPath();
  context.moveTo(exitDoor.x - 150, exitDoor.y - 30);
  context.lineTo(exitDoor.x - 160, exitDoor.y - 20);
  context.lineTo(exitDoor.x - 150, exitDoor.y - 25);
  context.closePath();
  context.fillStyle = "#000"; // Black color
  context.fill();

  // Ears
  context.beginPath();
  context.moveTo(exitDoor.x - 150, exitDoor.y);
  context.lineTo(exitDoor.x - 120, exitDoor.y - 100);
  context.lineTo(exitDoor.x - 120, exitDoor.y - 60);
  context.fillStyle = "#8B4513"; // Brown color
  context.fill();

  // Tail
  context.beginPath();
  context.moveTo(exitDoor.x + 150, exitDoor.y - 5);
  context.lineTo(exitDoor.x + 170, exitDoor.y - 20);
  context.lineTo(exitDoor.x + 190, exitDoor.y - 5);
  context.lineWidth = 5;
  context.strokeStyle = "#8B4513"; // Brown color
  context.stroke();
}

function drawBone() {
  // Draw bone
  context.beginPath();
  context.moveTo(500, 800);
  context.lineTo(550, 800);
  context.lineWidth = 20;
  context.strokeStyle = "white";
  context.lineCap = "round";
  context.stroke();
}

function Child() {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw maze walls
  drawMaze();

  // Draw head
  context.fillStyle = "lightblue";
  context.beginPath();
  context.arc(child.x, child.y - 20, 20, 0, Math.PI * 2);
  context.fill();

  // Draw body
  context.fillStyle = "blue";
  context.fillRect(child.x - 10, child.y, 20, 40);

  // Draw arms
  context.fillStyle = "red";
  context.fillRect(child.x - 15, child.y, 5, 20); // Left arm
  context.fillRect(child.x + 10, child.y, 5, 20); // Right arm

  // Draw legs
  context.fillStyle = "red";
  context.fillRect(child.x - 8, child.y + 40, 5, 20); // Left leg
  context.fillRect(child.x + 4, child.y + 40, 5, 20); // Right leg

  // Draw face features
  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.beginPath();
  context.arc(child.x, child.y - 10, 5, Math.PI, 0, false); // Mouth
  context.stroke();
  context.beginPath();
  context.arc(child.x - 5, child.y - 25, 3, 0, Math.PI * 2, true); // Left eye
  context.fill();
  context.beginPath();
  context.arc(child.x + 5, child.y - 25, 3, 0, Math.PI * 2, true); // Right eye
  context.fill();

  // Draw exit door
  context.fillStyle = "rgb(117, 62, 62)";
  context.fillRect(
    exitDoor.x - exitDoor.width / 2,
    exitDoor.y - exitDoor.height / 2,
    50,
    100
  );
  // Draw the dog if the child has the bone
  if (child.hasBone) {
    drawDog();
    drawBone();
  }
}

function updateChildPosition(event) {
  let newX = child.x;
  let newY = child.y;

  switch (event.key) {
    case "ArrowUp":
      newY -= child.speed;
      break;
    case "ArrowDown":
      newY += child.speed;
      break;
    case "ArrowLeft":
      newX -= child.speed;
      break;
    case "ArrowRight":
      newX += child.speed;
      break;
    case " ":
      // Space key to make the child take/give the bone
      child.hasBone = !child.hasBone;
      break;
  }

  // Check if the new position is within the canvas boundaries
  if (
    newX - child.width / 2 >= 0 &&
    newX + child.width / 2 <= canvas.width &&
    newY - child.height / 2 >= 0 &&
    newY + child.height / 2 <= canvas.height &&
    isChildInMaze({
      x: newX,
      y: newY,
      width: child.width,
      height: child.height,
    })
  ) {
    child.x = newX;
    child.y = newY;

    // Check if the child has reached the exit door
    if (
      child.x + child.width / 2 >= exitDoor.x - exitDoor.width / 2 &&
      child.x - child.width / 2 <= exitDoor.x + exitDoor.width / 2 &&
      child.y + child.height / 2 >= exitDoor.y - exitDoor.height / 2 &&
      child.y - child.height / 2 <= exitDoor.y + exitDoor.height / 2
    ) {
      alert("كفو عليك انقذة الطفل من المتاهة ");
      // You can add further actions or reset the game here
    }
  }

  // Redraw the child and the maze
  Child();
}

window.addEventListener("keydown", updateChildPosition);

// Draw the child, the maze, and the exit door initially
Child();
