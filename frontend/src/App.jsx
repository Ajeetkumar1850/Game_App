import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Members from "./pages/Members";
import Games from "./pages/Games";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Members />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
