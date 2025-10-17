import React from 'react'
import { Metadata } from "next"
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getBlogPost, getBlogPosts } from "@/lib/blog-service"

interface PageParams {
  slug: string
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Không tìm thấy bài viết | IDA Lighting',
    }
  }

  return {
    title: `${post.title} | IDA Lighting Blog`,
    description: post.excerpt,
    keywords: post.tags?.map(tag => tag.name).join(', ') || '',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featured_image || "https://idalighting.vn/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      locale: 'vi_VN',
      url: `https://idalighting.vn/blogs/${post.slug}`,
      siteName: 'IDA Lighting',
      publishedTime: post.published_at || post.created_at,
      authors: [post.author?.name || 'IDA Lighting'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image || "https://idalighting.vn/og-image.jpg"],
    },
    alternates: {
      canonical: `https://idalighting.vn/blogs/${post.slug}`,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-16 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="relative h-[400px] w-full mb-6">
              <Image
                src={post.featured_image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="px-3 py-1 bg-red-600 text-white rounded-full">
                  {post.category?.name}
                </span>
                <span>{formatDate(post.published_at || post.created_at)}</span>
                <span>•</span>
                <span>by {post.author?.name}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Section */}
          {post.author && (
            <div className="mt-12 p-6 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar_url || "/placeholder-user.jpg"}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{post.author.name}</h3>
                  <p className="text-gray-400">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link 
              href="/blogs" 
              className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              ← Quay lại danh sách bài viết
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
