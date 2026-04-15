// src/component/dg/ModaleDecision.jsx

import { useState } from "react"

export default function ModaleDecision({ direction, onClose, onConfirm }) {
  const [choix, setChoix]           = useState("approuver")
  const [commentaire, setCommentaire] = useState("")

  if (!direction) return null

  function handleConfirm() {
    onConfirm(direction, choix, commentaire)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#161b27] border border-slate-800 rounded-2xl p-6 w-96 shadow-2xl">

        {/* Titre */}
        <h3 className="text-base font-bold text-white mb-1">Décision sur la demande</h3>
        <p className="text-xs text-slate-500 mb-5">
          Direction {direction.code} · {direction.directeur} · {direction.totalDemande?.toLocaleString("fr-FR")} DT demandés
        </p>

        {/* Choix Approuver / Rejeter */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => setChoix("approuver")}
            className={`flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-medium transition-all ${
              choix === "approuver"
                ? "border-green-400/40 bg-green-500/8 text-green-400"
                : "border-slate-800 bg-transparent text-slate-600 opacity-50"
            }`}
          >
            <span className="text-xl">✅</span>
            Approuver
          </button>
          <button
            onClick={() => setChoix("rejeter")}
            className={`flex flex-col items-center gap-2 py-3 rounded-xl border text-xs font-medium transition-all ${
              choix === "rejeter"
                ? "border-red-400/40 bg-red-500/8 text-red-400"
                : "border-slate-800 bg-transparent text-slate-600 opacity-50"
            }`}
          >
            <span className="text-xl">❌</span>
            Rejeter
          </button>
        </div>

        {/* Commentaire */}
        <label className="block text-xs text-slate-500 mb-1.5">
          Commentaire pour la direction (optionnel)
        </label>
        <textarea
          rows={3}
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          placeholder="Ex : Budget validé, bonne justification des hausses..."
          className="w-full bg-[#0f1117] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 resize-none mb-4"
        />

        {/* Résumé */}
        <div className={`rounded-xl p-3 mb-5 border ${
          choix === "approuver"
            ? "bg-green-500/5 border-green-500/15"
            : "bg-red-500/5 border-red-500/15"
        }`}>
          <p className={`text-xs font-semibold mb-2 ${
            choix === "approuver" ? "text-green-400" : "text-red-400"
          }`}>
            Résumé de la décision
          </p>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Décision</span>
            <span className={`font-semibold ${choix === "approuver" ? "text-green-400" : "text-red-400"}`}>
              {choix === "approuver" ? "Approuver" : "Rejeter"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Montant concerné</span>
            <span className="text-white font-mono">
              {direction.totalDemande?.toLocaleString("fr-FR")} DT
            </span>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-sm text-slate-400 hover:bg-slate-800 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${
              choix === "approuver"
                ? "bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25"
                : "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25"
            }`}
          >
            {choix === "approuver" ? "✓ Confirmer l'approbation" : "✕ Confirmer le rejet"}
          </button>
        </div>

      </div>
    </div>
  )
}