// import logo from './logo.svg';
import './App.css';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import Footer from './components/Footer/Footer';
import Main from './components/Home/Main';
import MainAlt from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
      // {/* <Main></Main> */}c
      <>
      <MainAlt></MainAlt>
      <Footer></Footer>
      </>
  );
}

export default App;
