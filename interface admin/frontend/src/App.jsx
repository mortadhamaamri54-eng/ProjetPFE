import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage       from "./Pages/LoginPage.jsx"
import Dashboard       from "./Pages/Dashboard"
import AccountPage     from "./Pages/Account"

import AuditPage       from "./Pages/Audit"
import PrivateRoute    from "./component/PrivateRoute"
import ParametresPage  from "./Pages/Parametre.jsx"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Admin */}
      <Route path="/dashboard"        element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin/comptes"    element={<PrivateRoute><AccountPage /></PrivateRoute>} />

      <Route path="/admin/logs"       element={<PrivateRoute><AuditPage /></PrivateRoute>} />
      <Route path="/admin/parametres" element={<PrivateRoute><ParametresPage /></PrivateRoute>} />

      

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}