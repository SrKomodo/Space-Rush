define("deathState", () => {
  return class DeathState extends Phaser.State {
    constructor() {
      super();
    }

    preload() {
      this.game.load.image("gameOver", "images/gameOver.png");
      this.game.load.spritesheet("retry", "images/retry.png", 128, 32);
    }

    create() {
      this.game.add.image(this.game.width / 2, this.game.height / 4, "gameOver").anchor.set(0.5);

      this.retry = this.game.add.button(this.game.width / 2, this.game.height - this.game.height / 4, "retry", () => {
        this.game.state.start("play", true);
      });
      this.retry.anchor.set(0.5);
      this.retry.animations.add("play", [0, 1], 1, true);
      this.retry.animations.play("play");
    }
  };
});