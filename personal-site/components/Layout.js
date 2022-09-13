import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import Head from "next/head";
import Footer from "./Footer";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout(props) {
  const { asPath } = useRouter();
  console.log(asPath)
  return (
    <>
      <Head>
        <title>{props.title ? props.title : "Michal Rajzer"}</title>
        <meta
          name="description"
          content={
            props.description
              ? props.description
              : "Michal Rajzer's site, created using NextJs and MongoDB"
          }
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
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className={styles.LangSwitch}>
        <h6>
          {props.pl ? (
            <Link href={`${asPath.replace("/pl", "/")}`}>Pl</Link>
          ) : (
            <Link href={`/pl/${asPath}`}>En</Link>
          )}
        </h6>
        <span>
          {props.pl ? (
            <Link href={`${asPath.replace("/pl", "/")}`}>
              Kliknij tu aby zmienić język
            </Link>
          ) : (
            <Link href={`/pl/${asPath}`}>
              Click here to change the language
            </Link>
          )}
        </span>
      </div>
      <main>
        <Navbar inBrackets={props.inBrackets} pl={props.pl} />
        <div className={styles.content}>{props.children}</div>
        <Footer />
      </main>
    </>
  );
}
