export interface BlogAuthor {
  id: string
  name: string
  email: string
  bio: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  created_at: string
  updated_at: string
}

export interface BlogTag {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category_id: string
  author_id: string
  status: 'draft' | 'published'
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  // Relations
  author?: BlogAuthor
  category?: BlogCategory
  tags?: BlogTag[]
}

export interface BlogPostTag {
  post_id: string
  tag_id: string
}
