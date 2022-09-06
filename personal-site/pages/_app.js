import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
