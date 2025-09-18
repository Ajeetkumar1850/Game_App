import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/games.css"; // 👈 Create this file for styling

export default function Games() {
  const [games, setGames] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    minplayer: "",
    maxplayer: "",
    multipleof: "",
    duration: ""
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get("https://game-app-1-agp2.onrender.com/api/games");
      setGames(res.data);
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://game-app-1-agp2.onrender.com/api/games", {
        ...form,
        price: parseFloat(form.price),
        minplayer: parseInt(form.minplayer),
        maxplayer: parseInt(form.maxplayer),
        multipleof: parseInt(form.multipleof),
        duration: parseInt(form.duration)
      });
      setForm({
        name: "",
        price: "",
        description: "",
        minplayer: "",
        maxplayer: "",
        multipleof: "",
        duration: ""
      });
      fetchGames();
    } catch (err) {
      console.error("Error adding game:", err);
    }
  };

  return (
    <div className="games-container">
      <h1 className="games-title">🎮 Games Store</h1>

      {/* Add Game Form */}
      <form onSubmit={handleSubmit} className="games-form">
        <input type="text" name="name" placeholder="Game Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="minplayer" placeholder="Min Players" value={form.minplayer} onChange={handleChange} required />
        <input type="number" name="maxplayer" placeholder="Max Players" value={form.maxplayer} onChange={handleChange} required />
        <input type="number" name="multipleof" placeholder="Multiple Of" value={form.multipleof} onChange={handleChange} required />
        <input type="number" name="duration" placeholder="Duration (mins)" value={form.duration} onChange={handleChange} required />
        <button type="submit">➕ Add Game</button>
      </form>

      {/* Games List */}
      <div className="games-list">
        <h2>📋 Available Games</h2>
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h3>{game.name} - 💰 {game.price} INR</h3>
            <p>{game.description}</p>
            <p>👥 {game.minplayer} - {game.maxplayer} players</p>
            <p>⚡ Multiple of: {game.multipleof}</p>
            <p>⏳ Duration: {game.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
}
