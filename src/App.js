import { Route, Routes } from "react-router";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
