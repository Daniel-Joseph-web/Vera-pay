'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Video, Square, AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface SurpriseVideoRecorderProps {
  milestoneId: string;
  challengeCode: string; // e.g., "VERA-8821"
  onUploadSuccess: (videoBlob: Blob) => void;
  onCancel: () => void;
}

export const SurpriseVideoRecorder: React.FC<SurpriseVideoRecorderProps> = ({
  milestoneId,
  challengeCode,
  onUploadSuccess,
  onCancel,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: true,
        });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e) {
        console.error('Camera init failed', e);
      }
    }
    initCamera();

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isRecording && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (isRecording && secondsRemaining === 0) {
      handleStopRecording();
    }
    return () => clearInterval(interval);
  }, [isRecording, secondsRemaining]);

  const handleStartRecording = () => {
    if (!stream) return;
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setRecordedBlob(blob);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setSecondsRemaining(15);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-between p-4">
      <div className="w-full flex justify-between items-center text-white text-sm">
        <span className="font-bold flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-4 h-4" /> SURPRISE 15-SECOND VIDEO AUDIT
        </span>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">Close</button>
      </div>

      {/* Viewfinder with Challenge Instructions */}
      <div className="relative w-full max-w-md aspect-[3/4] bg-gray-950 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {/* Dynamic Challenge Overlay */}
        <div className="absolute top-4 left-4 right-4 bg-amber-500/90 backdrop-blur-md p-3 rounded-xl text-black font-semibold text-center shadow-lg">
          <div className="text-xs uppercase tracking-wider">Required Proof Code</div>
          <div className="text-2xl font-black font-mono tracking-widest">{challengeCode}</div>
          <div className="text-[11px] font-normal mt-0.5">
            Hold this code on paper while panning 360&deg; across the work site.
          </div>
        </div>

        {/* Timer Badge */}
        {isRecording && (
          <div className="absolute bottom-6 flex items-center gap-2 bg-rose-600 text-white font-mono px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
            <span className="w-3 h-3 bg-white rounded-full"></span>
            00:{secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="w-full max-w-md pb-6 flex justify-center">
        {!recordedBlob ? (
          !isRecording ? (
            <button
              onClick={handleStartRecording}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-full flex items-center gap-3 shadow-xl text-base"
            >
              <Video className="w-5 h-5" /> Start 15s Challenge
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="px-8 py-4 bg-rose-600 text-white font-bold rounded-full flex items-center gap-2 shadow-xl"
            >
              <Square className="w-4 h-4 fill-current" /> Stop Early
            </button>
          )
        ) : (
          <button
            onClick={() => onUploadSuccess(recordedBlob)}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full flex items-center gap-2 shadow-xl"
          >
            <CheckCircle2 className="w-5 h-5" /> Submit Challenge Video
          </button>
        )}
      </div>
    </div>
  );
};
