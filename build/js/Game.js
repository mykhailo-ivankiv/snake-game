define(["exports", "module", "utils/utils"], function (exports, module, _utilsUtils) {
    "use strict";

    var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

    var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

    var utils = _interopRequire(_utilsUtils);

    // const
    var COLS = 15; // x
    var ROWS = 10; // y
    var EMPTY = 0;
    var SNAKE = 1;
    var FRUIT = 2;
    var LEFT = 0,
        UP = 1,
        RIGHT = 2,
        DOWN = 3;
    /* TODO: move this to config */

    // css classes
    var cssClass = {
        game: "game-container",
        cell: "cell",
        empty: "empty",
        snake: "snake",
        food: "food"
    };

    var Grid = (function () {
        function Grid(rows, cols, val) {
            _classCallCheck(this, Grid);

            this.height = rows; // y
            this.width = cols; // x

            this.body = utils.generateGrid(this.height, this.width, val);
        }

        _createClass(Grid, {
            set: {
                value: function set(x, y, val) {
                    this.body[y][x] = val;
                }
            },
            get: {
                value: function get(x, y) {
                    return this.body[y][x];
                }
            }
        });

        return Grid;
    })();

    var Game = (function () {
        function Game() {
            var container = arguments[0] === undefined ? document.body : arguments[0];

            _classCallCheck(this, Game);

            this.container = this.createContainer(container);

            this.anim;

            this.grid = new Grid(ROWS, COLS, EMPTY);

            this.snake = this.createSnake();
            this.snake.set();
            this.food = this.createFood();
            this.food.set();

            window.setInterval(this.update.bind(this), 500);
        }

        _createClass(Game, {
            createContainer: {
                value: function createContainer(container) {
                    var gameContainer = document.createElement("div");
                    gameContainer.classList.add(cssClass.game);

                    return container.appendChild(gameContainer);;
                }
            },
            createSnake: {
                value: function createSnake() {
                    var snake = Object.create(null);
                    var grid = this.grid;
                    var pos = { x: Math.floor(this.grid.width / 2), y: Math.floor(this.grid.height / 2) };

                    snake.direction = null;
                    snake.last = null;
                    snake.body = new Array();

                    snake.init = function (x, y, dir) {
                        this.direction = dir;
                        this.insert(x, y);
                    };

                    snake.insert = function (x, y) {
                        this.body.unshift({ x: x, y: y });
                        this.last = this.body[0];
                    };

                    snake.remove = function () {
                        return this.body.pop();
                    };

                    snake.set = function (x, y) {
                        this.init(pos.x, pos.y, UP);
                        grid.set(pos.x, pos.y, SNAKE);
                    };

                    return snake;
                }
            },
            createFood: {
                value: function createFood() {
                    var food = Object.create(null);

                    var grid = this.grid;
                    var emptyCells = this.getEmptyCells();

                    food.set = function () {
                        var random = utils.getRandomPos(emptyCells);

                        grid.set(random.x, random.y, FRUIT);
                    };

                    return food;
                }
            },
            getEmptyCells: {
                value: function getEmptyCells() {
                    var emptyCells = [];

                    for (var y = 0; y < this.grid.height; y += 1) {
                        for (var x = 0; x < this.grid.width; x += 1) {
                            if (this.grid.body[y][x] === EMPTY) {
                                emptyCells.push({ x: x, y: y });
                            }
                        }
                    }

                    return emptyCells;
                }
            },
            render: {
                value: function render() {
                    var items = this.grid.body.map(function (row, y) {
                        return "<div class=\"row-" + y + "\">\n                        " + row.map(function (cell, x) {
                            return "\n                                    <div class=\"cell " + (cell === SNAKE ? cssClass.snake : cell === FRUIT ? cssClass.food : cssClass.empty) + "\"\n                                    data-pos-x=\"" + x + "\"\n                                    data-pos-y=\"" + y + "\">\n                                        " + cell + "\n                                    </div>\n                                    ";
                        }).join("") + "\n                    </div>";
                    }).join("");

                    this.container.innerHTML = items;
                }
            },
            update: {
                value: function update() {
                    console.log("Update");
                    // pdate Model

                    this.render();
                }
            }
        });

        return Game;
    })();

    module.exports = Game;
});