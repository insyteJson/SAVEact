import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Locator from './pages/Locator';
import Checklist from './pages/Checklist';
import Aid from './pages/Aid';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <div id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/locator" element={<Locator />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/aid" element={<Aid />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
