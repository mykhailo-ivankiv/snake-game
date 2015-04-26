import BEM from "utils/BEM";
import React from "react";

class Statistics extends React.Component {
    constructor () {}

    render () {
        return <div className="statistics">
            Захавано яблок :{this.props.apples}
        </div>
    }

}

export default Statistics;