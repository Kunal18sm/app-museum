import React from 'react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  ShieldCheck, 
  Layers, 
  Code2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="border-b border-slate-200/80 bg-slate-50/50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 mb-4">
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>The Concept</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            About AppMuseum
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            A digital gallery created to celebrate, showcase, and navigate custom web applications and internet tools without clutter or distraction.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Core Philosophy */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Why AppMuseum?</h2>
          <div className="text-sm text-slate-600 leading-relaxed space-y-3 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <p>
              Traditional app stores are bloated with advertisements, installation prompts, and complex requirements. 
              <strong> AppMuseum</strong> is designed specifically for web creators who build independent, browser-first applications and websites.
            </p>
            <p>
              Every entry in AppMuseum is a live website or web tool that you can instantly visit with a single click. There are no downloads, installers, or paywalls required to explore.
            </p>
          </div>
        </section>

        {/* Key Tenets */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Design Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Web-First & Direct Visits</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Focused exclusively on web applications with instant "Visit" buttons rather than native app installers.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Clean Light UI</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Simple, high-contrast, pure white interface without distracting gradients or excessive colors.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Structured Details</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Square icons, clean divider lines, interface screenshots, tech stacks, and release timelines.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 mb-3">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Fully Extensible</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clean JSON data architecture allowing developers to easily add their own portfolio of apps anytime.
              </p>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-2xl bg-slate-900 text-white text-center space-y-4">
          <h2 className="text-xl font-bold">Ready to explore the websites?</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Discover all live tools in our gallery or manage your catalog in seconds.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors"
            >
              Explore Gallery
            </Link>
            <Link
              to="/manage"
              className="px-5 py-2.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"
            >
              Data Manager
            </Link>
          </div>
        </section>

      </main>

    </div>
  );
}
