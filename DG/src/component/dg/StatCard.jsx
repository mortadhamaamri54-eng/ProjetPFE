// src/component/dg/StatCard.jsx

export default function StatCard({ label, value, sub, valueColor = "text-white" }) {
  return (
    <div className="bg-[#161b27] border border-slate-800 rounded-xl p-3.5">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
        {label}
      </p>
      <p className={`text-xl font-semibold ${valueColor}`}>
        {value}
      </p>
      {sub && (
        <p className="text-[10px] text-slate-500 mt-1">{sub}</p>
      )}
    </div>
  )
}