class TitleState extends Phaser.State {
  constructor() {
    super();
  }

  init() {
    this.game.renderer.renderSession.roundPixels = true;

    this.score = 0;
    this.hasKey = false;
  }

  preload() {
    this.game.load.image("title", "images/title.png");
  }

  create() {
    let title = this.game.add.image(320, 100, "title");
    let startButton = this.game.add.text(320, 240, "Start", {font: "monospace", fill: "white", fontSize: "22px"});
    startButton.anchor.set(0.5);
    title.anchor.set(0.5);
  }
}

class Player extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, "player");
    this.anchor.set(0.5, 0.5);
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.smoothed = false;
    this.weapon = this.game.add.weapon(-1, "bullet");
    
  }

  move(axis, v) {
    if(axis === "x")
      this.body.velocity.x = v * 100;
    else
      this.body.velocity.y = v * 300;
  }

  shoot() {
    this.weapon.fire(this.position, 670, this.position.y);
  }
}

class PlayState extends Phaser.State {
  constructor() {
    super();
  }

  init() {
    this.keys = this.game.input.keyboard.addKeys({
      up: Phaser.KeyCode.UP,
      down: Phaser.KeyCode.DOWN,
      left: Phaser.KeyCode.LEFT,
      right: Phaser.KeyCode.RIGHT,
      space: Phaser.KeyCode.SPACEBAR
    });
  }

  preload() {
    this.game.load.image("background", "images/background.png");
    this.game.load.spritesheet("player", "images/player.png", 92, 25);
  }

  create() {
    this.background = this.game.add.tileSprite(0,0,this.stage.width,this.stage.height,"background");
    this.background.scale.set(1.5);
    this.player = new Player(this.game, 0, 240);
    this.player.scale.set(1.5);
    this.game.add.existing(this.player);
  }

  update() {
    if (this.keys.up.isDown) {
      this.player.move("y", -1);
    }
    else if (this.keys.down.isDown) {
      this.player.move("y", 1);
    }
    else {
      this.player.move("y", 0);
    }

    if (this.keys.left.isDown) {
      this.player.move("x", -1);
    }
    else if (this.keys.right.isDown) {
      this.player.move("x", 1);
    }
    else {
      this.player.move("x", 0);
    }

    if (this.keys.space.isDown) {
      this.player.shoot();
    }

    this.background.tilePosition.x -= 5;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let game = new Phaser.Game(640, 480, Phaser.AUTO, "game", null, false, false);
  game.state.add("title", TitleState, false);
  game.state.add("play", PlayState, false);

  game.state.start("play");
});