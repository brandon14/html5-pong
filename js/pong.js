function GameSettings() {
  this.fps = 60;
  this.playerOneColor = '#ffffff';
  this.playerTwoColor = '#ffffff';
  this.ballColor = '#ffffff';
  this.netColor = '#ffffff';
  this.scoreColor = "#ffffff";

  this.playerHeight = 56;
  this.playerWidth = 4;
  this.playerSpacing = 10;

  this.playerOneUp = 87;
  this.playerOneDown = 83;
  this.playerTwoUp = 79;
  this.playerTwoDown = 75;

  this.paddleSpeed = 8;
  this.ballSpeed = 6;

  this.netWidth = 4;

  this.ballRadius = 8;

  this.scoreToWin = 15;
}

/**
 * [KeyListener description]
 */
function KeyListener() {
  this.pressedKeys = [];

  this.keydown = function(fEvent) {
    this.pressedKeys[fEvent.keyCode] = true;
  }

  this.keyup = function(fEvent) {
    this.pressedKeys[fEvent.keyCode] = false;
  }

  $(document).on('keydown', this.keydown.bind(this));
  $(document).on('keyup', this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(fKey) {
  return this.pressedKeys[fKey] ? true : false;
}
/**
 * End KeyListener
 */

/**
 * [GameBoard description]
 * @param {[type]} fGameSettings [description]
 */
function GameBoard(fGameSettings, fCanvas) {
  this.canvas = fCanvas;
  this.context = canvas.getContext('2d');
  this.height = canvas.height;
  this.width = canvas.width;
  this.gameSettings = fGameSettings;

  this.keyListener = new KeyListener();

  this.netWidth = this.gameSettings.netWidth;

  this.playerOne = new Player((this.gameSettings.playerSpacing + (this.gameSettings.playerWidth / 2)),
                              this.height / 2,
                              this.gameSettings.playerWidth,
                              this.gameSettings.playerHeight,
                              this.gameSettings.playerOneColor,
                              this.gameSettings.paddleSpeed);
  this.playerTwo = new Player((this.width - this.gameSettings.playerSpacing - (this.gameSettings.playerWidth / 2)),
                              this.height / 2,
                              this.gameSettings.playerWidth,
                              this.gameSettings.playerHeight,
                              this.gameSettings.playerTwoColor,
                              this.gameSettings.paddleSpeed);

  this.ball = new Ball(this.width / 2,
                       this.height / 2,
                       this.gameSettings.ballRadius,
                       this.gameSettings.ballColor,
                       this.gameSettings.ballSpeed,
                       this.width,
                       this.height);

  this.playerOneDisplay = new Display(this.width / 4, 50, this.gameSettings.scoreColor);
  this.playerTwoDisplay = new Display(this.width * 3 / 4, 50, this.gameSettings.scoreColor);
}

GameBoard.prototype.clear = function() {
  this.context.clearRect(0, 0, this.width, this.height);
}

GameBoard.prototype.score = function(fPlayer) {
  fPlayer.score++;

  var playerNum = fPlayer === this.playerOne ? 1 : 2;

  if (fPlayer.score >= this.gameSettings.scoreToWin) {
    alert('Player ' + playerNum + ' wins!!');

    GameLoop.reset();

    return;
  }

  this.ball.reset(this.width, this.height, playerNum);
}

GameBoard.prototype.draw = function() {
  this.clear();
  this.context.fillStyle = this.gameSettings.netColor;
  this.context.fillRect((this.width / 2) - (this.netWidth / 2), 0, this.netWidth, this.height);
  this.playerOne.draw(this.context);
  this.playerTwo.draw(this.context);

  this.ball.draw(this.context);
  this.playerOneDisplay.draw(this.context);
  this.playerTwoDisplay.draw(this.context);
}

GameBoard.prototype.update = function() {
  // Player one movement
  if (this.keyListener.isPressed(this.gameSettings.playerOneDown)) {
    this.playerOne.moveDown(this.height);
  } else if (this.keyListener.isPressed(this.gameSettings.playerOneUp)) {
    this.playerOne.moveUp(this.height);
  }

  // Player two movement
  if (this.keyListener.isPressed(this.gameSettings.playerTwoDown)) {
    this.playerTwo.moveDown(this.height);
  } else if (this.keyListener.isPressed(this.gameSettings.playerTwoUp)) {
    this.playerTwo.moveUp(this.height);
  }

  if (this.ball.x >= this.width) {
    this.score(this.playerOne);
  } else if (this.ball.x + this.gameSettings.ballRadius <= 0) {
    this.score(this.playerTwo);
  }

  this.ball.update();
  this.ball.checkCollision(this.playerOne, this.playerTwo);

  this.playerOneDisplay.score = this.playerOne.score;
  this.playerTwoDisplay.score = this.playerTwo.score;
}

GameBoard.prototype.reset = function() {
  this.clear();
  this.playerOne.reset((this.gameSettings.playerSpacing + (this.gameSettings.playerWidth / 2)),
                              this.height / 2,
                              this.gameSettings.playerWidth,
                              this.gameSettings.playerHeight,
                              this.gameSettings.playerOneColor,
                              this.gameSettings.paddleSpeed);
  this.playerTwo.reset((this.width - this.gameSettings.playerSpacing - (this.gameSettings.playerWidth / 2)),
                              this.height / 2,
                              this.gameSettings.playerWidth,
                              this.gameSettings.playerHeight,
                              this.gameSettings.playerTwoColor,
                              this.gameSettings.paddleSpeed);
  this.ball.reset(this.width, this.height, 2);
  this.playerOneDisplay.reset(this.width / 4, 50, this.gameSettings.scoreColor);
  this.playerTwoDisplay.reset(this.width * 3 / 4, 50, this.gameSettings.scoreColor);
}
/**
 * End GameBoard
 */

/**
 * [Player description]
 * @param {[type]} fX      [description]
 * @param {[type]} fY      [description]
 * @param {[type]} fWidth  [description]
 * @param {[type]} fHeight [description]
 * @param {[type]} fColor  [description]
 * @param {[type]} fSpeed  [description]
 */
function Player(fX, fY, fWidth, fHeight, fColor, fSpeed) {
  this.x = fX;
  this.y = fY;

  this.width = fWidth;
  this.height = fHeight;

  this.color = fColor;
  this.speed = fSpeed;

  this.score = 0;
}

Player.prototype.draw = function(fContext) {
  fContext.fillStyle = this.color;

  var tX = this.x - (this.width / 2);
  var tY = this.y - (this.height / 2);

  fContext.fillRect(tX, tY, this.width, this.height);
}

Player.prototype.moveUp = function() {
  this.y = Math.max(this.height / 2, this.y - this.speed);
}

Player.prototype.moveDown = function(fHeight) {
  this.y = Math.min(fHeight - (this.height / 2), this.y + this.speed);
}

Player.prototype.reset = function(fX, fY, fWidth, fHeight, fColor, fSpeed) {
  this.x = fX;
  this.y = fY;

  this.width = fWidth;
  this.height = fHeight;

  this.color = fColor;
  this.speed = fSpeed;

  this.score = 0;
}
/**
 * End Player
 */

/**
 * [Ball description]
 * @param {[type]} fX      [description]
 * @param {[type]} fY      [description]
 * @param {[type]} fRadius [rdescription]
 * @param {[type]} fColor  [description]
 * @param {[type]} fSpeed  [description]
 * @param {[type]} fWidth  [description]
 * @param {[type]} fHeight [description]
 */
function Ball(fX, fY, fRadius, fColor, fSpeed, fWidth, fHeight) {
  this.x = fX;
  this.y = fY;
  this.dx = fSpeed;
  this.dy = 0;

  this.radius = fRadius;
  this.color = fColor;

  this.gameAreaWidth = fWidth;
  this.gameAreaHeight = fHeight;

  this.watchZone = {'horizontal' : this.gameAreaWidth - 40,
                   'vertical'   : this.gameAreaHeight - 40};
}

Ball.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;
}

Ball.prototype.draw = function(fContext) {
  fContext.fillStyle = this.color;

  fContext.beginPath();
  fContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  fContext.fill();
}

Ball.prototype.reset = function(fWidth, fHeight, fPlayerNum) {
  this.x = fWidth / 2;
  this.y = fHeight / 2;

  this.dx = fPlayerNum == 1 ? -(this.dx) : this.dx;
  this.dy = 0;
}

Ball.prototype.checkCollision = function(fPlayerOne, fPlayerTwo) {
  if ((this.x <= this.watchZone.horizontal && this.x >= this.gameAreaWidth - this.watchZone.horizontal) &&
      (this.y <= this.watchZone.vertical && this.y >= this.gameAreaHeight - this.watchZone.vertical)) {

    return;
  }

  if (this.dy < 0 && this.y < 0 || this.dy > 0 && this.y + this.radius > this.gameAreaHeight) {
    this.dy = -(this.dy);
  }

  if (this.dx > 0) {
    if (fPlayerTwo.x - (fPlayerTwo.width / 2) <= this.x + this.radius &&
        fPlayerTwo.x - (fPlayerTwo.width / 2) > this.x - this.dx + this.radius) {
      var collisionDiff = this.x + this.radius - (fPlayerTwo.x - (fPlayerTwo.width / 2));
      var tK = collisionDiff / this.dx;
      var tY = this.dy * tK + (this.y - this.dy);

      if (tY + this.radius >= fPlayerTwo.y - (fPlayerTwo.height / 2) &&
          tY - this.radius <= fPlayerTwo.y + (fPlayerTwo.height / 2)) {
        var impact = this.y - fPlayerTwo.y;

        this.x = fPlayerTwo.x - this.radius;
        this.y = Math.floor(this.y - this.dy + this.dy * tK);
        this.dy = this.calibrateAngle(impact);
        this.dx = -(this.dx);
      }
    }
  } else {
    if (fPlayerOne.x + (fPlayerOne.width / 2) >= this.x - this.radius) {
      var collisionDiff = fPlayerOne.x + (fPlayerOne.width / 2) - this.radius - this.x;
      var tK = collisionDiff / -(this.dx);
      var tY = this.dy * tK + (this.y - this.dy);

      if (tY + this.radius >= fPlayerOne.y - (fPlayerOne.height / 2) &&
          tY - this.radius <= fPlayerOne.y + (fPlayerOne.height / 2)) {
        var impact = this.y - fPlayerOne.y;

        this.x = fPlayerOne.x + this.radius;
        this.y = Math.floor(this.y - this.dy + this.dy * tK);
        this.dy = this.calibrateAngle(impact);
        this.dx = -(this.dx);
      }
    }
  }
}

Ball.prototype.calibrateAngle = function(fImpact) {
  var abs = Math.abs(fImpact);

  if (abs <= 24 && abs > 20) {
    if (fImpact > 0) {
      return 8;
    } else {
      return -8;
    }
  } else if (abs <= 20 && abs > 16) {
    if (fImpact > 0) {
      return 6;
    } else {
      return -6;
    }
  } else if (abs <= 16 && abs > 8) {
    if (fImpact > 0) {
      return 4;
    } else {
      return -4;
    }
  } else if (abs <= 8 && abs > 4) {
    if (fImpact > 0) {
      return 2;
    } else {
      return -2;
    }
  }
  else {
    return 0;
  }
}
/**
 * End Ball
 */

/**
 * [Display description]
 * @param {[type]} fX     [description]
 * @param {[type]} fY     [description]
 * @param {[type]} fColor [description]
 */
function Display(fX, fY, fColor) {
  this.x = fX;
  this.y = fY;
  this.color = fColor;
  this.score = 0;
}

Display.prototype.draw = function(fContext) {
  fContext.fillStyle = this.color;
  fContext.font = '30pt Sans-Serif';

  fContext.fillText(this.score, this.x , this.y);
}

Display.prototype.reset = function(fX, fY, fColor) {
  this.x = fX;
  this.y = fY;
  this.color = fColor;
  this.score = 0;
}
/**
 * End Display
 */

/**
 * [Pong description]
 * @param {[type]} fGameSettings [description]
 */
function Pong(fGameSettings, fCanvas) {
  this.timeoutId;
  this.gameSettings = fGameSettings;
  this.gameBoard = new GameBoard(this.gameSettings, fCanvas);
}

Pong.prototype.loop = function() {
  this.gameBoard.update();
  this.gameBoard.draw();
}

Pong.prototype.reset = function() {
  this.gameBoard.reset();
}
/**
 * End Pong
 */

function pause(milliseconds) {
  var dt = new Date();
  while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

/**
 * [GameLoop description]
 */
var GameLoop = (function GameLoop() {
  var $canvas = $('#canvas');
  var $canvasHolder = $('#canvas-holder');
  var gameSettings = new GameSettings();
  var pong = new Pong(gameSettings, $canvas.get(0));
  var isPaused = false;
  var isStarted = false;
  var timeoutId = -1;

  $(window).on('resize', function() {
    // Screen is too small so we need to reset to stop the game
    if ($(window).width() <= 750) {
      reset();

      $(document).off('keypress', _onKeypress);
    } else {
      $(document).on('keypress', _onKeypress);
    }
  });

  $(document).on('keypress', _onKeypress);

  function _onKeypress(fEvent) {
    // Space was pressed, either start or pause/unpause
    if (fEvent.which === 32) {
      if (!isStarted) {
        start();
      } else {
        pause();
      }
    }

    // R was pressed, reset
    if (fEvent.which === 114 ) {
      reset();
    }
  }

  function start() {
    isStarted = true;
    loop();
  }

  function loop() {
    if (!isStarted) {
      return;
    }

    pong.loop();

    timeoutId = setTimeout(loop, (1 / gameSettings.fps) * 1000);
  }

  function pause() {
    if (!isStarted) {
      return;
    }

    isPaused = !isPaused;

    if (isPaused) {
      clearTimeout(timeoutId);
    } else {
      timeoutId = setTimeout(loop, (1 / gameSettings.fps) * 1000);
    }
  }

  function stop() {
    isStarted = false;
    clearTimeout(timeoutId);
  }

  function reset() {
    stop();
    isPaused = false;
    isStarted = false;
    timeoutId = -1;

    pong.reset();
  }

  return {
    start: start,
    loop: loop,
    pause: pause,
    stop: stop,
    reset: reset
  }
})();
/**
 * End GameLoop
 */
