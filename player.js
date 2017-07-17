"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define("player", function () {
  return function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y) {
      _classCallCheck(this, Player);

      var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, "player"));

      _this.anchor.set(0.5, 0.5);
      _this.game.physics.enable(_this);
      _this.body.collideWorldBounds = true;
      _this.body.setSize(19, 17, 22, 0);

      _this.smoothed = false;
      _this.animations.add("idle", [0, 1, 2]);
      _this.animations.play("idle", 5, true);

      _this.weapon = _this.game.add.weapon(-1, "bullet");
      _this.weapon.bulletAngleVariance = 5;
      _this.weapon.fireRate = 20;
      _this.weapon.trackSprite(_this, 13, 6);
      _this.weapon.onFire.add(function (bullet) {
        bullet.scale.set(1.5);
        bullet.smoothed = false;
      });

      _this.life = 100;
      return _this;
    }

    _createClass(Player, [{
      key: "move",
      value: function move(axis, v) {
        if (axis === "x") this.body.velocity.x = v * 100;else this.body.velocity.y = v * 300;
      }
    }, {
      key: "shoot",
      value: function shoot() {
        this.weapon.fireAtXY(670, this.position.y);
      }
    }, {
      key: "update",
      value: function update() {
        this.rotation = this.previousRotation + this.body.velocity.y * 0.0001;
        this.rotation -= this.previousRotation * 0.1;
      }
    }, {
      key: "checkDead",
      value: function checkDead() {
        if (this.life <= 0) {
          this.game.state.getCurrentState().asteroids.destroy();
          this.game.state.getCurrentState().aliens.destroy();
          this.game.state.start("death", true);
        }
      }
    }]);

    return Player;
  }(Phaser.Sprite);
});