import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as gtag from "../components/GA";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6Lcm47khAAAAAEUsXWelWIYiAS9lJlOxy2JLJM4G"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        id="gtag"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
