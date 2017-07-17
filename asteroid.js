"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define("asteroid", function () {
  return function (_Phaser$Sprite) {
    _inherits(Asteroid, _Phaser$Sprite);

    function Asteroid(game) {
      _classCallCheck(this, Asteroid);

      var asteroidType = Math.ceil(Math.random() * 5);

      var _this = _possibleConstructorReturn(this, (Asteroid.__proto__ || Object.getPrototypeOf(Asteroid)).call(this, game, 670, Math.random() * 480, "asteroid" + asteroidType));

      switch (asteroidType) {
        case 1:
          _this.life = 100;
          break;
        case 2:
          _this.life = 20;
          break;
        case 3:
          _this.life = 100;
          break;
        case 4:
          _this.life = 50;
          break;
        case 5:
          _this.life = 100;
          break;
      }

      _this.game.physics.enable(_this);
      _this.smoothed = false;

      _this.animations.add("explosion", [2, 3, 4, 5], 10, false).onComplete.add(function () {
        return _this.kill();
      });
      _this.animations.add("hit", [0, 1], 25, false).onComplete.add(function () {
        return _this.frame = 0;
      });

      _this.anchor.set(0.5);
      _this.scale.set(1.5);

      _this.body.velocity.set(Math.random() * -200, Math.random() * 100 - 50);
      _this.rotation = Math.random() * 2 * Math.PI;
      _this.body.angularVelocity = Math.random() * 360 - 180;
      return _this;
    }

    _createClass(Asteroid, [{
      key: "update",
      value: function update() {
        if (this.y < 0 || this.y > this.game.height || this.x < 0) {
          this.kill();
        }
      }
    }]);

    return Asteroid;
  }(Phaser.Sprite);
});