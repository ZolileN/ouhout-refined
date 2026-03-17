# Ouhout Refined: Design & Architecture Specification

## Design Philosophy: Warm Modernism with Craft Heritage

This refined Ouhout website demonstrates professional e-commerce design by combining structured, organized layouts with warm, inviting aesthetics that celebrate craftsmanship and quality.

---

## Color Palette

| Color | Hex Code | Usage | Emotional Intent |
|-------|----------|-------|------------------|
| Terracotta | #c85a3a | Primary accent, CTAs, highlights | Warmth, earthiness, craftsmanship |
| Sage Green | #7a9b7f | Secondary accent, accents | Balance, nature, sophistication |
| Warm Taupe | #9b8b7e | Tertiary accent, subtle backgrounds | Neutrality, warmth, refinement |
| Cream | #faf8f5 | Primary background | Cleanliness, natural materials, light |
| Charcoal | #2a2a2a | Text, dark accents | Contrast, readability, sophistication |
| White | #ffffff | Cards, overlays, text on dark | Clarity, simplicity |

---

## Typography System

**Display Font:** Merriweather (serif, bold)
- Used for: Main headings (H1), section titles, hero text
- Sizes: 44px (H1), 28px (H2), 20px (H3)
- Warmth and traditional feel, evokes handcrafted quality

**Body Font:** Poppins (sans-serif, 400-500)
- Used for: Product descriptions, UI text, navigation
- Sizes: 16px (body), 14px (small text)
- Modern readability, friendly approachability

**Accent Font:** Source Code Pro (monospace)
- Used for: Pricing, product specs, technical details
- Sizes: 14px
- Adds visual interest and hierarchy to product information

---

## Layout Structure

### Header
- Sticky navigation bar with Ouhout logo (left), menu items (center), and cart/account icons (right)
- Warm cream background with charcoal text
- Subtle shadow for depth
- Mobile: Hamburger menu collapses navigation

### Hero Section
- Full-width image background (leather sofa lifestyle photo)
- Overlay text positioned left-aligned with generous whitespace
- Warm color palette maintains visibility
- CTA button in terracotta

### Product Grid
- Responsive grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Generous gutters (24px) for breathing room
- Product cards with rounded corners (12px), soft shadows
- Hover states reveal additional details (color options, stock status)

### Section Dividers
- Subtle sage green or taupe backgrounds
- Lifestyle photography breaks up product sections
- Editorial content (testimonials, brand story) interspersed with products

### Footer
- Warm taupe background with charcoal text
- Multiple columns: Shop, About, Support, Connect
- Newsletter signup with terracotta CTA
- Social media links with icons

---

## Key Components

### Product Card
- Image area with rounded top corners
- Product name in Merriweather (bold)
- Price in Source Code Pro
- Color swatches displayed below price
- "Add to Cart" button in terracotta on hover
- Subtle scale animation on hover (1.02x)

### CTA Buttons
- Terracotta background (#c85a3a)
- White text
- Rounded corners (8px)
- Hover state: Slightly darker terracotta (#b8502f)
- Transition: 300ms ease-in-out

### Cards & Containers
- Cream or white background
- Soft shadow (0 2px 8px rgba(0,0,0,0.1))
- Rounded corners (12px)
- Generous padding (24px)

---

## Interaction & Animation Guidelines

**Entrance Animations:**
- Fade-in on scroll with 600ms duration
- Ease-out easing for natural feel
- Staggered animations for product grids (each item animates in sequence)

**Hover States:**
- Product cards: Scale 1.02x with shadow enhancement
- Buttons: Color transition (300ms) with cursor change
- Links: Underline animation, color transition

**Micro-interactions:**
- Add to cart: Toast notification with terracotta accent
- Loading states: Subtle pulse animation with warm colors
- Empty states: Friendly messaging with relevant imagery

---

## Responsive Design Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|-----------------|
| Mobile | < 640px | 1 column grid, hamburger menu, stacked sections |
| Tablet | 640px - 1024px | 2 column grid, optimized spacing |
| Desktop | > 1024px | 4 column grid, full navigation, generous spacing |

---

## Page Structure

### Home Page
1. Header with navigation
2. Hero section with featured product
3. "New Arrivals" section (4-column grid)
4. "Why Choose Ouhout?" section with lifestyle image
5. "Featured Collections" section (2-column layout with large images)
6. "Customer Stories" testimonial section
7. "Decor Essentials" section (3-column grid)
8. Newsletter signup section
9. Footer

### Product Category Pages
1. Header with breadcrumb navigation
2. Category title and description
3. Filter sidebar (left) and product grid (right)
4. Pagination or "Load More" button
5. Footer

### Product Detail Page
1. Header with breadcrumb
2. Product image gallery (left) and details (right)
3. Product specifications in Source Code Pro
4. Color/material options
5. "Add to Cart" and "Add to Wishlist" buttons
6. Related products section
7. Footer

---

## Accessibility & Performance

**Accessibility:**
- Semantic HTML structure
- ARIA labels for interactive elements
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation support
- Focus indicators visible and styled

**Performance:**
- Compressed images (WebP format)
- Lazy loading for below-the-fold images
- Optimized font loading (Google Fonts)
- Minimal CSS and JavaScript
- Fast page load times (target: < 3s)

---

## Brand Voice & Messaging

**Tone:** Warm, inviting, knowledgeable, trustworthy

**Key Messages:**
- "Where Quality Meets Tradition" (tagline)
- Emphasis on craftsmanship and durability
- Celebration of natural materials
- Personalized, attentive customer service
- Premium quality at fair prices

---

## Next Steps

1. Build component library (buttons, cards, product cards)
2. Implement home page layout and sections
3. Create product grid and filtering system
4. Build product detail page
5. Implement cart and checkout flow
6. Test responsiveness and accessibility
7. Optimize performance and load times
