import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="h-screen w-64 bg-[#081225] flex flex-col justify-between p-6">
      <div>
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold">A</div>
            <div><h2 className="font-semibold">Admin</h2></div>
          </div>
        </div>
        <div className="p-3">
          <Link to="/dashboard" className={`block px-4 py-3 mb-2 rounded-xl ${location.pathname === "/dashboard" ? "bg-indigo-950 text-indigo-300" : "text-slate-400 hover:bg-slate-800"}`}>
            Tableau de bord
          </Link>
          <Link to="/admin/comptes" className={`block px-4 py-3 mb-2 rounded-xl ${location.pathname === "/admin/comptes" ? "bg-indigo-950 text-indigo-300" : "text-slate-400 hover:bg-slate-800"}`}>
            Gestion des comptes
          </Link>
          
          <Link to="/admin/logs" className={`block px-4 py-3 mb-2 rounded-xl ${location.pathname === "/admin/logs" ? "bg-indigo-950 text-indigo-300" : "text-slate-400 hover:bg-slate-800"}`}>
            Journaux d'audit
          </Link>
          <Link to="/admin/parametres" className={`block px-4 py-3 mb-2 rounded-xl ${location.pathname === "/admin/parametres" ? "bg-indigo-950 text-indigo-300" : "text-slate-400 hover:bg-slate-800"}`}>
            Paramètres
          </Link>
        </div>
      </div>

      {/* Profil  */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            {user.prenom?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.prenom} {user.nom}</p>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        </div>
        <button onClick={logout} className="text-red-400 text-sm hover:text-red-300 mt-2">
          Déconnexion
        </button>
      </div>
    </div>
  )
}