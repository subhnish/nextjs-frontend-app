import React from "react";
import { Breadcrumb } from "antd";
import _ from "lodash";
import Link from "next/link";
export default function SiteBreadcrumb(props) {
  let { type, brand, codename, version } = props;
  if (type==="rom" && !(brand && codename && version)) return "";
  if (type === "phone" && !( brand && codename)) return "";
  if (type === "brand" && !( brand)) return "";

  let renderItems = (
    <React.Fragment>
     { brand ? <Breadcrumb.Item>
        <Link href={`/stock-rom/${brand}`}>
          <a>{_.capitalize(brand)}</a>
        </Link>
      </Breadcrumb.Item> : ""}
     {codename ? <Breadcrumb.Item>
        <Link href={`/stock-rom/${brand}/${codename}`}>
          <a>{codename}</a>
        </Link>
      </Breadcrumb.Item> : ""}
     { version ? <Breadcrumb.Item>
        <Link href={`/stock-rom/${brand}/${codename}/${version}`}>
          <a>{version}</a>
        </Link>
      </Breadcrumb.Item> : ""}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {renderItems}
      </Breadcrumb>
    </React.Fragment>
  );
}
