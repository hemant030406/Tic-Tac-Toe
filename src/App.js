// import logo from './logo.svg';
import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Footer from './components/Footer';
import Main from './components/Main';
import MainAlt from './components/MainAlt';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreateRoom></CreateRoom>}></Route>
        <Route path='/room/:roomName' element={<><MainAlt></MainAlt><Footer></Footer></>}></Route>
        <Route path='/joinroom' element={<JoinRoom></JoinRoom>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
