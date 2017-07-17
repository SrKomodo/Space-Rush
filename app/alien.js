define("alien", () => {
  return class Alien extends Phaser.Sprite {
    constructor(game) {
      let direction = Math.random() > 0.5 ? -1 : 1;
      super(game, Math.random() * 320 + 320, direction === 1 ? 0 : 480, "alien");
      this.direction = direction;
      this.anchor.set(0.5);
      this.scale.set(1.5);
      this.smoothed = false;
      this.game.add.tween(this).to({
        x: Math.random() * 320 + 320,
        y: direction === 1 ? 480 : 0
      }, 5000).start().onComplete.add(() => {
        this.destroy();
      });
      
      this.weapon = this.game.add.weapon(-1, "alienBullet");
      this.weapon.fireRate = 1000;
      this.weapon.onFire.add(bullet => {
        bullet.scale.set(1.5);
        bullet.smoothed = false;
      });
      this.weapon.trackSprite(this);
    }

    update() {
      if(this.game.state.getCurrentState().player) {
        this.weapon.fireAtSprite(this.game.state.getCurrentState().player);
      }
    }
  };
});