import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/src/types/blog'

interface BlogListingProps {
  posts: BlogPost[]
  title?: string
}

export default function BlogListing({ posts, title }: BlogListingProps) {
  // Group posts into rows of 2
  const rows = []
  for (let i = 0; i < posts.length; i += 2) {
    rows.push(posts.slice(i, i + 2))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full bg-black">
      {title && <h2 className="text-2xl font-bold mb-6 text-white">{title}</h2>}
      
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
            {row.map((post, index) => (
              <div key={post.id} className="flex">
                <div className="w-1/3">
                  <Link href={`/blogs/${post.slug}`} className="block bg-white p-2 h-44 transition-transform hover:scale-[1.02] rounded-lg overflow-hidden flex items-center justify-center">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={150}
                        height={150}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-gray-500 text-center">
                        <div className="text-4xl mb-2">📝</div>
                        <div className="text-sm">No Image</div>
                      </div>
                    )}
                  </Link>
                  <div className="mt-2 text-center">
                    <Link href={`/blogs/${post.slug}`} className="text-white font-medium hover:text-red-400 transition-colors block">
                      {post.title}
                    </Link>
                  </div>
                </div>

                <div className="w-2/3 pl-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{post.category?.name || 'Tin Tức'}</span>
                      <span>•</span>
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white hover:text-red-400 transition-colors">
                      <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                    </h3>
                    
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        {post.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">by {post.author?.name || 'IDA Lighting'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
