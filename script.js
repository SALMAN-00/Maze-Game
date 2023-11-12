let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

let context = canvas.getContext("2d");

let child = {
  x: 30,
  y: 70,
  width: 20,
  height: 30,
  speed: 15,
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
      let next = "SecondGame.html";

      window.location.href = next;
        }
  }

  // Redraw the child and the maze
  Child();
}

window.addEventListener("keydown", updateChildPosition);

// Draw the child, the maze, and the exit door initially
Child();
