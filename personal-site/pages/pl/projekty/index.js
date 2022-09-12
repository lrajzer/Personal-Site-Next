import Layout from "../../../components/Layout";
import styles from "../../../styles/Projects.module.css";
import Link from "next/link";

export default function Projects() {
  return (
    <Layout pl={true}>
      <div className={styles.mainContent}>
        <h1 className={styles.projectsTitle}>My projects</h1>
        <h2 className={styles.projectsCaption}>
          It&apos;s best to check out each project by clicking on it&apos;s
          name.
          <br />
          To explore more projects from each category, click on the language.
        </h2>
        <section className={styles.projectsTable}>
          <div className={styles.row}>
            <div className={styles.project}>
              <Link href="/projects/python">
                <a className={styles.projectsHeading}>Python</a>
              </Link>
            </div>
            <div className={styles.project}>
              <Link href="/projects/javascript">
                <a className={styles.projectsHeading}>Javascript</a>
              </Link>
              <a
                href="https://mypronouns.tech"
                target="_blank"
                rel="noreferrer"
              >
                <h2 className={styles.projectTitle}>MyPronouns.Tech</h2>
                <p className={styles.projectDescription}>
                  This is a simple webpage and API desinged to help people use
                  correct pronouns instead of the generic they/them
                </p>
                <embed
                  type="text/html"
                  src="https://mypronouns.tech"
                  className={styles.embededMPT}
                />
              </a>
            </div>
            <div className={styles.project}>
              <Link href="/projects/arduino">
                <a className={styles.projectsHeading}>Arduino</a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
