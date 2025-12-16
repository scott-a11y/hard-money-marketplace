import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Building2, TrendingUp, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Connect <span className="text-blue-600">Borrowers</span> with
            <br />
            <span className="text-blue-600">Hard Money Lenders</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            The premier marketplace for fix-and-flip financing. Post your deal or find funding in minutes.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/borrower/submit"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Post a Deal
            </Link>
            <Link
              href="/lender/dashboard"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              Find Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600">$50M+</div>
            <div className="mt-2 text-gray-600">Funded This Year</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600">500+</div>
            <div className="mt-2 text-gray-600">Active Deals</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600">24hrs</div>
            <div className="mt-2 text-gray-600">Avg. Response Time</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Hard Money Market?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="inline-block p-3 bg-blue-100 rounded-lg mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Approval</h3>
            <p className="text-gray-600">Get matched with lenders in hours, not weeks</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-block p-3 bg-green-100 rounded-lg mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Lenders</h3>
            <p className="text-gray-600">All lenders are vetted and verified</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-block p-3 bg-purple-100 rounded-lg mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparent Terms</h3>
            <p className="text-gray-600">Clear LTV, LTC, and rate information</p>
          </div>
          <div className="text-center p-6">
            <div className="inline-block p-3 bg-orange-100 rounded-lg mb-4">
              <Building2 className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nationwide Coverage</h3>
            <p className="text-gray-600">Lenders available in all 50 states</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of borrowers and lenders using our platform
          </p>
          <Link
            href="/borrower/submit"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            Submit Your First Deal
          </Link>
        </div>
      </section>
    </div>
  );
}
