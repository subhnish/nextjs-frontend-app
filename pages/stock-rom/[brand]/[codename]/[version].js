import React from "react";
import Content from "../../../../layouts/stockRom/Content";
import LeftSidebar from "../../../../layouts/stockRom/LeftSideBar";
import XiaomiFlashV1 from "../../../../components/FlashingGuide/XiaomiV1";
import ROMCard from "../../../../components/ROMCard";
import RomFirstPara from "../../../../components/RomFirstPara";
import LayoutStockRom from "../../../../layouts/stockRom/LayoutStockRom";
import Loader from "../../../../components/Loader";
import { useRouter } from "next/router";
import SiteHead from "../../../../components/SiteHead";
import SiteBreadcrumb from "../../../../components/Breadcrumb";
import getVersion from "../../../api/stock-rom/[brand]/[codename]/version";
import getCodename from "../../../api/stock-rom/[brand]/codename";
import { getBrands } from "../../../api/stock-rom";
import getBrandPhones from "../../../api/stock-rom/brand";
import Custom404 from "../../../404";
let regionName = {
  MI: "Global",
  IN: "India",
  EU: "Europe",
  ID: "Indonesia",
  RU: "Russia",
  TW: "Taiwan",
};

export default function Rom(props) {
  let { asPath, isFallback } = useRouter();
  if (isFallback)
    return (
      <React.Fragment>
        <Loader />
      </React.Fragment>
    );
  let { singleRom, brand, codename, version } = props;
  singleRom = JSON.parse(singleRom);
  singleRom = singleRom[0];
  const flashingGuide = () => {
    if (props.brand === "xiaomi")
      return <XiaomiFlashV1 singleRom={singleRom} />;
  };

  let metaTitle = `Download ${singleRom.skinVersion} ${singleRom.romVersion} for ${singleRom.phoneName} with flashing Guide`;
  let metaDescription = `Download ${singleRom.skinVersion} ${singleRom.romVersion} for ${singleRom.phoneName} with step by step flashing Guide`;
  return (
    <React.Fragment>
      <SiteHead
        title={metaTitle}
        description={metaDescription}
        pagePermalink={asPath}
      />
      <LeftSidebar>sdfsdf</LeftSidebar>
      <Content>
        <SiteBreadcrumb
          type="rom"
          brand={brand}
          codename={codename}
          version={version}
        />
        <div className="contentHeading">
          <h1>{metaTitle}</h1>
        </div>
        <ROMCard
          title={`MIUI ${singleRom.romVersion}`}
          id={singleRom.romVersion}
          android={singleRom.android}
          skin={singleRom.skinVersion}
          date={singleRom.isOtaUpdated ? singleRom.ota.date.slice(0, 10) : ""}
          region={regionName[singleRom.region]}
          otaLink={singleRom.isOtaUpdated ? singleRom.ota.link : false}
          fastbootLink={
            singleRom.isFastbootUpdated ? singleRom.fastboot.link : false
          }
          otaStatus={singleRom.isOtaUpdated}
          fastbootStatus={singleRom.isFastbootUpdated}
          noCollapse={true}
          type={"romPage"}
        />
        <div className="rom-first-para" style={{ margin: "1rem 0 0 0" }}>
          <RomFirstPara singleRom={singleRom} date={singleRom.ota.date} />
        </div>
        <div className="flash-guide">{flashingGuide()}</div>
      </Content>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  let params = [];
  let brands = await getBrands();

  for (let i = 0; i < brands.length; i++) {
    let phones = await getBrandPhones({ brand: brands[i].brand });
    for (let j = 0; j < phones.length; j++) {
      let romsForPhone = await getCodename({
        brand: brands[i].brand,
        codename: phones[j].codename,
      });
      for (let k = 0; k < romsForPhone.length; k++) {
        params.push({
          params: {
            brand: brands[i].brand,
            codename: phones[j].codename,
            version: romsForPhone[k].romVersion,
          },
        });
      }
    }
  }

  return {
    paths: [...params],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let singleRom = await getVersion(params);
  if (singleRom.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      singleRom: JSON.stringify(singleRom),
      brand: params.brand,
      codename: params.codename,
      version: params.version,
    },
    revalidate: 100,
  };
}

Rom.Layout = LayoutStockRom;
