# Sử dụng Node.js 18 LTS
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package.json package-lock.json* ./

# Cài đặt dependencies với legacy-peer-deps để tránh xung đột
RUN npm install --legacy-peer-deps

# Sao chép tất cả code nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Giai đoạn sản phẩm để giảm kích thước image
FROM node:18-alpine AS runner
WORKDIR /app

# Sao chép node_modules và các file đã build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Thiết lập biến môi trường cho sản xuất
ENV NODE_ENV production
ENV PORT 3000

# Expose port 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"] 