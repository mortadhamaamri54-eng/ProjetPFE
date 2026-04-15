import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function DashboardHeader() {

  const { currentUser } = useContext(AuthContext);

  const today = new Date().toLocaleDateString();

  return (
    <div className="flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Tableau de bord
        </h1>

        <p className="text-gray-400">
          Direction : {currentUser?.direction?.nom}
        </p>
      </div>

      <div className="text-right">
        <p className="text-gray-400 text-sm">Aujourd’hui</p>
        <p className="font-semibold">{today}</p>
      </div>

    </div>
  );
}

export default DashboardHeader;