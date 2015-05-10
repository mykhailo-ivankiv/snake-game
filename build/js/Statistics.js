define(["exports", "module", "utils/BEM", "react", "Storages/Statictics"], function (exports, module, _utilsBEM, _react, _StoragesStatictics) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var BEM = _interopRequire(_utilsBEM);

    var React = _interopRequire(_react);

    var StatisticsStorage = _interopRequire(_StoragesStatictics);

    var Statistics = (function (_React$Component) {
        function Statistics() {
            _classCallCheck(this, Statistics);

            _get(Object.getPrototypeOf(Statistics.prototype), "constructor", this).call(this);
            this.state = {
                apples: StatisticsStorage.getApplesPointer()
            };
        }

        _inherits(Statistics, _React$Component);

        _createClass(Statistics, {
            onStatusChange: {
                value: function onStatusChange() {
                    this.setState({
                        apples: StatisticsStorage.getApplesPointer()
                    });
                }
            },
            componentDidMount: {
                value: function componentDidMount() {
                    this.unsubscribe = StatisticsStorage.listen(this.onStatusChange.bind(this));
                }
            },
            render: {
                value: function render() {
                    return React.createElement(
                        "div",
                        { className: "statistics" },
                        "Захавано яблок :",
                        this.state.apples
                    );
                }
            }
        });

        return Statistics;
    })(React.Component);

    module.exports = Statistics;
});