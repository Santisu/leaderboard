import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
import { getCSRFToken } from "./api/training.api"
import MainPage from "./pages/MainPage"
import UserPage from "./pages/UserPage"
import TrainingPage from "./pages/TrainingPage"
import Navigation from "./components/Navigation"
export default function App() {

  useEffect(() => {
    const verifyCSRFToken = async () => {
      try {
        await getCSRFToken();
        console.log("Token CSRF verificado y/o obtenido exitosamente.");
      } catch (error) {
        console.error("Error al verificar/obtener el token CSRF:", error);
      }
    };

    verifyCSRFToken();
  }, []);

  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <div className="container mx-auto my-28 p-3">
      <Routes>
        <Route path="/" element={<Navigate to="/main" />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/user" element={<UserPage />}></Route>
        <Route path="/training/:activityId" element={<TrainingPage />} ></Route>
      </Routes>
      <Toaster />
      </div>
    </BrowserRouter>
  )
}
