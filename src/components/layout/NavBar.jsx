import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);

  const directionCode = currentUser?.direction?.code;
  
  const menus = {
    DI: [
      { name: "Exploitation", path: "/di/exploitation" },
      { name: "Investissement", path: "/di/investissement" },
      { name: "Maintenance", path: "/di/maintenance" },
    ],
    RH: [
      { name: "Fonctionnement", path: "/rh/fonctionnement" },
      { name: "Medical", path: "/rh/medical" },
      { name: "Social", path: "/rh/social" },
    ],
    AJ: [
      { name: "Juridique", path: "/aj/fonctionnement" },
      { name: "Contrats", path: "/aj/projets" },
    ],
  };

  const links = menus[directionCode] || [];

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div className="flex gap-6 items-center">
        <h2 className="font-bold text-lg">Dashboard</h2>

        {!directionCode && (
          <span className="text-red-500 text-sm">
            directionCode manquant
          </span>
        )}

        {links.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-600 hover:text-blue-600"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="text-sm">
        {currentUser?.prenom} ({currentUser?.direction?.code})
      </div>

    </div>
  );
}