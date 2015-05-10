import BEM from "utils/BEM";
import React from "react";

import StatisticsStorage from "Storages/Statictics"

class Statistics extends React.Component {
    constructor () {
        super();
        this.state = {
            apples: StatisticsStorage.getApplesPointer()
        }
    }

    onStatusChange () {
        this.setState({
            apples : StatisticsStorage.getApplesPointer()
        });
    }

    componentDidMount() {
        this.unsubscribe = StatisticsStorage.listen(this.onStatusChange.bind(this));
    }

    render () {
        return <div className="statistics">
            Захавано яблок :{this.state.apples}
        </div>
    }

}

export default Statistics;