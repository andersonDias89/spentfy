// components/icons/SidebarClosedIcon.tsx

interface IconProps {
  className?: string;
}

export default function SidebarClosedIcon({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="3" width="2" height="18" rx="1" fill="currentColor" />
      <rect x="8" y="3" width="2" height="18" rx="1" fill="currentColor" />
      <path d="M13 3H20V21H13V3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
