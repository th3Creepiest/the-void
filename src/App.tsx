import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TestingPage from "./pages/TestingPage"
import HolesPage from "./pages/HolesPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/testing" element={<TestingPage />} />
        <Route path="/holes" element={<HolesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
