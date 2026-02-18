export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200'
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed shadow-md',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-400',
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const widthStyles = fullWidth ? 'w-full' : ''

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${isLoading ? 'opacity-75 cursor-wait' : ''} ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 4 8 0 0 0 1 4 0 0 0 1 4 0 0 0 0 2 0 0 0 4 0 0 0 0 0 2 0 0 0 0 3 0 0 0 0 1 1 0 0 0 1 1 0 0 0 1 0 0 0 1 1 1 0 0 0 1 1 0 1 0 0 0 2 0 0 0 0 3 0 0 0 0 2 1 0 0 0 1 1 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 3 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 3 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 0 2 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 3 0 0 0 0 0 0 0 2 0 0 0 0 0 0 3 0 0 0 2 0 0 0 0 0 0 3 0 0 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 0 0 2 0 0 0 0 3 0 0 0 2 0 0 0 0 0 3 0 0 0 0 0 2 0 0 0 3 0 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 0 3 0 0 0 0 0 2 0 0 0 0 3 0 0 0 0 2 0 0 0 0 0 3 0 0 0 2 0 0 0 0 3 0 0 0 0 0 0 0 2 0 0 0 0 角阴影

      {icon && <span className="mr-2">{icon}</span>}
      {isLoading && <span className="mr-2">Loading...</span>}
      {children}
    </button>
  )
}
