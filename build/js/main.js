define(["exports", "react", "Game", "Snake"], function (exports, _react, _Game, _Snake) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  var Game = _interopRequire(_Game);

  var Snake = _interopRequire(_Snake);

  //window.newGame = new Game();

  React.render(React.createElement(Snake, null), document.body);
});