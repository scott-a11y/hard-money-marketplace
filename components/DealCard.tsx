import { Deal } from '@/types';
import Link from 'next/link'
import { MapPin, DollarSign, TrendingUp } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  return (
    <Link href={`/deals/${deal.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer">
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
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">Purchase Price</p>
            <p className="text-lg font-bold text-gray-900">${(deal.purchase_price / 1000).toFixed(0)}k</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 font-medium">ARV</p>
            <p className="text-lg font-bold text-gray-900">${(deal.arv / 1000).toFixed(0)}k</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Rehab</p>
            <p className="font-semibold text-gray-900">${(deal.rehab_budget / 1000).toFixed(0)}k</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">LTV</p>
            <p className="font-semibold text-gray-900">{deal.ltv.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">LTC</p>
            <p className="font-semibold text-gray-900">{(((deal.purchase_price + deal.rehab_budget) / deal.arv) * 100).toFixed(1)}%</p>
          </div>
        </div>

        <button className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-colors">
          View Deal Details
        </button>
      </div>
    </Link>
  )
}
