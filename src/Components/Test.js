const productData = [];

export const addProduct = (product) => {
    // console.log('ini add ' + product.name); TERPANGGIL
    productData.push(product);
    // console.log(productData);
};

export const getProductData = (data) => {
    return data;
    // return console.log(data);
};