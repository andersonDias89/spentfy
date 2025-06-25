// components/icons/SidebarHoverIcon.tsx

interface IconProps {
  className?: string;
}

export default function SidebarHoverIcon({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="3" width="2" height="18" rx="1" fill="currentColor" />
      <path d="M8 4H20V20H8V4Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 8L16 12L13 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
