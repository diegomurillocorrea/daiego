'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Products', href: '#products' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-[inset_0_-1px_0_0_rgba(204,52,49,0.12)] z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <img src="/logos/daiego-white-black.svg" alt="DAIEGO" className="h-12 w-12" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative inline-block px-4 py-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-200 after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:origin-center after:scale-x-0 after:rounded-full after:bg-accent/45 after:transition-transform hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex gap-3">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            View Products
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Book a Demo
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-foreground/70 hover:text-primary rounded-lg transition-colors hover:bg-accent/[0.07]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                View Products
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
