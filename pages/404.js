import React from "react";
import { Result, Button } from 'antd';
import LayoutStockRom from "../layouts/stockRom/LayoutStockRom";
import Head from "next/head";

export default function Custom404() {
    return (<React.Fragment>
          <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" href="/stock-rom">Back Home</Button>} />
    </React.Fragment>)
}

Custom404.Layout = LayoutStockRom