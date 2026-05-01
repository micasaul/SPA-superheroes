import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Marvel from './pages/Marvel'
import DC from './pages/DC'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marvel" element={<Marvel />} />
        <Route path="/dc" element={<DC />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App