import React from 'react'

export default function BlogsLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <>
      <head>
        {/* Zalo specific meta tags for blogs section */}
        <meta property="zalo:title" content="Blog | IDA Lighting" />
        <meta property="zalo:description" content="Tin tức, xu hướng và kiến thức về chiếu sáng từ IDA Lighting" />
        <meta property="zalo:image" content="https://idalighting.vn/og-image.jpg" />
        <meta property="zalo:type" content="article" />
      </head>
      {children}
    </>
  )
}
