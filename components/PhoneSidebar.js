import React from "react";
import styles from "../styles/PhoneSidebar.module.css";
import _ from "lodash";

function PhoneSidebar(props) {
  if (!props.roms) return "";
  let { roms: romsData } = props;
  let androidVersion = _.uniq(romsData.map((x) => x.android));
  androidVersion = androidVersion.join(", ");
  let details = () => {
    let latestROM;
    if (romsData.length > 0) {
      latestROM = romsData[0];
    } else return "";

    return (
      <div className={styles.details}>
        <p style={{ maxWidth: "fit-content", margin: "0.5rem auto" }}>
          <strong>Latest Release:</strong>
          <br />
          {latestROM.romVersion} <br />(
          {romsData.length > 0 ? latestROM.ota.date.slice(0, 10) : ""})
        </p>
        <p>
          <strong>Android versions:</strong>
          <br />
          {romsData.length > 0 ? androidVersion : ""}
        </p>
      </div>
    );
  };

 function addDefaultSrc(ev){
    ev.target.src = "/phone_sidebar.png"
  }

  return (
    <div className={styles.smartphoneDetail}>
      <h2>{romsData[0].phoneName}</h2>
      <div className={styles.smartphoneImg}>
        <img src="/phone_sidebar.png" alt="phone" width="125" height="auto" onError={addDefaultSrc} />
      </div>
      {details()}
    </div>
  );
}

export default PhoneSidebar;
