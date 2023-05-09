import LayoutStockRom from "../../layouts/stockRom/LayoutStockRom";
import LeftSidebar from "../../layouts/stockRom/LeftSideBar";
import Content from "../../layouts/stockRom/Content";
import React, { useState, useEffect } from "react";
import PhoneCard from "../../components/PhoneCard";
import { Input } from "antd";
import Loader from "../../components/Loader";
import _ from "lodash";
import { useRouter } from "next/router";
import SiteHead from "../../components/SiteHead";
import SiteBreadcrumb from "../../components/Breadcrumb";
import getBrandPhones from "../api/stock-rom/brand";
import { getBrands } from "../api/stock-rom";
const { Search } = Input;

export default function Brand(props) {
  let { phones, brand } = props;
  phones = JSON.parse(phones);
  let [searchValue, setSearchValue] = useState("");
  let [filtered, setFiltered] = useState(phones);
  let { asPath } = useRouter();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (searchValue.length > 0) {
        let value = searchValue.replace(/[^A-Za-z0-9 ]/gi, "");
        let regEx = new RegExp(`${value}`, "i");
        let results = phones.map((x) => {
          let { phoneName } = x;
          let found = regEx.test(phoneName);
          if (found) return x;
        });
        results = results.filter((x) => x);
        setFiltered(results);
      } else setFiltered(phones);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  let renderItems = () => {
    return filtered.map((x) => {
      return (
        <>
          <PhoneCard
            title={x.phoneName}
            imgUrl={x.imageUrl}
            codename={x.codename}
            brand={brand}
          />
        </>
      );
    });
  };
  let metaTitle = `Stock ROMs/Firmware for ${_.capitalize(brand)} devices`;
  let metaDescription = `Download latest Stock ROMs/Firmawares (Flash files) for all ${brand} devices.`;

  return (
    <React.Fragment>
      <SiteHead
        title={metaTitle}
        description={metaDescription}
        pagePermalink={asPath}
      />
      <LeftSidebar show={true}></LeftSidebar>
      <Content>
        <SiteBreadcrumb type="brand" brand={brand} />
        <div className="contentHeading">
          <h1>{`Stock ROMs/Firmware for ${_.capitalize(brand)} devices`}</h1>
        </div>
        <Search
          placeholder={"Search a Phone"}
          onChange={(e) => setSearchValue(e.target.value)}
          enterButton
          style={{ width: "80%", margin: "0 auto 0.5rem auto" }}
        />
        <div className="all-devices">{renderItems()}</div>
      </Content>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  let params = [];
  let brands = await getBrands();
  for (let i = 0; i < brands.length; i++) {
    params.push({ params: { brand: brands[i].brand } });
  }

  return {
    paths: [...params],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  let phones = await getBrandPhones(params);
  return {
    props: {
      phones: JSON.stringify(phones),
      brand: params.brand,
    },
    revalidate: 100,
  };
}

Brand.Layout = LayoutStockRom;
