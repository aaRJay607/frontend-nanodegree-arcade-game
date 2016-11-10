var flag = 50;    // global flag to assist displaying instructions at the start.

/**
* @description Enemy Class
* @constructor
* @param x represents the x position of the enemy instance
* @param y represents the y position of the enemy instance
*/
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.random(175,75);   //max=175 min=75
};

/**
* @description Update the enemy's position, required method for game
* @param dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 480) {                        // To increment the position
        this.x = this.x + (this.speed * dt);
    } else {                                  // To reset to a new random position and speed
        this.x = this.random(-100,-500);
        // console.log(this.x);   // test
        this.speed = this.random(175,75);   //max=175 min=75
    }
    this.checkCollisions();
};

/**
* @description Draws the enemy on the screen, required method for game
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description getRandomArbitrary function. Returns random value between the desired range.
* @param max - Maximum range
* @param min - Minimum range
*/
Enemy.prototype.random = function (max,min) {
    return Math.random() * (max - min) + min;
};

/**
* @description This function is used to check collision between player and enemy.
*/
Enemy.prototype.checkCollisions = function () {
    // console.log(player.x);   // test
    var posXmin = player.x - 42;
    var posXmax = player.x + 42;
    var posYmin = player.y - 42;
    var posYmax = player.y + 42;
    if(((this.x + 25) >= posXmin && (this.x - 25) <= posXmax) && (this.y >= posYmin && this.y <= posYmax)){
        // console.log("Hit");
        player.flag = -1;
        player.resetPos();
    }
};

/**
* @description player class
* @constructor
*/
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 405;
    this.score = 0;  // Variable to keep game score
    this.flag = 0;  // Flag to increase or decrease score
    this.life = 3;  // Variable holding life of the play
    this.flag2 = 0; // Flag to assist printing game comments
};

/**
* @description Updates the player's position.
* @param dt, a time delta between ticks
*/
player.prototype.update = function(dt) {
    if(this.y === -10) {    // Player reached the water
        this.flag = 1;
        this.resetPos();
        /*
        // delay for transition effect.
        setTimeout(function() {player.resetPos(flag);console.log(flag);},500);
        // This function is used as a callback in the setTimeout function
       // so that the this parameter value is not compromised.
       */
     }
};

/**
* @description Draws the player on the screen.
*/
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description This function is used to reset the player position after it has reached the water.
*/
player.prototype.resetPos = function() {
    this.x = 200;       // reset positions
    this.y = 405;
    if (this.flag === 1) {  // Increase points.
        this.score += 10;
        this.flag2 = 25;    // Assists in printing comment. Used in engine.js' render function. The value is used in printing for a given no. of game ticks.
    }
    else {                  // Hit. Decrease life.
        this.life -= 1;
        this.flag2 = -25;   // Assists in printing comment. Used in engine.js' render function. The value is used in printing for a given no. of game ticks.
    }
    // this.flag = 0;
    // console.log(this);   // test
};

/**
* @description This block is for printing game comments. Called from engine.js' render function.
*/
player.prototype.scoreComment = function() {
    if (this.flag2 > 0) {
        ctx.save();   // The current values are saved on the stack. This is done as textAlign changes other text on the canvas.
        ctx.font="20px arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Great! +10 Pts.",252,40);
        ctx.restore();
        this.flag2--;   // Reduces the counter of printing for number of ticks.
        // console.log("Great");
    } else if (this.flag2 < 0) {
        ctx.save();
        ctx.font="20px arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Dead! -1 life",252,40);
        ctx.restore();
        this.flag2++;   // Increases the counter of printing for number of ticks.
        // console.log("dead");
    } else {
        ctx.save();
        ctx.font="20px arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Use ARROW KEYS to move player",252,40);
        ctx.restore();
        flag--;
    }
};

/**
* @description This function is used to handle the arrow key input from the event listener. It changes the position of the player according to the user.
* @param key - Here the string value of the keycode from the allowedKeys array is passed.
*/
player.prototype.handleInput = function(key) {
    if (key === "left") {
        if(this.x > 0) {
            this.x = this.x - 100;
        }
    } else if (key === "right") {
        if(this.x < 400) {
            this.x = this.x + 100;
        }
    } else if (key === "up") {
        if(this.y > -10) {
            this.y = this.y - 83;
        }
    } else if (key === "down") {
        if(this.y < 405) {
            this.y = this.y + 83;
        }
    }
};

/**
* @description All enemy objects in an array called allEnemies
*/
var allEnemies = [];
var bug1 = new Enemy(20,60);      // row1
var bug2 = new Enemy(20,140);     // row2
var bug3 = new Enemy(20,220);     // row3
var bug4 = new Enemy(-250,60);    // row1
var bug5 = new Enemy(-250,140);   // row2
var bug6 = new Enemy(-250,220);   // row3

allEnemies.push(bug1,bug2,bug3,bug4,bug5,bug6);

/**
* @description The player object is in a variable called player
*/
var player = new player();

/**
* @description This listens for 'key down' presses so that the default action of scrolling is prevented during gameplay.
*/
document.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

/**
* @description This listens for key presses and sends the keys to your player.handleInput() method.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
