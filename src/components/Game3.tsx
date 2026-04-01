"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Game3() {
  const [secret, setSecret] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [maxAttempts] = useState<number>(7);
  const [hint, setHint] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);
  const [history, setHistory] = useState<{ val: number; hint: string }[]>([]);
  const [bestAttempts, setBestAttempts] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("guess_best");
    if (saved) setBestAttempts(Number(saved));
  }, []);

  const startGame = () => {
    setSecret(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setHint("");
    setHistory([]);
    setGameOver(false);
    setWon(false);
    setGameStarted(true);
    toast.info("🎯 Tebak angka 1–100!", { autoClose: 1500, position: "top-center" });
  };

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      toast.warning("Masukkan angka 1–100!", { autoClose: 1000, position: "top-center" });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    let newHint = "";
    if (num === secret) {
      newHint = "🎉 Tepat!";
      setWon(true);
      setGameOver(true);
      setGameStarted(false);
      toast.success(`🏆 Benar! ${newAttempts} percobaan`, { autoClose: 2000, position: "top-center" });
      if (bestAttempts === null || newAttempts < bestAttempts) {
        setBestAttempts(newAttempts);
        localStorage.setItem("guess_best", String(newAttempts));
      }
    } else if (newAttempts >= maxAttempts) {
      newHint = num < secret ? "⬆️ Terlalu kecil" : "⬇️ Terlalu besar";
      setGameOver(true);
      setGameStarted(false);
      toast.error(`😢 Game Over! Jawabannya: ${secret}`, { autoClose: 2500, position: "top-center" });
    } else {
      newHint = num < secret ? "⬆️ Terlalu kecil" : "⬇️ Terlalu besar";
    }

    setHint(newHint);
    setHistory((prev) => [{ val: num, hint: newHint }, ...prev]);
    setGuess("");
  };

  const remaining = maxAttempts - attempts;
  const progressPct = (attempts / maxAttempts) * 100;

  return (
    <div className="guess-container">
      <h2 className="guess-title">🔢 Tebak Angka</h2>
      <p className="guess-sub">Tebak angka antara 1 – 100</p>

      <div className="guess-stats">
        <span>🎯 Sisa: {gameStarted ? remaining : maxAttempts}</span>
        {bestAttempts !== null && <span>🏆 Best: {bestAttempts}x</span>}
      </div>

      {gameStarted && (
        <div className="guess-progress-wrap">
          <div
            className="guess-progress-bar"
            style={{
              width: `${progressPct}%`,
              background: progressPct > 70 ? "#ef4444" : progressPct > 40 ? "#f59e0b" : "#22c55e",
            }}
          />
        </div>
      )}

      {gameOver && (
        <div className={`guess-result ${won ? "won" : "lost"}`}>
          {won ? `🎉 Benar! Kamu menebak dalam ${attempts} percobaan!` : `😢 Game Over! Jawabannya: ${secret}`}
        </div>
      )}

      {!gameStarted && (
        <button className="guess-start-btn" onClick={startGame}>
          {gameOver ? "🔁 Main Lagi" : "🎯 Mulai Game"}
        </button>
      )}

      {gameStarted && (
        <div className="guess-input-row">
          <input
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Masukkan angka..."
            className="guess-input"
          />
          <button className="guess-btn" onClick={handleGuess}>
            ✅ Tebak
          </button>
        </div>
      )}

      {hint && gameStarted && (
        <div className="guess-hint">{hint}</div>
      )}

      {history.length > 0 && (
        <div className="guess-history">
          {history.slice(0, 5).map((h, i) => (
            <div key={i} className="guess-history-item">
              <span className="guess-history-val">{h.val}</span>
              <span className="guess-history-hint">{h.hint}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
