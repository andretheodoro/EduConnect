import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Home from './pages/Home';
import HomeAluno from './pages/HomeAluno';
import Layout from './components/Layout';
import AssistenteVirtual from './pages/AssistenteVirtual';
import NotasFrequencias from './pages/NotasFrequencias';
import NotasFrequenciasAluno from './pages/NotasFrequenciasAluno';
import CalendarioEventos from './pages/CalendarioEventos';
import SaudeBemEstarAluno from './pages/SaudeBemEstarAluno';
import SaudeBemEstarProfessor from './pages/SaudeBemEstarProfessor';
import BibliotecaDigital from './pages/BibliotecaDigital';
import UploadBiblioteca from './pages/UploadBiblioteca';
import SalaVideo from './pages/SalaVideo';
import Feed from './pages/Feed';
import PrivateRoute from './routes/PrivateRoute';
import './App.css';
import MessageForm from './pages/Messages';
import MessageNotifier from './components/MessageNotifier';

function App() {
  return (
    <>
      <MessageNotifier />
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
            <Route path="perfil" element={<Perfil />} />
            <Route path="assistente" element={<AssistenteVirtual />} />
            <Route path="/calendario" element={<CalendarioEventos />} />
            <Route
              path="/saude-bemestar-aluno"
              element={
                <PrivateRoute tipoUsuario="A">
                  <SaudeBemEstarAluno />
                </PrivateRoute>
              }
            />
            <Route
              path="/saude-bemestar"
              element={
                <PrivateRoute tipoUsuario="P">
                  <SaudeBemEstarProfessor />
                </PrivateRoute>
              }
            />
            <Route
              path="/homeAluno"
              element={
                <PrivateRoute tipoUsuario="A">
                  <HomeAluno />
                </PrivateRoute>
              }
            />
            <Route
              path="/biblioteca"
              element={
                <PrivateRoute tipoUsuario="A">
                  <BibliotecaDigital />
                </PrivateRoute>
              }
            />
            <Route
              path="/notas-frequencia-aluno"
              element={
                <PrivateRoute tipoUsuario="A">
                  <NotasFrequenciasAluno />
                </PrivateRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <PrivateRoute tipoUsuario="P">
                  <UploadBiblioteca />
                </PrivateRoute>
              }
            />
            <Route
              path="/homeProfessor"
              element={
                <PrivateRoute tipoUsuario="P">
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/feed" element={<Feed />} />
            <Route path="/messages" element={<MessageForm />} />
            <Route
              path="/videoconferencia"
              element={
                <PrivateRoute tipoUsuario="P">
                  <SalaVideo />
                </PrivateRoute>
              }
            />
            <Route
              path="/notas-frequencias"
              element={
                <PrivateRoute tipoUsuario="P">
                  <NotasFrequencias />
                </PrivateRoute>
              }
            />
            <Route path="/notas-frequencias" element={<NotasFrequencias />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
