import Head from "next/head";
import React from "react";

export default function SiteHead({title, description, pagePermalink}) {
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" key="ogtype" />
        <meta property="og:title" content={title} key="ogtitle"/>
        <meta property="og:description" content={description} key="ogdesc"/>
        <meta property="og:image" content="https://apps.techorfy.com/og_image.png" key="ogimage"/>
        <meta property="og:url" content={`https://apps.techorfy.com${pagePermalink}`} key="ogurl"/>
        <meta property="og:site_name" content="Techorfy Apps" key="ogsitename"/>
      </Head>
    </React.Fragment>
  );
}
