import Link from 'next/link';
import { Home, Building2, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Hard Money Market</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link 
              href="/borrower/submit" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <User className="w-5 h-5" />
              <span>Post Deal</span>
            </Link>
            <Link 
              href="/lender/dashboard" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
            >
              <Building2 className="w-5 h-5" />
              <span>Find Deals</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
