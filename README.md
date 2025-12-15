# Component Playground

A Next.js 15 project with Tailwind CSS 4 for showcasing and testing React components.

## Features

- Next.js 15 with App Router
- Tailwind CSS 4
- Dynamic routes for components
- SCSS support
- Component showcase with manual props

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Components

- **Button** - `/component/Button`
- **Carousel** - `/component/Carousel`
- **Carousel1** - `/component/Carousel1`
- **Slider** - `/component/Slider`

## Project Structure

```
├── app/
│   ├── component/
│   │   └── [name]/
│   │       └── page.jsx    # Dynamic route for components
│   ├── globals.scss        # Global styles with Tailwind CSS 4
│   ├── layout.jsx          # Root layout
│   └── page.jsx            # Home page with component links
├── components/             # Your React components
└── package.json
```

## Adding New Components

1. Add your component to the `components/` folder
2. Import it in `app/component/[name]/page.jsx`
3. Add it to the `componentMap` object
4. Add a case in `ComponentWrapper` to render it with props
5. Add a link to it in `app/page.jsx`
