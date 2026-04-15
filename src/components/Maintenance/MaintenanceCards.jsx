function MaintenanceCards({actifs,echus}) {
    return(
        <div className="grid grid-cols-3 gap-6">
             <div className="bg-[#111827] p-6 rounded-xl">
                <p className="text-gray-400">Actifs</p>
                <h2 className="text-2xl text-green-400 font-bold">{actifs}</h2>
            </div>
        <div className="bg-[#111827] p-6 rounded-xl">
        <p className="text-gray-400">Proches échéance</p>
        <h2 className="text-2xl text-yellow-400 font-bold">0</h2>
      </div>
         <div className="bg-[#111827] p-6 rounded-xl">
        <p className="text-gray-400">Échus</p>
        <h2 className="text-2xl text-red-400 font-bold">{echus}</h2>
      </div>
        </div>
    );
}
export default MaintenanceCards;