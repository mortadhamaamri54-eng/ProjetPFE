// src/Pages/dg/DGDetail.jsx

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DGSidebar from "../../component/dg/DGSidebar"
import StatCard from "../../component/dg/StatCard"
import StatutBadge from "../../component/dg/StatutBadge"
import EcartPill from "../../component/dg/EcartPill"
import ModaleDecision from "../../component/dg/ModaleDecision"
import API from "../../api/axios"

export default function DGDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [direction, setDirection]   = useState(null)
  const [showModal, setShowModal]   = useState(false)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    API.get(`/directions/${id}`)
      .then((res) => setDirection(res.data))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDecision(dir, choix, commentaire) {
    const nouveauStatut = choix === "approuver" ? "approuve" : "rejete"
    const res = await API.put(`/directions/${dir._id}/decision`, {
      statut: nouveauStatut,
      commentaire,
    })
    setDirection(res.data)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b1a] text-white flex">
        <DGSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-500">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!direction) {
    return (
      <div className="min-h-screen bg-[#050b1a] text-white flex">
        <DGSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-500">Direction introuvable</p>
        </div>
      </div>
    )
  }

  const marge = direction.budget && direction.totalDemande
    ? direction.budget - direction.totalDemande
    : null

  return (
    <div className="min-h-screen bg-[#050b1a] text-white">
      <div className="flex min-h-screen">
        <DGSidebar />

        <div className="flex-1 bg-[#060b16] p-6">

          {/* En-tête + retour */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate("/dg/demandes")}
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              ← Retour
            </button>
            <span className="text-slate-700">/</span>
            <h1 className="text-2xl font-bold">
              Détail demande — {direction.code}
            </h1>
            <StatutBadge statut={direction.statut || "brouillon"} />
          </div>

          {/* Infos direction */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 mb-6 flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">Direction</p>
              <p className="text-sm font-semibold text-white">{direction.nom}</p>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Directeur</p>
              <p className="text-sm text-slate-300">{direction.directeur || "Non assigné"}</p>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <p className="text-xs text-slate-500 mb-1">Soumis le</p>
              <p className="text-sm text-slate-300 font-mono">
                {direction.soumisLe
                  ? new Date(direction.soumisLe).toLocaleDateString("fr-FR")
                  : "Non soumis"
                }
              </p>
            </div>
          </div>

          {/* Cartes KPI */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <StatCard
              label="Budget alloué"
              value={direction.budget ? direction.budget.toLocaleString("fr-FR") + " DT" : "—"}
              valueColor="text-indigo-400"
            />
            <StatCard
              label="Total demandé"
              value={direction.totalDemande ? direction.totalDemande.toLocaleString("fr-FR") + " DT" : "—"}
              valueColor="text-amber-400"
            />
            <StatCard
              label="Marge disponible"
              value={marge !== null ? marge.toLocaleString("fr-FR") + " DT" : "—"}
              valueColor={marge >= 0 ? "text-green-400" : "text-red-400"}
              sub={marge >= 0 ? "Sous enveloppe ✓" : "Dépassement ⚠"}
            />
          </div>

          {/* Tableau des postes */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Poste budgétaire</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Catégorie</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Montant N</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">N-1</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Écart</th>
                </tr>
              </thead>
              <tbody>
                {!direction.postes || direction.postes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-10 text-center text-slate-500 text-sm">
                      Aucun poste budgétaire soumis
                    </td>
                  </tr>
                ) : (
                  direction.postes.map((p, i) => (
                    <tr key={i} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/20 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-white">{p.nom}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded-lg text-xs bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                          {p.categorie}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-white font-mono">
                        {p.montant?.toLocaleString("fr-FR")} DT
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                        {p.montantN1?.toLocaleString("fr-FR")} DT
                      </td>
                      <td className="px-5 py-4">
                        <EcartPill demande={p.montant} alloue={p.montantN1} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Commentaire DG si déjà traité */}
          {direction.commentaireDG && (
            <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 mb-6">
              <p className="text-xs text-slate-500 mb-1">Commentaire DG</p>
              <p className="text-sm text-slate-300">{direction.commentaireDG}</p>
            </div>
          )}

          {/* Bouton décision */}
          {direction.statut === "en_attente" && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                Prendre une décision
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modale */}
      {showModal && (
        <ModaleDecision
          direction={direction}
          onClose={() => setShowModal(false)}
          onConfirm={handleDecision}
        />
      )}

    </div>
  )
}