import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil'; 
import Home from './pages/Home'; 
import Layout from './components/Layout';
import AssistenteVirtual from './pages/AssistenteVirtual';
import NotasFrequencias from './pages/NotasFrequencias';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida com Layout (Header + Sidebar + Footer) */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="assistente" element={<AssistenteVirtual />} />
          <Route path="/notas-frequencias" element={<NotasFrequencias />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
