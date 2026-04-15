// src/Pages/dg/DGDemandes.jsx

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DGSidebar from "../../component/dg/DGSidebar"
import StatutBadge from "../../component/dg/StatutBadge"
import EcartPill from "../../component/dg/EcartPill"
import API from "../../api/axios"

export default function DGDemandes() {
  const [directions, setDirections] = useState([])
  const [search, setSearch]         = useState("")
  const [filtre, setFiltre]         = useState("tous")
  const navigate = useNavigate()

  useEffect(() => {
    API.get("/directions").then((res) => setDirections(res.data))
  }, [])

  const filtered = directions.filter((d) => {
    const matchSearch = d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.nom.toLowerCase().includes(search.toLowerCase())
    const matchFiltre = filtre === "tous" || d.statut === filtre
    return matchSearch && matchFiltre
  })

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <div className="flex min-h-screen">
        <DGSidebar />

        <div className="flex-1 bg-[#060b16] p-6">

          {/* En-tête */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Toutes les demandes</h1>
              <p className="text-slate-400 mt-1">
                {directions.length} directions enregistrées · Campagne 2025
              </p>
            </div>
            <div className="flex gap-2">
              <select
                value={filtre}
                onChange={(e) => setFiltre(e.target.value)}
                className="bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none"
              >
                <option value="tous">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="approuve">Approuvé</option>
                <option value="rejete">Rejeté</option>
                <option value="brouillon">Brouillon</option>
              </select>
              <input
                placeholder="🔍 Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none w-44"
              />
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Direction</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Directeur</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Budget alloué</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Total demandé</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Écart</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Statut</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Soumis le</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-10 text-center text-slate-500 text-sm">
                      Aucune direction trouvée
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => (
                    <tr
                      key={d._id}
                      className={`border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors ${
                        d.statut === "brouillon" ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-white">{d.code}</p>
                        <p className="text-xs text-slate-500">{d.nom}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-400">
                        {d.directeur || <span className="text-slate-600">Non assigné</span>}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                        {d.budget ? d.budget.toLocaleString("fr-FR") + " DT" : "—"}
                      </td>
                      <td className="px-5 py-4 text-sm text-amber-400 font-mono">
                        {d.totalDemande
                          ? d.totalDemande.toLocaleString("fr-FR") + " DT"
                          : <span className="text-slate-600">—</span>
                        }
                      </td>
                      <td className="px-5 py-4">
                        <EcartPill demande={d.totalDemande} alloue={d.budget} />
                      </td>
                      <td className="px-5 py-4">
                        <StatutBadge statut={d.statut || "brouillon"} />
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                        {d.soumisLe
                          ? new Date(d.soumisLe).toLocaleDateString("fr-FR")
                          : "Non soumis"
                        }
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/dg/demandes/${d._id}`)}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          >
                            Détail
                          </button>
                          {d.statut === "en_attente" && (
                            <>
                              <button
                                onClick={() => navigate(`/dg/demandes/${d._id}`)}
                                className="px-3 py-1 rounded-lg text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => navigate(`/dg/demandes/${d._id}`)}
                                className="px-3 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"
                              >
                                ✕
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}