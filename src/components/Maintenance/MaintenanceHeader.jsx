function MaintenanceHeader({setShowModal}){
    return(
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold">
                    Contrats de Maintennace
                </h1>
                <p className="text-gray-400">
                    suivi des échéances fournisseurs
                </p>
            </div>
            <button 
            onClick={()=>setShowModal(true)}
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-500">+ Nouveau Contrat</button>
        </div>
    );
}
export default MaintenanceHeader;