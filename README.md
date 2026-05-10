
...# Inmind — React + Tailwind starter

A React (JavaScript) + Tailwind CSS implementation of the **Inmind** onboarding flow,
generated from the Figma file [Lexci-Innovations](https://www.figma.com/proto/xNXqGoTHzBCMYrcKlwqqHm/Lexci-Innovations?node-id=584-416).

The first screen — _"Every Mind Matters."_ (Figma node `584:416`) — is fully implemented.

## Stack

- **React 18** with the JSX runtime (no TypeScript)
- **Vite 5** for dev server / build
- **Tailwind CSS 3** for styling, with custom `ink` (background) and `accent-400` (gold) tokens
- **Poppins** font, loaded from Google Fonts in `index.html`

## Quick start

```bash
cd inmind-app
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project layout

```
inmind-app/
├── index.html              # HTML shell + Poppins web font
├── package.json
├── postcss.config.js
├── tailwind.config.js      # Inmind brand tokens live here
├── vite.config.js
├── jsconfig.json           # path aliases for editors
└── src/
    ├── main.jsx            # ReactDOM root
    ├── App.jsx             # mounts the WelcomeScreen + handles navigation hooks
    ├── index.css           # Tailwind directives + global font
    ├── assets/
    │   └── figmaAssets.js  # remote PNG URLs from the Figma MCP server
    ├── components/
    │   ├── MeditatingCharacter.jsx  # inline SVG fallback illustration
    │   ├── NextButton.jsx           # circular gold CTA
    │   └── PageIndicator.jsx        # 3-dot onboarding indicator
    └── screens/
        └── WelcomeScreen.jsx        # node 584:416
```

## About the assets

`src/assets/figmaAssets.js` references PNGs the Figma MCP server returned. **These
URLs expire after about 7 days.** When that happens, the inline SVG in
`MeditatingCharacter.jsx` automatically takes over — the screen still looks correct
without any code changes.

To make the original artwork permanent:

1. Open the Figma file, select each illustration layer, and use _Export_ to download
   PNGs at 2x or 3x.
2. Drop them into `src/assets/img/`.
3. Replace the URLs in `figmaAssets.js` with imports:

   ```js
   import character from './img/character.png';
   export const figmaAssets = { character /* ... */ };
   ```

## Adding more screens from the prototype

The Figma prototype has additional frames (e.g. `584:589` is the prototype's
starting point, likely a logo splash). To implement another frame:

1. Note its node ID from the Figma URL (`?node-id=…`).
2. Ask Claude (or your IDE's Figma MCP tool) to fetch the design context for that node.
3. Add a new screen file under `src/screens/` and route to it from `App.jsx`.

A simple state-based router is enough for an onboarding flow:

```jsx
const [step, setStep] = useState('welcome');
return step === 'welcome'
  ? <WelcomeScreen onContinue={() => setStep('signin')} />
  : <SignInScreen onBack={() => setStep('welcome')} />;
```

For more screens, swap in `react-router-dom`.

## Design tokens

Pulled directly from Figma node 584:416:

| Token             | Value      | Used for                                 |
|-------------------|------------|------------------------------------------|
| `bg-ink`          | `#1f1f1f`  | screen background                        |
| `bg-accent-400`   | `#f0b31e`  | active page indicator, CTA ring          |
| Headline          | Poppins 600, 23.9px | _"Every Mind Matters."_         |
| Body copy         | Poppins 400, 16.2px / `white/75` | subhead              |
| Skip link         | Poppins 400, 15.9px / `white/90` | top-left action      |

Adjust `tailwind.config.js` if the design tokens evolve.
