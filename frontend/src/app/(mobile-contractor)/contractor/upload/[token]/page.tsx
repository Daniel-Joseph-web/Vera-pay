'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Video, ShieldCheck, ArrowLeft } from 'lucide-react';
import { InAppCamera } from '@/components/camera/InAppCamera';
import { SurpriseVideoRecorder } from '@/components/camera/SurpriseVideoRecorder';
import { VerapayLogo } from '@/components/brand/VerapayLogo';

export default function ContractorUploadPage() {
  const [openCamera, setOpenCamera] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<number>(3);
  const [videoSubmitted, setVideoSubmitted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-md mx-auto flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <VerapayLogo variant="icon" size={32} />
            <div>
              <span className="font-black text-sm tracking-wide block">VERAPAY SITE PROOF</span>
              <span className="text-[10px] text-brand-gold font-mono uppercase tracking-wider block -mt-0.5">
                Anti-Replay Active
              </span>
            </div>
          </div>
          <Link href="/projects/proj-881" className="text-xs text-slate-300 hover:text-white flex items-center gap-1 font-semibold transition-colors bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-800 shadow-sm">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold">
            Active Milestone Inspection
          </span>
          <h2 className="text-xl font-bold mt-1 text-white">Stage 2: Blockwork to Lintel</h2>
          <p className="text-xs text-slate-400 mt-0.5">Project: 4-Bedroom Duplex, Ibadan</p>

          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs">
            <span className="text-slate-400">Required Photos:</span>
            <span className="font-bold text-emerald-400 font-mono">{uploadedPhotos} / 5 Captured</span>
          </div>

          <div className="mt-2 flex justify-between text-xs">
            <span className="text-slate-400">Surprise 15s Video:</span>
            <span className={`font-bold font-mono ${videoSubmitted ? 'text-emerald-400' : 'text-brand-gold'}`}>
              {videoSubmitted ? 'VERIFIED' : 'PENDING REQUEST'}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setOpenCamera(true)}
            className="w-full py-4 bg-brand-primary hover:bg-brand-dark text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-all"
          >
            <Camera className="w-5 h-5 text-brand-gold" /> Open Live Site Camera
          </button>

          <button
            onClick={() => setOpenVideo(true)}
            className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-all"
          >
            <Video className="w-5 h-5" /> Execute 15s Video Audit
          </button>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Hardware Controls:
          </div>
          <div>&bull; Photos must be captured live inside this app; phone gallery uploads are strictly blocked.</div>
          <div>&bull; GPS coordinates, compass bearing, and network timestamp are burned into watermark.</div>
          <div>&bull; Images checked against database to prevent reused photos from past jobs.</div>
        </div>
      </div>

      <div className="text-center text-[10px] text-slate-500 py-4">
        Verapay Contractor Gateway &bull; Payout releases directly to NUBAN account upon sender sign-off
      </div>

      {openCamera && (
        <InAppCamera
          milestoneId="m_2"
          onCapture={(blob, meta) => {
            setUploadedPhotos((prev) => prev + 1);
            setOpenCamera(false);
            alert(`Live Photo verified with GPS (${meta.lat.toFixed(4)}, ${meta.lng.toFixed(4)}) and submitted!`);
          }}
          onCancel={() => setOpenCamera(false)}
        />
      )}

      {openVideo && (
        <SurpriseVideoRecorder
          milestoneId="m_2"
          challengeCode="CODE-9214"
          onUploadSuccess={() => {
            setVideoSubmitted(true);
            setOpenVideo(false);
            alert('15-second video verified and uploaded to sender audit portal!');
          }}
          onCancel={() => setOpenVideo(false)}
        />
      )}
    </div>
  );
}
