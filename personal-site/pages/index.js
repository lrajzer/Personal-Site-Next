import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title="About Michal Rajzer">
      <div className={styles.contentBlockOne}>
        <div className={styles.nameHeader}>
          <div style={{ padding: 0, margin: 0 }}>
            <h1>Hey!</h1>
            <h1>My name is Michał</h1>
            <h1>I'm a fullstack developer!</h1>
          </div>
        </div>
        <svg className={styles.arrows}>
          <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
          <path className={styles.a2} d="M0 20 L30 52 L60 20"></path>
          <path className={styles.a3} d="M0 40 L30 72 L60 40"></path>
        </svg>
        <div className={`${styles.spacer} ${styles.spacerOne}`}></div>
      </div>
      <div>
        <div className={`${styles.textBlock} ${styles.textOne}`}>
          <h2 className={styles.headTwo}>Something more about me.</h2>
          <p>
            Right now I'm attending Computer Science undergraduate studies at
            --REDATCTED--. In highschool I took part in the IB Programme where I
            took higher level computer science, physics and maths courses. I
            started my adventure with programming at 12 when my father
            introduced me to Arduino. Since then I moved toward web development
            but I still dabble in IOT and robotics.
          </p>
        </div>
        <div className={`${styles.spacer} ${styles.spacerTwo}`}></div>
        <div>
          <div className={`${styles.textBlock} ${styles.textTwo}`}>
            <table className={styles.skillList}>
              <caption className={styles.skillCaption}>My skills:</caption>
              <tbody>
                <tr className={styles.skillItem}>
                  <td className={styles.skill}>Python 3</td>
                  <td className={styles.skill}>Experienced</td>
                  <td className={styles.skill}>[▉▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.skillItem}>
                  <td className={styles.skill}>React/NextJS</td>
                  <td className={styles.skill}>Experienced</td>
                  <td className={styles.skill}>[▉▉▉▉▉]</td>
                </tr>
                <tr className={styles.skillItem}>
                  <td className={styles.skill}>TensorFlow 2</td>
                  <td className={styles.skill}>Intermediate</td>
                  <td className={styles.skill}>[▉▉▉▉]</td>
                </tr>
                <tr className={styles.skillItem}>
                  <td className={styles.skill}>C++</td>
                  <td className={styles.skill}>Basic</td>
                  <td className={styles.skill}>[▉▉▉]</td>
                </tr>
                <tr className={styles.skillItem}>
                  <td className={styles.skill}>Arduino</td>
                  <td className={styles.skill}>Basic</td>
                  <td className={styles.skill}>[▉▉▉]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
