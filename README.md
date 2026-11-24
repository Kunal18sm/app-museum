# AppMuseum — Web Apps & Websites Showcase

A minimalist, multi-page web gallery designed to showcase your custom web applications, online tools, and projects.

## 🚀 Key Features

- **Light Minimalist Theme**: Pure clean white aesthetic with high contrast and subtle borders. No distracting loud colors or gradients.
- **Square Shape App Icons**: Custom square app icons with a subtle divider line underneath on every card.
- **"Visit" Button (Not Install)**: Direct web access buttons that open the live website in a new tab.
- **Dedicated App Detail Pages (`/app/:id`)**:
  - Full project overview & descriptions
  - Interactive UI screenshot gallery
  - Key features list & tech stack badges
  - Specifications table & launch metadata
  - "More in this category" suggestions
- **Multi-Page Architecture**:
  - `Home (/)`: Live search, category filters, sorting, and responsive app grid.
  - `Categories (/categories)`: Explore tools grouped by domain.
  - `Data Manager (/manage)`: Easily view, add, or export your JSON dataset.
  - `About (/about)`: AppMuseum concept and philosophy.
- **Easy Customization**: 
  - All apps are centrally configured in [`src/data/appsData.js`](file:///c:/Users/yash9/OneDrive/Desktop/AppMuseum/src/data/appsData.js).
  - You can also add websites directly from the browser via the "Add Website" modal.

---

## 📝 Adding Your Websites Later

To add or update your websites, open [`src/data/appsData.js`](file:///c:/Users/yash9/OneDrive/Desktop/AppMuseum/src/data/appsData.js) and add an object following this schema:

```javascript
{
  id: "my-web-tool",
  name: "My Web Tool",
  tagline: "One line summary of what this website does.",
  category: "Productivity", // "AI & Machine Learning", "Developer Tools", "Design & Creative", etc.
  icon: "https://your-icon-url.png",
  url: "https://yourwebsite.com",
  status: "Live", // "Live", "Beta", "Updated"
  featured: true,
  releaseDate: "2025",
  rating: 4.9,
  reviewsCount: 120,
  pricing: "Free",
  shortDescription: "Short summary...",
  fullDescription: "Full details about the website...",
  features: [
    "Feature item 1",
    "Feature item 2"
  ],
  techStack: ["React", "Tailwind CSS", "Node.js"],
  screenshots: [
    "https://screenshot-1.png",
    "https://screenshot-2.png"
  ],
  author: {
    name: "Yash",
    role: "Creator"
  }
}
```

---

## 🛠️ Commands

```bash
# Start development server
npm run dev

# Build production bundle
npm run build

# Preview build
npm run preview
```
