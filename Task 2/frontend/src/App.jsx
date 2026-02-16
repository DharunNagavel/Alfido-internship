import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/users";

// HOME PAGE
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios.get(API);
    setUsers(res.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {loading && <p>Loading...</p>}
      {users.map(user => (
        <div key={user.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <Link to={`/edit/${user.id}`}>Edit</Link>
          <button onClick={() => deleteUser(user.id)} style={{ marginLeft: 10 }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

// CREATE PAGE
function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, { name, email });
    navigate("/");
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} required />
        <br /><br />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <br /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

// EDIT PAGE
function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`${API}/${id}`).then(res => {
      setName(res.data.name);
      setEmail(res.data.email);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${API}/${id}`, { name, email });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} required />
        <br /><br />
        <input value={email} onChange={e => setEmail(e.target.value)} required />
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

// MAIN APP
function App() {
  return (
    <Router>
      <nav style={{ background: "#333", padding: 10 }}>
        <Link to="/" style={{ color: "white", marginRight: 10 }}>Home</Link>
        <Link to="/create" style={{ color: "white" }}>Create</Link>
      </nav>

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;