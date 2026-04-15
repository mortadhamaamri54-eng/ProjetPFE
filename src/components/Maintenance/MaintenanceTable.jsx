function MaintenanceTable({contracts,setContracts}) {
    const deleteContract=(index)=>{
        const newContracts = contracts.filter((_,i)=>i!== index);
        setContracts(newContracts);
    }
    return(
        <div className="bg-[#111827] p-6 rounded-xl">
            <table className="w-full">
                <thead className="text-gray-400 text-left">
                    <tr>
                        <th>FOURNISSEUR</th>
                        <th>OBJET</th>
                        <th>MONTANT</th>
                        <th>DEBUT</th>
                        <th>FIN</th>
                        <th>STATUT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map((c)=>(
                        <tr key={c.fournisseur}className="border-t border-gray-700">
                         <td className="py-4">{c.fournisseur}</td>
                         <td>{c.objet}</td>
                        <td>{c.montant.toLocaleString()} DA</td>
                        <td>{c.debut}</td>
                        <td>{c.fin}</td>
              <td>
                <span className={`px-2 py-1 rounded text-sm
                  ${c.statut === "Actif"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                  }`}>
                  {c.statut}
                </span>
              </td>
              <td className="space-x-3">
                <button className="text-blue-400">✏️</button>
                <button onClick={()=>deleteContract(index)} className="text-red-400"> 🗑</button>
              </td>
            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default MaintenanceTable;