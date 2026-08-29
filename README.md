# Craft Compass

Build a beautiful, colourful, and lively mobile-first web prototype called "LostCraft".

Product: LostCraft is a simple digital platform to document and learn disappearing traditional Indian crafts. Focus on one state (Rajasthan) with 4 crafts only. No complex AI, no backend, no login system. Everything works with local data / mock data.

Design Style:

- Colourful, warm, lively and cultural Indian aesthetic

- Primary colours: warm terracotta (#C45C26), deep mustard yellow (#E8A838), soft cream (#FFF8F0), forest green (#2D5A3D), and soft coral accents

- Rounded cards, soft shadows, playful but elegant

- Large touch-friendly buttons

- High contrast text

- Beautiful typography (use a mix of modern + slightly traditional feel)

- Subtle traditional Indian motif patterns as very light background decorations (not overwhelming)

- Smooth hover and tap animations

- Fully responsive (mobile first, looks great on phone)

Screens to create:

1. Welcome / Splash Screen

- Big logo text "LostCraft"

- Tagline: "Document. Learn. Revive."

- Two large colourful buttons: "I am a Learner" and "I am a Curator"

- Warm background with soft cultural pattern

2. Learner Home Screen

- Greeting: "Namaste 👋"

- Four large colourful cards/buttons:

  - Explore Crafts

  - Continue Learning

  - My Progress

  - Help

- Soft colourful background

3. Explore Crafts (Craft List)

- Grid or vertical list of 4 craft cards

- Each card has:

  - Colourful illustration or placeholder image

  - Craft name

  - One-line description

  - Small status badge (e.g. "Endangered")

- Crafts to include:

  1. Rogan Art

  2. Molela Terracotta

  3. Lac Bangles

  4. Blue Pottery

4. Craft Detail Page

- Large hero image area

- Craft name + origin

- Short history paragraph

- Materials section (with colourful chips/tags)

- Big primary button: "Start Learning this Craft"

5. Learn this Craft (Simple Module)

- Progress bar at top

- Step-by-step cards (4 steps)

- Each step has:

  - Step number in a colourful circle

  - Title

  - Short description

  - "Mark as Done" button

- At the end show a cheerful completion message with confetti-like feeling

6. My Progress Page

- Simple list showing which crafts are started / completed

- Colourful progress indicators (circles or bars)

- Encouraging message

7. Simple Curator View

- List of the 4 crafts

- "Add New Craft" button (opens a simple form with name, short description, and image placeholder)

- Keep it clean and colourful

Technical requirements:

- Use React + Tailwind CSS

- All data should be hardcoded in a simple JavaScript array/object (no real backend)

- Use localStorage to save learning progress (Mark as Done should persist)

- Smooth page transitions

- Beautiful empty states and loading feelers if needed

- Make the whole app feel joyful, cultural, and inviting

Important:

- Do not add any AI features, login, or complex logic

- Focus on making it visually delightful and easy to understand

- Make buttons large and friendly

- Use real sample content for the 4 crafts (I will refine text later)

First create the complete structure and beautiful UI for all screens. Make it look premium and lively.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/71109100-04cc-457d-9c05-1c5063f3570b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
