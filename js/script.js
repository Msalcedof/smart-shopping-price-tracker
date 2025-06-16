// Define fetchProductPrices globally (Fixed function declaration)
window.fetchProductPrices = async function(query) {
    try {
        // ✅ Fetch from FakeStoreAPI (Public, No CORS Issues)
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        const searchQuery = query.toLowerCase().trim();

        // ✅ Expanded categories
        const availableCategories = [
            "men's clothing", "women's clothing", "jewelery", "electronics",
            "home", "technology", "sports", "tvs", "stoves", "refrigerators",
            "furniture", "kids' toys", "personal care", "kitchen", "gardens"
        ];
        const isCategorySearch = availableCategories.includes(searchQuery);

        const filteredData = data.filter(product => {
            const titleMatch = product.title?.toLowerCase().includes(searchQuery);
            const categoryMatch = isCategorySearch && product.category?.toLowerCase() === searchQuery;
            return titleMatch || categoryMatch;
        }).map(product => ({
            name: product.title || "Unknown Product",
            price: product.price || "N/A",
            seller: product.category || "Unknown Category"
        }));

        console.log("Filtered Products:", filteredData);

        if (filteredData.length === 0) {
            console.warn("No matches found. Try searching one of these categories:", availableCategories);
            return [];
        }

        return filteredData;
    } catch (error) {
        console.error("API fetch error:", error);
        alert("Failed to retrieve product data. Please try again later.");
        return [];
    }
};

// ✅ Ensure script loads before running event listener
window.onload = function() {
    document.getElementById("search-btn").addEventListener("click", async function () {
        let query = document.getElementById("search-bar").value;

        try {
            const products = await window.fetchProductPrices(query);
            displayResults(products);
            saveSearchResults(products);
            drawPriceChart(products);
        } catch (error) {
            console.error("Error in event listener:", error);
        }
    });

    const storedProducts = loadSearchResults();
    displayResults(storedProducts);
    drawPriceChart(storedProducts);
    loadWishlist(); // Ensure wishlist is reloaded too
};

// Save search results to localStorage
function saveSearchResults(products) {
    localStorage.setItem("searchResults", JSON.stringify(products));
}

// Load search results from localStorage
function loadSearchResults() {
    return JSON.parse(localStorage.getItem("searchResults")) || [];
}

// Display search results dynamically
function displayResults(products) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (products.length === 0) {
        results.innerHTML = "<p>No results found. Try a different search.</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Seller: ${product.seller}</p>
            <button onclick='addToWishlist("${product.name}", ${product.price})'>Add to Wishlist</button>
        `;
        results.appendChild(card);
    });

    console.log("Displayed Products:", products); // Debugging log
}

// Draw price trend chart (Fixed chart destruction)
function drawPriceChart(products) {
    if (!products || products.length === 0) return;

    const ctx = document.getElementById("priceChart").getContext("2d");

    // ✅ Ensure previous chart is properly destroyed
    if (window.priceChart && typeof window.priceChart.destroy === "function") {
        window.priceChart.destroy();
    }

    // ✅ Create a new Chart instance
    window.priceChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: products.map((_, index) => `Item ${index + 1}`),
            datasets: [{
                label: "Price ($)",
                data: products.map(product => product.price),
                borderColor: "rgba(0, 123, 255, 1)",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
                fill: true,
            }]
        },
        options: { responsive: true }
    });
}
