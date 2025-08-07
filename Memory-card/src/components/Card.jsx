
export default function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.image} alt={card.name} />
      <h3>{card.name}</h3>
      <p>{card.description}</p>
    </div>
  );
}