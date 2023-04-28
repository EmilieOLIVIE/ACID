
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/main.css"
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

import Main from "./components/Main"
import ConsulationsList from "./components/Lists/ConsultationsList"
import PatientsList from "./components/Lists/PatientsList"
import Consultation from "./components/Consultation/Consultation"
import Patient from "./components/Patient"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<Main />}>
          <Route index element={<ConsulationsList patientId={null} />} />
          <Route path="consultations" element={<ConsulationsList patientId={null} />} />
          <Route path="consultations/:id" element={<Consultation />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/:id" element={<Patient />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
