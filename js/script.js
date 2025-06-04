document.getElementById("search-btn").addEventListener("click", function() {
    let query = document.getElementById("search-bar").value;
    fetchPrices(query);
});

function fetchPrices(query) {
    console.log("Searching for:", query);
    // Call API here in next steps
}
