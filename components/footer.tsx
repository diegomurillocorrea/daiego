'use client';

import { Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary shadow-[inset_0_1px_0_0_rgba(204,52,49,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="bg-linear-to-r from-primary to-accent/90 bg-clip-text text-2xl font-bold text-transparent">
              DAIEGO
            </h3>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Custom software solutions for modern businesses. Built to scale.
            </p>
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="inline-flex rounded-lg border border-border bg-background p-2 text-foreground/60 transition-all duration-200 hover:border-accent/35 hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2">
              {[
                { label: 'Receipts', href: '#' },
                { label: 'Streaming', href: '#' },
                { label: 'Finance', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#' },
                { label: 'Process', href: '#' },
                { label: 'Contact', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Solutions', href: '#' },
                { label: 'Services', href: '#' },
                { label: 'Pricing', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/60 transition-colors hover:text-accent/90"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">
            DAIEGO LLC © 2026. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-foreground/50 transition-colors hover:text-accent/85">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/50 transition-colors hover:text-accent/85">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
