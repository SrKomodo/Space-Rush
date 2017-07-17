"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define("alien", function () {
  return function (_Phaser$Sprite) {
    _inherits(Alien, _Phaser$Sprite);

    function Alien(game) {
      _classCallCheck(this, Alien);

      var direction = Math.random() > 0.5 ? -1 : 1;

      var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, Math.random() * 320 + 320, direction === 1 ? 0 : 480, "alien"));

      _this.direction = direction;
      _this.anchor.set(0.5);
      _this.scale.set(1.5);
      _this.smoothed = false;
      _this.game.add.tween(_this).to({
        x: Math.random() * 320 + 320,
        y: direction === 1 ? 480 : 0
      }, 5000).start().onComplete.add(function () {
        _this.kill();
      });

      _this.weapon = _this.game.add.weapon(-1, "alienBullet");
      _this.weapon.fireRate = 1000;
      _this.weapon.onFire.add(function (bullet) {
        bullet.scale.set(1.5);
        bullet.smoothed = false;
      });
      _this.weapon.trackSprite(_this);
      return _this;
    }

    _createClass(Alien, [{
      key: "update",
      value: function update() {
        if (this.alive) this.weapon.fireAtSprite(this.game.state.getCurrentState().player);
      }
    }]);

    return Alien;
  }(Phaser.Sprite);
});