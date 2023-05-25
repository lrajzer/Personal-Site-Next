import Layout from "../../../components/Layout";
import pythonSolver from "../../../public/imgs/solver.png";
import Image from "next/image";
import styles from "../../../styles/Projects.module.css";

export default function Python() {
  return (
    <Layout pl={true}>
      <h1 className={styles.projectsTitle}>My projekty w Python&apos;ie</h1>
      <ul className={styles.projectList}>
        <li style={{ marginTop: "5vh", marginBottom: "5vh" }}>
          <h3 className={styles.projectsHeading}>Sudoku solver</h3>
          <div className={styles.projectDetails}>
            <div className={styles.projectImgWrapper}>
              <Image
                src={pythonSolver}
                alt="Image of a sudoku solver in Python."
                fill
                sizes="100vw" />
            </div>
            <p
              className={styles.projectDescription}
              style={{
                textAlign: "justify",
                marginLeft: "1vw",
                width: "calc(100% - 1vw)",
              }}
            >
              Stworzyłem prosty program do rozwiązywania sudoku w Python&apos;ie
              3, z użyciem biblioteki PyGame dla szaty graficznej.
              Zaimplementowałem rekursywny algorytm własnego pomysłu, gdyż cały
              projekt podjąłem jako zadanie dla sprawdzenia moich umiejętności.
              Cały projekty od wymyślenia algorytmu do ostatniego commitu zajął
              około godziny. Algorytm działa w trzech częściach. Najpierw
              znajduje następne puste okienko oraz generuje możliwe wartości.
              Następnie sprawdza które wartości pasują. Jeśli nie znajdzie
              żadnej wartości która pasuje, to wraca się do wcześniejszej
              komórki, aby znaleźć inne wartości.
            </p>
          </div>
        </li>
      </ul>
    </Layout>
  );
}
