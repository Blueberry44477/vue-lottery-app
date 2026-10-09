# Vue Lottery App

A Vue 3 application built for **Web Systems Laboratory Work №4**. The application allows you to register participants, manage a participant list (CRUD), and randomly select lottery winners.

## Screenshot
<img src="/app-screenshot.png" width="750" alt="App Screenshot">

## Features

- **Participant Registration**: Form validation ensuring required fields, valid email format, unique email check, phone number in `+380XXXXXXXXX` format, and no future dates of birth.
- **Random Winner Selection**: 
  - Select up to 3 winners randomly from the pool of registered participants.
  - Winners are unique (a participant cannot win twice).
  - Easily remove winners to pick again.
- **Participants Management (CRUD)**: 
  - View all participants in a responsive table.
  - **Edit** or **Delete** participants (with modal confirmations).
  - **Sort** participants by Name (A-Z) or Date of Birth.
  - **Filter/Search** participants by name (includes a 300ms debounce).
- **Data Persistence**: All participant data is automatically saved to and restored from `localStorage`.
- **Keyboard Accessibility**: Supports `Enter` for form submissions and `Esc` for closing modals.

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Tooling**: [Vite](https://vitejs.dev/)

## Project Setup

Make sure you have Node.js installed.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Type-checks and bundles the application for production.
- `npm run type-check`: Runs TypeScript type checking via `vue-tsc`.
- `npm run lint`: Lints the codebase using ESLint and Oxlint.
- `npm run format`: Formats the code using Prettier.
