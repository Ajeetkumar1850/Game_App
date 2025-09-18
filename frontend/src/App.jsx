import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Members from "./pages/Members";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <Routes>
          {/* Redirect root "/" to "/members" */}
          <Route path="/" element={<Navigate to="/members" replace />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
