import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import EmergencyForm from './pages/EmergencyForm';
import ReliefCenters from './pages/ReliefCenters';
import Analytics from './pages/Analytics';
import EmergencyContactsMarquee from './components/EmergencyContactsMarquee';

const queryClient = new QueryClient();
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/emergency" element={<EmergencyForm />} />
                <Route path="/relief-centers" element={<ReliefCenters />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </main>
            <EmergencyContactsMarquee />
            <Toaster position="top-right" />
          </div>
        </Router>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;