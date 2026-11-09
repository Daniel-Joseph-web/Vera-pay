'use client';

import { useState, useEffect, useRef, ElementType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Cpu,
  Globe,
  GraduationCap,
  Home,
  Lock,
  RefreshCcw,
  Send,
  ShieldCheck,
  User,
  Wallet,
  Zap,
  Mail,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { VerapayLogo } from "@/components/brand/VerapayLogo";

const LIME = "#7CF05A";
const displayFont = { fontFamily: "var(--font-display), 'Sora', system-ui, sans-serif" };

/* ------------------------------------------------------------------ */
/* Scroll Animation Wrapper                                           */
/* ------------------------------------------------------------------ */

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

function ScrollReveal({ children, delay = 0, className = "", as: Component = "div" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <Component
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const features: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "AI Verification", text: "We check invoices, receipts and photos.", icon: Cpu },
  { title: "Sender Control", text: "You approve before any money is released.", icon: ShieldCheck },
  { title: "Secure Payments", text: "Powered by PayPal and trusted partners.", icon: Lock },
  { title: "Full Refund", text: "If proof fails, get your money back.", icon: RefreshCcw },
];

const steps = [
  { id: 1, title: "Fund", text: "Send money via PayPal.", icon: Wallet },
  { id: 2, title: "Verify", text: "AI checks the proof.", icon: ShieldCheck },
  { id: 3, title: "Approve", text: "Review and approve.", icon: User },
  { id: 4, title: "Release", text: "Payment goes to provider.", icon: Send },
  { id: 5, title: "Refund (if needed)", text: "Get your money back.", icon: CheckCircle2 },
];

const trustPoints: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Global Access", text: "Anywhere in the World", icon: Globe },
  { title: "Bank-Grade Security", text: "Your Safety, Our Priority", icon: ShieldCheck },
  { title: "Fast & Reliable", text: "Payments, Always", icon: Zap },
];

const plans = [
  {
    name: "Basic",
    eyebrow: "PAY AS YOU GO",
    price: "1.5%",
    detail: "per payment · $1 minimum",
    features: ["AI-assisted verification", "Recipient detail checks", "Bill review"],
    cta: "Choose Basic",
    href: "/pay/new",
    featured: false,
  },
  {
    name: "Verapay Plus",
    eyebrow: "MONTHLY MEMBERSHIP",
    price: "$9.99",
    detail: "per month · stated allowance up to $1,000",
    features: ["Recurring family payments", "Shared family payment history", "Priority human support"],
    cta: "Explore Plus",
    href: "/family",
    featured: true,
  },
  {
    name: "Projects",
    eyebrow: "PROJECT PAYMENTS",
    price: "2%",
    detail: "of each approved stage",
    features: ["Milestone-based payment plans", "Quote comparison support", "Project progress evidence"],
    cta: "Explore Projects",
    href: "/projects/proj-881",
    featured: false,
  },
];

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                */
/* ------------------------------------------------------------------ */

function LightHeading({ pill, title, description }: { pill: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="inline-flex rounded-full bg-[#b9f5c8] px-5 py-1.5 text-xs font-bold text-[#0a4a33]">
        {pill}
      </span>
      <h2
        style={displayFont}
        className="mt-5 text-3xl font-extrabold tracking-tight text-[#062b21] sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-sm leading-6 text-[#3b5a4d] sm:text-base">{description}</p>
    </div>
  );
}

function UseCaseCard({
  title,
  text,
  image,
  icon: Icon,
  gradient,
  href,
  className,
}: {
  title: string;
  text: string;
  image: string;
  icon: LucideIcon;
  gradient: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative isolate flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[24px] shadow-lg ${className}`}
    >
      <div className={`absolute inset-0 -z-20 ${gradient}`} />
      <img
        src={image}
        alt={title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div className="flex items-end justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#059669] text-white">
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
          <div>
            <h3 style={displayFont} className="text-xl font-bold text-white">
              {title}
            </h3>
            <p className="mt-1 text-[13px] text-white/80">{text}</p>
          </div>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition group-hover:translate-x-1">
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Guarantee dark mode never affects the landing page
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <main 
      className={`min-h-screen overflow-x-hidden bg-[#061b16] text-white selection:bg-emerald-300 selection:text-[#05291e] transition-opacity duration-1000 ease-out ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <HeroSection />

      {/* ---------------- Features (light) ---------------- */}
      <section id="features" className="relative overflow-hidden bg-white px-5 pb-20 pt-16 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="inline-flex rounded-full bg-[#b9f5c8] px-4 py-1.5 text-sm font-bold text-[#0a4a33]">
              Powerful Features
            </span>
            <h2
              style={displayFont}
              className="mt-6 text-3xl font-extrabold tracking-tight text-[#062b21] sm:text-4xl lg:text-5xl"
            >
              Built for <span className="text-[#059669]">Trust.</span> Designed for You.
            </h2>
            <p className="mt-4 text-base font-medium text-[#3b5a4d]">
              Simple tools. Powerful protection. Total control.
            </p>
          </ScrollReveal>

          <div className="relative">
            <svg
              className="absolute -left-16 top-1/2 hidden h-24 w-24 -translate-y-1/2 text-[#059669] lg:block"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
            >
              <path d="M40 75 L15 85" />
              <path d="M50 50 L15 45" />
              <path d="M70 25 L40 15" />
            </svg>

            <svg
              className="absolute -right-16 top-1/2 hidden h-24 w-24 -translate-y-1/2 text-[#059669] lg:block"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
            >
              <path d="M60 75 L85 85" />
              <path d="M50 50 L85 45" />
              <path d="M30 25 L60 15" />
            </svg>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, text, icon: Icon }, index) => (
                <ScrollReveal
                  key={title}
                  as="article"
                  delay={index * 150}
                  className="rounded-[24px] bg-[#eefaf3] p-8 text-center transition hover:-translate-y-1"
                >
                  <span className="mx-auto mb-5 flex justify-center text-[#059669]">
                    <Icon className="h-10 w-10" strokeWidth={2.5} />
                  </span>
                  <h3 style={displayFont} className="text-xl font-bold text-[#062b21]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3b5a4d]">{text}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- How it works (green horizontal layout) ---------------- */}
      <section id="how-it-works" className="bg-white px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#0d3b2b] to-[#041a13] p-8 shadow-2xl sm:p-12 lg:p-14">
            <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-[#7CF05A]/10 blur-[100px]" />

            <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <ScrollReveal className="flex w-full shrink-0 flex-col items-start text-left lg:w-[320px]">
                <span className="inline-flex rounded-full bg-[#a1f2af] px-4 py-1.5 text-xs font-bold text-[#0a4a33]">
                  How it Works
                </span>
                <h2 style={displayFont} className="mt-5 text-4xl font-extrabold leading-tight text-white lg:text-[42px]">
                  Get Started in<br />
                  <span style={{ color: LIME }}>5 Simple Steps</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-emerald-100/80">
                  A seamless process from payment to release.
                </p>
                <Link
                  href="/pay/new"
                  style={{ backgroundColor: LIME }}
                  className="mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-bold text-[#052e1f] transition hover:brightness-110"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </ScrollReveal>

              <div className="flex w-full items-start justify-between gap-2 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:pb-0">
                {steps.map((step, index) => (
                  <ScrollReveal delay={index * 150} key={step.id} className="flex shrink-0 items-center gap-2 lg:gap-4">
                    <div className="flex w-28 flex-col items-center text-center sm:w-32">
                      <span
                        style={{ backgroundColor: LIME }}
                        className="mb-5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-[#052e1f]"
                      >
                        {step.id}
                      </span>
                      <step.icon
                        style={{ color: LIME }}
                        className="mb-5 h-11 w-11"
                        strokeWidth={1.5}
                      />
                      <h3 className="mb-1.5 text-[15px] font-bold text-white">{step.title}</h3>
                      <p className="text-xs leading-snug text-emerald-100/70">
                        {step.text}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight
                        style={{ color: LIME }}
                        className="-mt-[104px] h-5 w-5 opacity-80"
                      />
                    )}
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Use cases (light) ---------------- */}
      <section id="use-cases" className="bg-white px-5 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <LightHeading
              pill="Use Cases"
              title="Perfect for What Matters"
              description="Whether it's education or construction, Verapay keeps your money on track."
            />
          </ScrollReveal>
          
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_.6fr]">
            <ScrollReveal delay={100}>
              <UseCaseCard
                title="School Fees"
                text="Pay with confidence."
                image="/images/usecase-school.png"
                icon={GraduationCap}
                gradient="bg-gradient-to-br from-emerald-600 to-[#06382a]"
                href="/pay/pay_school_fees/verify?scenario=green"
                className="h-full"
              />
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <UseCaseCard
                title="Construction Projects"
                text="Fund the work, not a middleman."
                image="/images/usecase-construction.png"
                icon={Home}
                gradient="bg-gradient-to-br from-amber-500 to-[#4a3206]"
                href="/projects/proj-881"
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal delay={300} className="flex flex-col justify-center rounded-[24px] bg-[#eefaf3] px-7 py-8 shadow-sm">
              {trustPoints.map(({ title, text, icon: Icon }, i) => (
                <div key={title} className="relative flex flex-col">
                  <div className="flex items-center gap-4 py-1">
                    <Icon className="h-8 w-8 shrink-0 text-[#059669]" strokeWidth={2} />
                    <div>
                      <h3 className="text-[15px] font-bold text-[#062b21]">{title}</h3>
                      <p className="mt-0.5 text-[13px] text-[#3b5a4d]">{text}</p>
                    </div>
                  </div>
                  {i < trustPoints.length - 1 && (
                    <div className="my-5 border-b border-emerald-900/10" />
                  )}
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ---------------- Pricing (Light White-to-Green Gradient) ---------------- */}
      <section id="pricing" className="bg-gradient-to-b from-white to-emerald-100 px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#059669]">
              Straightforward options
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#062b21] sm:text-4xl lg:text-5xl">
              Choose the way you want to pay.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#3b5a4d] sm:text-lg">
              Start with individual payments, add family tools, or organise larger payments around project milestones.
            </p>
          </ScrollReveal>

          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <ScrollReveal
                key={plan.name}
                as="article"
                delay={index * 200}
                className={`relative flex flex-col rounded-3xl border p-7 sm:p-8 ${
                  plan.featured
                    ? "border-emerald-900/20 bg-gradient-to-b from-[#0d5a40] to-[#062b21] shadow-2xl shadow-emerald-950/20"
                    : "border-emerald-100 bg-white shadow-xl shadow-emerald-900/5"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-[#7CF05A]/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-[#7CF05A]">
                    Popular
                  </span>
                )}
                
                <p className={`text-[10px] font-bold tracking-[.18em] ${plan.featured ? "text-[#7CF05A]" : "text-[#059669]"}`}>
                  {plan.eyebrow}
                </p>
                <h3 className={`mt-4 text-2xl font-bold ${plan.featured ? "text-white" : "text-[#062b21]"}`}>
                  {plan.name}
                </h3>
                
                <div className="mt-7">
                  <span className={`text-5xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-[#062b21]"}`}>
                    {plan.price}
                  </span>
                  <p className={`mt-2 text-xs ${plan.featured ? "text-emerald-100/70" : "text-slate-500"}`}>
                    {plan.detail}
                  </p>
                </div>
                
                <ul className={`mt-8 flex-1 space-y-4 border-t pt-7 ${plan.featured ? "border-white/[0.08]" : "border-emerald-50"}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className={`flex items-start gap-3 text-sm ${plan.featured ? "text-slate-300" : "text-[#3b5a4d]"}`}>
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#7CF05A]" : "text-[#059669]"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={plan.href}
                  className={`mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
                    plan.featured
                      ? "bg-[#7CF05A] text-[#062b21] hover:brightness-110"
                      : "border border-emerald-200 bg-emerald-50 text-[#059669] hover:bg-emerald-100"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal delay={400}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-slate-500">
              Fees, limits and taxes shown are for this prototype and may change. Payment-provider terms apply.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- Support & Contact Form ---------------- */}
      <section id="support" className="bg-white px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          
          {/* Left Side: Contact Information */}
          <ScrollReveal delay={100} className="rounded-[32px] bg-gradient-to-br from-[#0d5a40] to-[#062b21] p-8 shadow-xl shadow-emerald-950/20 sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: LIME }}>
              Support Center
            </p>
            <h2 style={displayFont} className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              We're here to help.
            </h2>
            <p className="mt-4 text-sm leading-6 text-emerald-50/80">
              Have a question, need assistance, or want to give feedback? Send us a message or reach out directly via WhatsApp or Email.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="https://wa.me/2349161138160"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-bold text-white transition-colors group-hover:text-emerald-300">WhatsApp Chat</h3>
                  <p className="mt-0.5 text-sm text-emerald-100/70">09161138160</p>
                </div>
              </a>
              
              <a
                href="mailto:danieljosepholuwafemi@gmail.com"
                className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <Mail className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-bold text-white transition-colors group-hover:text-amber-300">Email Us</h3>
                  <p className="mt-0.5 text-sm text-emerald-100/70">danieljosepholuwafemi@gmail.com</p>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Side: Contact Form */}
          <ScrollReveal delay={300} className="flex flex-col justify-center rounded-[32px] border border-emerald-900/10 bg-white p-8 shadow-2xl shadow-emerald-900/5 sm:p-10">
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#062b21]">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full rounded-xl border border-emerald-100 bg-[#f3faf6] px-4 py-3.5 text-sm text-[#062b21] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#062b21]">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full rounded-xl border border-emerald-100 bg-[#f3faf6] px-4 py-3.5 text-sm text-[#062b21] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#062b21]">Related Topic</label>
                <input 
                  type="text" 
                  className="w-full rounded-xl border border-emerald-100 bg-[#f3faf6] px-4 py-3.5 text-sm text-[#062b21] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20" 
                  placeholder="e.g. Payment Issue, Verification Question" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#062b21]">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full resize-none rounded-xl border border-emerald-100 bg-[#f3faf6] px-4 py-3.5 text-sm text-[#062b21] outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/20" 
                  placeholder="How can we help you?" 
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#062b21] px-7 text-sm font-bold text-white transition hover:bg-[#0a4a33]"
              >
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </ScrollReveal>
          
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="border-t border-white/[0.08] bg-[#041610] px-5 py-9 sm:px-8 lg:px-12">
        <ScrollReveal className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <VerapayLogo variant="white-on-green" size={28} showTagline={false} />
            <p className="text-xs text-slate-500">Verify, then release.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <Link href="/pay/new" className="transition hover:text-emerald-300">Send &amp; Verify</Link>
            <Link href="/family" className="transition hover:text-emerald-300">Family Hub</Link>
            <Link href="/projects" className="transition hover:text-emerald-300">Projects</Link>
            <Link href="/dashboard" className="transition hover:text-emerald-300">Dashboard</Link>
          </div>
          <p className="text-[11px] text-slate-600">© {new Date().getFullYear()} Verapay. All rights reserved.</p>
        </ScrollReveal>
      </footer>
    </main>
  );
}