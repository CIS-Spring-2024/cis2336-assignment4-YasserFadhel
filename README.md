# Café Order System

This project is a café order system developed using HTML, CSS, JavaScript, and Node.js with Express.

## Features

- **Ordering System**: Users can add items to their cart and calculate the total amount of their order.
- **Confirmation Page**: After placing an order, users are redirected to a confirmation page that displays the total amount and confirms the order.
- **Styling**: The frontend includes styling for a navigation bar, a header, and a deal section.
- **Navigation**: Users can navigate between different pages such as the home page, full menu, daily deal, and contact page using the navigation bar.

## Project Structure

The project is divided into two main folders:

- **Front-End**: Contains HTML files, CSS files, JavaScript files, and images related to the frontend of the application.
- **Back-End**: Contains the server-side JavaScript file (`index.js`) responsible for handling requests, calculating orders, and serving HTML files.

## Setup and Usage

1. Clone the repository to your local machine.
2. Navigate to the `Back-End` folder in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the server.
5. Access the application by visiting `http://localhost:3000` in your web browser.

## File Structure

Café Order System/
│
├── Front-End/
│   ├── HTML Files/
│   │   ├── maincafe.html
│   │   ├── menucafe.html
│   │   ├── dealcafe.html
│   │   ├── contactcafe.html
│   │   ├── ordercafe.html
│   │   └── confirmation.html
│   ├── CSS Files/
│   │   └── styles.css
│   └── images/
│       └── ...
│
└── Back-End/
    ├── index.js
    └── package.json

## Dependencies

- **Express**: Used for handling server-side logic and routing.
- **Body-parser**: Middleware for parsing incoming request bodies.

## Contributors

- Yasser Fadhel
