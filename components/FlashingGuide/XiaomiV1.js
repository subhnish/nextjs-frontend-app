import { Divider } from "antd";
import Image from 'next/image'
let center = {width: "fit-content", margin: "0 auto"}

function XiaomiFlashV1(props) {
  let { phoneName } = props.singleRom;
  return (
    <>
      <Divider />
      <h2>How to flash Stock ROM in {phoneName}</h2>
      <h3 className="center" style={center}>
        <Divider><strong>Flash the OTA Package</strong></Divider>
      </h3>
      <p>
        If you want to Upgrade your MIUI then Use this Method. Make sure to
        Download the OTA package only, Fastboot ROM will not work with Updater.
      </p>
      <Image
      layout="responsive"
      width={1024}
      height={576}
        alt="flash xiaomi OTA rom with updater"
        src="https://cdn.techorfy.com/wp-content/uploads/2018/08/miui-updater-apps-1024x576.jpg"
      />
      <p>
        <strong>Step 1:</strong> Unlock the Recovery options to manually install
        the Update. Open the Updater app and tap on the MIUI logo 7-8 times.
      </p>
      <p>
        <strong>Step 2:</strong> Download the OTA package given above, and Place
        it in /downloaded_rom folder of Internal Storage of your Device
      </p>
      <p>
        <strong>Step 3:</strong> Launch the Updater app and Click on three dots
        on the right corner, click on “Choose Update Package”
      </p>
      <p>
        <strong>Step 4:</strong> Select the file which you placed in
        /downloaded_rom. The installation will begin and the device will
        automatically boot into new MIUI.
      </p>
      <Divider />
      <h3 className="center" style={center}>
        <Divider><strong>Flash the Fastboot Package</strong></Divider>
      </h3>
      <p>
        This Method needs an Unlocked Bootloader. If your Device is locked then
        <a href="https://en.miui.com/unlock/"> go here</a> and Unlock it.
      </p>
      <p>Download the MI Flash tool from <a href="https://xiaomiflashtool.com/">here</a> and install it.</p>
      <p>Download the Fastboot ROM given above.</p>
      <Image
      layout="responsive"
        alt="flash xiaomi OTA rom with updater"
        src="https://cdn.techorfy.com/wp-content/uploads/2018/08/mi-flash-tools-1024x650.png"
        width={1024}
        height={650}
      />
      <p><strong>Step 1:</strong> Decompress the Downloaded ROM file</p>
      <p><strong>Step 2:</strong> Boot the Poco M2 Pro into Fastboot mode by pressing Volume down
        + Power Button at the same time and Connect it to PC via USB Cable
      </p>
      <p><strong>Step 3:</strong> Open the Mi flash tool and in the Address bar, Paste the path of
        Decompressed ROM file. You can copy the Path by going into the folder
        and click on the Top bar.
      </p>
      <p><strong>Step 4:</strong> After Pasting the Path of decompressed ROM file, Click on
        “Refresh” button and After that click on “Flash” Button
      </p>
    </>
  );
}


export default XiaomiFlashV1
