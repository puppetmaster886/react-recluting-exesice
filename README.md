//// filepath: /c:/dev/react-recluting-exesice/README.md

# Users & Posts Dashboard App

This project is a Next.js application built with TypeScript, Material UI, and MobX. It fetches data from the JSONPlaceholder API to display a list of users and their associated posts. The application demonstrates modern UI design, modular code structure, performance optimizations, and clean source code.

## Features

- **Users List:** Displays users using a data grid (with sorting and filtering) powered by Material UI.
- **User Detail:** Shows detailed information about a selected user along with their posts.
- **Global State Management:** Uses MobX to cache and share state between components, preventing redundant API calls.
- **Modern UI:** Built with Material UI for a responsive and clean design.
- **Compiled Application:** The application compiles properly (using Next.js build), generating production-ready code in the `.next` directory.
- **Compilable Source Code:** All source code is written in TypeScript and is fully compilable.

## Prerequisites

- Node.js (v14 LTS or higher)
- npm (v6 or higher)

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies:

```bash
npm install
```

## Execution Instructions

### Development Mode

To run the application in development mode (with hot reloading):

```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000 to view the app.

### Production Mode

1. Build the Application:

```bash
npm run build
```

2. Start the Production Server:

```bash
npm start
```

The application will be available at http://localhost:3000 in production mode.

### API Endpoints

The application consumes the following endpoints from JSONPlaceholder:

- GET https://jsonplaceholder.typicode.com/users — Retrieves a list of users.
- GET https://jsonplaceholder.typicode.com/users/:id — Retrieves detailed information for a specific user.
- GET https://jsonplaceholder.typicode.com/users/:id/posts — Retrieves the posts for a specific user.

## License

This project is licensed under the MIT License.
