// Basic Setup
{
size(600, 600, JAVA2D);
rectMode(CENTER);
ellipseMode(CENTER);
imageMode(CENTER);
textAlign(CENTER, CENTER);
strokeCap(ROUND);
angleMode = "radians";
}
// predefine some functions
var lengthC, lengthB, newC, newB, runC, runB, runAll;
// define variables
// hexagon size
var hs = 20;
// money
var money = 50;
// selected items
var selected = [0, 0, 0];
// cursor
var cs = ARROW;
// Shop transitioning?
var moving = false;
// Current scene
var scene = "home";
// Scene transitioning?
var transition = [0];
// Selected slide on drones section
var slideshow = [0, 0, 0];

// how certain bullets have speial properties
var explodes = [5, 11, 14, 17];
var immune = [8];

// How certain drones have special properties
var no_shoot = [18, 21, 22, 23, 24];

// Amount of array elements allocated for one character/bullet
var C_AMOUNT = 9;
var B_AMOUNT = 6;

// Good guy colour & bad guy colour
var COLOURS = [
  0xff0075ff,
  0xffff2f00
];

// The prices of each drone
var PRICES = [
  // Weak Drone
  50,
  // Drone
  75,
  // Swarm Drone
  35,
  // Strone Drone
  125,
  // Large Drone
  200,
  // Dummy
  25,
  // Plane
  200,
  // Bomber
  250,
  // Blimp
  400,
  // Base
  0,
  // Tank
  70,
  // Strong Tank
  130,
  // Large Range
  150,
  // Mine Layer
  70,
  // Bomb tosser
  200,
  // Flames
  300,
  // Turret
  175,
  // Fast Turret
  350,
  // Healer
  200,
  // Bomb Turret
  350,
  // Flame turret
  450,
  // Wall
  175,
  // Wall
  225,
  // Wall
  275,
  // Wall
  300
];

// The description of each drone
var DESCRIPTION = [
  // Weak Drone
  "A weak drone which deals small\ndamage and is not very durable.",
  // Drone
  "A weak drone which deals some\ndamage and is slightly durable.",
  // Swarm Drone
  "Similar to the really weak drone.\nThis drone also has a group\nmentality allowing it to attack in large groups.",
  // Strone Drone
  "A drone which deals fair damage\nand is slightly durable.",
  // Large Drone
  "A drone which deals high damage\nand is fairly durable.",
  // Dummy
  "A weak drone which deals minimal\ndamage, shoots extremely slowly, \nand is not very durable.",
  // Plane
  "A fast moving craft which is\nfairly durable and has small damage.",
  // Bomber
  "A fairly fast craft with extremely\npowerful shots which explode,\nbut shoots slowly.",
  // Blimp
  "An aircraft which deals very low damage\nbut has high durability\nand creates swarm drones.",
  // Base
  null,
  // Tank
  "A strong vehicle with decent firepower.",
  // Strong Tank
  "A strong vehicle with good firepower.",
  // Large Range
  "A strong vehicle with decent firepower\nand a large firing range.",
  // Mine Layer
  "A strong craft which lays land mines\nbut does not shoot.",
  // Bomb tosser
  "A tank which shoots bombs instead of bullets.",
  // Flames
  "A flame-thrower tank which is extremely\nstrong but has a small range.",
  // Turret
  "A stationary weapon with high durability.",
  // Fast Turret
  "A turret with a very fast reload speed.",
  // Healer
  "Slightly regerates hurt troops nearby.",
  // Bomb Turret
  "A turret which shoots bombs instead of bullets.",
  // Flame turret
  "A strong turret which shoots\nflames instead of bullets.",
  // Wall
  "A Wall blocks all land objects and some air ones.",
  // Wall
  "A Stronger Wall.",
  // Wall
  "An even stronger wall.",
  // Wall
  "A really strong wall."
];

// The order in which the shop displays drones
var ORDER = [
  [5, 2, 0, 1, 3, 4, 6, 7, 8],
  [10, 13, 11, 12, 14, 15],
  [16, 18, 17, 19, 20],
  [21, 22, 23, 24]
];

// The chances that the enemy will make a certain drone.
// The more a number shows up, the likelier that that is chosen.
var chances = [
  5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 4, 4, 6, 6, 7, 8, 10, 10, 11, 12, 13, 14, 15, 16, 16, 17, 17, 18, 19, 20, 21, 21, 22, 22, 23, 23, 24, 24
];

// The names of the drones.
var NAMES = [
  "Weak Drone",
  "Drone",
  "Swarm Drone",
  "Strong Drone",
  "Large Drone",
  "Really Weak",
  "Plane",
  "Bomber",
  "Blimp",
  "Base",
  "Tank",
  "Strong Tank",
  "Large Range",
  "Mine Layer",
  "Bomb tosser",
  "Flames",
  "Turret",
  "Fast Turret",
  "Healer",
  "Bomb Turret",
  "Flame turret",
  "Wall",
  "Wall",
  "Wall",
  "Wall"
];

// The information on all the drones' properties.
var INFO = [
  // Weak Drone
  {
    "sx" : 30,        // Size-x
    "sy" : 30,        // Size-y
    "rt" : 20,        // Reload Time
    "bt" : 0,         // bullet type
    "ac" : 0.3,       // Accuracy (0 is perfect, pi is bad)
    "sp" : 0.8,       // Speed
    "hp" : 6          // Health
  },
  // Attack Drone 1
  {
    "sx" : 40,
    "sy" : 40,
    "rt" : 150,
    "bt" : 1,
    "ac" : 0,
    "sp" : 0.5,
    "hp" : 20
  },
  // Swarm drone
  {
    "sx" : 30,
    "sy" : 30,
    "rt" : 100,
    "bt" : 2,
    "ac" : 0,
    "sp" : 0.7,
    "hp" : 5
  },
  // Attack drone 2
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 225,
    "bt" : 3,
    "ac" : 0,
    "sp" : 0.3,
    "hp" : 40
  },
  // Attack drone 3
  {
    "sx" : 40,
    "sy" : 40,
    "rt" : 220,
    "bt" : 6,
    "ac" : 0,
    "sp" : 0.45,
    "hp" : 50
  },
  // Dumb drone
  {
    "sx" : 30,
    "sy" : 30,
    "rt" : 100,
    "bt" : 2,
    "ac" : 0,
    "sp" : 0.7,
    "hp" : 4
  },
  // Airplane 1
  {
    "sx" : 45,
    "sy" : 55,
    "rt" : 60,
    "bt" : 4,
    "ac" : 0.1,
    "sp" : 1,
    "hp" : 40
  },
  // Airplane 2
  {
    "sx" : 45,
    "sy" : 55,
    "rt" : 350,
    "bt" : 5,
    "ac" : 0,
    "sp" : 0.95,
    "hp" : 50
  },
  // Blimp
  {
    "sx" : 43,
    "sy" : 75,
    "rt" : 100,
    "bt" : 7,
    "ac" : 0.2,
    "sp" : 0.2,
    "hp" : 80
  },
  // Base
  {
    "sx" : 75,
    "sy" : 75,
    "rt" : 350,
    "bt" : 1,
    "ac" : 0,
    "sp" : 0,
    "hp" : 1000
  },
  // Tank 1
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 300,
    "bt" : 9,
    "ac" : 0,
    "sp" : 0.5,
    "hp" : 50
  },
  // Tank 2
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 250,
    "bt" : 9,
    "ac" : 0,
    "sp" : 0.65,
    "hp" : 65
  },
  // Tank long range
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 275,
    "bt" : 10,
    "ac" : 0,
    "sp" : 0.5,
    "hp" : 65
  },
  // Tank mine maker
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 350,
    "bt" : 14,
    "ac" : 0,
    "sp" : 0.4,
    "hp" : 48
  },
  // Tank explode
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 315,
    "bt" : 11,
    "ac" : 0,
    "sp" : 0.4,
    "hp" : 48
  },
  // Tank flame
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 2,
    "bt" : 12,
    "br" : true, // bullet random (13)
    "ac" : 0.5,
    "sp" : 0.4,
    "hp" : 45
  },
  // Turret 1
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 200,
    "bt" : 15,
    "ac" : 0,
    "sp" : 0,
    "hp" : 75
  },
  // Turret 2
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 10,
    "bt" : 16,
    "ac" : 0.05,
    "sp" : 0,
    "hp" : 85
  },
  // Turret Heal
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : Infinity,
    "bt" : 0,
    "ac" : 0,
    "sp" : 0,
    "hp" : 70
  },
  // Turret Bomb
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 400,
    "bt" : 17,
    "ac" : 0,
    "sp" : 0,
    "hp" : 75
  },
  // Turret Flame
  {
    "sx" : 45,
    "sy" : 45,
    "rt" : 2,
    "bt" : 12,
    "br" : true,
    "ac" : 0.5,
    "sp" : 0,
    "hp" : 75
  },
  // Wall 1
  {
    "sx" : 51,
    "sy" : 51,
    "rt" : Infinity,
    "bt" : 0,
    "ac" : 0,
    "sp" : 0,
    "hp" : 150
  },
  // Wall 2
  {
    "sx" : 51,
    "sy" : 51,
    "rt" : Infinity,
    "bt" : 0,
    "ac" : 0,
    "sp" : 0,
    "hp" : 200
  },
  // Wall 3
  {
    "sx" : 51,
    "sy" : 51,
    "rt" : Infinity,
    "bt" : 0,
    "ac" : 0,
    "sp" : 0,
    "hp" : 250
  },
  // Wall 4
  {
    "sx" : 51,
    "sy" : 51,
    "rt" : Infinity,
    "bt" : 0,
    "ac" : 0,
    "sp" : 0,
    "hp" : 300
  }
];
// The information on all the bullets' properties
var B_INFO = [
  // Mini drone shot
  {
    "r" : 125,          // range
    "s" : 8,            // speed
    "z" : 5,            // size
    "d" : 2           // damage
  },
  // Fighter drone shot 1
  {
    "r" : 25,
    "s" : 4.5,
    "z" : 7,
    "d" : 3.5
  },
  // Swarm shot
  {
    "r" : 200,
    "s" : 5.5,
    "z" : 7,
    "d" : 1.1
  },
  // Fighter drone shot 2
  {
    "r" : 275,
    "s" : 4,
    "z" : 9,
    "d" : 4
  },
  // plane shot 1
  {
    "r" : 225,
    "s" : 5,
    "z" : 8,
    "d" : 2.6
  },
  // plane large shot
  {
    "r" : 125,
    "s" : 3,
    "z" : 12,
    "d" : 6.5
  },
  // Drone shot 3
  {
    "r" : 350,
    "s" : 6,
    "z" : 8,
    "d" : 3.5
  },
  // Blimp shot
  {
    "r" : 325,
    "s" : 6,
    "z" : 5,
    "d" : 1
  },
  // Explosion particle
  {
    "r" : 70,
    "s" : 3,
    "z" : 5,
    "d" : 0.05
  },
  // Tank shot 1
  {
    "r" : 225,
    "s" : 4,
    "z" : 10,
    "d" : 3.75
  },
  // Long Tank shot
  {
    "r" : 400,
    "s" : 4,
    "z" : 10,
    "d" : 4
  },
  // Tank boom shot
  {
    "r" : 250,
    "s" : 4,
    "z" : 8,
    "d" : 0
  },
  // flame shot
  {
    "r" : 175,
    "s" : 3.5,
    "z" : 25,
    "d" : 0.175
  },
  // flame shot square
  {
    "r" : 175,
    "s" : 3.5,
    "z" : 25,
    "d" : 0.175
  },
  // mine
  {
    "r" : 400,
    "s" : 0,
    "z" : 15,
    "d" : 1.5
  },
  // turret shot 1
  {
    "r" : 350,
    "s" : 4.5,
    "z" : 9,
    "d" : 2
  },
  // Turret shot 2
  {
    "r" : 300,
    "s" : 5.5,
    "z" : 6,
    "d" : 0.25
  },
  // Turret boom shot
  {
    "r" : 200,
    "s" : 4,
    "z" : 8,
    "d" : 0
  }
];

// Holds all the characters.
var characters = [[], []];
// Holds all the bullets
var bullets = [[], []];

// helper functions
function mod(v1, v2){
  // Fixes how js modulus don't work when negative
  return ((v1 % v2) + v2) % v2;
}
function smoothstep(per, start, stop){
  // creates a smooth transition from linear values.
  start = start || 0;
  stop = stop || 1;
  per -= min(start, stop);
  per /= abs(stop - start);
  
  return start + (stop - start) * per * per * (3 - 2*per);
}
function pdist(x1, y1, x2, y2){
  // returns the distance of 2 points squared.
  // This function runs faster than dist()
  return sq(x2 - x1) + sq(y2 - y1);
}
function getHex(x, y){
  // credit to Sam Hocevar:
  // https://gamedev.stackexchange.com/questions/20742/how-can-i-implement-hexagonal-tilemap-picking-in-xna
  
  // Find out which major row and column we are on:
  var row = ~~(y / hs);
  var column = ~~(x / (hs << 1));

  // Compute the offset into these row and column:
  var dy = y - row * hs;
  var dx = x - column * (hs << 1);

  // Are we on the left of the hexagon edge, or on the right?
  if (((row ^ column) & 1) === 0){
    dy = hs - dy;
  }
  var right = 0 < hs * (dx - hs) ? 1 : 0;

  // Now we have all the information we need, just fine-tune row and column.
  row += (column ^ row ^ right) & 1;
  column += right;
  
  return [row, column];
}

// interact functions
function button(x, y, w, h){
  // finds if the mouse if=s in a rectangular button.
  w >>= 1;
  h >>= 1;
  return mouseX > x - w && mouseY > y - h && mouseX < x + w && mouseY < y + h;
}
function shopClick(){
  // Undoes any selection
  selected[3] = -1;
  
  // Checks if the main shop section buttons are pressed
  if(button(50, 575, 50, 50)){
    selected[1] = 0;
  }else if(button(150, 575, 50, 50)){
    selected[1] = 1;
  }else if(button(450, 575, 50, 50)){
    selected[1] = 2;
  }else if(button(550, 575, 50, 50)){
    selected[1] = 3;
  }
  
  // Checks if a drone is pressed
  var stuff = ORDER[floor(selected[0])];
  for(var i = 0; i < stuff.length; i++){
    var x = 300+(i+0.5-0.5*stuff.length)*560/stuff.length;
    if(PRICES[stuff[i]] <= money && button(x, 525, 50, 50)){
      selected[3] = stuff[i];
    }
  }
}

// graphics functions
function graphics(t, si, time, s){
  // The graphics for all the drones. 
  switch(t){
    // Weak drone
    case 0:
      var sf = sin(time / 2);
      var cf = cos(time / 2);
      stroke(COLOURS[s]);
      strokeWeight(4);
      line(-si*0.25, -si*0.25, si*0.25, si*0.25);
      line(si*0.25, -si*0.25, -si*0.25, si*0.25);
      noStroke();
      fill(COLOURS[s]);
      rect(0, 0, si * 0.25, si * 0.5, 50);
      fill(0, 50);
      ellipse(0, 0, si*0.2, si*0.3);
      stroke(0);
      strokeWeight(2);
      line(-si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(-si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
    break;
    // Drone
    case 1:
      var sf = sin(time / 2);
      var cf = cos(time / 2);
      stroke(lerpColor(COLOURS[s], 150, 0.5));
      strokeWeight(5);
      line(-si*0.25, -si*0.25, si*0.25, si*0.25);
      line(si*0.25, -si*0.25, -si*0.25, si*0.25);
      noStroke();
      fill(125);
      rect(0, 0, si * 0.25, si * 0.55, 50);
      fill(COLOURS[s]);
      ellipse(0, 0, si*0.4, si*0.4);
      fill(0, 30);
      ellipse(-si * 0.02, si * 0.02, si*0.3, si*0.3);
      fill(COLOURS[s], 100);
      ellipse(si * 0.05, -si * 0.05, si*0.3, si*0.3);
      stroke(0);
      strokeWeight(3);
      line(-si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(-si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
    break;
    // Swarm Drone
    case 2:
      var sf = sin(time / 2);
      var cf = cos(time / 2);
      stroke(100);
      strokeWeight(4);
      line(-si*0.25, -si*0.25, si*0.25, si*0.25);
      line(si*0.25, -si*0.25, -si*0.25, si*0.25);
      noStroke();
      fill(60);
      rect(0, 0, si * 0.25, si * 0.5, 50);
      fill(COLOURS[s], 150);
      ellipse(0, -si * 0.1, si*0.2, si*0.3);
      stroke(COLOURS[s]);
      strokeWeight(2);
      line(-si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(-si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
    break;
    // Strong Drone
    case 3:
      var sf = sin(time / 2);
      var cf = cos(time / 2);
      var sfs = sin(time / 4);
      var cfs = cos(time / 4);
      stroke(100);
      strokeWeight(6);
      line(-si*0.25, -si*0.25, si*0.25, si*0.25);
      line(si*0.25, -si*0.25, -si*0.25, si*0.25);
      noStroke();
      fill(60);
      rect(0, 0, si * 0.25, si * 0.5, 50);
      ellipse(0, -si*0.03, si * 0.4, si * 0.45);
      fill(COLOURS[s], 150);
      ellipse(0, -si * 0.1, si*0.2, si*0.3);
      stroke(COLOURS[s]);
      strokeWeight(3);
      line(-si*(0.25 + 0.15*sf), -si*(0.25 + 0.125*cf), -si*(0.25 - 0.125*sf), -si*(0.25 - 0.125*cf));
      line(si*(0.25 + 0.125*sf), -si*(0.25 + 0.125*cf), si*(0.25 - 0.125*sf), -si*(0.25 - 0.125*cf));
      line(-si*(0.25 + 0.125*sf), si*(0.25 + 0.125*cf), -si*(0.25 - 0.125*sf), si*(0.25 - 0.125*cf));
      line(si*(0.25 + 0.125*sf), si*(0.25 + 0.125*cf), si*(0.25 - 0.125*sf), si*(0.25 - 0.125*cf));
      stroke(lerpColor(COLOURS[s], 255, 0.6));
      strokeWeight(4);
      line(si*0.25*sfs, si*0.25*cfs, -si*0.25*sfs, -si*0.25*cfs);
    break;
    // Large Drone
    case 4:
      var sf = sin(time / 6);
      var cf = cos(time / 6);
      noStroke();
      fill(COLOURS[s]);
      ellipse(0, si*0.05, si*0.5, si*0.7);
      ellipse(0, -si*0.05, si*0.6, si*0.6);
      ellipse(-si*0.2, -si*0.2, 10, 10);
      ellipse(si*0.2, -si*0.2, 10, 10);
      fill(lerpColor(COLOURS[s], 0, 0.2));
      ellipse(0, si*0.15, si*0.4, si*0.5);
      ellipse(-si*0.11, -si*0.05, si*0.3, si*0.5);
      ellipse(-si*0.2, -si*0.2, 10, 10);
      fill(255, 100);
      arc(si*0.2, -si*0.2, 10, 10, -PI/2, PI/4);
      stroke(0);
      strokeWeight(4);
      line(-si*0.5*sf, si*0.5*cf, si*0.5*sf, -si*0.5*cf);
      line(si*0.5*cf, si*0.5*sf, -si*0.5*cf, -si*0.5*sf);
    break;
    // Really weak drone
    case 5:
      var sf = sin(time / 2);
      var cf = cos(time / 2);
      stroke(lerpColor(COLOURS[s], 255, 0.6));
      strokeWeight(4);
      line(-si*0.25, -si*0.25, si*0.25, si*0.25);
      line(si*0.25, -si*0.25, -si*0.25, si*0.25);
      noStroke();
      fill(lerpColor(COLOURS[s], 255, 0.6));
      rect(0, 0, si * 0.25, si * 0.5, 50);
      fill(lerpColor(COLOURS[s], 255, 0.4));
      ellipse(0, 0, si*0.2, si*0.3);
      stroke(lerpColor(COLOURS[s], 0, 0.5));
      strokeWeight(2);
      line(-si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), -si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), -si*(0.25 - 0.15*cf));
      line(-si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), -si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
      line(si*(0.25 + 0.15*sf), si*(0.25 + 0.15*cf), si*(0.25 - 0.15*sf), si*(0.25 - 0.15*cf));
    break;
    // Plane
    case 6:
      var sf = sin(time / 3);
      noStroke();
      fill(lerpColor(COLOURS[s], 255, 0.25));
      rect(0, -si*0.43, si*0.4, si*0.15, 50);
      rect(0, 0, si, si*0.2, 50);
      fill(COLOURS[s]);
      ellipse(0, si*0.45, si*0.25, si*0.25);
      quad(-si*0.125, si*0.45, si*0.125, si*0.45, si*0.075, -si*0.45, -si*0.05, -si*0.45);
      stroke(0, 50);
      strokeWeight(1);
      line(si*0.125, si*0.45, si*0.075, -si*0.45);
      line(-si*0.125, si*0.45, -si*0.05, -si*0.45);
      stroke(80);
      strokeWeight(3);
      line(0.2*si*sf, si*0.58, -0.2*si*sf, si*0.58);
    break;
    // Bomber
    case 7:
      var sf = sin(time / 3);
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.65));
      rect(0, -si*0.43, si*0.4, si*0.15, 50);
      rect(0, 0, si, si*0.2, 50);
      fill(lerpColor(COLOURS[s], 0, 0.45));
      ellipse(0, si*0.45, si*0.25, si*0.25);
      quad(-si*0.125, si*0.45, si*0.125, si*0.45, si*0.075, -si*0.45, -si*0.05, -si*0.45);
      stroke(0, 50);
      strokeWeight(1);
      line(si*0.125, si*0.45, si*0.075, -si*0.45);
      line(-si*0.125, si*0.45, -si*0.05, -si*0.45);
      stroke(COLOURS[s]);
      strokeWeight(3);
      line(0.2*si*sf, si*0.58, -0.2*si*sf, si*0.58);
    break;
    // Blimp
    case 8:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.5));
      quad(0, -si*0.3, -si*0.5, -si*0.6, -si*0.5, -si*0.9, 0, -si*0.75);
      quad(0, -si*0.3, si*0.5, -si*0.6, si*0.5, -si*0.9, 0, -si*0.75);
      stroke(100);
      strokeWeight(1);
      fill(lerpColor(COLOURS[s], 0, 0.1));
      ellipse(0, 0, si, si*1.7);
      fill(COLOURS[s]);
      ellipse(0, 0, si*0.6, si*1.7);
      line(0, -si*0.85, 0, si*0.85);
      noStroke();
      fill(255, 30);
      ellipse(si*0.075, si*0.1, si*0.85, si*1.4);
    break;
    // Base
    case 9:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.2));
      ellipse(0, 0, si, si);
      fill(COLOURS[s]);
      ellipse(-si*0.04, -si*0.04, si*0.9, si*0.9);
      fill(lerpColor(COLOURS[s], 0, 0.1));
      ellipse(0, 0, si*0.6, si*0.6);
      fill(0, 50);
      rect(0, 0, si*0.4, si*0.4);
      fill(127);
      rect(0, si*0.3, si*0.2, si*0.6);
      fill(100);
      triangle(si*0.1, 0, si*0.05, si*0.6, si*0.1, si*0.6);
      triangle(-si*0.1, 0, -si*0.05, si*0.6, -si*0.1, si*0.6);
    break;
    // Tank
    case 10:
      noStroke();
      fill(COLOURS[s]);
      rect(0, 0, si*0.7, si*0.8, 10);
      fill(lerpColor(COLOURS[s], 0, 0.2));
      rect(-si*0.4, 0, si*0.15, si, 10);
      rect(si*0.4, 0, si*0.15, si, 10);
      ellipse(0, 0, si*0.5, si*0.5);
      fill(lerpColor(COLOURS[s], 0, 0.1));
      ellipse(si*0.02, si*0.05, si*0.4, si*0.4);
      rect(0, si*0.4, si*0.15, si*0.4, 50);
    break;
    // Strong Tank
    case 11:
      noStroke();
      fill(100);
      rect(0, 0, si*0.6, si*0.8, 10);
      fill(lerpColor(COLOURS[s], 100, 0.5));
      rect(-si*0.35, 0, si*0.15, si, 10);
      rect(si*0.35, 0, si*0.15, si, 10);
      ellipse(0, 0, si*0.5, si*0.5);
      fill(lerpColor(COLOURS[s], 0, 0.7));
      rect(0, si*0.4, si*0.15, si*0.4, 50);
      fill(lerpColor(COLOURS[s], 100, 0.2));
      ellipse(si*0.02, si*0.05, si*0.4, si*0.4);
      fill(lerpColor(COLOURS[s], 100, random(0.2)));
      ellipse(0, 0, si*0.3, si*0.3);
    break;
    // Large range
    case 12:
      noStroke();
      fill(COLOURS[s]);
      rect(0, 0, si*0.6, si*0.8, 10);
      fill(lerpColor(COLOURS[s], 0, 0.5));
      rect(-si*0.35, 0, si*0.15, si*0.9, 10);
      rect(si*0.35, 0, si*0.15, si*0.9, 10);
      fill(90);
      ellipse(0, 0, si*0.5, si*0.5);
      fill(100);
      rect(0, si*0.4, si*0.2, si*0.4, 50);
      ellipse(si*0.02, si*0.05, si*0.4, si*0.4);
    break;
    // Mine layer
    case 13:
      noStroke();
      fill(COLOURS[s]);
      rect(0, 0, si*0.6, si*0.8, 10);
      fill(lerpColor(COLOURS[s], 0, 0.5));
      rect(-si*0.35, 0, si*0.15, si*0.9, 10);
      rect(si*0.35, 0, si*0.15, si*0.9, 10);
      fill(255, 100);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.4*sin(PI*i/3), si*0.4*cos(PI*i/3));
      }
      endShape();
      fill(lerpColor(COLOURS[s], 0, 0.3));
      ellipse(0, 0, si*0.5, si*0.5);
      fill(lerpColor(COLOURS[s], 0, 0.2));
      rect(0, si*0.4, si*0.2, si*0.4, 50);
      ellipse(si*0.02, si*0.05, si*0.4, si*0.4);
    break;
    // Bomb tosser
    case 14:
      noStroke();
      fill(0);
      rect(0, 0, si*0.6, si*0.8, 10);
      fill(lerpColor(COLOURS[s], 0, 0.5));
      rect(-si*0.35, 0, si*0.15, si*0.9, 10);
      rect(si*0.35, 0, si*0.15, si*0.9, 10);
      fill(lerpColor(COLOURS[s], 0, 0.5));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.3*sin(PI*i/3), si*0.3*cos(PI*i/3));
      }
      endShape();
      fill(lerpColor(COLOURS[s], 0, 0.4));
      rect(0, si*0.4, si*0.2, si*0.4, 50);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*(0.27*sin(PI*i/3)+0.03), si*(0.27*cos(PI*i/3)+0.04));
      }
      endShape();
    break;
    // Flames
    case 15:
      noStroke();
      fill(COLOURS[s]);
      rect(0, 0, si*0.6, si*0.8, 10);
      fill(0);
      rect(-si*0.35, 0, si*0.15, si*0.9, 10);
      rect(si*0.35, 0, si*0.15, si*0.9, 10);
      fill(lerpColor(COLOURS[s], 0, 0.4));
      ellipse(0, 0, si * 0.7, si * 0.7);
      rect(0, si*0.4, si*0.3, si*0.4, 50);
      fill(lerpColor(COLOURS[s], 255, 0.1 + 0.1 * sin(time / 10)));
      triangle(0, si*0.2, -si*0.15, -si*0.1, si*0.15, -si*0.1);
    break;
    // Turret
    case 16:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.7));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape();
      fill(lerpColor(COLOURS[s], 0, 0.1));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.4*sin(PI*i/3), si*0.4*cos(PI*i/3));
      }
      endShape();
      fill(COLOURS[s]);
      rect(0, si*0.5, si*0.25, si*0.5, 50);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*(0.35*sin(PI*i/3)+0.03), si*(0.35*cos(PI*i/3)+0.08));
      }
      endShape();
    break;
    // Fast turret
    case 17:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.2));
      ellipse(0, 0, si, si);
      fill(lerpColor(COLOURS[s], 90, 0.8));
      ellipse(0, 0, 0.8 * si, 0.8 * si);
      fill(lerpColor(COLOURS[s], 100, 0.8));
      rect(0, si*0.5, si*0.25, si*0.5);
      ellipse(si * 0.03, si * 0.08, si * 0.7, si * 0.7);
    break;
    // Healer
    case 18:
      noStroke();
      fill(COLOURS[s]);
      ellipse(0, 0, si, si);
      fill(lerpColor(COLOURS[s], 220, 0.7));
      ellipse(0, 0, 0.8 * si, 0.8 * si);
      fill(lerpColor(COLOURS[s], 255, 0.7));
      ellipse(si * 0.02, si * 0.05, si * 0.7, si * 0.7);
      pushMatrix();
        rotate(time / 70);
        fill(0xffff0000);
        rect(0, 0, si * 0.125, si * 0.45);
        rect(0, 0, si * 0.45, si * 0.125);
      popMatrix();
    break;
    // Bomb turret
    case 19:
      noStroke();
      fill(lerpColor(COLOURS[s], 255, 0.1));
      ellipse(0, 0, si, si);
      fill(lerpColor(COLOURS[s], 0, 0.8));
      ellipse(0, 0, 0.8 * si, 0.8 * si);
      fill(lerpColor(COLOURS[s], 40, 0.8));
      rect(0, si*0.5, si*0.25, si*0.5, 50);
      ellipse(si * 0.03, si * 0.05, si * 0.7, si * 0.7);
      pushMatrix();
        rotate(time / 50);
        fill(0xff0000 + 0x1000000*round(0xff*(sin(0.1*time)*0.1 + 0.5)));
        rect(0, 0, si * 0.25, si * 0.25);
      popMatrix();
    break;
    // Flame Turret
    case 20:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.1));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape();
      fill(125);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.4*sin(PI*i/3), si*0.4*cos(PI*i/3));
      }
      endShape();
      fill(150);
      rect(0, si*0.45, si*0.3, si*0.45, 50);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*(0.35*sin(PI*i/3)+0.02), si*(0.35*cos(PI*i/3)+0.05));
      }
      endShape();
    break;
    // Wall 1
    case 21:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.1));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape();
      fill(COLOURS[s]);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*(0.45*sin(PI*i/3)+0.03), si*(0.43*cos(PI*i/3)-0.06));
      }
      endShape();
      stroke(lerpColor(COLOURS[s], 0, 0.4));
      strokeWeight(2);
      line(0, 0, si*0.4, si*0.2);
      line(0, 0,-si*0.4, si*0.2);
      line(0, 0, 0, -si*0.45);
    break;
    // Wall 2
    case 22:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.6));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape();
      fill(lerpColor(COLOURS[s], 0, 0.45));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*(0.45*sin(PI*i/3)+0.03), si*(0.43*cos(PI*i/3)-0.06));
      }
      endShape();
      stroke(lerpColor(COLOURS[s], 255, 0.2));
      strokeWeight(2);
      line(0, 0, si*0.4, si*0.2);
      line(0, 0,-si*0.4, si*0.2);
      line(0, 0, 0, -si*0.45);
    break;
    // Wall 3
    case 23:
      noStroke();
      fill(lerpColor(COLOURS[s], 0, 0.7));
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape();
      for(var i = 0; i < 10; i++){
        fill(lerpColor(COLOURS[s], 0, (9 - i)/14));
        ellipse(0, 0, (0.8 - 0.08*i)*si, (0.8 - 0.08*i)*si);
      }
    break;
    // Wall 4
    case 24:
      fill(lerpColor(COLOURS[s], 0, 0.5));
      stroke(127);
      strokeWeight(2.5);
      beginShape();
      for(var i = 0; i < 6; i++){
        vertex(si*0.5*sin(PI*i/3), si*0.5*cos(PI*i/3));
      }
      endShape(CLOSE);
      noStroke();
      for(var i = 0; i < 10; i++){
        fill(lerpColor(COLOURS[s], 0, (9 - i)/20));
        ellipse(0.02*i*si, -0.015*i*si, (0.8 - 0.08*i)*si, (0.8 - 0.08*i)*si);
      }
    break;
  }
}
function shop(){
  // Assumes that the shop is not transitioning
  moving = false;
  if(selected[0] !== selected[1]){
    // Corrects the assumption if the shop is.
    if(selected[2] < 1){
      // Transitions further
      selected[2] += 0.02;
      moving = true;
    }else{
      // Stops transitioning when at end.
      selected[0] = selected[1];
      selected[2] = 0;
    }
  }
  
  // Shop backdrop
  fill(255, 175);
  rect(300, 550, 600, 100);
  
  // Checks if the mouse is hovering over the buttons to change the section of the shop
  // If yes, the button is highlighted and the cursor is changed
  if(button(50, 575, 50, 50)){
    fill(190);
    rect(50, 575, 50, 50);
    cs = "pointer";
  }else if(button(150, 575, 50, 50)){
    fill(190);
    rect(150, 575, 50, 50);
    cs = "pointer";
  }else if(button(450, 575, 50, 50)){
    fill(190);
    rect(450, 575, 50, 50);
    cs = "pointer";
  }else if(button(550, 575, 50, 50)){
    fill(190);
    rect(550, 575, 50, 50);
    cs = "pointer";
  }
  
  // Draws the drone, tank, turret, and wall.
  pushMatrix();
    translate(50, 577);
    rotate(PI);
    graphics(7, 37, frameCount, 0);
  popMatrix();
  pushMatrix();
    translate(150, 577);
    rotate(PI);
    graphics(13, 37, frameCount, 0);
  popMatrix();
  pushMatrix();
    translate(450, 577);
    rotate(PI);
    graphics(20, 37, frameCount, 0);
  popMatrix();
  pushMatrix();
    translate(550, 577);
    graphics(23, 37, frameCount, 0);
  popMatrix();
  
  // Displays the money
  fill(50);
  textSize(25);
  text("Money: " + ~~money, 300, 575);
  
  // Finds which items are on display
  var stuff = ORDER[floor(selected[0])];
  for(var i = 0; i < stuff.length; i++){
    // Finds where to display each item
    var x = 300+(i+0.5-0.5*stuff.length)*560/stuff.length;
    // Changes accordingly if the items are in motion
    if(moving){
      x -= smoothstep(selected[2])*600;
    }
    
    // Highlight green if item affordable
    noStroke();
    fill(PRICES[stuff[i]] <= money ? 0x2500ff00 : 0x25ff0000);
    
    // blue outline if selected
    if(selected[3] === stuff[i]){
      stroke(0x250000ff);
      strokeWeight(2);
    }
    rect(x, 525, 50, 50);
    
    // Change cursor and colour on hover. also show price tag
    if(!moving && button(x, 525, 50, 50)){
      fill(190);
      rect(x, 525, 50, 50);
      fill(255, 175);
      rect(x, 485, 60, 18);
      fill(0);
      textSize(15);
      text(PRICES[stuff[i]], x, 485);
      cs = "pointer";
    }
    
    // draw the shop item
    pushMatrix();
      translate(x, 525);
      rotate(PI);
      graphics(stuff[i], 37-13*(stuff[i]===8), frameCount, 0);
    popMatrix();
  }
  
  // If shop items are transitioning
  if(moving){
    // Find what the shop is changing to.
    var stuff = ORDER[floor(selected[1])];
    for(var i = 0; i < stuff.length; i++){
      // calculate x position
      var x = 900+(i+0.5-0.5*stuff.length)*560/stuff.length;
      x -= smoothstep(selected[2])*600;
      
      // display it
      noStroke();
      fill(PRICES[stuff[i]]<money ? 0x2500ff00 : 0x25ff0000);
      rect(x, 525, 50, 50);
      pushMatrix();
        translate(x, 525);
        rotate(PI);
        graphics(stuff[i], 37-13*(stuff[i]===8), frameCount, 0);
      popMatrix();
    }
  }
}

// game functions
function findMoney(s){
  // find the total worth of everything on battlefield (for one side)
  var tot = 0;
  for(var i = 0; i < lengthC(s); i++){
    tot += PRICES[characters[s][i * C_AMOUNT + 2]];
  }
  return tot;
}
function enemy(){
  // Calculate if enemy should make a character
  
  // if a bunch of conditionals are met
  if((findMoney(0)>findMoney(1)&&random()<0.0025)||characters[1][5] < random(-1e6, 1e3)){
    // randomly choose what to place (biased towards weaker objects)
    var type = chances[floor(random(chances.length))];
    
    // Calc Random spot
    var x = ~~random(1, 15);
    var y = ~~random(-1, -15);
    x = x*40+20*(y%2);
    y = y*40;
    
    // Prevent from placing if too close to another object (no stacking turrets/walls)
    for(var i = 0; i < lengthC(1); i++){
      if(pdist(characters[1][i * C_AMOUNT], characters[1][i * C_AMOUNT + 1], x, y) < 4){
        return 0;
      }
    }
    
    // create enemy character
    newC(x, y, type, 1);
  }
}

// scene functions
function game(){
  // Run the game
  pushMatrix();
    // translate y
    var ty = smoothstep(700 - (constrain(mouseY, 50, 500) - 50)*14/9, 0, 700) - 100;
    translate(0, ty);
    
    // backdrop is enemy colour
    background(lerpColor(COLOURS[1], 200, 0.9));
    
    // Add blue section of map
    noStroke();
    fill(lerpColor(COLOURS[0], 200, 0.9));
    rect(300, 350, 600, 700);
    
    // If it is possible to place
    if(selected[3] > -1 && mouseY < 500 && mouseY > 250 && PRICES[selected[3]] <= money){
      // calculate tile that mouse is over
      var tile = getHex(mouseY - ty, mouseX);
      
      // If the tile is available
      if(tile[1] < 15 && tile[1] > 0 && tile[0] > 0 && tile[0] < 30){
        var skip = false;
        
        // Make sure there is nothing already on tile
        for(var i = 0; i < lengthC(0); i++){
          if(pdist(characters[0][i * C_AMOUNT], characters[0][i * C_AMOUNT + 1], 20*tile[0], 40*tile[1]) < 4){
            skip = true;
          }
        }
        
        if(!skip){
          // highlight tile
          fill(255, 150);
          noStroke();
          beginShape();
          for(var i = 0; i < 6; i++){
            vertex(20*tile[0]+25*sin(PI*i/3),40*tile[1]+25*cos(PI*i/3));
          }
          endShape();
          
          // change cursor
          cs = "cell";
        }
      }
    }
    // run bullets and drones
    runAll();
  popMatrix();
  shop();
  enemy();
  money += 0.05;
}
function win(){
  // display win scene
  fill(0x20aaffaa);
  noStroke();
  rect(300, 300, 600, 600);
  fill(0, 50);
  textSize(1);
  textSize(150 / textWidth("You win!"));
  text("Congratulations, ", 300, 230);
  textSize(1);
  textSize(400 / textWidth("You win!"));
  text("You win!", 300, 340);
  rect(300, 410, 450, 10);
}
function lose(){
  // display lose scene
  fill(0x20ffaaaa);
  noStroke();
  rect(300, 300, 600, 600);
  fill(0, 50);
  textSize(1);
  textSize(350 / textWidth("You win!"));
  text("You Lost.", 300, 240);
  rect(300, 310, 450, 10);
  textSize(1);
  textSize(100 / textWidth("You win!"));
  text("At least you got second place.\n(out of two)",300,370);
}
function home(){
  // displays home screen
  background(lerpColor(COLOURS[0], 127, 0.4));
  noStroke();
  
  // title
  fill(0);
  textSize(1);
  textSize(350 / textWidth("You win!"));
  text("Drones", 300, 140);
  rect(300, 205, 380, 10);
  
  // buttons
  textAlign(LEFT, CENTER);
  textSize(1);
  textSize(200 / textWidth("You win!"));
  text("Play", 90, 300);
  rect(155, 345, 140, 7);
  text("How", 90, 400);
  rect(155, 445, 140, 7);
  text("Drones", 90, 500);
  rect(195, 545, 220, 7);
  textAlign(CENTER, CENTER);
  
  // Tank
  pushMatrix();
    translate(460, 320);
    rotate(PI / 4);
    graphics(13, 130, frameCount, 1);
  popMatrix();
  // Blimp
  pushMatrix();
    translate(490, 490);
    rotate(7 * PI / 8);
    graphics(8, 100, frameCount, 0);
  popMatrix();
  
  // If hover above button change cursor
  if(button(155, 300, 140, 100)||
     button(155, 400, 140, 100)||
     button(195, 500, 220, 100)){
    cs = "pointer";
  }
}
function how(){
  // how page
  background(lerpColor(COLOURS[0], 127, 0.4));
  
  // Title
  noStroke();
  fill(0);
  textSize(1);
  textSize(300 / textWidth("You win!"));
  text("How", 300, 60);
  rect(300, 115, 240, 10);
  
  // Back button
  textSize(1);
  textSize(200 / textWidth("You win!"));
  text("Back", 300, 520);
  rect(300, 565, 160, 7);
  
  // Display Game info
  textSize(1);
  textSize(110 / textWidth("You win!"));
  text("\nMove your mouse up and\ndown to navigate the map.\nThe shop is on the\nbottom of the screen.\nClick an item to select it.\nThen click the map to\nplace the item.", 300, 300);
  
  // Display turret
  pushMatrix();
    translate(500, 80);
    rotate(1.1);
    graphics(20, 130, frameCount, 1);
  popMatrix();
  
  // Change cursor on button hover
  if(button(300, 520, 160, 100)){
    cs = "pointer";
  }
}
function drones(){
  // Displays the drone list page
  background(lerpColor(COLOURS[0], 127, 0.4));
  
  // Find which slide it is on
  var d = slideshow[0];
  if(slideshow[1] > 0){
    slideshow[1] -= 0.025;
    if(slideshow[1] > 0.5){
      d = slideshow[2];
    }
  }
  
  // Find which order the objects are drawn
  if(d < ORDER[0].length){
    d = ORDER[0][d];
  }else if(d < ORDER[0].length + ORDER[1].length){
    d = ORDER[1][d - ORDER[0].length];
  }else if(d < ORDER[0].length + ORDER[1].length + ORDER[2].length){
    d = ORDER[2][d - ORDER[0].length - ORDER[1].length];
  }else{
    d = ORDER[3][d - ORDER[0].length - ORDER[1].length - ORDER[2].length];
  }
  
  // Title
  noStroke();
  fill(0);
  textSize(1);
  textSize(225 / textWidth("You win!"));
  text("Drones", 300, 60);
  rect(300, 105, 240, 10);
  
  // Back button
  textSize(1);
  textSize(200 / textWidth("You win!"));
  text("Back", 300, 520);
  rect(300, 565, 160, 7);
  
  // Price &info of drone
  textAlign(CENTER, TOP);
  textSize(1);
  textSize(70 / textWidth("You win!"));
  text("$" + PRICES[d] + "\n" + DESCRIPTION[d], 300, 360);
  
  // name
  textAlign(CENTER, CENTER);
  textSize(1);
  textSize(90 / textWidth("You win!"));
  text(NAMES[d], 300, 150);
  
  // Back button
  textSize(1);
  textSize(250 / textWidth("You win!"));
  text("«", 125, 300);
  
  // Forward button
  textSize(1);
  textSize(250 / textWidth("You win!"));
  text("»", 475, 300);
  
  // Display current drone
  pushMatrix();
    translate(300, 250);
    rotate(frameCount / 50);
    scale((130 / INFO[d].sx) / (d === 8 ? 2 : 1));
    graphics(d, INFO[d].sx, frameCount, 0);
  popMatrix();
  
  // Show black transition when necessary
  if(slideshow[1] > 0){
    noStroke();
    fill(0, 255 * smoothstep(2*(0.5 - abs(slideshow[1]-0.5))));
    rect(300, 300, 600, 600);
  }
  
  // Button hov cursor change
  if(button(300, 520, 160, 100) ||
     button(125, 300, 100, 100) ||
     button(475, 300, 100, 100)){
    cs = "pointer";
  }
}

// creation functions (objects)
function newC(x, y, t, s, vx, vy){
  // creates new drone
  characters[s].push(
    x,                    // x position
    y,                    // y position
    t,                    // type
    vx || random(-1,1),   // x velocity
    vy || random(-1,1),   // y velocity
    0,                    // health
    0,                    // time
    0,                    // reload time
    INFO[t].hp            // health
  );
}
function newB(x, y, vx, vy, t, s){
  // creates new bullet
  bullets[s].push(
    x,                    // x position
    y,                    // y position
    t,                    //type
    vx * B_INFO[t].s,     // x velocity
    vy * B_INFO[t].s,     // y velocity
    0                     // time
  );
}

// Helper functions (objects)
function lengthC(s){
  // finds how many drones there are
  return characters[s].length / C_AMOUNT;
}
function lengthB(s){
  // finds how many bullets there are
  return bullets[s].length / B_AMOUNT;
}

// Display functions (objects)
function drawC(which, s){
  // draws all the characters
  
  // Drone type
  var t = characters[s][which * C_AMOUNT + 2];
  
  // Drone size
  var si= INFO[t].sx;
  
  // Drone time
  var time = characters[s][which * C_AMOUNT + 6];
  
  // Draw
  pushMatrix();
    translate(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1]);
    if(t < 21 && t !== 18){
      rotate(atan2(characters[s][which * C_AMOUNT + 3], characters[s][which * C_AMOUNT + 4]));
    }
    // Call graphics
    graphics(t, si, time, s);
    
    // Create cracks in walls
    if(t >= 21){
      if(characters[s][which * C_AMOUNT + 8] / INFO[characters[s][which * C_AMOUNT + 2]].hp < 0.66){
        // Some cracks
        stroke(0);
        strokeWeight(1);
        line(si*0.1, -si*0.2, si*0.43, -si*0.16);
        line(si*0.3, -si*0.18, si*0.2, 0);
        line(-si*0.05, si*0.15, -si*0.22, si*0.35);
        line(-si*0.14, si*0.25, si*0.1, si*0.22);
        if(characters[s][which * C_AMOUNT + 8] / INFO[characters[s][which * C_AMOUNT + 2]].hp < 0.33){
          // Lots of cracks
          line(-si*0.2, -si*0.05,-si*0.4, -si*0.2);
          line(-si*0.3, -si*0.12, -si*0.1, -si*0.3);
          line(-si*0.02, si*0.235, si*0.05, si*0.3);
          line(-si*0.2, si*0.34, -si*0.3, si*0.19);
          line(si*0.25, -si*0.09, 0, -si*0.05);
        }
      }
    }
  popMatrix();
}
function drawB(which, s){
  // Draws all the bullets
  pushMatrix();
    translate(bullets[s][which * B_AMOUNT], bullets[s][which * B_AMOUNT + 1]);
    var size = B_INFO[bullets[s][which * B_AMOUNT + 2]].z;
    fill(0);
    noStroke();
    switch(bullets[s][which * B_AMOUNT + 2]){
      case 0: case 1: case 3: case 6: case 7: case 9: case 15:
        fill(COLOURS[s]);
        ellipse(0, 0, size, size);
      break;
      case 2: case 16:
        fill(COLOURS[s]);
        rotate(atan2(bullets[s][which * B_AMOUNT + 3], -bullets[s][which * B_AMOUNT + 4]));
        rect(0, 0, 5, 8, 3);
      break;
      case 4: case 10:
        fill(lerpColor(COLOURS[s], 127, 0.6));
        ellipse(0, 0, size, size);
      break;
      case 5: case 11: case 17:
        fill(0);
        ellipse(0, 0, size, size);
      break;
      case 8:
        var sc = 1 - bullets[s][which * B_AMOUNT + 5] / (B_INFO[bullets[s][which * B_AMOUNT + 2]].r / B_INFO[bullets[s][which * B_AMOUNT + 2]].s);
        fill(0x90ff9000);
        ellipse(0, 0, 10 * size * sc, 10 * size * sc);
      break;
      case 12:
        fill(0x90ff9000);
        ellipse(0, 0, size, size);
      break;
      case 13:
        pushMatrix();
          rotate(bullets[s][which * B_AMOUNT + 4] * 5 + bullets[s][which * B_AMOUNT + 5] / 10);
          fill(0x90ff9000);
          rect(0, 0, size, size);
        popMatrix();
      break;
      case 14:
        fill(0);
        ellipse(0, 0, size, size);
        fill(COLOURS[s]);
        ellipse(0, 0, size * 0.6, size * 0.6);
      break;
    }
  popMatrix();
}
function drawH(which, s){
  // Draws health bars
  
  // Type of drone
  var t = characters[s][which * C_AMOUNT + 2];
  
  // size
  var si= INFO[t].sx;
  
  // draw
  fill(255, 100);
  rect(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1] - si * 0.6, si * 0.9, si * 0.1, 10);
  fill(0x50ff0000);
  noStroke();
  rect(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1] - si * 0.6, si * 0.9 * characters[s][which * C_AMOUNT + 8] / INFO[t].hp, si * 0.1, 10);
}

// runtime functions (objects)
function runC(which, s){
  // runs character
  
  // draw self
  drawC(which, s);
  
  // character speed
  var sp = INFO[characters[s][which * C_AMOUNT + 2]].sp;
  
  // can shoot?
  var sh = false;
  
  // Which way to face
  var turn = 0;
  
  if(lengthC(1 - s) && [13, 18, 21, 22, 23, 24].indexOf(characters[s][which * C_AMOUNT + 2]) < 0){
    // closest enemy dron id
    var ci = 0;
    // distance to it
    var cd = Infinity;
    
    // loop through enemies to find the above
    for(var i = 0; i < lengthC(1 - s); i++){
      var d = dist(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1], characters[1 - s][i * C_AMOUNT], characters[1 - s][i * C_AMOUNT + 1]);
      if(d < cd){
        cd = d;
        ci = i;
      }
    }
    
    // If enemy close enough
    if(cd < 400 || characters[s][which * C_AMOUNT + 2] === 9){
      // go to enemy
      
      // accelerate x
      var ax = characters[s][which * C_AMOUNT] - characters[1-s][ci * C_AMOUNT];
      // accelerate y
      var ay = characters[1 - s][ci * C_AMOUNT + 1] - characters[s][which * C_AMOUNT + 1];
      // accelerate magnitude (for normalizing)
      var ad = dist(0, 0, ax, ay);
      // Normalize acceleration vector
      characters[s][which * C_AMOUNT + 3] += 0.03 * (ax / ad);
      characters[s][which * C_AMOUNT + 4] += 0.03 * (ay / ad);
      
      // If enemy in range
      if(cd < B_INFO[INFO[characters[s][which * C_AMOUNT + 2]].bt].r){
        // can shoot
        sh = true;
        if([2, 5, 6, 7, 13].indexOf(characters[s][which * C_AMOUNT + 2]) < 0){
          // stop moving for some types of drones
          sp = 0;
        }
      }
    }else{
      // if not close enough
      // slowly turn to center
      
      // accelerate x
      var ax = characters[s][which * C_AMOUNT] - 300;
      // accelerate y
      var ay = -characters[s][which * C_AMOUNT + 1];
      // accelerate magnitude
      var ad = dist(0, 0, ax, ay);
      // normalize acceleration
      characters[s][which * C_AMOUNT + 3] += 0.004 * (ax / ad);
      characters[s][which * C_AMOUNT + 4] += 0.004 * (ay / ad) + 0.002*(s - 0.5);
      
      // If enemy in range
      if(cd < B_INFO[INFO[characters[s][which * C_AMOUNT + 2]].bt].r){
        // can shoot
        sh = true;
        if([2, 6, 7].indexOf(characters[s][which * C_AMOUNT + 2]) < 0){
          // stop moving for some types of drones
          sp = 0;
        }
      }
    }
  }else if(13 === characters[s][which * C_AMOUNT + 2]){
    // Mine-layers continually make mines
    sh = true;
  }else if(18 === characters[s][which * C_AMOUNT + 2]){
    // healers check for drones on same side
    for(var i = 0; i < lengthC(s); i++){
      // if object close enough
      if(pdist(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1], characters[s][i * C_AMOUNT], characters[s][i * C_AMOUNT + 1]) < 10000){
        // slowly regenerate it.
        characters[s][i * C_AMOUNT + 8] = min(characters[s][i * C_AMOUNT + 8] + 0.0045, INFO[characters[s][i * C_AMOUNT + 2]].hp);
      }
    }
  }
  
  // For swarm drones only
  if(characters[s][which * C_AMOUNT + 2] === 2){
    // boids algorithm
    // www.red3d.com/cwr/boids/
    
    // sum values of velocity & position
    var sumxv = 0;
    var sumyv = 0;
    var sumx = 0;
    var sumy = 0;
    // Number of nearby swarm drones checked
    var checks = 0;
    // find closest swarm drone id
    var closest = 0;
    // find distance to it
    var cldis = Infinity;
    
    // Ceck for other swarm drones
    for(var i = 0; i < lengthC(s); i++){
      // distance to it
      var d = pdist(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1], characters[s][i * C_AMOUNT], characters[s][i * C_AMOUNT + 1]);
      if(characters[s][i * C_AMOUNT + 2] === 2 && d < 25000){
        // add to sums
        sumxv += characters[s][i * C_AMOUNT + 3];
        sumyv += characters[s][i * C_AMOUNT + 4];
        
        sumx += characters[s][i * C_AMOUNT];
        sumy += characters[s][i * C_AMOUNT + 1];
        
        // increment check count
        checks ++;
        
        // update closest drone
        if(d < cldis && d > 0){
          closest = i;
          cldis = d;
        }
      }
    }
    
    // find average position
    sumx /= checks;
    sumy /= checks;
    
    // find magnitude of sumaverage velocities of swarm drones
    var ad = dist(0, 0, sumxv, sumyv);
    // normalize velocity and add to drone vel
    characters[s][which * C_AMOUNT + 3] += 0.05 * (sumxv / ad);
    characters[s][which * C_AMOUNT + 4] += 0.05 * (sumyv / ad);
    
    // If there is at least one swarm drone in sight
    if(cldis < Infinity){
      // acceleration vars
      var ax, ay;
      if(cldis < 800){
        // If too close to another turn away from drone
        ax = characters[s][closest * C_AMOUNT] - characters[s][which * C_AMOUNT];
        ay = characters[s][which * C_AMOUNT + 1] - characters[s][closest * C_AMOUNT + 1];
      }else{
        // Otherwise try going to average position of swarm drones
        ax = characters[s][which * C_AMOUNT] - sumx;
        ay = sumy - characters[s][which * C_AMOUNT + 1];
      }
      // normalize acceleration
      ad = dist(0, 0, ax, ay);
      characters[s][which * C_AMOUNT + 3] += 0.04 * (ax / ad);
      characters[s][which * C_AMOUNT + 4] += 0.04 * (ay / ad);
    }
  }
  
  // Avoid walls
  if(sp && (characters[s][which * C_AMOUNT + 1] + 50 * characters[s][which * C_AMOUNT + 4] + 30 > height || characters[s][which * C_AMOUNT] - 50 * characters[s][which * C_AMOUNT + 3] + 30 > width || characters[s][which * C_AMOUNT] - 50 * characters[s][which * C_AMOUNT + 3] - 30 < 0 || characters[s][which * C_AMOUNT + 1] + 50 * characters[s][which * C_AMOUNT + 4] - 30 < -600)){
    turn = 0.1;
  }
  
  // If moving randomize angle slightly
  if(sp){
    turn += random(-0.02, 0.02);
  }
  
  // If wall don't shoot
  if(no_shoot.indexOf(characters[s][which * C_AMOUNT + 2])>=0){
    sh = false;
  }
  
  // add random turn var
  var co = cos(turn);
  var si = sin(turn);
  var tv = characters[s][which * C_AMOUNT + 3] * co - characters[s][which * C_AMOUNT + 4] * si;
  characters[s][which * C_AMOUNT + 4] = characters[s][which * C_AMOUNT + 4] * co + characters[s][which * C_AMOUNT + 3] * si;
  characters[s][which * C_AMOUNT + 3] = tv;
  
  // normalize velocity
  var d = dist(0, 0, characters[s][which * C_AMOUNT + 3], characters[s][which * C_AMOUNT + 4]);
  if(d !== 0){
    characters[s][which * C_AMOUNT + 3] /= d;
    characters[s][which * C_AMOUNT + 4] /= d;
  }
  
  // increment timer
  characters[s][which * C_AMOUNT + 6] ++;
  
  // get ready to shoot
  characters[s][which * C_AMOUNT + 7] --;
  
  // If ready to shoot
  if(sh && characters[s][which * C_AMOUNT + 7] <= 0){
    // reset counter to shoot
    characters[s][which * C_AMOUNT + 7] = INFO[characters[s][which * C_AMOUNT + 2]].rt;
    // Find chances of missing
    var miss = random(-INFO[characters[s][which * C_AMOUNT + 2]].ac/2, INFO[characters[s][which * C_AMOUNT + 2]].ac/2);
    // translate missing angle to sin/cos
    var sm = sin(miss);
    var cm = cos(miss);
    // Find bullet velocity
    var bvx = -characters[s][which * C_AMOUNT + 3];
    var bvy = characters[s][which * C_AMOUNT + 4];
    // add chances of missing
    var nbvx = bvx * cm - bvy * sm;
    bvy = bvy * cm + bvx * sm;
    // make bullet
    newB(characters[s][which * C_AMOUNT], characters[s][which * C_AMOUNT + 1], nbvx, bvy, INFO[characters[s][which * C_AMOUNT + 2]].bt + (INFO[characters[s][which * C_AMOUNT + 2]].br ? round(random()) : 0), s);
  }
  
  // move character
  characters[s][which * C_AMOUNT] -= characters[s][which * C_AMOUNT + 3] * sp;
  characters[s][which * C_AMOUNT + 1] += characters[s][which * C_AMOUNT + 4] * sp;
  
  // If there aren't too many characters
  if(lengthC(s) < 250){
    // If blimp create swarm drone
    if([8].indexOf(characters[s][which * C_AMOUNT + 2]) >= 0 && characters[s][which * C_AMOUNT + 6] % 600 === 0){
      newC(
        characters[s][which * C_AMOUNT],
        characters[s][which * C_AMOUNT + 1],
        2,
        s
      );
    }else if(characters[s][which * C_AMOUNT + 2] === 9 && characters[s][which * C_AMOUNT + 6] % 2100 === 0){
      // If base create really weak drone
      newC(
        characters[s][which * C_AMOUNT],
        characters[s][which * C_AMOUNT + 1],
        5,
        s
      );
    }
  }
  
  // find angle of character
  var ang = atan2(characters[s][which * C_AMOUNT + 3], characters[s][which * C_AMOUNT + 4]);
  // find the sin/cos
  var sa = sin(ang);
  var ca = cos(ang);
  
  // Loop through all enemy bullets
  for(var i = 0; i < lengthB(1 - s); i++){
    // hitbox x and hitbox y
    var hbx = bullets[1 - s][i * B_AMOUNT] - characters[s][which * C_AMOUNT];
    var hby = bullets[1 - s][i * B_AMOUNT + 1] - characters[s][which * C_AMOUNT + 1];
    // rotate hitbox
    // temporary hitbox x
    var thb = (hbx * ca - hby * sa) * 2;
    hby = (hby * ca + hbx * sa) * 2;
    
    // If bullet collides with hitbox
    if(dist(0, 0, thb / INFO[characters[s][which * C_AMOUNT + 2]].sx, hby / INFO[characters[s][which * C_AMOUNT + 2]].sy) < 1){
      // lose health
      characters[s][which * C_AMOUNT + 8] -= B_INFO[bullets[1 - s][i * B_AMOUNT + 2]].d;
      
      // If the bullet was an exploding one
      if(explodes.indexOf(bullets[1 - s][i * B_AMOUNT + 2])>=0){
        // Create 25 explosion particles going random directions
        for(var j = 0; j < 25; j++){
          var angr = random(TWO_PI);
          newB(bullets[1 - s][i * B_AMOUNT], bullets[1 - s][i * B_AMOUNT + 1], sin(angr), cos(angr), 8, 1 - s);
        }
      }
      // Unless the bullet is immune (explosion particle), delete the bullet.
      if(immune.indexOf(bullets[1 - s][i * B_AMOUNT + 2]) < 0){
        bullets[1 - s].splice(i * B_AMOUNT, B_AMOUNT);
        i --;
      }
    }
  }
  
  // regenerate slowly
  characters[s][which * C_AMOUNT + 8] = min(characters[s][which * C_AMOUNT + 8] + 0.002, INFO[characters[s][which * C_AMOUNT + 2]].hp);
  
  // return 1 (die) if health is 0 or less
  if(characters[s][which * C_AMOUNT + 8] <= 0){
    return 1;
  }
}
function runB(which, s){
  // run bullets
  
  // draw bullets
  drawB(which, s);
  
  // move
  bullets[s][which * B_AMOUNT] += bullets[s][which * B_AMOUNT + 3];
  bullets[s][which * B_AMOUNT + 1] += bullets[s][which * B_AMOUNT + 4];
  
  // add onto time
  bullets[s][which * B_AMOUNT + 5] ++;
  
  // If the bullet moved out of range or ran out of time
  if(bullets[s][which * B_AMOUNT + 5] > min(B_INFO[bullets[s][which * B_AMOUNT + 2]].r / B_INFO[bullets[s][which * B_AMOUNT + 2]].s, 1000)){
    // If exploding bullet, explode
    if(explodes.indexOf(bullets[s][which*B_AMOUNT + 2])>=0){
      for(var j = 0; j < 25; j++){
        var angr = random(TWO_PI);
        newB(bullets[s][which * B_AMOUNT], bullets[s][which * B_AMOUNT + 1], sin(angr), cos(angr), 8, s);
      }
    }
    // return 1 (die)
    return 1;
  }
}

// Master running function
function runAll(){
  // run all of the game essentials
  
  // Run the bullets
  for(var i = 0; i < lengthB(1); i++){
    if(runB(i, 1)){
      bullets[1].splice(i * B_AMOUNT, B_AMOUNT);
      i --;
    }
  }
  for(var i = 0; i < lengthB(0); i++){
    if(runB(i, 0)){
      bullets[0].splice(i * B_AMOUNT, B_AMOUNT);
      i --;
    }
  }
  
  // Run the characters
  for(var i = 0; i < lengthC(1); i++){
    if(runC(i, 1)){
      if(characters[1][i * C_AMOUNT + 2] === 9){
        scene = "won";
      }
      money += PRICES[characters[1][i * C_AMOUNT + 2]] >> 1;
      characters[1].splice(i * C_AMOUNT, C_AMOUNT);
      i --;
    }
  }
  for(var i = 0; i < lengthC(0); i++){
    if(runC(i, 0)){
      if(characters[1][i * C_AMOUNT + 2] === 9){
        scene = "lost";
      }
      characters[0].splice(i * C_AMOUNT, C_AMOUNT);
      i --;
    }
  }
  
  // Display the health bars
  for(var i = 0; i < lengthC(1); i++){
    drawH(i, 1);
  }
  for(var i = 0; i < lengthC(0); i++){
    drawH(i, 0);
  }
}

// Create the starter characters {
  // bases
  newC(300, -530, 9, 1);
  newC(300, 530, 9, 0);
  
  // blue walls
  newC(300, 120, 21, 0);
  newC(200, 160, 21, 0);
  newC(400, 160, 21, 0);
  newC(120, 240, 21, 0);
  newC(480, 240, 21, 0);
  
  // blue turrets
  newC(260, 200, 16, 0, 0, -1);
  newC(340, 200, 16, 0, 0, -1);
  newC(200, 240, 16, 0, 0, -1);
  newC(400, 240, 16, 0, 0, -1);
  
  // blue drone
  newC(300, 280, 4, 0, 0, -1);
  
  // red walls
  newC(300, -120, 21, 1);
  newC(200, -160, 21, 1);
  newC(400, -160, 21, 1);
  newC(120, -240, 21, 1);
  newC(480, -240, 21, 1);
  
  // red turrets
  newC(260, -200, 16, 1, 0, 1);
  newC(340, -200, 16, 1, 0, 1);
  newC(200, -240, 16, 1, 0, 1);
  newC(400, -240, 16, 1, 0, 1);
  
  // red drone
  newC(300, -280, 4, 1, 0, 1);
//}

// Runs every frame
draw = function(){
  // try/catch block prevents Oh Noes from freezing program
  try{
    //Background
    {
    // reset cursor
    cs = "default";
    }
    // run sections of program
    switch(transition[0] <= 1 ? scene : transition[1]){
      case "game":
        game();
      break;
      case "home":
        home();
      break;
      case "how":
        how();
      break;
      case "drones":
        drones();
      break;
      case "won":
        win();
      break;
      case "lost":
        lose();
      break;
    }
    // Transition between sections
    if(transition[0] > 0){
      transition[0] -= 0.05;
      var tr = smoothstep(1 - abs(transition[0] - 1));
      fill(0, 255 * tr);
      rect(300, 300, 600, 600);
    }
    // Set the cursor
    cursor(cs);
  }catch(Error){
    debug(Error);
  }
};

// Ran every time mouse is clicked
mouseClicked = function(){
  switch(scene){
    case "game":
      // if mouse over map
      if(selected[3] > -1 && mouseY < 500 && mouseY > 250 && PRICES[selected[3]] <= money){
        // translate y
        var ty = smoothstep(700 - (constrain(mouseY, 50, 500) - 50)*14/9, 0, 700) - 100;
        
        // Find tile mouse is above
        var tile = getHex(mouseY - ty, mouseX);
        if(tile[1] < 15 && tile[1] > 0 && tile[0] > 0 && tile[0] < 30){
          // make sure current tile is empty
          for(var i = 0; i < lengthC(0); i++){
            if(pdist(characters[0][i * C_AMOUNT], characters[0][i * C_AMOUNT + 1], 20*tile[0], 40*tile[1]) < 4){
              return 0;
            }
          }
          
          // If not, add character at mouse position
          newC(20*tile[0], 40*tile[1], selected[3], 0);
          // deduct money
          money -= PRICES[selected[3]];
        }
      }
      
      // run checks on if the shop is clicked
      if(!moving && mouseY > 500){
        shopClick();
      }
    break;
    case "home":
      if(button(155, 300, 140, 100)){
        // Go to game scene
        scene = "game";
        transition = [2, "home"];
      }else if(button(155, 400, 140, 100)){
        // Go to how scene
        scene = "how";
        transition = [2, "home"];
      }else if(button(195, 500, 220, 100)){
        // Go to drones slideshow scene
        scene = "drones";
        transition = [2, "home"];
      }
    break;
    case "how":
      if(button(300, 520, 160, 100)){
        // Go to home scene
        scene = "home";
        transition = [2, "how"];
      }
    break;
    case "drones":
      if(button(300, 520, 160, 100)){
        // Go to home scene
        scene = "home";
        transition = [2, "drones"];
      }else if(button(125, 300, 100, 100)){
        // Go to previous drone
        var t = slideshow[0];
        slideshow = [mod(t - 1, INFO.length - 1), 1, t];
      }else if(button(475, 300, 100, 100)){
        // Go to next drone
        var t = slideshow[0];
        slideshow = [mod(t + 1, INFO.length - 1), 1, t];
      }
    break;
  }
};  