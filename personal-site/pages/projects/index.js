import Layout from "../../components/Layout";
import styles from "../../styles/Projects.module.css";
import Link from "next/link";

export default function Projects() {
  return (
    <Layout>
      <div className={styles.mainContent}>
        <h1 className={styles.projectsTitle}>My projects</h1>
        <table className={styles.projectsTable}>
          <caption className={styles.projectsCaption}>
            It&apos;s best to check out each project by clicking on it&apos;s
            name.
            <br />
            To explore more projects from each category, click on the language.
          </caption>
          <tbody>
            <tr>
              <th className={styles.projectsHeading}>
                <Link href="/projects/python"> Python </Link>
              </th>
              <th className={styles.projectsHeading}>
                <Link href="/projects/javascript">Javascript</Link>
              </th>
              <th className={styles.projectsHeading}>
                <Link href="/projects/arduino">Arduino</Link>
              </th>
            </tr>
            <tr>
              <td className={styles.project}></td>
              <td className={styles.project}>
                <a href="https://mypronouns.tech" target="_blank" rel='noreferrer'>
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
              </td>
              <td className={styles.project}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
