import { HTMLAttributes } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-100',
  success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400',
  warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
  error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400',
};

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-full
        text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </span>
  );
}
