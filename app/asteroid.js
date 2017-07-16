define("asteroid", () => {
  return class Asteroid extends Phaser.Sprite {
    constructor(game) {
      super(game, 670, Math.random() * 480, "asteroid" + Math.ceil(Math.random() * 5));
      this.game.physics.enable(this);
      this.smoothed = false;
      
      this.animations.add("explosion", [2, 3, 4, 5], 10, false).onComplete.add(() => this.kill());
      this.animations.add("hit", [0, 1], 25, false).onComplete.add(() => this.frame = 0);

      this.anchor.set(0.5);
      this.scale.set(1.5);
      this.life = 100;

      this.body.velocity.set(Math.random() * -200, Math.random() * 100 - 50);
      this.rotation = Math.random() * 2 * Math.PI;
      this.body.angularVelocity = Math.random() * 360 - 180;
    }

    update () {
      if (this.y < 0 || this.y > this.game.height) {
        this.kill();
      }
      if (this.x < 0) {
        this.kill();
      }
    }
  };
});