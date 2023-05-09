import Router from "next/router";
import React, { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const {pathname} = Router
        console.log(pathname)
        if(pathname === '/' ){
            Router.push('/stock-rom')
        }
      });
    return (<React.Fragment>Home</React.Fragment>)
}