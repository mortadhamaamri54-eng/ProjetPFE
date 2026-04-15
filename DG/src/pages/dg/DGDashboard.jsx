// src/Pages/dg/DGDashboard.jsx

import { useState, useEffect } from "react"
import DGSidebar from "../../component/dg/DGSidebar"
import StatCard from "../../component/dg/StatCard"
import API from "../../api/axios"

export default function DGDashboard() {
  const [directions, setDirections] = useState([])

  

  // Calculs globaux
  const totalAlloue  = directions.reduce((s, d) => s + (d.budget || 0), 0)
  const totalDemande = directions.reduce((s, d) => s + (d.totalDemande || 0), 0)
  const enAttente    = directions.filter((d) => d.statut === "en_attente").length
  const traitees     = directions.filter((d) => d.statut !== "brouillon").length
  const taux         = directions.length > 0
    ? Math.round((traitees / directions.length) * 100)
    : 0

  function fmt(n) {
    if (!n) return "—"
    return n.toLocaleString("fr-FR") + " DT"
  }

  const barColor = { DSI: "#6366f1", DRH: "#a855f7", DFC: "#f59e0b", DLOG: "#22c55e" }

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <div className="flex min-h-screen">
        <DGSidebar />

        <div className="flex-1 bg-[#060b16] p-6">

          {/* En-tête */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Tableau de bord</h1>
              <p className="text-slate-400 mt-1">Vue consolidée de toutes les directions · Campagne 2025</p>
            </div>
            <span className="text-xs text-slate-600 mt-2">
              Mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </span>
          </div>

          {/* Cartes KPI */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <StatCard
              label="Budget global alloué"
              value={`${Math.round(totalAlloue / 1000)}K DT`}
              sub={`${directions.length} directions · 2025`}
              valueColor="text-indigo-400"
            />
            <StatCard
              label="Total demandé"
              value={`${Math.round(totalDemande / 1000)}K DT`}
              sub="Somme des estimations"
              valueColor="text-amber-400"
            />
            <StatCard
              label="Demandes en attente"
              value={enAttente}
              sub="⚠ Action requise"
              valueColor="text-red-400"
            />
            <StatCard
              label="Taux d'avancement"
              value={`${taux}%`}
              sub={`${traitees} / ${directions.length} directions traitées`}
              valueColor="text-green-400"
            />
          </div>

          {/* Grille principale */}
          <div className="grid grid-cols-5 gap-4">

            {/* Barres budget par direction */}
            <div className="col-span-3 bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Budget demandé par direction</h2>

              {directions.map((d) => {
                const pct = d.budget && d.totalDemande
                  ? Math.round((d.totalDemande / d.budget) * 100)
                  : 0
                const color = barColor[d.code] || "#6366f1"

                return (
                  <div key={d.code} className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-semibold text-indigo-400 font-mono w-10 flex-shrink-0">
                      {d.code}
                    </span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono w-32 text-right flex-shrink-0">
                      {d.totalDemande
                        ? `${Math.round(d.totalDemande / 1000)}K / ${Math.round(d.budget / 1000)}K`
                        : "Non soumis"
                      }
                    </span>
                  </div>
                )
              })}

              <div className="mt-2 pt-3 border-t border-slate-800 flex justify-between text-xs">
                <span className="text-slate-500">Total demandé</span>
                <span className="text-amber-400 font-semibold font-mono">
                  {fmt(totalDemande)} / {fmt(totalAlloue)}
                </span>
              </div>
            </div>

            {/* Colonne droite */}
            <div className="col-span-2 flex flex-col gap-4">

              {/* État des demandes */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
                <h2 className="text-sm font-semibold text-white mb-3">État des demandes</h2>

                {[
                  { label: "Brouillon (non soumis)",    value: directions.filter(d => d.statut === "brouillon").length,  color: "text-slate-500" },
                  { label: "En attente d'approbation",  value: directions.filter(d => d.statut === "en_attente").length, color: "text-amber-400" },
                  { label: "Approuvées",                value: directions.filter(d => d.statut === "approuve").length,   color: "text-green-400" },
                  { label: "Rejetées",                  value: directions.filter(d => d.statut === "rejete").length,     color: "text-red-400"   },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm mb-2">
                    <span className="text-slate-400">{row.label}</span>
                    <span className={`font-semibold ${row.color}`}>
                      {row.value} direction{row.value > 1 ? "s" : ""}
                    </span>
                  </div>
                ))}

                <div className="mt-3">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-2 bg-amber-400 rounded-full" style={{ width: `${taux}%` }} />
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5">
                    {taux}% des directions ont soumis leur demande
                  </p>
                </div>
              </div>

              {/* Alertes */}
              <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5">
                <h2 className="text-sm font-semibold text-white mb-3">Alertes récentes</h2>

                {directions.filter(d => d.statut === "en_attente").length === 0 ? (
                  <p className="text-xs text-slate-600">Aucune alerte pour le moment</p>
                ) : (
                  directions.filter(d => d.statut === "en_attente").map((d) => (
                    <div
                      key={d.code}
                      className="flex items-start gap-3 p-3 rounded-xl border border-amber-500/15 bg-amber-500/5 mb-2"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/12 flex items-center justify-center text-sm flex-shrink-0">
                        ⏳
                      </div>
                      <div>
                        <p className="text-xs text-amber-400 font-medium">
                          {d.code} en attente
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {fmt(d.totalDemande)} — Traitement requis
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}