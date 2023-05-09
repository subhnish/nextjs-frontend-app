const fs = require("fs");
const prettier = require("prettier");
const axios = require("axios");

const axiosApi = axios.create({
  baseURL: "https://apps.techorfy.com",
});

export default async function generateSiteMap() {let brandsStockRom = async () => {
  let result = await axiosApi.get("/api/stock-rom/");
  return result.data;
};

let brandsStockRomXML = async (brands) => {
  let brandsStockRomXML = brands.map(
    (x) => `<url>
<loc>${`https://apps.techorfy.com/stock-rom/${x.brand}`}</loc>
</url>`
  );
  return brandsStockRomXML;
};

let phonesStockRom = async (brandsStockRom) => {
  let params = [];
  for (let i = 0; i < brandsStockRom.length; i++) {
    let phones = await axiosApi.get(
      `/api/stock-rom/${brandsStockRom[i].brand}`
    );
    phones = phones.data;
    for (let j = 0; j < phones.length; j++) {
      params.push({
          brand: brandsStockRom[i].brand,
          codename: phones[j].codename,
        },
      );
    }
  }
  return params.map(
    (x) => `<url>
<loc>${`https://apps.techorfy.com/stock-rom/${x.brand}/${x.codename}`}</loc>
</url>
`
  );
};

let roms = async (brandsStockRom) => {
  let params = [];

  for (let i = 0; i < brandsStockRom.length; i++) {
    let phones = await axiosApi.get(
      `/api/stock-rom/${brandsStockRom[i].brand}`
    );
    phones = phones.data;
    for (let j = 0; j < phones.length; j++) {
      let romsForPhone = await axiosApi.get(
        `/api/stock-rom/${brandsStockRom[i].brand}/${phones[j].codename}`
      );
      romsForPhone = romsForPhone.data;
      for (let k = 0; k < romsForPhone.length; k++) {
        params.push({
            brand: brandsStockRom[i].brand,
            codename: phones[j].codename,
            version: romsForPhone[k].romVersion,
          },
        );
      }
    }
  }
  console.log(params);
  return params.map(
    (x) => `<url>
<loc>${`https://apps.techorfy.com/stock-rom/${x.brand}/${x.codename}/${x.version}`}</loc>
</url>
`
  );
};

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  let brands = await brandsStockRom();
  let brandsXML = await brandsStockRomXML(brands);
  let phonesXML = await phonesStockRom(brands);
  let romsXML = await roms(brands);
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${brandsXML}
            ${phonesXML}
            ${romsXML}
        </urlset>
    `;
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });
  fs.writeFileSync("public/sitemap.xml", formatted);
})();}
