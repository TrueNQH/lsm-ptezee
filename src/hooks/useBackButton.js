import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const useBackButton = (fallbackPath = '/') => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handlePopState = (event) => {
      // Xử lý khi người dùng nhấn nút back của browser
      console.log('Browser back button pressed, current path:', location.pathname)
      
      // Có thể thêm logic tùy chỉnh ở đây nếu cần
      // Ví dụ: lưu trạng thái, xác nhận trước khi rời khỏi trang, etc.
    }

    // Lắng nghe sự kiện popstate (browser back/forward)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [location.pathname])

  // Hàm để navigate back với fallback thông minh
  const goBack = () => {
    // Kiểm tra xem có history không
    if (window.history.length > 1 && document.referrer) {
      // Nếu có referrer và history, sử dụng navigate(-1)
      navigate(-1)
    } else {
      // Nếu không có history hoặc người dùng truy cập trực tiếp, 
      // chuyển về fallback path
      navigate(fallbackPath)
    }
  }

  // Hàm để navigate với history state
  const navigateWithState = (path, state = {}) => {
    navigate(path, { 
      state: { 
        ...state, 
        from: location.pathname,
        timestamp: Date.now()
      } 
    })
  }

  // Hàm để kiểm tra xem có thể go back không
  const canGoBack = () => {
    return window.history.length > 1 && document.referrer
  }

  return {
    goBack,
    navigateWithState,
    canGoBack,
    currentPath: location.pathname,
    previousPath: location.state?.from
  }
}