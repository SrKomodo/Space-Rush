"use strict";

requirejs(["playState", "deathState"], function (playState, deathState) {
  var game = new Phaser.Game(640, 480, Phaser.AUTO, "game");
  game.state.add("play", playState);
  game.state.add("death", deathState);
  game.state.start("play");
});