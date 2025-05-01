import { MetadataRoute } from 'next'
import { getProductBySlug } from './products/[slugs]/metadata'

const getAllProducts = () => {
  // Danh sách slug của tất cả sản phẩm
  // Trong thực tế, bạn nên lấy danh sách này từ API hoặc database
  return [
    'downlight-pros38c',
    'downlight-pros38m',
    'downlight-pros60',
    'downlight-b3-12w',
    'downlight-kzn0875a',
    'downlight-kzn0875', 
    'downlight-kzn0885a',
    'downlight-kzn0885b',
    'downlight-kzn0775a',
    'ida-6899-crystal',
    'ida-6551-gold',
    'ida-6897-black',
    'chandelier-crystal',
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://idalighting.vn'
  
  // Trang tĩnh
  const staticPages = [
    '',
    '/about',
    '/products',
    '/projects',
    '/contacts',
    '/privacy-policy',
  ]
  
  // Các trang sản phẩm động
  const productSlugs = getAllProducts()
  
  // Tạo sitemap từ trang tĩnh
  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
  
  // Tạo sitemap từ trang sản phẩm
  const productRoutes = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as 'weekly',
    priority: 0.7,
  }))
  
  return [...staticRoutes, ...productRoutes]
} 