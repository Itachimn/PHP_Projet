import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Ajout from "./pages/Ajout";
import Liste from "./pages/Liste";
import Bilan from "./pages/Bilan";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/ajout" element={<Ajout />} />

        <Route path="/liste" element={<Liste />} />

        <Route path="/bilan" element={<Bilan />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;