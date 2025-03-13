import EventEmitter from "./eventEmitter.js";
import {
  GameObject,
  Character,
  NPC,
  Enemy,
  Boss,
  Item,
} from "./gameObjects.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const eventEmitter = new EventEmitter();

let gameObjects = [];
let player;

function initGame() {
  canvas.width = 800;
  canvas.height = 600;
  ctx.font = "20px Arial";

  // Create player
  player = new Character("Hero", 100, 100, 100, 10);
  gameObjects.push(player);

  // Create NPCs
  const npc1 = new NPC("Villager", 200, 200, "Hello, hero!");
  gameObjects.push(npc1);

  // Create enemies
  const enemy1 = new Enemy("Goblin", 300, 300, 50, 5);
  gameObjects.push(enemy1);

  // Create boss
  const boss = new Boss("Dragon", 500, 100, 200, 20, 30);
  gameObjects.push(boss);

  // Create items
  const potion = new Item(
    "Health Potion",
    150,
    150,
    (target) => (target.health += 20)
  );
  gameObjects.push(potion);

  // Subscribe to events
  eventEmitter.on("move", (direction) => {
    switch (direction) {
      case "up":
        player.y -= 10;
        break;
      case "down":
        player.y += 10;
        break;
      case "left":
        player.x -= 10;
        break;
      case "right":
        player.x += 10;
        break;
    }
  });

  eventEmitter.on("attack", (target) => {
    player.attack(target);
  });

  eventEmitter.on("interact", (target) => {
    if (target instanceof NPC) {
      target.interact();
    }
  });

  eventEmitter.on("useItem", (item) => {
    item.use(player);
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameObjects.forEach((obj) => obj.draw(ctx));
  requestAnimationFrame(gameLoop);
}

window.onload = () => {
  initGame();
  gameLoop();
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      eventEmitter.emit("move", "up");
      break;
    case "ArrowDown":
      eventEmitter.emit("move", "down");
      break;
    case "ArrowLeft":
      eventEmitter.emit("move", "left");
      break;
    case "ArrowRight":
      eventEmitter.emit("move", "right");
      break;
    case "a":
      const enemy = gameObjects.find(
        (obj) => obj instanceof Enemy && !obj.dead
      );
      if (enemy) eventEmitter.emit("attack", enemy);
      break;
    case "e":
      const npc = gameObjects.find((obj) => obj instanceof NPC);
      if (npc) eventEmitter.emit("interact", npc);
      break;
    case "i":
      const item = gameObjects.find((obj) => obj instanceof Item);
      if (item) eventEmitter.emit("useItem", item);
      break;
  }
});
