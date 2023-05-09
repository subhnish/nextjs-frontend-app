import LayoutStockRom from "../../layouts/stockRom/LayoutStockRom"
import LeftSidebar from "../../layouts/stockRom/LeftSideBar"
import Content from "../../layouts/stockRom/Content"
import React from "react"
import Link from "next/link"
import { Button } from "antd"

export default function StockRom() {

  return(<React.Fragment>
    <LeftSidebar>sdafasdf</LeftSidebar>
    <Content>
      <div className="contentHeading"><h1>Download Flash Files for Android Devices</h1></div>
    <Link href="/stock-rom/xiaomi"><a><Button type="default" size="large">Xiaomi</Button></a></Link>
    </Content>  
    </React.Fragment>)
}

StockRom.Layout = LayoutStockRom