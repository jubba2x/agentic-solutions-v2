# Agentic Solutions v2 — Full Critique List

**Site:** https://website-v2-eight-silk.vercel.app
**Date:** 2026-03-08
**Score:** 6.5/10

---

## USER CRITIQUES

### 1. Super Laggy on Mobile
- 6 ambient orbs each with `blur(40px)` CSS filter
- 3 canvas elements running simultaneously (starfield 250 stars, network graph 7 nodes, 4 mini charts)
- Up to 9 blur filters active at once (6 orbs + navbar + command center + GEO audit)
- NetworkGraph and MiniCharts render at full quality on mobile with zero reduction
- AmbientOrbs remain active on mobile — battery drain + frame drops

### 2. Color Scheme Too Colorful
- Deep space navy (#030014) is wrong — should be pure **black** (#000/#0a0a0a)
- Purple tertiary (#8B5CF6) adds unwanted color
- Timeline gradient (blue→cyan→green→purple) is too rainbow
- User wants: **black background** with subtle blue/purple/green accents, not a colorful theme

### 3. Logo Should Be 3D Animated
- Current LoadScreen: 2D logo fade+scale with particle burst — generic
- User wants: Three.js 3D rotating logo (R3F + Drei) like previous rebuilds
- Logo is the brand centerpiece — needs to be the hero animation, not a basic fade

### 4. Every Section Loads the Same Way
- ALL 14 sections use identical `whileInView={{ opacity: 1, y: 0 }}` with EASE_SNAPPY
- Zero variation in entrance animations
- Scrolling down = same fade-up repeated 14 times
- Violates AP-002 (fade-up default) — the animation system explicitly forbids this

### 5. Standard "Drop-Off" Website
- No signature visual element
- No scroll-linked interactions beyond hero parallax
- No section transitions
- No clip-path reveals, text effects, or scroll storytelling
- Nothing from the 91-pattern library was used

### 6. Not Like the Award-Winning Websites
- Compared to rebuilds: Lightship (viewport-scale typography bleed), Shopify Renaissance (wireframe grid draw), Sileent (scroll-jacked cross-dissolve), Lando (cursor spotlight)
- This site uses zero advanced techniques from pattern library
- Needs the level of animation intricacy seen in the 81 award-winning sites

---

## AUDIT CRITIQUES

### 7. AP-002 Violation: Fade-Up on Everything
- Every section entrance: `opacity: 0, y: 20-40 → opacity: 1, y: 0`
- All use same easing (EASE_SNAPPY) and similar duration (0.5-0.7s)
- Animation system requires DIFFERENT technique per section type:
  - Hero → stagger reveal
  - Feature cards → scale entrance
  - Testimonials → horizontal slide
  - Process/steps → sequential reveal with line draw
  - Text-heavy → blur reveal
  - Portfolio → clip-path reveal
  - Statistics → count-up
  - CTA → magnetic + pulse

### 8. AP-011 Violation: Cookie-Cutter Design
- Distinctiveness score: 3.4/10 (needs 7+ to deploy)
- Would fail FP-MAB-005 10-point checklist
- Conic-gradient borders = overused (Vercel, v0, dozens of AI sites)
- Ambient orbs = industry standard (Anthropic, Cursor, etc.)
- Typewriter effect = common (ChatGPT, every LLM site)

### 9. No Signature Element
- Award-winning sites have ONE memorable thing:
  - Lightship → viewport-scale typography bleed
  - Shopify Renaissance → wireframe grid SVG draw
  - Sileent → fullscreen scroll-jacked cross-dissolve
  - Lando Norris → cursor spotlight + line-by-line overflow mask
  - Camel Fabric → CSS 3D card flip board
- This site has nothing memorable. Swap the logo and it's any AI consulting page.

### 10. 9 Blur Filters Simultaneously
- AmbientOrbs: 6x `filter: blur(40px)` — MASSIVE GPU cost
- Navbar: `backdrop-filter: blur(20px)` when scrolled
- CommandCenter: `backdrop-filter: blur(20px)` on dashboard
- GEOAudit: `backdrop-filter: blur(20px)` on chat mock
- Total: 9 blur operations = primary cause of mobile lag

### 11. Canvas Not Optimized for Mobile
- StarfieldCanvas: drops to 100 stars on mobile ✓
- NetworkGraph: NO mobile reduction ✗ (7 nodes + 15 connection lines at full quality)
- MiniChart x4: NO mobile reduction ✗ (4 canvas elements at full quality)
- Simultaneous canvas: ~277 draw operations per frame

### 12. No Scroll-Linked Animations
- Only hero has scroll parallax (scale + opacity)
- Timeline stroke animates on scroll (only one)
- No scroll-triggered reveals on any other section
- No section scale-down, color shifting, text highlighting, or storytelling
- No progress indicators per section

### 13. No Hover Micro-Interactions
- Cards: basic border color change on hover
- No magnetic buttons (pattern available)
- No 3D tilt cards (pattern available)
- No shimmer sweep effects
- No expanding underlines
- No top-border expand
- No checkmark pop+shake on feature lists

### 14. No Text Effects
- No text scramble/decode
- No word-by-word highlight (used in Lando v3)
- No blur-to-focus reveal
- No gradient text animation
- No typewriter on headings
- MorphingText in hero is the ONLY text effect on entire page

### 15. No Section Dividers/Transitions
- Sections just stack with `py-24` padding
- No gradient bleeds between sections
- No clip-path wipes
- No parallax overlap
- No scale-down exit on scroll-away
- Page feels like one continuous vertical scroll with no rhythm

### 16. TrustedBy Is Placeholder
- Shows text labels ("Partner One", "Partner Two") not real logos
- Worse than not having the section — signals unfinished site
- Either add real client logos or remove entirely

### 17. Proof Section Metrics Don't Animate
- Case study numbers appear static
- No count-up animation on metric values
- No entrance animation on metric cards
- Feels flat compared to animated hero stats

### 18. ValueStack Is Weakest Section (2.7/10 Distinctiveness)
- Just a list with counters
- No visual interest beyond basic fade-up
- Total value card entrance is just scale 0.95→1
- Bonus section divider doesn't pop
- Needs: staggered reveal with value emphasis, or accordion expansion

### 19. Guarantee Section Is Forgettable (2.3/10)
- Two plain cards with no visual treatment
- Icons have no animation
- No personality or brand expression
- Needs: shield/badge animation, checkmark reveals, or trust-building visuals

### 20. No Video/Media Integration
- User explicitly asked for "more photos / videos"
- Zero media assets on the page
- No dashboard screenshots
- No demo videos
- No team photos
- No process diagrams or before/after visuals
- Page is 13,000+ px of text on black

### 21. AmbientOrbs Are Generic
- Identical aesthetic to Vercel, Anthropic, Cursor, and dozens of AI sites
- 6 orbs with random drift paths = no intentional rhythm
- Not distinctive to Agentic Solutions brand
- Should be replaced with something branded (data flow visualization, neural network, etc.)

### 22. NetworkGraph Accessibility Bug
- Does NOT check `prefers-reduced-motion`
- Keeps animating pulse + node movement even with reduced motion enabled
- Violates accessibility requirements

---

## SECTION-BY-SECTION DISTINCTIVENESS SCORES

| Section | Entrance | Unique Elements | Hover/Interaction | Overall |
|---------|----------|-----------------|-------------------|---------|
| Hero | 5 | 5 (starfield + morphing) | 6 (parallax) | 5.3 |
| Problem | 4 | 4 (card accents) | 5 (glow reveal) | 4.3 |
| Solution | 5 | 5 (network graph) | 0 (none) | 5.0 |
| AIAgents | 4 | 4 (status pulse) | 3 (conic border) | 3.7 |
| CommandCenter | 4 | 5 (mini charts) | 4 (scanline) | 4.3 |
| GEOAudit | 5 | 5 (typewriter) | 5 (results reveal) | 5.0 |
| HowItWorks | 4 | 5 (timeline stroke) | 0 (none) | 4.0 |
| ValueStack | 3 | 3 (counter) | 2 (hover slide) | 2.7 |
| Proof | 3 | 2 (none notable) | 2 (none notable) | 2.3 |
| Pricing | 4 | 3 (conic border) | 4 (hover lift) | 3.7 |
| Guarantee | 3 | 2 (none) | 2 (none) | 2.3 |
| TrustedBy | 2 | 2 (marquee) | 1 (none) | 1.7 |
| **Average** | **3.8** | **3.3** | **3.1** | **3.4** |

**Needs 7.0+ to deploy. Currently at 3.4.**

---

## PRIORITY FIX ORDER FOR v3

| Priority | Fix | Impact |
|----------|-----|--------|
| **P0** | Kill ambient orbs, reduce all blurs, disable canvas on mobile | Fixes lag |
| **P0** | Return to black (#000/#0a0a0a) color scheme | Fixes color |
| **P0** | 3D rotating logo (Three.js R3F + Drei) in LoadScreen | User's core request |
| **P1** | Unique animation per section from pattern library (animation-system.md) | Fixes "same drop-off" |
| **P1** | Add signature element (cursor spotlight, scroll-jacking, wireframe draw, etc.) | Makes it memorable |
| **P1** | Add real media (dashboard screenshots, demo video embed) | Fixes "no visuals" |
| **P1** | Different entrance technique per section type | Fixes AP-002 |
| **P2** | Section transitions (clip-path wipes, parallax overlap, gradient bleeds) | Adds polish |
| **P2** | Hover micro-interactions on all interactive elements | Adds interactivity |
| **P2** | Text effects per section (scramble, highlight, blur reveal) | Adds variety |
| **P2** | Remove or replace TrustedBy placeholder | Removes credibility damage |
| **P2** | Animate Proof section metrics | Adds life to case studies |

---

## PATTERNS TO USE FROM LIBRARY (91 available)

**Signature candidates (pick 1-2):**
- CursorSpotlight — ambient radial gradient follows cursor (Lando v3, works on any dark site)
- WireFrameGridDraw — SVG constellation with pathLength stagger (Shopify Renaissance)
- ViewportScaleTypography — oversized clamp() text with clip-path reveal (Lightship)
- FullscreenScrollScrubber — scroll-jacked scenes with cross-dissolve (Sileent)

**Section-specific patterns to apply:**
- Hero: LineByLineHero (word overflow mask reveal) or 3D hero object
- Features: ExpandFeatureCard (click to expand body text)
- Process: StepTimeline with SVG line draw (animated stroke)
- Stats: StatsCountUp with slot machine digits
- CTA: MagneticPulseButton (cursor-following + boxShadow ring)
- Navigation: ScrollSectionNav (IntersectionObserver dot indicators)

**Effect templates to integrate:**
- TextScramble — for section labels/headings
- MorphingText — already in hero, could extend
- CursorFollower — custom branded cursor
- ScrollStory — scroll-linked narrative sections

---

## TECHNICAL NOTES

- `next.config.mjs` (NOT `.ts`) — TypeScript config unsupported
- lucide-react v0.577+: className prop ONLY, wrap in `<span>` for color
- React 19: use `React.ReactElement` not `JSX.Element`
- ClientApp.tsx wrapper pattern for client-only imports
- Three.js: R3F + Drei for 3D logo (`<Float>`, `<Environment>`, `useFrame`)
- Tailwind v4: `@theme inline` for CSS custom properties
