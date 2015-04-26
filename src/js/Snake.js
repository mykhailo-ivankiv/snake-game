import BEM from "utils/BEM";
import React from "react";
import Statistics from "Statistics";

var b = BEM.b("snake");

class Snake extends React.Component {
    constructor () {
        //this.container = container;
        this.state = {
            pointer: 0,
            field : [
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
            ],
            snake : [
                {x:6, y:0},
                {x:5, y:0},
                {x:4, y:0},
                {x:3, y:0},
                {x:2, y:0},
                {x:1, y:0}
            ],
            direction : "right" // "right", "left", "top", "bottom";
        };
        setInterval(this.updateModel.bind(this), 500);
    }

    componentDidMount () {
        document.body.addEventListener("keydown",this.changeSnakeDirection.bind(this));
    }

    componentWillUnmount () {
        document.body.removeEventListener("keydown",this.changeSnakeDirection);
    }

    changeSnakeDirection(ev) {
        var direction = this.state.direction;
        var key = ev.keyCode;

        if (key === 38 && direction !== "bottom") { direction = "top";} //top
        if (key === 37 && direction !== "right") { direction = "left";} //left
        if (key === 39 && direction !== "left") { direction = "right";} //right
        if (key === 40 && direction !== "top") { direction = "bottom";} //bottom

        this.setState({direction});
    }

    updateModel () {
        var field = this.state.field.slice(0); //Clone Array;
        var snake = this.state.snake.slice(0);
        var {direction, pointer} = this.state;


        let factor = { x: 0, y: 0};

        if (direction === "top") {factor.y = -1}
        if (direction === "bottom") {factor.y = 1}
        if (direction === "left") {factor.x = -1}
        if (direction === "right") {factor.x = 1}

        let head = {
            x: snake[0].x + factor.x,
            y: snake[0].y + factor.y
        };

        if (field[head.y] === undefined || field[head.y][head.x] === undefined) {
            if (head.y < 0) {head.y = field.length - 1;}
            if (head.y >= field.length) {head.y = 0;}
            if (head.x < 0) {head.x = field[0].length - 1;}
            if (head.x >= field[0].length) {head.x = 0;}

            snake.unshift(head);

            let tail = snake.pop();
            field[tail.y][tail.x] = 0;

            snake.forEach((point, i) => field[point.y][point.x] = 1);
        } else {
            if (field[head.y][head.x] === 1) { alert("Game over"); }
            if (field[head.y][head.x] === 2) { alert("Game over")}
            if (field[head.y][head.x] === 3) {
                pointer += 1;
                snake.unshift(head);
                snake.forEach((point, i) => field[point.y][point.x] = 1);
            }

            if (field[head.y][head.x] === 0) {
                snake.unshift(head);

                let tail = snake.pop();
                field[tail.y][tail.x] = 0;

                snake.forEach((point, i) => field[point.y][point.x] = 1);
            }
        }

        this.setState({
            field,
            snake,
            pointer
        });
    }

    render () {
        return (
            <div className="snake">
                <Statistics apples = {this.state.pointer}/>

                {this.state.field.map(row =>
                    <div className="snake__row">

                        {row.map(cell => (
                             <div className= {b('cell', {
                                field : cell === 0,
                                snake : cell === 1,
                                wall  : cell === 2,
                                fruit : cell === 3

                            })}></div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Snake;