// ================================
// PART A - BASIC TYPES AND VARIABLES
// ================================

let productName: string = "Laptop";
let price: number = 55000;
let inStock: boolean = true;
let tags: string[] = ["Electronics", "Computer", "Work"];
let productId: number | string = 101;

function printProductInfo(): void {
    console.log(
        `Product: ${productName}, Price: ₹${price}, In Stock: ${inStock}, Tags: ${tags.join(", ")}, Product ID: ${productId}`
    );
}

printProductInfo();

// any type
let temporaryProduct: any = "Laptop";

// Refactored to a specific type
let specificProduct: string = "Laptop";

// A specific type is safer because TypeScript can detect
// invalid values before the program runs.


// ================================
// FUNCTIONS AND SCOPE
// ================================

function calculateDiscount(
    price: number,
    discountPercent: number = 10
): number {
    return price - (price * discountPercent) / 100;
}

console.log("Discounted price:", calculateDiscount(1000));

function applyBulkDiscount(
    prices: number[],
    discountRate: number
): number[] {
    return prices.map(
        (price: number): number =>
            price - (price * discountRate) / 100
    );
}

const prices: number[] = [1000, 2000, 3000, 4000];

console.log(
    "Bulk discounted prices:",
    applyBulkDiscount(prices, 10)
);


// Block scope
function demonstrateScope(): void {
    for (let i: number = 0; i < 3; i++) {
        let blockVariable: string = "Inside loop";
        console.log(blockVariable);
    }

    // console.log(blockVariable);
    // Error: blockVariable is only available inside the loop.
}

demonstrateScope();


// ================================
// INTERFACES AND OBJECTS
// ================================

interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
    tags?: string[];
}

const products: Product[] = [
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

function getAvailableProducts(
    products: Product[]
): Product[] {
    return products.filter(
        (product: Product): boolean => product.inStock
    );
}

console.log(
    "Available products:",
    getAvailableProducts(products)
);


// Extended interface
interface DiscountedProduct extends Product {
    discountPercent: number;
}

function applyDiscountToProducts(
    products: Product[]
): DiscountedProduct[] {

    const fixedDiscount: number = 10;

    return products.map(
        (product: Product): DiscountedProduct => ({
            ...product,
            price:
                product.price -
                (product.price * fixedDiscount) / 100,
            discountPercent: fixedDiscount
        })
    );
}

console.log(
    "Discounted products:",
    applyDiscountToProducts(products)
);


// ================================
// PART B - PRODUCT INVENTORY MANAGER
// ================================

const productList: HTMLElement =
    document.getElementById("productList")!;

const searchInput: HTMLInputElement =
    document.getElementById("searchInput") as HTMLInputElement;

const showAllButton: HTMLButtonElement =
    document.getElementById("showAll") as HTMLButtonElement;

const showAvailableButton: HTMLButtonElement =
    document.getElementById("showAvailable") as HTMLButtonElement;

const discountButton: HTMLButtonElement =
    document.getElementById("applyDiscount") as HTMLButtonElement;


// Display products
function displayProducts(productArray: Product[]): void {

    productList.innerHTML = "";

    productArray.forEach(
        (product: Product): void => {

            const card: HTMLDivElement =
                document.createElement("div");

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
        }
    );
}


// Search
searchInput.addEventListener(
    "input",
    (): void => {

        const searchText: string =
            searchInput.value.toLowerCase();

        const filteredProducts: Product[] =
            products.filter(
                (product: Product): boolean =>
                    product.name
                        .toLowerCase()
                        .includes(searchText)
            );

        displayProducts(filteredProducts);
    }
);


// Show all
showAllButton.addEventListener(
    "click",
    (): void => {
        displayProducts(products);
    }
);


// Show available
showAvailableButton.addEventListener(
    "click",
    (): void => {

        const availableProducts: Product[] =
            getAvailableProducts(products);

        displayProducts(availableProducts);
    }
);


// Apply discount
discountButton.addEventListener(
    "click",
    (): void => {

        const discountedProducts: DiscountedProduct[] =
            applyDiscountToProducts(products);

        productList.innerHTML = "";

        discountedProducts.forEach(
            (product: DiscountedProduct): void => {

                const card: HTMLDivElement =
                    document.createElement("div");

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
            }
        );
    }
);


// Show products initially
displayProducts(products);