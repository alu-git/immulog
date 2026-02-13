import React, { useState, useEffect } from 'react';
import { 
  Scan, 
  ChevronDown, 
  ChevronUp, 
  LayoutGrid, 
  List, 
  QrCode, 
  Settings, 
  AlertOctagon, 
  Activity, 
  Zap, 
  ChevronLeft,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  Plus,
  Filter,
  MapPin,
  Tag,
  FileText,
  Edit,
  MousePointer2
} from 'lucide-react';

type ViewState = 'dashboard' | 'assets' | 'detail' | 'scan' | 'log' | 'success';

interface MockInterfaceProps {
  className?: string;
  style?: React.CSSProperties;
}

export const MockInterface: React.FC<MockInterfaceProps> = ({ className = '', style = {} }) => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeTab, setActiveTab] = useState('home');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [guideStep, setGuideStep] = useState(0); 

  // --- Flow Actions ---

  // Step 1: Expand Risks
  const toggleRisks = () => {
    setExpandedSection(prev => prev === 'risks' ? null : 'risks');
    if (guideStep === 0) setGuideStep(1);
  };

  // Step 2: Select Asset
  const handleAssetClick = () => {
    setView('detail');
    setGuideStep(2);
  };

  // Step 3: Trigger Scan from Asset Detail
  const handleScanAction = () => {
    setView('scan');
    setGuideStep(3);
    // Simulate scanning delay
    setTimeout(() => {
      setView('log');
      setGuideStep(4);
    }, 2500);
  };

  // Step 4: Submit Log
  const handleSubmitLog = () => {
    setView('success');
    setGuideStep(5);
    setTimeout(() => {
      // Reset Demo
      setView('dashboard');
      setActiveTab('home');
      setExpandedSection(null);
      setGuideStep(0);
    }, 3000);
  };

  // --- Components ---

  const GuideOverlay = ({ text, position }: { text: string, position: string }) => (
    <div className={`absolute z-50 animate-bounce pointer-events-none ${position}`}>
      <div className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap flex items-center gap-1.5 border-2 border-white ring-2 ring-rose-600/30">
         {text}
         <MousePointer2 size={12} className="fill-white" />
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-white border-t border-slate-100 flex items-end justify-between px-5 pb-5 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
       <button 
         onClick={() => { setActiveTab('home'); setView('dashboard'); }} 
         className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
       >
          <LayoutGrid size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
          <span className="text-[9px] font-bold">Home</span>
       </button>
       <button 
         onClick={() => { setActiveTab('assets'); setView('assets'); }} 
         className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'assets' ? 'text-blue-600' : 'text-slate-400'}`}
       >
          <List size={20} strokeWidth={activeTab === 'assets' ? 2.5 : 2} />
          <span className="text-[9px] font-bold">Assets</span>
       </button>
       
       {/* Floating Scan Button */}
       <div className="relative -top-5">
          <button 
            className="w-14 h-14 bg-slate-900 hover:bg-slate-800 rounded-full flex items-center justify-center shadow-xl shadow-slate-900/20 transition-transform active:scale-95 border-4 border-slate-50"
          >
             <Scan size={24} className="text-white" />
          </button>
       </div>

       <button className={`flex flex-col items-center gap-1 text-slate-400`}>
          <QrCode size={20} />
          <span className="text-[9px] font-bold">Labels</span>
       </button>
       <button className={`flex flex-col items-center gap-1 text-slate-400`}>
          <Settings size={20} />
          <span className="text-[9px] font-bold">Profile</span>
       </button>
    </div>
  );

  const Header = ({ title, subtitle, rightIcon, backAction }: { title: string, subtitle?: string, rightIcon?: React.ReactNode, backAction?: () => void }) => (
    <div className="pt-10 pb-3 px-5 bg-white sticky top-0 z-30 border-b border-slate-100 flex items-center justify-between shrink-0">
       <div className="flex items-center gap-2">
          {backAction && (
            <button onClick={backAction} className="text-slate-800 hover:text-slate-600 -ml-2 p-1">
               <ChevronLeft size={22} />
            </button>
          )}
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">{title}</h1>
            {subtitle && <p className="text-[10px] text-slate-500 font-medium">{subtitle}</p>}
          </div>
       </div>
       {rightIcon}
    </div>
  );

  // --- Views ---

  const DashboardView = () => (
    <div className="flex-1 bg-slate-50 overflow-y-auto pb-24 scrollbar-hide">
      <div className="pt-10 px-5 pb-4 bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-full">
             Main Lab <ChevronDown size={12} className="text-slate-500" />
           </div>
           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
             <Scan size={14} />
           </div>
        </div>
        
        <div>
           <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
           <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">Saturday, Feb 7</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
         {/* Score Card */}
         <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-end">
               <div>
                  <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Audit Score</h3>
                  <span className="text-4xl font-black text-amber-500 tracking-tight">75%</span>
               </div>
               <div className="flex gap-4 mb-1">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-900">8</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-rose-500">2</div>
                    <div className="text-[8px] font-bold text-slate-400 uppercase">Gaps</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Accordions */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100 relative">
            {/* Risks */}
            <div>
              <button 
                onClick={toggleRisks}
                className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors relative"
              >
                 <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                       <AlertOctagon size={14} className="text-rose-500" />
                    </div>
                    <div className="text-left">
                       <div className="text-xs font-bold text-slate-900">Audit Risks</div>
                       <div className="text-[9px] text-rose-500 font-bold">2 Urgent Items</div>
                    </div>
                 </div>
                 <ChevronDown size={14} className={`text-slate-400 transition-transform ${expandedSection === 'risks' ? 'rotate-180' : ''}`} />
                 
                 {/* GUIDE STEP 0 - REPOSITIONED */}
                 {guideStep === 0 && <GuideOverlay text="1. Tap to Review" position="top-1/2 -translate-y-1/2 right-4" />}
              </button>
              
              {expandedSection === 'risks' && (
                <div className="px-3 pb-3 space-y-2 animate-fade-in-down bg-slate-50/50">
                   <div 
                     onClick={handleAssetClick}
                     className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between group shadow-sm cursor-pointer hover:border-blue-400 relative"
                   >
                      <div className="flex items-center gap-2.5">
                         <div className="w-7 h-7 rounded bg-rose-100 flex items-center justify-center text-rose-600">
                            <AlertTriangle size={12} />
                         </div>
                         <div>
                            <div className="text-xs font-bold text-slate-900">pH Meter</div>
                            <div className="text-[9px] text-slate-500 font-mono">EQ-002</div>
                         </div>
                      </div>
                      <div className="px-1.5 py-0.5 rounded bg-rose-100 text-[9px] font-bold text-rose-700">
                         -1d
                      </div>

                      {/* GUIDE STEP 1 - REPOSITIONED */}
                      {guideStep === 1 && <GuideOverlay text="2. Select Item" position="top-1/2 -translate-y-1/2 right-4" />}
                   </div>
                </div>
              )}
            </div>

            {/* Quick Tools */}
            <button className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                     <Zap size={14} className="text-slate-500" />
                  </div>
                  <div className="text-left">
                     <div className="text-xs font-bold text-slate-900">Quick Tools</div>
                     <div className="text-[9px] text-slate-500">Reports & Setup</div>
                  </div>
               </div>
               <ChevronDown size={14} className="text-slate-400" />
            </button>
         </div>
      </div>
    </div>
  );

  const AssetsView = () => (
    <div className="flex-1 bg-slate-50 overflow-y-auto pb-24 scrollbar-hide">
       <Header 
         title="Inventory" 
         subtitle="Manage lifecycle"
         rightIcon={
           <div className="flex gap-2">
             <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600"><ArrowUpRight size={18} /></button>
             <button className="p-1.5 rounded-full bg-slate-900 text-white"><Plus size={18} /></button>
           </div>
         } 
       />
    </div>
  );

  const DetailView = () => (
    <div className="flex-1 bg-white overflow-y-auto pb-24 scrollbar-hide relative">
       <Header title="Details" backAction={() => { setView('dashboard'); setGuideStep(0); }} />

       <div className="p-5">
          <div className="rounded-xl overflow-hidden mb-5 bg-slate-900 h-32 relative shadow-md">
             <img 
               src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               className="w-full h-full object-cover opacity-60" 
               alt="Lab"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
             <div className="absolute bottom-3 left-3">
                <h1 className="text-xl font-bold text-white mb-0.5">pH Meter</h1>
                <div className="inline-block px-1.5 py-0.5 bg-white/20 backdrop-blur rounded text-white text-[9px] font-mono border border-white/30">EQ-002</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
             <div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <MapPin size={10} /> Location
                </div>
                <div className="text-xs font-semibold text-slate-900">Wet Lab</div>
             </div>
             <div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <Tag size={10} /> Model
                </div>
                <div className="text-xs font-semibold text-slate-900">Thermo Star</div>
             </div>
             <div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <List size={10} /> Serial
                </div>
                <div className="text-xs font-semibold text-slate-900 font-mono">SN-998822</div>
             </div>
             <div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  <Activity size={10} /> Status
                </div>
                <div className="text-xs font-bold text-rose-600 flex items-center gap-1">
                   <AlertTriangle size={12} /> Action Req.
                </div>
             </div>
          </div>

          <div className="relative">
            <button 
              onClick={handleScanAction}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 transition-all active:scale-95 mb-3"
            >
              <FileText size={16} /> Log Event
            </button>
            {/* GUIDE STEP 2 - REPOSITIONED */}
            {guideStep === 2 && <GuideOverlay text="3. Log New Event" position="bottom-full mb-2 left-1/2 -translate-x-1/2" />}
          </div>
          
          <div className="flex gap-2">
             <button className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5">
                <QrCode size={14} /> Code
             </button>
             <button className="flex-1 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5">
                <Edit size={14} /> Edit
             </button>
          </div>
       </div>
    </div>
  );

  const ScanView = () => (
    <div className="flex-1 bg-black relative flex flex-col items-center justify-center overflow-hidden">
       {/* Realistic Camera View (Blurred Background) */}
       <div className="absolute inset-0 bg-slate-900">
           {/* Abstract shapes to look like a blurred lab bench */}
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-80"></div>
           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-900/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
       </div>
       
       {/* The QR Code (Target) */}
       <div className="relative z-10 p-4 bg-white rounded-lg shadow-2xl transform scale-90">
            <div className="w-40 h-40 bg-white flex flex-col items-center justify-center border-4 border-slate-900 rounded-lg">
                <QrCode size={120} className="text-slate-900" />
                <div className="text-[10px] font-mono font-bold mt-1 text-slate-900">EQ-002</div>
            </div>
       </div>

       {/* Camera UI Overlay */}
       <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-56 h-56 border-2 border-white/50 rounded-[2rem] relative">
              {/* Corner Markers */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-sky-500 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-sky-500 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-sky-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-sky-500 rounded-br-xl"></div>
              
              {/* Scan Line */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,1)] animate-scan-line opacity-80"></div>
          </div>
          <div className="mt-8 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium">
             Detecting Asset...
          </div>
       </div>
    </div>
  );

  const LogView = () => (
    <div className="flex-1 bg-white overflow-y-auto pb-10 scrollbar-hide">
       <Header title="Log Calibration" backAction={() => setView('detail')} />
       <div className="p-5 space-y-5">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 items-center">
             <div className="bg-white p-1.5 rounded border border-blue-100">
                <QrCode size={16} className="text-blue-600" />
             </div>
             <div>
                <div className="text-[10px] font-bold text-blue-500 uppercase">Asset Identified</div>
                <div className="text-xs font-bold text-slate-900">pH Meter (EQ-002)</div>
             </div>
             <div className="ml-auto text-emerald-600">
                <CheckCircle size={16} />
             </div>
          </div>

          <div>
             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Result</label>
             <div className="flex gap-2">
                <button className="flex-1 py-3 bg-emerald-50 border-2 border-emerald-500 text-emerald-700 font-bold rounded-lg text-xs shadow-sm">Pass</button>
                <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-400 font-bold rounded-lg text-xs">Fail</button>
             </div>
          </div>
          
          <div>
             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Performed By</label>
             <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">JD</div>
                <span className="font-medium text-slate-900 text-xs">Jane Doe</span>
             </div>
          </div>

          <div className="relative mt-4">
            <button 
              onClick={handleSubmitLog}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              Sign & Submit
            </button>
            {/* GUIDE STEP 4 - REPOSITIONED */}
            {guideStep === 4 && <GuideOverlay text="4. Complete Log" position="bottom-full mb-2 left-1/2 -translate-x-1/2" />}
          </div>
       </div>
    </div>
  );

  const SuccessView = () => (
    <div className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center">
       <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 animate-bounce-short">
          <CheckCircle size={32} strokeWidth={3} />
       </div>
       <h2 className="text-xl font-bold text-slate-900 mb-1">Logged!</h2>
       <p className="text-slate-500 text-xs">Record #9921 secured.</p>
    </div>
  );

  return (
    <div 
      className={`relative mx-auto border-slate-900 bg-slate-900 border-[8px] rounded-[2.5rem] h-[640px] w-[320px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5 select-none transition-all duration-300 transform hover:scale-[1.01] ${className}`}
      style={style}
    >
        {/* Status Bar */}
        <div className="h-8 bg-white w-full absolute top-0 left-0 z-50 flex items-center justify-between px-6 pt-1.5 pointer-events-none border-b border-slate-50">
            <div className="text-[10px] font-bold text-slate-900">9:41</div>
            <div className="flex gap-1 items-end">
                <div className="h-2.5 w-2.5 bg-slate-900 rounded-full opacity-20"></div>
                <div className="h-2.5 w-2.5 bg-slate-900 rounded-full opacity-20"></div>
                <div className="h-2.5 w-4 bg-slate-900 rounded-sm"></div>
            </div>
        </div>

        {/* Dynamic Island Placeholder */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-50"></div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
            {view === 'dashboard' && <DashboardView />}
            {view === 'assets' && <AssetsView />}
            {view === 'detail' && <DetailView />}
            {view === 'scan' && <ScanView />}
            {view === 'log' && <LogView />}
            {view === 'success' && <SuccessView />}
        </div>
        
        {view !== 'scan' && view !== 'log' && view !== 'success' && view !== 'detail' && <BottomNav />}

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-300 rounded-full z-50"></div>
        
        <style>{`
          @keyframes scan-line {
            0% { top: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .animate-scan-line {
            animation: scan-line 2s linear infinite;
          }
          .animate-fade-in-down {
            animation: fadeInDown 0.3s ease-out forwards;
          }
          @keyframes fadeInDown {
             from { opacity: 0; transform: translateY(-10px); }
             to { opacity: 1; transform: translateY(0); }
          }
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
        `}</style>
    </div>
  );
};