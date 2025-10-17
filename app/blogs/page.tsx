import React from 'react'
import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogListing from "@/components/blog-listing"
import VerticalBlogListing from "@/components/vertical-blog-listing"
import CollectionBanner from "@/components/collection-banner"
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/blog-service"

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Blog | IDA Lighting",
  description: "Tin tức, xu hướng và kiến thức về chiếu sáng từ IDA Lighting",
  keywords: "IDA Lighting, blog, tin tức, xu hướng chiếu sáng, đèn LED, thiết kế ánh sáng, kiến thức chiếu sáng",
  openGraph: {
    title: "Blog | IDA Lighting",
    description: "Tin tức, xu hướng và kiến thức về chiếu sáng từ IDA Lighting",
    images: [
      {
        url: "https://idalighting.vn/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IDA Lighting Blog",
      },
    ],
    type: 'website',
    locale: 'vi_VN',
    url: 'https://idalighting.vn/blogs',
    siteName: 'IDA Lighting',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Blog | IDA Lighting",
    description: "Tin tức, xu hướng và kiến thức về chiếu sáng từ IDA Lighting",
    images: ["https://idalighting.vn/og-image.jpg"],
  },
  alternates: {
    canonical: 'https://idalighting.vn/blogs',
  },
}

export default async function BlogsPage() {
  // Fetch blog data from Supabase
  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPosts()
  ])

  console.log('Blog data fetched:', { allPosts: allPosts.length, featuredPosts: featuredPosts.length })
  console.log('Sample post:', allPosts[0])

  // Group posts by category
  const postsByCategory = allPosts.reduce((acc, post) => {
    const category = post.category?.name || 'Tin Tức'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(post)
    return acc
  }, {} as Record<string, typeof allPosts>)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-16 pb-16">
        {/* Featured Posts Section */}
        <section id="featured">
          <CollectionBanner 
            title="BLOG" 
            subtitle="TIN TỨC & XU HƯỚNG CHIẾU SÁNG"
            image="/collections/TRC_9988.jpg" 
          />

          <div className="container mx-auto px-4 space-y-20">
            {/* Debug info - Remove in production */}
            <div className="text-center text-gray-400 text-sm mb-4">
              <p>Debug: {allPosts.length} bài viết, {featuredPosts.length} bài nổi bật</p>
              <p>Categories: {Object.keys(postsByCategory).join(', ')}</p>
            </div>

            {/* Featured Posts in Vertical Layout */}
            {featuredPosts.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Bài Viết Nổi Bật</h2>
                <VerticalBlogListing 
                  posts={featuredPosts.slice(0, 4)} 
                  showcaseImage="/collections/TRC_9988.jpg" 
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4 text-white">Chưa có bài viết nổi bật</h2>
                <p className="text-gray-400">Hãy thêm dữ liệu vào Supabase database</p>
                <a href="/blogs/debug" className="text-red-400 hover:text-red-300 mt-4 inline-block">
                  Xem debug info →
                </a>
              </div>
            )}
            
            {/* All Posts by Category */}
            {allPosts.length > 0 ? (
              Object.entries(postsByCategory).map(([categoryName, posts]) => (
                <div key={categoryName}>
                  <BlogListing 
                    posts={posts} 
                    title={categoryName} 
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4 text-white">Chưa có bài viết nào</h2>
                <p className="text-gray-400 mb-4">Hãy thêm dữ liệu vào Supabase database theo schema đã cung cấp</p>
                <div className="bg-gray-900 p-6 rounded-lg max-w-2xl mx-auto text-left mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-white">Cần tạo dữ liệu trong các bảng:</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• blog_authors - Thông tin tác giả</li>
                    <li>• blog_categories - Danh mục bài viết</li>
                    <li>• blog_tags - Tags</li>
                    <li>• blog_posts - Bài viết chính</li>
                    <li>• blog_post_tags - Liên kết bài viết và tags</li>
                  </ul>
                </div>
                <div className="space-x-4">
                  <a 
                    href="/admin-blog" 
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
                  >
                    Thêm Dữ Liệu Mẫu
                  </a>
                  <a href="/blogs/debug" className="text-red-400 hover:text-red-300 mt-4 inline-block">
                    Xem debug info →
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
