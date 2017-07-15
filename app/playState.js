define("playState", ["player"], (Player) => {
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
      this.game.load.image("meteor1", "images/meteor1.png");
      this.game.load.image("meteor2", "images/meteor2.png");
      this.game.load.image("meteor3", "images/meteor3.png");
      this.game.load.image("meteor4", "images/meteor4.png");
      this.game.load.image("meteor5", "images/meteor5.png");

      this.game.load.image("bullet", "images/bullet.png");
      this.game.load.image("background", "images/background.png");
      this.game.load.spritesheet("player", "images/player.png", 41, 17);
    }

    create() {
      this.asteroids = this.game.add.group();

      this.timer = this.time.create();
      this.timer.loop(500, () => {
        let asteroid = this.game.add.sprite(670, Math.random() * 480, "meteor" + Math.ceil(Math.random() * 5));
        asteroid.anchor.set(0.5);
        asteroid.scale.set(1.5);
        this.game.physics.arcade.enable(asteroid);
        asteroid.body.velocity.set(Math.random() * -200, Math.random() * 100 - 50);
        asteroid.rotation = Math.random() * 2 * Math.PI;
        asteroid.body.angularVelocity = Math.random() * 360;
        asteroid.outOfBoundsKill = true;
      });
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
    }
  };
});