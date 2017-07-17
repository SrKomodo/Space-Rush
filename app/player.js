define("player", () => {
  return class Player extends Phaser.Sprite {
    constructor(game, x, y) {
      super(game, x, y, "player");

      this.anchor.set(0.5, 0.5);
      this.game.physics.enable(this);
      this.body.collideWorldBounds = true;
      this.body.setSize(19, 17, 22, 0);

      this.smoothed = false;
      this.animations.add("idle",[0, 1, 2]);
      this.animations.play("idle", 5, true);

      this.weapon = this.game.add.weapon(-1, "bullet");
      this.weapon.bulletAngleVariance = 5;
      this.weapon.fireRate = 20;
      this.weapon.trackSprite(this, 13, 6);
      this.weapon.onFire.add(bullet => {
        bullet.scale.set(1.5);
        bullet.smoothed = false;
      });

      this.life = 100;
    }

    move(axis, v) {
      if(axis === "x")
        this.body.velocity.x = v * 100;
      else
        this.body.velocity.y = v * 300;
    }

    shoot() {
      this.weapon.fireAtXY(670, this.position.y);
    }

    update() {
      this.rotation = this.previousRotation + this.body.velocity.y * 0.0001;
      this.rotation -= this.previousRotation * 0.1;
    }

    checkDead() {
      if (this.life <= 0) {
        this.game.state.getCurrentState().asteroids.destroy();
        this.game.state.getCurrentState().aliens.destroy();
        this.game.state.start("death", true);
      }
    }
  };
});