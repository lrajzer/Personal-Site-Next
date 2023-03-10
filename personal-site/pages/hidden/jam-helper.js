import styles from "../../styles/JamHelper.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Hidden() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState(null);
  const [sentence, setSentence] = useState(null);
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);

  useEffect(() => {
    // create groups
  }, [sentence]);

  const generate = () => {
    // fill in the blanks
  };

  return (
    <Layout
      title="Gamejam helper"
      isMonoLang={true}
      description="A small ad-libber for use in gamejams"
    >
      <div className={styles.content}>
        <h1 className={styles.heading}>Gamejam helper</h1>
        <p className={styles.desc}>
          This is a small gamejam helper that works in the way ad-libs work by
          filling the gaps with random words from the word base. To use it,
          enter the phrase in the first input box with gaps surrounded with
          brackets, for example: Make a game using {"{mechanic}"} in the theme
          of {"{theme}"}. Then You can add words to each group. When You&apos;re
          done, You can use the button generate to get Your filled out sentence.
        </p>
        <form
          onSubmit={(e) => {
            console.log("Submited!");
            e.preventDefault();
            generate();
          }}
          className={styles.inForm}
        >
          <input
            type="text"
            name="sentence"
            id="sentence"
            placeholder="Please enter the phrase with the {gaps}"
            onChange={(e) => setSentence(e.target.value)}
            className={styles.sentenceIn}
          />
          <div className={styles.wordInDiv}>
            <input
              type="text"
              name="word"
              id="word"
              placeholder="Please enter the word"
              onChange={(e) => setWord(e.target.value)}
              className={styles.wordIn}
            />
            <button
              onClick={(e) => {
                if (word === null) {
                  alert("Please fill in the word >:(");
                  return;
                }
                if (activeGroup === null) {
                  alert("Please select a group >:(");
                  return;
                }
                setWords(words.push([word, activeGroup]));
                setWord(null);
              }}
              className={styles.wordButton}
            >
              Add word
            </button>
          </div>
          <div className={styles.wordInDiv}>
            <label htmlFor="actFunc" className={styles.label}>
              Blank:&nbsp;
            </label>
            <select
              name="emptySpace"
              id="emptySpace"
              placeholder="placeholder"
              onChange={(e) => {
                setActiveGroup(e.target.value);
              }}
              className={styles.groupSelector}
            >
              {groups ? (
                <option value="placeholder" disabled>
                  Please write a sentence to create blanks
                </option>
              ) : (
                ""
              )}
            </select>
          </div>
          <button type="submit" className={styles.wordButton}>
            Generate!
          </button>
        </form>
        <div>Word cloud</div>
      </div>
    </Layout>
  );
}
