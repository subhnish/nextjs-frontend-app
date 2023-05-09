import React from "react";
import mainStyle from "../../styles/Main.module.css"
import Nav from "../shared/Nav";
import Head from "next/head"
export default function LayoutStockRom(props) {
    return(<React.Fragment>
        <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Nav />
        <div className={mainStyle.main}>
            {props.children}
        </div>
    </React.Fragment>)
}