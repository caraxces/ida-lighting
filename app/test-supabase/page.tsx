import { supabase } from '@/lib/supabase'

export default async function TestSupabasePage() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test simple query
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
    
    console.log('Query result:', { data, error })
    
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Test Supabase Connection</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Query Result:</h2>
          <div className="bg-gray-900 p-4 rounded">
            <p><strong>Error:</strong> {error ? JSON.stringify(error) : 'None'}</p>
            <p><strong>Data count:</strong> {data?.length || 0}</p>
            {data && data.length > 0 && (
              <div className="mt-4">
                <p><strong>First post:</strong></p>
                <pre className="text-sm text-gray-300 mt-2">
                  {JSON.stringify(data[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-x-4">
          <a href="/blogs" className="text-red-400 hover:text-red-300 underline">
            Go to Blogs →
          </a>
          <a href="/blogs/debug" className="text-blue-400 hover:text-blue-300 underline">
            Go to Debug →
          </a>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Test error:', error)
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Test Error</h1>
        <pre className="bg-red-900 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    )
  }
}
