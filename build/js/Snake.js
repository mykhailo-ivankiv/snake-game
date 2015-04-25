define(["exports", "module", "utils/BEM", "react"], function (exports, module, _utilsBEM, _react) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var BEM = _interopRequire(_utilsBEM);

    var React = _interopRequire(_react);

    var b = BEM.b("snake");

    var Snake = (function () {
        function Snake(_x, config) {
            var container = arguments[0] === undefined ? document.body : arguments[0];

            _classCallCheck(this, Snake);

            this.container = container;
            this.model = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

            this.snake = [{ x: 6, y: 0 }, { x: 5, y: 0 }, { x: 4, y: 0 }, { x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }];

            this.render();

            this.direction = "right"; // "right", "left", "top", "bottom";

            container.addEventListener("keydown", this.changeSnakeDirection.bind(this));

            setInterval(this.updateModel.bind(this), 500);
        }

        _createClass(Snake, {
            changeSnakeDirection: {
                value: function changeSnakeDirection(ev) {
                    var key = ev.keyCode;

                    if (key === 38 && this.direction !== "bottom") {
                        this.direction = "top";
                    } //top
                    if (key === 37 && this.direction !== "right") {
                        this.direction = "left";
                    } //left
                    if (key === 39 && this.direction !== "left") {
                        this.direction = "right";
                    } //right
                    if (key === 40 && this.direction !== "top") {
                        this.direction = "bottom";
                    } //bottom
                }
            },
            updateModel: {
                value: function updateModel() {
                    var _this = this;

                    var factor = { x: 0, y: 0 };

                    if (this.direction === "top") {
                        factor.y = -1;
                    }
                    if (this.direction === "bottom") {
                        factor.y = 1;
                    }
                    if (this.direction === "left") {
                        factor.x = -1;
                    }
                    if (this.direction === "right") {
                        factor.x = 1;
                    }

                    var head = {
                        x: this.snake[0].x + factor.x,
                        y: this.snake[0].y + factor.y
                    };

                    if (this.model[head.y] === undefined || this.model[head.y][head.x] === undefined) {
                        if (head.y < 0) {
                            head.y = this.model.length - 1;
                        }
                        if (head.y >= this.model.length) {
                            head.y = 0;
                        }
                        if (head.x < 0) {
                            head.x = this.model[0].length - 1;
                        }
                        if (head.x >= this.model[0].length) {
                            head.x = 0;
                        }

                        this.snake.unshift(head);

                        var tail = this.snake.pop();
                        this.model[tail.y][tail.x] = 0;

                        this.snake.forEach(function (point, i) {
                            return _this.model[point.y][point.x] = 1;
                        });
                    } else {
                        if (this.model[head.y][head.x] === 1) {
                            alert("Game over");
                        }
                        if (this.model[head.y][head.x] === 2) {
                            alert("Game over");
                        }
                        if (this.model[head.y][head.x] === 3) {
                            this.snake.unshift(head);
                            this.snake.forEach(function (point, i) {
                                return _this.model[point.y][point.x] = 1;
                            });
                        }

                        if (this.model[head.y][head.x] === 0) {
                            this.snake.unshift(head);

                            var tail = this.snake.pop();
                            this.model[tail.y][tail.x] = 0;

                            this.snake.forEach(function (point, i) {
                                return _this.model[point.y][point.x] = 1;
                            });
                        }
                    }

                    this.render();
                }
            },
            render: {
                value: function render() {
                    this.container.innerHTML = "\n            <div class=\"snake\">\n                 " + this.model.map(function (row) {
                        return "<div class=\"snake__row\">\n                        " + row.map(function (cell) {
                            return "<div class=\"" + b("cell", {
                                field: cell === 0,
                                snake: cell === 1,
                                wall: cell === 2,
                                fruit: cell === 3

                            }) + "\"></div>";
                        }).join("") + "\n                    </div>";
                    }).join("") + "\n            </div>\n        ";
                }
            }
        });

        return Snake;
    })();

    module.exports = Snake;
});