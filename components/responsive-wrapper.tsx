"use client"

import React from 'react'
import { useDeviceSize } from './hooks/use-device-size'

interface ResponsiveWrapperProps {
  children: React.ReactNode
  desktopView: React.ReactNode
  mobileView: React.ReactNode
}

/**
 * Component bọc để hiển thị các view khác nhau dựa trên kích thước màn hình
 * Chỉ có 2 dạng: Desktop (>=1024px) và Mobile (<1024px - bao gồm cả tablet)
 */
export default function ResponsiveWrapper({
  desktopView,
  mobileView
}: ResponsiveWrapperProps) {
  const { isDesktop } = useDeviceSize()

  // Hiển thị view tương ứng với kích thước màn hình
  return (
    <>
      {isDesktop ? desktopView : mobileView}
    </>
  )
} 