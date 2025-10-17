import React from 'react'
import { getBlogPosts } from '@/lib/blog-service'

export default async function TestBlogPage() {
  console.log('Testing blog data fetch...')
  
  try {
    const posts = await getBlogPosts()
    console.log('Posts fetched:', posts.length)
    
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Test Blog Data</h1>
        <p>Posts count: {posts.length}</p>
        <pre className="bg-gray-800 p-4 rounded text-sm overflow-auto mt-4">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Error</h1>
        <pre className="bg-red-900 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }
}
