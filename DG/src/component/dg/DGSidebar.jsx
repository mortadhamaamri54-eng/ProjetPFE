import { Link, useLocation, useNavigate } from "react-router-dom"

const NAV = [
  {
    section: "Vue globale",
    items: [
      { path: "/dg/dashboard",    label: "Tableau de bord" },
      { path: "/dg/demandes",     label: "Toutes les demandes", badge: 4 },
    ],
  },
  {
    section: "Traitement",
    items: [
      { path: "/dg/en-attente",   label: "En attente", badgeRed: 2 },
      { path: "/dg/approuvees",   label: "Approuvées" },
      { path: "/dg/rejetees",     label: "Rejetées" },
    ],
  },
  {
    section: "Analyse",
    items: [
      { path: "/dg/statistiques", label: "Statistiques" },
      { path: "/dg/historique",   label: "Historique" },
    ],
  },
]

export default function DGSidebar({ unreadCount = 0 }) {
  const location = useLocation()
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  // Mettre à jour les badges dynamiquement
  const navWithBadges = NAV.map(group => {
    if (group.section === "Vue globale") {
      return {
        ...group,
        items: group.items.map(item => 
          item.path === "/dg/demandes" 
            ? { ...item, badge: unreadCount || 0 }
            : item
        )
      }
    }
    return group
  })

  return (
    <aside className="h-screen w-52 bg-[#0d1424] border-r border-slate-800 flex flex-col flex-shrink-0 sticky top-0">

      {/* Logo cliquable */}
      <Link to="/dg/dashboard" className="p-4 border-b border-slate-800 flex items-center gap-2.5 hover:bg-slate-800/30 transition-colors">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
          DG
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-200">Direction Générale</p>
          <p className="text-[10px] text-slate-500">Campagne 2025</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        {navWithBadges.map((group) => (
          <div key={group.section}>
            <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-600 px-2.5 pt-3 pb-1.5">
              {group.section}
            </p>
            {group.items.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === "/dg/demandes" && location.pathname === "/dg/demandes") ||
                (item.path === "/dg/en-attente" && location.pathname === "/dg/en-attente") ||
                (item.path === "/dg/approuvees" && location.pathname === "/dg/approuvees") ||
                (item.path === "/dg/rejetees" && location.pathname === "/dg/rejetees")
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs mb-0.5 transition-colors ${
                    isActive
                      ? "bg-indigo-950 text-indigo-300 border-l-2 border-indigo-500"
                      : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                  }`}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="bg-amber-500/15 text-amber-400 rounded-full px-1.5 py-px text-[9px] font-semibold">
                      {item.badge}
                    </span>
                  )}
                  {item.badgeRed > 0 && (
                    <span className="bg-red-500/15 text-red-400 rounded-full px-1.5 py-px text-[9px] font-semibold">
                      {item.badgeRed}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Profil + déconnexion */}
      <div className="p-3 border-t border-slate-800">
        <Link to="/dg/dashboard" className="flex items-center gap-2.5 mb-2 hover:bg-slate-800/30 rounded-lg p-1 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            {user.prenom?.charAt(0).toUpperCase() || "K"}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-200">
              {user.prenom} {user.nom}
            </p>
            <p className="text-[9px] text-slate-500">Directeur Général</p>
          </div>
        </Link>
        <button
          onClick={logout}
          className="text-red-400 text-xs hover:text-red-300 transition-colors w-full text-left px-1"
        >
          Déconnexion
        </button>
      </div>

    </aside>
  )
}