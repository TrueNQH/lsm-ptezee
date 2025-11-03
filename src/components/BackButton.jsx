import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useBackButton } from '../hooks/useBackButton'

const BackButton = ({ 
  fallbackPath = '/', 
  className = '', 
  showText = true, 
  text = 'Quay lại',
  variant = 'default' 
}) => {
  const { goBack, canGoBack } = useBackButton(fallbackPath)

  const baseClasses = "flex items-center space-x-2 transition-colors"
  
  const variants = {
    default: "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",
    button: "p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg",
    link: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
  }

  const combinedClasses = `${baseClasses} ${variants[variant]} ${className}`

  return (
    <button
      onClick={goBack}
      className={combinedClasses}
      title={canGoBack() ? "Quay lại trang trước" : `Về ${fallbackPath}`}
    >
      <ArrowLeft className="w-5 h-5" />
      {showText && <span>{text}</span>}
    </button>
  )
}

export default BackButton