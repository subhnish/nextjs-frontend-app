import React from "react";
import ROMCard from "../../../components/ROMCard";
import { Skeleton } from "antd";
import { Divider } from "antd";
import _ from "lodash";
import Content from "../../../layouts/stockRom/Content";
import LayoutStockRom from "../../../layouts/stockRom/LayoutStockRom";
import LeftSidebar from "../../../layouts/stockRom/LeftSideBar";
import PhoneSidebar from "../../../components/PhoneSidebar";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import SiteHead from "../../../components/SiteHead";
import SiteBreadcrumb from "../../../components/Breadcrumb";
import getCodename from "../../api/stock-rom/[brand]/codename";
import getBrandPhones from "../../api/stock-rom/brand";
import { getBrands } from "../../api/stock-rom/index";

let regionName = {
  MI: "Global",
  IN: "India",
  EU: "Europe",
  ID: "Indonesia",
  RU: "Russia",
  TW: "Taiwan",
  EEA: "Global",
  global: "Global",
};

export default function Phone(props) {
  let { isFallback } = useRouter();
  if (isFallback)
    return (
      <React.Fragment>
        <Loader />
      </React.Fragment>
    );
  let { roms, brand, codename, imageUrl } = props;
  roms = JSON.parse(roms);
  let { asPath } = useRouter();
  let regions = roms.map((x) => {
    return x.region;
  });
  regions = _.uniq(regions);
  let regionsCountryNames = regions.map((x) => regionName[x]).join(", ");

  let renderRomsV2 = regions.map((x) => {
    return (
      <>
        <div
          className="region-heading"
          style={{ maxWidth: "fit-content", margin: "0 auto" }}
        >
          <h2>{regionName[x] ? regionName[x] : x}</h2>
        </div>
        {roms.map((y) => {
          if (x !== y.region) return "";
          return (
            <ROMCard
              title={`MIUI ${y.romVersion}`}
              id={y.romVersion}
              version={y.romVersion}
              android={y.android}
              skin={y.skinVersion}
              date={
                y.ota.date.slice(0, 10)
                  ? y.ota.date.slice(0, 10)
                  : y.fastboot.date.slice(0, 10)
              }
              region={y.region}
              otaLink={y.ota.link ? y.ota.link : false}
              fastbootLink={y.fastboot.link ? y.fastboot.link : false}
              otaStatus={y.isOtaUpdated}
              fastbootStatus={y.isFastbootUpdated}
              type={"phone"}
              brand={brand}
              codename={codename}
              imageUrl={imageUrl}
            />
          );
        })}
        <Divider />
      </>
    );
  });

  let metaTitle = `Download ${roms[0].phoneName} Flash files (ROM/Firmware) with flashing guide.`;
  let metaDescription = `Download the latest Stock ROMs/Firmware for your ${roms[0].phoneName} with flashing Guide.`;

  return (
    <React.Fragment>
      <SiteHead
        title={metaTitle}
        description={metaDescription}
        pagePermalink={asPath}
      />
      <LeftSidebar show={true}>
        <PhoneSidebar roms={roms} />
      </LeftSidebar>
      <Content>
        <SiteBreadcrumb type="phone" brand={brand} codename={codename} />
        <div className="contentHeading">
          <h1>
            Download latest {roms[0].phoneName} Flash Files (ROM/Firmware) with
            Flashing Guide
          </h1>
        </div>
        <div className="phoneDetail">
          <p>
            <strong>Device Codename:</strong> {codename}
          </p>
          <p>
            <strong>Regions Available:</strong> {regionsCountryNames}
          </p>
        </div>
        <div>
          <p>
            These are Stock ROMs or Firmwares that can be flashed with either
            the Recovery, Fastboot or Tool provided by the manufacturer.
          </p>
          <ul>
            <li>
              ROMs will be downloaded from official servers, we do not host
              these files
            </li>
            <li>Flashing Instructions are provided with every ROM</li>
            <li>
              Make sure to Download the Right ROM for your device, identify your
              device with codename instead of the name of the phone
            </li>
            <li>
              If you find any wrong link for a ROM or any other bug, you can
              report it by clicking on "Report a bug" on Navigation bar
            </li>
          </ul>
        </div>
        {renderRomsV2.length > 0 ? renderRomsV2 : <Skeleton active />}
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
      params.push({
        params: { brand: brands[i].brand, codename: phones[j].codename },
      });
    }
  }
  return {
    paths: [...params],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let roms = await getCodename(params);
  if (roms.length === 0) return { notFound: true };
  return {
    props: {
      roms: JSON.stringify(roms),
      brand: params.brand,
      codename: params.codename,
    },
    revalidate: 100,
  };
}

Phone.Layout = LayoutStockRom;
