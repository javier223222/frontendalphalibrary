import AgregarLibro from './pages/AgregraLibro';
import Libros from './pages/Libros';

import './css/App.css';

import AppRouter from './routes/AppRouter';
function App() {
  return (
    <div className="App">
     <AppRouter></AppRouter>
    </div>
  );
}

export default App;
