import { supabase } from './supabase'
import { createClient } from './supabase/server'
import { BlogPost, BlogAuthor, BlogCategory, BlogTag, ContentBlock } from '@/src/types/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // First try simple query - get all published posts regardless of published_at date
    const { data: simpleData, error: simpleError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (simpleError) {
      console.error('Error fetching blog posts (simple):', simpleError)
      return []
    }

    if (!simpleData || simpleData.length === 0) {
      return []
    }

    // If simple query works, try with joins
    const { data, error } = await supabase
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
      .order('created_at', { ascending: false })

    if (error) {
      // Fallback to simple data
      return simpleData.map(post => ({
        ...post,
        author: null,
        category: null,
        tags: []
      }))
    }

    // Transform the data to match our interface
    return data?.map(post => ({
      ...post,
      tags: post.tags?.map((t: any) => t.tag).filter(Boolean) || []
    })) || []
  } catch (error) {
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:blog_authors(*),
        category:blog_categories(*),
        tags:blog_post_tags(
          tag:blog_tags(*)
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      return null
    }

    if (!data) return null

    return {
      ...data,
      tags: data.tags?.map((t: any) => t.tag).filter(Boolean) || []
    }
  } catch (error) {
    return null
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
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
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(6)

    if (error) {
      return []
    }

    return data?.map(post => ({
      ...post,
      tags: post.tags?.map((t: any) => t.tag).filter(Boolean) || []
    })) || []
  } catch (error) {
    return []
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}

export async function getBlogTags(): Promise<BlogTag[]> {
  try {
    const { data, error } = await supabase
      .from('blog_tags')
      .select('*')
      .order('name')

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}

/**
 * Fetch content blocks for a specific blog post
 */
export async function getContentBlocks(postId: string): Promise<ContentBlock[]> {
  try {
    if (!postId) {
      return []
    }
    
    const { data, error } = await supabase
      .from('blog_content_blocks')
      .select('*')
      .eq('post_id', postId)
      .order('position', { ascending: true })

    if (error || !data || data.length === 0) {
      return []
    }

    // Parse and normalize data
    const parsedData = data.map((block: any) => {
      // Handle table_data if it's a JSON string
      if (block.table_data && typeof block.table_data === 'string') {
        try {
          block.table_data = JSON.parse(block.table_data)
        } catch (e) {
          // Silently ignore parsing errors
        }
      }
      
      // Normalize column names - support various naming conventions
      const normalizedBlock: ContentBlock = {
        id: block.id,
        post_id: block.post_id,
        block_type: (block.block_type || block.type) as 'image_content' | 'comparison_table' | 'text_content',
        position: block.position || block.order || block.sort_order || 0,
        heading: block.heading || block.title || block.headline || undefined,
        content: block.content || block.text || block.body || undefined,
        image_url: block.image_url || block.image_path || block.image || undefined,
        image_position: (block.image_position || block.image_align || block.align || 'left') as 'left' | 'right',
        table_data: block.table_data || block.table || block.comparison_data || undefined,
        created_at: block.created_at,
        updated_at: block.updated_at,
      }
      
      return normalizedBlock
    })

    return parsedData
  } catch (error) {
    return []
  }
}
