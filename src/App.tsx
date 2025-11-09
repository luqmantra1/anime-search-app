import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;


