import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FiHome,
  FiFolder,
  FiBarChart2,
  FiUser,
  FiLogOut
} from "react-icons/fi";

const budgetConfig = {
  DI: [
    { label: "Exploitation", path: "exploitation" },
    { label: "Investissement", path: "investissement" },
    { label: "Maintenance", path: "maintenance" }
  ],
  RH: [
    { label: "Fonctionnement", path: "fonctionnement" },
    { label: "Médical", path: "medical" },
    { label: "Social", path: "social" }
  ],
  AJ: [
    { label: "Juridique", path: "fonctionnement" },
    { label: "Contrats", path: "projets" }
  ]
};

export default function Sidebar() {

  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

const directionCode = currentUser?.direction?.code;

  return (
    <div className="h-screen w-72 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">BudgetApp</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {currentUser?.role === "directeur" && (
          <>
            <SidebarItem to="/dashboard" icon={<FiHome />} text="Dashboard" />

            {budgetConfig[directionCode]?.map((item) => (
            <SidebarItem
            key={item.path}
            to={`/${directionCode.toLowerCase()}/${item.path}`}
            icon={<FiFolder />}
            text={item.label}
  />
))}

            <SidebarItem
              to="/statistics"
              icon={<FiBarChart2 />}
              text="Statistiques"
            />
          </>
        )}

      </nav>

      <div className="p-4 border-t border-slate-700">
        <SidebarItem to="/profile" icon={<FiUser />} text="Profil" />

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white"
        >
          <FiLogOut />
          Déconnexion
        </button>
      </div>

    </div>
  );
}

function SidebarItem({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-gray-300 hover:bg-slate-800"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}