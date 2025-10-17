import React from 'react'
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/blog-service"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SimpleBlogPage() {
  console.log('🔍 Simple page: Fetching data...')
  
  const [allPosts, featuredPosts] = await Promise.all([
    getBlogPosts(),
    getFeaturedBlogPosts()
  ])

  console.log('📊 Simple page results:', {
    allPosts: allPosts.length,
    featuredPosts: featuredPosts.length
  })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Simple Blog Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Debug Info:</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p><strong>All Posts:</strong> {allPosts.length}</p>
          <p><strong>Featured Posts:</strong> {featuredPosts.length}</p>
          <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Posts ({allPosts.length}):</h2>
        {allPosts.length > 0 ? (
          <div className="space-y-4">
            {allPosts.map((post) => (
              <div key={post.id} className="bg-gray-800 p-4 rounded">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-300">{post.excerpt}</p>
                <div className="text-sm text-gray-400 mt-2">
                  <span>Author: {post.author?.name || 'N/A'}</span> • 
                  <span>Category: {post.category?.name || 'N/A'}</span> • 
                  <span>Featured: {post.is_featured ? 'Yes' : 'No'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-400">No posts found!</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Posts ({featuredPosts.length}):</h2>
        {featuredPosts.length > 0 ? (
          <div className="space-y-4">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-yellow-900 p-4 rounded">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-300">{post.excerpt}</p>
                <div className="text-sm text-gray-400 mt-2">
                  <span>Author: {post.author?.name || 'N/A'}</span> • 
                  <span>Category: {post.category?.name || 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-400">No featured posts found!</p>
        )}
      </div>

      <div className="mt-8">
        <a href="/blogs" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          ← Back to Main Blog
        </a>
      </div>
    </div>
  )
}
