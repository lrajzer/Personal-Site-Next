import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import Head from "next/head";
import Footer from "./Footer";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({
  title,
  description,
  pl,
  inBrackets,
  children,
  isMonoLang,
  otherLang,
  style,
}) {
  const { asPath } = useRouter();
  // console.log(asPath.split("/"));
  const altEngPaths = {
    "": "pl",
    blog: `/pl${asPath}`,
    contact: "/pl/kontakt",
    projects: `/pl/projekty/${
      asPath.split("/")[3] ? asPath.split("/")[3] : ""
    }`,
    undefined: "pl",
  };
  const altPlPaths = {
    undefined: "/",
    blog: `${asPath.replace("/pl", "/")}`,
    kontakt: "/contact",
    projekty: "/projects",
  };
  // console.log(asPath);
  return (
    <>
      <Head>
        <title>{title ? title : "Michal Rajzer"}</title>
        <meta property="og:title" content={title ? title : "Michal Rajzer"} />
        <meta
          property="description"
          content={
            description
              ? description
              : "Michal Rajzer's site, created using NextJs and MongoDB"
          }
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : "Michal Rajzer's site, created using NextJs and MongoDB"
          }
          key="desc"
        />
        <meta
          property="twitter:description"
          content={
            description
              ? description
              : "Michal Rajzer's site, created using NextJs and MongoDB"
          }
        ></meta>
        <meta property="og:locale" content={pl ? "pl_PL" : "en_GB"} />
        {isMonoLang ? (
          ""
        ) : (
          <meta
            property="og:locale:alternate"
            content={pl ? "en_GB" : "pl_PL"}
          />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://michalrajzer.com" />
        <meta
          property="og:site_name"
          content="Michal Rajzer's personal website"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta property="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content={title ? title : "Michal Rajzer"}
        ></meta>

        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {isMonoLang ? (
        ""
      ) : otherLang !== undefined ? (
        <div className={styles.LangSwitch}>
          <h6>
            {pl ? (
              <Link href={otherLang}>Pl</Link>
            ) : (
              <Link href={otherLang}>En</Link>
            )}
          </h6>
          <span>
            {pl ? (
              <Link
                href={
                  altPlPaths[
                    asPath.split("/")[2] ? asPath.split("/")[2] : "undefined"
                  ]
                }
              >
                Kliknij tu aby zmienić język
              </Link>
            ) : (
              <Link href={altEngPaths[asPath.split("/")[1]]}>
                Click here to change the language
              </Link>
            )}
          </span>
        </div>
      ) : (
        <div className={styles.LangSwitch}>
          <h6>
            {pl ? (
              <Link href={altPlPaths[asPath.split("/")[2]]}>Pl</Link>
            ) : (
              <Link href={altEngPaths[asPath.split("/")[1]]}>En</Link>
            )}
          </h6>
          <span>
            {pl ? (
              <Link
                href={
                  altPlPaths[
                    asPath.split("/")[2] ? asPath.split("/")[2] : "undefined"
                  ]
                }
              >
                Kliknij tu aby zmienić język
              </Link>
            ) : (
              <Link href={altEngPaths[asPath.split("/")[1]]}>
                Click here to change the language
              </Link>
            )}
          </span>
        </div>
      )}

      <main>
        <Navbar inBrackets={inBrackets} pl={pl} />
        <div className={styles.content} style={style}>
          {children}
        </div>
        <Footer pl={pl} />
      </main>
    </>
  );
}
