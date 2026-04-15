// src/Pages/dg/DGHistorique.jsx

import { useState, useEffect } from "react"
import DGSidebar from "../../component/dg/DGSidebar"
import StatutBadge from "../../component/dg/StatutBadge"
import EcartPill from "../../component/dg/EcartPill"
import API from "../../api/axios"

export default function DGHistorique() {
  const [historique, setHistorique] = useState([])
  const [anneeFiltre, setAnneeFiltre] = useState("toutes")
  const [dirFiltre, setDirFiltre]     = useState("toutes")

  useEffect(() => {
    API.get("/directions/historique").then((res) => setHistorique(res.data))
  }, [])

  // Listes pour les filtres
  const annees     = ["toutes", ...new Set(historique.map((h) => h.annee))]
  const directions = ["toutes", ...new Set(historique.map((h) => h.code))]

  const filtered = historique.filter((h) => {
    const matchAnnee = anneeFiltre === "toutes" || h.annee === anneeFiltre
    const matchDir   = dirFiltre   === "toutes" || h.code  === dirFiltre
    return matchAnnee && matchDir
  })

  const badgeDir = {
    DSI:  "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25",
    DRH:  "bg-purple-500/15 text-purple-400 border border-purple-500/25",
    DFC:  "bg-amber-500/15  text-amber-400  border border-amber-500/25",
    DLOG: "bg-green-500/15  text-green-400  border border-green-500/25",
  }

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <div className="flex min-h-screen">
        <DGSidebar />

        <div className="flex-1 bg-[#060b16] p-6">

          {/* En-tête */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Historique des campagnes</h1>
              <p className="text-slate-400 mt-1">
                Toutes les années · Toutes les directions
              </p>
            </div>

            {/* Filtres */}
            <div className="flex gap-2">
              <select
                value={anneeFiltre}
                onChange={(e) => setAnneeFiltre(e.target.value)}
                className="bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none"
              >
                {annees.map((a) => (
                  <option key={a} value={a}>
                    {a === "toutes" ? "Toutes les années" : a}
                  </option>
                ))}
              </select>
              <select
                value={dirFiltre}
                onChange={(e) => setDirFiltre(e.target.value)}
                className="bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-400 outline-none"
              >
                {directions.map((d) => (
                  <option key={d} value={d}>
                    {d === "toutes" ? "Toutes les directions" : d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tableau */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Campagne</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Direction</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Directeur</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Demandé</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Alloué</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Écart</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Statut</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Décision DG</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-5 py-10 text-center text-slate-500 text-sm">
                      Aucun historique disponible
                    </td>
                  </tr>
                ) : (
                  filtered.map((h, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-white font-mono">
                        {h.annee}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${badgeDir[h.code] || "bg-slate-700 text-slate-300"}`}>
                          {h.code}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-400">
                        {h.directeur}
                      </td>
                      <td className="px-5 py-4 text-sm text-amber-400 font-mono">
                        {h.totalDemande?.toLocaleString("fr-FR")} DT
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                        {h.budget?.toLocaleString("fr-FR")} DT
                      </td>
                      <td className="px-5 py-4">
                        <EcartPill demande={h.totalDemande} alloue={h.budget} />
                      </td>
                      <td className="px-5 py-4">
                        <StatutBadge statut={h.statut} />
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                        {h.decisionLe
                          ? new Date(h.decisionLe).toLocaleDateString("fr-FR")
                          : "—"
                        }
                      </td>
                      <td className="px-5 py-4 text-xs text-slate-400 max-w-xs">
                        {h.commentaireDG || "—"}
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