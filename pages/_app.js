import Head from "next/head";
import React from "react";
import "../styles/globals.css";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <Layout>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-67748801-4"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-67748801-4');
            `,
          }}
        />
        <style>{dom.css()}</style>
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
