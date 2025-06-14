document.getElementById("search-btn").addEventListener("click", function () {
  let query = document.getElementById("search-bar").value;
  fetchPrices(query);
});

// Simulated product fetch (replace with API call later)
function fetchPrices(query) {
  console.log("Searching for:", query);
  const dummyData = [
    { name: `${query} - Store A`, price: 29.99, seller: "Shop A" },
    { name: `${query} - Store B`, price: 27.49, seller: "Shop B" },
    { name: `${query} - Store C`, price: 30.99, seller: "Shop C" },
  ];
  displayResults(dummyData);
  drawPriceChart(); // Using mock data
}

// Display search results + Add-to-Wishlist buttons
function displayResults(products) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <p>Seller: ${product.seller}</p>
      <button onclick='addToWishlist("${product.name}", ${product.price})'>Add to Wishlist</button>
    `;
    results.appendChild(card);
  });
}

// Wishlist functions
function addToWishlist(name, price) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push({ name, price });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert(`${name} added to wishlist!`);
  loadWishlist();
}

function loadWishlist() {
  const items = JSON.parse(localStorage.getItem("wishlist")) || [];
  const list = document.getElementById("wishlistItems");
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    list.appendChild(li);
  });
}

// Price chart using mock data
function drawPriceChart() {
  const ctx = document.getElementById("priceChart").getContext("2d");
  if (window.priceChart) window.priceChart.destroy(); // Reset old chart

  window.priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Today"],
      datasets: [{
        label: "Price ($)",
        data: [32.99, 30.99, 28.49, 27.49],
        borderColor: "rgba(0, 123, 255, 1)",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        borderWidth: 2,
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
        }
      }
    }
  });
}

// Load wishlist on startup
window.onload = loadWishlist;
