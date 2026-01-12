# Chess Timer

A minimal, customizable online chess clock built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**.

[Quick Links: [Introduction](#introduction) · [Tech Stack](#tech-stack) · [Prerequisites / Requirements](#prerequisites--requirements) · [Installation](#installation) · [Configuration](#configuration) · [Usage](#usage) · [Project Structure](#project-structure) · [Features](#features) · [Development](#development) · [Contributing](#contributing) · [License](#license) · [FAQ](#faq)]

## Introduction

`Chess Timer` is a web‑based chess clock that lets players set game duration, increment, and choose between horizontal or vertical layouts. It offers several visual themes and runs entirely in the browser, making it easy to start a timed game without installing any software.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16)  
- **Language**: TypeScript  
- **UI Library**: React 19  
- **Styling**: Tailwind CSS 3  
- **Icons**: lucide‑react  
- **Build Tools**: Turbopack (via `next dev`), ESLint, PostCSS  

## Prerequisites / Requirements

- **Node.js** (>= 18)  
- **npm**, **pnpm**, or **yarn**  
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

   *(or `pnpm install` / `yarn install`)*  

4. Run the development server  

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Configuration

The timer does not require additional configuration files. All settings (players, duration, increment, theme, layout) are selected through the web UI before starting a game.

If you need to customize Tailwind or Next.js settings, edit the following files:

- `tailwind.config.js` – Tailwind configuration  
- `next.config.js` – Next.js configuration  

## Usage

1. Open `http://localhost:3000` in a browser.  
2. Enter player names, choose a theme, set the total time and increment, and select a layout (horizontal or vertical).  
3. Click **Start** – the app navigates to the timer page and begins counting down.  
4. Tap a player's clock to switch turns. The timer stops automatically when a player's time reaches zero.

For production deployment, build the app and serve it with a Node.js server:

```bash
npm run build
npm start
```

## Project Structure

```
Chess-Timer/
├─ app/
│  ├─ components/          # Reusable UI components (e.g., CustomDropdown)
│  ├─ layout.tsx           # Root layout with metadata
│  ├─ page.tsx             # Home page (settings UI)
│  └─ timer/
│     ├─ horizontalLayout/
│     │  └─ page.tsx       # Horizontal timer implementation
│     └─ verticalLayout/
│        └─ page.tsx       # Vertical timer implementation
├─ public/
│  ├─ chess-clock.svg      # Favicon
│  └─ og.png               # Open Graph image
├─ styles/
│  └─ globals.css          # Tailwind base and custom styles
├─ tsconfig.json
├─ package.json
└─ README.md
```

## Features

- **Customizable duration** – set any game length in minutes.  
- **Increment support** – add per‑move time.  
- **Two layout options** – horizontal and vertical clocks.  
- **Theme selection** – Classic, Cream, Pastel (extendable).  
- **Responsive design** – works on desktop and mobile browsers.  
- **Zero‑install** – runs entirely in the browser; no backend required.  

## Development

- **Linting**: `npm run lint`  
- **Type checking**: handled by TypeScript during build.  
- **Hot reloading**: enabled by `npm run dev`.  

To contribute a new feature or fix a bug, follow the steps in the *Contributing* section.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.  
2. Create a new branch for your change.  

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes and ensure the project still builds.  
4. Run linting to keep code style consistent.  

   ```bash
   npm run lint
   ```

5. Commit your changes with a clear message and push to your fork.  
6. Open a Pull Request describing the changes.

Please respect the existing code style and include tests if applicable.

## License

This project does not include a license file. If you intend to use or distribute the code, consider adding an appropriate open‑source license (e.g., MIT) to the repository.

## FAQ

**Q: Can I host the app on a static site provider?**  
A: Yes. After building (`npm run build`), the output in the `.next` directory can be served by platforms that support Node.js, such as Vercel or Netlify.

**Q: How do I add a new visual theme?**  
A: Extend the `themes` array in `app/page.tsx` with a new object containing an `id`, `name`, and `colors`. Update the UI to handle the new theme.

**Q: Is the timer accurate for competitive play?**  
A: The timer relies on the browser’s JavaScript timers, which are suitable for casual play but may not meet the strict timing requirements of official tournaments.