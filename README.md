# myFlix-client

This is the client-side application for the myFlix movie API, written in React and utilizing the Parcel build tool.  The application allows users to login or create an account in order to view a collection of movies, view detailed information, and manage their profile information, including saving favorite movies.

## Tech Stack
- React
- React Router
- Bootstrap
- Parcel
- JWT for authentication

## Technical Specs

- Single-Page App: myFlix is a single-page application (SPA) built with React.
- Routing: Uses React Router for in-app navigation and URL sharing.
- Responsive Design: Built with Bootstrap for a mobile-friendly experience.
- React Framework: Built with Create React App for a standardized and stable development environment.

## Getting Started

**Clone the Repository**

```bash
git clone https://github.com/yourusername/myFlix-client.git
cd myFlix-client
```

**Install Dependencies**

```bash
npm install
```

**Start the App**

```bash
npm start
```

## Features

1. **Main View**

   - View all movies with their images, titles, and summaries
   - Select a movie to see more details
   - Responsive navigation bar with movies, profile and logout button
   - Single Movie View

2. **Single Movie View**

   - See details on a selected movie (e.g., genre, director, and description)
   - Add or remove the movie from your favorites

3. **Login & Signup**

   - Log in with your username and password
   - Register a new account with your username, password, email, and birthdate

4. **Profile View**
   - View your profile details
   - DELETE ACCOUNT button
   - Update user info form
   - Favorite movies list