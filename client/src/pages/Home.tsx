/**
 * Ouhout Refined - Home Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Key Design Elements:
 * - Merriweather serif for headings (warmth, tradition)
 * - Poppins sans-serif for body (readability, modernity)
 * - Terracotta (#c85a3a) as primary accent
 * - Sage green (#7a9b7f) and warm taupe (#9b8b7e) as secondary accents
 * - Cream (#faf8f5) as primary background
 * - Rounded corners (12px) and soft shadows for approachability
 * - Generous whitespace and asymmetric layouts
 */

import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useLocation } from "wouter";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Classic Bovine Leather Wingback Chair",
    price: "R 9,500",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp",
    colors: ["#8b6f47", "#2a2a2a", "#c85a3a"],
    isSale: true,
  },
  {
    id: "2",
    name: "Chesterfield | Leather Sofa",
    price: "From R 24,000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/dining-table-lifestyle-aKXkZL5RMknNgd5ejdwJp8.webp",
    colors: ["#8b6f47", "#2a2a2a"],
    isSale: true,
  },
  {
    id: "3",
    name: "Naku Leather Sofa | 3 + 2 Seater Combo",
    price: "R 29,950",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    colors: ["#8b6f47", "#2a2a2a"],
    isSale: true,
  },
  {
    id: "4",
    name: "Namib | Leather Sofa",
    price: "From R 17,000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/room-transformation-knivM4gCeunFysiwBN8ApQ.webp",
    colors: ["#8b6f47", "#2a2a2a"],
    isSale: true,
  },
];

const decorProducts: Product[] = [
  {
    id: "d1",
    name: "Urban Oasis Vase",
    price: "R 280",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    colors: ["#e8dcc8", "#8b6f47"],
  },
  {
    id: "d2",
    name: "Radiant Plume Decorative Spheres",
    price: "From R 136",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    colors: ["#d4a574", "#8b6f47"],
  },
  {
    id: "d3",
    name: "Nature's Blend Vase",
    price: "R 1,323",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    colors: ["#e8dcc8", "#7a9b7f"],
  },
  {
    id: "d4",
    name: "Scenic Serenity Wall Art",
    price: "R 579",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    colors: ["#e8dcc8"],
    isNew: true,
  },
];

function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const [, setLocation] = useLocation();

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
    <div className="card-product group cursor-pointer" onClick={() => setLocation(`/product/${product.id}`)}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.isSale && (
            <span className="bg-[#c85a3a] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#7a9b7f] text-white px-3 py-1 rounded-full text-xs font-semibold">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Heart
            size={20}
            className={isWishlisted ? "fill-[#c85a3a] text-[#c85a3a]" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-merriweather font-bold text-lg text-charcoal mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price */}
        <p className="font-mono text-[#c85a3a] font-semibold text-lg mb-3">
          {product.price}
        </p>

        {/* Color Swatches */}
        <div className="flex gap-2 mb-4">
          {product.colors.map((color, idx) => (
            <button
              key={idx}
              className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-[#c85a3a] transition-colors"
              style={{ backgroundColor: color }}
              title={`Color option ${idx + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
          ))}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { getTotalItems } = useCart();
  const [, setLocation] = useLocation();
  const cartCount = getTotalItems();
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-[#c85a3a]">OUHOUT</span>
            </div>
          </div>

          {/* Navigation - Hidden on Mobile */}
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

          {/* Right Icons */}
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

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp"
          alt="Featured Leather Sofa"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
          <div className="container max-w-2xl">
            <div className="text-white space-y-6">
              <h1 className="text-5xl md:text-6xl font-merriweather font-bold leading-tight">
                Timeless Elegance
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-md">
                Discover our curated collection of premium furniture crafted with passion and precision.
              </p>
              <button 
                onClick={() => {
                  // Navigate to collections page
                  window.location.href = '/collections';
                }}
                className="btn-primary inline-flex items-center gap-2"
              >
                Shop Now
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sale Section */}
      <section id="featured-products" className="section-divider bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-charcoal">
              Featured Sale
            </h2>
            <a href="#" className="text-[#c85a3a] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All
              <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Ouhout Section */}
      <section className="section-divider bg-[#f5f1ed]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/room-transformation-knivM4gCeunFysiwBN8ApQ.webp"
                alt="Room Transformation"
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-charcoal">
                Why Choose Ouhout?
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#c85a3a] text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Quality Craftsmanship</h3>
                    <p className="text-gray-600">Our furniture is built to last with premium materials and expert construction.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#7a9b7f] text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Custom Designs</h3>
                    <p className="text-gray-600">Tailor-made pieces designed specifically for your unique space and style.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#9b8b7e] text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">Flexible Payment</h3>
                    <p className="text-gray-600">Laybuy, credit options, and flexible payment plans available.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  // Navigate to collections page
                  window.location.href = '/collections';
                }}
                className="btn-primary"
              >
                Explore Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Decor Essentials Section */}
      <section className="section-divider bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-merriweather font-bold text-charcoal">
              Decor Essentials
            </h2>
            <a href="#" className="text-[#c85a3a] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              View All
              <ChevronRight size={20} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-divider bg-[#9b8b7e] text-white">
        <div className="container max-w-2xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-merriweather font-bold">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-100">
            Subscribe to our newsletter for exclusive offers, new arrivals, and design inspiration.
          </p>
          
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-charcoal border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
            />
            <button className="btn-primary">
              Subscribe
            </button>
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
