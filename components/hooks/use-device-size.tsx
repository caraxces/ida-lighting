"use client"

import { useState, useEffect } from 'react'

// Breakpoint duy nhất tại 1024px - dưới đó là mobile/tablet, trên đó là desktop
const DESKTOP_BREAKPOINT = 1024

export function useDeviceSize() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Kiểm tra kích thước màn hình khi component mount
    const updateSize = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }

    // Thiết lập giá trị ban đầu
    updateSize()

    // Thêm event listener để cập nhật khi resize
    window.addEventListener('resize', updateSize)

    // Cleanup event listener
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { isDesktop }
} 