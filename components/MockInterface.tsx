import React from 'react';
import { QrCode, Camera, CheckCircle, FileText, UploadCloud, AlertCircle } from 'lucide-react';

export const MockInterface: React.FC = () => {
  return (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] rounded-[2.5rem] h-[640px] w-[320px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-900/5 select-none">
        {/* Status Bar */}
        <div className="h-8 bg-white w-full absolute top-0 left-0 z-20 flex items-center justify-between px-6">
            <div className="text-[10px] font-bold text-slate-900">9:41</div>
            <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-slate-900 rounded-full opacity-20"></div>
                <div className="w-3 h-3 bg-slate-900 rounded-full opacity-20"></div>
                <div className="w-4 h-3 bg-slate-900 rounded-[2px] opacity-100"></div>
            </div>
        </div>

        {/* App Header */}
        <div className="mt-8 bg-white px-5 py-4 border-b border-slate-100 flex justify-between items-center z-10">
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Main Clinical Lab</p>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                    {/* Scan Icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg>
                </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 bg-[#f8f8fa] overflow-hidden relative p-5 font-sans space-y-5">
             
             {/* Hero Stats Card */}
             <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0284c7]"></div>
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Compliance</h2>
                         <div className="flex items-baseline gap-2">
                             <span className="text-3xl font-bold tracking-tight text-slate-900">98%</span>
                             <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                                 <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="m5 12 7-7 7 7"/></svg> 2.4%
                             </span>
                         </div>
                     </div>
                     <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                     </div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-50">
                     <div>
                         <div className="text-lg font-bold text-slate-900">142</div>
                         <div className="text-[9px] text-slate-400 font-bold uppercase">Assets</div>
                     </div>
                     <div>
                         <div className="text-lg font-bold text-rose-600">3</div>
                         <div className="text-[9px] text-slate-400 font-bold uppercase">Action Req</div>
                     </div>
                     <div>
                         <div className="text-lg font-bold text-amber-500">12</div>
                         <div className="text-[9px] text-slate-400 font-bold uppercase">Due Soon</div>
                     </div>
                 </div>
             </div>

             {/* Priority Section */}
             <div>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-900 text-sm">Priority Items</h3>
                    <span className="bg-rose-50 text-rose-600 text-[9px] font-bold px-2 py-0.5 rounded border border-rose-100">3 CRITICAL</span>
                </div>

                <div className="space-y-3">
                    {/* Item 1 - Critical */}
                    <div className="group bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                        <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">pH Meter</h4>
                            <p className="text-[10px] text-slate-500 font-mono">EQ-002 • Wet Lab</p>
                        </div>
                        <div className="text-right mr-3">
                            <span className="block text-[10px] font-bold text-rose-600">OVERDUE</span>
                            <span className="text-[9px] text-slate-400">-2 Days</span>
                        </div>
                    </div>

                    {/* Item 2 - Warning */}
                    <div className="group bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">Centrifuge 5424</h4>
                            <p className="text-[10px] text-slate-500 font-mono">EQ-008 • Prep Room</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-[10px] font-bold text-amber-600">DUE SOON</span>
                            <span className="text-[9px] text-slate-400">5 Days</span>
                        </div>
                    </div>

                    {/* Item 3 - Warning */}
                    <div className="group bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">Incubator A</h4>
                            <p className="text-[10px] text-slate-500 font-mono">EQ-012 • Cell Culture</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-[10px] font-bold text-amber-600">DUE SOON</span>
                            <span className="text-[9px] text-slate-400">7 Days</span>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        {/* Bottom Nav Mockup */}
        <div className="bg-white/95 backdrop-blur border-t border-slate-200 p-2 flex justify-between items-end px-6 pb-6 z-20 h-20 relative">
             <div className="flex flex-col items-center gap-1 text-[#0284c7]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span className="text-[9px] font-bold">Home</span>
             </div>
             <div className="flex flex-col items-center gap-1 text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                <span className="text-[9px] font-medium">Assets</span>
             </div>
             <div className="relative -top-6">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-xl border-4 border-[#f8f8fa] text-white">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /></svg>
                </div>
             </div>
             <div className="flex flex-col items-center gap-1 text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
                <span className="text-[9px] font-medium">Labels</span>
             </div>
             <div className="flex flex-col items-center gap-1 text-slate-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                <span className="text-[9px] font-medium">Config</span>
             </div>
        </div>
    </div>
  );
};