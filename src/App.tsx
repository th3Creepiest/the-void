import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TestingPage from "./pages/TestingPage"
import HolesPage from "./pages/HolesPage"
import ShootEmUp from "./pages/ShootEmUp"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/holes" element={<HolesPage />} />
        <Route path="/shootemup" element={<ShootEmUp />} />
      </Routes>
    </BrowserRouter>
  )
}
