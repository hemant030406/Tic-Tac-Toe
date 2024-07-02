// import logo from './logo.svg';
import './App.css';
import CreateRoom from './components/CreateRoom/CreateRoom';
// import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Chat from './components/Chat/Chat';
import { Provider } from 'react-redux';
import store from './components/Reducer/Store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<CreateRoom />} />
          <Route path='/room/:roomName' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
