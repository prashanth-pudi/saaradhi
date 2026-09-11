import React from 'react';
import { cn } from '@/lib/utils';

export type GlassButtonVariant = 'default' | 'small' | 'withIcon' | 'submit' | 'iconOnly';
export type GlassButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asChild?: boolean;
}

/**
 * Modern Glass/Neumorphic Button
 * 
 * Features:
 * - Semi-transparent glassy look with backdrop-filter blur & slight white background
 * - Solid, fully opaque, highly readable dark text (#14382F / stone-900)
 * - Soft multi-layer drop shadow and subtle neumorphic top reflection to pop out
 * - Variants: 'Small', 'With Icon', 'Submit', and 'Icon-only'
 */
export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      variant = 'default',
      size,
      icon,
      iconPosition = 'left',
      className,
      type = 'button',
      disabled,
      ...props
    },
    ref
  ) => {
    // Resolve variant vs size defaults
    const isIconOnly = variant === 'iconOnly' || size === 'icon';
    const isSmall = variant === 'small' || size === 'sm';
    const isLarge = size === 'lg';
    const isSubmit = variant === 'submit' || type === 'submit';

    // Base glass & neumorphic styles
    // - backdrop-blur-md with 75-85% translucent white background
    // - crisp white rim border
    // - multi-layered outer drop shadow + inner specular rim for 3D elevation
    // - solid, fully opaque dark typography
    const baseClasses = cn(
      'group relative inline-flex items-center justify-center font-display font-bold tracking-tight select-none',
      'backdrop-blur-md transition-all duration-200 ease-out',
      // Text is 100% solid & fully opaque
      'text-[#14382F]',
      // Glass background & rim
      'bg-white/80 hover:bg-white/92 active:bg-white/95',
      'border border-white/85 hover:border-white',
      // Multi-layer neumorphic drop shadow + inner light refraction
      'shadow-[0_4px_16px_-2px_rgba(20,56,47,0.08),0_1px_3px_0_rgba(0,0,0,0.04),inset_0_1px_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(20,56,47,0.03)]',
      'hover:shadow-[0_8px_24px_-2px_rgba(20,56,47,0.14),0_2px_6px_0_rgba(0,0,0,0.06),inset_0_1px_1.5px_0_rgba(255,255,255,1)]',
      'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      'active:shadow-[0_2px_6px_0_rgba(20,56,47,0.06),inset_0_2px_4px_0_rgba(20,56,47,0.06)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14382F]/30 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
    );

    // Variant-specific styling adjustments
    let variantClasses = '';
    
    if (isSubmit) {
      // Submit variant: High-priority action with warm coral glass tint and enhanced tactile pop
      variantClasses = cn(
        'bg-gradient-to-b from-white/95 via-white/85 to-white/80',
        'border-[#FF5D38]/30 hover:border-[#FF5D38]/60',
        'shadow-[0_6px_22px_-2px_rgba(255,93,56,0.22),0_2px_6px_0_rgba(20,56,47,0.06),inset_0_1px_1.5px_0_rgba(255,255,255,1)]',
        'hover:shadow-[0_10px_28px_-2px_rgba(255,93,56,0.30),0_4px_10px_0_rgba(20,56,47,0.08),inset_0_1px_2px_0_rgba(255,255,255,1)]',
        'text-[#0F2922]'
      );
    }

    // Size / Shape adjustments
    let sizeClasses = 'h-11 px-5 text-sm rounded-full gap-2'; // Default size

    if (isSmall) {
      sizeClasses = 'h-8 px-3.5 text-xs rounded-full gap-1.5';
    } else if (isLarge) {
      sizeClasses = 'h-13 px-7 text-base rounded-full gap-2.5';
    } else if (isIconOnly) {
      sizeClasses = isSmall 
        ? 'h-8 w-8 p-0 rounded-full' 
        : isLarge 
        ? 'h-12 w-12 p-0 rounded-full' 
        : 'h-10 w-10 p-0 rounded-full';
    }

    return (
      <button
        ref={ref}
        type={isSubmit ? 'submit' : type}
        disabled={disabled}
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        {...props}
      >
        {/* Specular top highlight overlay for realistic glass refraction */}
        <span 
          className="pointer-events-none absolute inset-x-2 top-0.5 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full opacity-90" 
          aria-hidden="true" 
        />

        {/* Content with optional Icon positioning */}
        {icon && iconPosition === 'left' && (
          <span className="shrink-0 flex items-center text-current">{icon}</span>
        )}
        
        {children && (
          <span className={cn('relative z-10 font-bold', isIconOnly && 'sr-only')}>
            {children}
          </span>
        )}

        {icon && iconPosition === 'right' && (
          <span className="shrink-0 flex items-center text-current">{icon}</span>
        )}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
