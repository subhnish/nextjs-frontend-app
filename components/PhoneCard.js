import React from "react";
import { Button, Card } from "antd";
import cardStyles from "../styles/PhoneCard.module.css";
import Link from "next/link"
import _ from "lodash";
import { RightCircleFilled } from "@ant-design/icons";
const { Meta } = Card;

function PhoneCard(props) {
  let { title, codename, brand } = props;


  let phoneCardV2 = () => {
    return (
      <React.Fragment>
        <div className={cardStyles.phonecard} key={_.uniqueId()}>
          <div className={cardStyles.phonecardFirst}>
            <Link href={`/stock-rom/${brand}/${codename}`}>
            <a><h2 className={cardStyles.phoneName}>{title} <small>{`(${codename})`}</small></h2></a>
            </Link>
          </div>
          <div className={cardStyles.phonecardBtn}>
            <Link href={`/stock-rom/${brand}/${codename}`}><a>
              <Button
                type="primary"
                id={_.uniqueId()}
                shape="circle"
                icon={<RightCircleFilled style={{ pointerEvents: "none" }} />}
              />
              </a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return <React.Fragment>{phoneCardV2()}</React.Fragment>;
}

export default PhoneCard
