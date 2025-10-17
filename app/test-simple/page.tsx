export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Test Simple Page</h1>
      <p>Server is working!</p>
      <a href="/blogs" className="text-red-400 hover:text-red-300 underline">
        Go to Blogs →
      </a>
    </div>
  )
}
