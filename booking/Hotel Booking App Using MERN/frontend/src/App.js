import './App.css';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <>
        <Navbar />
        <h1>
          {process.env.REACT_APP_code}
        </h1>
      </>
    </div>
  );
}

export default App;
