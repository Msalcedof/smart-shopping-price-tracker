test('fetchProductPrices returns data', async () => {
    const data = await fetchProductPrices('Laptop');
    expect(data.length).toBeGreaterThan(0);
});
