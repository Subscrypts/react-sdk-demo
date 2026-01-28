import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Premium from './pages/Premium';
import Account from './pages/Account';
import Merchant from './pages/Merchant';
import HooksPage from './pages/examples/Hooks';
import ComponentsPage from './pages/examples/Components';
import UtilitiesPage from './pages/examples/Utilities';
import AdvancedPage from './pages/examples/Advanced';
import { DevSidebar } from './components/dev/DevSidebar';
import { DevToggleButton } from './components/dev/DevToggleButton';
import { useDevSidebar } from './hooks/useDevSidebar';
import { getDocumentationForRoute } from './utils/devDocs';

/**
 * Main App Component with Developer Sidebar
 *
 * The DevSidebar provides context-aware documentation based on the current route.
 * It slides in from the right when the toggle button is clicked.
 */
function AppContent() {
  const location = useLocation();
  const { isOpen, toggle } = useDevSidebar();

  // Get documentation for current route
  const documentation = getDocumentationForRoute(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/account" element={<Account />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/examples/hooks" element={<HooksPage />} />
          <Route path="/examples/components" element={<ComponentsPage />} />
          <Route path="/examples/utilities" element={<UtilitiesPage />} />
          <Route path="/examples/advanced" element={<AdvancedPage />} />
        </Routes>
      </main>
      <Footer />

      {/* Developer Documentation Sidebar */}
      <DevSidebar
        isOpen={isOpen}
        onToggle={toggle}
        documentation={documentation}
      />

      {/* Fixed Toggle Button (bottom-right) */}
      <DevToggleButton isOpen={isOpen} onClick={toggle} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
