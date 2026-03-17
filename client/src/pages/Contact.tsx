/**
 * Ouhout Refined - Contact Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Contact form
 * - Multiple contact methods
 * - Business hours
 * - Location information
 * - Social media links
 */

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Facebook, Instagram, Twitter, Linkedin, ChevronRight, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
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
            <a href="/contact" className="text-sm font-medium text-[#c85a3a] transition-colors">
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
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                We'd love to hear from you. Whether you have questions about our furniture, need design advice, or want to visit our showroom, we're here to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#c85a3a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">info@ouhout.co.za</p>
              <p className="text-gray-600 mb-2">orders@ouhout.co.za</p>
              <p className="text-gray-600 text-sm">We respond within 24 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#7a9b7f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+27 21 123 4567</p>
              <p className="text-gray-600 mb-2">+27 83 456 7890</p>
              <p className="text-gray-600 text-sm">Mon-Fri: 9am-5pm</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#9b8b7e] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">123 Craft Street</p>
              <p className="text-gray-600 mb-2">Woodstock, Cape Town</p>
              <p className="text-gray-600 mb-2">South Africa, 7925</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-16">
            <h2 className="text-2xl font-merriweather font-bold text-charcoal mb-6 text-center">Business Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#c85a3a]" />
                  Showroom Hours
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 3:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-[#c85a3a]">Closed</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#7a9b7f]" />
                  Phone Support
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-[#c85a3a]">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-merriweather font-bold text-charcoal mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
                    placeholder="+27 21 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="orders">Order Status</option>
                    <option value="design">Design Consultation</option>
                    <option value="showroom">Showroom Visit</option>
                    <option value="custom">Custom Furniture</option>
                    <option value="warranty">Warranty & Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a] focus:border-[#c85a3a]"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">123 Craft Street, Woodstock, Cape Town</p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="tel:+27211234567"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#7a9b7f] rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">Call Us</p>
                      <p className="text-sm text-gray-600">+27 21 123 4567</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </a>

                  <a
                    href="mailto:info@ouhout.co.za"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#c85a3a] rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">Email Us</p>
                      <p className="text-sm text-gray-600">info@ouhout.co.za</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#9b8b7e] rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">WhatsApp</p>
                      <p className="text-sm text-gray-600">+27 83 456 7890</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1877f2] rounded-full flex items-center justify-center hover:bg-[#166fe5] transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#1da1f2] rounded-full flex items-center justify-center hover:bg-[#1a91da] transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-[#0077b5] rounded-full flex items-center justify-center hover:bg-[#00669c] transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-[#faf8f5] rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-3">Do you offer delivery services?</h3>
              <p className="text-gray-700">
                Yes, we offer delivery throughout South Africa. Delivery is free for orders over R5,000. For smaller orders, delivery fees start from R500 depending on your location.
              </p>
            </div>
            <div className="bg-[#faf8f5] rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-3">Can I customize furniture pieces?</h3>
              <p className="text-gray-700">
                Absolutely! We offer custom furniture services. Contact us with your requirements, and our design team will work with you to create the perfect piece for your space.
              </p>
            </div>
            <div className="bg-[#faf8f5] rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-3">What is your warranty policy?</h3>
              <p className="text-gray-700">
                All our furniture comes with a comprehensive warranty ranging from 2-5 years depending on the product. This covers manufacturing defects and ensures your peace of mind.
              </p>
            </div>
            <div className="bg-[#faf8f5] rounded-2xl p-6">
              <h3 className="font-semibold text-charcoal mb-3">Do you have a physical showroom?</h3>
              <p className="text-gray-700">
                Yes! Our showroom is located at 123 Craft Street in Woodstock, Cape Town. We're open Monday-Friday 9am-5pm and Saturday 9am-3pm. Come see our furniture in person!
              </p>
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
