let utils = {
    generateMatrix: function(rows, cols, val) {
        let arr = [],
            i = 0,
            j = 0;

        for( i ; i < rows ; i += 1 ){
            arr.push( [] );

            arr[i].push( new Array(cols) );

            for( j ; j < cols ; j += 1 ){
                arr[i][j] = val ? val : null;
            }
        }

        return arr;
    },

    generateGrid: function(rows, cols, val) {
        let grid = [];

        for (let y = 0 ; y < rows ; y += 1) {
            grid.push([]);

            for (let x = 0 ; x < cols ; x += 1 ) {
                grid[y].push(val);
            }
        }

        return grid;
    },

    getRandomPos: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}

export default utils;
