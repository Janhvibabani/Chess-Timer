# Chess Timer

A minimal, customizable online chess clock built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

[Quick Links: [Introduction](#introduction) · [Tech Stack](#tech-stack) · [Prerequisites / Requirements](#prerequisites--requirements) · [Installation](#installation) · [Configuration](#configuration) · [Usage](#usage) · [Project Structure](#project-structure) · [Features](#features) · [Development](#development) · [Contributing](#contributing) · [License](#license) · [FAQ](#faq)]

## Introduction

`Chess Timer` is a web‑based chess clock that lets players set game duration, increment, and choose between horizontal or vertical layouts. It offers several visual themes and runs entirely in the browser, making it easy to start a timed game without installing any software.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 3
- **Icons**: lucide‑react
- **Build Tools**: Turbopack (via `next dev`), ESLint, PostCSS

## Prerequisites / Requirements

- **Node.js** (>= 18)
- **npm** (or `pnpm` / `yarn`)  
- Internet connection for fetching dependencies

## Installation

1. Clone the repository  

   ```bash
   git clone https://github.com/Janhvibabani/Chess-Timer.git
   ```

2. Navigate to the project folder  

   ```bash
   cd Chess-Timer
   ```

3. Install dependencies  

   ```bash
   npm install
   ```

## Configuration

The project uses the default Next.js configuration. If you need to customize Tailwind, edit `tailwind.config.js`. Environment variables are not required for the basic setup.

## Usage

### Development server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser. The UI allows you to:

- Set player names
- Choose a theme (Classic, Cream, Pastel)
- Define game duration and increment
- Select layout (horizontal or vertical)

### Production build

```bash
npm run build
npm start
```

The app will be served on the port defined by `process.env.PORT` (default **3000**).

## Project Structure

```
Chess-Timer/
├─ app/
│  ├─ components/          # Reusable UI components (e.g., CustomDropdown)
│  ├─ layout.tsx           # Root layout with global styles and metadata
│  ├─ page.tsx             # Home page – configuration UI
│  ├─ timer/
│  │  ├─ horizontalLayout/
│  │  │  └─ page.tsx       # Horizontal timer implementation
│  │  └─ verticalLayout/
│  │     └─ page.tsx       # Vertical timer implementation
│  └─ globals.css          # Tailwind base + custom styles
├─ public/
│  ├─ chess-clock.svg      # Favicon
│  └─ sound/
│     └─ beep.mp3          # Timeout sound
├─ next.config.js          # Next.js configuration (default)
├─ package.json
├─ tailwind.config.js
└─ tsconfig.json
```

## Features

- **Customizable themes** – Classic, Cream, Pastel
- **Two layout modes** – Horizontal and vertical
- **Adjustable duration & increment**
- **Responsive design** – works on desktop and mobile browsers
- **Audio cue** on time expiration
- **URL‑based settings** – share a game configuration via query string

## Development

- **Linting**  

  ```bash
  npm run lint
  ```

- **Type checking** (via `tsc`) is handled automatically by Next.js during development and build.

- **Styling** – Tailwind classes are used throughout; modify `globals.css` for global overrides.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes with clear messages.
4. Open a pull request against the `main` branch.
5. Ensure linting passes (`npm run lint`) before submitting.

For major changes, open an issue first to discuss the proposed modification.

## License

No license file is present in this repository. The code is provided **as‑is** without any explicit licensing terms.

## FAQ

**Q: Can I host the app on a custom domain?**  
A: Yes. After building the project, deploy the `out` (or the generated server) folder to any Node‑compatible hosting provider and configure your domain accordingly.

**Q: Does the timer work offline?**  
A: Once the site is loaded, it runs entirely in the browser and does not require an internet connection for the timer functionality.

**Q: How do I add a new theme?**  
A: Add a new entry to the `themes` array in `app/page.tsx` and define corresponding colors in Tailwind or custom CSS.  

---