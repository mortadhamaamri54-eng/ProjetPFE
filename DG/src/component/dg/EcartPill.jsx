// src/component/dg/EcartPill.jsx

export default function EcartPill({ demande, alloue }) {
  // Accepte soit les deux montants, soit directement une valeur en %
  if (demande == null || alloue == null) {
    return <span className="text-slate-600 text-xs">—</span>
  }

  const pct = Math.round(((demande - alloue) / alloue) * 100)
  const isNeg = pct < 0

  return (
    <span
      className={`px-1.5 py-0.5 rounded text-xs font-medium ${
        isNeg
          ? "bg-green-500/10 text-green-400"   // sous enveloppe = bon
          : "bg-red-500/10 text-red-400"        // dépassement = mauvais
      }`}
    >
      {pct > 0 ? "+" : ""}{pct}%
    </span>
  )
}