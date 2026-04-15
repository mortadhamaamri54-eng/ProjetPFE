// src/component/dg/StatutBadge.jsx

const CONFIG = {
  brouillon:  {
    label: "Brouillon",
    className: "bg-slate-500/10 text-slate-400 border border-slate-500/20",
  },
  en_attente: {
    label: "En attente",
    className: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
  approuve: {
    label: "Approuvé",
    className: "bg-green-500/10 text-green-400 border border-green-500/20",
  },
  rejete: {
    label: "Rejeté",
    className: "bg-red-500/10 text-red-400 border border-red-500/20",
  },
}

export default function StatutBadge({ statut }) {
  const config = CONFIG[statut] || CONFIG.brouillon

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}