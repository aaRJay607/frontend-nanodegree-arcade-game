// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.random();
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
        this.x = -80;
        this.speed = this.random();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// getRandomArbitrary function. Returns random value between the
// desired range.
Enemy.prototype.random = function () {
    return Math.random() * (175 - 75) + 75;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

player.prototype.update = function(dt) {
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
      if(this.y > -20)
          this.y = this.y - 84;
    }
    else if (key === 'down') {
      if(this.y < 400)
          this.y = this.y + 84;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var bug1 = new Enemy(20,60);
var bug2 = new Enemy(20,140);
var bug3 = new Enemy(20,220);

allEnemies.push(bug1,bug2,bug3);

var player = new player();

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
