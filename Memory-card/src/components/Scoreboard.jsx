export default function Scoreboard({ score, highScore }) {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Current Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}