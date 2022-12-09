import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3VNMKTW3N3"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());gtag('config', 'G-3VNMKTW3N3', 
           {page_path: window.location.pathname,});`,
        }}
      />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
