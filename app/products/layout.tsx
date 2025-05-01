import React from 'react'

export default function ProductsLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <>
      <head>
        {/* Zalo specific meta tags for products section */}
        <meta property="zalo:title" content="Sản phẩm chiếu sáng | IDA Lighting" />
        <meta property="zalo:description" content="Các loại đèn cao cấp, chóa đèn, và chip LED chất lượng cao từ IDA Lighting" />
        <meta property="zalo:image" content="https://idalighting.vn/og-image.jpg" />
        <meta property="zalo:type" content="product" />
      </head>
      {children}
    </>
  )
} 