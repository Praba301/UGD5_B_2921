"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EMOJIS = ["🍎", "🍌", "🍇", "🍓", "🍑", "🍒", "🥝", "🍍"];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const shuffle = (arr: Card[]) => [...arr].sort(() => Math.random() - 0.5);

export default function Game2() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("memory_best");
    if (saved) setBestMoves(Number(saved));
  }, []);

  const initGame = () => {
    const paired = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
      id: i,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(shuffle(paired));
    setFlipped([]);
    setMoves(0);
    setGameWon(false);
    setGameStarted(true);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      const cardA = cards[a];
      const cardB = cards[b];

      if (cardA.emoji === cardB.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === cardA.id || c.id === cardB.id ? { ...c, isMatched: true } : c
          )
        );
        toast.success("✅ Match!", { autoClose: 800, position: "top-center" });
        setFlipped([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === cardA.id || c.id === cardB.id ? { ...c, isFlipped: false } : c
            )
          );
          setFlipped([]);
        }, 900);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped]);

  useEffect(() => {
    if (gameStarted && cards.length > 0 && cards.every((c) => c.isMatched)) {
      setGameWon(true);
      setGameStarted(false);
      if (bestMoves === null || moves + 1 < bestMoves) {
        const newBest = moves + 1;
        setBestMoves(newBest);
        localStorage.setItem("memory_best", String(newBest));
        toast.success("🏆 Rekor baru!", { autoClose: 2000, position: "top-center" });
      } else {
        toast.success("🎉 Selesai!", { autoClose: 2000, position: "top-center" });
      }
    }
  }, [cards, gameStarted]);

  const handleFlip = (index: number) => {
    if (!gameStarted || flipped.length === 2) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    setCards((prev) =>
      prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
    );
    setFlipped((prev) => [...prev, index]);
  };

  return (
    <div className="memory-container">
      <h2 className="memory-title">🃏 Memory Card</h2>

      <div className="memory-stats">
        <span>🔄 Moves: {moves}</span>
        {bestMoves !== null && <span>🏆 Best: {bestMoves}</span>}
      </div>

      {gameWon && (
        <div className="memory-won">
          🎉 Selesai dalam <strong>{moves}</strong> moves!
        </div>
      )}

      {!gameStarted && (
        <button className="memory-start-btn" onClick={initGame}>
          {gameWon ? "🔁 Main Lagi" : "🎯 Mulai Game"}
        </button>
      )}

      {gameStarted && (
        <div className="memory-grid">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className={`memory-card ${card.isFlipped || card.isMatched ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
              onClick={() => handleFlip(i)}
            >
              <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
