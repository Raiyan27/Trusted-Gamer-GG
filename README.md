## Live Demo

You can view the live version of the site here: [Live Demo Link]

# Trusted Gamer GG: A Game Review Application

Trusted Gamer GG is a user-friendly platform designed to allow users to explore, review, and share their experiences with video games. The goal of this project is to provide a seamless and interactive experience for gamers, where they can easily find detailed reviews, add their own reviews, and manage their watchlist of upcoming games. The application is responsive, visually appealing, and provides a chill environment for game lovers to connect and share opinions.

## Features

- **User Authentication**: Secure login and registration system using email/password and Google login.
- **Game Reviews**: Users can submit reviews for games, including title, rating, description, and other game-specific information.
- **Review Management**: View, edit, and delete your own reviews. Manage your game watchlist.
- **Game Watchlist**: Logged-in users can add games to their watchlist and explore details on each game.
- **Sorting and Filtering**: Ability to sort reviews by rating and year, and filter reviews based on game genres.
- **Responsive Design**: Fully responsive interface for mobile, tablet, and desktop devices.
- **Dark/Light Mode Toggle**: Switch between light and dark themes for enhanced user experience.
- **Smooth Animations**: Integration of Lottie React and React Simple Typewriter for enhanced UI animations.

## Authentication

- **Login/Signup**: Email/password authentication with password strength requirements.

  - Password must include uppercase and lowercase letters and be at least 6 characters long.
  - Google login integration is available.

- **Protected Routes**: Pages like "Add Review", "My Reviews", and "Watchlist" are protected and can only be accessed by logged-in users.

## Application Structure

### Frontend

- **Home Page**: Displays a banner carousel, highest-rated games section, and two extra sections with meaningful content.
- **Review Details Page**: Provides detailed information for each review and allows users to add games to their watchlist.
- **All Reviews Page**: Displays all user-submitted reviews with options to filter and sort based on rating, year, and genre.
- **My Reviews Page**: A private section where users can view, update, or delete their reviews.
- **Game Watchlist Page**: Manage a personal collection of favorite or upcoming games.

### Backend

- **MongoDB Database**: Used to store user data, reviews, and game information.
- **Express.js**: Backend API for handling user authentication, review submission, and CRUD operations.
- **Firebase Authentication**: Simple and effective authentication.

## Technologies Used

- **Frontend**: React, TailwindCSS, React Router, Lottie React, React Simple Typewriter, React Tooltip
- **Backend**: Node.js, Express.js, MongoDB, Firebase Authentication
- **Hosting**: Client-side hosted on Netlify, surge, server-side hosted on Vercel.
- **Authentication**: Firebase authentication (Google login) and custom email/password login.

## Conclusion

Trusted Gamer GG provides a fun, interactive platform for gamers to share their experiences and discover new games. With features like sorting, filtering, watchlists, and personalized review management, the app is designed to offer a smooth and user-friendly experience for all types of gamers.

---

### Additional Sections:

- **How to Contribute**: If you want to contribute, contact me at abdullahalraiyan4@gmal.com.
