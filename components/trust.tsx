'use client';

import { Code2, Zap, Shield, Layers } from 'lucide-react';

const benefits = [
  {
    icon: Code2,
    label: 'Custom Web Apps',
    description: 'Tailored applications built to your unique business needs',
  },
  {
    icon: Zap,
    label: 'Admin Panels',
    description: 'Powerful dashboards for full operational control',
  },
  {
    icon: Shield,
    label: 'Business Automation',
    description: 'Streamline workflows and reduce manual tasks',
  },
  {
    icon: Layers,
    label: 'Internal Tools',
    description: 'Purpose-built systems that grow with your business',
  },
];

const audiences = [
  { title: 'Entrepreneurs', description: 'Build ambitious ideas at scale' },
  { title: 'Growing Companies', description: 'Systems that scale with your success' },
  { title: 'Operations Teams', description: 'Tools designed for efficiency' },
  { title: 'Digital Businesses', description: 'Platforms built for the modern market' },
];

export function Trust() {
  return (
    <section className="py-20 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main statement */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl lg:text-5xl font-bold text-foreground">
            Trusted by teams who demand more
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            DAIEGO builds software for companies that are serious about growth
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-background border border-border rounded-xl p-6 hover:border-primary/45 transition-all duration-300 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]"
              >
                <div className="mb-4 inline-flex rounded-lg bg-linear-to-br from-primary/12 to-accent/10 p-2 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.label}</h3>
                <p className="text-sm text-foreground/60">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Audiences */}
        <div className="rounded-2xl border border-border bg-background p-12 shadow-[inset_0_1px_0_0_rgba(204,52,49,0.12)]">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground">
            We build software for:
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((audience, idx) => (
              <div key={idx} className="space-y-2 text-center">
                <p
                  className={`text-xl font-semibold ${idx % 2 === 0 ? 'text-primary' : 'text-accent/90'}`}
                >
                  {audience.title}
                </p>
                <p className="text-foreground/60 text-sm">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
