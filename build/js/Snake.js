define(["exports", "module", "utils/BEM", "react", "Statistics", "Actions/SnakeActions"], function (exports, module, _utilsBEM, _react, _Statistics, _ActionsSnakeActions) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var BEM = _interopRequire(_utilsBEM);

    var React = _interopRequire(_react);

    var Statistics = _interopRequire(_Statistics);

    var SnakeActions = _interopRequire(_ActionsSnakeActions);

    var b = BEM.b("snake");

    var Snake = (function (_React$Component) {
        function Snake() {
            _classCallCheck(this, Snake);

            //this.container = container;
            this.state = {
                field: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
                snake: [{ x: 6, y: 0 }, { x: 5, y: 0 }, { x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }],
                direction: "right" // "right", "left", "top", "bottom";
            };
            setInterval(this.updateModel.bind(this), 500);
        }

        _inherits(Snake, _React$Component);

        _createClass(Snake, {
            componentDidMount: {
                value: function componentDidMount() {
                    document.body.addEventListener("keydown", this.changeSnakeDirection.bind(this));
                }
            },
            componentWillUnmount: {
                value: function componentWillUnmount() {
                    document.body.removeEventListener("keydown", this.changeSnakeDirection);
                }
            },
            changeSnakeDirection: {
                value: function changeSnakeDirection(ev) {
                    var direction = this.state.direction;
                    var key = ev.keyCode;

                    if (key === 38 && direction !== "bottom") {
                        direction = "top";
                    } //top
                    if (key === 37 && direction !== "right") {
                        direction = "left";
                    } //left
                    if (key === 39 && direction !== "left") {
                        direction = "right";
                    } //right
                    if (key === 40 && direction !== "top") {
                        direction = "bottom";
                    } //bottom

                    this.setState({ direction: direction });
                }
            },
            eatenApple: {
                value: function eatenApple() {
                    SnakeActions.EatenApple();
                }
            },
            updateModel: {
                value: function updateModel() {
                    var field = this.state.field.slice(0); //Clone Array;
                    var snake = this.state.snake.slice(0);
                    var direction = this.state.direction;

                    var factor = { x: 0, y: 0 };

                    if (direction === "top") {
                        factor.y = -1;
                    }
                    if (direction === "bottom") {
                        factor.y = 1;
                    }
                    if (direction === "left") {
                        factor.x = -1;
                    }
                    if (direction === "right") {
                        factor.x = 1;
                    }

                    var head = {
                        x: snake[0].x + factor.x,
                        y: snake[0].y + factor.y
                    };

                    if (field[head.y] === undefined || field[head.y][head.x] === undefined) {
                        if (head.y < 0) {
                            head.y = field.length - 1;
                        }
                        if (head.y >= field.length) {
                            head.y = 0;
                        }
                        if (head.x < 0) {
                            head.x = field[0].length - 1;
                        }
                        if (head.x >= field[0].length) {
                            head.x = 0;
                        }

                        snake.unshift(head);

                        var tail = snake.pop();
                        field[tail.y][tail.x] = 0;

                        snake.forEach(function (point, i) {
                            return field[point.y][point.x] = 1;
                        });
                    } else {
                        if (field[head.y][head.x] === 1) {
                            alert("Game over");
                        }
                        if (field[head.y][head.x] === 2) {
                            alert("Game over");
                        }
                        if (field[head.y][head.x] === 3) {
                            this.eatenApple();
                            snake.unshift(head);
                            snake.forEach(function (point, i) {
                                return field[point.y][point.x] = 1;
                            });
                        }

                        if (field[head.y][head.x] === 0) {
                            snake.unshift(head);

                            var tail = snake.pop();
                            field[tail.y][tail.x] = 0;

                            snake.forEach(function (point, i) {
                                return field[point.y][point.x] = 1;
                            });
                        }
                    }

                    this.setState({
                        field: field,
                        snake: snake
                    });
                }
            },
            render: {
                value: function render() {
                    return React.createElement(
                        "div",
                        { className: "snake" },
                        this.state.field.map(function (row) {
                            return React.createElement(
                                "div",
                                { className: "snake__row" },
                                row.map(function (cell) {
                                    return React.createElement("div", { className: b("cell", {
                                            field: cell === 0,
                                            snake: cell === 1,
                                            wall: cell === 2,
                                            fruit: cell === 3

                                        }) });
                                })
                            );
                        })
                    );
                }
            }
        });

        return Snake;
    })(React.Component);

    module.exports = Snake;
});