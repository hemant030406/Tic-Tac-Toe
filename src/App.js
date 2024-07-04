// import logo from './logo.svg';
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
import Main from './components/Main/Main';
import Docs from './components/Docs/Docs';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/docs' element={<Docs/>} />
          <Route path='/room' element={<CreateRoom />} />
          <Route path='/room/:roomName/:name' element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
