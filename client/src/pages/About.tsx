/**
 * Ouhout Refined - About Page
 * Design Philosophy: Warm Modernism with Craft Heritage
 * 
 * Features:
 * - Company story and values
 * - Craftsmanship showcase
 * - Sustainability commitment
 * - Team information
 * - Contact details
 */

import { useState } from "react";
import { Heart, Truck, Shield, RotateCcw, Mail, Phone, MapPin, ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function About() {
  const [activeTab, setActiveTab] = useState("story");
  const { getTotalItems } = useCart();
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
            <a href="/collections" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Shop
            </a>
            <a href="/collections" className="text-sm font-medium text-charcoal hover:text-[#c85a3a] transition-colors">
              Collections
            </a>
            <a href="/about" className="text-sm font-medium text-[#c85a3a] transition-colors">
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
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                Where passion for craftsmanship meets the art of furniture making. Discover the story behind Ouhout's commitment to quality and timeless design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-8 overflow-x-auto py-4">
            {[
              { id: "story", label: "Our Story" },
              { id: "craftsmanship", label: "Craftsmanship" },
              { id: "sustainability", label: "Sustainability" },
              { id: "values", label: "Our Values" },
              { id: "team", label: "Our Team" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-[#c85a3a] text-[#c85a3a] font-semibold"
                    : "border-transparent text-gray-600 hover:text-charcoal"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto">
          
          {/* Our Story Tab */}
          {activeTab === "story" && (
            <div className="space-y-12">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">The Ouhout Journey</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Ouhout was born from a simple belief: that furniture should be more than just functional—it should be a celebration of craftsmanship, a testament to quality, and a source of joy in everyday life.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our journey began in the heart of South Africa, where we witnessed the incredible skill of local artisans who had been perfecting their craft for generations. We saw an opportunity to bridge traditional techniques with contemporary design, creating pieces that honor the past while embracing the future.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Today, Ouhout stands as a beacon of quality in the furniture industry. Each piece we create tells a story—of the hands that crafted it, the materials that gave it form, and the home it will eventually grace.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#c85a3a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">15+</span>
                  </div>
                  <h3 className="font-semibold text-charcoal mb-2">Years of Excellence</h3>
                  <p className="text-gray-600 text-sm">Dedicated to crafting exceptional furniture</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#7a9b7f] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">5000+</span>
                  </div>
                  <h3 className="font-semibold text-charcoal mb-2">Happy Customers</h3>
                  <p className="text-gray-600 text-sm">Families enjoying our furniture worldwide</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#9b8b7e] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">100+</span>
                  </div>
                  <h3 className="font-semibold text-charcoal mb-2">Artisans</h3>
                  <p className="text-gray-600 text-sm">Skilled craftspeople in our network</p>
                </div>
              </div>
            </div>
          )}

          {/* Craftsmanship Tab */}
          {activeTab === "craftsmanship" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">The Art of Craftsmanship</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  At Ouhout, craftsmanship isn't just a process—it's a philosophy. Every piece of furniture that leaves our workshop carries with it the legacy of generations of skilled artisans.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Traditional Techniques</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#c85a3a] mt-1 flex-shrink-0" />
                      <span>Hand-selected premium materials from sustainable sources</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#c85a3a] mt-1 flex-shrink-0" />
                      <span>Time-honored joinery techniques passed down through generations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#c85a3a] mt-1 flex-shrink-0" />
                      <span>Precision hand-finishing for unparalleled quality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#c85a3a] mt-1 flex-shrink-0" />
                      <span>Quality control at every stage of production</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-4">Modern Innovation</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#7a9b7f] mt-1 flex-shrink-0" />
                      <span>Advanced design technology for precision engineering</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#7a9b7f] mt-1 flex-shrink-0" />
                      <span>Sustainable manufacturing processes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#7a9b7f] mt-1 flex-shrink-0" />
                      <span>Innovative material combinations for durability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-[#7a9b7f] mt-1 flex-shrink-0" />
                      <span>Continuous research and development</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f5f1ed] rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Our Craftsmanship Promise</h3>
                <p className="text-gray-700 leading-relaxed">
                  Every Ouhout piece is backed by our craftsmanship promise: if it doesn't meet our exacting standards, it doesn't leave our workshop. This commitment to excellence ensures that your furniture will be cherished for generations to come.
                </p>
              </div>
            </div>
          )}

          {/* Sustainability Tab */}
          {activeTab === "sustainability" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">Sustainability at Our Core</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We believe that beautiful furniture shouldn't come at the expense of our planet. Sustainability is woven into every aspect of our business, from the materials we choose to the way we operate our workshops.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-[#7a9b7f] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-charcoal mb-3">Sustainable Materials</h3>
                  <p className="text-gray-600 text-sm">
                    We source our wood from certified sustainable forests and use eco-friendly finishes that are safe for your family and the environment.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-[#c85a3a] rounded-lg flex items-center justify-center mb-4">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-charcoal mb-3">Waste Reduction</h3>
                  <p className="text-gray-600 text-sm">
                    Our production processes are designed to minimize waste, with scrap materials recycled or repurposed whenever possible.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-[#9b8b7e] rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-charcoal mb-3">Built to Last</h3>
                  <p className="text-gray-600 text-sm">
                    We create furniture that lasts generations, reducing the need for replacement and minimizing environmental impact.
                  </p>
                </div>
              </div>

              <div className="bg-[#faf8f5] rounded-2xl p-8 border border-[#e8dcc8]">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Our Environmental Commitment</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We're committed to reducing our carbon footprint through:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Carbon-neutral shipping options</li>
                  <li>• Renewable energy in our workshops</li>
                  <li>• Continuous improvement of our environmental practices</li>
                  <li>• Partnerships with environmental organizations</li>
                </ul>
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === "values" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">Our Core Values</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  These principles guide everything we do, from how we design our furniture to how we treat our customers and team members.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#c85a3a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">Q</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Quality First</h3>
                    <p className="text-gray-700">
                      We never compromise on quality. Every piece must meet our exacting standards for craftsmanship, materials, and finish.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#7a9b7f] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">I</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Integrity</h3>
                    <p className="text-gray-700">
                      We operate with transparency and honesty in all our dealings, from sourcing materials to customer relationships.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#9b8b7e] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">P</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">People</h3>
                    <p className="text-gray-700">
                      We value our artisans, customers, and community. We create furniture that brings people together and spaces to life.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-16 h-16 bg-[#c85a3a] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">I</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Innovation</h3>
                    <p className="text-gray-700">
                      We honor tradition while embracing innovation, constantly exploring new ways to improve our craft and serve our customers better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === "team" && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-6">Meet Our Team</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Behind every beautiful piece of furniture is a team of passionate individuals dedicated to excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-charcoal mb-1">Johann Botha</h3>
                  <p className="text-sm text-gray-600 mb-2">Founder & Master Craftsmen</p>
                  <p className="text-gray-700 text-sm">
                    With over 20 years of experience, Johann brings passion and expertise to every creation.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-charcoal mb-1">Sarah Nkosi</h3>
                  <p className="text-sm text-gray-600 mb-2">Head of Design</p>
                  <p className="text-gray-700 text-sm">
                    Sarah's innovative designs blend contemporary aesthetics with traditional craftsmanship.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-charcoal mb-1">Michael du Plessis</h3>
                  <p className="text-sm text-gray-600 mb-2">Operations Manager</p>
                  <p className="text-gray-700 text-sm">
                    Michael ensures that every aspect of our operation runs smoothly and efficiently.
                  </p>
                </div>
              </div>

              <div className="bg-[#f5f1ed] rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-charcoal mb-4">Join Our Team</h3>
                <p className="text-gray-700 mb-6">
                  We're always looking for talented individuals who share our passion for quality and craftsmanship.
                </p>
                <button className="btn-primary">View Open Positions</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-merriweather font-bold text-charcoal mb-4">Get in Touch</h2>
            <p className="text-gray-600">We'd love to hear from you. Reach out to discuss your furniture needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#c85a3a] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Email</h3>
              <p className="text-gray-600">info@ouhout.co.za</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#7a9b7f] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Phone</h3>
              <p className="text-gray-600">+27 21 123 4567</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#9b8b7e] rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Craft Street, Cape Town, South Africa</p>
            </div>
          </div>

          <div className="bg-[#faf8f5] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-charcoal mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a]"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a]"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c85a3a]"
              ></textarea>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
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
