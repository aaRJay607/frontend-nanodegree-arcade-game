// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.random(175,75);   //max=175 min=75
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 480) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = this.random(-100,-500);
        // console.log(this.x);   // test
        this.speed = this.random(175,75);   //max=175 min=75
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// getRandomArbitrary function. Returns random value between the
// desired range.
Enemy.prototype.random = function (max,min) {
    return Math.random() * (max - min) + min;
};

//This function is used to check collision between player and enemy.
Enemy.prototype.checkCollisions = function () {
    // console.log(player.x);   // test
    var posXmin = player.x - 42;
    var posXmax = player.x + 42;
    var posYmin = player.y - 42;
    var posYmax = player.y + 42;
    if(((this.x + 25) >= posXmin && (this.x - 25) <= posXmax) && (this.y >= posYmin && this.y <= posYmax)){
        console.log("Hit");
        player.resetPos();
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 405;
};

player.prototype.update = function(dt) {
    if(this.y === -10) {
        // delay for transition effect.
        setTimeout(function() {player.resetPos();},500);
        // This function is used as a callback in the setTimeout function
    }   // so that the this parameter value is not compromised.
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function is used to reset the player position after it has reached the water.
player.prototype.resetPos = function() {
    this.x = 200;
    this.y = 405;
    // console.log(this);   // test
}

// This function is used to handle the arrow key input from the event listener.
player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if(this.x > 0)
            this.x = this.x - 100;
    }
    else if (key === 'right') {
      if(this.x < 400)
          this.x = this.x + 100;
    }
    else if (key === 'up') {
      if(this.y > -10)
          this.y = this.y - 83;
    }
    else if (key === 'down') {
      if(this.y < 405)
          this.y = this.y + 83;
    }
}

// All enemy objects in an array called allEnemies
var allEnemies = [];
var bug1 = new Enemy(20,60);      // row1
var bug2 = new Enemy(20,140);     // row2
var bug3 = new Enemy(20,220);     // row3
var bug4 = new Enemy(-250,60);    // row1
var bug5 = new Enemy(-250,140);   // row2
var bug6 = new Enemy(-250,220);   // row3

allEnemies.push(bug1,bug2,bug3,bug4,bug5,bug6);

// The player object in a variable called player
var player = new player();

// This listens for 'key down' presses so that the
// default action of scrolling is prevented during gameplay
document.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
