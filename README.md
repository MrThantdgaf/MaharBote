# MaharBote

MaharBote is a React app for calculating a traditional Burmese Mahabote astrology house from a birth date or a manually entered Myanmar year and birth weekday.

The app converts an English/Gregorian birth date into a Myanmar year, calculates the Mahabote remainder, places the seven weekday tokens into the fixed house layout, and highlights the matching birth house. It also includes bilingual UI text and short house readings for a lighter, more playful interpretation.

## Features

- Calculate Mahabote results from an English/Gregorian date of birth.
- Enter Myanmar year and birth weekday manually.
- View the fixed Mahabote house grid: Adipati, Atun, Thike, Yaza, Marana, Binga, and Puti.
- See the Myanmar year, weekday, remainder, birth number, placement order, and selected house.
- Switch between Myanmar and English language labels.
- Toggle light and dark themes.
- Open a house reading with personality, future hint, and just-for-fun notes.

## Tech Stack

- React 19
- Vite
- JavaScript
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  App.jsx                         Main application UI and state
  App.css                         Application styling and themes
  i18n.js                         English and Myanmar text dictionaries
  main.jsx                        React entry point
  utils/
    mahaboteCalculator.js         Myanmar year conversion and Mahabote logic
```

## Calculation Notes

The calculator derives the Myanmar year from a Gregorian date using Julian day conversion constants in `src/utils/mahaboteCalculator.js`. Mahabote placement is then selected from the Myanmar year remainder modulo 7 and matched against the birth weekday token.

This app is intended for cultural, educational, and entertainment use. Astrology readings should be treated as interpretive content rather than factual predictions.

## License

This project is licensed under the terms included in `LICENSE`.
