import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil'; 
import Home from './pages/Home'; 
import Layout from './components/Layout';
import AssistenteVirtual from './pages/AssistenteVirtual';
import NotasFrequencias from './pages/NotasFrequencias';
import CalendarioEventos from './pages/CalendarioEventos';
import SaudeBemEstarAluno from './pages/SaudeBemEstarAluno';
import SaudeBemEstarProfessor from './pages/SaudeBemEstarProfessor';
import BibliotecaDigital from './pages/BibliotecaDigital';
import UploadBiblioteca from './pages/UploadBiblioteca';
import Feed from './pages/Feed';
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
          <Route path="/calendario" element={<CalendarioEventos />} />
          <Route path="/saude-bemestar-aluno" element={<SaudeBemEstarAluno />} />
          <Route path="/saude-bemestar" element={<SaudeBemEstarProfessor />} />
          <Route path="/biblioteca" element={<BibliotecaDigital />} />
          <Route path="/upload" element={<UploadBiblioteca />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/notas-frequencias" element={<NotasFrequencias />
        } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
