'use client';

import { CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    title: 'Tailored Solutions',
    description: 'We build software specifically for real business operations, not generic templates',
  },
  {
    title: 'Modern & Clean Interfaces',
    description: 'Beautiful, intuitive design that your team will actually enjoy using',
  },
  {
    title: 'Scalable Architecture',
    description: 'Systems built to grow with your business from day one to enterprise scale',
  },
  {
    title: 'Fast Development',
    description: 'Rapid iteration and deployment without sacrificing code quality',
  },
  {
    title: 'Centralized Management',
    description: 'Single dashboard to control all your business operations and workflows',
  },
  {
    title: 'Focus on Usability',
    description: 'Every feature designed with your team\'s actual workflow in mind',
  },
];

export function WhyChoose() {
  return (
    <section id="about" className="py-20 bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose <span className="text-accent/90">DAIEGO</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We&apos;re not just developers—we&apos;re partners in your business growth
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex gap-4 rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_8px_32px_-10px_rgba(204,52,49,0.07),0_6px_24px_-8px_rgba(0,188,125,0.06)]"
            >
              <div className="flex-shrink-0">
                <CheckCircle2
                  className={`mt-1 h-6 w-6 ${idx % 2 === 0 ? 'text-primary' : 'text-accent/85'}`}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-foreground/60">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
