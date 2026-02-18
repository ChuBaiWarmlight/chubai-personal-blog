export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const Input = ({
  label,
  error,
  icon,
  type = 'text',
  placeholder = '',
  disabled = false,
  className = '',
  ...props
}: InputProps) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed transition-all duration-200'
  
  const errorStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder:text-red-300'

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon && <span className="text-gray-500">{icon}</span>}
        </div>
        <input
          {...props}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${error ? errorStyles : ''} pl-10`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
