import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/members.css"; // 👈 Import CSS

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    balance: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Switch between local & deployed backend easily
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://game-app-1-agp2.onrender.com/api/members"
      : "http://localhost:8080/api/members";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setMembers(res.data);
    } catch (err) {

      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, {
        name: form.name,
        phoneNumber: form.phoneNumber,
        balance: form.balance || 0
      });
      setForm({ name: "", phoneNumber: "", balance: "" });
      fetchMembers();
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  return (
    <div className="members-container">
      <h1 className="members-title">🎮 Members</h1>

      {/* Add Member Form */}
      <form onSubmit={handleSubmit} className="members-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Balance (₹)</label>
          <input
            type="number"
            name="balance"
            value={form.balance}
            onChange={handleChange}
          />
        </div>

        <button type="submit">➕ Add Member</button>
      </form>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Members List */}
      <div className="members-list">
        <h2>👥 All Members</h2>
        {loading ? (
          <p>Loading members...</p>
        ) : members.length > 0 ? (
          members.map((member) => (
            <div key={member.id} className="member-card">
              <span>
                <strong>{member.name}</strong> – {member.phoneNumber}
              </span>
              <div>
                💰 Balance: ₹{member.balance ?? 0} <br />
                📅 Joined:{" "}
                {member.joiningDate
                  ? new Date(member.joiningDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          ))
        ) : (
          <p>No members found.</p>
        )}
      </div>
    </div>
  );
}
