"use client"
import Image from "next/image"
import Link from "next/link"

// Define types for our data structure
interface ProductSpec {
  label: string
  value: string
}

interface ProductVariant {
  id: string
  name: string
  image: string
  price: number
  specs: ProductSpec[]
}

interface Product {
  id: string
  name: string
  slug: string
  variants: ProductVariant[]
}

interface VerticalProductListingProps {
  products: Product[]
  showcaseImage: string
}

export default function VerticalProductListing({ products, showcaseImage }: VerticalProductListingProps) {
  // Flatten products and variants for display
  const productItems = products.flatMap((product) =>
    product.variants.map((variant) => ({
      product,
      variant,
    })),
  )

  return (
    <div className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Showcase image */}
        <div className="md:col-span-1">
          <div className="relative h-[500px] w-full">
            <Image src={showcaseImage || "/placeholder.svg"} alt="Product showcase" fill className="object-cover" />
          </div>
        </div>

        {/* Right side - Product listings */}
        <div className="md:col-span-1 space-y-6">
          {productItems.map(({ product, variant }, index) => (
            <div key={`${product.id}-${variant.id}`}>
              <div className="flex">
                <div className="w-1/3">
                  <Link href={`/products/${product.slug}`} className="block bg-white p-2 h-44 flex items-center justify-center transition-transform hover:scale-[1.02]">
                    <Image
                      src={variant.image || "/placeholder.svg"}
                      alt={`${product.name} - ${variant.name}`}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </Link>
                </div>

                <div className="w-2/3 pl-4">
                  <h3 className="text-white font-medium mb-2">THÔNG SỐ KỸ THUẬT ĐÈN:</h3>
                  <div className="text-white">
                    {variant.specs.map((spec, i) => (
                      <p key={i} className="mb-1">
                        - {spec.label}: {spec.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <Link href={`/products/${product.slug}`} className="text-white font-medium hover:text-red-400 transition-colors">
                  {variant.name}
                </Link>
                <p className="text-white font-medium">
                  GIÁ BÁN: {new Intl.NumberFormat("vi-VN").format(variant.price)} VNĐ
                </p>
              </div>
              {index < productItems.length - 1 && (
                <div className="border-t border-dashed border-white opacity-30 w-full mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
