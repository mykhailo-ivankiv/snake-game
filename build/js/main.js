define(["exports", "Game", "Snake"], function (exports, _Game, _Snake) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var Game = _interopRequire(_Game);

  var Snake = _interopRequire(_Snake);

  //window.newGame = new Game();

  new Snake(document.body);
});