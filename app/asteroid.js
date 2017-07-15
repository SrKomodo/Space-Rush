define("asteroid", () => {
  return class Asteroid extends Phaser.Sprite {
    constructor(game) {
      super(game, 670, Math.random() * 480, "asteroid" + Math.ceil(Math.random() * 5));
      this.game.physics.enable(this);

      this.anchor.set(0.5);
      this.scale.set(1.5);

      this.body.velocity.set(Math.random() * -200, Math.random() * 100 - 50);
      this.rotation = Math.random() * 2 * Math.PI;
      this.body.angularVelocity = Math.random() * 360 - 180;
      
      this.checkWorldBounds = true;
      this.outOfBoundsKill = true;
    }
  };
});