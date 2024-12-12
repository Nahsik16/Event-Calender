# Calendar App

## Overview
This Calendar App allows users to manage their events efficiently. The app is built with modern web technologies like React.js, ensuring a responsive and user-friendly experience.

## [Vercel App Link :  https://event-calender-nahsik16s-projects.vercel.app/](https://event-calender-nahsik16s-projects.vercel.app/)  
## Features
- **Calendar View**:
        - Display a calendar grid for the current month with all days properly aligned.
        - Allow users to switch between months using "Previous" and "Next" buttons.
- **Event Management**:
        - Add events by clicking on a day.
        - Edit or delete events from a selected day.
        - Each event should include:
            - Event name
            - Start time and end time
            - Optional description
- **Event List**:
        - Display a list of all events for the selected day in a modal or side panel.
- **Data Persistence**:
        - Use **localStorage** or a simple in-memory data store to persist events between page refreshes.
- **Complex Logic**:
    - Automatically handle month transitions (e.g., from Jan 31 to Feb 1).
    - Prevent overlapping events (e.g., two events at the same time).
    - Allow filtering of events by keyword.
- **Bonus Feature**:
    - Allow users to export the event list for a specific month as a **JSON** or **CSV** file.


## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
```

### 2. Navigate to the project directory
```bash
cd DateMap
```

### 3. Install dependencies
```bash
npm install
# or
yarn install
```

### 4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173).

## Folder Structure
```
<DateMap folder>/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── utils/       # utils components
│   ├── App.jsx      # Main App component
│   ├── index.css    # Global styles
│   ├── main.jsx     # Entry point for React
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
├── package.json       # Project metadata and dependencies
```

## Available Scripts

### `npm run dev`
Starts the development server.

### `npm run build`
Bundles the app for production.

### `npm run preview`
Locally previews the production build.

## Deployment
The app can be deployed to any static hosting provider, such as:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

To build the app for deployment:
```bash
npm run build
```
The production files will be available in the `dist` folder.

### Deployed App
You can access the deployed app at: [Deployed App Link](<deployed-app-url>)

## License
This project is licensed under the [MIT License](LICENSE).

---
Happy coding! 🎉
