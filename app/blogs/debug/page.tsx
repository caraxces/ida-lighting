import React from 'react'
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/blog-service"
import { debugBlogPosts } from "@/lib/debug-blog-service"

export default async function DebugPage() {
  console.log('Environment variables:')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing')

  try {
    // Debug queries
    const debugResults = await debugBlogPosts()
    
    const [allPosts, featuredPosts] = await Promise.all([
      getBlogPosts(),
      getFeaturedBlogPosts()
    ])

    console.log('All posts:', allPosts)
    console.log('Featured posts:', featuredPosts)

    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Blog Data</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
          <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing'}</p>
          <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Debug Results:</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugResults, null, 2)}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">All Posts ({allPosts.length}):</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(allPosts, null, 2)}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Featured Posts ({featuredPosts.length}):</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(featuredPosts, null, 2)}
          </pre>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Debug error:', error)
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Debug Error</h1>
        <pre className="bg-red-900 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }
}
