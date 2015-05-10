define(["exports", "module", "reflux", "Actions/SnakeActions"], function (exports, module, _reflux, _ActionsSnakeActions) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var Reflux = _interopRequire(_reflux);

    var SnakeActions = _interopRequire(_ActionsSnakeActions);

    var _pointer = 0;

    var Statistics = Reflux.createStore({
        listenables: SnakeActions,

        getApplesPointer: function getApplesPointer() {
            return _pointer;
        },

        onEatenApple: function onEatenApple() {
            _pointer += 1;
            this.trigger(_pointer);
        }

    });

    module.exports = Statistics;
});