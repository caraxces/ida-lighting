import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'white',
          background: 'linear-gradient(to bottom, #000000, #0d0d0d)',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: '20px' }}>
          IDA Lighting
        </div>
        <div style={{ fontSize: 30, opacity: 0.8 }}>
          Giải pháp chiếu sáng chuyên nghiệp
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 