import styles from "../../styles/Home.module.css";
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
    <Layout title="Gamejam helper" isMonoLang={true}>
      <h1>Gamejam helper</h1>
      <p>
        This is a small gamejam helper that works in the way ad-libs work by
        filling the gaps with random words from the word base. To use it, enter
        the phrase in the first input box with gaps surrounded with brackets,
        for example: Make a game using {"{mechanic}"} in the theme of{" "}
        {"{theme}"}. Then You can add words to each group. When You're done, You
        can use the button generate to get Your filled out sentence.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="sentence"
          id="sentence"
          placeholder="Please enter the phrase with the {gaps}"
          onChange={(e) => setSentence(e.target.value)}
        />
        <input
          type="text"
          name="word"
          id="word"
          placeholder="Please enter the word"
          onChange={(e) => setWord(e.target.value)}
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
        >
          Add word
        </button>
        <select
          name="emptySpace"
          id="emptySpace"
          placeholder="Group"
          onChange={(e) => {
            setActiveGroup(e.target.value);
          }}
        >
          <option value="placeholder" disabled>
            Please select a group
          </option>
        </select>
        <button onClick={generate()}>Generate!</button>
      </form>
      <div>Word cloud</div>
    </Layout>
  );
}
