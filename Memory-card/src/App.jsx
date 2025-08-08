import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedCardIds, setClickedCardIds] = useState(new Set());
  const shuffleCards = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  useEffect(() => {
    const cachedData = localStorage.getItem("pokemonCards");

    if (cachedData) {
      setCards(shuffleCards(JSON.parse(cachedData)));
      setLoading(false);
    } else {
      const fetchPokemon = async () => {
        try {
          const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=12"
          );
          const data = await response.json();

          const pokemonCards = data.results.map((pokemon, index) => {
            const id = index + 1;
            const capitalizedName =
              pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            return {
              id: id,
              name: capitalizedName,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            };
          });
          localStorage.setItem("pokemonCards", JSON.stringify(pokemonCards));
          setCards(shuffleCards(pokemonCards));
        } catch (error) {
          console.error("Failed to fetch Pokémon data:", error);
        } finally {
          setLoading(false);
        }
      };
      const fetchCards = async () => {
        await fetchPokemon();
      };
      fetchCards();
    }
  }, []);

  const handleCardClick = (card) => {
    if (clickedCardIds.has(card.id)) {
      setScore(0);
      setClickedCardIds(new Set());
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setHighScore((prevHighScore) => Math.max(prevHighScore, newScore));
      setClickedCardIds(new Set(clickedCardIds).add(card.id));
    }

    setCards(shuffleCards(cards));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Pokémon Memory Game</h1>
        <p className="app-subtitle">
          Click each Pokémon only once to increase your score!
        </p>
      </header>
      <Scoreboard score={score} highScore={highScore} />
      {loading && <div className="loading-text">Loading...</div>}
      <main className="app-main">
        <div className="card-grid">
          {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </main>
    </div>
  );
}
