define(["exports", "module", "reflux"], function (exports, module, _reflux) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var Reflux = _interopRequire(_reflux);

    var SnakeActions = Reflux.createActions(["EatenApple"]);

    module.exports = SnakeActions;
});