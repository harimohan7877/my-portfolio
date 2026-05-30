# Harimohan Sharma — AI-Powered Portfolio Website

A complete, high-performance, and responsive portfolio website built for **Harimohan Sharma**, featuring a state-of-the-art developer showcase and an interactive, client-side **Admin Panel** that allows deep editing of all sections.

## Tech Stack
*   **Framework:** Next.js 14 (App Router, Type-safe TypeScript)
*   **Styling:** Tailwind CSS (customized premium color variables)
*   **Animations:** Framer Motion (smooth scroll, transitions, floating backdrop blobs, rotating hero titles, and custom cursor lag)
*   **Icons:** Lucide React + Custom Brand SVG Icons (optimized for v0.400+)
*   **Form Handling:** Formspree.io Integration

---

## Key Features
1.  **Stunning Glassmorphism Design:** Curated dark theme color palette, glowing cards, and interactive hover effects.
2.  **Custom Page Cursor:** Responsive 24px glowing follower dot (desktop only) that moves with a slight spring-based lag.
3.  **Active Badge Indicator:** Custom pulsing green dot representing client availability.
4.  **Filterable Projects:** Dynamic filtering (All, Websites, Content, Automation) with layout transition animations.
5.  **Centralized Data Structure (`lib/data.ts`):** Easy editing in code.
6.  **Interactive Admin Panel (`/admin`):**
    *   Full dashboard with counts and stats.
    *   Separate specialized forms to edit **Hero**, **About**, **Services**, **Projects**, **Skills**, **Showcase Presence**, **Testimonials**, **Contact Methods**, and **Global Settings**.
    *   Local Storage Persistence: All customizations are saved instantly to the browser and persist across page loads.
    *   **Export/Import (Backup):** Ability to export the modified data as a single JSON file or import a previously exported configuration.
    *   **Reset to Defaults:** Instantly wipe custom data and restore default values with a single click.

---

## Directory Structure
```
app/
├── layout.tsx         # Font imports + metadata + context provider
├── page.tsx           # Main landing page
├── globals.css        # Custom design system styles & animations
└── admin/             # Admin panel folder
    ├── page.tsx       # Admin dashboard
    ├── layout.tsx     # Admin panel layouts with sidebar
    ├── about/         # About page editor
    ├── hero/          # Hero section editor
    ├── projects/      # Projects CRUD manager
    ├── services/      # Services CRUD manager
    ├── skills/        # Skills category editor
    ├── showcase/      # Showcase presence CRUD manager
    ├── testimonials/  # Testimonials CRUD manager
    ├── contact/       # Contact details & Formspree settings
    └── settings/      # General branding & Export/Import tools
components/
├── icons.tsx          # Custom SVG Brand Icons (GitHub, YouTube, Instagram, WhatsApp)
├── Navbar.tsx         # Responsive sticky header
├── Hero.tsx           # Interactive intro section
├── About.tsx          # Story and technical tools
├── Services.tsx       # Offered solutions
├── Projects.tsx       # Live filterable projects grid
├── Skills.tsx         # Classified skill badges
├── Showcase.tsx       # Custom visual links to socials
├── Testimonial.tsx    # Quote card from actual clients
├── Contact.tsx        # Direct contact links + Formspree form
├── Footer.tsx         # Minimalist footer copyright & developer links
└── CustomCursor.tsx   # Floating spring-based follow dot
lib/
├── types.ts           # Shared TypeScript interfaces
├── data.ts            # Centralized default data
└── DataContext.tsx    # React Context and localStorage layer
```

---

## Installation & Local Development

### Prerequisites
*   [Node.js](https://nodejs.org) (v18 or higher recommended)
*   npm (pre-packaged with Node)

### 1. Install Dependencies
In the root directory of the project, run:
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
*   Portfolio Frontpage: [http://localhost:3000](http://localhost:3000)
*   Admin Control Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 3. Build for Production
To build the application and compile it optimized for production:
```bash
npm run build
```

---

## Configuring the Contact Form
1.  Go to [Formspree](https://formspree.io/) and create a free account.
2.  Create a new form and copy the Form ID (the string of characters at the end of the action URL: `https://formspree.io/f/YOUR_FORM_ID`).
3.  Go to the Admin Panel of your website: `/admin/contact`.
4.  Replace the placeholder in the **Formspree.io Action URL** field with your actual Formspree URL and click **Save Contact Details**.
5.  All submissions from the contact form on your portfolio will now go directly to your Formspree dashboard!

---

## Deployment to Vercel
This project is fully ready for deployment on [Vercel](https://vercel.com):

1.  Push your code to a repository on **GitHub** (e.g. at `https://github.com/harimohan7877/my_portfolio`).
2.  Log in to the Vercel Dashboard, click **New Project**, and import your GitHub repository.
3.  Vercel will auto-detect the Next.js setup. Click **Deploy**.
4.  Your professional portfolio is live!
