import ProductService from '../ProductService';

describe('ProductServices Testing',() => {
   
    test('can get products', async () => {
        const products = await  ProductService.getProducts();
        console.log(products);
        expect(typeof products).toBe("object");
    });
  
    test('can get product', async () => {
        const product = await ProductService.getProduct(1);
        console.log(product);
        expect(typeof product).toBe("object");
    });
  });