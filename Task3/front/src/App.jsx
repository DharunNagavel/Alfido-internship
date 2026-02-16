import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = "http://localhost:5000";

/* =========================
   PROTECTED ROUTE
========================= */
function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get(`${API}/protected`)
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  return auth ? children : <Navigate to="/login" />;
}

/* =========================
   SIGNUP
========================= */
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/signup`, { email, password });
      alert("Signup successful! Please login.");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

/* =========================
   LOGIN
========================= */
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/login`, { email, password });
      alert("Login successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <br /><br />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

/* =========================
   DASHBOARD (Protected)
========================= */
function Dashboard() {
  const logout = async () => {
    await axios.post(`${API}/logout`);
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>Dashboard (Protected)</h2>
      <p>You are logged in 🎉</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

/* =========================
   APP
========================= */
function App() {
  return (
    <Router>
      <nav style={{ background: "#333", padding: 10 }}>
        <Link to="/" style={{ color: "white", marginRight: 10 }}>Home</Link>
        <Link to="/login" style={{ color: "white", marginRight: 10 }}>Login</Link>
        <Link to="/signup" style={{ color: "white" }}>Signup</Link>
      </nav>

      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;