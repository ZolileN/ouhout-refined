/**
 * Ouhout Refined - Collections Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Product grid display
 * - Filtering by category
 * - Search functionality
 * - Sort options
 * - Product cards with quick actions
 */

import { useState, useMemo } from "react";
import { Heart, ShoppingCart, Search, Filter, ChevronDown, Grid, List } from "lucide-react";
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

// Helper function to generate SVG placeholder
const getPlaceholderImage = (id: string, name: string) => {
  const colors = [
    "#c85a3a", "#7a9b7f", "#9b8b7e", "#2a2a2a", "#d4a574", "#8b6f47"
  ];
  const colorIndex = parseInt(id.replace(/\D/g, '')) % colors.length;
  const color = colors[colorIndex];
  
  // Create SVG as data URL
  const svg = `
    <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="${color}"/>
      <text x="400" y="400" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
        ${name}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Sample product data - same as ProductDetailGeneric
const productDatabase: Record<string, ProductData> = {
  "1": {
    id: "1",
    name: "Classic Bovine Leather Wingback Chair",
    price: "R 9,500",
    image: getPlaceholderImage("1", "Wingback Chair"),
    images: [
      getPlaceholderImage("1", "Wingback Chair"),
      getPlaceholderImage("1", "Wingback Chair"),
      getPlaceholderImage("1", "Wingback Chair"),
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
    image: getPlaceholderImage("2", "Chesterfield Sofa"),
    images: [
      getPlaceholderImage("2", "Chesterfield Sofa"),
      getPlaceholderImage("2", "Chesterfield Sofa"),
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
    image: getPlaceholderImage("3", "Naku Sofa"),
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
    image: getPlaceholderImage("4", "Namib Sofa"),
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
    image: getPlaceholderImage("d1", "Urban Vase"),
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
    image: getPlaceholderImage("d2", "Decorative Spheres"),
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
    image: getPlaceholderImage("d3", "Nature Vase"),
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
    image: getPlaceholderImage("d4", "Wall Art"),
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

function ProductCard({ product }: { product: ProductData }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
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

  const colors = ["#c85a3a", "#7a9b7f", "#9b8b7e", "#2a2a2a", "#d4a574", "#8b6f47"];
  const colorIndex = parseInt(product.id.replace(/\D/g, '')) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div className="card-product group cursor-pointer" onClick={() => window.location.href = `/product/${product.id}`}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {imageError ? (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: bgColor }}
          >
            <div className="text-center text-white p-4">
              <div className="text-2xl font-bold mb-2">{product.name}</div>
              <div className="text-lg">{product.price}</div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
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
          </>
        )}
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

        {/* Category */}
        <p className="text-sm text-gray-600 mb-4">
          {product.category} • {product.collection}
        </p>

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

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { getTotalItems } = useCart();

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    Object.values(productDatabase).forEach(product => {
      if (product.category) cats.add(product.category);
    });
    return Array.from(cats).sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = Object.values(productDatabase);

    // Filter by search term
    if (searchTerm) {
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return parseFloat(a.price.replace(/[^0-9.-]/g, "")) - parseFloat(b.price.replace(/[^0-9.-]/g, ""));
        case "price-high":
          return parseFloat(b.price.replace(/[^0-9.-]/g, "")) - parseFloat(a.price.replace(/[^0-9.-]/g, ""));
        default:
          return 0;
      }
    });

    return products;
  }, [searchTerm, selectedCategory, sortBy]);

  const cartCount = getTotalItems();

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <a href="/" className="text-2xl font-bold">
            <span className="text-[#c85a3a]">OUHOUT</span>
          </a>
          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Shop
            </a>
            <a href="/collections" className="text-sm font-medium text-[#c85a3a] hover:text-[#c85a3a] transition-colors">
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
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663162593944/dFNkTxJC5EpbtymKsewYL3/hero-leather-sofa-gSqvEVHJHhNdb6o7iLQzQW.webp"
          alt="Featured Leather Sofa"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="container max-w-3xl">
            <div className="text-white space-y-6">
              <h1 className="text-5xl md:text-6xl font-merriweather font-bold leading-tight">
                Our Collections
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                Discover our curated collections of premium furniture and decor. Each piece is thoughtfully designed to bring warmth, style, and craftsmanship to your home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-[#c85a3a] text-white" : "border border-gray-300 text-gray-600 hover:border-[#c85a3a]"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list" ? "bg-[#c85a3a] text-white" : "border border-gray-300 text-gray-600 hover:border-[#c85a3a]"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {Object.keys(productDatabase).length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">No products found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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
