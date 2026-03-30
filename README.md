# Task Manager

A single-page task manager built with React. Add tasks with priority and optional due dates, mark them complete, edit or delete them, and browse dated tasks on a calendar. Data is stored in your browser with **localStorage** (key: `tasks`).

## Features

- **Tasks** — Title, priority (high / medium / low), optional due date
- **Lists** — Tasks without a due date in the main column; tasks with due dates feed the calendar column
- **Actions** — Complete (checkbox), edit, delete
- **Calendar** — `react-calendar` shows the selected day’s tasks and a summary of all dated tasks
- **Persistence** — Tasks reload after refresh; dates are saved as ISO strings and restored as `Date` objects

## Tech stack

- [React](https://react.dev/) 19
- [Create React App](https://create-react-app.dev/) (`react-scripts`)
- [MUI](https://mui.com/) (Material UI)
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker)
- [react-calendar](https://github.com/wojtekmaj/react-calendar)
- [React Router](https://reactrouter.com/) (app is wrapped in `BrowserRouter` for future routes)

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node)

## Getting started

Clone or download the project, then from the project root:

```bash
npm install
npm start
```

The dev server opens at [http://localhost:3000](http://localhost:3000) by default. If that port is busy, set another port:

```bash
# Windows PowerShell
$env:PORT="5174"; npm start
```

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm start`    | Dev server with hot reload           |
| `npm run build`| Production build in `build/`         |
| `npm test`     | Jest test runner (interactive)       |

## Project layout

```
src/
  App.js          — Main task UI, localStorage sync, layout
  App.css         — App styles
  CalendarPage.js — Calendar and dated-task views
  index.js        — App entry
```

## Learn more

- [Create React App documentation](https://create-react-app.dev/docs/getting-started)
- [React documentation](https://react.dev/)
