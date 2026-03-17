/**
 * Ouhout Refined - Shopping Cart Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Cart items display with product details
 * - Quantity adjustment and item removal
 * - Coupon code input with validation
 * - Order summary with pricing breakdown
 * - Checkout preview
 * - Continue shopping and proceed to checkout CTAs
 */

import { useState } from "react";
import { Trash2, Plus, Minus, Gift, Truck, Shield, Lock, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  material: string;
  size: string;
}

interface CouponCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

const validCoupons: CouponCode[] = [
  { code: "WELCOME10", discount: 10, type: "percentage" },
  { code: "SAVE500", discount: 500, type: "fixed" },
  { code: "SPRING20", discount: 20, type: "percentage" },
];

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CouponCode | null>(null);
  const [couponError, setCouponError] = useState("");

  // Convert cart items to the format expected by the component
  const cartItems = items.map(item => ({
    ...item,
    price: parseFloat(item.price.replace(/[^0-9.-]+/g, "")) // Convert price string to number
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 500;
  
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.type === "percentage"
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount;
  }

  const total = subtotal + deliveryFee - discount;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
    toast.success("Quantity updated");
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
    toast.success("Item removed from cart");
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    const coupon = validCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (!coupon) {
      setCouponError("Invalid coupon code. Try WELCOME10, SAVE500, or SPRING20.");
      return;
    }

    setAppliedCoupon(coupon);
    setCouponCode("");
    toast.success("Coupon applied successfully!");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Coupon removed");
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
          <a href="/cart" className="relative flex items-center gap-2 hover:text-[#c85a3a] transition-colors">
            <ShoppingCart size={20} className="text-charcoal" />
            <span className="text-sm font-medium text-charcoal">Cart</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c85a3a] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </a>
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
            <span className="text-charcoal font-medium">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-merriweather font-bold text-charcoal mb-12">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
              <a href="/" className="btn-primary inline-block">
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                      {/* Product Image */}
                      <div className="md:col-span-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full rounded-lg object-cover aspect-square"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="md:col-span-2 space-y-3">
                        <h3 className="font-merriweather font-bold text-lg text-charcoal">
                          {item.name}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Material:</span> {item.material}
                          </p>
                          <p>
                            <span className="font-medium">Size:</span> {item.size}
                          </p>
                        </div>
                        <p className="font-mono text-[#c85a3a] font-bold text-lg">
                          R {item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity and Remove */}
                      <div className="md:col-span-1 space-y-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 w-fit">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-6 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 pt-4 border-t border-gray-200 text-right">
                      <p className="text-sm text-gray-600">Subtotal for this item:</p>
                      <p className="text-xl font-bold text-charcoal">
                        R {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping Button */}
                <a
                  href="/"
                  className="inline-block text-[#c85a3a] font-semibold hover:underline mt-6"
                >
                  ← Continue Shopping
                </a>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-24 space-y-6">
                  <h2 className="font-merriweather font-bold text-2xl text-charcoal">
                    Order Summary
                  </h2>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">R {subtotal.toLocaleString()}</span>
                    </div>

                    {deliveryFee > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span className="font-medium">R {deliveryFee.toLocaleString()}</span>
                      </div>
                    )}

                    {deliveryFee === 0 && (
                      <div className="flex justify-between text-[#7a9b7f] bg-[#f0f5f3] px-3 py-2 rounded-lg">
                        <span className="flex items-center gap-2">
                          <Truck size={16} />
                          Free Delivery
                        </span>
                        <span className="font-medium">R 0</span>
                      </div>
                    )}

                    {appliedCoupon && (
                      <div className="flex justify-between text-[#c85a3a]">
                        <span>
                          {appliedCoupon.type === "percentage"
                            ? `Discount (${appliedCoupon.discount}%)`
                            : "Discount"}
                        </span>
                        <span className="font-medium">
                          -R {discount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-merriweather font-bold text-charcoal">
                        Total
                      </span>
                      <span className="text-3xl font-mono font-bold text-[#c85a3a]">
                        R {total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Excl. VAT</p>
                  </div>

                  {/* Coupon Code Section */}
                  <div className="space-y-3 pt-6 border-t border-gray-200">
                    <h3 className="font-merriweather font-bold text-charcoal">
                      Promo Code
                    </h3>

                    {appliedCoupon ? (
                      <div className="bg-[#f0f5f3] rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gift size={20} className="text-[#7a9b7f]" />
                            <span className="font-mono font-bold text-[#7a9b7f]">
                              {appliedCoupon.code}
                            </span>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Coupon applied successfully!
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => {
                              setCouponCode(e.target.value);
                              setCouponError("");
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c85a3a]"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="px-4 py-2 bg-[#c85a3a] text-white rounded-lg hover:bg-[#b8502f] transition-colors font-medium"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-sm text-red-600">{couponError}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          Try: WELCOME10, SAVE500, or SPRING20
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button className="btn-primary w-full py-4 font-semibold text-lg">
                    Proceed to Checkout
                  </button>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-sm">
                      <Lock size={18} className="text-[#c85a3a]" />
                      <span className="text-gray-600">
                        Secure checkout with SSL encryption
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Shield size={18} className="text-[#7a9b7f]" />
                      <span className="text-gray-600">
                        30-day money-back guarantee
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck size={18} className="text-[#9b8b7e]" />
                      <span className="text-gray-600">
                        Free delivery on orders over R 5,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Checkout Preview Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-8">
            Checkout Preview
          </h2>

          <div className="space-y-6">
            {/* Step 1: Shipping */}
            <div className="border-2 border-[#c85a3a] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#c85a3a] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-merriweather font-bold text-lg text-charcoal">
                  Shipping Address
                </h3>
              </div>
              <p className="text-gray-600 ml-11">
                Enter your delivery address and select your preferred shipping method.
                Free delivery available for orders over R 5,000.
              </p>
            </div>

            {/* Step 2: Payment */}
            <div className="border-2 border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-merriweather font-bold text-lg text-charcoal">
                  Payment Method
                </h3>
              </div>
              <p className="text-gray-600 ml-11">
                Choose from credit card, debit card, bank transfer, or Laybuy installment
                plans. All payments are secured with SSL encryption.
              </p>
            </div>

            {/* Step 3: Review */}
            <div className="border-2 border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-merriweather font-bold text-lg text-charcoal">
                  Review & Confirm
                </h3>
              </div>
              <p className="text-gray-600 ml-11">
                Review your order details, confirm your information, and place your order.
                You'll receive a confirmation email immediately.
              </p>
            </div>

            {/* Step 4: Delivery */}
            <div className="border-2 border-gray-300 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-merriweather font-bold text-lg text-charcoal">
                  Delivery & Support
                </h3>
              </div>
              <p className="text-gray-600 ml-11">
                Track your order in real-time. Our customer support team is available
                24/7 to assist with any questions or concerns.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="font-merriweather font-bold text-2xl text-charcoal mb-6">
              Accepted Payment Methods
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Credit Card",
                "Debit Card",
                "Bank Transfer",
                "Laybuy",
              ].map((method) => (
                <div
                  key={method}
                  className="border-2 border-gray-200 rounded-lg p-4 text-center hover:border-[#c85a3a] transition-colors"
                >
                  <p className="font-medium text-charcoal">{method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-[#f5f1ed]">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Can I modify my order after placing it?",
                a: "Yes, you can modify your order within 24 hours of placing it. Please contact our customer support team immediately.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day money-back guarantee on all purchases. If you're not satisfied, simply contact us for a hassle-free return.",
              },
              {
                q: "How long does delivery take?",
                a: "Standard delivery takes 5-7 business days. Custom orders may take 4-6 weeks depending on the product.",
              },
              {
                q: "Do you offer international shipping?",
                a: "Currently, we ship within South Africa. Contact us for international inquiries.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6">
                <h3 className="font-merriweather font-bold text-charcoal mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
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
