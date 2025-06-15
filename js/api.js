async function fetchProductPrices(query) {
    const response = await fetch(`https://api.example.com/products?search=${query}`);
    return response.json();
}
