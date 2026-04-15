import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setmotDePasse] = useState("");
  const [error, setError] = useState(""); 

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedEmail = email.trim();
  const trimmedPassword = motDePasse.trim();

  if (!trimmedEmail || !trimmedPassword) {
    setError("Email et mot de passe sont requis.");
    return;
  }

  try {
    const res = await API.post("/auth/login", {
      email: trimmedEmail,
      motDePasse: trimmedPassword,
    });

    console.log("LOGIN OK", res.data);

    login(res.data, res.data.token);
    navigate("/dashboard");

  } catch (err) {
    console.error("Erreur login:", err);

    setError(
      err.response?.data?.message ||
      "Email ou mot de passe incorrect"
    );
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">

      <div className="max-w-md w-full">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            ETAP - Budget System
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">

          <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">
            Connexion
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-sm text-center bg-red-50 p-3 rounded-xl">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label>Email</label>
              <input
                type="email"
                className="w-full border p-3 rounded-xl mt-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                className="w-full border p-3 rounded-xl mt-2"
                onChange={(e) => setmotDePasse(e.target.value)}
                value={motDePasse}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl"
            >
              Se connecter
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}