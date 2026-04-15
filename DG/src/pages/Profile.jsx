import React, { useState, useContext, useEffect } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/me");
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (err) {
        setError("Impossible de charger les informations du profil.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.email) {
      setUser(currentUser);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow w-full max-w-3xl text-center">
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8 flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow w-full max-w-3xl text-center text-red-500">
          <p>{error || "Aucun utilisateur connecté."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-3xl">

        <h2 className="text-xl font-bold mb-6">
          {user.prenom} {user.nom}
        </h2>

        <div className="grid grid-cols-2 gap-6">

          <Input name="nom" label="Nom" value={user.nom || ""} onChange={handleChange} disabled={!isEditing} />
          <Input name="prenom" label="Prénom" value={user.prenom || ""} onChange={handleChange} disabled={!isEditing} />
          <Input name="email" label="Email" value={user.email || ""} onChange={handleChange} disabled={!isEditing} />
          <Input name="direction" label="Direction" value={user.direction?.nom || user.direction?.code || ""} onChange={handleChange} disabled={!isEditing} />
          <Input label="Rôle" value={user.role || ""} disabled />
        </div>

        <div className="mt-6 text-right">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
            >
              Modifier
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded-xl"
            >
              Enregistrer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        {...props}
        className="w-full border p-2 rounded-lg mt-2"
      />
    </div>
  );
}