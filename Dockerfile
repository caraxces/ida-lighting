# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Cài đặt dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps
# Cài đặt howler bỏ qua kiểm tra peer dependencies
RUN npm install howler @types/howler --legacy-peer-deps

# Copy source code
COPY . .

# Copy public files
COPY public ./public

# Build application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Tạo non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Sao chép các file cần thiết từ builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Thiết lập quyền truy cập
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Command để chạy ứng dụng
CMD ["node", "server.js"] 