"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define("deathState", function () {
  return function (_Phaser$State) {
    _inherits(DeathState, _Phaser$State);

    function DeathState() {
      _classCallCheck(this, DeathState);

      return _possibleConstructorReturn(this, (DeathState.__proto__ || Object.getPrototypeOf(DeathState)).call(this));
    }

    _createClass(DeathState, [{
      key: "preload",
      value: function preload() {
        this.game.load.image("gameOver", "images/gameOver.png");
        this.game.load.spritesheet("retry", "images/retry.png", 128, 32);
      }
    }, {
      key: "create",
      value: function create() {
        var _this2 = this;

        this.game.add.image(this.game.width / 2, this.game.height / 4, "gameOver").anchor.set(0.5);

        this.retry = this.game.add.button(this.game.width / 2, this.game.height - this.game.height / 4, "retry", function () {
          _this2.game.state.start("play", true);
        });
        this.retry.anchor.set(0.5);
        this.retry.animations.add("play", [0, 1], 1, true);
        this.retry.animations.play("play");
      }
    }]);

    return DeathState;
  }(Phaser.State);
});