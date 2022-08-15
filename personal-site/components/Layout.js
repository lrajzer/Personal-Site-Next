import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import Head from "next/head";
import Footer from "./Footer";

export default function Layout(props) {
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
      <main>
        <Navbar />
        <div className={styles.content}>{props.children}</div>
        <Footer />
      </main>
    </>
  );
}
