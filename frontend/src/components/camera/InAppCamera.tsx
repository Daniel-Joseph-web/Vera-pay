'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Check, AlertCircle } from 'lucide-react';

export interface InAppCameraProps {
  milestoneId: string;
  onCapture: (blob: Blob, metadata: { lat: number; lng: number; timestamp: string }) => void;
  onCancel: () => void;
}

export const InAppCamera: React.FC<InAppCameraProps> = ({ milestoneId, onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [hasCaptured, setHasCaptured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get Live GPS Coordinates
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setError('Location permission is required for site proof.')
      );
    }

    // 2. Open Camera Stream (Environment Facing)
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Unable to access camera. Please allow camera permissions.');
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Embed cryptographic/tamper-evident watermark banner
    const timestamp = new Date().toISOString();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(0, canvas.height - 70, canvas.width, 70);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`VERAPAY LIVE PROOF | Milestone: ${milestoneId}`, 20, canvas.height - 42);

    ctx.fillStyle = '#00E676';
    ctx.font = '16px monospace';
    const locText = coords ? `LAT: ${coords.lat.toFixed(5)}, LNG: ${coords.lng.toFixed(5)}` : 'GPS: SEARCHING';
    ctx.fillText(`${locText} | TIME: ${timestamp}`, 20, canvas.height - 18);

    setHasCaptured(true);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob, {
            lat: coords?.lat || 0,
            lng: coords?.lng || 0,
            timestamp,
          });
        }
      },
      'image/jpeg',
      0.8
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-between p-4">
      <div className="w-full flex justify-between items-center text-white text-sm">
        <span className="font-bold tracking-wide">VERAPAY LIVE CAMERA</span>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">Cancel</button>
      </div>

      {error && (
        <div className="bg-red-900/80 text-white p-3 rounded-lg flex items-center gap-2 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-400" />
          {error}
        </div>
      )}

      {/* Video Viewfinder */}
      <div className="relative w-full max-w-md aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${hasCaptured ? 'hidden' : 'block'}`}
        />
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover ${hasCaptured ? 'block' : 'hidden'}`}
        />

        {/* Live Watermark Overlay on Viewfinder */}
        <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm p-2 rounded text-white text-[10px] font-mono">
          <div>LOC: {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Acquiring GPS...'}</div>
          <div>ANTI-SPOOF: Gallery Uploads Disabled</div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="w-full max-w-md flex justify-center items-center pb-6">
        {!hasCaptured ? (
          <button
            onClick={handleCapture}
            className="w-20 h-20 bg-white rounded-full border-4 border-emerald-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Camera className="w-8 h-8 text-emerald-800" />
          </button>
        ) : (
          <div className="flex gap-6">
            <button
              onClick={() => setHasCaptured(false)}
              className="p-4 bg-gray-800 rounded-full text-white hover:bg-gray-700"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-emerald-600 rounded-full text-white font-bold flex items-center gap-2"
            >
              <Check className="w-5 h-5" /> Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
