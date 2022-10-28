import Layout from "../../components/Layout";
import Image from "next/image";
import styles from "../../styles/Projects.module.css";

export default function Javascript() {
  return (
    <Layout>
      <h1 className={styles.projectsTitle}>My Javascript Projects</h1>
      <ul className={styles.projectList}>
        <li style={{ marginTop: "5vh", marginBottom: "5vh" }}>
          <h3 className={styles.projectsHeading}>MyPronouns.tech</h3>
          <div className={styles.projectDetails}>
            <div className={styles.projectImgWrapper}></div>
            <p
              className={styles.projectDescription}
              style={{
                textAlign: "justify",
                marginLeft: "1vw",
                width: "calc(100% - 1vw)",
              }}
            >
              I created a website and an API that allows people and developers
              to use accurate pronouns. The main part of the page is the
              "business card" section which allows users to create small
              personalized pages that can contain anything from their preffered
              pronouns to links to their social media sites. The secondary part
              of the site is an API that takes information from the "business
              card" database to allow developers access to the pronouns of their
              users to enable better personalization. I used Next.js and MongoDB
              as the backbone of this project.
            </p>
          </div>
        </li>
        <li style={{ marginTop: "5vh", marginBottom: "5vh" }}>
          <h3 className={styles.projectsHeading}>My personal site</h3>
          <div className={styles.projectDetails}>
            <p
              className={styles.projectDescription}
              style={{
                textAlign: "justify",
                marginLeft: "1vw",
                width: "calc(100% - 1vw)",
              }}
            >
              This is the site that You're on right now. I created it as my
              portfolio and blog. I used Next.js and MongoDB to create it. It
              uses a mix of server-side rendering and compile-time rendered
              sites. Some additonal technologies that I employed were ReCAPTCHA
              v3, sendgrid, and Auth0.
            </p>
          </div>
        </li>
      </ul>
    </Layout>
  );
}
