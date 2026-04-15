import { useState } from "react"

export default function AddUser({ show, onClose, newUser, setNewUser, onAdd }) {
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!newUser.prenom.trim()) e.prenom = "Le prénom est obligatoire"
    if (!newUser.nom.trim()) e.nom = "Le nom est obligatoire"
    if (!newUser.email.trim()) e.email = "L'email est obligatoire"
    if (!newUser.direction.trim()) e.direction ="la direction est obligatiore"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email)) e.email = "Email invalide"
    return e
  }

  function handleSubmit() {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length == 0) {
      onAdd()
      setErrors({})
    }
  }

  function handleClose() {
    setErrors({})
    onClose()
  }

  if (!show) return null

  const roles = [
    { value: "Admin", icon: "🛡️" },
    { value: "Directeur", icon: "📊" },
    { value: "Directeur Generale", icon: "👤" },
  ]

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => e.target == e.currentTarget && handleClose()}>

      <div className="bg-white w-[420px] rounded-2xl shadow-2xl overflow-hidden">


        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-white">Nouvel utilisateur</h3>
              <p className="text-indigo-200 text-xs mt-0.5">Remplissez les informations du compte</p>
            </div>
            <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-sm font-bold">
              ✕
            </button>
          </div>
        </div>


        <div className="px-6 py-5 space-y-4">


          <div className="grid grid-cols-2 gap-3">

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Prénom</label>
              <input
                type="text"
                placeholder="Prénom"
                value={newUser.prenom}
                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-slate-50 outline-none text-black
                  ${errors.prenom ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-indigo-400"}`}
              />
              {errors.prenom && <p className="text-xs text-red-500">⚠ {errors.prenom}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Nom</label>
              <input
                type="text"
                placeholder="Nom"
                value={newUser.nom}
                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-slate-50 outline-none text-black
                  ${errors.nom ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-indigo-400"}`}
              />
              {errors.nom && <p className="text-xs text-red-500">⚠ {errors.nom}</p>}
            </div>

          </div>

          {/* Direction */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Direction
            </label>
            <input
              type="text"
              placeholder="Ex: DSI, DFC, DLOG..."
              value={newUser.direction}
              onChange={(e) => setNewUser({ ...newUser, direction: e.target.value })}
              className={` w-full px-3 py-2.5 rounded-xl border text-sm bg-slate-50 text-black outline-none border-slate-200 focus:border-indigo-400
                ${errors.direction ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-indigo-400"}`}
            />
            {errors.direction&& <p className="text-xs text-red-500">⚠ {errors.direction}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Email</label>
            <input
              type="email"
              placeholder="exemple@email.tn"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-slate-50 outline-none text-black
                ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-indigo-400"}`}
            />
            {errors.email && <p className="text-xs text-red-500">⚠ {errors.email}</p>}
          </div>


          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Rôle</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map(({ value, icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setNewUser({ ...newUser, role: value })}
                  className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition-all
                    ${newUser.role == value
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                >
                  <span className="text-base">{icon}</span>
                  {value}
                </button>
              ))}
            </div>
          </div>

        </div>


        <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-2">
          <button onClick={handleClose} className="px-5 py-2 rounded-xl text-sm text-slate-600 border border-slate-200 hover:bg-slate-200">
            Annuler
          </button>
          <button onClick={handleSubmit} className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700">
            ✓ Créer le compte
          </button>
        </div>

      </div>
    </div>
  )
}