let titleState = {

};

let playState = {

};

document.addEventListener("DOMContentLoaded", () => {
  let game = new Phaser.Game(640, 480, Phaser.AUTO, "game", null, false, false);
  game.state.add("title", titleState, false);
  game.state.add("play", playState, false);

  game.state.start("title");
});