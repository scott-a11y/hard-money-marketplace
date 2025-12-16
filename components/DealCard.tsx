import { Deal } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { MapPin, DollarSign, TrendingUp } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{deal.address}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{deal.city}, {deal.state} {deal.zip}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
          {deal.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center text-gray-600 text-xs mb-1">
            <DollarSign className="w-3 h-3 mr-1" />
            <span>Purchase Price</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(deal.purchase_price)}</p>
        </div>
        <div>
          <div className="flex items-center text-gray-600 text-xs mb-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span>ARV</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(deal.arv)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">Rehab</p>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(deal.rehab_budget)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">LTV</p>
          <p className="text-sm font-semibold text-blue-600">{deal.ltv}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600 mb-1">LTC</p>
          <p className="text-sm font-semibold text-purple-600">{deal.ltc}%</p>
        </div>
      </div>
    </div>
  );
}
