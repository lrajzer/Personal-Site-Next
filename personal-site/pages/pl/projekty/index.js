import Layout from "../../../components/Layout";
import styles from "../../../styles/Projects.module.css";
import Link from "next/link";
import Image from "next/image";
import pythonSolver from "../../../public/imgs/solver.png";

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
              <a
                href="https://github.com/MichalRajzer/Sudoku-Solver"
                target="_blank"
                rel="noreferrer"
              >
                <h2 className={styles.projectTitle}>Sudoku solver</h2>
                <p className={styles.projectDescription}>
                  Prosty program do rozwiązywania sudoku z użyciem algorytmu z
                  backtrackingiem. Stworzyłem go jako swoisty speedrun.
                </p>
                <div className={styles.projImgWrapper}>
                  <Image
                    src={pythonSolver}
                    alt="Image of a sudoku solver in Python."
                    fill
                    sizes="100vw" />
                </div>
              </a>
            </div>
            <div className={styles.project}>
              <Link
                href="/pl/projekty/javascript"
                className={styles.projectsHeading}
              >
                Javascript
              </Link>
              <a href="https://ttfonte.com/" target="_blank" rel="noreferrer">
                <h2 className={styles.projectTitle}>TTFonte.com</h2>
                <p className={styles.projectDescription}>
                  Prosta strona stworzona w Next.js w ramach mojej pracy.
                </p>
                <embed
                  type="text/html"
                  src="https://ttfonte.com/"
                  className={styles.embededMPT}
                />
              </a>
            </div>
            {/* <div className={styles.project}>
              <Link href="/pl/projekty/cpp" className={styles.projectsHeading}>
                C++
              </Link>
            </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
}
