var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.35

//creating all of the groups
  doorsGroup = createGroup()
  invisibleBlockGroup = createGroup()
  climbersGroup = createGroup()


}

function draw() {
  background(0);
  if(gameState == "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0
    }
    ghost.velocityY = ghost.velocityY+1 
    //mkaing ghost move up when space bar is pressed
    if(keyDown("space")){
      ghost.velocityY = -9
    }
    //making ghost move to the right when right arrow is pressed
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x+5
    }
    //making the ghost move to the left when left arrow is pressed
    if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x-5
    }
    //checking for when ghost dies
    if(ghost.y > 600||ghost.isTouching(invisibleBlockGroup)){
      gameState = "end"
    }
    obsticles()
    drawSprites()

  }
  if(gameState=="end"){
    fill ("purple")
    textSize (50)
    stroke("light blue")
    strokeWeight(10)
    text("Game Over!", 170,300)
    
  }
  
}

function obsticles(){
  
  if(frameCount%250==0){
    //creating doors
    door = createSprite(200,-50)
  door.addImage("door" ,doorImg)
  door.x = Math.round(random(120,480 ))
  door.velocityY = 3
  doorsGroup.add(door)
  door.lifeTime = 500
  //fixing the depth issue
  ghost.depth = door.depth+1
  //creating climbers
  climber = createSprite(200, 10)
  climber.addImage("climber",climberImg)
  climber.x = door.x
  climber.velocityY = 3
  climbersGroup.add(climber)
  climber.lifeTime = 500
  //creating invisable blocks under the climbers
 invisibleBlock = createSprite(200,15)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 5
  invisibleBlock.x = climber.x
  invisibleBlock.velocityY = 3
  invisibleBlockGroup.add(invisibleBlock)
  invisibleBlock.lifeTime = 500
  invisibleBlock.visible = false
  }

}
