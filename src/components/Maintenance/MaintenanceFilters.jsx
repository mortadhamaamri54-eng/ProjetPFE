function MaintenanceFilters({filter,setFilter}) {
    const filters=["Tous","Actif","Echu"];
    return(
        <div className="flex gap-4">
            {filters.map(f=>(
                <button 
                key={f}
                onClick={()=>setFilter(f)}
                className={`px-4 py-2 rounded-lg ${filter===f?"bg-indigo-600":"bg-[#111827] hover:bg-slate-700"}`}>
                    {f}
                </button>
            ))}
        </div>
    );
}
export default MaintenanceFilters;