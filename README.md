# MaharBote

<p>
  <a href="README.md">
    <img alt="Read in English" src="https://img.shields.io/badge/Read%20in-English-2563eb?style=for-the-badge" />
  </a>
  <a href="README.my.md">
    <img alt="မြန်မာလို ဖတ်ရန်" src="https://img.shields.io/badge/Read%20in-Myanmar-f59e0b?style=for-the-badge" />
  </a>
</p>

<p>
  <a href="https://github.com/MrThantdgaf/MaharBote/actions/workflows/deploy.yml">
    <img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/MrThantdgaf/MaharBote/deploy.yml?branch=main&label=build&logo=githubactions&logoColor=white" />
  </a>
  <a href="https://github.com/MrThantdgaf/MaharBote/actions/workflows/deploy.yml">
    <img alt="Deployment status" src="https://img.shields.io/github/actions/workflow/status/MrThantdgaf/MaharBote/deploy.yml?branch=main&label=deployment&logo=githubpages&logoColor=white" />
  </a>
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-green" />
  </a>
</p>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-Styles-1572B6?logo=css3&logoColor=fff" />
</p>

MaharBote is a React web app for calculating a traditional Burmese Mahabote astrology house from a birth date or a manually entered Myanmar year and birth weekday.

The app converts an English/Gregorian birth date into a Myanmar year, calculates the Mahabote remainder, places the seven weekday tokens into the fixed house layout, and highlights the matching birth house. It also includes bilingual UI text, light/dark themes, and short house readings for cultural, educational, and entertainment use.

## Live Site

[Open MaharBote on GitHub Pages](https://mrthantdgaf.github.io/MaharBote/)

## Features

- Calculate Mahabote results from an English/Gregorian date of birth.
- Enter Myanmar year and birth weekday manually.
- View the fixed Mahabote house grid: Adipati, Atun, Thike, Yaza, Marana, Binga, and Puti.
- See the Myanmar year, weekday, remainder, birth number, placement order, and selected house.
- Switch between Myanmar and English language labels.
- Toggle light and dark themes.
- Open house readings with personality notes, future hints, and light-hearted reflections.

## Tech Stack

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-Styles-1572B6?logo=css3&logoColor=fff" />
</p>

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
  img/                            Website images
```

## Calculation Notes

The calculator derives the Myanmar year from a Gregorian date using Julian day conversion constants in `src/utils/mahaboteCalculator.js`. Mahabote placement is then selected from the Myanmar year remainder modulo 7 and matched against the birth weekday token.

This app is intended for cultural, educational, and entertainment purposes only. Astrology readings should be treated as interpretations, not certainty.

## License

This project is licensed under the terms included in [LICENSE](LICENSE).

