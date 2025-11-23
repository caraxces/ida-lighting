# Hướng Dẫn Sử Dụng Content Blocks

## Tổng Quan

Content Blocks cho phép bạn thêm các phần tử nội dung đặc biệt vào blog posts như:
- Image Content Block (ảnh + nội dung trái/phải)
- Comparison Table Block (bảng so sánh)
- Text Content Block (nội dung text)

## Cấu Trúc Bảng `blog_content_blocks`

### Các Cột Cần Thiết:

```sql
CREATE TABLE blog_content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  block_type VARCHAR NOT NULL CHECK (block_type IN ('image_content', 'comparison_table', 'text_content')),
  position INTEGER NOT NULL DEFAULT 0,
  heading VARCHAR,
  content TEXT,
  image_url VARCHAR,
  image_position VARCHAR CHECK (image_position IN ('left', 'right')),
  table_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Cách Tạo Content Blocks

### 1. Image Content Block (Ảnh + Nội dung trái/phải)

```sql
INSERT INTO blog_content_blocks (
  post_id,
  block_type,
  position,
  heading,
  content,
  image_url,
  image_position
) VALUES (
  'POST_ID_HERE',  -- Thay bằng ID của blog post
  'image_content',
  1,  -- Thứ tự hiển thị
  'Tiêu đề của block',
  '<p>Nội dung HTML ở đây. Có thể dùng các thẻ HTML như <strong>bold</strong>, <em>italic</em>, v.v.</p>',
  '/path/to/image.jpg',  -- Đường dẫn ảnh
  'left'  -- hoặc 'right'
);
```

**Ví dụ:**
```sql
INSERT INTO blog_content_blocks (
  post_id,
  block_type,
  position,
  heading,
  content,
  image_url,
  image_position
) VALUES (
  '550e8400-e29b-41d4-a716-446655440031',
  'image_content',
  1,
  'Giải Pháp Chiếu Sáng Hiện Đại',
  '<p>Hệ thống chiếu sáng LED hiện đại mang lại hiệu quả năng lượng cao và thiết kế đẹp mắt.</p><ul><li>Tiết kiệm 80% năng lượng</li><li>Tuổi thọ lên đến 50,000 giờ</li></ul>',
  '/collections/TRC_9988.jpg',
  'left'
);
```

### 2. Comparison Table Block (Bảng So Sánh)

```sql
INSERT INTO blog_content_blocks (
  post_id,
  block_type,
  position,
  table_data
) VALUES (
  'POST_ID_HERE',
  'comparison_table',
  2,
  '{
    "title": "So Sánh Đèn LED",
    "columns": ["Đặc điểm", "LED Thường", "LED Thông Minh"],
    "rows": [
      {
        "label": "Tiết kiệm năng lượng",
        "values": ["70%", "85%"]
      },
      {
        "label": "Tuổi thọ",
        "values": ["30,000 giờ", "50,000 giờ"]
      },
      {
        "label": "Điều khiển",
        "values": ["Tắt/Bật", "App, Remote, Voice"]
      }
    ]
  }'::jsonb
);
```

### 3. Text Content Block (Nội dung Text)

```sql
INSERT INTO blog_content_blocks (
  post_id,
  block_type,
  position,
  heading,
  content
) VALUES (
  'POST_ID_HERE',
  'text_content',
  3,
  'Kết Luận',
  '<p>Với những ưu điểm vượt trội, đèn LED đang trở thành lựa chọn hàng đầu cho các công trình hiện đại.</p>'
);
```

## Lưu Ý Quan Trọng

1. **Position**: Các blocks sẽ được hiển thị theo thứ tự `position` (từ nhỏ đến lớn)
2. **Post ID**: Phải đảm bảo `post_id` khớp với ID của blog post trong bảng `blog_posts`
3. **Block Type**: Chỉ nhận 3 giá trị: `image_content`, `comparison_table`, `text_content`
4. **Image Position**: Chỉ nhận `left` hoặc `right` (cho image_content blocks)

## Kiểm Tra Content Blocks

### Xem tất cả content blocks của một post:

```sql
SELECT * 
FROM blog_content_blocks 
WHERE post_id = 'POST_ID_HERE'
ORDER BY position ASC;
```

### Debug trong code:

Khi chạy development server, kiểm tra console logs để xem:
- Số lượng blocks được fetch
- Cấu trúc data của từng block
- Lỗi nếu có

## Troubleshooting

### Không thấy content blocks hiển thị?

1. **Kiểm tra Post ID**: Đảm bảo `post_id` trong `blog_content_blocks` khớp với ID trong `blog_posts`
2. **Kiểm tra Block Type**: Phải là một trong 3 giá trị: `image_content`, `comparison_table`, `text_content`
3. **Kiểm tra Position**: Có giá trị hợp lệ (số nguyên)
4. **Kiểm tra Console Logs**: Xem có lỗi gì trong terminal/server logs không

### Xem debug info trên trang:

Trong môi trường development, nếu không có content blocks, sẽ hiển thị thông báo debug vàng với Post ID để bạn kiểm tra.

## Ví Dụ Hoàn Chỉnh

Tạo một blog post với nhiều content blocks:

```sql
-- 1. Tạo post (hoặc dùng post đã có)
-- Giả sử post_id = '550e8400-e29b-41d4-a716-446655440031'

-- 2. Thêm Image Content Block (ảnh bên trái)
INSERT INTO blog_content_blocks (
  post_id, block_type, position, heading, content, image_url, image_position
) VALUES (
  '550e8400-e29b-41d4-a716-446655440031',
  'image_content',
  1,
  'Giải Pháp Chiếu Sáng',
  '<p>Nội dung mô tả...</p>',
  '/collections/TRC_9988.jpg',
  'left'
);

-- 3. Thêm Comparison Table
INSERT INTO blog_content_blocks (
  post_id, block_type, position, table_data
) VALUES (
  '550e8400-e29b-41d4-a716-446655440031',
  'comparison_table',
  2,
  '{"title": "So Sánh", "columns": ["A", "B"], "rows": [{"label": "X", "values": ["1", "2"]}]}'::jsonb
);

-- 4. Thêm Text Content Block
INSERT INTO blog_content_blocks (
  post_id, block_type, position, heading, content
) VALUES (
  '550e8400-e29b-41d4-a716-446655440031',
  'text_content',
  3,
  'Kết Luận',
  '<p>Kết luận bài viết...</p>'
);
```

Blocks sẽ hiển thị theo thứ tự position: 1 → 2 → 3

