import BEM from "utils/BEM";

var b = BEM.b("snake");

class Snake {
    constructor (container = document.body, config) {
        this.container = container;
        this.model = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.snake = [
            {x:6, y:0},
            {x:5, y:0},
            {x:4, y:0},
            {x:3, y:0},
            {x:2, y:0},
            {x:1, y:0}
        ];

        this.render();

        this.direction = "right"; // "right", "left", "top", "bottom";

        container.addEventListener("keydown", this.changeSnakeDirection.bind(this))

        setInterval(this.updateModel.bind(this), 500);
    }

    changeSnakeDirection(ev) {
        var key = ev.keyCode;

        if (key === 38 && this.direction !== "bottom") { this.direction = "top";} //top
        if (key === 37 && this.direction !== "right") { this.direction = "left";} //left
        if (key === 39 && this.direction !== "left") { this.direction = "right";} //right
        if (key === 40 && this.direction !== "top") { this.direction = "bottom";} //bottom
    }

    updateModel () {
        let factor = { x: 0, y: 0}

        if (this.direction === "top") {factor.y = -1}
        if (this.direction === "bottom") {factor.y = 1}
        if (this.direction === "left") {factor.x = -1}
        if (this.direction === "right") {factor.x = 1}

        let head = {
            x: this.snake[0].x + factor.x,
            y: this.snake[0].y + factor.y
        };

        if (this.model[head.y] === undefined || this.model[head.y][head.x] === undefined) {
            if (head.y < 0) {head.y = this.model.length - 1;}
            if (head.y >= this.model.length) {head.y = 0;}
            if (head.x < 0) {head.x = this.model[0].length - 1;}
            if (head.x >= this.model[0].length) {head.x = 0;}

            this.snake.unshift(head);

            let tail = this.snake.pop();
            this.model[tail.y][tail.x] = 0;

            this.snake.forEach((point, i) => this.model[point.y][point.x] = 1);
        } else {
            if (this.model[head.y][head.x] === 1) { alert("Game over"); }
            if (this.model[head.y][head.x] === 2) { alert("Game over")}
            if (this.model[head.y][head.x] === 3) {
                this.snake.unshift(head);
                this.snake.forEach((point, i) => this.model[point.y][point.x] = 1);
            }

            if (this.model[head.y][head.x] === 0) {
                this.snake.unshift(head);

                let tail = this.snake.pop();
                this.model[tail.y][tail.x] = 0;

                this.snake.forEach((point, i) => this.model[point.y][point.x] = 1);
            }
        }

        this.render();
    }

    render () {
        this.container.innerHTML = `
            <div class="snake">
                 ${this.model.map(row => (
                    `<div class="snake__row">
                        ${row.map(cell => (
                            `<div class="${b('cell', {
                                field : cell === 0,
                                snake : cell === 1,
                                wall  : cell === 2,
                                fruit : cell === 3

                            })}"></div>`
                        )).join("")}
                    </div>`
                 )).join("")}
            </div>
        `;
    }
}

export default Snake;