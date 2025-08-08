import styles from "../styles/Card.module.css";

export default function Card({ card, onClick }) {
  return (
    <div className={styles["card-item"]} onClick={() => onClick(card)}>
      <img className={styles["card-image"]} src={card.image} alt={card.name} />
      <h3 className={styles["card-name"]}>{card.name}</h3>
      {/* Remove <p>{card.description}</p> if description is not used */}
    </div>
  );
}
