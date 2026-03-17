/**
 * Ouhout Refined - Product Detail Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Image gallery with thumbnail navigation
 * - Material and finish selectors
 * - Size options with pricing
 * - Product specifications
 * - Related products section
 * - Customer reviews section
 * - Add to cart with quantity selector
 */

import { useState } from "react";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface MaterialOption {
  id: string;
  name: string;
  color: string;
  price: number;
}

interface SizeOption {
  id: string;
  dimensions: string;
  seating: string;
  priceModifier: number;
}

const materialOptions: MaterialOption[] = [
  { id: "oak-natural", name: "Natural Oak", color: "#d4a574", price: 0 },
  { id: "oak-dark", name: "Dark Oak", color: "#8b6f47", price: 500 },
  { id: "oak-walnut", name: "Walnut Finish", color: "#5a4a3a", price: 1200 },
];

const sizeOptions: SizeOption[] = [
  { id: "size-small", dimensions: "1.2m x 0.8m", seating: "4 people", priceModifier: 0 },
  { id: "size-medium", dimensions: "1.5m x 0.9m", seating: "6 people", priceModifier: 2500 },
  { id: "size-large", dimensions: "1.8m x 1.0m", seating: "8 people", priceModifier: 5000 },
  { id: "size-xlarge", dimensions: "2.1m x 1.1m", seating: "10 people", priceModifier: 7500 },
];

const galleryImages = [
  {
    main: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-main-iGLePVvxaaf6XusoB3TPpd.webp",
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-main-iGLePVvxaaf6XusoB3TPpd.webp",
    alt: "Solid Oak Dining Table Main View",
  },
  {
    main: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-detail-UcvT9hoooajwqCTZDaGnGQ.webp",
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-detail-UcvT9hoooajwqCTZDaGnGQ.webp",
    alt: "Wood Grain Detail",
  },
  {
    main: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-styled-WkcBGhcybNPntsmKLhdDKo.webp",
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-styled-WkcBGhcybNPntsmKLhdDKo.webp",
    alt: "Styled Dining Setup",
  },
  {
    main: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-room-M5TCAShut9dsgCz9RXUgso.webp",
    thumb: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/oak-table-room-M5TCAShut9dsgCz9RXUgso.webp",
    alt: "Room Setting",
  },
];

function RelatedProductCard({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="card-product group">
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-merriweather font-bold text-lg text-charcoal mb-2">{product.name}</h3>
        <p className="font-mono text-[#c85a3a] font-semibold text-lg mb-4">{product.price}</p>
        <button 
          onClick={handleAddToCart}
          className="btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const relatedProducts = [
  {
    id: "1",
    name: "Leather Dining Chairs",
    price: "From R 4,500",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp",
  },
  {
    id: "2",
    name: "Wooden Sideboard",
    price: "R 8,950",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/dining-table-lifestyle-aKXkZL5RMknNgd5ejdwJp8.webp",
  },
  {
    id: "3",
    name: "Brass Pendant Lamp",
    price: "R 3,200",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
  },
];

export default function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("oak-natural");
  const [selectedSize, setSelectedSize] = useState("size-medium");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, getTotalItems } = useCart();

  const basePrice = 12500;
  const material = materialOptions.find((m) => m.id === selectedMaterial)!;
  const size = sizeOptions.find((s) => s.id === selectedSize)!;
  const totalPrice = basePrice + material.price + size.priceModifier;
  const cartCount = getTotalItems();

  const handleAddToCart = () => {
    addItem({
      id: "oak-dining-table",
      name: "Solid Oak Dining Table",
      price: `R ${totalPrice.toLocaleString()}`,
      image: galleryImages[0].main,
      quantity,
      material: material.name,
      size: size.dimensions,
    });
    toast.success(`Solid Oak Dining Table added to cart!`);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="/" className="text-2xl font-bold">
            <span className="text-[#c85a3a]">OUHOUT</span>
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="/collections" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Shop
            </a>
            <a href="/collections" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Collections
            </a>
            <a href="/about" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              About
            </a>
            <a href="/contact" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart size={20} className="text-charcoal" />
            </button>
            <a href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <ShoppingCart size={20} className="text-charcoal" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c85a3a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#c85a3a] transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/" className="hover:text-[#c85a3a] transition-colors">
              Dining
            </a>
            <span>/</span>
            <span className="text-charcoal font-medium">Solid Oak Dining Table</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square group">
                <img
                  src={galleryImages[currentImageIndex].main}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} className="text-charcoal" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} className="text-charcoal" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-[#c85a3a] shadow-lg"
                        : "border-gray-200 hover:border-[#c85a3a]"
                    }`}
                  >
                    <img src={image.thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Title and Rating */}
              <div>
                <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-charcoal mb-2">
                  Solid Oak Dining Table
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#c85a3a]">
                        ★
                      </span>
                    ))}
                  </div>
                  <span>(24 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Starting from</p>
                <p className="text-4xl font-mono font-bold text-[#c85a3a]">R {totalPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Excl. VAT & Delivery</p>
              </div>

              {/* Material Selector */}
              <div className="space-y-4">
                <h3 className="font-merriweather font-bold text-lg text-charcoal">Material & Finish</h3>
                <div className="grid grid-cols-1 gap-3">
                  {materialOptions.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedMaterial === mat.id
                          ? "border-[#c85a3a] bg-[#faf8f5]"
                          : "border-gray-200 hover:border-[#c85a3a]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: mat.color }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-charcoal">{mat.name}</p>
                          <p className="text-sm text-gray-600">
                            {mat.price > 0 ? `+R ${mat.price.toLocaleString()}` : "Included"}
                          </p>
                        </div>
                        {selectedMaterial === mat.id && (
                          <Check size={20} className="text-[#c85a3a]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <h3 className="font-merriweather font-bold text-lg text-charcoal">Size & Seating</h3>
                <div className="grid grid-cols-2 gap-3">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedSize(sz.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedSize === sz.id
                          ? "border-[#c85a3a] bg-[#faf8f5]"
                          : "border-gray-200 hover:border-[#c85a3a]"
                      }`}
                    >
                      <p className="font-medium text-charcoal text-sm">{sz.dimensions}</p>
                      <p className="text-xs text-gray-600 mt-1">{sz.seating}</p>
                      {sz.priceModifier > 0 && (
                        <p className="text-xs text-[#c85a3a] font-semibold mt-1">
                          +R {sz.priceModifier.toLocaleString()}
                        </p>
                      )}
                      {selectedSize === sz.id && (
                        <div className="mt-2">
                          <Check size={16} className="text-[#c85a3a]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="font-merriweather font-bold text-lg text-charcoal">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-[#c85a3a] transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:border-[#c85a3a] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="px-6 py-3 border-2 border-[#c85a3a] rounded-lg hover:bg-[#c85a3a] hover:text-white transition-all"
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-[#c85a3a]" size={24} />
                  <p className="text-sm font-medium text-charcoal">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders over R 5,000</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-[#7a9b7f]" size={24} />
                  <p className="text-sm font-medium text-charcoal">5-Year Warranty</p>
                  <p className="text-xs text-gray-600">Craftsmanship guarantee</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-[#9b8b7e]" size={24} />
                  <p className="text-sm font-medium text-charcoal">30-Day Returns</p>
                  <p className="text-xs text-gray-600">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-8">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Material</p>
                <p className="text-lg font-medium text-charcoal mt-1">100% Solid Oak Wood</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Finish</p>
                <p className="text-lg font-medium text-charcoal mt-1">Hand-Rubbed Oil or Lacquer</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Construction</p>
                <p className="text-lg font-medium text-charcoal mt-1">Mortise & Tenon Joinery</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Weight Capacity</p>
                <p className="text-lg font-medium text-charcoal mt-1">500 kg (evenly distributed)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Warranty</p>
                <p className="text-lg font-medium text-charcoal mt-1">5 Years Manufacturing Defects</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-mono uppercase tracking-wide">Lead Time</p>
                <p className="text-lg font-medium text-charcoal mt-1">4-6 Weeks (Custom Orders)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 md:py-16 bg-[#f5f1ed]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">About This Piece</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Our Solid Oak Dining Table is a masterpiece of traditional craftsmanship combined with modern design sensibilities. Each table is handcrafted using sustainably sourced solid oak wood, ensuring durability and timeless beauty.
            </p>
            <p>
              The live edge design celebrates the natural character of the wood, with each grain pattern and knot telling a unique story. Our skilled artisans use traditional mortise and tenon joinery techniques to create a table that will last generations.
            </p>
            <p>
              Available in multiple sizes to accommodate your dining space, from intimate 4-person tables to grand 10-person statement pieces. Choose from natural oak, dark oak, or walnut finish to complement your interior design.
            </p>
            <p>
              This is more than furniture—it's an investment in quality, sustainability, and the art of fine woodworking. Perfect for families who value both beauty and durability.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-8">Complete Your Dining Space</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <RelatedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#1a1a1a' }}>OUHOUT</h3>
              <p className="text-gray-400">
                Where quality meets tradition. Premium furniture for your home.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#1a1a1a' }}>Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sofas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dining</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Decor</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#1a1a1a' }}>About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Craftsmanship</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4" style={{ color: '#1a1a1a' }}>Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2026 Ouhout. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
