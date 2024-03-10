// import logo from './logo.svg';
import './App.css';
import CreateRoom from './components/Room/CreateRoom/CreateRoom';
// import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<CreateRoom/>}/>
        <Route path='/room/:roomName' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
