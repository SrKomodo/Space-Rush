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
  };
});