import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import RoomPage from './pages/Room';
import chatRoom from './pages/Room';

// i have imported browser router in index.js

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route >
      <Route path='/room/:roomId' element={<RoomPage />}></Route >
      <Route path='/chatRoom' element={<chatRoom />}></Route >
    </Routes>
  );
}

export default App;
