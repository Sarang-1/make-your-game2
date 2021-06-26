// ....declaring all variables

var form;
//components during assembling stage
var component1,component2,component3,component4,component5,component6,bg;
//variables containing the final position of components
var comp1,comp2,comp3,comp4,comp5,comp6;
//variables containing the initial position of the components
var pos1,pos2,pos3,pos4,pos5,pos6;
var rocket,distance,speed,dark;
//all the groups and arrays
var compPos = [];
var componentG,compG,posG,obstacleG;
//all the images
var i1,i2,i3,i4,i5,i6,darkImg,groundImg,rocketImg,rocketImg2,speechBubbleImg,healthImg,blast,meteor,stars;
//the buttons
var next,forward,yes,no;
// backgrounds
var ground,space;
//health 
var health;
//tutorial text and the speech box
var tutorial,speechBubble;
//gamestate
var gameState;
// for choosing the tutorials'text
var speechState = 0;
//time for speeches
var speechCount = 0;
//delay time for speeches
var delayCount = 0;


//loading all the images
function preload(){
  bg = loadImage("images/bg.jpg");
  meteor = loadImage("images/meteor.png");
  blast = loadImage("images/blast.png");
  stars = loadImage("images/original.gif");
  i1 = loadImage("images/1.png");
  i2 = loadImage("images/2.png");
  i3 = loadImage("images/3.png");
  i4 = loadImage("images/4.png");
  i5 = loadImage("images/5.png");
  i6 = loadImage("images/6.png");
  darkImg = loadImage("images/dark.png");
  rocketImg = loadImage("images/rocket.png");
  rocketImg2 = loadImage("images/rocket2.png");
  groundImg = loadImage("images/ground.jpg");
  healthImg = loadImage("images/healthBar.png");
  speechBubbleImg = loadImage("images/text.png");
}


function setup() {
  //the canvas area
  createCanvas(1350,650);

 // declaring groups
 componentG = createGroup();
 compG = createGroup();
 obstacleG = createGroup();
 posG = createGroup();

 //rocket's components
 component1 = createSprite(200,130,50,50);
 component2 = createSprite(200,380,50,50);
 component3 = createSprite(200,550,50,50);
 component4 = createSprite(1150,150,50,50);
 component5 = createSprite(1150,360,50,50);
 component6 = createSprite(1150,550,50,50);

 compPos.push([component1.x,component1.y]);
 compPos.push([component2.x,component2.y]);
 compPos.push([component3.x,component3.y]);
 compPos.push([component4.x,component4.y]);
 compPos.push([component5.x,component5.y]);
 compPos.push([component6.x,component6.y]);

 component1.depth=10;
 component1.addImage(i1);
 component2.addImage(i2);
 component3.addImage(i3);
 component4.addImage(i4);
 component5.addImage(i5);
 component6.addImage(i6);
 componentG.add(component1);
 componentG.add(component2);
 componentG.add(component3);
 componentG.add(component4);
 componentG.add(component5);
 componentG.add(component6);
 componentG.setScaleEach(0.7);
 componentG.setVisibleEach(false);

 //final position of components
 comp1 = createSprite(683,364,10,10);
 comp2 = createSprite(626,346,10,10);
 comp3 = createSprite(680,199,10,10);
 comp4 = createSprite(681,293,10,10);
 comp5 = createSprite(736,346,10,10);
 comp6 = createSprite(680,505,10,10);
 compG.add(comp1);
 compG.add(comp2);
 compG.add(comp3);
 compG.add(comp4);
 compG.add(comp5);
 compG.add(comp6);
 compG.setVisibleEach(false);

 //when components touch these they settle to their final position
 pos1 = createSprite(683,364-component1.height/3,10,10);
 pos2 = createSprite(626,346-component2.height/3,10,10);
 pos3 = createSprite(680,199-component3.height/3,10,10);
 pos4 = createSprite(681,293-component4.height/3,10,10);
 pos5 = createSprite(736,344-component5.height/3,10,10);
 pos6 = createSprite(680,505-component6.height/3,10,10);
 posG.add(pos1);
 posG.add(pos2);
 posG.add(pos3);
 posG.add(pos4);
 posG.add(pos5);
 posG.add(pos6);
 posG.setVisibleEach(false);

 //take off button
 next = createButton("TAKE OFF");
 next.position(620,100);
 next.hide();
 
 rocket = createSprite(600,400,50,250);
 rocket.addImage(rocketImg2);
 rocket.scale = 0.7;
 rocket.visible = false;
 rocket.setCollider("rectangle",0,0,170,400);

 //black rocket during assembling
 dark = createSprite(680,350,50,50);
 dark.addImage(darkImg);
 dark.visible = false;
 dark.scale = 0.7
 dark.depth = -1;

 //background sprites
 ground = createSprite(width/2,-height*11.3,width,height);
 ground.addImage(groundImg);
 ground.scale = 4;
 ground.depth = -2;
 ground.visible = false;

 //speech box
 speechBubble = createSprite(200,530,50,50);
 speechBubble.addImage(speechBubbleImg);
 speechBubble.scale = 1;
 speechBubbleImg.resize(400,210);
 speechBubble.visible = false;

 // next button
 forward = createButton("Next");
 forward.position(300,height-100);
 forward.hide();
 forward.style("background-color","rgb(255,255,255)");
 forward.style('width','60px');
 forward.style('height','22px');
 forward.style('font-family','sans-serif');
 forward.style('font-weight','bold');
 forward.style('font-size','15px');

 // yes button
 yes = createButton("Yes");
 yes.position(300,height-100);
 yes.hide();
 yes.style("background-color","rgb(255,255,255)");
 yes.style('width','40px');
 yes.style('height','22px');
 yes.style('font-family','sans-serif');
 yes.style('font-weight','bold');
 yes.style('font-size','15px');

 //no button
 no = createButton("No");
 no.position(240,height-100);
 no.hide();
 no.style("background-color","rgb(255,255,255)");
 no.style('width','40px');
 no.style('height','22px');
 no.style('font-family','sans-serif');
 no.style('font-weight','bold');
 no.style('font-size','15px');

 //some important elements of the game
 tutorial = document.getElementById("abc");
 distance = 0;
 speed = 0;
 health=155;
 gameState = 0;
 form = new Form();
}

function draw() {
  background(bg);  
  drawSprites();
  form.display();
  
  ground.y += distance/100;

  if(componentG.get(0).x === compG.get(0).x && componentG.get(0).y === compG.get(0).y &&componentG.get(1).x === compG.get(1).x && componentG.get(1).y === compG.get(1).y &&
  componentG.get(2).x === compG.get(2).x && componentG.get(2).y === compG.get(2).y &&componentG.get(3).x === compG.get(3).x && componentG.get(3).y === compG.get(3).y &&
  componentG.get(4).x === compG.get(4).x && componentG.get(4).y === compG.get(4).y &&componentG.get(5).x === compG.get(5).x && componentG.get(5).y === compG.get(5).y )
  {
   next.show();
   //take off button pressed
   next.mousePressed(()=>{
     rocket.visible = true;
     componentG.setVisibleEach(false);
     dark.visible = false;
     form.hide();
     gameState = 1;
  });
  }

   

 // all the text for tutorials
 if(gameState === 1){
   speechBubble.visible = true;
   
   // changing speech when button pressed
   forward.mousePressed(()=>{
     nxt();
     if(speechState>=36){
       gameState=2;
       speechBubble.visible = false;
       tutorial.style.display = "none";
     }
   });

   speech(0,"Hello Obstinatel!! Welcome to the game..");

   if(speechState === 1){
     speech(1,"Do you know how to play this game??");
     forward.hide();
     if(speechCount>25){
     yes.show();
     no.show();
     }
     yes.mousePressed(()=>{
       nxt();
     });
     no.mousePressed(()=>{
       nxt();
       speechState = 25;       
     });
   }

   if(speechState === 2){
     speech(2,"OKKAY, So do you wanna skip this tutorial??");
     forward.hide();
     if(speechCount>25){
      yes.show();
      no.show();
      }
     yes.mousePressed(()=>{
       nxt();
       speechState = 35;
     });
     no.mousePressed(()=>{
       nxt();
       speechState = 25;
     });
   }
   
   speech(25,"Looks like you are a Noob!! No problem.. let me help you.");
   speech(26,"Follow the upcoming instructions to continue.");

   // changing the position of text bubble
   if(speechState === 27){
     speech(27,"First of all, to move the rocket up, press the UP(^) arrow key.");
     forward.hide();
     if(keyDown(UP_ARROW)){
       speed += 1;
       rocket.addImage(rocketImg);
       nxt();
     }
   }

   if(speechState === 28){
     speech(28,"Great, now use the LEFT(<) arrow key to move left.");
     forward.hide();
     if(keyDown(LEFT_ARROW)){
       rocket.x -= 30;
       nxt();
     }
   }

   if(speechState === 29){
    speech(29,"Well going, now use the RIGHT(>) arrow key to move right.");
    forward.hide();
    if(keyDown(RIGHT_ARROW)){
      rocket.x += 30;
      nxt();
    }
   }

   if(speechState === 30){
   speech(30,"EXCEPTIONAL! Now look at the above red bar, it shows your remaining health.");
   speechBubble.rotation = 180;
   speechBubble.y = 160;
   speechBubble.x = 140;
   speechBubble.scale = 0.9;
   tutorial.style.top = "110px";
   tutorial.style.left = "30px";
   tutorial.style.marginRight = "1040px";
   forward.position(240,230);
   }

   if(speechState === 31){
   speech(31,"These are your rocket's current status i.e. distance and speed.");
   speechBubble.x = width-300;
   speechBubble.y = 250;
   speechBubble.rotation = 180;
   tutorial.style.top = "200px";
   tutorial.style.marginRight = "120px";
   tutorial.style.left = "910px";
   forward.position(width-180,330);
   }

   if(speechState === 32){
   speech(32,"Beware of the obstacles which will come in your way when you are in space..");
   speechBubble.x = 200;
   speechBubble.y = 530;
   speechBubble.rotation = 0;
   forward.position(300,height-100);
   tutorial.style.top = "430px";
   tutorial.style.marginRight = "1000px";
   tutorial.style.left = "50px";
   }
   speech(33,"Let me think if I am missing out something  to tell you . . . . . . . . hmm . . . .")
   speech(34,"OH YEAH, ONE MORE THING!! You need to reach mars which is at a distance of ___ from EARTH.");
   speech(35,"SUPERB!! NOW I THINK YOU ARE READY TO GO. COME ON.. YOU CAN DO THIS...");
   
  }

 // when game is in play
 if(rocket.visible === true){
   bg = stars;
   fill(255);
   rect(140,57,155,26);
   if(health >= 100){
   fill(rgb(0,255,0));
   }else if(health >=50 && health< 100){
     fill("orange");
   } else{
     fill("red");
   }
   rect(140,57,health,26);
   image(healthImg,100,50,200,40);
   next.hide();
   ground.visible = true;
   
   //controls for the rocket
   if(gameState === 2){
      if(health>0){
        if(ground.y >= 8830){
          spawnObstacles();
        }

       if(keyIsDown(UP_ARROW)){
         speed += 1;
         rocket.addImage(rocketImg)
        } else {
         rocket.addImage(rocketImg2);
        }

       if(keyIsDown(LEFT_ARROW)){
         rocket.x -= 10;
        }  

       if(keyIsDown(RIGHT_ARROW)){
         rocket.x += 10;
        }
        //calculations for speed and distance
        speed *= 0.98;
        distance += speed/2;

       if(distance <= 0){
         distance = 0;
        }
      }
     

      if(health <= -1){
        obstacleG.destroyEach();
        rocket.addImage(blast);
      }
      
    }
   
   //status of rocket
   textSize(20);
   fill("red");
   text("DISTANCE: "+round(distance),1110,130);
   text("SPEED: "+round(speed),1110,160);    

   //decreasing health
   if(rocket.isTouching(obstacleG)){
     speed -= 1;
     health -= 35;

     for(var i=0;i<obstacleG.length;i++){
       obstacleG.get(i).destroy();
      }
    }
  }

}

// controls for the rocket components during assembling stage
function mouseDragged(){
  for(let i=0;i<componentG.length;i++){

    if(componentG.get(i).isTouching(posG.get(i))){
     componentG.get(i).x = compG.get(i).x;
     componentG.get(i).y = compG.get(i).y;
    }
   else if(mousePressedOver(componentG.get(i))){
     componentG.get(i).x = mouseX;
     componentG.get(i).y = mouseY;
    }
   else{
     componentG.get(i).x = compPos[i][0];
     componentG.get(i).y = compPos[i][1];
    }
  }
}


//spawning random obstacles
function spawnObstacles(){
  if(frameCount%80 === 0){
    var obstacle = createSprite(random(rocket.x-100,rocket.x+100),0,50,50);
    obstacle.addImage(meteor);
    obstacle.scale = 0.1;
    obstacle.depth = 10;
    obstacle.velocityY = 10;
    obstacle.lifetime = 220;
    obstacleG.add(obstacle);
  }
}

//displaying all the tutorials
function speech(state,message) { 
  if (speechState === state) {
    if(frameCount%5===0){
      speechCount++;
      delayCount++;
    }

    if (speechCount>0 && (delayCount < 2)) {
      var typewriter = new Typewriter(tutorial, {
       loop: false,
       delay: 50,
      });

      typewriter
      .typeString(message)
      .callFunction(()=>{
        if((speechState!=1)&&(speechState!=2)&&(speechState!=27)&&(speechState!=28)&&(speechState!=29)){
          forward.show();
        }
      })
      .start();
    }
  }
}

//when next is pressed during tutorial stage
function nxt(){
  yes.hide();
  no.hide();
  speechState++;
  speechCount = 0;
  delayCount = 0;
  forward.hide();
}