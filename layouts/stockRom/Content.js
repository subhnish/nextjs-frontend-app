import React from "react";
import mainStyle from "../../styles/Main.module.css"

export default function Content({children}) {
    return(<React.Fragment>
        <div className={mainStyle.mainContent} style={{}}>
        {children}
        </div>
    </React.Fragment>)
}