define(["exports", "module", "utils/BEM", "react", "Snake", "Statistics"], function (exports, module, _utilsBEM, _react, _Snake, _Statistics) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var BEM = _interopRequire(_utilsBEM);

    var React = _interopRequire(_react);

    var Snake = _interopRequire(_Snake);

    var Statistics = _interopRequire(_Statistics);

    var b = BEM.b("layout");

    var Layout = (function (_React$Component) {
        function Layout() {
            _classCallCheck(this, Layout);

            if (_React$Component != null) {
                _React$Component.apply(this, arguments);
            }
        }

        _inherits(Layout, _React$Component);

        _createClass(Layout, {
            render: {
                value: function render() {
                    return React.createElement(
                        "div",
                        { className: b() },
                        React.createElement(
                            "section",
                            { className: b("main") },
                            React.createElement(Snake, null)
                        ),
                        React.createElement(
                            "aside",
                            { className: b("additional") },
                            React.createElement(Statistics, null)
                        )
                    );
                }
            }
        });

        return Layout;
    })(React.Component);

    module.exports = Layout;
});