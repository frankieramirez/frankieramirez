# Personal Portfolio Website

A modern personal portfolio website built with Astro, featuring a clean design and smooth CSS animations.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **Styling**: Tailwind CSS v4 with custom animations
- **Build Tool**: Vite (built into Astro)
- **Package Manager**: pnpm

## About Me

```js
{
	age: 34,
	married: true,
	role: "software_engineer",
	skills: ["typescript", "react", "nextjs", "tailwindcss"],
	hobbies: ["gaming"]
}
```

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fr-astro
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321`

### Available Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start development server         |
| `pnpm build`   | Build for production             |
| `pnpm preview` | Preview production build locally |

## 📁 Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── assets/      # Project assets
│   ├── components/  # React/Astro components
│   ├── layouts/     # Layout components
│   ├── pages/       # File-based routing
│   ├── styles/      # Global styles
│   └── lib/         # Utility functions
├── astro.config.mjs # Astro configuration
├── tailwind.config.js # Tailwind configuration
└── tsconfig.json    # TypeScript configuration
```

## 🎨 Features

- ⚡ Lightning-fast static site generation with Astro
- 🎭 Smooth CSS animations and transitions
- 📱 Fully responsive design
- 🎯 TypeScript for type safety
- 🎨 Modern UI with Tailwind CSS v4
- 🔍 SEO optimized with sitemap generation
- 📊 Third-party script optimization with Partytown

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
