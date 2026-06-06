import React from 'react'

const sw = 1.6;
const baseIco = { fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function IcoHome({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M4 11.5 12 5l8 6.5" />
      <path d="M6 10.5V19h12v-8.5" />
      <path d="M10.2 19v-4.2h3.6V19" />
    </svg>
  );
}
export function IcoSearch({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <circle cx="11" cy="11" r="6.2" />
      <path d="m16 16 4 4" />
    </svg>
  );
}
export function IcoLibrary({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M5 4.5h3.4v15H5z" />
      <path d="M10.2 4.5h3.4v15h-3.4z" />
      <path d="M15.6 5.6 18.7 5l3 14.2-3.1.6z" />
    </svg>
  );
}
export function IcoSpeaker({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M4 9.5v5h3.2L12 18.5v-13L7.2 9.5z" />
      <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
      <path d="M17.8 7a7 7 0 0 1 0 10" />
    </svg>
  );
}
export function IcoEye({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}
export function IcoTrash({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M5 6.5h14" />
      <path d="M8 6.5V5a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 5v1.5" />
      <path d="M6.5 6.5 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.9-12.5" />
    </svg>
  );
}
export function IcoPlus({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
export function IcoBack({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M14 5 7 12l7 7" />
    </svg>
  );
}
export function IcoScan({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
      <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
      <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
      <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M4 12h16" />
    </svg>
  );
}
export function IcoExport({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...baseIco}>
      <path d="M12 15V4" />
      <path d="M8.5 7.5 12 4l3.5 3.5" />
      <path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13" />
    </svg>
  );
}

export function FlagUS({ w = 30 }) {
  const h = w * 0.66;
  return (
    <svg width={w} height={h} viewBox="0 0 38 26" style={{ display: 'block', borderRadius: 2.5 }}>
      <defs>
        <clipPath id="usclip"><rect x="0" y="0" width="38" height="26" rx="2.5" /></clipPath>
      </defs>
      <g clipPath="url(#usclip)">
        <rect width="38" height="26" fill="#F4F2ED" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={i * 2} width="38" height="2" fill="#B22234" />
        ))}
        <rect width="16" height="14" fill="#3C3B6E" />
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <circle key={r + '-' + c} cx={2 + c * 3} cy={2 + r * 3.2} r="0.7" fill="#F4F2ED" />
          ))
        )}
      </g>
      <rect x="0.5" y="0.5" width="37" height="25" rx="2.5" fill="none" stroke="rgba(0,0,0,0.18)" />
    </svg>
  );
}

export function FlagUK({ w = 30 }) {
  const h = w * 0.66;
  return (
    <svg width={w} height={h} viewBox="0 0 38 26" style={{ display: 'block', borderRadius: 2.5 }}>
      <defs>
        <clipPath id="ukclip"><rect x="0" y="0" width="38" height="26" rx="2.5" /></clipPath>
      </defs>
      <g clipPath="url(#ukclip)">
        <rect width="38" height="26" fill="#012169" />
        <path d="M0 0 38 26M38 0 0 26" stroke="#F4F2ED" strokeWidth="5.2" />
        <path d="M0 0 38 26" stroke="#C8102E" strokeWidth="2.6" clipPath="url(#ukclip)" transform="translate(0,1.4)" />
        <path d="M38 0 0 26" stroke="#C8102E" strokeWidth="2.6" clipPath="url(#ukclip)" transform="translate(0,-1.4)" />
        <rect x="15" y="0" width="8" height="26" fill="#F4F2ED" />
        <rect x="0" y="9" width="38" height="8" fill="#F4F2ED" />
        <rect x="16.5" y="0" width="5" height="26" fill="#C8102E" />
        <rect x="0" y="10.5" width="38" height="5" fill="#C8102E" />
      </g>
      <rect x="0.5" y="0.5" width="37" height="25" rx="2.5" fill="none" stroke="rgba(0,0,0,0.18)" />
    </svg>
  );
}

export default {
  IcoHome, IcoSearch, IcoLibrary, IcoSpeaker, IcoEye, IcoTrash,
  IcoPlus, IcoBack, IcoScan, IcoExport, FlagUS, FlagUK,
}
