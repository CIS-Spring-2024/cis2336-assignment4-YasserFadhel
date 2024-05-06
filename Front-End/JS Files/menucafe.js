// First, we establish variables to each element we wish to manipulate.
let list = document.querySelector('.list');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Then, we establish an array of all the menu items. We use a convention that outlines all the data we need to display like ItemID, name, image name, price, and a description.
let products = [
    { id: 1, name: 'Pancake', image:'pancake.png', price: 12, desc: "A 3-stack of buttery pancakes topped with bananas and honey" },
    { id: 2, name: 'Eggs on Toast', image: 'eggtoast.png', price: 8, desc: "A piece of toast topped with hard-boiled eggs, avocados and spinach" },
    { id: 3, name: 'Cheese Board', image: 'charboard.png', price: 24, desc: "A meats and cheese board served with fruits on the side" },
    { id: 4, name: 'Pizza', image: 'pizza.png', price: 20, desc: "A 14-inch pizza topped with chicken and vegetables" },
    { id: 5, name: 'Salad', image: 'salad.png', price: 10, desc: "A mix of fresh vegetables topped with our house sauce" },
    { id: 6, name: 'Raspberry Cake', image: 'raspcake.png', price: 4, desc: "A sweet delicacy made with raspberries and cream" },
];

// Use an object to manage cart items for easier add/remove operations for items
let cartItems = {}; 

// Function to initialize the application
function initApp() {
    // Empty the list of items
    list.innerHTML = ''; 

    // Populate the list with items from the products array
    products.forEach((product) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
       
        // Create HTML elements for each item
        newDiv.innerHTML = `
            <img src="../images/${product.image}">                              
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}$</div>
            <div class="desc">${product.desc.toLocaleString()}</div>`
        // Append the item to the list
        list.appendChild(newDiv);
    });

    // Dynamically update titles and subtitles in the carousel using the infromation from the products array above.
    const carouselSlides = document.querySelectorAll('.carousel .slide');
    carouselSlides.forEach((slide, i) => {
        const currentItem = products[i % products.length]; // Loop through products if there are fewer slides than products
        const titleElement = slide.querySelector('.name');
        const subtitleElement = slide.querySelector('.subtitle');
        titleElement.textContent = currentItem.name;
        subtitleElement.textContent = currentItem.desc;
    });
}

initApp(); // Initialize the application to load products


// Carousel functionality
const slides = document.querySelectorAll('.carousel .slide');
let index = 0;
let timer; // Variable to store the timer ID

function prevSlide() {
    slides[index].classList.remove('active');
    index--;

    if(index < 0)
        index = slides.length - 1;

    slides[index].classList.add('active');      
}

// The cycling from previous to next slide on click
document.querySelector('.carousel .prev').addEventListener('click', e => {
    prevSlide();
});

function nextSlide() {
    slides[index].classList.remove('active');
    index++;

    if(index > slides.length - 1)
        index = 0;

    slides[index].classList.add('active');      
}

document.querySelector('.carousel .next').addEventListener('click', e => {
    nextSlide();
});

// Function to start the carousel auto cycle
function startCarousel() {
    timer = setInterval(nextSlide, 5000); // Cycle every 3 seconds
}

// Start the carousel when the page loads
startCarousel();

// Function to stop the carousel auto cycle
function stopCarousel() {
    clearInterval(timer);
}

// Restart the carousel when the page regains focus
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        startCarousel();
    } else {
        stopCarousel();
    }
});
