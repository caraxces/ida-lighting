import { NextResponse } from 'next/server'
import { getBlogPosts, getFeaturedBlogPosts } from '@/lib/blog-service'

export async function GET() {
  try {
    console.log('🔍 API Route: Fetching blog data...')
    
    const [allPosts, featuredPosts] = await Promise.all([
      getBlogPosts(),
      getFeaturedBlogPosts()
    ])

    console.log('📊 API Route Results:', {
      allPosts: allPosts.length,
      featuredPosts: featuredPosts.length,
      sampleAllPosts: allPosts.slice(0, 2),
      sampleFeaturedPosts: featuredPosts.slice(0, 2)
    })

    return NextResponse.json({
      success: true,
      data: {
        allPosts: {
          count: allPosts.length,
          posts: allPosts
        },
        featuredPosts: {
          count: featuredPosts.length,
          posts: featuredPosts
        }
      }
    })
  } catch (error) {
    console.error('❌ API Route Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
