import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Transparent Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your learning goals.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {[
            { 
              name: 'Basic', 
              price: '₹2,999', 
              period: '/year',
              description: 'Essential resources for self-paced learning.',
              features: ['Recorded Video Lectures', 'Basic Mock Tests (5)', 'PDF Notes', 'Email Support'],
              cta: 'Get Basic',
              popular: false
            },
            { 
              name: 'Standard', 
              price: '₹5,999', 
              period: '/year',
              description: 'Perfect balance of live interaction and practice.',
              features: ['Everything in Basic', 'Live Classes', 'Full Test Series (20+)', 'Doubt Clearing Sessions', 'Performance Analytics'],
              cta: 'Get Standard',
              popular: true
            },
            { 
              name: 'Premium', 
              price: '₹9,999', 
              period: '/year',
              description: 'Ultimate preparation with personalized guidance.',
              features: ['Everything in Standard', '1-on-1 Mentorship', 'Offline Downloads', 'Priority Support', 'Hardcopy Study Material'],
              cta: 'Get Premium',
              popular: false
            },
          ].map((plan) => (
            <div key={plan.name} className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-lg ${plan.popular ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <div className="mb-6 flex items-baseline">
                <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="ml-1 text-gray-500">{plan.period}</span>
              </div>
              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="mr-3 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/login" 
                className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-bold transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600">
            Need a custom plan for your institute? <Link href="/contact" className="font-medium text-blue-600 hover:underline">Contact Sales</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
