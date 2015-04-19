define(["exports", "module"], function (exports, module) {
    "use strict";

    var utils = {
        generateMatrix: function generateMatrix(rows, cols, val) {
            var arr = [],
                i = 0,
                j = 0;

            for (i; i < rows; i += 1) {
                arr.push([]);

                arr[i].push(new Array(cols));

                for (j; j < cols; j += 1) {
                    arr[i][j] = val ? val : null;
                }
            }

            return arr;
        },

        generateGrid: function generateGrid(rows, cols, val) {
            var grid = [];

            for (var y = 0; y < rows; y += 1) {
                grid.push([]);

                for (var x = 0; x < cols; x += 1) {
                    grid[y].push(val);
                }
            }

            return grid;
        },

        getRandomPos: function getRandomPos(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    };

    module.exports = utils;
});