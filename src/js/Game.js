import utils from "utils/utils";

// const
const COLS = 15; // x
const ROWS = 10; // y
const EMPTY = 0;
const SNAKE = 1;
const FRUIT = 2;
const LEFT = 0, UP = 1, RIGHT = 2, DOWN = 3;
/* TODO: move this to config */

// css classes
let cssClass = {
    game: "game-container",
    cell: "cell",
    empty: "empty",
    snake: "snake",
    food: "food"
}

class Game {
    constructor(container = document.body) {
        this.container = this.createContainer(container);

        this.anim;
        this.boundRecursiveAnim = this.loop.bind(this);
        this.init();
        this.loop();
    }

    createContainer(container) {
        let gameContainer = document.createElement('div');
        gameContainer.classList.add(cssClass.game);

        return container.appendChild(gameContainer);;
    }

    createGrid() {
        let grid = Object.create(null);

        grid.height = null;
        grid.width = null;
        grid.body = [];

        grid.init = function(rows, cols, val) {
            this.height = rows; // y
            this.width = cols; // x

            this.body = utils.generateGrid(this.height, this.width, val);
        }

        grid.set = function(x, y, val) {
            this.body[y][x] = val;
        }

        grid.get = function(x, y) {
            return this.body[y][x];
        }

        return grid;
    }

    createSnake() {
        let snake = Object.create(null);
        let grid = this.grid;
        let pos = {x: Math.floor(this.grid.width / 2), y: Math.floor(this.grid.height / 2)};

        snake.direction = null;
        snake.last = null;
        snake.body = new Array();

        snake.init = function(x, y, dir) {
            this.direction = dir;
            this.insert(x, y);
        }

        snake.insert = function(x, y) {
            this.body.unshift({x: x, y: y});
            this.last = this.body[0];
        }

        snake.remove = function() {
            return this.body.pop();
        }

        snake.set = function(x, y) {
            this.init(pos.x, pos.y, UP);
            grid.set(pos.x, pos.y, SNAKE);
        }

        return snake;
    }

    createFood() {
        let food = Object.create(null);

        let grid = this.grid;
        let emptyCells = this.getEmptyCells();


        food.set = function() {
            let random = utils.getRandomPos(emptyCells);

            grid.set(random.x, random.y, FRUIT);
        }

        return food;
    }

    getEmptyCells() {
        let emptyCells = [];

        for (let y = 0 ; y < this.grid.height ; y += 1) {
            for (let x = 0 ; x < this.grid.width ; x += 1) {
                if (this.grid.body[y][x] === EMPTY) {
                    emptyCells.push({x: x, y: y});
                }
            }
        }

        return emptyCells;
    }

    render() {
        let items = this.grid.body.map((row, y) => {
            return `<div class="row-${y}">
                        ${row.map((cell, x) => {
                            return `
                                    <div class="cell ${cell === SNAKE ? cssClass.snake : cell === FRUIT ? cssClass.food : cssClass.empty}"
                                    data-pos-x="${x}"
                                    data-pos-y="${y}">
                                        ${cell}
                                    </div>
                                    `;
                        }).join("")}
                    </div>`;
        }).join("");

        this.container.innerHTML = items;
    }

    init() {
        this.grid = this.createGrid();
        this.grid.init(ROWS, COLS, EMPTY);
        this.snake = this.createSnake();
        this.snake.set();
        this.food = this.createFood();
        this.food.set();
    }

    loop() {
        this.render();

        this.anim = window.requestAnimationFrame(this.boundRecursiveAnim);
    }

    update() {

    }


}

export default Game;

