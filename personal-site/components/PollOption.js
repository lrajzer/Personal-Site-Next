import Styles from "../styles/Poll.module.css";

export default function PollOption({
  text,
  handleVote,
  displayResults,
  votes,
}) {
  if (!displayResults) {
    return (
      <div className={Styles.pollOption}>
        <h1>{text}</h1>
      </div>
    );
  } else {
    return (
      <div className={Styles.pollOption}>
        <h1>{text}</h1> <p>{votes}</p>
      </div>
    );
  }
}
