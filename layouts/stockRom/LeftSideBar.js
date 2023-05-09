import React from "react";
import mainStyle from "../../styles/Main.module.css"

export default function LeftSidebar(props) {

    return(<React.Fragment>
        <div className={props.show ? mainStyle.leftSidebar : mainStyle.hidden} style={{}}>
        {props.children}
        </div>
    </React.Fragment>)
}