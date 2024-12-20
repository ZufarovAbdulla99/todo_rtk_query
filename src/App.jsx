import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TodoList from "./pages/TodoList"

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
