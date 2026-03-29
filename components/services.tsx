'use client';

import { Wrench, LayoutDashboard, Zap, TrendingUp, Lock, BarChart3 } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Custom Software Development',
    description: 'Purpose-built applications tailored to your business workflows and challenges',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    description: 'Comprehensive control centers for managing your business operations',
  },
  {
    icon: Zap,
    title: 'Internal Systems',
    description: 'Custom tools that streamline processes and improve team productivity',
  },
  {
    icon: TrendingUp,
    title: 'Finance & Payment Platforms',
    description: 'Secure systems for managing transactions, accounts, and financial operations',
  },
  {
    icon: BarChart3,
    title: 'Inventory & Management Systems',
    description: 'Real-time tracking and control of your business resources',
  },
  {
    icon: Lock,
    title: 'Process Automation',
    description: 'Intelligent workflows that reduce manual effort and increase efficiency',
  },
];

export function Services() {
  return (
    <section id="solutions" className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl lg:text-5xl font-bold text-foreground">
            What We Offer
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Complete software solutions designed for modern business challenges
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="group rounded-xl border border-border bg-secondary p-8 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
              >
                <div
                  className={`mb-6 inline-flex rounded-lg p-3 text-primary transition-colors group-hover:opacity-100 ${
                    idx % 2 === 0
                      ? 'bg-linear-to-br from-primary/12 to-primary/5 group-hover:from-primary/18 group-hover:to-primary/8'
                      : 'bg-linear-to-br from-primary/10 to-accent/8 group-hover:from-primary/14 group-hover:to-accent/12'
                  }`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground/60">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
