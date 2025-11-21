import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { PageTransition } from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { Publisher } from './pages/Publisher';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/read/:novelId/:chapterId?" element={<PageTransition><Reader /></PageTransition>} />
        <Route path="/publish" element={<PageTransition><Publisher /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
