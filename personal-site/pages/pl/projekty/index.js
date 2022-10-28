import Layout from "../../../components/Layout";
import styles from "../../../styles/Projects.module.css";
import Link from "next/link";

export default function Projects() {
  return (
    <Layout pl={true}>
      <div className={styles.mainContent}>
        <h1 className={styles.projectsTitle}>Moje projekty</h1>
        <h2 className={styles.projectsCaption}>
          Najlepiej sprawdzić każdy projekt klikając w nazwe.
          <br />
          Aby zobaczyć więcej projektów z danej kategorii, kliknij w nazwe
          języka.
        </h2>
        <section className={styles.projectsTable}>
          <div className={styles.row}>
            <div className={styles.project}>
              <Link
                href="/pl/projekty/python"
                className={styles.projectsHeading}
              >
                Python
              </Link>
            </div>
            <div className={styles.project}>
              <Link
                href="/pl/projekty/javascript"
                className={styles.projectsHeading}
              >
                Javascript
              </Link>
              <a
                href="https://mypronouns.tech"
                target="_blank"
                rel="noreferrer"
              >
                <h2 className={styles.projectTitle}>MyPronouns.Tech</h2>
                <p className={styles.projectDescription}>
                  Prosta strona i API które mają na celu ułatwić ludziom
                  używanie odpowiednich zaimków.
                </p>
                <embed
                  type="text/html"
                  src="https://mypronouns.tech"
                  className={styles.embededMPT}
                />
              </a>
            </div>
            <div className={styles.project}>
              <Link
                href="/pl/projekty/arduino"
                className={styles.projectsHeading}
              >
                Arduino
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
