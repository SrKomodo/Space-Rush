requirejs(["playState", "deathState"], (playState, deathState) => {
  let game = new Phaser.Game(640, 480, Phaser.AUTO, "game");
  game.state.add("play", playState);
  game.state.add("death", deathState);
  game.state.start("play");
});