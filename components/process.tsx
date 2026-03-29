'use client';

import { Compass, Palette, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Compass,
    title: 'Discover',
    description: 'We deeply understand your business, challenges, and goals through collaborative consultation',
  },
  {
    number: '02',
    icon: Palette,
    title: 'Design',
    description: 'Beautiful, functional interfaces that solve real problems and delight your team',
  },
  {
    number: '03',
    icon: Code2,
    title: 'Build',
    description: 'Clean, scalable code using modern technologies and best practices',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Seamless deployment and ongoing support to keep your systems running smoothly',
  },
];

export function Process() {
  return (
    <section id="process" className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl lg:text-5xl font-bold text-foreground">
            Our Process
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A proven approach to delivering exceptional software solutions
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Timeline connector line - hidden on mobile */}
          <div className="pointer-events-none absolute top-24 right-[12.5%] left-[12.5%] hidden h-0.5 bg-linear-to-r from-primary/0 via-accent/35 to-primary/0 lg:block" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative">
                {/* Step Card */}
                <div className="flex h-full flex-col rounded-2xl border border-border bg-secondary p-8 transition-all duration-300 hover:border-primary/45 hover:shadow-[0_10px_36px_-12px_rgba(0,188,125,0.08),0_6px_28px_-10px_rgba(204,52,49,0.06)]">
                  {/* Number and Icon Container */}
                  <div className="mb-6 space-y-4">
                    <div className="relative">
                      <div className="inline-flex w-16 h-16 rounded-full bg-primary/10 items-center justify-center relative z-10 border-4 border-background">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <p
                        className={`absolute -top-6 -right-4 text-6xl font-bold ${idx % 2 === 0 ? 'text-foreground/10' : 'text-accent/[0.12]'}`}
                      >
                        {step.number}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
