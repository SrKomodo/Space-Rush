define("player", () => {
  return class Player extends Phaser.Sprite {
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
  };
});