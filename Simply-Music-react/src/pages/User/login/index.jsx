import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSimplyContext } from "../../../components/simplyContext/simplyProvider";
import Swal from "sweetalert2";
import { enc, AES } from "crypto-js";
import "../login/style.css";

const LoginForm = () => {
  const { login } = useSimplyContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encryptData = (data) => {
    const secretKey = "mi tia";
    return AES.encrypt(JSON.stringify(data), secretKey).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid credentials or non-JSON response",
        });
        setLoading(false);
        return;
      }

      const data = await response.json();
      const userId = data.user.id;
      const name_users = data.user.name_users;

      login(data.user.role, userId, name_users);

      const sessionData = {
        isAuthenticated: true,
        userRole: data.user.role,
        userId: userId,
        name_users: name_users,
      };

      const encryptedSessionData = encryptData(sessionData);
      localStorage.setItem("sessionData", encryptedSessionData);

      // Simular un tiempo de espera antes de redirigir (5 segundos)

      if (data.user.role === "user" || data.user.role === "artist") {
        navigate(`/user/${userId}`);
      } else if (data.user.role === "admin") {
        navigate(`/admin`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setLoading(false);
    }
  };

  return (
    <div id="form-ui">
      <form action="" method="post" id="form" onSubmit={handleSubmit}>
        <div id="form-body">
          <div id="welcome-lines">
            <div id="welcome-line-1">Simply</div>
            <div id="welcome-line-2">Welcome Back, Loyd</div>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                />
              </label>
            </div>
            <div className="form-inp">
              <label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </label>
            </div>
          </div>
          <div id="submit-button-cvr">
            <button id="submit-button" type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Login"}
            </button>
          </div>

          <div id="bar"></div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
