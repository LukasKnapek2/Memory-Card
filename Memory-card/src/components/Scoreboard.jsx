import styles from "../styles/Scoreboard.module.css";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className={styles["scoreboard-container"]}>
      <div className={styles["score-item"]}>
        <span>Current Score: </span>
        <span className={styles["score-value"]}>{score}</span>
      </div>
      <div className={styles["score-item"]}>
        <span>High Score: </span>
        <span className={styles["score-value"]}>{highScore}</span>
      </div>
    </div>
  );
}
