"use client"

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminBlogPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const seedData = async () => {
    setLoading(true)
    setMessage('')

    try {
      // 1. Create authors
      const { data: authors, error: authorsError } = await supabase
        .from('blog_authors')
        .insert([
          {
            id: '550e8400-e29b-41d4-a716-446655440001',
            name: 'IDA Lighting Team',
            email: 'team@idalighting.vn',
            bio: 'Đội ngũ chuyên gia chiếu sáng của IDA Lighting với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và sản xuất đèn LED cao cấp.',
            avatar_url: '/placeholder-user.jpg'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440002',
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@idalighting.vn',
            bio: 'Chuyên gia thiết kế ánh sáng với chứng chỉ quốc tế về chiếu sáng kiến trúc.',
            avatar_url: '/placeholder-user.jpg'
          }
        ])
        .select()

      if (authorsError) {
        console.error('Authors error:', authorsError)
        setMessage(`Authors error: ${authorsError.message}`)
        return
      }

      // 2. Create categories
      const { data: categories, error: categoriesError } = await supabase
        .from('blog_categories')
        .insert([
          {
            id: '550e8400-e29b-41d4-a716-446655440011',
            name: 'Tin Tức',
            slug: 'tin-tuc',
            description: 'Các tin tức mới nhất về ngành chiếu sáng và IDA Lighting'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440012',
            name: 'Xu Hướng',
            slug: 'xu-huong',
            description: 'Xu hướng thiết kế ánh sáng và công nghệ LED mới nhất'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440013',
            name: 'Kiến Thức',
            slug: 'kien-thuc',
            description: 'Kiến thức chuyên sâu về chiếu sáng và đèn LED'
          }
        ])
        .select()

      if (categoriesError) {
        console.error('Categories error:', categoriesError)
        setMessage(`Categories error: ${categoriesError.message}`)
        return
      }

      // 3. Create tags
      const { data: tags, error: tagsError } = await supabase
        .from('blog_tags')
        .insert([
          {
            id: '550e8400-e29b-41d4-a716-446655440021',
            name: 'LED',
            slug: 'led'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440022',
            name: 'Thiết Kế',
            slug: 'thiet-ke'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440023',
            name: 'Công Nghệ',
            slug: 'cong-nghe'
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440024',
            name: 'Tiết Kiệm Năng Lượng',
            slug: 'tiet-kiem-nang-luong'
          }
        ])
        .select()

      if (tagsError) {
        console.error('Tags error:', tagsError)
        setMessage(`Tags error: ${tagsError.message}`)
        return
      }

      // 4. Create blog posts
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .insert([
          {
            id: '550e8400-e29b-41d4-a716-446655440031',
            title: 'Xu Hướng Chiếu Sáng Thông Minh 2024',
            slug: 'xu-huong-chieu-sang-thong-minh-2024',
            excerpt: 'Khám phá những xu hướng chiếu sáng thông minh mới nhất trong năm 2024, từ công nghệ LED đến hệ thống điều khiển tự động.',
            content: `
              <h2>Giới Thiệu</h2>
              <p>Năm 2024 đánh dấu một bước tiến quan trọng trong lĩnh vực chiếu sáng thông minh. Với sự phát triển của công nghệ IoT và AI, các hệ thống chiếu sáng ngày càng trở nên thông minh và tiết kiệm năng lượng hơn.</p>
              
              <h2>Xu Hướng Chính</h2>
              <h3>1. LED Thông Minh</h3>
              <p>Các đèn LED thông minh với khả năng điều chỉnh màu sắc và cường độ ánh sáng theo thời gian thực đang trở thành xu hướng chủ đạo.</p>
              
              <h3>2. Hệ Thống Điều Khiển Tự Động</h3>
              <p>Việc tích hợp cảm biến và trí tuệ nhân tạo cho phép hệ thống chiếu sáng tự động điều chỉnh theo môi trường và nhu cầu sử dụng.</p>
              
              <h3>3. Tiết Kiệm Năng Lượng</h3>
              <p>Các giải pháp chiếu sáng mới tập trung vào việc tối ưu hóa năng lượng, giảm thiểu tác động đến môi trường.</p>
              
              <h2>Kết Luận</h2>
              <p>Xu hướng chiếu sáng thông minh 2024 hứa hẹn mang lại những trải nghiệm mới mẻ và hiệu quả cho người dùng, đồng thời góp phần bảo vệ môi trường.</p>
            `,
            featured_image: '/collections/TRC_9988.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440012',
            author_id: '550e8400-e29b-41d4-a716-446655440001',
            status: 'published',
            is_featured: true,
            published_at: new Date().toISOString()
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440032',
            title: 'Hướng Dẫn Chọn Đèn LED Phù Hợp',
            slug: 'huong-dan-chon-den-led-phu-hop',
            excerpt: 'Bạn đang tìm kiếm đèn LED phù hợp cho không gian của mình? Hãy tham khảo hướng dẫn chi tiết này để có lựa chọn tốt nhất.',
            content: `
              <h2>Yếu Tố Quan Trọng</h2>
              <p>Khi chọn đèn LED, có nhiều yếu tố cần xem xét để đảm bảo hiệu quả và tiết kiệm năng lượng.</p>
              
              <h3>1. Công Suất và Độ Sáng</h3>
              <p>Lumen (lm) là đơn vị đo độ sáng thực tế. Công suất (W) chỉ cho biết mức tiêu thụ điện năng.</p>
              
              <h3>2. Nhiệt Độ Màu</h3>
              <p>Nhiệt độ màu được đo bằng Kelvin (K): 2700K-3000K (ấm), 4000K-5000K (trung tính), 6000K+ (lạnh).</p>
              
              <h3>3. Chỉ Số Hoàn Màu (CRI)</h3>
              <p>CRI càng cao (tối đa 100) thì màu sắc càng chân thực. Nên chọn CRI ≥ 80.</p>
              
              <h2>Ứng Dụng Theo Không Gian</h2>
              <p>Mỗi không gian có yêu cầu chiếu sáng khác nhau. Phòng khách cần ánh sáng ấm áp, phòng làm việc cần ánh sáng sáng và tập trung.</p>
            `,
            featured_image: '/collections/1.png',
            category_id: '550e8400-e29b-41d4-a716-446655440013',
            author_id: '550e8400-e29b-41d4-a716-446655440002',
            status: 'published',
            is_featured: true,
            published_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: '550e8400-e29b-41d4-a716-446655440033',
            title: 'IDA Lighting Ra Mắt Sản Phẩm Mới',
            slug: 'ida-lighting-ra-mat-san-pham-moi',
            excerpt: 'IDA Lighting chính thức ra mắt dòng sản phẩm LED mới với công nghệ tiên tiến và thiết kế hiện đại.',
            content: `
              <h2>Sản Phẩm Mới</h2>
              <p>IDA Lighting tự hào giới thiệu dòng sản phẩm LED mới với những cải tiến vượt trội về công nghệ và thiết kế.</p>
              
              <h3>Tính Năng Nổi Bật</h3>
              <ul>
                <li>Công nghệ LED tiên tiến</li>
                <li>Tiết kiệm năng lượng lên đến 80%</li>
                <li>Tuổi thọ cao, lên đến 50,000 giờ</li>
                <li>Thiết kế hiện đại, dễ lắp đặt</li>
              </ul>
              
              <h2>Ứng Dụng</h2>
              <p>Sản phẩm phù hợp cho nhiều không gian khác nhau: nhà ở, văn phòng, khách sạn, và các công trình thương mại.</p>
            `,
            featured_image: '/collections/5.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440011',
            author_id: '550e8400-e29b-41d4-a716-446655440001',
            status: 'published',
            is_featured: false,
            published_at: new Date(Date.now() - 172800000).toISOString()
          }
        ])
        .select()

      if (postsError) {
        console.error('Posts error:', postsError)
        setMessage(`Posts error: ${postsError.message}`)
        return
      }

      // 5. Create post-tag relationships
      const { data: postTags, error: postTagsError } = await supabase
        .from('blog_post_tags')
        .insert([
          { post_id: '550e8400-e29b-41d4-a716-446655440031', tag_id: '550e8400-e29b-41d4-a716-446655440021' },
          { post_id: '550e8400-e29b-41d4-a716-446655440031', tag_id: '550e8400-e29b-41d4-a716-446655440022' },
          { post_id: '550e8400-e29b-41d4-a716-446655440031', tag_id: '550e8400-e29b-41d4-a716-446655440023' },
          { post_id: '550e8400-e29b-41d4-a716-446655440032', tag_id: '550e8400-e29b-41d4-a716-446655440021' },
          { post_id: '550e8400-e29b-41d4-a716-446655440032', tag_id: '550e8400-e29b-41d4-a716-446655440024' },
          { post_id: '550e8400-e29b-41d4-a716-446655440033', tag_id: '550e8400-e29b-41d4-a716-446655440021' },
          { post_id: '550e8400-e29b-41d4-a716-446655440033', tag_id: '550e8400-e29b-41d4-a716-446655440023' }
        ])
        .select()

      if (postTagsError) {
        console.error('Post-tags error:', postTagsError)
        setMessage(`Post-tags error: ${postTagsError.message}`)
        return
      }

      setMessage('✅ Dữ liệu blog đã được thêm thành công! Bạn có thể truy cập /blogs để xem.')
    } catch (error) {
      console.error('Error:', error)
      setMessage(`❌ Lỗi: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Blog - Thêm Dữ Liệu Mẫu</h1>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Hướng Dẫn</h2>
          <p className="text-gray-300 mb-4">
            Trang này sẽ thêm dữ liệu mẫu vào Supabase database. Nếu gặp lỗi RLS (Row Level Security), 
            bạn cần tắt RLS cho các bảng blog trong Supabase Dashboard.
          </p>
          <ol className="text-sm text-gray-400 space-y-2">
            <li>1. Vào Supabase Dashboard</li>
            <li>2. Chọn Authentication → Policies</li>
            <li>3. Tắt RLS cho các bảng: blog_authors, blog_categories, blog_tags, blog_posts, blog_post_tags</li>
            <li>4. Hoặc tạo policies cho phép insert/select public</li>
          </ol>
        </div>

        <button
          onClick={seedData}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Đang thêm dữ liệu...' : 'Thêm Dữ Liệu Mẫu'}
        </button>

        {message && (
          <div className={`mt-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {message}
          </div>
        )}

        <div className="mt-8">
          <a 
            href="/blogs" 
            className="text-red-400 hover:text-red-300 underline"
          >
            ← Quay lại trang Blog
          </a>
        </div>
      </div>
    </div>
  )
}
