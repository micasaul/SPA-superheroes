import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Marvel from './pages/Marvel'
import DC from './pages/DC'
import Agregar from './pages/Agregar'
import Detalle from './pages/Detalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marvel" element={<Marvel />} />
        <Route path="/dc" element={<DC />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/personaje/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App