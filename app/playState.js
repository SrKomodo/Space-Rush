define("playState", ["player", "asteroid"], (Player, Asteroid) => {
  return class PlayState extends Phaser.State {
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
      this.game.load.image("asteroid1", "images/asteroid1.png");
      this.game.load.image("asteroid2", "images/asteroid2.png");
      this.game.load.image("asteroid3", "images/asteroid3.png");
      this.game.load.image("asteroid4", "images/asteroid4.png");
      this.game.load.image("asteroid5", "images/asteroid5.png");

      this.game.load.image("bullet", "images/bullet.png");
      this.game.load.image("background", "images/background.png");
      this.game.load.spritesheet("player", "images/player.png", 41, 17);
    }

    create() {
      this.asteroids = this.game.add.group(undefined, "asteroids", true);

      this.timer = this.time.create();
      this.timer.loop(500, function() {
        let asteroid = new Asteroid(this.game);
        this.asteroids.add(asteroid);
      }, this);
      this.timer.start();

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

      this.physics.arcade.collide(this.player, this.asteroids);
    }
  };
});