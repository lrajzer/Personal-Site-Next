import Layout from "../../components/Layout";
import Image from "next/legacy/image";
import styles from "../../styles/Projects.module.css";
import pythonSolver from "../../public/imgs/solver.png";

export default function Python() {
  return (
    <Layout title="Python projects" description="Check out my Python projects!">
      <h1 className={styles.projectsTitle}>My Python Projects</h1>
      <ul className={styles.projectList}>
        <li style={{ marginTop: "5vh", marginBottom: "5vh" }}>
          <h3 className={styles.projectsHeading}>Sudoku solver</h3>
          <div className={styles.projectDetails}>
            <div className={styles.projectImgWrapper}>
              <Image
                src={pythonSolver}
                alt="Image of a sudoku solver in Python."
                layout="fill"
                style={{ width: "100%", height: "unset" }}
              />
            </div>
            <p
              className={styles.projectDescription}
              style={{
                textAlign: "justify",
                marginLeft: "1vw",
                width: "calc(100% - 1vw)",
              }}
            >
              I created a simple sudoku solver in Python 3 using the Pygame
              library for the graphical side. I implemented the recursive
              backtracking algorithm on my own, as I had tried to write this
              code as quickly as I could, and it took me about an hour to create
              the whole solution, from the algorithm design to the finished
              working product. The algorithm works in 3 parts. First it finds
              the next cell to fill, then it generates the possible values, and
              then it checks the values. In the event that no values fit, it
              then backtracks change the previous values.
            </p>
          </div>
        </li>
      </ul>
    </Layout>
  );
}
