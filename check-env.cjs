#!/usr/bin/env node

// Script để kiểm tra file .env.local
const fs = require('fs');
const path = require('path');

console.log('🔍 Kiểm tra file .env.local...\n');

const envPath = path.join(process.cwd(), '.env.local');

// Kiểm tra file tồn tại
if (!fs.existsSync(envPath)) {
  console.error('❌ File .env.local không tồn tại!');
  console.log('\n📝 Tạo file mới:');
  console.log('   touch .env.local');
  console.log('\nHoặc chạy:');
  console.log('   npm run check-env');
  process.exit(1);
}

console.log('✅ File .env.local tồn tại\n');

// Đọc file
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

const envVars = {};
lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Kiểm tra các biến bắt buộc
const requiredVars = {
  'NEXT_PUBLIC_SUPABASE_URL': 'Supabase Project URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'Supabase Anonymous Key'
};

let allOk = true;

console.log('📋 Kiểm tra các biến môi trường:\n');

Object.keys(requiredVars).forEach(key => {
  const value = envVars[key];
  const description = requiredVars[key];
  
  if (!value || value.length === 0) {
    console.error(`❌ ${key}`);
    console.error(`   Mô tả: ${description}`);
    console.error(`   Trạng thái: CHƯA ĐƯỢC ĐIỀN\n`);
    allOk = false;
  } else {
    const preview = value.length > 50 ? value.substring(0, 50) + '...' : value;
    console.log(`✅ ${key}`);
    console.log(`   Mô tả: ${description}`);
    console.log(`   Giá trị: ${preview}`);
    console.log(`   Độ dài: ${value.length} ký tự\n`);
  }
});

console.log('─'.repeat(50));

if (allOk) {
  console.log('\n✅ Tất cả các biến môi trường đã được điền đầy đủ!');
  console.log('💡 Lưu ý: Nếu vẫn gặp lỗi, hãy restart development server:');
  console.log('   npm run dev\n');
} else {
  console.log('\n❌ Có biến môi trường chưa được điền!');
  console.log('\n📖 Hướng dẫn:');
  console.log('1. Mở file .env.local');
  console.log('2. Lấy credentials từ: https://app.supabase.com > Settings > API');
  console.log('3. Điền đầy đủ thông tin');
  console.log('4. Restart server (npm run dev)');
  console.log('\n📚 Xem file ENV-SETUP.md để biết chi tiết\n');
  process.exit(1);
}

