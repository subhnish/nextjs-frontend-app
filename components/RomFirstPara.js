import React from "react";

function RomFirstPara(props) {
  let {
    phoneName,
    skinVersion,
    region,
    android,
    romVersion,
    status,
    date
  } = props.singleRom;
  let paraforNewStableRelease = `${phoneName} is now getting the ${skinVersion} update on the devices 
  running the ${region} version. The Update is stable and can be used as a daily driver. The update brings the
  ${skinVersion} baked over Android ${android}. It comes with the version ${romVersion}.`;
 
  let paraforNewBetaRelease = `${phoneName} is now getting the ${skinVersion} update on the devices 
  running the ${region} version of MIUI. The Update is getting rolled out in 
  batches so you may or may not get the update today. The update brings the
  ${skinVersion} custom skin baked over Android ${android}. It comes with the version ${romVersion}.`;
  
  let paraForOldRelease = `${skinVersion} ${romVersion} is a stable release for ${phoneName}. 
 It was released on ${date ? date.slice(0, 10) : ""}. 
 The ROM is based on Android ${android} and ${skinVersion}`;

  function identifyHours() {
    let romDate = new Date(date);
    let now = new Date();
    let difference = now - romDate;
    return Math.floor(difference / 1000 / 60 / 60);
  }

  let renderItems = () => {
    if (status === "Beta Stable") return paraforNewBetaRelease;
    else if (date && identifyHours() > 10) return paraForOldRelease;
    else return paraforNewStableRelease;
  };
  return (
    <>
      <p>{renderItems()}</p>
    </>
  );
}


export default RomFirstPara
