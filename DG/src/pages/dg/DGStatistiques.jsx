// src/Pages/dg/DGStatistiques.jsx

import { useState, useEffect } from "react"
import DGSidebar from "../../component/dg/DGSidebar"
import StatCard from "../../component/dg/StatCard"
import API from "../../api/axios"

export default function DGStatistiques() {
  const [directions, setDirections] = useState([])

  useEffect(() => {
    API.get("/directions").then((res) => setDirections(res.data))
  }, [])

  const totalAlloue  = directions.reduce((s, d) => s + (d.budget || 0), 0)
  const totalDemande = directions.reduce((s, d) => s + (d.totalDemande || 0), 0)

  const barColor = {
    DSI:  "#6366f1",
    DRH:  "#a855f7",
    DFC:  "#f59e0b",
    DLOG: "#22c55e",
  }

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <div className="flex min-h-screen">
        <DGSidebar />

        <div className="flex-1 bg-[#060b16] p-6">

          {/* En-tête */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Statistiques consolidées</h1>
            <p className="text-slate-400 mt-1">Comparaison inter-directions · 2025 vs 2024</p>
          </div>

          {/* Cartes KPI */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <StatCard
              label="Enveloppe totale 2025"
              value={`${Math.round(totalAlloue / 1000)}K DT`}
              sub={`${directions.length} directions`}
              valueColor="text-indigo-400"
            />
            <StatCard
              label="Total demandé"
              value={`${Math.round(totalDemande / 1000)}K DT`}
              sub={`↓ ${Math.round((totalAlloue - totalDemande) / 1000)}K DT sous enveloppe`}
              valueColor="text-amber-400"
            />
            <StatCard
              label="vs Budget 2024"
              value="+12%"
              sub="Hausse globale"
              valueColor="text-green-400"
            />
            <StatCard
              label="Taux d'utilisation moy."
              value={
                totalAlloue > 0
                  ? `${Math.round((totalDemande / totalAlloue) * 100)}%`
                  : "—"
              }
              sub="Des enveloppes allouées"
              valueColor="text-purple-400"
            />
          </div>

          {/* Grille graphiques */}
          <div className="grid grid-cols-2 gap-4">

            {/* Comparaison N vs N-1 */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white mb-5">
                Budget demandé par direction — 2025 vs 2024
              </h2>

              {directions.map((d) => {
                const color   = barColor[d.code] || "#6366f1"
                const pct2025 = d.budget && d.totalDemande
                  ? Math.round((d.totalDemande / d.budget) * 100)
                  : 0
                // N-1 simulé à 83% si pas de donnée historique
                const pct2024 = d.budgetN1 && d.totalDemandeN1
                  ? Math.round((d.totalDemandeN1 / d.budgetN1) * 100)
                  : 83

                const delta = d.totalDemande && d.totalDemandeN1
                  ? Math.round(((d.totalDemande - d.totalDemandeN1) / d.totalDemandeN1) * 100)
                  : null

                return (
                  <div key={d.code} className="mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold text-indigo-400 font-mono w-10 flex-shrink-0">
                        {d.code}
                      </span>
                      <div className="flex-1">
                        {/* Barre 2024 */}
                        <p className="text-[9px] text-slate-600 mb-1">
                          2024 — {d.totalDemandeN1
                            ? `${Math.round(d.totalDemandeN1 / 1000)}K`
                            : "—"
                          }
                        </p>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${pct2024}%`, background: color, opacity: 0.35 }}
                          />
                        </div>

                        {/* Barre 2025 */}
                        <p className="text-[9px] mb-1" style={{ color }}>
                          2025 — {d.totalDemande
                            ? `${Math.round(d.totalDemande / 1000)}K`
                            : "Non soumis"
                          }
                        </p>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-1.5 rounded-full"
                            style={{ width: `${pct2025}%`, background: color }}
                          />
                        </div>
                      </div>

                      {/* Delta */}
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded w-10 text-center flex-shrink-0 ${
                        delta === null
                          ? "bg-slate-800 text-slate-500"
                          : delta > 0
                            ? "bg-red-500/10 text-red-400"
                            : "bg-green-500/10 text-green-400"
                      }`}>
                        {delta !== null ? `${delta > 0 ? "+" : ""}${delta}%` : "—"}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Légende */}
              <div className="flex gap-5 pt-3 border-t border-slate-800 mt-2">
                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-5 h-1 rounded bg-slate-400 opacity-35 inline-block" />
                  2024 (N-1)
                </span>
                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-5 h-1 rounded bg-indigo-400 inline-block" />
                  2025 (N)
                </span>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="flex flex-col gap-4">

              {/* Répartition enveloppe */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
                <h2 className="text-sm font-semibold text-white mb-4">
                  Répartition de l'enveloppe par direction
                </h2>

                {directions.map((d) => {
                  const pct   = totalAlloue > 0
                    ? Math.round((d.budget / totalAlloue) * 100)
                    : 0
                  const color = barColor[d.code] || "#6366f1"

                  return (
                    <div key={d.code} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{d.code}</span>
                        <span className="font-mono" style={{ color }}>
                          {pct}% · {d.budget?.toLocaleString("fr-FR")} DT
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Taux d'utilisation */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
                <h2 className="text-sm font-semibold text-white mb-4">
                  Taux d'utilisation par direction
                </h2>

                {directions.map((d) => {
                  const pct   = d.budget && d.totalDemande
                    ? Math.round((d.totalDemande / d.budget) * 100)
                    : 0
                  const color = barColor[d.code] || "#6366f1"

                  return (
                    <div key={d.code} className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-slate-400 w-10">{d.code}</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                      <span
                        className="text-xs font-semibold w-8 text-right"
                        style={{ color: pct > 0 ? color : undefined }}
                      >
                        {pct > 0 ? `${pct}%` : <span className="text-slate-600">—</span>}
                      </span>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}