interface NeonIconProps {
  className?: string
}

/** Neon logomark (provided path). Brand fill #34D59A. */
export function NeonIcon({ className }: NeonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        fill="#34D59A"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.542.008V28l-10.747-9.508v9.323H0V0zM3.376 24.439H13.42V11.084l10.747 9.508V3.382l-20.79-.005z"
      />
    </svg>
  )
}
