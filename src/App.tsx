import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Calendar } from './components/Calendar';
import { Admin } from './components/Admin';
import { useEventContext } from './store/useEventContext';
import { Calendar as CalendarIcon, Settings } from 'lucide-react';

function App() {
  const { language } = useEventContext();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-[#1c2c5b] text-white p-4 shadow-md flex justify-between items-center">
          <div className="font-bold text-xl tracking-wider">
            {language === 'en' ? 'PWA Calendar' : 'Calendario PWA'}
          </div>
          <div className="flex gap-4">
            <Link to="/" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              <CalendarIcon className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'en' ? 'Calendar' : 'Calendario'}</span>
            </Link>
            <Link to="/admin" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">{language === 'en' ? 'Admin' : 'Admin'}</span>
            </Link>
          </div>
        </nav>

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
