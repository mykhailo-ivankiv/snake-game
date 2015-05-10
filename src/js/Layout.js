import BEM from "utils/BEM";
import React from "react";

import Snake from "Snake"
import Statistics from "Statistics"

var b = BEM.b("layout");

class Layout extends React.Component {
    render() {
        return <div className={b()}>
            <section className={b("main")}>
                <Snake/>
            </section>
            <aside className={b("additional")}>
                <Statistics/>
            </aside>
        </div>
    }
}

export default  Layout;