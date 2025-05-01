import React from 'react'
import { getProductBySlug } from './metadata'

interface PageParams {
  slugs: string;
}

export default function ProductLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode,
  params: PageParams 
}) {
  // Get product data to generate Zalo meta tags
  const product = getProductBySlug(params.slugs);
  
  // Clean the description
  const cleanDescription = product 
    ? product.description.replace(/<br \/>/g, ' ').replace(/<[^>]*>/g, '')
    : 'Sản phẩm chiếu sáng cao cấp từ IDA Lighting';
  
  // Image URL
  const imageUrl = product 
    ? `https://idalighting.vn${product.mainImage}` 
    : 'https://idalighting.vn/og-image.jpg';
  
  // Product title
  const title = product 
    ? `${product.title} | IDA Lighting` 
    : 'Sản phẩm | IDA Lighting';

  return (
    <>
      {/* Zalo specific meta tags */}
      <head>
        <meta property="zalo:title" content={title} />
        <meta property="zalo:description" content={cleanDescription.substring(0, 160)} />
        <meta property="zalo:image" content={imageUrl} />
        {product && <meta property="zalo:product:price" content={`${product.price}`} />}
        {product && <meta property="zalo:product:currency" content="VND" />}
      </head>
      {children}
    </>
  )
} 