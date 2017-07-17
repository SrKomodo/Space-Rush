"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define("playState", ["player", "asteroid", "alien"], function (Player, Asteroid, Alien) {
  return function (_Phaser$State) {
    _inherits(PlayState, _Phaser$State);

    function PlayState() {
      _classCallCheck(this, PlayState);

      return _possibleConstructorReturn(this, (PlayState.__proto__ || Object.getPrototypeOf(PlayState)).call(this));
    }

    _createClass(PlayState, [{
      key: "init",
      value: function init() {
        this.keys = this.game.input.keyboard.addKeys({
          up: Phaser.KeyCode.UP,
          down: Phaser.KeyCode.DOWN,
          left: Phaser.KeyCode.LEFT,
          right: Phaser.KeyCode.RIGHT,
          space: Phaser.KeyCode.SPACEBAR
        });
      }
    }, {
      key: "preload",
      value: function preload() {
        this.game.load.audio("hit", "audio/hit.wav");
        this.game.load.audio("explosion", "audio/explosion.wav");

        this.game.load.spritesheet("asteroid1", "images/asteroid1.png", 28, 29);
        this.game.load.spritesheet("asteroid2", "images/asteroid2.png", 15, 15);
        this.game.load.spritesheet("asteroid3", "images/asteroid3.png", 29, 28);
        this.game.load.spritesheet("asteroid4", "images/asteroid4.png", 14, 14);
        this.game.load.spritesheet("asteroid5", "images/asteroid5.png", 26, 20);

        this.game.load.image("bullet", "images/bullet.png");
        this.game.load.image("alienBullet", "images/alienBullet.png");
        this.game.load.image("background", "images/background.png");
        this.game.load.spritesheet("player", "images/player.png", 41, 17);
        this.game.load.image("alien", "images/alien.png");
      }
    }, {
      key: "create",
      value: function create() {
        this.sounds = {
          hit: this.game.add.audio("hit"),
          explosion: this.game.add.audio("explosion")
        };
        this.sounds.hit.volume = 0.1;
        this.sounds.explosion.volume = 0.1;

        this.asteroids = this.game.add.group(undefined, "asteroids", true);
        this.aliens = this.game.add.group(undefined, "aliens", true);

        this.timer = this.time.create();

        this.timer.loop(500, function () {
          var asteroid = new Asteroid(this.game);
          this.asteroids.add(asteroid);
        }, this);

        this.timer.loop(2000, function () {
          var alien = new Alien(this.game);
          this.aliens.add(alien);
        }, this);

        this.timer.start();

        this.background = this.game.add.tileSprite(0, 0, this.stage.width, this.stage.height, "background");
        this.background.scale.set(1.5);
        this.player = new Player(this.game, 0, 240);
        this.player.scale.set(1.5);
        this.game.add.existing(this.player);
      }
    }, {
      key: "update",
      value: function update() {
        var _this2 = this;

        if (this.keys.up.isDown) {
          this.player.move("y", -1);
        } else if (this.keys.down.isDown) {
          this.player.move("y", 1);
        } else {
          this.player.move("y", 0);
        }

        if (this.keys.left.isDown) {
          this.player.move("x", -1);
        } else if (this.keys.right.isDown) {
          this.player.move("x", 1);
        } else {
          this.player.move("x", 0);
        }

        if (this.keys.space.isDown) {
          this.player.shoot();
        }

        this.background.tilePosition.x -= 5;

        this.physics.arcade.collide(this.asteroids, this.asteroids);
        this.physics.arcade.overlap(this.player.weapon.bullets, this.asteroids, function (bullet, asteroid) {
          if (asteroid.life <= 0) {
            _this2.sounds.explosion.play();
            asteroid.animations.play("explosion");
          } else {
            _this2.sounds.hit.play();
            asteroid.animations.play("hit");
            asteroid.life -= 10;
            bullet.kill();
          }
        });

        this.physics.arcade.overlap(this.asteroids, this.player, function (player, asteroid) {
          player.life -= 10;
          player.checkDead();
          asteroid.kill();
        });

        this.aliens.forEach(function (alien) {

          _this2.physics.arcade.overlap(_this2.player, alien.weapon.bullets, function (player, bullet) {
            player.life -= 10;
            player.checkDead();
            bullet.kill();
          });
        });
      }
    }]);

    return PlayState;
  }(Phaser.State);
});