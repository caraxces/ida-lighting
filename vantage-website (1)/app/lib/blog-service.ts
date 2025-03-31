// Mock database for blog posts
const blogPosts = [
  {
    id: "1",
    slug: "prague-coffee-shop",
    title: "Prague Coffee Shop",
    subtitle: "Experience a perfect blend",
    excerpt: "Botanical Coffee Shop in Prague offers a unique blend with an eco-friendly and sustainable approach.",
    content: `
      <h2>Five Reasons Why You Should Visit Our Prague Coffee Shop</h2>
      <p>Our Prague location combines traditional Czech coffee culture with botanical innovation to create a unique experience you won't find anywhere else.</p>
      <p>The shop is nestled in a historic building with modern interior design that emphasizes sustainability and natural elements.</p>
      <p>Our baristas are trained in both traditional and experimental brewing methods, ensuring you get the perfect cup every time.</p>
      <p>We source our beans directly from small-scale farmers, ensuring fair compensation and sustainable farming practices.</p>
      <p>The botanical elements aren't just for show - they contribute to a unique atmosphere that enhances your coffee experience.</p>
    `,
    coverImage: "/images/location-cards.png",
    heroImage: "/images/machu-picchu.png",
    category: "Locations",
    tags: ["prague", "coffee", "botanical"],
    status: "published",
    publishedAt: "2023-05-15T10:30:00Z",
    author: "Jane Smith",
  },
  {
    id: "2",
    slug: "berlin-coffee-culture",
    title: "Berlin Coffee Culture",
    subtitle: "Where tradition meets innovation",
    excerpt: "Berlin's dynamic coffee culture meets botanical innovation in our newest location.",
    content: `
      <h2>Five Reasons Why You Should Visit Our Berlin Coffee Shop</h2>
      <p>Berlin's dynamic coffee scene is the perfect backdrop for our botanical-inspired coffee shop.</p>
      <p>Our Berlin location features a minimalist design with carefully selected plants that create a calming atmosphere.</p>
      <p>We offer workshops on coffee brewing techniques, from pour-over to espresso, taught by our expert baristas.</p>
      <p>Our signature drinks blend traditional German flavors with innovative botanical elements.</p>
      <p>The shop hosts regular events featuring local artists and musicians, making it a cultural hub.</p>
    `,
    coverImage: "/images/location-cards.png",
    heroImage: "/images/machu-picchu.png",
    category: "Locations",
    tags: ["berlin", "coffee", "culture"],
    status: "published",
    publishedAt: "2023-06-02T14:45:00Z",
    author: "John Doe",
  },
  {
    id: "3",
    slug: "vienna-coffee-scene",
    title: "Vienna Coffee Scene",
    subtitle: "Classic meets contemporary",
    excerpt: "Vienna's coffee scene. Mixing classic & innovative coffee making.",
    content: `
      <h2>Five Reasons Why You Should Visit Our Vienna Coffee Shop</h2>
      <p>Vienna's historic coffee house tradition provides the foundation for our botanical innovation.</p>
      <p>Our Vienna location pays homage to the city's coffee history while introducing modern brewing methods.</p>
      <p>We serve traditional Viennese pastries alongside our specialty coffee, creating perfect pairings.</p>
      <p>The shop's interior features a blend of classic Viennese design elements and contemporary botanical accents.</p>
      <p>Our seasonal menu incorporates local ingredients and reflects Vienna's changing seasons.</p>
    `,
    coverImage: "/images/location-cards.png",
    heroImage: "/images/machu-picchu.png",
    category: "Locations",
    tags: ["vienna", "coffee", "scene"],
    status: "published",
    publishedAt: "2023-06-10T09:15:00Z",
    author: "Emma Johnson",
  },
]

// Get all published blog posts
export async function getPublishedPosts() {
  return blogPosts.filter((post) => post.status === "published")
}

// Get all blog posts (for admin)
export async function getAllPosts() {
  return blogPosts
}

// Get blog post by slug
export async function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

// Get related posts
export async function getRelatedPosts(currentSlug: string, limit = 2) {
  return blogPosts.filter((post) => post.status === "published" && post.slug !== currentSlug).slice(0, limit)
}

// Create new blog post
export async function createPost(postData: any) {
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    publishedAt: postData.status === "published" ? new Date().toISOString() : null,
  }

  blogPosts.push(newPost)
  return newPost
}

// Update blog post
export async function updatePost(id: string, postData: any) {
  const index = blogPosts.findIndex((post) => post.id === id)

  if (index === -1) {
    throw new Error("Post not found")
  }

  // Update publishedAt if status changed to published
  if (postData.status === "published" && blogPosts[index].status !== "published") {
    postData.publishedAt = new Date().toISOString()
  }

  blogPosts[index] = {
    ...blogPosts[index],
    ...postData,
  }

  return blogPosts[index]
}

// Delete blog post
export async function deletePost(id: string) {
  const index = blogPosts.findIndex((post) => post.id === id)

  if (index === -1) {
    throw new Error("Post not found")
  }

  blogPosts.splice(index, 1)
  return { success: true }
}

