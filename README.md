## Live Demo

You can view the live version of the site here: </br>
Firebase: https://trusted-gamer-gg.web.app/ </br>
Surge: https://trusted-gamer-gg.surge.sh/ </br>
Netlify: https://trusted-gamer-gg.netlify.app/ 

# Trusted Gamer GG: A Game Review Application

Trusted Gamer GG is a user-friendly platform designed to allow users to explore, review, and share their experiences with video games. The goal of this project is to provide a seamless and interactive experience for gamers, where they can easily find detailed reviews, add their own reviews, and manage their watchlist of upcoming games. The application is responsive, visually appealing, and provides a chill environment for game lovers to connect and share opinions.

## Table of Contents

1. [Live Demo](#live-demo)
2. [Trusted Gamer GG: A Game Review Application](#trusted-gamer-gg-a-game-review-application)
3. [Screenshots](#screenshots)
4. [Features](#features)
5. [Authentication](#authentication)
6. [Application Structure](#application-structure)
   - [Frontend](#frontend)
   - [Backend](#backend)
7. [Technologies Used](#technologies-used)
8. [🛠️ Dependencies](#%EF%B8%8F-dependencies)
9. [🚀 How to Run Locally](#-how-to-run-locally)
10. [🔧 Additional Notes](#-additional-notes)
11. [The server API address](#the-server-api-address)
12. [Conclusion](#conclusion)



### Screenshots

#### Home Page
![Home Page](https://i.ibb.co.com/tYhFh39/trusted-gamer-gg-surge-sh-home.png)

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

- **Frontend**: 
  - ![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
  - ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
  - ![React Router](https://img.shields.io/badge/React_Router-%230D4A70.svg?style=flat&logo=react-router&logoColor=white)
  - ![Lottie React](https://img.shields.io/badge/Lottie%20React-%231F1F1F.svg?style=flat&logo=lottie&logoColor=white)
  - ![React Simple Typewriter](https://img.shields.io/badge/React_Simple%20Typewriter-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
  - ![React Tooltip](https://img.shields.io/badge/React_Tooltip-%231F1F1F.svg?style=flat&logo=react&logoColor=white)

- **Backend**:
  - ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=flat&logo=node.js&logoColor=white)
  - ![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat&logo=express&logoColor=white)
  - ![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=flat&logo=mongodb&logoColor=white)
  - ![Firebase](https://img.shields.io/badge/Firebase-%23FFCA28.svg?style=flat&logo=firebase&logoColor=white)

- **Hosting**:
  - ![Netlify](https://img.shields.io/badge/Netlify-%23000000.svg?style=flat&logo=netlify&logoColor=white)
  - ![Surge](https://img.shields.io/badge/Surge-%23F5A623.svg?style=flat&logo=surge&logoColor=white)
  - ![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white)

- **Authentication**:
  - ![Firebase Authentication](https://img.shields.io/badge/Firebase_Authentication-%23FFCA28.svg?style=flat&logo=firebase&logoColor=white)
  - ![Google Login](https://img.shields.io/badge/Google%20Login-%234285F4.svg?style=flat&logo=google&logoColor=white)


## 🛠️ Dependencies

Below are the key dependencies used in the project:

- **@emotion/react**: ^11.13.5  
- **dotenv**: ^16.4.7  
- **firebase**: ^11.0.2  
- **lottie-react**: ^2.4.0  
- **lottie-web**: ^5.12.2  
- **react**: ^18.3.1  
- **react-awesome-reveal**: ^4.2.14  
- **react-dom**: ^18.3.1  
- **react-helmet**: ^6.1.0  
- **react-icons**: ^5.4.0  
- **react-lottie**: ^1.2.10  
- **react-router-dom**: ^6.28.0  
- **react-simple-typewriter**: ^5.0.1  
- **react-slick**: ^0.30.2  
- **react-toastify**: ^10.0.6  
- **react-tooltip**: ^5.28.0  
- **react-typewriter-effect**: ^1.1.0  
- **slick-carousel**: ^1.8.1  
- **sweetalert2**: ^11.6.13  


## 🚀 How to Run Locally

### 1. Clone the Repository
```
https://github.com/Raiyan27/Trusted-Gamer-GG.git
```
### 2. Navigate to the Project Directory
```
cd <your-folder-name>
```
### 3. Install dependencies
```
npm install
```
## 4. Set Up Environment Variables
Create a `.env` file in the  directory.
```
VITE_FIREBASE_API_KEY=AIzaSyCTRIgsyfNs9SdFVQx0JPsrm475ooJIhmA
VITE_FIREBASE_AUTH_DOMAIN=trusted-gamer-gg.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=trusted-gamer-gg
VITE_FIREBASE_STORAGE_BUCKET=trusted-gamer-gg.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=696659850349
VITE_FIREBASE_APP_ID=1:696659850349:web:41d0d83685e2c7cce87b64
```
5. Run the Frontend Application
Start the frontend application:
```
npm run dev
```
## 🔧 Additional Notes
Make sure you have Node.js and npm installed on your machine. You can download them from Node.js.
Ensure your MongoDB database is running locally or hosted on a cloud service like MongoDB Atlas.
For Firebase configuration, set up a Firebase project and obtain the necessary credentials from the Firebase Console.

## The server API address:
```
https://trusted-gamer-gg-server.vercel.app/
```

Now you are all set to explore the Gari Chai Car Rental System locally! 🚗

## Conclusion

Trusted Gamer GG provides a fun, interactive platform for gamers to share their experiences and discover new games. With features like sorting, filtering, watchlists, and personalized review management, the app is designed to offer a smooth and user-friendly experience for all types of gamers.

---

### Additional Sections:

- **How to Contribute**: If you want to contribute, contact me at abdullahalraiyan4@gmal.com.
