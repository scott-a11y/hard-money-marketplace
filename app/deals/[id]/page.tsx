'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { MapPin, DollarSign, Calendar, FileText, ArrowLeft, Heart, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface Deal {
  id: string
  address: string
  city: string
  state: string
  price: number
  rehab: number
  arv: number
  ltv: number
  status: string
  description?: string
  timeline?: string
  property_type?: string
  bedrooms?: number
  bathrooms?: number
  sqft?: number
  year_built?: number
  photos?: string[]
  created_at: string
}

export default function DealDetailPage() {
  const params = useParams()
  const [deal, setDeal] = useState<Deal | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    async function fetchDeal() {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (data) {
        setDeal(data as Deal)
      }
      setLoading(false)
    }
    fetchDeal()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
          <p className="text-gray-600 mb-4">This deal may have been removed or doesn't exist.</p>
          <Link href="/lender/dashboard" className="text-blue-600 hover:underline">
            Back to Deals
          </Link>
        </div>
      </div>
    )
  }

  const photos = deal.photos && deal.photos.length > 0 
    ? deal.photos 
    : ['/placeholder-property.jpg']

  const totalCost = deal.price + deal.rehab
  const profit = deal.arv - totalCost
  const roi = ((profit / totalCost) * 100).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/lender/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Deals
          </Link>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
              <Heart size={18} />
              Save
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
              <MessageSquare size={18} />
              Express Interest
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Photos & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <Image 
                  src={photos[currentPhoto]} 
                  alt={`${deal.address} - Photo ${currentPhoto + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {deal.status.toUpperCase()}
                </div>
              </div>
              {photos.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhoto(idx)}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        currentPhoto === idx ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <Image src={photo} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Property Type</p>
                  <p className="font-semibold text-gray-900">{deal.property_type || 'Single Family'}</p>
                </div>
                {deal.bedrooms && (
                  <div>
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold text-gray-900">{deal.bedrooms}</p>
                  </div>
                )}
                {deal.bathrooms && (
                  <div>
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold text-gray-900">{deal.bathrooms}</p>
                  </div>
                )}
                {deal.sqft && (
                  <div>
                    <p className="text-sm text-gray-500">Square Feet</p>
                    <p className="font-semibold text-gray-900">{deal.sqft.toLocaleString()} sq ft</p>
                  </div>
                )}
                {deal.year_built && (
                  <div>
                    <p className="text-sm text-gray-500">Year Built</p>
                    <p className="font-semibold text-gray-900">{deal.year_built}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-semibold text-gray-900">{deal.timeline || '6 months'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {deal.description || 'This is a great fix-and-flip opportunity in a desirable neighborhood. Property needs cosmetic updates including kitchen and bath renovations, new flooring, and fresh paint throughout.'}
              </p>
            </div>

            {/* Exit Strategy */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exit Strategy</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Purchase Price</span>
                  <span className="font-bold text-gray-900">${deal.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Rehab Budget</span>
                  <span className="font-bold text-gray-900">${deal.rehab.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-bold text-gray-900">${totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">After Repair Value (ARV)</span>
                  <span className="font-bold text-blue-600">${deal.arv.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Projected Profit</span>
                  <span className="font-bold text-green-600">${profit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ROI</span>
                  <span className="font-bold text-green-600">{roi}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div className="space-y-6">
            {/* Deal Summary Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{deal.address}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    {deal.city}, {deal.state}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Purchase Price</p>
                  <p className="text-2xl font-bold text-blue-900">${deal.price.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">After Repair Value</p>
                  <p className="text-2xl font-bold text-purple-900">${deal.arv.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">Rehab</p>
                    <p className="text-lg font-bold text-gray-900">${(deal.rehab / 1000).toFixed(0)}k</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 font-medium">LTV</p>
                    <p className="text-lg font-bold text-gray-900">{deal.ltv.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors mb-3">
                Make an Offer
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Request More Info
              </button>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar size={16} className="mr-2" />
                  Listed {new Date(deal.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText size={16} className="mr-2" />
                  Deal ID: {deal.id.slice(0, 8)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
