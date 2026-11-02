import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Award,
  Clock,
  GraduationCap,
  Home,
  Users,
  Lock,
  Upload,
  Plus,
  Headphones,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Landmark
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function DashboardPage() {
  const recentPayments = [
    {
      id: 'pay_school_fees',
      date: 'Nov 1, 2026 • 10:24 AM',
      description: 'School Tuition – Bright Future Academy',
      amount: 400000,
      status: 'Verified',
      icon: GraduationCap,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
    },
    {
      id: 'pay_project_milestone',
      date: 'Oct 28, 2026 • 2:15 PM',
      description: 'Project Milestone – Duplex House',
      amount: 2000000,
      status: 'Pending',
      icon: Home,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      id: 'pay_family',
      date: 'Oct 25, 2026 • 9:30 AM',
      description: 'Family Contribution',
      amount: 200000,
      status: 'Verified',
      icon: Users,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10 font-sans lg:pl-20">
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      {/* Hero / Header Section */}
      <div className="relative bg-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100/80">
        
        {/* Header Background & Image Integration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 z-0"></div>
          
          <div 
            className="absolute top-0 right-0 w-full sm:w-[65%] lg:w-[55%] h-full z-0 opacity-80"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)'
            }}
          >
            <img 
              src="/image_5c02a4.png" 
              alt="Header Background Buildings" 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-emerald-400/20 via-emerald-100/10 to-transparent z-10 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Welcome back, Adeze!
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Your payments and projects are secured with Verapay.
            </p>
          </div>

          {/* Top Right Badges */}
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-1.5 bg-cyan-50 px-4 py-2 rounded-full border border-cyan-100 shadow-sm cursor-pointer hover:bg-cyan-100 transition-colors">
                <Zap className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold text-cyan-900">Verapay Plus</span>
             </div>
             
             <div className="w-10 h-10 rounded-full bg-emerald-50 text-slate-700 font-bold flex items-center justify-center text-sm border border-emerald-100 shadow-sm">
               AD
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6 relative z-30">
        
        {/* Top Metric Cards (Updated to 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Protected in Verapay */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 60 C 20 40, 40 50, 60 30 C 80 10, 100 20, 120 0 L 120 60 Z" fill="#10B981"/>
              </svg>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500">Protected in Vera pay</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">₦6,703.00</h3>
                <div className="mt-3 flex items-center text-xs font-medium text-emerald-600 gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 3 Payments Active
                </div>
              </div>
            </div>
          </div>

          {/* Verified Payments */}
          <div className="bg-[#FFF9F0] rounded-2xl p-6 border border-orange-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-1.5 opacity-60">
                <div className="w-2.5 bg-amber-300 rounded-t-sm h-4"></div>
                <div className="w-2.5 bg-amber-300 rounded-t-sm h-6"></div>
                <div className="w-2.5 bg-amber-400 rounded-t-sm h-9"></div>
                <div className="w-2.5 bg-amber-500 rounded-t-sm h-12"></div>
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Verified Payments</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">12</h3>
                <div className="mt-3 flex items-center text-xs font-medium text-emerald-600 gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +2 this month
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Recent Payments & Projects) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Payments Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Payments</h2>
                </div>
                <Link href="/pay/new" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Start New Payment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100">
                      <th className="pb-3 font-medium whitespace-nowrap">Date</th>
                      <th className="pb-3 font-medium whitespace-nowrap">Description</th>
                      <th className="pb-3 font-medium whitespace-nowrap">Amount</th>
                      <th className="pb-3 font-medium whitespace-nowrap">Status</th>
                      <th className="pb-3 font-medium whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 text-slate-500 whitespace-nowrap">{payment.date}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${payment.iconBg}`}>
                              <payment.icon className={`w-4 h-4 ${payment.iconColor}`} />
                            </div>
                            <span className="font-medium text-slate-700">{payment.description}</span>
                          </div>
                        </td>
                        <td className="py-4 font-bold text-slate-900">₦{payment.amount.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            payment.status === 'Verified' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                            {payment.status === 'Verified' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <Link 
                            href={
                              payment.id === 'pay_school_fees' 
                                ? '/pay/pay_school_fees/verify?scenario=green' 
                                : payment.id === 'pay_project_milestone' 
                                ? '/projects/proj-881' 
                                : '/family'
                            } 
                            className="inline-flex items-center justify-center px-4 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors bg-white shadow-sm"
                          >
                            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Your Projects */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Your Projects</h2>
                </div>
                <Link href="/projects" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100">
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden relative flex-shrink-0">
                  <img src="/image_5c02a4.png" alt="Project Site" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full">
                  <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                    In Progress
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">4-Bedroom Duplex in Ibadan</h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[65%]"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">65% Complete</span>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:items-end sm:justify-center pt-4 sm:pt-0 sm:pl-6 sm:border-l border-slate-200">
                  <div className="text-left sm:text-right mb-0 sm:mb-2">
                    <div className="text-lg font-bold text-slate-900">₦45,000,000</div>
                    <div className="text-xs text-slate-500 mt-0.5">Stage: Roofing</div>
                  </div>
                  <Link href="/projects/proj-881" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-colors shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Actions & Security) */}
          <div className="space-y-6">
            
            {/* Quick Actions (Moved Above Security) */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                   <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Link href="/pay/new" className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-emerald-200 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 leading-tight">Start<br/>Verification</span>
                </Link>
                
                <Link href="/projects" className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-emerald-200 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-2 group-hover:scale-105 transition-transform shadow-sm">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 leading-tight">Manage<br/>Projects</span>
                </Link>
                
                <Link href="/family" className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl hover:border-emerald-200 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 leading-tight">Manage<br/>Family</span>
                </Link>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
               <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-20">
                  <Lock className="w-24 h-24 text-emerald-600" />
               </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Your Account is Secure</h3>
                <p className="text-sm text-emerald-900/80 mt-1 mb-6 pr-8 leading-relaxed">
                  All transactions are verified with advanced security.
                </p>
                <Link href="/pay/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 text-sm font-semibold rounded-full shadow-sm hover:shadow border border-emerald-100 transition-all">
                  Start Protected Transfer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-r from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Need Help?</h4>
                <p className="text-xs text-slate-500 mt-0.5 mb-2">Our support team is always here for you.</p>
                <button className="text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-200 bg-white text-emerald-700 flex items-center gap-1 hover:bg-emerald-50 transition-colors w-max">
                  Contact Support <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}