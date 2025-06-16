async function fetchProductPrices(query) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();

        console.log("First product object:", data[0]); // Debugging log

        return data.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
                   .map(product => ({
                       name: product.title,
                       price: product.price,
                       seller: "FakeStore API"
                   }));
    } catch (error) {
        console.error("API fetch error:", error);
        return [];
    }
}

export { fetchProductPrices };

