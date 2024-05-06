// Import the necessary modules
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser'; // Import the body-parser module

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an express app
const app = express();
const port = 3000;

// Middleware to serve static files from the Front-End directory
const frontEndPath = path.join(__dirname, '../Front-End');
app.use(express.static(frontEndPath));

// Middleware to serve static CSS files
const cssPath = path.join(frontEndPath, 'CSS Files');
app.use('/css', express.static(cssPath));

// Middleware to serve static image files
const imagePath = path.join(frontEndPath, 'images');
app.use('/images', express.static(imagePath));

// Middleware to log request method and url
function logger(req, _res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

// Use the logger middleware
app.use(logger);

// Add the body-parser middleware to parse request bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Route to handle adding items to the cart and calculating total amount
app.post('/add-to-cart', (req, res) => {
    // Handle adding items to the cart and calculating total amount
    // For demonstration purposes, let's just return a sample response with total amount
    const items = req.body.items; // Assuming items are sent in the request body
    const totalAmount = calculateTotalAmount(items);
    res.json({ totalAmount: `$${totalAmount.toLocaleString()}` });
});

// Route to handle order confirmation
app.get('/confirm-order', (req, res) => {
    const totalAmount = req.query.totalAmount; // Get total amount from query parameter
    res.sendFile(path.join(frontEndPath, 'HTML Files', 'confirmation.html')); // Adjust the path as per your directory structure
});

// Function to calculate total amount based on items
function calculateTotalAmount(items) {
    let total = 0;
    items.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}

// Route to serve main HTML file (default home page)
app.get('/', (_req, res) => {
    res.sendFile(path.join(frontEndPath, 'HTML Files', 'maincafe.html'));
});

// Catch-all route to serve ordercafe.html
app.get('*', (_req, res) => {
    res.sendFile(path.join(frontEndPath, 'HTML Files', 'ordercafe.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//This took forever to get it to work :(
//To run the server, use node (Back-End/index.js) in the terminal