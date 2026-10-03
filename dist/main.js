"use strict";
// ================================
// PART A - BASIC TYPES AND VARIABLES
// ================================
let productName = "Laptop";
let price = 55000;
let inStock = true;
let tags = ["Electronics", "Computer", "Work"];
let productId = 101;
function printProductInfo() {
    console.log(`Product: ${productName}, Price: ₹${price}, In Stock: ${inStock}, Tags: ${tags.join(", ")}, Product ID: ${productId}`);
}
printProductInfo();
// any type
let temporaryProduct = "Laptop";
// Refactored to a specific type
let specificProduct = "Laptop";
// A specific type is safer because TypeScript can detect
// invalid values before the program runs.
// ================================
// FUNCTIONS AND SCOPE
// ================================
function calculateDiscount(price, discountPercent = 10) {
    return price - (price * discountPercent) / 100;
}
console.log("Discounted price:", calculateDiscount(1000));
function applyBulkDiscount(prices, discountRate) {
    return prices.map((price) => price - (price * discountRate) / 100);
}
const prices = [1000, 2000, 3000, 4000];
console.log("Bulk discounted prices:", applyBulkDiscount(prices, 10));
// Block scope
function demonstrateScope() {
    for (let i = 0; i < 3; i++) {
        let blockVariable = "Inside loop";
        console.log(blockVariable);
    }
    // console.log(blockVariable);
    // Error: blockVariable is only available inside the loop.
}
demonstrateScope();
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        inStock: true,
        tags: ["Electronics", "Computer"]
    },
    {
        id: 2,
        name: "Mouse",
        price: 800,
        inStock: true,
        tags: ["Electronics", "Accessory"]
    },
    {
        id: 3,
        name: "Keyboard",
        price: 1500,
        inStock: false,
        tags: ["Electronics", "Accessory"]
    },
    {
        id: 4,
        name: "Monitor",
        price: 12000,
        inStock: true,
        tags: ["Electronics", "Display"]
    }
];
function getAvailableProducts(products) {
    return products.filter((product) => product.inStock);
}
console.log("Available products:", getAvailableProducts(products));
function applyDiscountToProducts(products) {
    const fixedDiscount = 10;
    return products.map((product) => ({
        ...product,
        price: product.price -
            (product.price * fixedDiscount) / 100,
        discountPercent: fixedDiscount
    }));
}
console.log("Discounted products:", applyDiscountToProducts(products));
// ================================
// PART B - PRODUCT INVENTORY MANAGER
// ================================
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const showAllButton = document.getElementById("showAll");
const showAvailableButton = document.getElementById("showAvailable");
const discountButton = document.getElementById("applyDiscount");
// Display products
function displayProducts(productArray) {
    productList.innerHTML = "";
    productArray.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
                <h3>${product.name}</h3>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
                <p>
                    <strong>Status:</strong>
                    ${product.inStock ? "In Stock" : "Out of Stock"}
                </p>
                <p>
                    <strong>Tags:</strong>
                    ${product.tags?.join(", ") ?? "No tags"}
                </p>
            `;
        productList.appendChild(card);
    });
}
// Search
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) => product.name
        .toLowerCase()
        .includes(searchText));
    displayProducts(filteredProducts);
});
// Show all
showAllButton.addEventListener("click", () => {
    displayProducts(products);
});
// Show available
showAvailableButton.addEventListener("click", () => {
    const availableProducts = getAvailableProducts(products);
    displayProducts(availableProducts);
});
// Apply discount
discountButton.addEventListener("click", () => {
    const discountedProducts = applyDiscountToProducts(products);
    productList.innerHTML = "";
    discountedProducts.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
                    <h3>${product.name}</h3>
                    <p><strong>ID:</strong> ${product.id}</p>
                    <p><strong>Discount:</strong> ${product.discountPercent}%</p>
                    <p><strong>Discounted Price:</strong> ₹${product.price.toFixed(2)}</p>
                    <p>
                        <strong>Status:</strong>
                        ${product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                `;
        productList.appendChild(card);
    });
});
// Show products initially
displayProducts(products);
