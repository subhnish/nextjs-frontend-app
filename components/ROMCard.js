import React, { useState } from "react";
import styles from "../styles/ROMCard.module.css";
import { Button } from "antd";
import { DownCircleFilled, DownloadOutlined } from "@ant-design/icons";
import _ from "lodash";
import Link from "next/link";

export default function ROMCard(props) {
  let { title, noCollapse, brand, codename, type } = props;
  const [collapsed, setCollapsed] = useState(true);

  function handleRomCardClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (collapsed === false) setCollapsed(true);
    if (collapsed === true) setCollapsed(false);
  }

  function collapsedStatus() {
    if (noCollapse) return;
    else if (collapsed === true) return styles.hidden;
    else return "slideBottom";
  }

  let romHeading =
    type === "romPage" ? (
      <h2 className={styles.romVersionHeading}>{title}</h2>
    ) : (
      <h3 className={styles.romVersionHeading}>{title}</h3>
    );

  return (
    <>
      <div className={styles.romcard} key={_.uniqueId()}>
        <Link href={`/stock-rom/${brand}/${codename}/${props.version}`}>
          <a>
            <div className={styles.romcardFirst}>{romHeading}</div>
          </a>
        </Link>
        <div className={styles.expandBtn}>
          <Button
            onClickCapture={handleRomCardClick}
            type="primary"
            id={_.uniqueId()}
            shape="circle"
            className={styles.expandBtn}
            icon={
              <DownCircleFilled
                rotate={collapsed === true ? "0" : "180"}
                style={{ pointerEvents: "none" }}
              />
            }
          />
        </div>
      </div>
      <div className={`${styles.romcardInfo} ${collapsedStatus()}`}>
        <div className={`${styles.romcardInfoFirst} ${styles.itemA}`}>
          <p>
            <strong>Android version:</strong> {props.android}
          </p>
          <p>
            <strong>Region:</strong> {props.region}
          </p>
        </div>
        <div className={`${styles.romcardInfoSecond} ${styles.itemB}`}>
          <p>
            <strong>Added on:</strong> {props.date}
          </p>
          <p>
            <strong>Skin Version:</strong> {props.skin}
          </p>
        </div>
        <div className={`${styles.romDownloadBtn} ${styles.itemC}`}>
          <Button
            className={styles.downloadBtn}
            type="primary"
            disabled={!props.otaStatus ? true : false}
            icon={<DownloadOutlined style={{ pointerEvents: "none" }} />}
            href={props.otaLink ? props.otaLink : ""}
          >
            {props.otaStatus ? "Download OTA" : "OTA Not available"}
          </Button>
        </div>
        <div className={`${styles.romcardInfoThird} ${styles.itemD}`}>
          <Button
            className={styles.downloadBtn}
            type="primary"
            target="_blank"
            disabled={!props.fastbootStatus ? true : false}
            icon={<DownloadOutlined style={{ pointerEvents: "none" }} />}
            href={props.fastbootLink ? (props.fastbootLink).replace("https" || "http", "https") : ""}
          >
            {props.fastbootStatus
              ? "Download Fastboot"
              : "Fastboot Not available"}
          </Button>
        </div>
        {props.type === "phone" ? (
          <div className={`${styles.linkBtn} ${styles.itemE}`}>
            <Button
              className={styles.linkBtn}
              type="primary"
              style={{ borderColor: "grey" }}
            >
              <Link href={`/stock-rom/${brand}/${codename}/${props.version}`}>
                <a>Flashing Instructions</a>
              </Link>
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
