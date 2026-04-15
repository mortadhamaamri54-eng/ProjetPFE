import { Routes, Route } from "react-router-dom"

import DGDashboard from "./Pages/dg/DGDashboard"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DGDashboard />} />
      
    </Routes>
  )
}