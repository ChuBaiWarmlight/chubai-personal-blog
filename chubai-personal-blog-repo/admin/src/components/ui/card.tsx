export interface CardProps {
  children: React.ReactNode
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
  hover?: boolean
}

export const Card = ({
  children,
  title,
  description,
  icon,
  className = '',
  hover = true,
  ...props
}: CardProps) => {
  const baseStyles = 'bg-white border border-gray-200 rounded-lg shadow-sm'
  const hoverStyles = hover ? 'hover:shadow-md transition-all duration-200 hover:border-blue-300' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {(title || description || icon) && (
        <div className="p-6">
          {(title || icon) && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {icon && <span className="mr-3">{icon}</span>}
                {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              </div>
            </div>
          )}
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
      )}
      {children && (
        <div className="p-6 pt-0 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  )
}
