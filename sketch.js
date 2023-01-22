let cellSize;
let blocks;
let boxes
let ground;
let block;
let direction = "right";
let box;

let coin;
let needcoin = true;
let coin_ani;

let mystery_box;
let bricks;
let brick;
let aBrick;

let enemies;
let enemy;
let goomba
  
let mario;
let walk;
let stand;
let jump;

let numOfB;
  
function preload() {
  ground = loadAnimation("pieces/ground.png");
  mystery_box = loadAnimation("pieces/box.png");
  coin_ani = loadAnimation("pieces/mariocoin.png");
  aBrick = loadAnimation("pieces/coin_brick.png");
  powerUp_ani = loadAnimation("pieces/mushroom.png")

  enemy = loadAnimation("pieces/goomba.png")

  walk = loadAnimation(
    "walk/1.png", 
    "walk/2.png");
  stand = loadAnimation("walk/0.png");
  jump = loadAnimation("jump.png");
}

function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  cellSize = 50;
  ROWS = height/cellSize-0.78;  
  
  // start sprite in the center of the screen
  mario = new Sprite();
  mario.collider = "k";
  
  mario.addAni("walking", walk);
  mario.ani.scale = 0.4;
  
  mario.addAni("standing", stand);
  mario.addAni("jumping", jump);
  mario.x = 50;
  mario.y = height-1.45*50-300;
  mario.height = 65;
  mario.width = 35;
  
  
  /// blocks
  blocks = new Group();
  blocks.w = cellSize-1;
  blocks.h = cellSize-0.25;

  enemies = new Group();
  enemies.w = 40;
  enemies.h = 35;
  enemies.visible = false;

  boxes = new Group();
  boxes.w = cellSize;
  boxes.h = cellSize-0.25;

  bricks = new Group();
  bricks.w = cellSize;
  bricks.h = cellSize-0.25;


  coin = new Sprite(0,0);
  coin.static = true
  coin.d = 0.1
  coin.addAni("coin", coin_ani)
  coin.ani.scale = 0.25
  coin.visible = false;

  powerUp = new Sprite(0,0);
  powerUp.static = true
  powerUp.w = cellSize-5
  powerUp.addAni("powerUp", powerUp_ani)
  powerUp.ani.scale = 0.05
  powerUp.visible = false;
  
  make_blocks(0, 10, 50);
  make_blocks(0, 9, 1);

  make_box(7,7);
  make_brick(6,7)
}
  
  
function draw() {
  mario.rotation = 0;
  block.rotation = 0;
  powerUp.rotation = 0;
  enemies.rotation = 0;
  
  background(color(0, 125, 250));
  
  loopFuctions();
  
  enemies.debug = mouse.pressing();
}
  
function make_blocks(x, y, numOfB) {
  for (let n = 1; n < numOfB+1; n++) {
    block = new blocks.Sprite();
    
    block.addAni("ground", ground);
    block.collider = "k";
    
    block.ani = ground;  
    block.ani.scale = 0.88;
    
    block.x = (x+n) * blocks.w-cellSize/2;

    block.y = height-((ROWS-y)*block.h-15);
  }
  
}

function make_brick(x, y) {
    brick = new bricks.Sprite()
    brick.addAni("coin brick", aBrick)
    brick.ani.scale = 0.09
 
    brick.static = true
    brick.x = (x+1) * brick.w-cellSize/2;

    brick.y = height-((ROWS-y)*brick.h-15);
}

function make_box(x, y) {
  box = new boxes.Sprite()
  box.addAni("mystery box", mystery_box)
  box.ani.scale = 0.7

  box.static = true  
  box.x = (x+1) * box.w-cellSize/2;

  box.y = height-((ROWS-y)*box.h-15);
}
  
function mousePressed() {
  goomba = new enemies.Sprite(mouse.x, block.y);
  goomba.addAni("goomba", enemy);
  goomba.ani.scale = 0.25;
  enemies.visible = true;
}

function loopFuctions() {
  mario_move();
  camera.x = mario.x
  if (block.y % 10 === 0){
    console.log(block.y)
  }
  if (block.y >= height-15) {
    blocks.collider = "s"
  }
  if (mario.colliding(blocks) > 2) {
    world.gravity.y = 10;
    mario.static = false;
    
  }
  else {
    mario.kinetic = true;
    world.gravity.y = 20;
  }

  if (mario.overlaps(coin)) coin.remove();
  if (mario.overlaps(powerUp)) powerUp.remove();

  if (mario.colliding(bricks) > 0) {
    console.log(true)
    coin.visible = true
    coin.x = brick.x
    coin.y = brick.y-cellSize
  }

  if (mario.colliding(boxes) > 0) {
    console.log(true)
    powerUp.visible = true
    powerUp.x = box.x
    powerUp.y = box.y-cellSize
    //needcoin = false;
  }
  if (powerUp.visible === true) {
    powerUp.dynamic = true
    powerUp.vel.x = 2.9;
  }
  if (enemies.colliding(blocks)){
    enemies.visible = true;
  }
  if (enemies.visible === true) {
    enemies.vel.x = -2;
  }

 
  

  mario_move();
}

function mario_move(){
  mario.ani = "walking";
  if (kb.pressing("up")) {
    if (direction === "left") {
      mario.mirror.x = true;
    }
    mario.ani = "jumping";
    mario.ani.scale = 0.4;
    if (mario.y < 200){
      mario.vel.y = 10;
    }
    else {
      mario.vel.y = 45;
    }
  }
  else if (kb.pressing("right")) {
    direction ="right";
    mario.mirror.x = false;
    mario.vel.x = 3;
  }
  else if (kb.pressing("left")) {
    direction = "left";
    mario.mirror.x = true;
    mario.vel.x = -3;
  }
  else if (kb.pressing("down")) {
    mario.ani = "standing";
    console.log(world.gravity.y);
  }
  else if (kb.pressing("space")) {
    mario.collider = "d"
  }
  else {
    
    mario.ani = "standing";
    mario.ani.scale = 0.4;
    marioMove = false;
  }
}





