// Random number generator (seedable)
function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Random Speed Array for Enemies
var speedFactor_arr = [100, 200, 300, 400];

// Random Position Generator for Enemies
var randomPosFunc = function(seed) {
    var randomFactor = [60, 140, 220];
    var randomIndex = Math.floor(random(seed) * randomFactor.length);
    var randomPos = randomFactor[randomIndex];

    return randomPos;
}

// Enemies our player must avoid
var Enemy = function(seed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = randomPosFunc(seed);
    this.speedFactor = 110;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 550) {
        this.x = -100;
        this.y = randomPosFunc(Date.now() + Math.random()*10000);
        // speedFactor = 200;
        this.speedFactor = speedFactor_arr[Math.floor(random(Date.now() + Math.random()*10000) * 4)];
    }
    
    this.x = this.x + this.speedFactor * dt;
    // console.log(this.y);
    // console.log(this.speedFactor);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 201;
    this.y = 380;
};

Player.prototype.update = function() {
    this.x = 201;
    this.y = 380;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y !== 60) {
                this.y = this.y - 80;
            }
            
            else {
                this.x = 201;
                this.y = 380;
            }
            break;

        case 'down':
            if (this.y !== 380) {
                this.y = this.y + 80;    
            }
            break;

        case 'left':
            if (this.x !== -1) {
                this.x = this.x - 101;
            }
            break;

        case 'right':
            if (this.x !== 403) {
                this.x = this.x + 101;
            }
            break;

        default:
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player();

var e1 = new Enemy(Date.now() + Math.random()*10000);
var e2 = new Enemy(Date.now() + Math.random()*10000);
var e3 = new Enemy(Date.now() + Math.random()*10000);
var e4 = new Enemy(Date.now() + Math.random()*10000);
var e5 = new Enemy(Date.now() + Math.random()*10000);

allEnemies.push(e1);
allEnemies.push(e2);
allEnemies.push(e3);
allEnemies.push(e4);
allEnemies.push(e5);

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
