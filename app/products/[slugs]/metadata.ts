import { Metadata } from 'next'

// Define product variant type
interface ProductVariant {
  name: string;
  image: string;
}

// Define product type
interface Product {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  description: string;
  mainImage: string;
  variants: ProductVariant[];
  category?: string;
}

// Get all product data from categories
// Simplified version just for metadata generation
const getAllProducts = (): Product[] => {
  // Product data with manually defined variants
  const productData: Product[] = [
    {
      id: 1,
      title: "IDA 6899-10+5 Crystal Glass",
      slug: "ida-6899-crystal",
      image: "/slides/6899-10+5.png",
      price: 12500000,
      description: "IDA 6899-10+5 Crystal Glass là sản phẩm đèn cao cấp của IDA Lighting, thiết kế tinh tế với chất liệu cao cấp, mang đến không gian sống sang trọng và đẳng cấp. Sản phẩm phù hợp với nhiều phong cách nội thất khác nhau.",
      mainImage: "/slides/6899-10+5.png",
      variants: [
        { name: "Crystal Glass", image: "/slides/6899-10+5.png" },
      ],
      category: "lighting"
    },
    {
      id: 8,
      title: "KZN0875A",
      slug: "downlight-kzn0875a",
      image: "/products/Downlight/KZN0875A.png",
      price: 680000,
      description: "Chóa đèn âm trần chống chói. Chất liệu: Nhựa PC. Kích thước chóa: Ø85*36mm. Cut out: Ø75mm. Màu sắc: Trắng.",
      mainImage: "/products/Downlight/KZN0875A.png",
      variants: [
        { name: "KZN0875A - Trắng", image: "/products/Downlight/KZN0875A.png" },
      ],
      category: "downlight"
    },
    // Thêm các sản phẩm khác từ cơ sở dữ liệu thực...
  ];

  return productData;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.slug === slug);
};

interface PageParams {
  slugs: string;
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const product = getProductBySlug(params.slugs);
  
  if (!product) {
    return {
      title: "Sản phẩm không tồn tại | IDA Lighting",
      description: "Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  // Clean the description from HTML tags
  const cleanDescription = product.description.replace(/<br \/>/g, ' ').replace(/<[^>]*>/g, '');

  return {
    title: `${product.title} | IDA Lighting`,
    description: cleanDescription.substring(0, 160),
    keywords: `${product.title}, ${product.category}, IDA Lighting, đèn, chiếu sáng, lighting`,
    openGraph: {
      title: `${product.title} | IDA Lighting`,
      description: cleanDescription.substring(0, 160),
      images: [
        {
          url: `https://idalighting.vn${product.mainImage}`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      type: 'website',
      locale: 'vi_VN',
      url: `https://idalighting.vn/products/${product.slug}`,
      siteName: 'IDA Lighting',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | IDA Lighting`,
      description: cleanDescription.substring(0, 160),
      images: [`https://idalighting.vn${product.mainImage}`],
    },
    alternates: {
      canonical: `https://idalighting.vn/products/${product.slug}`,
    },
    other: {
      'product:price:amount': `${product.price}`,
      'product:price:currency': 'VND',
    },
  };
} 