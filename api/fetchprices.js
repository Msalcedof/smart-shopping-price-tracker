async function fetchPrices(productName) {
    const url = `https://example-api.com/products?search=${productName}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

