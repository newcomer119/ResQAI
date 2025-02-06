import { useUser, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, BarChart2, Home } from 'lucide-react';

export default function Navigation() {
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="font-bold text-xl">DisasterResponse</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link to="/emergency" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <AlertTriangle className="h-4 w-4" />
                <span>Report Emergency</span>
              </Link>
              <Link to="/relief-centers" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <MapPin className="h-4 w-4" />
                <span>Relief Centers</span>
              </Link>
              <Link to="/analytics" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-100">
                <BarChart2 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}