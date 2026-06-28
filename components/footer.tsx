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
            <p className="text-sm font-medium text-foreground/70">AI Business Operating System</p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Modular software, automation tools and AI-powered platforms to operate and scale real businesses.
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

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Platform', href: '#platform' },
                { label: 'Apps', href: '#apps' },
                { label: 'Ecosystems', href: '#ecosystems' },
                { label: 'Studio', href: '#studio' },
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

          {/* Apps */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Apps</h4>
            <ul className="space-y-2">
              {[
                { label: 'DAIEGO Store', href: '#apps' },
                { label: 'DAIEGO Clofi', href: '#apps' },
                { label: 'DAIEGO Receipts', href: '#apps' },
                { label: 'DAIEGO Streaming', href: '#apps' },
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

          {/* Ecosystems & Studio */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Ecosystems</h4>
            <ul className="space-y-2">
              {[
                { label: 'DAIEGO Toys', href: '#ecosystems' },
                { label: 'DAIEGO Studio', href: '#studio' },
                { label: 'Contact', href: '#contact' },
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
