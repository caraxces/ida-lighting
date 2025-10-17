import { supabase } from './supabase'
import { BlogPost, BlogAuthor, BlogCategory, BlogTag } from '@/src/types/blog'

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
