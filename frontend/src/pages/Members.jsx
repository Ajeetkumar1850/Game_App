import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/members.css"; // 👈 Import CSS

export default function Members() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/members");
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/members", form);
      setForm({ name: "", phoneNumber: "" });
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

        <button type="submit">➕ Add Member</button>
      </form>

      {/* Members List */}
      <div className="members-list">
        <h2>👥 All Members</h2>
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <span>
              <strong>{member.name}</strong> – {member.phoneNumber}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
