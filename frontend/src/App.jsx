import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaFire, FaInfoCircle, FaGithub } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gradient-to-r from-secondary to-secondary-light text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-white/10 rounded-full transition-all duration-300 group-hover:bg-white/20">
                <FaFire className="text-accent text-2xl" />
              </div>
              <span className="font-bold text-xl tracking-tight">Resume Roaster</span>
            </Link>
            <div className="flex space-x-4">
              <Link to="/about" className="nav-link">
                <FaInfoCircle />
                <span>About</span>
              </Link>
              <a 
                href="https://github.com/yourusername/resume-roaster" 
                target="_blank" 
                rel="noopener noreferrer"
                className="nav-link"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="bg-gradient-to-r from-secondary to-secondary-light text-white mt-20">
          <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <FaFire className="text-accent text-2xl" />
                <span className="font-bold text-xl">Resume Roaster</span>
              </div>
              <div className="text-sm text-white/80">
                © {new Date().getFullYear()} Resume Roaster | Built with <span className="text-accent">🔥</span> and React
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
