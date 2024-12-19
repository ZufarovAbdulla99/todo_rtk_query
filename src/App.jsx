import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/todos" element={<div>Todo List</div>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
