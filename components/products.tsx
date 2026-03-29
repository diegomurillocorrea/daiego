'use client';

import { Button } from '@/components/ui/button';
import { CreditCard, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'DAIEGO Receipts',
    description: 'Payment and receipt management system',
    icon: CreditCard,
    features: ['Client Management', 'Service Tracking', 'Payment Methods', 'Daily Control', 'Payment History'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    id: 2,
    name: 'DAIEGO Streaming',
    description: 'Streaming account administration platform',
    icon: TrendingUp,
    features: ['Account Management', 'Client Profiles', 'Subscription Control', 'Card Management', 'Email Integration'],
    color: 'from-primary/20 to-primary/5',
  },
  {
    id: 3,
    name: 'DAIEGO Finance',
    description: 'Savings and loans / finance platform',
    icon: DollarSign,
    features: ['Secure Access', 'Account Control', 'User Management', 'Finance Workflows', 'Risk Assessment'],
    color: 'from-primary/20 to-primary/5',
  },
];

export function Products() {
  return (
    <section id="products" className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl lg:text-5xl font-bold text-foreground">
            Featured Products
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Our suite of integrated solutions designed to power modern business operations
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-secondary p-8 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_12px_40px_-12px_rgba(0,188,125,0.1),0_8px_32px_-14px_rgba(204,52,49,0.07)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent/30 before:to-transparent"
              >
                {/* Product Header */}
                <div className="mb-6 space-y-4">
                  <div className="inline-flex p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                  <p className="text-foreground/60">{product.description}</p>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3 flex-grow">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${idx % 2 === 0 ? 'bg-primary' : 'bg-accent/80'}`}
                      />
                      <span className="text-foreground/70 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* UI Preview Area */}
                <div className="mb-8 h-32 bg-background border border-border/50 rounded-xl p-4 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-0 w-16 h-16 bg-primary/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-0 h-12 w-12 rounded-full bg-accent/15 blur-xl" />
                  </div>
                  <div className="relative z-10 w-full space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-2 bg-primary/10 rounded w-1/2"></div>
                    <div className="flex gap-2">
                      <div className="h-2 bg-primary/20 rounded w-1/3 flex-grow"></div>
                      <div className="h-2 bg-primary/10 rounded w-1/3 flex-grow"></div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11"
                >
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
