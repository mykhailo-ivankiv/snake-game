import Reflux from "reflux";
import SnakeActions from "Actions/SnakeActions"


var _pointer = 0;

var Statistics = Reflux.createStore({
    listenables : SnakeActions,

    getApplesPointer () {
        return _pointer;
    },

    onEatenApple () {
        _pointer +=1;
        this.trigger(_pointer);
    }

})

export default Statistics;