'use client';

import { useMemo } from 'react';

export function Showcase() {
  // Generate consistent random data using seed-based approach
  const randomDataPoints = useMemo(() => {
    return [...Array(4)].map((_, i) => {
      const seed = i * 0.234567;
      const random = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
      return random * 60 + 40;
    });
  }, []);

  const randomPercentages = useMemo(() => {
    return [...Array(4)].map((_, i) => {
      const seed = (i + 10) * 0.234567;
      const random = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);
      return Math.round(random * 100);
    });
  }, []);

  return (
    <section className="py-20 bg-secondary border-t border-border relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/[0.09] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="section-heading-ruby-line text-4xl font-bold text-foreground lg:text-5xl">
            Built for Real Operations
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Visual systems powered by enterprise-grade architecture
          </p>
        </div>

        {/* Large Visual Showcase */}
        <div className="rounded-3xl border border-border bg-background p-8 shadow-[inset_0_1px_0_0_rgba(204,52,49,0.1)] lg:p-12">
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Admin Panel */}
            <div className="space-y-6">
              {/* Top Admin Card */}
              <div className="bg-secondary border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Admin Panel</h4>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-primary/20 rounded w-full"></div>
                    <div className="h-2 bg-primary/10 rounded w-5/6"></div>
                    <div className="h-2 bg-primary/20 rounded w-4/6"></div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-foreground/50 mt-2">Last updated: 2 mins ago</p>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary border border-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-xs text-foreground/50 mb-2">Total Users</p>
                  <p className="text-2xl font-bold text-primary">2,847</p>
                </div>
                <div className="bg-secondary border border-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-xs text-foreground/50 mb-2">Active</p>
                  <p className="text-2xl font-bold text-primary">1,294</p>
                </div>
              </div>
            </div>

            {/* Center Column - Main Dashboard */}
            <div className="space-y-6">
              {/* Large Dashboard Card */}
              <div className="bg-secondary border border-border rounded-2xl p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 h-full">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs text-foreground/50">Dashboard</p>
                    <p className="text-2xl font-bold text-foreground">Performance</p>
                  </div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className="h-2 flex-grow rounded-full"
                          style={{
                            width: `${randomDataPoints[i]}%`,
                            backgroundColor: i % 2 === 0 ? '#00BC7D' : '#CC3431',
                            opacity: 1 - i * 0.12,
                          }}
                        />
                        <span className="text-xs text-foreground/50 w-8 text-right">
                          {randomPercentages[i]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Secondary Metric */}
              <div className="bg-secondary border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <p className="text-xs text-foreground/50 mb-2">Revenue</p>
                <p className="text-3xl font-bold text-primary mb-2">$124,580</p>
                <p className="text-xs font-medium text-accent/90">↑ 12.5% this week</p>
              </div>
            </div>

            {/* Right Column - Forms & Controls */}
            <div className="space-y-6">
              {/* Login Form Card */}
              <div className="bg-secondary border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Secure Access</p>
                    <p className="text-xs text-foreground/50">Member Login</p>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/30"
                      readOnly
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/30"
                      readOnly
                    />
                    <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                      Access Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Cards */}
              <div className="space-y-3">
                <div className="bg-secondary border border-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground">System Status</span>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-xs text-foreground/50 mt-1">All systems operational</p>
                </div>
                <div className="bg-secondary border border-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-xs text-foreground/50">Last Sync</p>
                  <p className="text-sm font-medium text-foreground">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
