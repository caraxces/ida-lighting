import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/src/types/blog'

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "compact" | "featured"
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (variant === "compact") {
    return (
      <Link href={`/blogs/${post.slug}`} className="group block">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 mb-3">
          <Image
            src={post.featured_image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">
          {post.title}
        </h3>
        <p className="mt-1 text-xs text-gray-400">
          {formatDate(post.published_at || post.created_at)}
        </p>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <div className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
          <Image
            src={post.featured_image || "/placeholder.svg"}
            alt={post.title}
            width={500}
            height={300}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{post.category?.name}</span>
            <span>•</span>
            <span>{formatDate(post.published_at || post.created_at)}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
            <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-3">{post.excerpt}</p>
          <div className="mt-3 flex items-center gap-2">
            {post.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
        <Image
          src={post.featured_image || "/placeholder.svg"}
          alt={post.title}
          width={500}
          height={300}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{post.category?.name}</span>
          <span>•</span>
          <span>{formatDate(post.published_at || post.created_at)}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
          <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 text-gray-600 line-clamp-3">{post.excerpt}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">by {post.author?.name}</span>
        </div>
      </div>
    </div>
  )
}
