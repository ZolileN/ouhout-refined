/**
 * Ouhout Refined - Generic Product Detail Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Dynamic product data loading
 * - Image gallery with thumbnail navigation
 * - Material and finish selectors (if applicable)
 * - Size options with pricing (if applicable)
 * - Product specifications
 * - Related products section
 * - Customer reviews section
 * - Add to cart with quantity selector
 */

import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductData {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  description?: string;
  materials?: { id: string; name: string; color: string; price: number }[];
  sizes?: { id: string; dimensions: string; seating: string; priceModifier: number }[];
  specifications?: { label: string; value: string }[];
  features?: string[];
  dimensions?: { label: string; value: string }[];
  care?: string[];
  delivery?: string[];
  warranty?: string;
  leadTime?: string;
  isNew?: boolean;
  isSale?: boolean;
  sku?: string;
  category?: string;
  collection?: string;
}

// Sample product data - in a real app this would come from an API
const productDatabase: Record<string, ProductData> = {
  "1": {
    id: "1",
    name: "Classic Bovine Leather Wingback Chair",
    price: "R 9,500",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/dining-table-lifestyle-aKXkZL5RMknNgd5ejdwJp8.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    ],
    description: "Experience timeless elegance with our Classic Bovine Leather Wingback Chair. Handcrafted with premium bovine leather and featuring traditional wingback design, this chair combines comfort with sophisticated style. Perfect for adding a touch of classic luxury to any room.",
    features: [
      "Handcrafted with premium bovine leather",
      "Traditional wingback design for classic elegance",
      "Ergonomic comfort with deep seating",
      "Solid hardwood frame for durability",
      "Hand-tufted backrest for added comfort",
      "Classic brass nailhead trim"
    ],
    dimensions: [
      { label: "Width", value: "78cm" },
      { label: "Depth", value: "85cm" },
      { label: "Height", value: "110cm" },
      { label: "Seat Height", value: "48cm" },
      { label: "Arm Height", value: "65cm" }
    ],
    materials: [
      { id: "cognac", name: "Cognac Brown", color: "#8b6f47", price: 0 },
      { id: "black", name: "Classic Black", color: "#1a1a1a", price: 0 },
      { id: "tan", name: "Rich Tan", color: "#d4a574", price: 0 },
    ],
    specifications: [
      { label: "Material", value: "Premium Bovine Leather" },
      { label: "Frame", value: "Solid Hardwood" },
      { label: "Foam", value: "High-Density Polyurethane" },
      { label: "Springs", value: "Sinuous No-Sag Springs" },
      { label: "Legs", value: "Turned Wood with Brass Casters" },
      { label: "Warranty", value: "5 Years" },
    ],
    care: [
      "Clean with leather conditioner every 6 months",
      "Avoid direct sunlight to prevent fading",
      "Blot spills immediately with clean cloth",
      "Professional cleaning recommended for tough stains",
      "Keep away from heat sources"
    ],
    delivery: [
      "Free delivery within Cape Town metro",
      "National delivery available (fees apply)",
      "White glove delivery service available",
      "Assembly included for delivery orders",
      "Delivery within 7-10 business days"
    ],
    warranty: "5 Year Manufacturer Warranty",
    leadTime: "7-10 Business Days",
    sku: "CHR-001",
    category: "Chairs",
    collection: "Classic Collection",
    isSale: true,
  },
      "2": {
    id: "2",
    name: "Chesterfield | Leather Sofa",
    price: "From R 24,000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/dining-table-lifestyle-aKXkZL5RMknNgd5ejdwJp8.webp",
    images: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/dining-table-lifestyle-aKXkZL5RMknNgd5ejdwJp8.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp",
    ],
    description: "Luxurious Chesterfield sofa featuring deep button tufting, rolled arms, and premium leather upholstery. A statement piece that brings classic British elegance to any living space.",
    features: [
      "Deep button tufting for classic Chesterfield look",
      "Rolled arms with traditional detailing",
      "Premium top-grain leather upholstery",
      "Kiln-dried hardwood frame construction",
      "High-density foam and feather blend seating",
      "Dark wood stained legs"
    ],
    dimensions: [
      { label: "3-Seater", value: "210cm W x 90cm D x 85cm H" },
      { label: "2-Seater", value: "160cm W x 90cm D x 85cm H" },
      { label: "Seat Height", value: "48cm" },
      { label: "Arm Height", value: "65cm" },
      { label: "Depth", value: "90cm" }
    ],
    materials: [
      { id: "cognac", name: "Cognac Brown", color: "#8b6f47", price: 0 },
      { id: "black", name: "Classic Black", color: "#2a2a2a", price: 1200 },
    ],
    sizes: [
      { id: "3-seater", dimensions: "210cm x 90cm", seating: "3 people", priceModifier: 0 },
      { id: "2-seater", dimensions: "160cm x 90cm", seating: "2 people", priceModifier: -8000 },
    ],
    specifications: [
      { label: "Material", value: "Top-Grain Leather" },
      { label: "Frame", value: "Kiln-Dried Hardwood" },
      { label: "Seat Fill", value: "High-Density Foam + Feather Blend" },
      { label: "Legs", value: "Dark Wood Stained" },
      { label: "Warranty", value: "5 Years" },
    ],
    care: [
      "Regular vacuuming with soft brush attachment",
      "Leather conditioner every 3-4 months",
      "Blot spills immediately with clean cloth",
      "Professional cleaning recommended annually",
      "Avoid direct sunlight and heat sources"
    ],
    delivery: [
      "Free delivery within Cape Town metro",
      "National delivery available (fees apply)",
      "2-person delivery team included",
      "Room of choice delivery",
      "Packaging removal included"
    ],
    warranty: "5 Year Manufacturer Warranty",
    leadTime: "2-3 Weeks",
    sku: "SOF-002",
    category: "Sofas",
    collection: "Chesterfield Collection",
    isSale: true,
  },
  "3": {
    id: "3",
    name: "Naku Leather Sofa | 3 + 2 Seater Combo",
    price: "R 29,950",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    description: "Modern comfort meets contemporary design in our Naku Leather Sofa collection. This 3+2 seater combo offers versatile seating arrangements with clean lines and premium leather upholstery.",
    specifications: [
      { label: "Material", value: "Genuine Leather" },
      { label: "Configuration", value: "3 Seater + 2 Seater" },
      { label: "Style", value: "Modern Contemporary" },
      { label: "Frame", value: "Solid Wood" },
      { label: "Warranty", value: "3 Years" },
    ],
    isSale: true,
  },
  "4": {
    id: "4",
    name: "Namib | Leather Sofa",
    price: "From R 17,000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/room-transformation-knivM4gCeunFysiwBN8ApQ.webp",
    description: "Inspired by African landscapes, the Namib leather sofa combines rustic charm with modern comfort. Featuring clean lines and premium leather that ages beautifully over time, this piece embodies the spirit of contemporary African design with international appeal.",
    features: [
      "Contemporary African-inspired design",
      "Premium top-grain leather upholstery",
      "Sustainable hardwood frame construction",
      "Removable and reversible seat cushions",
      "Deep seating for ultimate comfort",
      "Clean minimalist silhouette",
      "Ages beautifully developing unique patina",
      "Handcrafted by skilled artisans"
    ],
    dimensions: [
      { label: "3-Seater", value: "210cm W x 90cm D x 85cm H" },
      { label: "2-Seater", value: "160cm W x 90cm D x 85cm H" },
      { label: "Seat Height", value: "45cm" },
      { label: "Seat Depth", value: "55cm" },
      { label: "Arm Height", value: "65cm" },
      { label: "Back Height", value: "75cm" }
    ],
    materials: [
      { id: "brown", name: "Rich Brown", color: "#8b6f47", price: 0 },
      { id: "tan", name: "Savannah Tan", color: "#d4a574", price: 0 },
      { id: "black", name: "Midnight Black", color: "#1a1a1a", price: 1200 },
    ],
    specifications: [
      { label: "Material", value: "Premium Top-Grain Leather" },
      { label: "Design", value: "Contemporary African" },
      { label: "Frame", value: "Sustainable Hardwood" },
      { label: "Cushions", value: "Removable & Reversible" },
      { label: "Seat Fill", value: "High-Density Foam" },
      { label: "Legs", value: "Solid Wood with Metal Caps" },
      { label: "Warranty", value: "3 Years" },
      { label: "Origin", value: "Handcrafted in South Africa" }
    ],
    care: [
      "Vacuum regularly with soft brush attachment",
      "Apply leather conditioner every 3 months",
      "Blot spills immediately with clean, dry cloth",
      "Avoid direct sunlight to prevent fading",
      "Rotate cushions monthly for even wear",
      "Professional cleaning recommended annually",
      "Keep away from heat sources and radiators"
    ],
    delivery: [
      "Free delivery within Cape Town metro area",
      "National delivery available (fees apply)",
      "2-person professional delivery team",
      "Room of choice delivery service",
      "Packaging removal and disposal included",
      "Assembly and placement included",
      "Delivery within 2-3 weeks"
    ],
    warranty: "3 Year Manufacturer Warranty",
    leadTime: "2-3 Weeks",
    sku: "SOF-004",
    category: "Sofas",
    collection: "African Contemporary",
    isSale: true,
  },
  "d1": {
    id: "d1",
    name: "Urban Oasis Vase",
    price: "R 280",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    description: "Elegant contemporary vase perfect for modern interiors. Crafted from high-quality ceramic with a unique textured finish that adds visual interest to any space. The Urban Oasis Vase brings a touch of sophistication to your home decor.",
    features: [
      "Handcrafted ceramic construction",
      "Unique textured surface finish",
      "Modern minimalist design",
      "Watertight for fresh flowers",
      "Versatile for various decor styles",
      "Stable weighted base",
      "Easy to clean surface",
      "Perfect for single stems or bouquets"
    ],
    dimensions: [
      { label: "Overall Height", value: "30cm" },
      { label: "Opening Diameter", value: "12cm" },
      { label: "Base Diameter", value: "15cm" },
      { label: "Weight", value: "1.2kg" },
      { label: "Capacity", value: "1.5 liters" }
    ],
    specifications: [
      { label: "Material", value: "High-Quality Ceramic" },
      { label: "Finish", value: "Textured Matte" },
      { label: "Style", value: "Modern Minimalist" },
      { label: "Waterproof", value: "Yes - Interior Glazed" },
      { label: "Origin", value: "Handcrafted in South Africa" },
      { label: "Care Level", value: "Easy" }
    ],
    care: [
      "Hand wash with mild soap and warm water",
      "Avoid abrasive cleaners or scouring pads",
      "Dry with soft cloth to prevent water spots",
      "Not dishwasher safe",
      "Not microwave safe",
      "Avoid extreme temperature changes",
      "Place on stable surface away from edges"
    ],
    delivery: [
      "Secure packaging to prevent breakage",
      "Free delivery on orders over R 500",
      "National delivery available",
      "Delivery within 3-5 business days",
      "Insurance included for shipping"
    ],
    warranty: "6 Month Manufacturer Warranty",
    leadTime: "3-5 Business Days",
    sku: "DEC-001",
    category: "Decor",
    collection: "Urban Contemporary",
  },
  "d2": {
    id: "d2",
    name: "Radiant Plume Decorative Spheres",
    price: "From R 136",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    description: "Set of decorative spheres that bring artistic elegance to any surface. Each sphere features unique plume-like patterns that create visual interest. The Radiant Plume spheres are perfect for adding sophisticated touches to coffee tables, shelves, or mantelpieces.",
    features: [
      "Set of 3 different sizes for visual variety",
      "Unique plume-like surface patterns",
      "Brushed metal finishes for luxury appeal",
      "Lightweight resin core for easy handling",
      "Non-scratch bottom felt pads",
      "Versatile styling options",
      "Modern artistic design",
      "Perfect for groupings or standalone display"
    ],
    dimensions: [
      { label: "Large Sphere", value: "16cm diameter" },
      { label: "Medium Sphere", value: "12cm diameter" },
      { label: "Small Sphere", value: "8cm diameter" },
      { label: "Total Weight", value: "800g" },
      { label: "Material Thickness", value: "3mm walls" }
    ],
    specifications: [
      { label: "Material", value: "High-Quality Resin & Metal" },
      { label: "Set Size", value: "3 Pieces" },
      { label: "Finish", value: "Brushed Gold & Silver" },
      { label: "Base", value: "Felt Pads (Non-scratch)" },
      { label: "Style", value: "Contemporary Artistic" },
      { label: "Origin", value: "Handcrafted in South Africa" }
    ],
    care: [
      "Wipe clean with soft, dry cloth",
      "Avoid water or liquid cleaners",
      "Do not use abrasive materials",
      "Keep away from direct sunlight",
      "Handle with care to prevent scratches",
      "Store in original packaging when not in use",
      "Avoid placing on rough surfaces"
    ],
    delivery: [
      "Protective packaging for each sphere",
      "Free delivery on orders over R 500",
      "National delivery available",
      "Delivery within 3-5 business days",
      "Careful handling guaranteed"
    ],
    warranty: "1 Year Manufacturer Warranty",
    leadTime: "3-5 Business Days",
    sku: "DEC-002",
    category: "Decor",
    collection: "Radiant Collection",
  },
  "d3": {
    id: "d3",
    name: "Nature's Blend Vase",
    price: "R 1,323",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    description: "Artisanal vase blending natural textures with contemporary design. Perfect for displaying fresh flowers or as a standalone decorative piece. The Nature's Blend Vase combines ceramic craftsmanship with wooden accents for a unique organic aesthetic.",
    features: [
      "Handcrafted ceramic body with wood accents",
      "Natural texture finish for organic appeal",
      "Watertight interior for fresh flowers",
      "Mixed materials for visual interest",
      "Stable weighted base",
      "Versatile for various decor styles",
      "Artisanal craftsmanship",
      "Perfect for large bouquets or stems"
    ],
    dimensions: [
      { label: "Overall Height", value: "35cm" },
      { label: "Opening Diameter", value: "18cm" },
      { label: "Base Diameter", value: "20cm" },
      { label: "Weight", value: "2.5kg" },
      { label: "Capacity", value: "3 liters" },
      { label: "Wood Accent Height", value: "12cm" }
    ],
    specifications: [
      { label: "Primary Material", value: "High-Quality Ceramic" },
      { label: "Accent Material", value: "Natural Hardwood" },
      { label: "Finish", value: "Matte Ceramic + Natural Wood" },
      { label: "Interior", value: "Glazed Waterproof" },
      { label: "Style", value: "Natural Contemporary" },
      { label: "Origin", value: "Handcrafted in South Africa" }
    ],
    care: [
      "Hand wash ceramic portion with mild soap",
      "Wipe wood accents with dry cloth only",
      "Do not submerge in water",
      "Avoid soaking the wooden elements",
      "Dry thoroughly after cleaning",
      "Apply wood oil to maintain finish",
      "Keep away from extreme humidity"
    ],
    delivery: [
      "Specialized packaging for mixed materials",
      "Free delivery on orders over R 500",
      "National delivery available",
      "Delivery within 5-7 business days",
      "Insurance included for shipping"
    ],
    warranty: "1 Year Manufacturer Warranty",
    leadTime: "5-7 Business Days",
    sku: "DEC-003",
    category: "Decor",
    collection: "Nature Collection",
  },
  "d4": {
    id: "d4",
    name: "Scenic Serenity Wall Art",
    price: "R 579",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/decor-collection-flat-lay-7PjXgudHroSPeHmSRitBwJ.webp",
    description: "Serene landscape artwork that brings tranquility to any room. Printed on high-quality canvas with gallery-wrapped edges for a professional finish. The Scenic Serenity Wall Art captures peaceful natural scenes that create a calming atmosphere in your living space.",
    features: [
      "High-quality canvas print reproduction",
      "Gallery-wrapped edges for professional look",
      "Ready to hang with included hardware",
      "UV-resistant inks for long-lasting color",
      "Serene landscape imagery",
      "Calming color palette",
      "Professional gallery presentation",
      "Perfect for living rooms or bedrooms"
    ],
    dimensions: [
      { label: "Canvas Size", value: "80cm W x 60cm H" },
      { label: "Frame Depth", value: "3.5cm" },
      { label: "Overall Dimensions", value: "80cm x 60cm x 3.5cm" },
      { label: "Weight", value: "1.8kg" },
      { label: "Hanging Hardware", value: "Included" }
    ],
    specifications: [
      { label: "Canvas Material", value: "Archival Quality Canvas" },
      { label: "Frame", value: "Solid Wood Stretcher Bars" },
      { label: "Print Quality", value: "Giclée Print" },
      { label: "Inks", value: "UV-Resistant Archival Inks" },
      { label: "Style", value: "Contemporary Landscape" },
      { label: "Origin", value: "Printed in South Africa" }
    ],
    care: [
      "Dust gently with soft, dry cloth",
      "Avoid direct sunlight to prevent fading",
      "Do not use water or cleaning solutions",
      "Handle by edges to avoid fingerprints",
      "Keep in climate-controlled environment",
      "Professional framing recommended for preservation",
      "Avoid humid areas like bathrooms"
    ],
    delivery: [
      "Protective packaging with corner guards",
      "Free delivery on orders over R 500",
      "National delivery available",
      "Delivery within 5-7 business days",
      "Insurance included for shipping"
    ],
    warranty: "2 Year Print Quality Warranty",
    leadTime: "5-7 Business Days",
    sku: "ART-001",
    category: "Wall Art",
    collection: "Serenity Collection",
    isNew: true,
  },
};

export default function ProductDetailGeneric() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem, getTotalItems } = useCart();

  const productId = params.id;
  const product = productDatabase[productId || ""];

  // Redirect if product not found
  useEffect(() => {
    if (!product && productId) {
      setLocation("/");
    }
  }, [product, productId, setLocation]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <a href="/" className="btn-primary inline-block">
            Return to Shop
          </a>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const cartCount = getTotalItems();

  // Set default selections
  useEffect(() => {
    if (product.materials && product.materials.length > 0 && !selectedMaterial) {
      setSelectedMaterial(product.materials[0].id);
    }
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].id);
    }
  }, [product, selectedMaterial, selectedSize]);

  const handleAddToCart = () => {
    const material = product.materials?.find(m => m.id === selectedMaterial);
    const size = product.sizes?.find(s => s.id === selectedSize);
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      material: material?.name,
      size: size?.dimensions,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
          <a href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <ShoppingCart size={20} className="text-charcoal" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#c85a3a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555041479-8a281de53f46?w=1920&h=400&fit=crop"
          alt="Premium Furniture Collection"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="container max-w-3xl">
            <div className="text-white space-y-4">
              <h1 className="text-4xl md:text-5xl font-merriweather font-bold leading-tight">
                {product?.name || "Product Details"}
              </h1>
              <p className="text-lg text-gray-100 max-w-2xl">
                Discover the craftsmanship and quality that goes into every piece we create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-[#c85a3a] transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/" className="hover:text-[#c85a3a] transition-colors">
              Shop
            </a>
            <span>/</span>
            <span className="text-charcoal font-medium">{product.name}</span>
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
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
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
                  </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                )}

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
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                        idx === currentImageIndex
                          ? "border-[#c85a3a] shadow-lg"
                          : "border-gray-200 hover:border-[#c85a3a]"
                      }`}
                    >
                      <img src={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Title and Rating */}
              <div>
                <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-charcoal mb-2">
                  {product.name}
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
                <p className="text-4xl font-mono font-bold text-[#c85a3a]">{product.price}</p>
                <p className="text-sm text-gray-600">Excl. VAT & Delivery</p>
              </div>

              {/* Material Selector */}
              {product.materials && product.materials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-merriweather font-bold text-lg text-charcoal">Material & Finish</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.materials.map((mat) => (
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
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-merriweather font-bold text-lg text-charcoal">Size & Seating</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.sizes.map((sz) => (
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
                        {sz.priceModifier !== 0 && (
                          <p className="text-xs text-[#c85a3a] font-semibold mt-1">
                            {sz.priceModifier > 0 ? "+" : ""}R {sz.priceModifier.toLocaleString()}
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
              )}

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
                  <p className="text-sm font-medium text-charcoal">Warranty</p>
                  <p className="text-xs text-gray-600">Quality guarantee</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-[#9b8b7e]" size={24} />
                  <p className="text-sm font-medium text-charcoal">Returns</p>
                  <p className="text-xs text-gray-600">30-day policy</p>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="pt-8 border-t border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex gap-8">
                    {[
                      { id: "description", label: "Description" },
                      { id: "features", label: "Features" },
                      { id: "dimensions", label: "Dimensions" },
                      { id: "specifications", label: "Specifications" },
                      { id: "care", label: "Care & Delivery" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 border-b-2 transition-all font-medium ${
                          activeTab === tab.id
                            ? "border-[#c85a3a] text-[#c85a3a]"
                            : "border-transparent text-gray-600 hover:text-charcoal"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="py-8">
                  {/* Description Tab */}
                  {activeTab === "description" && (
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Features Tab */}
                  {activeTab === "features" && product.features && (
                    <div className="space-y-4">
                      <h3 className="font-merriweather font-bold text-xl text-charcoal mb-6">Key Features</h3>
                      <ul className="space-y-3">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-[#7a9b7f] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Dimensions Tab */}
                  {activeTab === "dimensions" && product.dimensions && (
                    <div className="space-y-6">
                      <h3 className="font-merriweather font-bold text-xl text-charcoal mb-6">Product Dimensions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.dimensions.map((dim, idx) => (
                          <div key={idx} className="flex justify-between py-3 border-b border-gray-200">
                            <span className="font-medium text-charcoal">{dim.label}</span>
                            <span className="text-gray-700">{dim.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specifications Tab */}
                  {activeTab === "specifications" && product.specifications && (
                    <div className="space-y-6">
                      <h3 className="font-merriweather font-bold text-xl text-charcoal mb-6">Technical Specifications</h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="font-medium text-charcoal flex-shrink-0">{spec.label}</span>
                            <span className="text-gray-700 text-right ml-4">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Care & Delivery Tab */}
                  {activeTab === "care" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-merriweather font-bold text-xl text-charcoal mb-6">Care Instructions</h3>
                        {product.care && (
                          <ul className="space-y-3">
                            {product.care.map((instruction, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-[#c85a3a] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div>
                        <h3 className="font-merriweather font-bold text-xl text-charcoal mb-6">Delivery Information</h3>
                        {product.delivery && (
                          <ul className="space-y-3">
                            {product.delivery.map((info, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <Truck className="w-5 h-5 text-[#7a9b7f] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{info}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#faf8f5] rounded-lg p-6">
                          <h4 className="font-semibold text-charcoal mb-2">Lead Time</h4>
                          <p className="text-gray-700">{product.leadTime || "2-4 Weeks"}</p>
                        </div>
                        <div className="bg-[#faf8f5] rounded-lg p-6">
                          <h4 className="font-semibold text-charcoal mb-2">Warranty</h4>
                          <p className="text-gray-700">{product.warranty || "2 Year Warranty"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
