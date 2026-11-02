import React from 'react';

export type LogoVariant =
  | 'horizontal'
  | 'stacked'
  | 'icon'
  | 'app-icon'
  | 'white-on-green'
  | 'white-on-black';

export interface VerapayLogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: number; // Icon size or height
  showTagline?: boolean;
}

export const VerapayLogo: React.FC<VerapayLogoProps> = ({
  variant = 'horizontal',
  className = '',
  size,
  showTagline = true,
}) => {
  const DARK_GREEN = '#084E38';

  // 1. Icon Only
  if (variant === 'icon') {
    const s = size || 36;
    return (
      <img
        src="/logo.png"
        alt="Verapay"
        width={s}
        height={s}
        style={{ width: s, height: s }}
        className={`object-contain flex-shrink-0 ${className}`}
      />
    );
  }

  // 2. App Icon (Squircle rounded container)
  if (variant === 'app-icon') {
    const s = size || 40;
    return (
      <div
        style={{ width: s, height: s, borderRadius: Math.round(s * 0.26) }}
        className={`bg-[#0B6B4D] flex items-center justify-center p-1.5 flex-shrink-0 ${className}`}
      >
        <img
          src="/logo.png"
          alt="Verapay App Icon"
          width={s}
          height={s}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // 3. Stacked Logo
  if (variant === 'stacked') {
    const s = size || 56;
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <img
          src="/logo.png"
          alt="Verapay"
          width={s}
          height={s}
          style={{ width: s, height: s }}
          className="object-contain flex-shrink-0"
        />
        <span
          style={{ color: DARK_GREEN }}
          className="text-2xl font-black tracking-tight mt-2"
        >
          Verapay
        </span>
        {showTagline && (
          <span className="text-xs text-slate-500 font-medium tracking-tight -mt-0.5">
            Verify, then release.
          </span>
        )}
      </div>
    );
  }

  // 4. White on Green
  if (variant === 'white-on-green') {
    const s = size || 38;
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src="/logo.png"
          alt="Verapay"
          width={s}
          height={s}
          style={{ width: s, height: s }}
          className="object-contain flex-shrink-0"
        />
        <div>
          <span className="text-xl font-black text-white tracking-tight block">Verapay</span>
          {showTagline && (
            <span className="text-[11px] text-emerald-100 font-medium tracking-tight block -mt-1">
              Verify, then release.
            </span>
          )}
        </div>
      </div>
    );
  }

  // 5. White on Black
  if (variant === 'white-on-black') {
    const s = size || 38;
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src="/logo.png"
          alt="Verapay"
          width={s}
          height={s}
          style={{ width: s, height: s }}
          className="object-contain flex-shrink-0"
        />
        <div>
          <span className="text-xl font-black text-white tracking-tight block">Verapay</span>
          {showTagline && (
            <span className="text-[11px] text-slate-400 font-medium tracking-tight block -mt-1">
              Verify, then release.
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal Full Color
  const s = size || 38;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Verapay"
        width={s}
        height={s}
        style={{ width: s, height: s }}
        className="object-contain flex-shrink-0"
      />
      <div>
        <span
          style={{ color: DARK_GREEN }}
          className="text-xl font-black tracking-tight block leading-tight"
        >
          Verapay
        </span>
        {showTagline && (
          <span className="text-[11px] text-slate-500 font-medium tracking-tight block -mt-0.5">
            Verify, then release.
          </span>
        )}
      </div>
    </div>
  );
};
