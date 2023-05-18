import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/ResCaptcha.module.css";

export const ResCaptchaElem = ({ imgs, uid }) => {
  let { tests, train } = imgs;
  const [correct, setCorrect] = useState(null);
  useEffect(() => {
    if (correct === null) return;
    if (correct) {
      alert("Correct!");
    }
  }, [correct]);
  return (
    <div className={styles.resCaptchaWrapper}>
      <div>
        <h1>ResCAPTCHA</h1>
        <p>
          Please type the text that you see in the images below in the order
          from left to right and from top to bottom, separated by commas.
        </p>
      </div>
      <div className={styles.resCaptchaImgs}>
        <div className={styles.imgDiv}>
          {tests.map((img, i) => {
            return (
              <div key={i} className={styles.singImg}>
                <Image src={img} fill={true} style={{ objectFit: "contain" }} />
              </div>
            );
          })}
          {train.map((img, i) => {
            return (
              <div key={i} className={styles.singImg}>
                <Image src={img} fill={true} style={{ objectFit: "contain" }} />
              </div>
            );
          })}
        </div>
      </div>
      <form
        className={styles.resCaptchaForm}
        onSubmit={(e) => {
          console.log("submit");
          e.preventDefault();
          const guess = e.target.guess.value;
          const uid = e.target.uid.value;
          const data = { guess, uid };
          fetch("/api/hidden/rescaptcha/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            ?.then((data) => {
              if (data.error) {
                alert(data.error);
                setCorrect(false);
              } else {
                setCorrect(data.correct);
              }
            });
        }}
        method="post"
      >
        <input
          style={{
            width: "50%",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            margin: "0.5rem",
          }}
          type="text"
          name="guess"
          id="guess"
          placeholder="Please input Your guesses here"
        />
        <input type="hidden" id="uid" name="uid" value={uid} />
        <input
          type="submit"
          value="Submit!"
          style={{
            padding: "0.5rem",
            borderRadius: "0.5rem",
            margin: "0.5rem",
          }}
        />
      </form>
      <p style={{ fontSize: "1rem", textAlign: "center" }}>
        Images from <Link href="https://platesmania.com/">PlatesMania.com</Link>
      </p>
    </div>
  );
};
