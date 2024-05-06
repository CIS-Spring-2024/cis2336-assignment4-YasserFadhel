// First, we establish variables to each element we wish to manipulate.
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Then, we create a toggle for the cart system using event listeners (this enables us to have 2 modes, one with the cart open, and one with it closed)
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Then, we establish a list of all the menu items. We use a convention that outlines all the data we need to display like ItemID, name, image name, price, and a description.
let products = [
    { id: 1, name: 'Pancake', image:'pancake.png', price: 12, desc: "A 3-stack of buttery pancakes topped with bananas and honey" },
    { id: 2, name: 'Egg on Toast', image: 'eggtoast.PNG', price: 8, desc: "A piece of toast topped with hard-boiled eggs, avocados and spinach" },
    { id: 3, name: 'Cheese Board', image: 'charboard.PNG', price: 24, desc: "A meats and cheese board served with fruits on the side" },
    { id: 4, name: 'Pizza', image: 'pizza.PNG', price: 20, desc: "A 14-inch pizza topped with chicken and vegetables" },
    { id: 5, name: 'Salad', image: 'salad.PNG', price: 10, desc: "A mix of fresh vegetables topped with our house sauce" },
    { id: 6, name: 'Raspberry Cake', image: 'raspcake.PNG', price: 4, desc: "A sweet delicacy made with raspberries and cream" },
];

// Use an object to manage cart items for easier add/remove operations for items
let cartItems = {}; 

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!cartItems[productId]) {
        cartItems[productId] = {...product, quantity: 1};
        body.classList.add('active');
        reloadCart();
        calculateTotalAmountOnServer();
    } else {
        // Validation check: Increase quantity only if it's less than 10
        if (cartItems[productId].quantity < 10) {
            cartItems[productId].quantity += 1;
            body.classList.add('active');
            reloadCart();
            calculateTotalAmountOnServer();
        } else {
            alert(`The quantity of ${product.name} cannot exceed 10.`);
        }
    }
}

// Function to calculate total amount on the server
function calculateTotalAmountOnServer() {
    fetch('/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: Object.values(cartItems) })
    })
    .then(response => response.json())
    .then(data => {
        // Update total amount displayed on UI
        total.innerText = data.totalAmount;
    })
    .catch(error => console.error('Error:', error));
}

// Function to reload cart
function reloadCart() {
    listCart.innerHTML = '';
    let count = 0;
    Object.values(cartItems).forEach(item => {
        count += item.quantity;
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="../images/${item.image}"/></div>
            <div>${item.name}</div>
            <div>${(item.price * item.quantity).toLocaleString()}$</div>
            <div>
                <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <div class="count">${item.quantity}</div>
                <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>`;
        listCart.appendChild(newDiv);
    });
    quantity.innerText = count;
}

// Function to change quantity
function changeQuantity(productId, newQuantity) {
    const product = products.find(p => p.id === productId);

    // If newQuantity is 0 or less, remove the item and reload the cart
    if (newQuantity <= 0) {
        delete cartItems[productId];
        reloadCart();  // Reload the cart to reflect changes immediately
        calculateTotalAmountOnServer();
        return; // Exit the function early
    } else if (newQuantity > 10) {
        alert(`The quantity of ${product.name} cannot exceed 10.`);
        return; // Exit the function early
    }

    // Update the quantity and reload the cart
    cartItems[productId].quantity = newQuantity;
    reloadCart();
    calculateTotalAmountOnServer();
}

// Add an event listener to the "Checkout" button
// If the checkout button is clicked it asks the user to confirm and then if accepted, it confirms the order and then clears and closes the shopping cart.
// This is temporary as the final project will direct the user to a dedicate page to confirm the order with a confirmation number.
document.querySelector('.total').addEventListener('click', () => {
    const confirmed = window.confirm('Are you sure you want to place this order?');  //Ask user to confirm the order placement
    if (confirmed) {
        // Confirms the order placment if confirmed
        alert('Your order has been placed successfully!');
        // Clear the cart or perform any other necessary actions
        cartItems = {};
        reloadCart();
        calculateTotalAmountOnServer();
        // Redirect to confirmation page with total amount
        const totalAmount = total.innerText;
        window.location.href = `/confirm-order?totalAmount=${totalAmount}`;
        window.location.href = "../HTML Files/confirmation.html";
    }
});


// Function to initialize the application and load products
function initApp() {
    // We empty the list when we initialize the app
    list.innerHTML = ''; 

    // We go through each item in the products list to attain its data and display them in the list we established. This is completely dynamic and all that is needed is to add items to the list.
    products.forEach((product) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        // We add html elements for each item in list to be displayed
        // For images, we establish the parent folder, and we search for each items image within that folder.
        // We get the title, price, and description of each item from the list. We add a "$" to the price.
        // Finally, We append each item to the previous item generated in this loop. This has to be done so that ALL items are displayed and not just the last item in the list.
        newDiv.innerHTML = `
            <img src="../images/${product.image}">                              
            <div class="title">${product.name}</div>
            <div class="price">${product.price.toLocaleString()}$</div>
            <div class="desc">${product.desc.toLocaleString()}</div>
            <button onclick="addToCart(${product.id})">Add To Cart</button>`
        list.appendChild(newDiv);
    });
}


initApp(); // Initialize the application to load products

// enlarges the menu item when the panel is hovered on
// desaturates all other menu items slighlty to make the selected item more highlighted
document.querySelectorAll('.list .item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Desaturate all other items
        document.querySelectorAll('.list .item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.add('desaturated');
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        // Remove desaturation from all items
        document.querySelectorAll('.list .item').forEach(otherItem => {
            otherItem.classList.remove('desaturated');
        });
    });
});
