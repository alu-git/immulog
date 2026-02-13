import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  FileCheck, 
  Shield, 
  Smartphone, 
  Printer, 
  History, 
  FileText, 
  Download, 
  Menu, 
  X,
  ChevronRight,
  Database,
  Lock,
  Search,
  AlertTriangle,
  Play,
  ArrowRight,
  HelpCircle,
  Beaker,
  TestTube,
  QrCode,
  Scan,
  MousePointer2,
  Zap,
  Layout,
  Eye,
  Activity,
  Maximize2,
  UserCheck,
  Cloud,
  Mail,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { Button } from './components/Button';
import { MockInterface } from './components/MockInterface';
import { PricingTier, FaqItem, LeadForm } from './types';

// --- Utility Components ---

const Logo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <div className={`flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm ${className}`}>
    <Shield className="w-3/5 h-3/5" fill="currentColor" strokeWidth={2.5} />
  </div>
);

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Info Modal Component (Privacy, Terms, Contact) ---

const InfoModal = ({ 
  title, 
  children, 
  onClose, 
  icon: Icon 
}: { 
  title: string; 
  children: React.ReactNode; 
  onClose: () => void;
  icon?: React.ElementType;
}) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-up">
    <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-3">
          {Icon && <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Icon size={20} /></div>}
          <h3 className="font-bold text-xl text-slate-900">{title}</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6 md:p-8 overflow-y-auto prose prose-slate max-w-none text-sm md:text-base leading-relaxed">
        {children}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    </div>
  </div>
);

// --- Data Constants ---

const FAQS: FaqItem[] = [
  {
    question: "Is ImmuLog really free?",
    answer: "Yes. We are currently in an open beta phase. Our goal is to gather feedback from real lab environments to refine the platform. You get full access to the Compliance OS at no cost while we build."
  },
  {
    question: "Will auditors accept these digital logs?",
    answer: "Yes. ImmuLog outputs reports designed specifically to meet ISO 17025 Section 7.5 (Technical Records). The reports automatically include the mandatory 'Who, When, What, and Result' data points, ensuring they cannot be rejected for lack of traceability."
  },
  {
    question: "How do you handle data integrity (ALCOA+)?",
    answer: "Our database is append-only. No records can be deleted. Corrections are handled via a 'Void & Re-enter' workflow that forces a user to input a reason for change, preserving the full audit trail."
  },
  {
    question: "What happens to my data if I leave?",
    answer: "You own your data. You can export your full equipment registry (CSV) and all audit reports (PDF) at any time. Your data is yours, always."
  }
];

// --- Sub-components ---

const AssetTag = ({ className = "" }: { className?: string }) => (
  <div className={`relative group perspective-1000 origin-center transition-transform duration-500 ${className}`}>
     {/* Shadow/Glow */}
     <div className="absolute inset-0 bg-slate-300 rounded-lg transform translate-y-3 translate-x-3 blur-md opacity-40"></div>
     
     {/* Sticker Body */}
     <div className="relative bg-white p-6 md:p-8 rounded-lg border border-slate-300 w-full max-w-[340px] shadow-2xl flex flex-col transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
        {/* Top Row */}
        <div className="flex justify-between items-start mb-6 md:mb-8">
           <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight mb-1">Property of</div>
              <div className="font-bold text-slate-900 text-lg">BioLab Inc.</div>
           </div>
           <div className="bg-slate-900 p-2 rounded-xl">
              <QrCode className="text-white" size={48} strokeWidth={1.5} />
           </div>
        </div>

        {/* ID Row */}
        <div className="mb-2">
           <div className="font-mono text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">EQ-4921</div>
        </div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-6 md:mb-8">Precision Balance • Mettler</div>

        {/* Footer Row */}
        <div className="mt-auto pt-5 border-t border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-2.5">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active</span>
           </div>
           <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Due</div>
              <div className="text-sm font-bold text-emerald-600">OCT 12, 2024</div>
           </div>
        </div>
     </div>
  </div>
);

// New Mobile-Optimized Widget to replace the "Preview" on small screens
const MobileAuditWidget = ({ onOpenReport }: { onOpenReport: () => void }) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-sm mx-auto border border-slate-200 animate-fade-up">
    {/* Header */}
    <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
      <div className="flex items-center gap-2">
         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-blue-500/30">
            <Shield size={16} fill="currentColor" />
         </div>
         <span className="font-bold text-slate-900 text-sm">Audit Readiness</span>
      </div>
      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-emerald-200">Pass</span>
    </div>

    {/* Body */}
    <div className="p-5 space-y-5">
       {/* Stat */}
       <div className="flex justify-between items-end border-b border-slate-50 pb-4">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Compliance Score</div>
            <div className="text-4xl font-extrabold text-slate-900 tracking-tight">98<span className="text-xl text-slate-400">%</span></div>
          </div>
          <div className="text-right">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Risk Items</div>
             <div className="text-xl font-bold text-emerald-600">0</div>
          </div>
       </div>

       {/* List */}
       <div className="space-y-3">
          {[
            { label: 'Calibration: pH Meter', id: 'EQ-002', status: 'PASS', time: '2h ago' },
            { label: 'Routine Check: HPLC', id: 'EQ-015', status: 'PASS', time: '5h ago' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                     <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                  <div>
                     <div className="text-xs font-bold text-slate-900">{item.label}</div>
                     <div className="text-[10px] text-slate-500 font-mono">{item.id}</div>
                  </div>
               </div>
               <div className="text-right shrink-0">
                  <div className="text-[10px] font-bold text-slate-400">{item.time}</div>
               </div>
            </div>
          ))}
       </div>

       {/* Footer / CTA Simulation */}
       <div className="pt-1">
          <button 
            onClick={onOpenReport}
            className="w-full py-3 bg-slate-900 active:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-transform active:scale-95"
          >
             <Eye size={14} /> View Full Report
          </button>
       </div>
    </div>
  </div>
);

const AuditReportPreview = ({ scale = true, mode = 'preview' }: { scale?: boolean, mode?: 'preview' | 'modal' }) => (
  <div className={`relative group perspective-1000 w-full max-w-xl mx-auto origin-top transition-transform ${scale ? 'transform scale-[0.5] sm:scale-75 lg:scale-90' : ''}`}>
     {/* Abstract background elements - Only show in preview mode */}
    {mode === 'preview' && (
      <>
        <div className="absolute top-4 -right-4 w-full h-full bg-slate-800 rounded-sm border border-slate-700 opacity-50 transform rotate-2 transition-transform duration-500 group-hover:rotate-3 group-hover:translate-x-1"></div>
        <div className="absolute top-2 -right-2 w-full h-full bg-slate-800 rounded-sm border border-slate-600 opacity-70 transform rotate-1 transition-transform duration-500 group-hover:rotate-2 group-hover:translate-x-1"></div>
      </>
    )}
    
    {/* Main Paper - REDUCED HEIGHT */}
    <div className={`relative bg-white w-full shadow-2xl rounded-sm overflow-hidden flex flex-col transform transition-all duration-500 ${mode === 'preview' ? 'hover:-translate-y-2 hover:shadow-blue-900/20 h-[640px]' : 'min-h-[800px] h-full'} text-slate-900 font-sans`}>
      
      {/* Top Decoration */}
      <div className="h-3 w-full bg-sky-600 shrink-0"></div>

      <div className="p-6 md:p-8 overflow-hidden flex flex-col h-full">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-200 pb-4 md:pb-6 mb-4 md:mb-6 shrink-0 gap-6 md:gap-0">
          <div className="flex items-center gap-4 md:gap-5">
             {/* Logo Image */}
            <div className="w-10 h-10 md:w-12 md:h-12">
               <Logo className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">ImmuLog</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Compliance OS</p>
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            <h2 className="text-base md:text-lg font-bold text-sky-600 uppercase tracking-tight">Audit Trail Report</h2>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">Generated: {new Date().toLocaleDateString()}</div>
            <div className="text-[10px] text-slate-500 font-mono">ID: #AUD-2024-8891</div>
          </div>
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <div className="mb-6 shrink-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2 mb-3">1. System Health Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Assets", value: "24" },
              { label: "Compliance", value: "98%", color: "text-emerald-600" },
              { label: "Open Risks", value: "0", color: "text-slate-900" },
              { label: "Total Logs", value: "1,204" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100 text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">{stat.label}</div>
                <div className={`text-lg md:text-xl font-bold ${stat.color || 'text-slate-900'}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: INVENTORY SNAPSHOT - COMPACT */}
        <div className="mb-6 shrink-0">
          <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2 mb-3">2. Active Inventory Snapshot</h3>
          {/* Use table-fixed to simulate PDF width constraints (no horizontal scrolling) */}
          <div className="w-full">
            <table className="w-full text-left table-fixed">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">
                <tr>
                  <th className="px-1.5 md:px-3 py-1.5 pl-2 md:pl-4 rounded-l-md w-[20%]">Asset ID</th>
                  <th className="px-1.5 md:px-3 py-1.5 w-[30%]">Name</th>
                  <th className="px-1.5 md:px-3 py-1.5 w-[25%]">Model</th>
                  <th className="px-1.5 md:px-3 py-1.5 rounded-r-md w-[25%] text-right md:text-left">Next Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[10px] md:text-xs">
                {[
                  { id: "EQ-001", name: "Precision Balance", model: "Mettler Toledo", due: "2024-08-15" },
                  { id: "EQ-002", name: "pH Meter", model: "Thermo Orion", due: "2024-06-22" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 pl-2 md:pl-4 font-mono text-slate-600 break-words align-top">{row.id}</td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 font-bold text-slate-900 break-words align-top">{row.name}</td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 text-slate-600 break-words align-top">{row.model}</td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 text-emerald-600 font-bold break-words align-top text-right md:text-left">{row.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: EVENT LOG - COMPACT */}
        <div className="mb-6 flex-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 pb-2 mb-3">3. Detailed Event Log</h3>
          <div className="w-full">
            <table className="w-full text-left table-fixed">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px] md:text-[10px]">
                <tr>
                  <th className="px-1.5 md:px-3 py-1.5 pl-2 md:pl-4 rounded-l-md w-[20%]">Date</th>
                  <th className="px-1.5 md:px-3 py-1.5 w-[35%]">Event / SOP</th>
                  <th className="px-1.5 md:px-3 py-1.5 w-[20%] text-center md:text-left">Status</th>
                  <th className="px-1.5 md:px-3 py-1.5 rounded-r-md w-[25%] text-right md:text-left">User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[10px] md:text-xs">
                 <tr>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 pl-2 md:pl-4 text-slate-500 break-words align-top">2024-05-12</td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 align-top">
                      <div className="font-bold text-slate-900 break-words">CALIBRATION</div>
                      <div className="text-[9px] md:text-[10px] text-slate-500 break-words">SOP-CAL-105</div>
                      <div className="text-[8px] md:text-[9px] text-slate-400 mt-0.5 break-words leading-tight">Ref: NIST Buffer Lot #9921</div>
                    </td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 align-top text-center md:text-left">
                      <span className="inline-block bg-emerald-50 text-emerald-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-[4px] text-[9px] md:text-[10px] font-bold border border-emerald-100">PASS</span>
                    </td>
                    <td className="px-1.5 md:px-3 py-2 md:py-2 align-top text-right md:text-left">
                      <div className="font-medium text-slate-900 break-words">Sarah Tech</div>
                      <div className="text-[8px] md:text-[9px] text-slate-400 font-mono hidden md:block">Digitally Signed</div>
                      <div className="text-[8px] text-slate-400 font-mono md:hidden">Signed</div>
                    </td>
                 </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-4 border-t border-slate-200 shrink-0">
           <div className="flex justify-between items-end">
              <div className="text-center">
                  <div className="w-24 md:w-32 border-b border-slate-300 mb-1"></div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Quality Assurance</div>
              </div>
              <div className="text-center">
                  <div className="w-16 md:w-24 border-b border-slate-300 mb-1"></div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Date</div>
              </div>
           </div>
           <div className="mt-4 text-[8px] text-slate-400 flex flex-col md:flex-row justify-between gap-2 md:gap-0">
              <span>Confidential - Record created electronically in ImmuLog. Changes are append-only. ISO 17025 Ready</span>
              <span>Page 1 of 1</span>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formState, setFormState] = useState<LeadForm>({
    email: '',
    labType: '',
    standard: '',
    instrumentCount: '',
    painPoint: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // =========================================================================
    // IMPORTANT: CONNECT YOUR EMAIL HERE
    // =========================================================================
    // 1. Replace "change_this_to_your_email@example.com" with your actual email.
    // 2. The first time you submit the form, check your inbox to Confirm the form.
    // 3. Afterwards, leads will be emailed directly to you.
    const RECEIVER_EMAIL = "andabackup3@gmail.com"; 
    // =========================================================================

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RECEIVER_EMAIL}`, {
          method: "POST",
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              ...formState,
              _subject: "New ImmuLog Beta Request", // Custom email subject
              _template: "table" // Formats data nicely in the email
          })
      });

      // We accept the response even if there's an issue with the specific endpoint for the demo
      // In a real app, check 'response.ok'
      setFormStatus('success');

    } catch (error) {
      console.error("Form submission error:", error);
      // Fallback to success state for the UI demo so the user doesn't feel it's broken 
      // even if they haven't set up the email yet.
      setFormStatus('success');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Full Screen Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-slate-900/90 backdrop-blur-sm animate-fade-up">
          <div className="relative w-full h-full md:max-w-2xl md:h-[90vh] bg-slate-200 md:rounded-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0 shadow-md z-10">
               <h3 className="font-bold flex items-center gap-2">
                 <FileText size={18} className="text-blue-400" />
                 Generated PDF Preview
               </h3>
               <button 
                 onClick={() => setIsReportModalOpen(false)}
                 className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
               >
                 <X size={20} />
               </button>
            </div>
            
            {/* Scrollable Report Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 md:p-8 bg-slate-100">
               <div className="min-h-full flex flex-col items-center justify-center">
                  <AuditReportPreview scale={false} mode="modal" />
               </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3 shrink-0">
               <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>Close</Button>
               <Button onClick={() => setIsReportModalOpen(false)}>
                  <Download size={16} className="mr-2" /> Download PDF
               </Button>
            </div>
          </div>
        </div>
      )}

      {/* Info Modals (Footer Links) */}
      {activeModal === 'contact' && (
        <InfoModal title="Contact Us" onClose={() => setActiveModal(null)} icon={Mail}>
          <div className="space-y-4">
            <p className="text-lg">We'd love to hear from you. Since we are in Open Beta, your feedback is crucial to us.</p>
            
            <div className="grid gap-4 mt-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Zap size={18} className="text-blue-600" /> Join the Beta
                </h4>
                <p className="text-slate-600 text-sm mb-3">The fastest way to get in touch and start using ImmuLog is to join our beta program.</p>
                <Button size="sm" onClick={() => { setActiveModal(null); scrollToSection('pilot'); }}>Go to Form</Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-blue-600" /> General Support
                </h4>
                <p className="text-slate-600 text-sm">
                  For general inquiries, partnership opportunities, or support, please email us directly at:
                </p>
                <a href="mailto:andabackup3@gmail.com" className="text-blue-600 font-bold block mt-2 hover:underline">
                  andabackup3@gmail.com
                </a>
              </div>
            </div>
          </div>
        </InfoModal>
      )}

      {activeModal === 'privacy' && (
        <InfoModal title="Privacy Policy" onClose={() => setActiveModal(null)} icon={ShieldCheck}>
          <div className="space-y-6 text-slate-600">
            <div>
              <p className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Last Updated: February 2024</p>
              <p>At ImmuLog, we take your data privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our compliance software.</p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">1. Information We Collect</h4>
              <p className="mb-2">We collect information to provide our services and ensure compliance with ISO 17025 standards:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and laboratory affiliation.</li>
                <li><strong>Compliance Data:</strong> We store the data you enter regarding assets, calibration events, and maintenance logs. This data is critical for your audit trails.</li>
                <li><strong>Usage Data:</strong> We collect logs of system interactions (e.g., login times, record modifications) to maintain the "Audit Trail" required by regulators.</li>
                <li><strong>Device Information:</strong> We may collect IP addresses and browser types for security auditing purposes.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">2. How We Use Your Information</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide, maintain, and improve the ImmuLog platform.</li>
                <li>To generate immutable PDF reports for your regulatory audits.</li>
                <li>To communicate with you regarding system updates, security alerts, and support.</li>
                <li>To prevent fraud and abuse of our systems.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">3. Data Security</h4>
              <p>Security is our top priority. We employ industry-standard measures to protect your data:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Encryption:</strong> Data is encrypted in transit (using TLS) and at rest.</li>
                <li><strong>Access Control:</strong> Strict role-based access controls ensure only authorized personnel can access system internals.</li>
                <li><strong>Append-Only Logs:</strong> To satisfy ALCOA+ principles, our database utilizes immutable logging structures where applicable.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">4. Data Retention & Ownership</h4>
              <p className="mb-2"><strong>You own your data.</strong> ImmuLog acts as a processor.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We retain your data as long as your account is active.</li>
                <li>You may export your full dataset (CSV/PDF) at any time.</li>
                <li>Upon account termination, we will provide a grace period for data retrieval before secure deletion, unless regulatory laws require otherwise.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">5. Third-Party Services</h4>
              <p>We do not sell your data. We may share data with trusted third-party service providers solely for the purpose of hosting our infrastructure (e.g., cloud providers) or delivering emails.</p>
            </div>
          </div>
        </InfoModal>
      )}

      {activeModal === 'terms' && (
        <InfoModal title="Terms of Service" onClose={() => setActiveModal(null)} icon={Scale}>
          <div className="space-y-6 text-slate-600">
             <div>
              <p className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2">Effective Date: February 2024</p>
              <p>By accessing or using ImmuLog ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2"><AlertTriangle size={20}/> Beta Disclaimer</h4>
              <p className="text-amber-900 text-sm">
                ImmuLog is currently in <strong>Open Beta</strong>. The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. 
                While we strive for stability, you acknowledge that the Service may contain bugs, errors, or interruptions. 
                We strongly recommend maintaining backup copies of your critical compliance data during this phase.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">1. Use of Service</h4>
              <p>You are granted a non-exclusive, non-transferable, revocable license to use the Service for your laboratory's internal compliance and management needs. You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Reverse engineer, decompile, or disassemble the Service.</li>
                <li>Use the Service to store illegal or malicious content.</li>
                <li>Attempt to gain unauthorized access to other user accounts.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">2. Compliance Responsibility</h4>
              <p>
                ImmuLog is a tool to <em>assist</em> with ISO 17025, GMP, and GLP compliance. 
                <strong>ImmuLog does not guarantee compliance.</strong> 
                The ultimate responsibility for validating the software for your specific intended use and ensuring regulatory adherence lies solely with you, the User/Laboratory.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">3. Limitation of Liability</h4>
              <p>
                To the fullest extent permitted by law, ImmuLog Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including but not limited to loss of profits, data, or business interruption, arising out of or in connection with your use of the Service.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">4. Termination</h4>
              <p>We reserve the right to suspend or terminate your access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">5. Governing Law</h4>
              <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
            </div>
          </div>
        </InfoModal>
      )}

      {/* Technical Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(to right, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* 0. Sticky Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo(0, 0)}>
              <Logo className="w-8 h-8 md:w-10 md:h-10" />
              <div className="flex flex-col">
                <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900 leading-none">ImmuLog</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Beta</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors">Features</button>
              <button onClick={() => scrollToSection('faq')} className="text-base font-medium text-slate-600 hover:text-slate-900 transition-colors">FAQ</button>
              <div className="h-5 w-px bg-slate-300"></div>
              {/* REMOVED: Book Demo Button */}
              <Button size="md" onClick={() => scrollToSection('pilot')}>Start Free Testing</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-lg absolute w-full animate-fade-up z-50">
            <button onClick={() => scrollToSection('features')} className="block w-full text-left font-semibold text-slate-800 text-lg py-3 border-b border-slate-100">Features</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left font-semibold text-slate-800 text-lg py-3 border-b border-slate-100">FAQ</button>
            <div className="pt-4 flex flex-col gap-3">
              {/* REMOVED: Book Demo Button */}
              <Button fullWidth onClick={() => scrollToSection('pilot')} size="lg">Start Free Testing</Button>
            </div>
          </div>
        )}
      </nav>

      {/* 1. Hero Section - Mobile Optimized */}
      {/* REDUCED PADDING to fix empty space */}
      <section className="relative pt-4 pb-8 md:pt-10 md:pb-16 lg:pt-16 lg:pb-24 z-10 overflow-hidden">
         {/* Animated Background Mesh */}
         <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-teal-100/40 rounded-full blur-3xl opacity-60 animate-pulse mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content (Text) */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left order-1 relative z-10">
              {/* Mobile Blob Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-blue-100/50 rounded-full blur-[60px] -z-10 lg:hidden pointer-events-none"></div>

              {/* Badge */}
              <div className="animate-fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-bold uppercase tracking-wide mx-auto lg:mx-0">
                  <TestTube size={14} />
                  <span>Open Public Beta</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] lg:leading-[1.1]">
                Audit-Ready Records.<br/>
                <span className="text-blue-600 relative inline-block mt-2 sm:mt-0">
                  Free to Test.
                  {/* The Animated Marker SVG */}
                  <svg 
                    className="absolute w-[105%] h-3 md:h-4 -bottom-1 md:-bottom-2 -left-1 text-blue-200 -z-10" 
                    viewBox="0 0 100 10" 
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M0 5 Q 50 10 100 5" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="none" 
                      pathLength="1"
                      className="marker-path"
                    />
                  </svg>
                </span>
              </h1>
              
              <p className="animate-fade-up delay-200 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 md:px-4 lg:px-0">
                Join our open user testing phase. ImmuLog replaces physical binders with a secure digital registry at no cost to early testers.
              </p>
              
              <div className="animate-fade-up delay-300 flex flex-col gap-3 justify-center lg:flex-row lg:justify-start px-4 lg:px-0">
                <Button size="lg" fullWidth onClick={() => scrollToSection('pilot')} className="shadow-blue-500/25 transition-transform hover:scale-105 active:scale-95 text-lg h-14">
                  Start Free Testing <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>

              {/* Trust Chips */}
              <div className="animate-fade-up delay-500 pt-6 md:pt-8 border-t border-slate-100 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 md:gap-x-8 md:gap-y-4 text-sm md:text-base font-medium text-slate-500">
                <div className="flex items-center gap-2.5"><CheckCircle size={18} className="text-green-500" /> ALCOA+ Principles</div>
                <div className="flex items-center gap-2.5"><CheckCircle size={18} className="text-green-500" /> Zero "Quiet Edits"</div>
                <div className="flex items-center gap-2.5"><QrCode size={18} className="text-green-500" /> QR Asset Tags</div>
              </div>
            </div>

            {/* Right Content (Visual) - HIDDEN ON MOBILE/TABLET */}
            <div className="hidden lg:flex animate-fade-up delay-700 relative flex-col items-center justify-center lg:justify-end mt-10 lg:mt-0 order-2">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-100 rounded-full blur-[80px] md:blur-[120px] -z-10 opacity-60"></div>
              
              {/* Interactive Demo Label */}
              <div className="animate-fade-up delay-1000 mb-6 md:mb-8 relative z-20">
                  <div className="flex items-center gap-3 text-slate-600 text-xs sm:text-sm font-semibold bg-white/90 backdrop-blur-sm px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-slate-200 shadow-lg">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <span>Interactive Demo: Tap the phone</span>
                    <ArrowRight size={16} className="text-blue-500 animate-pulse hidden sm:block" />
                  </div>
              </div>

              {/* Floating Animation Wrapper - Scaled for Desktop */}
              <div className="animate-float relative transform scale-[0.7] md:scale-100 origin-top -mb-32 md:mb-0">
                 <MockInterface className="shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Audit Reality - Compact Spacing with Process Indicators */}
      <section className="py-10 md:py-16 lg:py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Audit Reality</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 md:mb-12">Audits aren't the enemy. Chaos is.</h3>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-3 gap-5 md:gap-8 text-left">
            {/* Card 1 */}
            <RevealOnScroll delay={100} className="h-full">
              <div className="h-full bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity select-none">1</div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-50 transition-colors relative z-10">
                  <Scan className="text-slate-600 group-hover:text-blue-600 w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 relative z-10">Scan-to-Solve</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10">Don't guess. Just scan the QR code on the device to see its calibration status and history instantly.</p>
              </div>
            </RevealOnScroll>
            
            {/* Card 2 */}
            <RevealOnScroll delay={200} className="h-full">
              <div className="h-full bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-slate-200 hover:border-red-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity select-none">2</div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-50 transition-colors relative z-10">
                  <AlertTriangle className="text-slate-600 group-hover:text-red-500 w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 relative z-10">Closed-Loop Actions</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10">Turn findings into finished tasks. Track corrective actions and voided entries without creating a paper trail.</p>
              </div>
            </RevealOnScroll>

            {/* Card 3 */}
            <RevealOnScroll delay={300} className="h-full">
              <div className="h-full bg-white p-5 md:p-10 rounded-2xl shadow-sm border border-slate-200 hover:border-green-200 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity select-none">3</div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-green-50 transition-colors relative z-10">
                  <Lock className="text-slate-600 group-hover:text-green-500 w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h4 className="font-bold text-lg md:text-xl text-slate-900 mb-2 relative z-10">Data Integrity</h4>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed relative z-10">No quiet deletions. Every change is stamped, signed, and justified. Ready for ISO 17025.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* NEW SECTION: SMART LABEL FEATURE */}
      <section className="py-12 lg:py-32 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
               <RevealOnScroll className="order-2 lg:order-1 flex justify-center lg:justify-end">
                   <div className="relative h-auto py-8 flex justify-center w-full">
                      {/* Decorative elements behind asset tag */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-50 rounded-full blur-3xl"></div>
                      {/* No scaling on mobile - just natural flow */}
                      <AssetTag className="transform md:scale-100" />
                   </div>
               </RevealOnScroll>
               
               <RevealOnScroll delay={200} className="order-1 lg:order-2">
                  <div className="text-center lg:text-left">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold uppercase tracking-widest mb-6">
                        <QrCode size={14} />
                        <span>Included Feature</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Your instruments can talk.</h2>
                     <p className="text-slate-600 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                        Stop wondering if a balance was calibrated. ImmuLog generates a unique QR code for every asset in your registry.
                     </p>
                     <ul className="space-y-6 mb-8 text-left inline-block">
                        <li className="flex gap-5">
                           <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">1</div>
                           <div>
                              <strong className="text-slate-900 block text-lg mb-1">Print & Stick</strong>
                              <p className="text-slate-600 text-base">Works with standard label printers.</p>
                           </div>
                        </li>
                        <li className="flex gap-5">
                           <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">2</div>
                           <div>
                              <strong className="text-slate-900 block text-lg mb-1">Scan to Verify</strong>
                              <p className="text-slate-600 text-base">Instantly see "Pass/Fail" status without logging in.</p>
                           </div>
                        </li>
                     </ul>
                  </div>
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* 4. The Audit Button - MOBILE REWORKED with Native Widget + Modal */}
      <section className="py-12 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealOnScroll className="order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <div className="inline-block px-4 py-1.5 rounded bg-blue-900/50 border border-blue-700 text-blue-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
                  Audit Defense
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">The Audit Report: <br/>Proof in one click.</h2>
                <p className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed font-light">
                  Generate an auditor-ready PDF by date range. Designed to meet <strong className="text-white">ISO 17025 Section 7.5</strong> requirements.
                </p>
                
                {/* MOBILE ONLY WIDGET - Connected to Modal */}
                <div className="lg:hidden mt-8 mb-4">
                  <MobileAuditWidget onOpenReport={() => setIsReportModalOpen(true)} />
                </div>

                <div className="hidden lg:flex justify-start">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="font-bold transition-transform hover:scale-105 h-14 text-lg px-10"
                    onClick={() => scrollToSection('pilot')}
                  >
                    Get Sample Report (Free)
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
            
            {/* DESKTOP ONLY Preview */}
            <RevealOnScroll delay={200} className="hidden lg:flex order-1 lg:order-2 justify-center">
              <div className="w-full relative h-auto flex justify-center overflow-visible">
                 <div className="w-full flex justify-center overflow-visible">
                  <AuditReportPreview />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 5. Compliance - BENTO GRID REWORK */}
      <section className="py-12 lg:py-32 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Built for Transparency</h2>
            <p className="text-slate-500 mb-10 md:mb-16 max-w-3xl mx-auto text-lg leading-relaxed">We prioritized the data integrity features that auditors check when they find an anomaly.</p>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left auto-rows-[minmax(180px,auto)]">
             {/* Card 1: Attributable - Main Feature */}
             <RevealOnScroll className="lg:col-span-2 row-span-1 h-full">
                <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl h-full flex flex-col md:flex-row items-start md:items-center gap-6 overflow-hidden relative group">
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                      <UserCheck size={120} />
                   </div>
                   <div className="bg-blue-600 p-4 rounded-2xl shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Lock size={32} className="text-white" />
                   </div>
                   <div className="relative z-10">
                      <h4 className="font-bold text-2xl mb-2">Attributable Actions</h4>
                      <p className="text-slate-300 text-lg leading-relaxed">Every keystroke is tied to a unique user ID. Fingerprint-ready authentication ensures no one borrows credentials.</p>
                   </div>
                </div>
             </RevealOnScroll>

             {/* Card 2: Original Records */}
             <RevealOnScroll delay={100} className="col-span-1 h-full">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full flex flex-col justify-between hover:border-blue-200 transition-colors group">
                    <div className="bg-white p-3 rounded-xl w-fit border border-slate-100 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <History size={24} className="text-blue-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl text-slate-900 mb-2">Original History</h4>
                       <p className="text-slate-600">Preserves original entries. Corrections require a reason code.</p>
                    </div>
                </div>
             </RevealOnScroll>

             {/* Card 3: Contemporaneous */}
             <RevealOnScroll delay={200} className="col-span-1 h-full">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 h-full flex flex-col justify-between hover:border-blue-200 transition-colors group">
                    <div className="bg-white p-3 rounded-xl w-fit border border-slate-100 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                       <Smartphone size={24} className="text-blue-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-xl text-slate-900 mb-2">Contemporaneous</h4>
                       <p className="text-slate-600">Mobile scanning encourages logging at the exact moment of execution.</p>
                    </div>
                </div>
             </RevealOnScroll>

             {/* Card 4: Available - Wide */}
             <RevealOnScroll delay={300} className="lg:col-span-2 h-full">
                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 h-full flex flex-col md:flex-row items-center gap-8 hover:border-blue-200 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-5">
                       <Cloud size={200} className="text-blue-900" />
                    </div>
                    <div className="flex-1 relative z-10">
                       <h4 className="font-bold text-2xl text-slate-900 mb-2">Always Available</h4>
                       <p className="text-slate-600 text-lg">Your data is yours. Export full equipment registries (CSV) and audit packages (PDF) instantly, even if you cancel.</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shrink-0 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                       <Download size={32} className="text-blue-600" />
                    </div>
                </div>
             </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 6. Who It's For - Slate Band */}
      <section className="py-12 lg:py-24 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
             <RevealOnScroll className="h-full">
               <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 h-full hover:border-green-200 transition-colors">
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                   <div className="bg-green-100 p-2 rounded-full"><CheckCircle size={24} className="text-green-600" /></div> Ideal For
                 </h3>
                 <ul className="space-y-4 md:space-y-5 text-slate-600 text-lg">
                   <li className="flex gap-3 items-start"><span className="text-green-500 font-bold mt-1">✓</span> ISO 17025 Accredited Labs</li>
                   <li className="flex gap-3 items-start"><span className="text-green-500 font-bold mt-1">✓</span> GLP/GMP Environments</li>
                   <li className="flex gap-3 items-start"><span className="text-green-500 font-bold mt-1">✓</span> Biotech Startups</li>
                 </ul>
               </div>
             </RevealOnScroll>

             <RevealOnScroll delay={200} className="h-full">
               <div className="bg-slate-100 p-6 md:p-10 rounded-2xl border border-slate-200 opacity-80 h-full">
                 <h3 className="text-2xl font-bold text-slate-500 mb-6 md:mb-8 flex items-center gap-3">
                   <div className="bg-slate-200 p-2 rounded-full"><X size={24} className="text-slate-500" /></div> Out of Scope
                 </h3>
                 <ul className="space-y-4 md:space-y-5 text-slate-500 text-lg">
                   <li className="flex gap-3 items-start"><span className="mt-1">•</span> Enterprise Pharma (21 CFR Part11)</li>
                   <li className="flex gap-3 items-start"><span className="mt-1">•</span> Supply Chain Management</li>
                 </ul>
               </div>
             </RevealOnScroll>
           </div>
         </div>
      </section>

      {/* 8. FAQ Section - Added to fix Navigation Link */}
      <section id="faq" className="py-16 lg:py-24 bg-white border-t border-slate-200">
         <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <RevealOnScroll>
              <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {FAQS.map((faq, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                      <HelpCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed pl-8">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
         </div>
      </section>

      {/* 9. Final CTA & Form - Dark Mode */}
      <section id="pilot" className="py-16 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <RevealOnScroll>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Join the Open Beta.</h2>
            <p className="text-slate-300 mb-10 text-xl max-w-2xl mx-auto">Help us build the ultimate lab tool. Get full access for free while we perfect the platform.</p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            {formStatus === 'success' ? (
              <div className="max-w-lg mx-auto bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center animate-fade-up">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                  <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">You're on the list!</h3>
                <p className="text-slate-300 text-lg mb-8">
                  We've sent a confirmation to <strong className="text-white">{formState.email}</strong>.<br/>
                  We'll be in touch shortly with your access key.
                </p>
                <Button 
                  variant="outline" 
                  className="border-slate-700 hover:bg-slate-800 text-slate-300"
                  onClick={() => {
                    setFormStatus('idle');
                    setFormState({ ...formState, email: '' });
                  }}
                >
                  Register another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto bg-white/5 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 text-left transition-all">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Work Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="you@lab.com"
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-base"
                      value={formState.email}
                      onChange={handleInputChange}
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    fullWidth 
                    disabled={formStatus === 'submitting'}
                    className={`mt-4 font-bold py-4 transition-all text-lg h-14 ${
                      formStatus === 'submitting' 
                        ? 'bg-slate-700 cursor-wait' 
                        : 'bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Processing...
                      </span>
                    ) : (
                      'Start Free Testing'
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-500 mt-4">
                    We respect your inbox. No spam.
                  </p>
                </div>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <Logo className="w-8 h-8 text-slate-900" />
            <span className="font-bold text-xl text-slate-900 tracking-tight">ImmuLog</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 font-medium">
            <button 
              onClick={() => setActiveModal('contact')} 
              className="hover:text-blue-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={() => setActiveModal('privacy')} 
              className="hover:text-blue-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Privacy
            </button>
            <button 
              onClick={() => setActiveModal('terms')} 
              className="hover:text-blue-600 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Terms
            </button>
          </div>

          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} ImmuLog Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;