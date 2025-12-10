import React from 'react';
import { cn } from '@/lib/utils';

// 新拟物风格卡片组件
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'neumorphic-card p-6 animate-fade-in-up',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// 统计卡片组件
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className
}) => {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-secondary text-sm font-medium mb-1">{title}</p>
          <p className="text-primary text-3xl font-bold mb-1">{value}</p>
          {subtitle && (
            <p className="text-muted text-sm">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'flex items-center mt-2 text-sm font-medium',
              trend.isPositive ? 'text-success' : 'text-error'
            )}>
              <span className="mr-1">
                {trend.isPositive ? '↗' : '↘'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-neumorphic-sm bg-tertiary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

// 新拟物风格按钮组件
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'neumorphic-button font-medium transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'text-primary hover:bg-accent/10',
    secondary: 'text-secondary hover:bg-tertiary/10',
    success: 'text-success hover:bg-success/10',
    warning: 'text-warning hover:bg-warning/10',
    error: 'text-error hover:bg-error/10',
    ghost: 'text-muted hover:bg-tertiary/20',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-neumorphic-sm',
    md: 'px-4 py-3 text-base rounded-neumorphic',
    lg: 'px-6 py-4 text-lg rounded-neumorphic-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// 新拟物风格输入框组件
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-secondary text-sm font-medium">
          {label}
        </label>
      )}
      <input
        className={cn(
          'neumorphic-input w-full text-primary placeholder-muted focus:ring-2 focus:ring-accent',
          error && 'border-error focus:ring-error',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-error text-sm">{error}</p>
      )}
    </div>
  );
};

// 新拟物风格徽章组件
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className
}) => {
  const variantClasses = {
    default: 'text-muted bg-tertiary',
    success: 'text-success bg-success/20',
    warning: 'text-warning bg-warning/20',
    error: 'text-error bg-error/20',
    accent: 'text-accent bg-accent/20',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-neumorphic-sm',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  );
};

// 新拟物风格导航组件
interface NavItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  icon,
  isActive,
  onClick
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center space-x-3 px-4 py-3 rounded-neumorphic transition-all duration-200 text-secondary hover:text-primary hover:bg-tertiary/30',
        isActive && 'text-primary bg-tertiary/50'
      )}
    >
      {icon && <span className="text-accent">{icon}</span>}
      <span className="font-medium">{label}</span>
    </a>
  );
};

// 新拟物风格表格组件
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="neumorphic-inset rounded-neumorphic p-6 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={cn('w-full', className)}>
          {children}
        </table>
      </div>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead>
      <tr className="border-b border-tertiary/50">
        {children}
      </tr>
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="divide-y divide-tertiary/30">
      {children}
    </tbody>
  );
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({ children, className }) => {
  return (
    <td className={cn('px-4 py-4 text-primary', className)}>
      {children}
    </td>
  );
};

// 容器组件
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('container mx-auto px-6 py-8', className)}>
      {children}
    </div>
  );
};