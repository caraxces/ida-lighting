import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/src/types/blog'

interface VerticalBlogListingProps {
  posts: BlogPost[]
  showcaseImage: string
}

export default function VerticalBlogListing({ posts, showcaseImage }: VerticalBlogListingProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Showcase image */}
        <div className="md:col-span-1">
          <div className="relative h-[500px] w-full">
            <Image src={showcaseImage || "/placeholder.svg"} alt="Blog showcase" fill className="object-cover rounded-lg" />
          </div>
        </div>

        {/* Right side - Blog listings */}
        <div className="md:col-span-1 space-y-6">
          {posts.map((post, index) => (
            <div key={post.id}>
              <div className="flex gap-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span>{post.category?.name}</span>
                    <span>•</span>
                    <span>{formatDate(post.published_at || post.created_at)}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white hover:text-red-400 transition-colors mb-2">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  
                  <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
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
                    <span className="text-sm text-gray-400">by {post.author?.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
