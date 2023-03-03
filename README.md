next.js starter for leaflet-react
---------------------------------

An extensible [next.js](https://nextjs.org/) starter for the [leaflet-react](https://react-leaflet.js.org/) map plugin. Template visually enhanced by [tailwind](https://tailwindcss.com/) and [lucide icons](https://lucide.dev/). ✨

Using the power of  [typescript](https://www.typescriptlang.org/) for better scalability.

## 🎇 Features

- 🏇 powered by the mighty next.js 13
- 🗺 leaflet map no-ssr integration
- 🧠 custom context to control and read leaflet instance from outside - thx @Flo301
- 🔗 next.js ready route nav module
- 😏 typescript + strict lint setup

## 📊 Coming up

- custom marker categories
- custom marker icons
- marker cluster
- my location
- modified zoom in / zoom out (replace icons)
- global styling for map ui components

## 🎇 Getting Started

First, fetch repo and depts (Once):
```bash
git clone https://github.com/richard-unterberg/next-leaflet-starter-typescript
# then
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 🤯 How to remove those damn linting rules

You can adjust the settings mainly in ```eslint.json``` and ```tsconfig.json```.

I've been using them a lot on my dayjob so I can't be anymore without them.

### 📝 Don't wanna use typscript at all?

See this nice javascript implementation  - My starter is heavily inspired by this one:
https://github.com/colbyfayock/next-leaflet-starter

Happy coding!! 👽