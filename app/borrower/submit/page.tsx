'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { calculateLTV, calculateLTC } from '@/lib/utils';

export default function SubmitDeal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zip: '',
    purchase_price: '',
    rehab_budget: '',
    arv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const purchasePrice = parseFloat(formData.purchase_price);
    const rehabBudget = parseFloat(formData.rehab_budget);
    const arv = parseFloat(formData.arv);

    const ltv = calculateLTV(purchasePrice, arv);
    const ltc = calculateLTC(purchasePrice, rehabBudget, arv);

    try {
      const { error } = await supabase.from('deals').insert([
        {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          purchase_price: purchasePrice,
          rehab_budget: rehabBudget,
          arv: arv,
          ltv: ltv,
          ltc: ltc,
          status: 'active',
          borrower_id: 'demo-user',
        },
      ]);

      if (error) throw error;

      alert('Deal submitted successfully!');
      router.push('/lender/dashboard');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit deal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Your Deal
          </h1>
          <p className="text-gray-600 mb-8">
            Fill out the details below to connect with hard money lenders
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Portland"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="OR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) =>
                    setFormData({ ...formData, zip: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="97201"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.purchase_price}
                  onChange={(e) =>
                    setFormData({ ...formData, purchase_price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="200000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rehab Budget ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.rehab_budget}
                  onChange={(e) =>
                    setFormData({ ...formData, rehab_budget: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ARV ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.arv}
                  onChange={(e) =>
                    setFormData({ ...formData, arv: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="350000"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Deal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
