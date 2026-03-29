'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section id="contact" className="py-20 bg-background border-t border-border relative overflow-hidden">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-accent/[0.06] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <h2 className="section-heading-ruby-line text-balance text-4xl font-bold text-foreground lg:text-5xl">
          Let&apos;s build the software your business actually needs
        </h2>

        <p className="text-xl text-foreground/70 text-balance">
          Ready to transform your operations? Our team is ready to discuss your vision and create a custom solution.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8 text-base font-medium"
          >
            Contact DAIEGO <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border border-primary text-primary hover:bg-primary/10 rounded-lg h-12 px-8 text-base font-medium"
          >
            Schedule a Call
          </Button>
        </div>

        <p className="text-sm text-foreground/50 pt-4">
          Response within 24 hours • No obligation • Free consultation
        </p>
      </div>
    </section>
  );
}
