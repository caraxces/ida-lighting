import { supabase } from './supabase'

export async function debugBlogPosts() {
  console.log('🔍 Starting debug...')
  
  try {
    // Test 1: Simple query without joins
    console.log('Test 1: Simple query without joins')
    const { data: simpleData, error: simpleError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
    
    console.log('Simple query result:', { data: simpleData, error: simpleError })
    
    // Test 2: Query with author join only
    console.log('Test 2: Query with author join only')
    const { data: authorData, error: authorError } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*)
      `)
      .eq('status', 'published')
    
    console.log('Author join result:', { data: authorData, error: authorError })
    
    // Test 3: Query with all joins
    console.log('Test 3: Query with all joins')
    const { data: fullData, error: fullError } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*),
        category:blog_categories(*),
        tags:blog_post_tags(
          tag:blog_tags(*)
        )
      `)
      .eq('status', 'published')
    
    console.log('Full join result:', { data: fullData, error: fullError })
    
    return {
      simple: { data: simpleData, error: simpleError },
      author: { data: authorData, error: authorError },
      full: { data: fullData, error: fullError }
    }
  } catch (error) {
    console.error('Debug error:', error)
    return { error }
  }
}
