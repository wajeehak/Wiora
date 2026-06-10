import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(password);

    if (success) {
      navigate("/admin");
    } else {
      alert("Wrong password ❌");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f1eee2"
    }}>
      <div style={{
        padding: "40px",
        background: "white",
        borderRadius: "20px",
        textAlign: "center",
        width: "300px"
      }}>
        <h2>Admin Access 🔐</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#4f5d52",
            color: "white",
            cursor: "pointer"
          }}
        >
          Enter Admin
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;