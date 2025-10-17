import { getBlogPosts } from '@/lib/blog-service'

export default async function TestDataPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Test Blog Data</h1>
      <p>Posts count: {posts.length}</p>
      
      {posts.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">First Post:</h2>
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-lg font-bold text-white">{posts[0].title}</h3>
            <p className="text-gray-300 mt-2">{posts[0].excerpt}</p>
            <p className="text-sm text-gray-400 mt-2">
              Slug: {posts[0].slug} | Status: {posts[0].status}
            </p>
          </div>
          
          <div className="mt-6">
            <a 
              href="/blogs" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-block transition-colors"
            >
              View in Blogs Page
            </a>
          </div>
        </div>
      ) : (
        <p className="text-red-400">No posts found</p>
      )}
    </div>
  )
}
