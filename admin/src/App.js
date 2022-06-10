import BarNavigation from "../src/components/BarNavigation"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import EspecialidadView from "./views/EspecialidadView"
import CrearEspecialidadView from "./views/CrearEspecialidadView"
import EditarEspecialidad from "./views/EditarEspecialidad"
import MedicoView from "./views/MedicoView"
import CrearMedico from "./views/CrearMedico"
import PacienteView from "../src/views/PacientesView.js"
import EditarPaciente from "./views/EditarPaciente"

export default function App() {
  return (
    <Router>
   <BarNavigation/>
   <div className="container">
     <Routes>
       <Route path="/especialidad" element={<EspecialidadView/>}></Route>
       <Route path="/medico" element={<MedicoView/>}></Route>
       <Route path="/editarEspecialidad/especialidad/:idEsp" element={<EditarEspecialidad/>}></Route>
       <Route path="/crearEspecialidad" element={<CrearEspecialidadView/>}></Route>
       <Route path="/crearMedico" element={<CrearMedico/>}></Route>
       <Route path="/" element={<PacienteView/>}></Route>
       <Route path="/editarPaciente/paciente/:idPac" element={<EditarPaciente/>}></Route>
    </Routes>
   </div>
   </Router>
  )
}
